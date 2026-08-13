#!/usr/bin/env node
// End-to-end verification for the Resources/Blog section.
// Reads the expected slugs+titles from lib/content/blog.ts, then verifies against a live site:
//   - HTTP 200 on /resources and every /resources/<slug>
//   - Each article has BlogPosting JSON-LD with the expected headline + canonical link
//   - /sitemap.xml contains every expected /resources/<slug>
// With --snapshot: also captures Playwright screenshots of /resources and the first article.
// With --wait-for-sha=<sha>: polls GitHub deployments until <sha> is Production, then verifies.

import { parseArgs } from 'node:util';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');

const { values } = parseArgs({
  options: {
    'base-url':      { type: 'string', default: 'https://aimphysiotherapy.ca' },
    'canonical-url': { type: 'string', default: '' },  // defaults to base-url; override when testing localhost
    'blog-file':     { type: 'string', default: 'lib/content/blog.ts' },
    'webinars-file': { type: 'string', default: 'lib/content/webinars.ts' },
    'snapshot':      { type: 'boolean', default: false },
    'snapshot-dir':  { type: 'string', default: 'verify-artifacts' },
    'wait-for-sha':  { type: 'string' },
    'wait-timeout':  { type: 'string', default: '600' },  // seconds
    'wait-repo':     { type: 'string', default: 'Stiggtechnologies/AIMWebsite2.0' },
    'concurrency':   { type: 'string', default: '6' },
    'bypass-token':  { type: 'string', default: process.env.VERCEL_BYPASS_TOKEN || '' },
    'help':          { type: 'boolean', default: false },
  },
});

if (values.help) {
  console.log(`Usage: node scripts/verify-resources.mjs [options]

Options:
  --base-url=<url>          Site to verify against (default: https://aimphysiotherapy.ca)
  --canonical-url=<url>     Canonical/sitemap origin (default: same as --base-url).
                            Override when testing a localhost or preview build that
                            still emits the production canonical URL.
  --blog-file=<path>        Path to blog data module (default: lib/content/blog.ts)
  --webinars-file=<path>    Path to webinars data module (default: lib/content/webinars.ts)
  --snapshot                Also capture Playwright screenshots (chromium)
  --snapshot-dir=<dir>      Where to save screenshots (default: verify-artifacts)
  --wait-for-sha=<sha>      Poll GitHub deployments until <sha> is Production, then verify
  --wait-timeout=<secs>     Max wait for --wait-for-sha (default: 600)
  --wait-repo=<owner/repo>  Repo for deployments (default: Stiggtechnologies/AIMWebsite2.0)
  --concurrency=<n>         Max parallel HTTP fetches (default: 6)
  --bypass-token=<token>    Vercel Protection Bypass for Automation token
                            (or set VERCEL_BYPASS_TOKEN env var)

Exit codes: 0 all pass · 1 any check failed · 2 config or fetch error
            3 Vercel Deployment Protection blocked access (no bypass token)`);
  process.exit(0);
}

const BASE = values['base-url'].replace(/\/$/, '');
const CANONICAL = (values['canonical-url'] || values['base-url']).replace(/\/$/, '');
const CONCURRENCY = Math.max(1, parseInt(values.concurrency, 10));

// ── helpers ────────────────────────────────────────────────────────────────

const c = {
  green:  (s) => `\x1b[32m${s}\x1b[0m`,
  red:    (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  gray:   (s) => `\x1b[90m${s}\x1b[0m`,
  bold:   (s) => `\x1b[1m${s}\x1b[0m`,
};

function log(msg) { process.stdout.write(msg + '\n'); }
function step(msg) { log(c.bold(`\n▸ ${msg}`)); }

async function parallel(items, worker, limit) {
  const results = new Array(items.length);
  let i = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      results[idx] = await worker(items[idx], idx);
    }
  });
  await Promise.all(runners);
  return results;
}

const BYPASS_TOKEN = values['bypass-token'];

function isVercelProtectionUrl(url) {
  return /^https:\/\/vercel\.com\/(login|sso-api)/.test(url);
}

class VercelProtectionError extends Error {
  constructor(url) {
    super(
      `Vercel Deployment Protection is blocking ${url}\n` +
      `  · Fix (either):\n` +
      `      · Set VERCEL_BYPASS_TOKEN or pass --bypass-token=<token>\n` +
      `        (Vercel → Project → Settings → Deployment Protection → Protection Bypass for Automation)\n` +
      `      · Or disable Deployment Protection for preview URLs on this project.`,
    );
    this.name = 'VercelProtectionError';
  }
}

async function fetchText(url) {
  const headers = BYPASS_TOKEN ? { 'x-vercel-protection-bypass': BYPASS_TOKEN } : {};
  // Also append the bypass token as a query param — Vercel accepts both, and the
  // query form persists across redirects that strip custom headers.
  const target = BYPASS_TOKEN
    ? url + (url.includes('?') ? '&' : '?') + 'x-vercel-protection-bypass=' + encodeURIComponent(BYPASS_TOKEN)
    : url;
  const res = await fetch(target, { redirect: 'follow', headers });
  const body = await res.text();
  if (isVercelProtectionUrl(res.url)) throw new VercelProtectionError(url);
  return { status: res.status, body, url: res.url };
}

// ── parse expected posts from blog.ts ─────────────────────────────────────

async function loadExpectedPosts(blogFile) {
  const src = await readFile(resolve(REPO_ROOT, blogFile), 'utf8');
  // Pair each post-level slug with its title. Post-level slug is indented 4 spaces.
  const re = /\n {4}slug:\s*"([^"]+)",\s*\n {4}title:\s*"((?:[^"\\]|\\.)*)"/g;
  const posts = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    posts.push({ slug: m[1], title: m[2].replace(/\\"/g, '"').replace(/\\\\/g, '\\') });
  }
  if (posts.length === 0) throw new Error(`No posts parsed from ${blogFile}`);
  return posts;
}

// Webinars use single-quoted string literals (TS convention in this file), so parse those.
// Each post-level webinar is indented 4 spaces and lists slug, status, title in that order.
async function loadExpectedWebinars(webinarsFile) {
  const src = await readFile(resolve(REPO_ROOT, webinarsFile), 'utf8');
  const re =
    /\n {4}slug:\s*'([^']+)',\s*\n {4}status:\s*'([^']+)',\s*\n {4}title:\s*'((?:[^'\\]|\\.)*)'/g;
  const webinars = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    webinars.push({
      slug: m[1],
      status: m[2],
      title: m[3].replace(/\\'/g, "'").replace(/\\\\/g, '\\'),
    });
  }
  // Note: this file may be intentionally empty pre-launch; return [] rather than throw.
  return webinars;
}

// ── wait for GitHub production deployment ─────────────────────────────────

async function waitForProdDeploy(sha, repo, timeoutSec) {
  const startedAt = Date.now();
  const deadlineMs = timeoutSec * 1000;
  log(c.gray(`  polling GitHub deployments for ${sha.slice(0, 7)} in Production (max ${timeoutSec}s)`));
  while (true) {
    let output;
    try {
      output = execSync(
        `gh api repos/${repo}/deployments --jq '.[] | select(.environment=="Production") | .sha' 2>/dev/null | head -20`,
        { encoding: 'utf8' },
      );
    } catch (err) {
      throw new Error(`gh api failed — is 'gh' installed and authenticated? (${err.message})`);
    }
    if (output.split('\n').some((line) => line.startsWith(sha))) {
      // Give Vercel a beat to actually serve the new build after the deployment record posts.
      log(c.gray(`  deployment record present · waiting 20s for edge propagation`));
      await new Promise((r) => setTimeout(r, 20_000));
      return;
    }
    if (Date.now() - startedAt > deadlineMs) throw new Error(`Timed out waiting for ${sha} in Production`);
    await new Promise((r) => setTimeout(r, 10_000));
  }
}

// ── smoke checks ──────────────────────────────────────────────────────────

async function runSmokeChecks(posts) {
  const failures = [];

  step(`Fetching /resources index`);
  const beforeIndex = failures.length;
  const index = await fetchText(`${BASE}/resources`);
  if (index.status !== 200) failures.push(`/resources → HTTP ${index.status}`);
  else {
    for (const p of posts) {
      const needle = `href="/resources/${p.slug}"`;
      if (!index.body.includes(needle)) failures.push(`/resources index missing link to ${p.slug}`);
    }
  }
  if (failures.length === beforeIndex) log(`  ${c.green('✓')} /resources returns 200 and links to all ${posts.length} posts`);
  else log(`  ${c.red('✗')} /resources index — ${failures.length - beforeIndex} issue(s)`);

  step(`Fetching /sitemap.xml`);
  const beforeSm = failures.length;
  const sm = await fetchText(`${BASE}/sitemap.xml`);
  let inSitemapSize = 0;
  const webinarSitemapSlugs = new Set();
  if (sm.status !== 200) failures.push(`/sitemap.xml → HTTP ${sm.status}`);
  else {
    // Article slugs (excluding /resources/webinars/* which have their own row shape).
    const articleSlugs = new Set(
      [...sm.body.matchAll(/<loc>[^<]*\/resources\/([a-z0-9-]+)<\/loc>/g)]
        .map((m) => m[1])
        .filter((s) => s !== 'webinars'),
    );
    inSitemapSize = articleSlugs.size;
    for (const p of posts) {
      if (!articleSlugs.has(p.slug)) failures.push(`sitemap.xml missing ${p.slug}`);
    }
    // Webinar slugs (used by the webinar smoke-check function).
    for (const m of sm.body.matchAll(/<loc>[^<]*\/resources\/webinars\/([a-z0-9-]+)<\/loc>/g)) {
      webinarSitemapSlugs.add(m[1]);
    }
    if (sm.body.includes(`<loc>${CANONICAL}/resources/webinars</loc>`)) {
      webinarSitemapSlugs.add('__webinars_hub__');
    }
  }
  if (failures.length === beforeSm) log(`  ${c.green('✓')} sitemap.xml includes ${inSitemapSize} /resources/* entries`);
  else log(`  ${c.red('✗')} sitemap.xml — ${failures.length - beforeSm} issue(s)`);

  step(`Fetching ${posts.length} article routes (concurrency ${CONCURRENCY})`);
  const results = await parallel(
    posts,
    async (p) => {
      const article = await fetchText(`${BASE}/resources/${p.slug}`);
      const issues = [];
      if (article.status !== 200) issues.push(`HTTP ${article.status}`);
      if (!article.body.includes('"@type":"BlogPosting"')) issues.push('missing BlogPosting JSON-LD');
      // headline in JSON-LD — escape JSON quotes/backslashes when comparing.
      const expectedHeadline = p.title.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      if (!article.body.includes(`"headline":"${expectedHeadline}"`)) {
        issues.push(`headline mismatch (expected "${p.title}")`);
      }
      if (!article.body.includes(`<link rel="canonical" href="${CANONICAL}/resources/${p.slug}"`)) {
        issues.push('canonical mismatch');
      }
      return { slug: p.slug, issues };
    },
    CONCURRENCY,
  );

  for (const r of results) {
    if (r.issues.length) {
      failures.push(`/resources/${r.slug}: ${r.issues.join(', ')}`);
      log(`  ${c.red('✗')} ${r.slug} — ${r.issues.join(', ')}`);
    } else {
      log(`  ${c.green('✓')} ${r.slug}`);
    }
  }

  return { failures, webinarSitemapSlugs };
}

// ── webinar smoke checks ──────────────────────────────────────────────────

async function runWebinarSmokeChecks(webinars, expectedSitemapSlugs) {
  const failures = [];

  step(`Fetching /resources/webinars index`);
  const beforeIndex = failures.length;
  const index = await fetchText(`${BASE}/resources/webinars`);
  if (index.status !== 200) failures.push(`/resources/webinars → HTTP ${index.status}`);
  else {
    for (const w of webinars) {
      const needle = `href="/resources/webinars/${w.slug}"`;
      if (!index.body.includes(needle)) failures.push(`/resources/webinars missing link to ${w.slug}`);
    }
  }
  if (failures.length === beforeIndex)
    log(`  ${c.green('✓')} /resources/webinars returns 200 and links to all ${webinars.length} webinars`);
  else log(`  ${c.red('✗')} /resources/webinars — ${failures.length - beforeIndex} issue(s)`);

  step(`Verifying sitemap contains ${webinars.length} webinar URLs + the webinars hub`);
  const beforeSm = failures.length;
  if (!expectedSitemapSlugs.has('__webinars_hub__')) failures.push('sitemap.xml missing /resources/webinars hub');
  for (const w of webinars) {
    if (!expectedSitemapSlugs.has(w.slug)) failures.push(`sitemap.xml missing webinar ${w.slug}`);
  }
  if (failures.length === beforeSm) log(`  ${c.green('✓')} all webinar URLs present in sitemap`);
  else log(`  ${c.red('✗')} sitemap webinars — ${failures.length - beforeSm} issue(s)`);

  step(`Fetching ${webinars.length} webinar routes (concurrency ${CONCURRENCY})`);
  const results = await parallel(
    webinars,
    async (w) => {
      const page = await fetchText(`${BASE}/resources/webinars/${w.slug}`);
      const issues = [];
      if (page.status !== 200) issues.push(`HTTP ${page.status}`);
      if (!page.body.includes(`<link rel="canonical" href="${CANONICAL}/resources/webinars/${w.slug}"`)) {
        issues.push('canonical mismatch');
      }
      // VideoObject JSON-LD is only required when the webinar is published.
      if (w.status === 'published') {
        if (!page.body.includes('"@type":"VideoObject"')) issues.push('missing VideoObject JSON-LD');
        const expectedName = w.title.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        if (!page.body.includes(`"name":"${expectedName}"`)) issues.push(`VideoObject name mismatch (expected "${w.title}")`);
      } else {
        // For unpublished, make sure we're NOT accidentally emitting a broken VideoObject.
        if (page.body.includes('"@type":"VideoObject"')) {
          issues.push('unexpected VideoObject JSON-LD on non-published webinar');
        }
      }
      return { slug: w.slug, status: w.status, issues };
    },
    CONCURRENCY,
  );

  for (const r of results) {
    if (r.issues.length) {
      failures.push(`/resources/webinars/${r.slug}: ${r.issues.join(', ')}`);
      log(`  ${c.red('✗')} ${r.slug} [${r.status}] — ${r.issues.join(', ')}`);
    } else {
      log(`  ${c.green('✓')} ${r.slug} [${r.status}]`);
    }
  }

  return failures;
}

// ── visual snapshots (Playwright) ─────────────────────────────────────────

async function captureSnapshots(posts, webinars, dir) {
  step(`Capturing Playwright snapshots to ${dir}/`);
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch (err) {
    throw new Error(`playwright not installed — run "npm install" (it's a devDependency). ${err.message}`);
  }
  await mkdir(resolve(REPO_ROOT, dir), { recursive: true });

  // Prefer system Chrome when available (no extra download); fall back to bundled chromium.
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome' });
  } catch {
    browser = await chromium.launch();
  }
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    extraHTTPHeaders: BYPASS_TOKEN ? { 'x-vercel-protection-bypass': BYPASS_TOKEN } : undefined,
  });
  const page = await context.newPage();

  const targets = [
    { name: 'resources-index', url: `${BASE}/resources` },
    { name: `article-${posts[0].slug}`, url: `${BASE}/resources/${posts[0].slug}` },
  ];
  if (webinars && webinars.length > 0) {
    targets.push({ name: 'webinars-index', url: `${BASE}/resources/webinars` });
    // Prefer the first published webinar for the snapshot; fall back to the first one.
    const featured = webinars.find((w) => w.status === 'published') || webinars[0];
    targets.push({ name: `webinar-${featured.slug}`, url: `${BASE}/resources/webinars/${featured.slug}` });
  }
  const artifacts = [];
  for (const t of targets) {
    await page.goto(t.url, { waitUntil: 'networkidle' });
    const path = resolve(REPO_ROOT, dir, `${t.name}.png`);
    await page.screenshot({ path, fullPage: true });
    log(`  ${c.green('✓')} ${t.name}.png (${t.url})`);
    artifacts.push({ target: t.name, url: t.url, file: `${dir}/${t.name}.png` });
  }
  await browser.close();
  await writeFile(
    resolve(REPO_ROOT, dir, 'manifest.json'),
    JSON.stringify({ baseUrl: BASE, capturedAt: new Date().toISOString(), artifacts }, null, 2),
  );
}

// ── main ──────────────────────────────────────────────────────────────────

async function main() {
  log(c.bold(`Verifying ${BASE}`));

  if (values['wait-for-sha']) {
    step(`Waiting for Production deploy of ${values['wait-for-sha'].slice(0, 7)}`);
    await waitForProdDeploy(
      values['wait-for-sha'],
      values['wait-repo'],
      parseInt(values['wait-timeout'], 10),
    );
    log(`  ${c.green('✓')} Production deploy live`);
  }

  const posts = await loadExpectedPosts(values['blog-file']);
  log(c.gray(`  loaded ${posts.length} expected posts from ${values['blog-file']}`));

  const webinars = await loadExpectedWebinars(values['webinars-file']);
  log(c.gray(`  loaded ${webinars.length} expected webinars from ${values['webinars-file']}`));

  const { failures, webinarSitemapSlugs } = await runSmokeChecks(posts);

  if (webinars.length > 0) {
    const webinarFailures = await runWebinarSmokeChecks(webinars, webinarSitemapSlugs);
    failures.push(...webinarFailures);
  }

  if (values.snapshot) {
    try {
      await captureSnapshots(posts, webinars, values['snapshot-dir']);
    } catch (err) {
      failures.push(`snapshot: ${err.message}`);
    }
  }

  log('');
  if (failures.length === 0) {
    log(c.green(c.bold(`✓ All checks passed (${posts.length} articles, ${webinars.length} webinars)`)));
    process.exit(0);
  }
  log(c.red(c.bold(`✗ ${failures.length} check(s) failed:`)));
  for (const f of failures) log(c.red(`  · ${f}`));
  process.exit(1);
}

main().catch((err) => {
  if (err instanceof VercelProtectionError) {
    console.error(c.yellow(`\n! ${err.message}`));
    process.exit(3);  // distinct exit code for "auth/protection blocked" vs real failure
  }
  console.error(c.red(`\nFATAL: ${err.message}`));
  process.exit(2);
});

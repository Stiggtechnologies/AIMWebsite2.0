#!/usr/bin/env node
// End-to-end pipeline for shipping a Resources/Blog batch.
// Given a handoff directory containing a fresh blog.ts, this script:
//   1. validates the handoff        (blog.ts present, parses, exports blogPosts)
//   2. stages the data module       (copies handoff/blog.ts → lib/content/blog.ts)
//   3. runs local checks            (typecheck, lint, build)
//   4. commits on a fresh branch    (skips if working tree unchanged — idempotent)
//   5. pushes and opens a PR        (against main; never pushes to main directly)
//   6. waits for the Vercel preview and verifies it (verify-resources.mjs on the preview URL)
//   7. merges the PR                 (only when --auto-merge is passed)
//   8. waits for the Production deploy and verifies + snapshots it
//
// Idempotent throughout: re-running with no data-module changes exits cleanly.
// Halts (with a friendly next-step hint) before any mutating remote action unless the
// corresponding opt-in flag is passed (--push, --auto-merge).

import { parseArgs } from 'node:util';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, basename } from 'node:path';
import { execSync, spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    'blog-file':     { type: 'string', default: 'lib/content/blog.ts' },
    'branch':        { type: 'string' },  // default computed from date
    'base':          { type: 'string', default: 'main' },
    'title':         { type: 'string' },  // default computed from post-count delta
    'stop-after':    { type: 'string' },  // validate|stage|checks|commit|pr|verify-preview|merge|verify-prod
    'push':            { type: 'boolean', default: false },
    'auto-merge':      { type: 'boolean', default: false },
    'skip-checks':     { type: 'boolean', default: false },
    'strict-preview':  { type: 'boolean', default: false },
    'dry-run':         { type: 'boolean', default: false },
    'repo':          { type: 'string', default: 'Stiggtechnologies/AIMWebsite2.0' },
    'help':          { type: 'boolean', default: false },
  },
});

const STEPS = ['validate', 'stage', 'checks', 'commit', 'pr', 'verify-preview', 'merge', 'verify-prod'];

if (values.help || positionals.length === 0) {
  console.log(`Usage: node scripts/ship-resources-batch.mjs <handoff-dir> [options]

Pipeline steps (in order): ${STEPS.join(' → ')}

Options:
  --branch=<name>        Feature branch (default: chore/resources-batch-<YYYYMMDD>)
  --base=<branch>        Base branch for the PR (default: main)
  --title=<text>         PR title (default: auto-generated from post-count delta)
  --stop-after=<step>    Halt after that step (one of ${STEPS.join(', ')})
  --push                 Actually push the feature branch (default: dry — commits locally only)
  --auto-merge           After preview verify passes, squash-merge the PR
  --skip-checks          Skip typecheck/lint/build (not recommended)
  --strict-preview       Treat Vercel Protection on the preview as a hard failure
                         (default: warn and continue — production is still verified)
  --dry-run              Show planned actions; skip mutating remote/git steps
  --blog-file=<path>     Target path for the data module (default: lib/content/blog.ts)
  --repo=<owner/repo>    Repo for gh/deployments (default: Stiggtechnologies/AIMWebsite2.0)

Safety: this script never pushes to <base> directly. --push is required to publish the
feature branch, and --auto-merge is required to squash-merge the PR.

Idempotency: if the handoff blog.ts matches the current lib/content/blog.ts, the pipeline
exits at 'stage' with a no-op message.`);
  process.exit(values.help ? 0 : 2);
}

const handoffDir = resolve(positionals[0]);
const stopAfter = values['stop-after'];
if (stopAfter && !STEPS.includes(stopAfter)) {
  fail(`--stop-after must be one of: ${STEPS.join(', ')}`);
}

// ── helpers ────────────────────────────────────────────────────────────────

const c = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red:   (s) => `\x1b[31m${s}\x1b[0m`,
  yellow:(s) => `\x1b[33m${s}\x1b[0m`,
  gray:  (s) => `\x1b[90m${s}\x1b[0m`,
  bold:  (s) => `\x1b[1m${s}\x1b[0m`,
};

let stepIndex = 0;
function step(name, msg) {
  stepIndex += 1;
  console.log(c.bold(`\n[${stepIndex}/${STEPS.length}] ${name}`) + (msg ? c.gray(`  ${msg}`) : ''));
}
function ok(msg)   { console.log(`  ${c.green('✓')} ${msg}`); }
function info(msg) { console.log(`  ${c.gray('·')} ${msg}`); }
function warn(msg) { console.log(`  ${c.yellow('!')} ${msg}`); }
function fail(msg) { console.error(c.red(`\n✗ ${msg}`)); process.exit(1); }

function run(cmd, opts = {}) {
  if (values['dry-run'] && opts.mutating) {
    info(`dry-run — would run: ${cmd}`);
    return '';
  }
  return execSync(cmd, { encoding: 'utf8', cwd: REPO_ROOT, stdio: opts.pipe ? 'pipe' : ['ignore', 'pipe', 'pipe'], ...opts.spawn }).trim();
}

function runInherit(cmd, opts = {}) {
  if (values['dry-run'] && opts.mutating) {
    info(`dry-run — would run: ${cmd}`);
    return { status: 0 };
  }
  const [bin, ...args] = cmd.split(' ');
  const r = spawnSync(bin, args, { cwd: REPO_ROOT, stdio: 'inherit' });
  return { status: r.status };
}

function haltIfStopAfter(name) {
  if (stopAfter === name) {
    console.log(c.yellow(`\nHalted after step '${name}' (--stop-after).`));
    process.exit(0);
  }
}

// Post count from a blog.ts source string. Matches post-level `slug: "..."` (4-space indent).
function countPosts(src) {
  return (src.match(/\n {4}slug:\s*"/g) || []).length;
}

// ── steps ──────────────────────────────────────────────────────────────────

async function main() {
  console.log(c.bold(`Shipping resources batch from ${handoffDir}`));

  // 1 · validate
  step('validate', `handoff dir: ${handoffDir}`);
  const handoffBlogPath = resolve(handoffDir, 'blog.ts');
  if (!existsSync(handoffBlogPath)) fail(`handoff/blog.ts not found at ${handoffBlogPath}`);
  const handoffSrc = await readFile(handoffBlogPath, 'utf8');
  if (!handoffSrc.includes('export const blogPosts')) fail('handoff blog.ts missing `export const blogPosts`');
  if (!handoffSrc.includes('export function getBlogPostBySlug')) fail('handoff blog.ts missing `getBlogPostBySlug`');
  const handoffCount = countPosts(handoffSrc);
  ok(`handoff blog.ts parses (${handoffCount} posts)`);
  haltIfStopAfter('validate');

  // 2 · stage
  step('stage', `→ ${values['blog-file']}`);
  const targetPath = resolve(REPO_ROOT, values['blog-file']);
  const currentSrc = existsSync(targetPath) ? await readFile(targetPath, 'utf8') : '';
  const currentCount = currentSrc ? countPosts(currentSrc) : 0;
  if (currentSrc === handoffSrc) {
    console.log(c.yellow(`\nNo-op: handoff blog.ts is byte-identical to current ${values['blog-file']} (${currentCount} posts). Nothing to ship.`));
    process.exit(0);
  }
  if (!values['dry-run']) await writeFile(targetPath, handoffSrc);
  const delta = handoffCount - currentCount;
  ok(`staged (${currentCount} → ${handoffCount} posts, ${delta >= 0 ? '+' : ''}${delta})`);
  haltIfStopAfter('stage');

  // 3 · checks
  step('checks', values['skip-checks'] ? 'SKIPPED (--skip-checks)' : 'typecheck · lint · build');
  if (!values['skip-checks']) {
    for (const cmd of ['npm run typecheck', 'npm run lint', 'npm run build']) {
      info(cmd);
      const r = runInherit(cmd);
      if (r.status !== 0) fail(`${cmd} failed (exit ${r.status})`);
    }
    ok('all local checks passed');
  }
  haltIfStopAfter('checks');

  // 4 · commit
  step('commit', 'branch + git commit');
  const currentBranch = run('git rev-parse --abbrev-ref HEAD');
  if (currentBranch === values.base) {
    const branch = values.branch || `chore/resources-batch-${dateStamp()}`;
    info(`creating branch ${branch} from ${values.base}`);
    run(`git checkout -b ${branch}`, { mutating: true });
  } else {
    info(`already on branch ${currentBranch}`);
  }
  const branchName = run('git rev-parse --abbrev-ref HEAD');
  if (branchName === values.base) fail(`refusing to commit directly to ${values.base}`);

  const dirty = run('git status --porcelain lib/content/blog.ts').trim();
  if (!dirty) {
    warn('working tree has no changes to blog.ts (already committed?) — skipping commit');
  } else {
    run(`git add ${values['blog-file']}`, { mutating: true });
    const title = values.title
      || (delta > 0 ? `Add ${delta} new blog post${delta === 1 ? '' : 's'} (${handoffCount} total)`
                    : `Update Resources/Blog content (${handoffCount} posts)`);
    const body = [
      title,
      '',
      `Staged from handoff: ${handoffDir}`,
      `Post count: ${currentCount} → ${handoffCount}`,
      '',
      'Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>',
    ].join('\n');
    if (values['dry-run']) info(`dry-run — would commit "${title}"`);
    else run(`git commit -F -`, { spawn: { input: body }, mutating: true });
    ok(`committed on ${branchName}`);
  }
  haltIfStopAfter('commit');

  // 5 · pr
  step('pr', values.push ? 'push + gh pr create' : 'skipped (add --push)');
  let prNumber, prUrl;
  if (values.push) {
    run(`git push -u origin ${branchName}`, { mutating: true });
    ok(`pushed ${branchName}`);
    try {
      const existing = run(`gh pr view ${branchName} --json number,url --jq '.number, .url'`, { pipe: true });
      const [n, u] = existing.split('\n');
      prNumber = parseInt(n, 10);
      prUrl = u;
      info(`PR ${prNumber} already exists: ${prUrl}`);
    } catch {
      const prTitle = values.title || `Ship resources batch: ${branchName}`;
      const prBody = `Automated by scripts/ship-resources-batch.mjs from handoff ${basename(handoffDir)}.\n\nSee the commit for details.`;
      const out = run(
        `gh pr create --base ${values.base} --head ${branchName} --title "${prTitle.replace(/"/g, '\\"')}" --body "${prBody.replace(/"/g, '\\"')}"`,
        { mutating: true, pipe: true },
      );
      prUrl = out.split('\n').filter(Boolean).pop();
      prNumber = parseInt(prUrl.split('/').pop(), 10);
      ok(`opened PR #${prNumber} — ${prUrl}`);
    }
  } else {
    warn(`skipped — pass --push to push and open a PR against ${values.base}`);
  }
  haltIfStopAfter('pr');

  // 6 · verify-preview
  step('verify-preview', prNumber ? `wait for Vercel preview on PR #${prNumber}` : 'skipped (no PR)');
  let previewUrl;
  if (prNumber) {
    previewUrl = await waitForPreviewUrl(prNumber);
    ok(`preview live at ${previewUrl}`);
    const verify = runInherit(`node scripts/verify-resources.mjs --base-url=${previewUrl}`);
    if (verify.status === 3) {
      // Vercel Deployment Protection — best-effort by default.
      if (values['strict-preview']) fail('preview blocked by Vercel Deployment Protection (--strict-preview set)');
      warn('preview blocked by Vercel Deployment Protection — skipping (set VERCEL_BYPASS_TOKEN or pass --strict-preview to require)');
    } else if (verify.status !== 0) {
      fail('verify-resources failed against preview URL');
    } else {
      ok('preview verification passed');
    }
  }
  haltIfStopAfter('verify-preview');

  // 7 · merge
  step('merge', values['auto-merge'] ? `gh pr merge --squash` : 'skipped (add --auto-merge)');
  let mergeSha;
  if (prNumber && values['auto-merge']) {
    run(`gh pr merge ${prNumber} --squash`, { mutating: true });
    const info = run(`gh pr view ${prNumber} --json mergeCommit --jq .mergeCommit.oid`);
    mergeSha = info.trim();
    ok(`merged as ${mergeSha.slice(0, 7)}`);
  } else if (prNumber) {
    warn(`skipped — merge PR #${prNumber} manually, then re-run with --stop-after=verify-prod --auto-merge`);
  }
  haltIfStopAfter('merge');

  // 8 · verify-prod
  step('verify-prod', mergeSha ? `wait for Production of ${mergeSha.slice(0, 7)}` : 'skipped (nothing merged)');
  if (mergeSha) {
    const verify = runInherit(
      `node scripts/verify-resources.mjs --snapshot --wait-for-sha=${mergeSha} --wait-repo=${values.repo}`,
    );
    if (verify.status !== 0) fail('production verification failed');
    ok('production verification passed with snapshots');
  }

  console.log(c.green(c.bold('\n✓ Pipeline complete')));
}

function dateStamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
}

// The Vercel GitHub check's `targetUrl` points at the build inspector (vercel.com/...),
// not the deployed site. The actual preview URL is posted as a PR comment by the Vercel
// bot in the form https://<project>-git-<slug>-<team>.vercel.app — parse it from there.
async function waitForPreviewUrl(prNumber, timeoutSec = 600) {
  const startedAt = Date.now();
  let sawVercelCheck = false;
  while (true) {
    let checks, commentsPayload;
    try {
      checks = JSON.parse(run(`gh pr view ${prNumber} --json statusCheckRollup`, { pipe: true }));
      commentsPayload = JSON.parse(run(`gh pr view ${prNumber} --json comments`, { pipe: true }));
    } catch (err) {
      throw new Error(`gh pr view failed: ${err.message}`);
    }
    const vercel = (checks.statusCheckRollup || []).find((r) => (r.name || r.context || '').toLowerCase() === 'vercel');
    if (vercel) sawVercelCheck = true;
    if (vercel && (vercel.state === 'FAILURE' || vercel.state === 'ERROR')) {
      throw new Error(`Vercel preview check failed on PR #${prNumber}`);
    }
    for (const comment of commentsPayload.comments || []) {
      const m = comment.body && comment.body.match(/https:\/\/[a-zA-Z0-9.-]+\.vercel\.app(?:\/[^ \s)\]]*)?/);
      if (m) return m[0].replace(/\/$/, '');
    }
    if ((Date.now() - startedAt) / 1000 > timeoutSec) {
      throw new Error(
        sawVercelCheck
          ? `Vercel check appeared but no preview URL posted in PR #${prNumber} comments within ${timeoutSec}s`
          : `Timed out waiting for Vercel preview on PR #${prNumber}`,
      );
    }
    process.stdout.write('.');
    await new Promise((r) => setTimeout(r, 10_000));
  }
}

main().catch((err) => {
  console.error(c.red(`\nFATAL: ${err.message}`));
  if (err.stderr) console.error(err.stderr.toString());
  process.exit(2);
});

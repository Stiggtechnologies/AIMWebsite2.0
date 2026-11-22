#!/usr/bin/env node
/**
 * Advertising copy compliance gate — College of Physiotherapists of Alberta.
 *
 * The College runs an automated "Advertising Compliance Verification Tool" over
 * clinic websites and social accounts and sends reports to the Registrar.
 * Superlative language is its single most common finding. This script applies
 * the same screening to the copy we control, in CI, so we cannot reintroduce a
 * finding after review.
 *
 * Sources (see docs/advertising-compliance.md):
 *  - Advertising and Marketing Standard of Practice (College of Physiotherapists
 *    of Alberta, January 2025)
 *  - Titles, Credentials and Specialty Designations Standard of Practice
 *  - Health Professions Act s.102 (advertising) and s.128(7) (use of "Doctor"/"Dr.")
 *  - CPTA "Good Practice: What Has the Advertising Compliance Verification Tool
 *    Shown Thus Far?" (2023)
 *
 * Usage: node scripts/check-advertising-copy.mjs [--json]
 * Exit code 1 when a finding is present.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SCAN_DIRS = ['app', 'components', 'lib/content'];
const SCAN_FILES = ['lib/simple-ai.ts'];
const EXTENSIONS = new Set(['.tsx', '.ts']);
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'public', 'ui']);

/**
 * Each rule: id, the Standard it comes from, the pattern, and the phrases that
 * are legitimate and must not be flagged. Allow entries carry the reason, so a
 * reviewer can see why a phrase is exempt instead of guessing.
 */
const RULES = [
  {
    id: 'superlative',
    standard: 'Advertising & Marketing — comparative/superlative statements',
    pattern: /\b(?:expert|experts|expertise|best|leading|premier|elite|top[- ]rated|world[- ]class|unmatched|unrivalled|award[- ]winning|number one|no\. ?1|#1)\b/gi,
    allow: [
      /\bbest practice\b/i, // clinical term of art, not a claim of superiority
      /\bbest with your next\b/i, // courtesy in a review response
      /\bbest evidence-based treatment\b/i, // describes the evidence, not the clinic
      /\bbest-?evidenced\b/i, // describes evidence quality, not the clinic
      /\bbest phone number\b/i, // intake form prompt
      /\bworks best\b/i, // conversational intake prompt
      /\bbest time to start\b/i, // educational content
      /\bsecond-best time\b/i, // educational content
      /\bbest paired with\b/i, // clinical guidance
      /\bat their best\b/i, // educational content
      /\bbest-supported\b/i, // describes the evidence, not the clinic
    ],
    note: '“expert”, “best”, “leading”, “premier”, “elite” are named by the College as superlatives.',
  },
  {
    id: 'specialization',
    standard: 'Advertising & Marketing + Titles, Credentials and Specialty Designations',
    pattern: /\b(?:specialist|specialists|specialize|specializes|specialized|specializing|specialization|specialisation)\b/gi,
    allow: [
      /\bspecialist (?:consultation|consultations|input|referral|referrals|reports|involvement|care)\b/i, // another regulated profession
      /\bsee a specialist\b/i,
      /\bto a specialist\b/i,
      /\bwith (?:a )?specialist\b/i,
      /\bany specialists involved\b/i, // other professions
      /\bphysician or specialist\b/i, // other professions
      /\bphysician and any specialists\b/i, // other professions
      /\bdoes not represent a practitioner as a specialist\b/i, // compliance statement
    ],
    note: 'Only a physiotherapist authorised by the Registrar may be called a “Clinical Specialist”. Describe equipment and programmes concretely instead.',
  },
  {
    id: 'outcome-claim',
    standard: 'Advertising & Marketing — guarantees / unrealistic expectations',
    pattern: /\b(?:guarantee|guarantees|guaranteed|proven|cure|cures|cured)\b/gi,
    allow: [
      /\bguaranteed to be covered\b/i, // banned example inside the AI system prompt
      /\bnot a cure\b/i, // educational, explicitly disclaims
      /\bnot the cure\b/i,
    ],
    note: 'Outcomes cannot be guaranteed; “proven results” needs verifiable evidence and is treated as a claim.',
  },
  {
    id: 'inducement',
    standard: 'Advertising & Marketing — incentives, discounts, free physiotherapy services',
    pattern: /\b(?:free (?:consultation|consultations|assessment|assessments|screening|screenings|trial|treatment|treatments|initial visit)|no[- ]obligation|discount(?:s|ed)?|coupon|gift certificate|limited[- ]time (?:offer|pricing))\b/gi,
    allow: [/\bIs there a free assessment\b/i],
    note: 'Free physiotherapy services, discounts, coupons, gift certificates and time-limited pricing may not be advertised as inducements.',
  },
  {
    id: 'title',
    standard: 'Titles, Credentials and Specialty Designations + HPA s.128(7)',
    pattern: /\b(?:Dr\.?|Doctor)\b/g,
    allow: [
      /\bDr\. ?Ramadan\b/i, // chiropractor, a different regulator — verify before publishing
    ],
    note: 'A physiotherapist may not use “Doctor”/“Dr.” while providing physiotherapy services to the public, even with a DPT or PhD.',
  },
  {
    id: 'comparative',
    standard: 'Advertising & Marketing — comparative statements, uniqueness claims',
    pattern: /\b(?:better than (?:other|any|most)|faster than (?:other|any)|unlike (?:other|any)|the only clinic|most advanced|cutting[- ]edge|state[- ]of[- ]the[- ]art|industry[- ]leading)\b/gi,
    allow: [/\bstate[- ]of[- ]the[- ]art language model\b/i],
    note: 'Comparative and uniqueness claims require immediately verifiable evidence.',
  },
];

const COLOUR = process.stdout.isTTY && !process.env.NO_COLOR;
const red = (s) => (COLOUR ? `\u001b[31m${s}\u001b[0m` : s);
const yellow = (s) => (COLOUR ? `\u001b[33m${s}\u001b[0m` : s);
const dim = (s) => (COLOUR ? `\u001b[2m${s}\u001b[0m` : s);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (EXTENSIONS.has(entry.slice(entry.lastIndexOf('.')))) out.push(full);
  }
  return out;
}

/**
 * Strip the parts of a source file that are not user-visible copy: imports,
 * className/style attribute values, and comments. This keeps the scan on
 * rendered text instead of CSS utility names ("leading-8" is not a superlative).
 */
function visibleLines(rawSource) {
  // Drop class-name attributes first, including template literals that span
  // lines — otherwise "leading-[1.1]" reads as the superlative "leading".
  const source = rawSource
    .replace(/className=\{`[\s\S]*?`\}/g, '')
    .replace(/className="[^"]*"/g, '');
  return source
    .split('\n')
    .map((line, i) => ({ line, number: i + 1 }))
    .filter(({ line }) => {
      const t = line.trim();
      if (t.startsWith('//') || t.startsWith('*') || t.startsWith('/*')) return false;
      if (t.startsWith('import ') || t.startsWith('export type')) return false;
      return true;
    })
    .map(({ line, number }) => {
      const stripped = line
        .replace(/className=(\{`[^`]*`\}|\{"[^"]*"\}|"[^"]*")/g, '')
        .replace(/style=\{\{[^}]*\}\}/g, '');
      return { text: stripped, number };
    });
}

function scanFile(file) {
  const findings = [];
  const lines = visibleLines(readFileSync(file, 'utf8'));
  for (const rule of RULES) {
    for (const { text, number } of lines) {
      rule.pattern.lastIndex = 0;
      let match;
      while ((match = rule.pattern.exec(text)) !== null) {
        const phrase = match[0];
        const window = text.slice(Math.max(0, match.index - 60), match.index + phrase.length + 60);
        if (rule.allow.some((re) => re.test(window))) continue;
        findings.push({
          rule: rule.id,
          standard: rule.standard,
          note: rule.note,
          phrase,
          file: relative(ROOT, file),
          line: number,
          context: text.trim().slice(0, 160),
        });
      }
    }
  }
  return findings;
}

const files = [];
for (const dir of SCAN_DIRS) {
  try {
    walk(join(ROOT, dir), files);
  } catch {
    /* directory may not exist in a trimmed checkout */
  }
}
for (const f of SCAN_FILES) {
  try {
    readFileSync(join(ROOT, f));
    files.push(join(ROOT, f));
  } catch {
    /* optional */
  }
}

const all = files.flatMap(scanFile);
const json = process.argv.includes('--json');

if (json) {
  console.log(JSON.stringify({ scanned: files.length, findings: all }, null, 2));
} else {
  if (all.length === 0) {
    console.log(`✓ advertising copy: ${files.length} files scanned, no College-flagged language found.`);
  } else {
    const byRule = new Map();
    for (const f of all) {
      if (!byRule.has(f.rule)) byRule.set(f.rule, []);
      byRule.get(f.rule).push(f);
    }
    for (const rule of RULES) {
      const list = byRule.get(rule.id);
      if (!list) continue;
      console.log(`\n${red('✗')} ${rule.id} — ${list.length} finding(s)`);
      console.log(dim(`   ${rule.standard}\n   ${rule.note}`));
      for (const f of list) {
        console.log(`   ${yellow(f.file)}:${f.line}  “${f.phrase}”`);
        console.log(dim(`      ${f.context}`));
      }
    }
    console.log(`\n${red(`${all.length} finding(s)`)} across ${files.length} files. See docs/advertising-compliance.md for the replacement lexicon.`);
  }
}

process.exit(all.length > 0 ? 1 : 0);

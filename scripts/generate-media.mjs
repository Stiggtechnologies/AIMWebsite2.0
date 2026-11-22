#!/usr/bin/env node
/**
 * Generate interim photography for the slots the source library cannot cover.
 *
 * The generated masters land in public/source/generated/. `scripts/build-media.py`
 * then crops and grades them into the same ratio set as the rest of the library,
 * so generated and sourced images end up visually consistent.
 *
 * Providers (first key present wins):
 *   OPENAI_API_KEY      -> gpt-image-1
 *   GEMINI_API_KEY      -> gemini-2.5-flash-image   (aka GEMINI_API_KEY)
 *   REPLICATE_API_TOKEN -> black-forest-labs/flux-1.1-pro
 *
 * Usage
 *   node scripts/generate-media.mjs --dry-run          # no key needed, no spend
 *   node scripts/generate-media.mjs                    # generate every frame
 *   node scripts/generate-media.mjs --only=senior,sport
 *   node scripts/generate-media.mjs --force            # overwrite existing masters
 *
 * Compliance — read docs/advertising-compliance.md before changing SPEC.
 * Generated images are ILLUSTRATIVE. They must never be captioned or implied to
 * be AIM's own patients, clinicians or premises. Every entry below carries a
 * `usage` field stating how the image may be used on the site; the page layer
 * respects it, and `npm run check:copy` guards the copy around it.
 */

import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = join(ROOT, 'public', 'source', 'generated');

/**
 * Shared style block. Every prompt ends with this so the outputs sit together
 * without a grade war. Documentary, not stock-cheesy: no white-teeth grins at
 * camera, no folded arms, no floating logos.
 */
const STYLE =
  'Documentary editorial photograph, natural window daylight, soft shadows, ' +
  'contemporary Canadian physiotherapy clinic interior, calm neutral palette with ' +
  'navy and teal accents, 35mm lens, shallow depth of field, realistic skin and ' +
  'fabric texture, no text, no logos, no watermarks, no brand marks, ' +
  'no medical procedures that break skin.';

const SPEC = [
  {
    key: 'senior',
    subject:
      'A physiotherapist standing close beside an adult in their seventies who is practising a ' +
      'single-leg balance exercise with a walking stick within reach. The clinician’s hand hovers ' +
      'at the person’s waist as a guard. Both are focused, not smiling at camera. Ordinary ' +
      'comfortable clothing, no exercise-brand logos.',
    aspect: 'portrait',
    usage: 'illustrative — /programs/senior hero. This is the real content gap.',
  },
  {
    key: 'sport',
    subject:
      'A physiotherapist timing a single-leg hop test for a competitive athlete on a rubber gym ' +
      'floor, chalk line visible, clinician crouched with a stopwatch, athlete mid-landing. ' +
      'Focus on movement and concentration, not celebration.',
    aspect: 'portrait',
    usage: 'illustrative — /programs/athletic hero and return-to-sport sections.',
  },
  {
    key: 'massage',
    subject:
      'A registered massage therapist treating a fully draped client’s shoulder with warm oil, ' +
      'hands and forearms in frame, treatment table with clean linens, dim warm light from a ' +
      'window on one side. Modest and clinical, not spa advertising.',
    aspect: 'landscape',
    usage: 'illustrative — /services/massage-therapy.',
  },
  {
    key: 'vestibular',
    subject:
      'A clinician guiding a seated adult through a vestibular gaze-stabilisation exercise, the ' +
      'clinician’s finger raised in front of the person’s eyes, both shown from the side in a ' +
      'quiet treatment room. Calm and attentive expressions.',
    aspect: 'landscape',
    usage: 'illustrative — /services/vestibular-rehabilitation, dizziness and concussion pages.',
  },
  {
    key: 'pelvic',
    subject:
      'Two people talking across a small table in a private, softly lit consultation room with a ' +
      'closed door visible in the background. A folder and a glass of water on the table. ' +
      'Dignified, no equipment, no treatment table.',
    aspect: 'landscape',
    usage: 'illustrative — /services/pelvic-floor-physiotherapy. Discretion is the point.',
  },
  {
    key: 'facility',
    subject:
      'A modern low-rise medical clinic exterior on a quiet Canadian street in late winter, ' +
      'warm light inside the windows, clean snow at the kerb, no signage and no street names. ' +
      'Generic — it must not read as any specific building.',
    aspect: 'landscape',
    usage:
      'illustrative only — NEVER captioned as an AIM clinic. Review before use; a real photo of ' +
      'each location is the correct answer.',
  },
  {
    key: 'reception',
    subject:
      'An empty, tidy clinic reception and waiting area: a light wood counter, two upholstered ' +
      'chairs, a plant, a low table with magazines, morning light. No people, no signage.',
    aspect: 'landscape',
    usage:
      'illustrative only — NEVER captioned as an AIM clinic. Review before use.',
  },
  {
    key: 'treatment-room',
    subject:
      'An empty physiotherapy treatment room: a raised treatment table with fresh paper, a stool, ' +
      'a wall-mounted skeleton poster without readable text, resistance bands on hooks, soft ' +
      'daylight. No people, no signage.',
    aspect: 'landscape',
    usage:
      'illustrative only — NEVER captioned as an AIM clinic. Review before use.',
  },
  {
    key: 'team',
    subject:
      'A candid moment between three clinicians in a clinic corridor, one holding a clipboard, ' +
      'mid-conversation, framed from behind and to the side so no face is fully identifiable. ' +
      'Natural light, no posing.',
    aspect: 'landscape',
    usage:
      'illustrative only — NEVER used as “meet the team” or with names. Real staff photos are ' +
      'the correct answer for /about and /careers.',
  },
  {
    key: 'streetscape',
    subject:
      'A quiet Edmonton residential-commercial street in winter, low-rise buildings, parked cars ' +
      'under light snow, blue-hour light, no readable signage. Atmospheric, no people.',
    aspect: 'landscape',
    usage:
      'illustrative only — atmospheric band for location pages. Must not imply a specific clinic ' +
      'location.',
  },
];

const ASPECT_SIZE = {
  portrait: { openai: '1024x1536', replicate: '3:4' },
  landscape: { openai: '1536x1024', replicate: '3:2' },
  square: { openai: '1024x1024', replicate: '1:1' },
};

const COST_PER_IMAGE = { openai: 0.17, gemini: 0.04, replicate: 0.05 };

function args() {
  const argv = process.argv.slice(2);
  const onlyArg = argv.find((a) => a.startsWith('--only='));
  return {
    dryRun: argv.includes('--dry-run'),
    force: argv.includes('--force'),
    only: onlyArg ? onlyArg.split('=')[1].split(',').map((s) => s.trim()) : null,
  };
}

function provider() {
  if (process.env.OPENAI_API_KEY) return 'openai';
  if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) return 'gemini';
  if (process.env.REPLICATE_API_TOKEN) return 'replicate';
  return null;
}

function buildPrompt(entry) {
  const orientation =
    entry.aspect === 'portrait'
      ? 'Vertical composition, subject centred with headroom above and floor visible below.'
      : 'Horizontal composition, generous space on one side for text overlay.';
  return `${entry.subject} ${orientation} ${STYLE}`;
}

async function generateOpenAI(prompt, aspect) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-image-1',
      prompt,
      size: ASPECT_SIZE[aspect].openai,
      quality: 'high',
      n: 1,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const json = await res.json();
  return Buffer.from(json.data[0].b64_json, 'base64');
}

async function generateGemini(prompt) {
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent`,
    {
      method: 'POST',
      headers: { 'x-goog-api-key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseModalities: ['IMAGE'] },
      }),
    }
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const json = await res.json();
  const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part) throw new Error('Gemini returned no image part');
  return Buffer.from(part.inlineData.data, 'base64');
}

async function generateReplicate(prompt, aspect) {
  const create = await fetch('https://api.replicate.com/v1/models/black-forest-labs/flux-1.1-pro/predictions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
      Prefer: 'wait',
    },
    body: JSON.stringify({ input: { prompt, aspect_ratio: ASPECT_SIZE[aspect].replicate, output_format: 'png' } }),
  });
  if (!create.ok) throw new Error(`Replicate ${create.status}: ${(await create.text()).slice(0, 300)}`);
  let json = await create.json();
  for (let i = 0; i < 60 && json.status !== 'succeeded'; i++) {
    if (json.status === 'failed' || json.status === 'canceled') throw new Error(`Replicate ${json.status}`);
    await new Promise((r) => setTimeout(r, 2000));
    const poll = await fetch(json.urls?.get, { headers: { Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}` } });
    json = await poll.json();
  }
  const url = Array.isArray(json.output) ? json.output[0] : json.output;
  if (!url) throw new Error('Replicate returned no output URL');
  const img = await fetch(url);
  return Buffer.from(await img.arrayBuffer());
}

const GENERATORS = { openai: generateOpenAI, gemini: generateGemini, replicate: generateReplicate };

async function main() {
  const { dryRun, force, only } = args();
  const chosen = provider();
  const entries = only ? SPEC.filter((e) => only.includes(e.key)) : SPEC;

  if (!chosen && !dryRun) {
    console.error(
      [
        'No image provider configured.',
        '',
        'Set ONE of these in .env.local (or your shell) and re-run:',
        '  OPENAI_API_KEY=sk-...          gpt-image-1',
        '  GEMINI_API_KEY=...             gemini-2.5-flash-image',
        '  REPLICATE_API_TOKEN=r8_...     flux-1.1-pro',
        '',
        'Run with --dry-run to see the prompts without spending anything.',
      ].join('\n')
    );
    process.exit(1);
  }

  console.log(
    `provider: ${chosen ?? '(dry run — none configured)'}   frames: ${entries.length}   ` +
      `estimated cost: ~$${(COST_PER_IMAGE[chosen] ?? 0.1) * entries.length}`
  );

  mkdirSync(OUT_DIR, { recursive: true });
  let made = 0;

  for (const entry of entries) {
    const out = join(OUT_DIR, `${entry.key}.png`);
    const prompt = buildPrompt(entry);

    if (existsSync(out) && !force) {
      console.log(`  skip   ${entry.key}  (exists; --force to overwrite)`);
      continue;
    }
    if (dryRun) {
      console.log(`\n── ${entry.key} (${entry.aspect}) → ${out.replace(ROOT + '/', '')}`);
      console.log(`   usage: ${entry.usage}`);
      console.log(`   prompt: ${prompt}\n`);
      continue;
    }

    process.stdout.write(`  gen    ${entry.key} ... `);
    try {
      const buf = await GENERATORS[chosen](prompt, entry.aspect);
      writeFileSync(out, buf);
      made++;
      console.log(`ok (${Math.round(buf.length / 1024)} KB)`);
    } catch (err) {
      console.log(`FAILED — ${err.message}`);
    }
  }

  if (dryRun) {
    console.log(
      '\nNext: set a key, re-run without --dry-run, then `python3 scripts/build-media.py` to crop and grade.'
    );
  } else {
    console.log(
      `\n${made} master(s) written to public/source/generated/.` +
        '\nNow run: python3 scripts/build-media.py   (crops, grades, and updates lib/media.generated.json)'
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

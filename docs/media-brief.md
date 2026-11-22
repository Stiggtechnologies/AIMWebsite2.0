# Photography system and shoot brief

## The problem this fixes

Before this branch, AIM's site had **no photography on any customer-facing page
except three partner landing pages**. The homepage, all four program pages, all
eighteen service pages, every condition page, every location page and the about
page were text and icons.

That is a conversion problem more than an aesthetic one. A physiotherapy page has
to answer three questions before someone books: *what will you do to me, who will
do it, and where does it happen?* Text answers the first, icons answer none, and
photography answers the second and third faster than any paragraph.

## Architecture

```
public/source photos  ──►  scripts/build-media.py  ──►  public/media/*.webp
                                    │                          │
                                    └──► lib/media.generated.json
                                                                 │
                                            lib/media.ts  ◄──────┘
                                          (slots, alt, resolvers)
                                                                 │
                                   components/media/site-image.tsx
                                    SiteImage · MediaPanel · PhotoBand · MediaSplit
                                                                 │
                                    pages and shared blocks
```

**One file decides which photo a page type gets.** `lib/media.ts` maps program,
service and condition slugs to slots. Changing a photo everywhere it appears is a
one-line edit — no page knows a file path.

### Why a build script at all

The interim library is a small set of source renders reused across many page
types. Cropping by hand drifts: the fourth person to edit an image leaves a
different colour cast and a different crop height. `scripts/build-media.py` crops
to a fixed ratio set around a declared focal point, applies one shared grade
(cooler shadows toward AIM navy, lifted highlights, −6% saturation, light
sharpening), encodes WebP at quality 84 and emits a 24px blur placeholder.

```bash
python3 scripts/build-media.py   # requires Pillow + numpy
```

### Components

| Component | Use |
| --- | --- |
| `SiteImage` | Any in-flow image. Reserves the aspect ratio, so CLS stays 0, and applies the shared frame (rounded 3xl, hairline ring, soft navy elevation). |
| `MediaPanel` | Brand panel for a slot with **no trustworthy photo**. Exists so a page never borrows an unrelated image to fill a hole. |
| `PhotoBand` | Full-width band with a navy scrim and overlaid copy. Once per page, maximum. |
| `MediaSplit` | Two-column photo + copy, alternating side. This is what stops a long page feeling like a form. |

### Performance rules encoded in the components

1. **`priority` is for one image per route** — the above-the-fold hero. Everything
   else lazy loads. Six priority program cards would compete with the LCP element.
2. **Every frame declares its ratio**, so no image load shifts layout.
3. **`sizes` must be honest**, because it decides which file the browser fetches.
4. **Blur placeholders are per-image**, generated from the image itself — not a
   generic grey box.

## Placement map

The rule applied: a photo earns its place if it does one of four jobs — show the
experience of treatment, show the setting, explain a process, or break a long run
of text. Decorative filler was declined.

| Page | Placement | Slot |
| --- | --- | --- |
| `/` | Hero, copy left / photo right, review chip overlay | `assess-hero` |
| `/` | Six program cards, photo-led with overlapping icon chip | `work-card`, `assess-card`, `assess-detail`, `work-detail`, `refer-card`; seniors uses no photo |
| `/` | Full-width proof band before the value props | `work-wide` |
| `/` | "Why AIM" split with a wait-time stat card | `assess-portrait` |
| `/programs/wcb` | Hero | `work-hero` |
| `/programs/mva` | Hero | `assess-hero` |
| `/programs/athletic` | Hero | `assess-portrait` |
| `/programs/senior` | Hero **without a photo** — brand panel with a 1:1 assessment statement | — |
| `/services/*` | Hero + "how the first appointment runs" split | `assess-wide` / `work-wide` / `assess-card` |
| `/conditions/*` | Hero + "what an assessment looks like" split | `assess-card` / `assess-wide` |
| `/locations/*` | "What to expect when you arrive" split. **No facility photo** — we do not have one, and implying a building we cannot show would be misleading. | `assess-wide` |
| `/about` | "Who we are" split | `assess-portrait` |
| `/get-care` | Four-step process intro split | `refer-wide` |
| `/who-we-help` | Photo-led persona cards | `work-card`, `assess-card`, `assess-detail`, `work-detail`, `refer-card` |

Also fixed in passing: location pages were rendering a literal
`[Team bios coming soon. We're hiring — see our careers page.]` placeholder to
production. It is replaced with a real "what to expect" section.

## Slot inventory

| Slot | Ratio | Source | Notes |
| --- | --- | --- | --- |
| `assess-hero` | 4:5 | assessment render | homepage LCP |
| `assess-wide` | 16:9 | assessment render | service/condition splits |
| `assess-card` | 4:3 | assessment render | cards |
| `assess-portrait` | 3:4 | assessment render | about, why-AIM |
| `assess-detail` | 1:1 | assessment render | athletic card |
| `work-hero` | 4:5 | warehouse render | WCB hero |
| `work-wide` | 16:9 | warehouse render | proof band, employer pages |
| `work-card` | 4:3 | warehouse render | WCB cards |
| `work-detail` | 1:1 | warehouse render | employer cards |
| `refer-hero` | 4:5 | referral render | insurers / referrers |
| `refer-wide` | 16:9 | referral render | get-care, referrers |
| `refer-card` | 4:3 | referral render | insurer cards |
| `refer-portrait` | 3:4 | referral render | spare |
| `legal-wide` | 16:9 | legal render | lawyer pages |
| `legal-card` | 4:3 | legal render | lawyer cards |
| `legal-portrait` | 3:4 | legal render | spare |

## Compliance constraints on photography

Full detail in [`advertising-compliance.md`](./advertising-compliance.md). In short:

- **No identifiable patients.** The College discourages publishing client photos,
  videos and stories; if a clinic does, express HIA consent is required covering
  how it is shared, stored, for how long, in perpetuity, and the limits of our
  control. The interim library contains none.
- **Never imply the photo is AIM's clinic, team or patient.** No names or titles
  on illustrative faces, no "our team" photo grids, no "our South Common treatment
  room" captions.
- **No before/after, no outcome claim attached to an image.**
- **Alt text is descriptive and lives in the manifest**, so a page author cannot
  attach a claim to a photo.
- **Disclosed as illustrative** in the footer and on `/ai-disclosure`.

## Generating interim frames (no shoot required)

There is no local image model on this machine and no key committed to the repo, so
generation is a one-command step you run when you are ready to spend a few dollars.

```bash
export OPENAI_API_KEY=sk-...        # or GEMINI_API_KEY, or REPLICATE_API_TOKEN
node scripts/generate-media.mjs     # ~10 frames, roughly $1–2
python3 scripts/build-media.py      # crop + grade into the existing slots
npm run build
```

`npm run media:generate -- --dry-run` prints every prompt and the estimated cost
without contacting any provider, so the prompts can be reviewed before spending.

The ten prompts live in `scripts/generate-media.mjs` and cover the gap list:
senior balance, return-to-sport testing, massage, vestibular, pelvic, clinic
exterior, reception, treatment room, team corridor, Edmonton streetscape. They all
share one style block (documentary, natural daylight, navy/teal palette, no text or
logos) so the outputs grade consistently with the sourced library.

### What happens before the generator runs

The optional slots do not exist. `build-media.py` skips them with a message,
`hasImage()` returns false, and the pages fall back to their brand panel or to the
closest sourced frame. Nothing breaks, and nothing pretends a photo exists.

### Compliance guardrail on generated images

Each prompt carries a `usage` field, and three of the ten are deliberately
restricted:

| Frame | Rule |
| --- | --- |
| `facility`, `reception`, `treatment-room` | **Never captioned as an AIM clinic.** A generated building would be a misrepresentation. Review before use; a real photo per location is the correct answer. |
| `team` | **Never used as "meet the team", never with names.** Framed from behind so faces are not identifiable. Real staff photos remain the correct answer. |
| `streetscape` | Atmospheric band only; must not imply a specific clinic location. |

The other frames are ordinary illustrative photography of the kind clinics routinely
license, and are covered by the disclosure already in the footer and on
`/ai-disclosure`.

## Shoot brief — the frames this system is waiting for

The interim set covers assessment, return-to-work, referral and legal meeting
contexts. It does **not** cover the subjects below, which is why those pages use a
brand panel or a generic clinical image instead of a wrong one.

A half-day shoot at the Main Hub produces all of it. Deliver each frame in the
listed ratios, two exposures (tight and wide), colour-graded to sit with the
existing set.

| # | Frame | Ratios | Where it goes | Consent |
| --- | --- | --- | --- | --- |
| 1 | Clinic exterior with signage, Edmonton streetscape visible | 16:9, 4:3 | location heroes, contact | none |
| 2 | Reception / waiting area, no patients | 16:9, 4:3 | locations, about | staff |
| 3 | Treatment room, table and equipment, no people | 4:3, 1:1 | locations, service pages | none |
| 4 | Physiotherapist assessing a patient's neck/shoulder, hands and face in frame | 4:5, 16:9, 4:3 | homepage hero, MVA, whiplash | **model release + HIA consent** |
| 5 | Senior patient doing balance/gait work with clinician guarding | 4:5, 4:3 | `/programs/senior` — currently a gap | **model release + HIA consent** |
| 6 | Athlete doing a return-to-sport test (hop, single-leg, agility) | 4:5, 16:9 | `/programs/athletic` | **model release** |
| 7 | Worker in hi-vis doing a functional lift assessment with clinician | 16:9, 4:3 | WCB, employers | model release |
| 8 | Clinician and case manager / physician reviewing a file | 16:9 | insurers, referrers | model release |
| 9 | Team portrait, 3–5 clinicians, clinic background | 3:2, 1:1 | about, careers | staff consent |
| 10 | Individual clinician portraits, consistent crop and light | 4:5 | about "meet the team", booking portal | staff consent |

Notes for the shoot:

- **Use real staff, and real patients only with releases.** The cleanest route is
  staff plus paid models for the treatment frames; a model release is simpler than
  HIA consent and avoids putting an actual patient's care on the internet.
- **Shoot for the crops.** Leave headroom in the 4:5 frame and keep faces out of
  the bottom ~15% where the review chip and gradients sit.
- **Match the grade.** Neutral daylight, no heavy filters — the build script
  applies the house grade.
- **Consent paperwork.** Store signed releases with the intake records, not in the
  repo. Note in the shoot brief that the College discourages publishing client
  images; if a real patient appears, the consent must cover website, social and
  advertising use, retention, and the limits of control.

### Swapping the shoot in

1. Drop masters in `public/source/`.
2. Update `SOURCES` and, if the ratios change, `SLOTS` in `scripts/build-media.py`.
3. Run `python3 scripts/build-media.py`.
4. Update alt text in `lib/media.ts` — this is the only manual step, and it is
   deliberate: alt text should describe the new frame, not the old one.
5. `npm run build` and check the homepage, a service page, a condition page and a
   location page.

No page component needs to change.

## Accessibility

- Alt text describes the frame, not the brand: "A physiotherapist assessing a
  patient's shoulder range of motion", never "expert physiotherapy care".
- Images that only restate adjacent text are decorative and take `alt=""`; none of
  the current placements are decorative.
- Contrast: white copy sits on a navy scrim at ≥78% opacity, and never directly on
  an unscrimmed photo.
- Reduced motion: the only motion is a 1.03 card zoom on hover, which is not
  load-bearing.

# silvia arellano — brand specification

Version 1.0 · Owner: Silvia Arellano Romero · Last updated 2026-09-07

> **How to use this file.** Paste it whole into an agent's context before asking it to
> build any page, slide, README header, or social asset for this brand. Every rule
> below is normative: MUST rules are non-negotiable, SHOULD rules are defaults you may
> break with a stated reason.

---

## 1. Thesis

The brand is built on **waves** — signal, frequency, continuous flow.

This is not decoration borrowed from a physics textbook cover. It is literal:
Silvia trained as a physicist and now works on streaming data, change-data-capture,
and data freshness. Waves are what the work actually is. Every visual decision
traces back to that: posterized bands of moving water, print grain, chrome yellow
against deep green.

**Positioning line:** Data Platform Architect — data platform architecture,
GCP/BigQuery, and AI-assisted delivery. Builder of wayworks.

**One-sentence statement:** *i build the machinery underneath other people's businesses.*

**Visual lineage:** the *Berkeley Physics Course, Volume 3: Waves* cover (duotone
posterized photograph, full bleed, lowercase Helvetica set directly on the image,
violent scale contrast between title and caption). Reference the structure, never
reproduce the artwork.

---

## 2. Voice

| Rule | Detail |
|---|---|
| Case | **MUST** be lowercase throughout, including headings, buttons, nav, and the wordmark. Set once via `body { text-transform: lowercase; }`. Proper nouns stay lowercase too — `gcp`, `bigquery`, `madrid`. |
| Person | First person singular. "i build", "i'm brought in for". Never third-person bio voice. |
| Register | Plain, declarative, a little dry. Short sentences. |
| Forbidden | Em-dash asides, "not X but Y" constructions, exclamation marks, "passionate", "leverage", "cutting-edge", "solutions", "empower", "journey". |
| Numbers | Only real ones. Never invent a year, a headcount, or a client count to fill a shape. |
| Language | English primary. Spanish is used in life, not on the marketing surface, unless a page is deliberately bilingual. |

---

## 3. Color

### Tokens

| Token | Hex | Role |
|---|---|---|
| `--abyss` | `#0E2019` | Primary dark ground. Cover, dark sections, body text on light. |
| `--deep` | `#173A2C` | Mid green. Secondary text on light, wave trough, third card. |
| `--sea` | `#4FA97F` | **PLACEHOLDER — replace with the real brand green.** Accent surfaces, contact block, wave mid-band. |
| `--chrome` | `#F2C13D` | Chrome yellow. The signal color. Wave foam, roster ground, highlights. |
| `--foam` | `#F4F2E7` | Warm off-white. Page ground, text on dark. |

Chrome yellow is the brand's loudest voice. **SHOULD** appear on every surface at
least once, even if only as a single fleck of spray.

### Contrast — measured, WCAG 2.1

| Pairing | Ratio | Verdict |
|---|---|---|
| foam on abyss | 15.09 | AAA |
| foam on deep | 11.14 | AAA |
| abyss on foam | 15.09 | AAA |
| abyss on chrome | 10.06 | AAA |
| chrome on abyss | 10.06 | AAA |
| chrome on deep | 7.43 | AAA |
| abyss on sea | 5.90 | AA body |
| sea on deep | 4.36 | Large text only (≥24px, or ≥19px bold) |
| **foam on sea** | **2.56** | **FAIL — MUST NOT be used for text** |

**Hard rules:**
- Text on `--sea` **MUST** be `--abyss`. Never `--foam`, never white.
- `--sea` on `--deep` is for display sizes only.
- When `--sea` is replaced with the real brand green, **re-run the contrast check
  in §8** before shipping. A different green invalidates this table.

### Combinations that are on-brand

- abyss ground + chrome type + sea wave band ← the cover
- chrome ground + abyss type ← the roster / services band
- foam ground + abyss type + sea accent ← body sections
- sea ground + abyss type ← the contact block

### Do not

- Add a sixth color. The palette is closed.
- Use gradients as decoration. The only gradients permitted are the cover scrims (§5).
- Use pure white `#FFF` or pure black `#000` anywhere.
- Put chrome yellow on foam as text — it fails contrast badly.

---

## 4. Typography

**One family: Archivo.** Weights 400, 500, 600, 700.
`https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap`
Fallback stack: `"Archivo", Helvetica, Arial, sans-serif`.

Archivo stands in for the Helvetica of the source cover — a neutral grotesque doing
all the work through **scale and weight contrast**, not through a second typeface.
**MUST NOT** introduce a display face, a serif, or a monospace face. If something
needs emphasis, change its size or its color, not its family.

### Scale

| Role | Size | Weight | Tracking | Leading |
|---|---|---|---|---|
| Cover wordmark | `clamp(4.25rem, 2rem + 16.5vw, 14.5rem)` | 700 | `-0.05em` | 0.8 |
| Cover caption | `clamp(0.75rem, 0.68rem + 0.35vw, 1rem)` | 400 | `+0.06em` | normal |
| Caption numeral | `clamp(1.9rem, 1rem + 3.6vw, 3.75rem)` | 700 | `-0.04em` | 0.7 |
| H1 statement | `clamp(2rem, 1rem + 5.2vw, 4.5rem)` | 700 | `-0.038em` | 0.99 |
| H2 section | `clamp(1.75rem, 1.15rem + 2vw, 2.75rem)` | 700 | `-0.032em` | 1.0 |
| H3 / band key | `1.3rem` | 700 | `-0.025em` | 1.14 |
| Roster item | `clamp(1.1rem, 0.9rem + 1.2vw, 1.8rem)` | 500 | `-0.02em` | normal |
| Body | `clamp(1rem, 0.95rem + 0.2vw, 1.0625rem)` | 400 | 0 | 1.55 |
| Tag / role pill | `0.8125rem` | 600 | `+0.03em` | normal |

**The signature move is the caption pairing:** a hairline lowercase caption at ~14px
sitting beside a numeral at ~60px, baseline-aligned. That extreme jump is the single
most recognizable typographic gesture in the system. Use it once per page, no more.

**Rules**
- Display sizes (≥1.75rem) **MUST** carry negative tracking. Small caption text
  **MUST** carry positive tracking. Never the reverse.
- Measure: body text **MUST NOT** exceed `64ch`. Lead paragraphs cap at `54ch`.
- **MUST NOT** use all-caps anywhere, including labels and eyebrows.

---

## 5. The wave

### Construction rules

The wave is **drawn, never photographed**. It is built from stacked bezier bands that
alternate light and dark to read as posterization — the same effect a two-color print
process produces from a photograph.

1. Five to six bands, each a closed path anchored to the bottom edge.
2. Band fill order back-to-front **MUST** alternate: `chrome → sea → chrome → deep → abyss`.
3. Each successive band sits lower and flattens — the crest is back-left, the wave
   dissipates toward the bottom-right.
4. One dark "curl lip" shape at 50% opacity sits over the back band to give the crest depth.
5. Spray: chrome-filled circles, radius 2.5–6px, scattered **above** the crest.
6. Foam flecks: foam-filled circles, radius 2–3px, at 70% opacity, along the crest line.
7. A grain rect covers the whole SVG last.

### Source

```html
<svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMax slice">
  <defs>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <filter id="soften"><feGaussianBlur stdDeviation="1.2"/></filter>
  </defs>

  <!-- spray thrown up over whatever sits behind -->
  <g fill="#F2C13D">
    <circle cx="250" cy="72"  r="4"/>   <circle cx="336" cy="34"  r="2.5"/>
    <circle cx="410" cy="96"  r="5"/>   <circle cx="472" cy="46"  r="3"/>
    <circle cx="198" cy="128" r="3"/>   <circle cx="548" cy="96"  r="2.5"/>
    <circle cx="296" cy="156" r="6"/>   <circle cx="130" cy="94"  r="2.5"/>
    <circle cx="616" cy="136" r="3.5"/> <circle cx="376" cy="192" r="3"/>
    <circle cx="700" cy="108" r="2.5"/> <circle cx="90"  cy="168" r="4"/>
  </g>

  <!-- back swell -->
  <path d="M0,190 C210,60 402,20 588,68 C790,120 940,252 1200,204 L1200,520 L0,520 Z"
        fill="#F2C13D" filter="url(#soften)"/>
  <!-- curl lip -->
  <path d="M96,202 C238,66 428,34 596,94 C700,130 772,196 812,250 C744,180 636,128 520,124 C374,118 214,150 96,202 Z"
        fill="#0E2019" opacity=".5"/>
  <!-- mid -->
  <path d="M0,268 C232,154 434,116 620,170 C824,228 968,338 1200,292 L1200,520 L0,520 Z"
        fill="#4FA97F"/>
  <!-- inner -->
  <path d="M0,346 C252,250 462,212 650,268 C856,328 996,414 1200,374 L1200,520 L0,520 Z"
        fill="#F2C13D" opacity=".93"/>
  <!-- trough -->
  <path d="M0,424 C272,348 490,310 682,364 C888,420 1020,486 1200,452 L1200,520 L0,520 Z"
        fill="#173A2C"/>
  <!-- shore -->
  <path d="M0,478 C296,422 512,392 706,428 C902,464 1032,502 1200,486 L1200,520 L0,520 Z"
        fill="#0E2019"/>

  <g fill="#F4F2E7" opacity=".7">
    <circle cx="704" cy="206" r="3"/> <circle cx="776" cy="240" r="2"/>
    <circle cx="456" cy="152" r="2.5"/> <circle cx="884" cy="288" r="2.5"/>
    <circle cx="304" cy="188" r="2"/>
  </g>

  <rect width="1200" height="520" filter="url(#grain)" opacity=".4"
        style="mix-blend-mode:overlay"/>
</svg>
```

### Placement

- **Full cover:** wave occupies the bottom 64% of the hero (56% on mobile), anchored
  to the bottom edge, `preserveAspectRatio="xMidYMax slice"`.
- **Section divider:** the same SVG cropped to its bottom 200px, 4–8rem tall.
- **Favicon / avatar:** crop to the crest region only (roughly `viewBox="380 60 440 440"`).
- **MUST NOT** flip the wave vertically, rotate it, or center it as a standalone logo.
  It is always a horizon.

### Grain

Grain is not optional — it is what makes the system read as print rather than vector.

```css
/* as an SVG rect, last child, over the artwork */
opacity: .40;
mix-blend-mode: overlay;
```

Apply at `0.34–0.42` opacity over any large image or artwork area. **SHOULD NOT** be
applied over body text.

---

## 6. Photography

Photographs of Silvia **MUST** be duotoned into the palette, never used full-color.

```css
background-image: url("silvia.jpg");
background-size: cover;
background-position: center 22%;
background-color: var(--chrome);      /* or --sea for a cooler treatment */
background-blend-mode: luminosity;
filter: grayscale(1) contrast(1.06) brightness(1.02);
```

On the cover, the portrait sits behind the wave, with a scrim between them:

```css
background:
  linear-gradient(to bottom, rgba(14,32,25,.72) 0%, rgba(14,32,25,.15) 26%, rgba(14,32,25,0) 46%),
  linear-gradient(to bottom, rgba(14,32,25,0) 40%, rgba(14,32,25,.35) 62%);
```

---

## 7. Components

| Component | Spec |
|---|---|
| **Pill** (roster item, role tag) | `border-radius: 100px`, padding `.3rem .95rem .42rem`. Fills cycle `abyss → foam → sea`, text always contrast-safe per §3. |
| **Button / link** | Pill shape, `background: var(--abyss)`, `color: var(--foam)`, padding `.55rem 1.15rem`, weight 600. Hover swaps to `--sea` with `--abyss` text. **MUST NOT** append a `→` arrow to the label. |
| **Band** (work entry) | Two-column grid `.5fr / 1.5fr`, `border-top: 2px solid var(--abyss)`, gap `clamp(.9rem, 4vw, 3.25rem)`. Collapses to one column below 860px. |
| **Card** (principle) | `border-radius: 6px`, padding `1.4rem 1.35rem 1.5rem`. Fills cycle `chrome → sea → deep`. **MUST NOT** carry a shadow or a border. |
| **Radius** | Only two values exist: `100px` for pills, `6px` for cards. Everything else is square. |
| **Shadows** | None. The system has no shadows. Depth comes from color layering. |

---

## 8. Layout & tokens

Container `max-width: 1220px`. Gutter `clamp(1.15rem, 5vw, 4.5rem)`.
Single breakpoint at `860px` — all two-column grids collapse to one.
Section padding `clamp(3rem, 6vw, 4.5rem)`.

```css
:root{
  --abyss:#0E2019;
  --deep:#173A2C;
  --sea:#4FA97F;          /* replace with real brand green */
  --chrome:#F2C13D;
  --foam:#F4F2E7;
  --gutter:clamp(1.15rem,5vw,4.5rem);
  --radius-pill:100px;
  --radius-card:6px;
  --measure:64ch;
}
body{
  background:var(--foam);
  color:var(--abyss);
  font-family:"Archivo",Helvetica,Arial,sans-serif;
  font-size:clamp(1rem,.95rem + .2vw,1.0625rem);
  line-height:1.55;
  text-transform:lowercase;
}
```

### Contrast check script

Run this after changing any color token.

```python
def lum(h):
    h=h.lstrip('#'); c=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    c=[x/12.92 if x<=0.03928 else ((x+0.055)/1.055)**2.4 for x in c]
    return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]
def cr(a,b):
    l1,l2=sorted([lum(a),lum(b)],reverse=True)
    return (l1+0.05)/(l2+0.05)

print(cr('#0E2019','#4FA97F'))   # abyss on sea — must be >= 4.5
```

---

## 9. Quick reference for agents

**Build a page in this brand:**
1. Copy the `:root` block and `body` rule from §8 verbatim.
2. Load Archivo 400/500/600/700. No other font.
3. Ground the page in `--foam`; make the hero `--abyss` with the §5 wave anchored bottom.
4. Alternate section grounds `foam → chrome → foam → abyss → foam → sea`.
5. Write all copy lowercase, first person, per §2.
6. Check every `--sea` surface uses `--abyss` text.
7. Add nothing that isn't specified here — no shadows, no gradients, no second font,
   no sixth color, no icons.

**Known placeholders that MUST be replaced before shipping:**
- `--sea` green value
- GitHub URL
- Email address
- The cover caption numeral

---

## 10. The mark — swallow

A swallow trailing the brand wave, coiled. Original artwork, not derived from any
existing logo. The ribbon uses the same band system as §5, tapered: wide where it
leaves the bird, thin at the centre of the curl.

### Files

| File | Use |
|---|---|
| `logo-swallow.svg` | Primary. Four bands. Light grounds, 64px and up. |
| `logo-swallow-dark.svg` | Dark grounds. Bird in foam, separator bands in abyss. |
| `logo-swallow-compact.svg` | Below 64px. Two bands, thickened. Favicons, avatars. |
| `logo-swallow-mono.svg` | Single colour. Stamps, embroidery, one-colour print. |

### Construction

Bird: overlapping filled primitives in `--abyss` — body ellipse, tilted head ellipse,
triangular beak, forked tail path, two swept wing blades. Always flying up and to the right.

Ribbon: a centreline of a cubic lead-in joined tangentially to an Archimedean spiral
(centre 176,372 · outer r 92 · inner r 22 · 1.0 turn), offset to a filled polygon with
a power taper. Bands are nested scales of the same polygon:
`1.00 sea → 0.74 foam → 0.50 chrome → 0.22 foam`.

**The clearance rule:** ribbon width at the point it enters the coil MUST be less than
the radial gap between turns, or the bands merge into a blur. Gap = (r_outer − r_inner) / turns
= 70px here, and the width there is 52px. Changing the taper, the turn count, or the
radii means re-checking this.

### Rules

- **MUST NOT** flip, rotate, or mirror the bird.
- **MUST NOT** add a shadow, outline, or containing circle.
- **MUST NOT** place on `--sea` — the abyss bird loses contrast against it.
- **MUST** switch to compact below 64px; the four-band ribbon collapses at small sizes.
- Clear space on all sides equals the height of the bird's head.
- In lockup, the mark sits left of the wordmark, never stacked above it — the
  composition already reads diagonally.

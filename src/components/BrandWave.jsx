import { useId } from "react";

// The brand wave — spec §5. Drawn, never photographed: stacked bezier bands
// alternating chrome → sea → chrome → deep → abyss so the crest reads as a
// two-colour print posterization. It is always a horizon: never flipped,
// rotated, or centred as a standalone logo.
//
// variant "cover"   — full artwork, anchored to the bottom edge of a hero.
// variant "divider" — the same artwork cropped to its bottom 200px.
const VIEW_BOXES = {
  cover: "0 0 1200 520",
  divider: "0 320 1200 200",
};

export default function BrandWave({ variant = "cover", className = "" }) {
  // Filter ids must be unique per instance, or a second wave on the page
  // re-uses the first one's filter region and renders without grain.
  const uid = useId().replace(/:/g, "");
  const grain = `wave-grain-${uid}`;
  const soften = `wave-soften-${uid}`;

  return (
    <svg
      viewBox={VIEW_BOXES[variant] ?? VIEW_BOXES.cover}
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={grain} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <filter id={soften}>
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      {/* spray thrown up over whatever sits behind */}
      <g fill="#F2C13D">
        <circle cx="250" cy="72" r="4" />
        <circle cx="336" cy="34" r="2.5" />
        <circle cx="410" cy="96" r="5" />
        <circle cx="472" cy="46" r="3" />
        <circle cx="198" cy="128" r="3" />
        <circle cx="548" cy="96" r="2.5" />
        <circle cx="296" cy="156" r="6" />
        <circle cx="130" cy="94" r="2.5" />
        <circle cx="616" cy="136" r="3.5" />
        <circle cx="376" cy="192" r="3" />
        <circle cx="700" cy="108" r="2.5" />
        <circle cx="90" cy="168" r="4" />
      </g>

      {/* back swell */}
      <path
        d="M0,190 C210,60 402,20 588,68 C790,120 940,252 1200,204 L1200,520 L0,520 Z"
        fill="#F2C13D"
        filter={`url(#${soften})`}
      />
      {/* curl lip — gives the crest depth */}
      <path
        d="M96,202 C238,66 428,34 596,94 C700,130 772,196 812,250 C744,180 636,128 520,124 C374,118 214,150 96,202 Z"
        fill="#0E2019"
        opacity=".5"
      />
      {/* mid */}
      <path
        d="M0,268 C232,154 434,116 620,170 C824,228 968,338 1200,292 L1200,520 L0,520 Z"
        fill="#4FA97F"
      />
      {/* inner */}
      <path
        d="M0,346 C252,250 462,212 650,268 C856,328 996,414 1200,374 L1200,520 L0,520 Z"
        fill="#F2C13D"
        opacity=".93"
      />
      {/* trough */}
      <path
        d="M0,424 C272,348 490,310 682,364 C888,420 1020,486 1200,452 L1200,520 L0,520 Z"
        fill="#173A2C"
      />
      {/* shore */}
      <path
        d="M0,478 C296,422 512,392 706,428 C902,464 1032,502 1200,486 L1200,520 L0,520 Z"
        fill="#0E2019"
      />

      {/* foam flecks along the crest line */}
      <g fill="#F4F2E7" opacity=".7">
        <circle cx="704" cy="206" r="3" />
        <circle cx="776" cy="240" r="2" />
        <circle cx="456" cy="152" r="2.5" />
        <circle cx="884" cy="288" r="2.5" />
        <circle cx="304" cy="188" r="2" />
      </g>

      {/* grain last, over the artwork */}
      <rect
        width="1200"
        height="520"
        filter={`url(#${grain})`}
        opacity=".4"
        style={{ mixBlendMode: "overlay" }}
      />
    </svg>
  );
}

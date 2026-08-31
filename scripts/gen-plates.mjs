import { writeFileSync } from "node:fs";

// Neutral, generated placeholder plates. No third-party imagery.
// Palette is taken from app/brand-tokens.ts so they sit inside the existing design.
const P = { cream: "#faf7f2", tint: "#f3ede2", ink: "#1a1a1a", faint: "#8a8a8a", rule: "#e5e0d8", accent: "#6b5b3e" };

// Each motif is an abstract silhouette, not a photograph and not anyone's mark.
const MOTIFS = {
  "hong-kong": `
    <g stroke="${P.accent}" stroke-width="1.6" fill="none" opacity="0.85">
      <path d="M120 300 L120 132 L152 132 L152 300 Z"/>
      <path d="M168 300 L168 96 L206 78 L206 300 Z"/>
      <path d="M222 300 L222 158 L250 158 L250 300 Z"/>
      <path d="M266 300 L266 116 L300 116 L300 300 Z"/>
    </g>
    <path d="M60 300 L480 300" stroke="${P.ink}" stroke-width="1" opacity="0.35"/>
    <g stroke="${P.faint}" stroke-width="1" opacity="0.5">
      <path d="M60 316 Q 150 308 240 316 T 420 316"/>
      <path d="M60 330 Q 160 322 260 330 T 480 330"/>
    </g>`,
  "sand-hill": `
    <g stroke="${P.accent}" stroke-width="1.6" fill="none" opacity="0.85">
      <path d="M96 296 Q 170 208 244 296"/>
      <path d="M188 296 Q 268 178 348 296"/>
      <path d="M300 296 Q 372 224 444 296"/>
    </g>
    <path d="M60 296 L480 296" stroke="${P.ink}" stroke-width="1" opacity="0.35"/>
    <circle cx="366" cy="132" r="26" fill="none" stroke="${P.faint}" stroke-width="1.2" opacity="0.7"/>`,
  london: `
    <g stroke="${P.accent}" stroke-width="1.6" fill="none" opacity="0.85">
      <path d="M132 302 L132 176 L204 176 L204 302"/>
      <path d="M132 176 L168 138 L204 176"/>
      <path d="M228 302 L228 158 L336 158 L336 302"/>
      <path d="M252 302 L252 206 L282 206 L282 302"/>
      <path d="M300 302 L300 206 L324 206 L324 302"/>
      <path d="M360 302 L360 118 L392 118 L392 302"/>
    </g>
    <path d="M60 302 L480 302" stroke="${P.ink}" stroke-width="1" opacity="0.35"/>`,
};

const LABELS = {
  "hong-kong": "Property plate 01",
  "sand-hill": "Property plate 02",
  london: "Property plate 03",
};

for (const [slug, motif] of Object.entries(MOTIFS)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 360" width="540" height="360" role="img" aria-label="Placeholder property plate">
  <rect width="540" height="360" fill="${P.cream}"/>
  <rect x="0" y="0" width="540" height="360" fill="${P.tint}" opacity="0.55"/>
  <rect x="16" y="16" width="508" height="328" fill="none" stroke="${P.rule}" stroke-width="1"/>
  ${motif}
  <text x="32" y="52" font-family="Inter, system-ui, sans-serif" font-size="11" letter-spacing="3" fill="${P.faint}">PLACEHOLDER</text>
  <text x="32" y="336" font-family="Inter, system-ui, sans-serif" font-size="10" letter-spacing="2" fill="${P.faint}">${LABELS[slug]}</text>
</svg>
`;
  writeFileSync(`public/brand/plates/${slug}.svg`, svg);
  console.log("wrote", `public/brand/plates/${slug}.svg`, svg.length, "bytes");
}

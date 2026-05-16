# HANDOFF — Josh

Hackathon team: James (data + agent + API + audio) · Josh (brand + demo flow)
Target: SF Anthropic Hackathon · best-demo win
Build window: ~6 hours

> **Pivot note (afternoon):** We pivoted demo properties from fictional Halcyon Toronto/NYC/LA to real Rosewood: **Hong Kong**, **Sand Hill (Menlo Park)**, **London**. "Halcyon" is our product/platform name; "Rosewood" is the chain we demo it on. Updated section below.

## What this project is — 60 sec

A real luxury hotel chain has multiple properties globally. When a member walks into ANY property — including one they've never been to — the staff tablet lights up with a personalized prep brief built from the member's history across the OTHER properties. AI is invisible to the guest. Staff appears magically attentive.

We pitch this as **Halcyon** — the AI memory layer that sits on top of the chain's existing Oracle OPERA system. Demo deployment: **Rosewood Hotels & Resorts** (38 properties, 23 countries, all OPERA-backed). Demo properties: Rosewood Hong Kong, Rosewood Sand Hill, Rosewood London.

Demo flow:
1. Open `/staff` on a laptop — it's the tablet at **Rosewood Sand Hill**
2. On phone (or another tab), open `/arrive`
3. Tap a member's name → POST to `/api/arrive` → SSE pushes brief to `/staff`
4. The tablet lights up. Read the brief out loud. Cross-property facts are the magic.

## What you own

| File / Path | What goes here |
|---|---|
| `public/brand/logo.svg` | Halcyon wordmark or monogram. SVG. Roughly 200×60. Inks on transparent. |
| `public/brand/property-hong-kong.jpg` | Atmosphere photo. 1600×900. Rosewood HK / Victoria Harbour vertical luxury mood. |
| `public/brand/property-sand-hill.jpg` | Atmosphere photo. 1600×900. California Mission-ranch estate, low-rise, golden hour. |
| `public/brand/property-london.jpg` | Atmosphere photo. 1600×900. Edwardian Holborn heritage, Belle Époque interior. |
| `app/brand-tokens.ts` | Edit the constants (product name "Halcyon", tagline, palette hex codes) — don't change the shape |
| `app/page.tsx` | The landing/title card. You can rewrite layout, fonts, hero treatment — just keep the two CTAs ("Staff Tablet" → `/staff`, "Member Arrival" → `/arrive`) |

## What you DON'T touch

Hard firewall:

- `lib/*` — data, agent, types, OPERA adapter, ElevenLabs whisper. If something here looks wrong, message James.
- `app/api/*` — route handlers (arrive, stream, whisper).
- `app/staff/page.tsx` — the demo screen. Style edits OK at hour 5 if time permits, with James review.
- `app/arrive/page.tsx` — QR target page.

If you think you need to touch one of these — ping James. There's almost always a brand-layer way to get the same effect.

## Aesthetic direction

**Quiet luxury.** Rosewood / Aman / NeueHouse reference frame.

- Background: cream `#faf7f2`. Not white.
- Type: heading in a true editorial serif (Cormorant Garamond is already wired up; you can swap to GT Sectra, Caslon, Editorial New if you have one). Body in Inter.
- Decoration: anti-decoration. Negative space is the design.
- Logo: a wordmark in the serif beats a graphic mark. Single weight. No gradient, no shadow.
- Property images: muted, slightly underexposed, no people in frame. Architecture over activity.
- Palette: see `app/brand-tokens.ts`. Cream + ink + one warm bronze accent (`#6b5b3e`). NO additional colors.

When in doubt: would Rosewood put this on their site? If no, don't ship it.

## Asset generation (nano-banana)

Use the `nano-banana` skill or any image gen. Suggested prompts:

- **Logo**: "Single-word wordmark 'Halcyon' in a refined editorial serif (Cormorant Garamond or similar). Single color, deep ink on transparent. Minimal, confident, no flourishes. The wordmark for a luxury hospitality AI product."
- **Hong Kong plate**: "Rosewood Hong Kong interior, Victoria Harbour view from a vertical Asian luxury hotel tower at dusk, warm low light, Manor Club lounge mood, no people, slightly underexposed."
- **Sand Hill plate**: "Rosewood Sand Hill estate exterior, California Mission-ranch low-rise architecture, 16-acre property, palms, golden-hour light, no people, members' club mood."
- **London plate**: "Rosewood London interior, Edwardian Belle Époque, converted Pearl Assurance building, oak panelling, chandelier mood, soft lamp light, no people, slightly underexposed."

Save to `public/brand/` with the exact filenames in the table above.

## The Brief contract (so we don't conflict)

When the staff page renders a brief, the data shape is:

```ts
type Brief = {
  guestName: string;
  visitContext: string;
  arrivalIntel?: { expectedAt; flightContext; baggageNote; energyState };
  accessibilityNeeds: string[];
  prepActions: string[];
  amenityReplenishment: { item; sourcedFrom }[];
  suggestedQuestions: { question; basedOn }[];
  localSuggestions?: { title; detail; walkingMinutes?; basedOn }[];
  discretionFlags?: string[];
  emotionalNotes: string;
  sourceVisits: string[];
};
```

You don't need to render this — James already did. Style edits welcome.

## Sync moments

- **Hour 1**: Send James a screenshot of your logo + one property plate. Lock the brand name.
- **Hour 3**: Push your branch. James pulls + checks.
- **Hour 5**: Final brand merge. After this, freeze brand changes.
- **Hour 6+**: Demo rehearsal together. See `SHOTLIST.md` for the video shot list.

## Demo day flow (you lead the narration)

See `SHOTLIST.md` for the full scene-by-scene script. Headline beats:

1. (0:00) "Rosewood. 38 properties, 23 countries, all running Oracle OPERA."
2. (0:15) "Mei Lin Chen is a member. She's stayed at Hong Kong twice, London once."
3. (0:30) "Today, she walks into Sand Hill." (James triggers arrival)
4. (0:35–1:00) Read brief out loud. SLOW DOWN on the cross-property line ("Mei Lin saw none of this. She saw a person who knew her.")
5. (1:00–1:30) Reset. Trigger Mr. Edson. Highlight arrival intel block: "EL AL from Tel Aviv, seven hours, two checked bags, bell concierge at the portico."
6. (1:30) Press "Whisper" — earpiece audio plays.
7. (1:45) Close: "Halcyon is the AI memory layer for the luxury chain you already run."

## Branching

```bash
git clone https://github.com/DareDev256/chain-recall
cd chain-recall
pnpm install
git checkout -b brand/josh
pnpm dev
```

You can run the demo without any API keys — `lib/cache.ts` has hand-tuned briefs for all 4 demo guests at Sand Hill that fire when Anthropic is absent. Drop a key into `.env.local` later if you want to see live composition.

When you're ready:

```bash
git add public/brand/ app/brand-tokens.ts app/page.tsx
git commit -m "brand: logo + property plates + tokens"
git push origin brand/josh
```

James merges. If anything breaks, James reverts the merge, not your work.

## If you're blocked

Ping James. Don't fight it for more than 15 min — the build window is too short.

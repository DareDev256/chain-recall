# HANDOFF — Josh

Hackathon team: James (data + agent + API) · Josh (brand + demo flow)
Target: SF Anthropic Hackathon · best-demo win
Build window: ~8 hours

## What this project is — 60 sec

A members' club chain has 3 properties (Toronto, NYC, LA). When a member walks into ANY property — including one they've never been to — the staff tablet lights up with a personalized prep brief built from the member's history across the OTHER properties. AI is invisible to the guest. Staff appears magically attentive.

Demo flow:
1. Open `/staff` on a laptop (this is the "tablet")
2. On phone, scan QR code that opens `/arrive`
3. Tap a member's name → POST to `/api/arrive` → SSE pushes brief → `/staff` lights up live
4. Read brief out loud to judges. The cross-property facts are the magic.

## What you own

| File / Path | What goes here |
|---|---|
| `public/brand/logo.svg` | Wordmark or monogram. SVG. Roughly 200×60. Inks on transparent. |
| `public/brand/property-toronto.jpg` | Atmosphere photo. 1600×900. Heritage building / library mood. |
| `public/brand/property-nyc.jpg` | Atmosphere photo. 1600×900. SoHo loft / listening room mood. |
| `public/brand/property-la.jpg` | Atmosphere photo. 1600×900. Open courtyard / screening room mood. |
| `app/brand-tokens.ts` | Edit the constants (chain name, tagline, palette hex codes) — don't change the shape |
| `app/page.tsx` | The landing/title card. You can rewrite layout, fonts, hero treatment — just keep the two CTAs ("Staff Tablet" → `/staff`, "Member Arrival" → `/arrive`) |

## What you DON'T touch

Hard firewall:

- `lib/*` — data, agent, types. If something here looks wrong, message James.
- `app/api/*` — route handlers.
- `app/staff/page.tsx` — the demo screen. (Style edits OK at hour 5 if time permits, with James review.)
- `app/arrive/page.tsx` — QR target page.

If you think you need to touch one of these — ping James. There's almost always a brand-layer way to get the same effect.

## Aesthetic direction

**Quiet luxury.** Soho House / Aman / NeueHouse reference frame.

- Background: cream `#faf7f2`. Not white.
- Type: heading in a true editorial serif (Cormorant Garamond is already wired up; you can swap to GT Sectra, Caslon, Editorial New if you have one). Body in Inter.
- Decoration: anti-decoration. Negative space is the design.
- Logo: a wordmark in the serif beats a graphic mark. Single weight. No gradient, no shadow.
- Property images: muted, slightly underexposed, no people in frame. Architecture > activity.
- Palette: see `app/brand-tokens.ts`. Cream + ink + one warm bronze accent (`#6b5b3e`). NO additional colors.

When in doubt: would Aman put this on their site? If no, don't ship it.

## Asset generation (nano-banana)

Use the `nano-banana` skill or any image gen. Suggested prompts:

- **Logo**: "Single-word wordmark 'Halcyon' in a refined editorial serif (Cormorant Garamond or similar). Single color, deep ink on transparent. Minimal, confident, no flourishes."
- **Toronto plate**: "Heritage building interior, leather chairs, warm low light, library bookshelves, members' club mood, no people, slightly underexposed."
- **NYC plate**: "SoHo loft, exposed beams, soft jazz lighting, low velvet seating, candle-lit, members' club mood, no people."
- **LA plate**: "Open courtyard at dusk, palms, low concrete walls, single firepit, members' club mood, no people."

Save to `public/brand/` with the exact filenames in the table above.

## The JSON contract (so we don't conflict)

When the staff page renders a brief, the data shape is:

```ts
type Brief = {
  guestName: string;
  visitContext: string;
  prepActions: string[];
  emotionalNotes: string;
  sourceVisits: string[];
};
```

You don't need to render this — James already did. But if you tweak the staff page styling, this is what's in the data.

## Sync moments

- **Hour 1**: Send James a screenshot of your logo + one property plate. Lock the brand name.
- **Hour 3**: Push your branch. James pulls + checks.
- **Hour 5**: Final brand merge. After this, freeze brand changes.
- **Hour 6+**: Demo rehearsal together. You run the QR scan.

## Demo day flow (you lead the narration)

You're the better presenter. You drive the script while James drives the laptop:

1. (0:00) "This is Halcyon. Three properties — Toronto, NYC, LA."
2. (0:15) "Sarah is a member. She's stayed at Toronto twice, NYC once. She's never been to LA."
3. (0:30) "Today, she walks in." (James triggers QR / arrival)
4. (0:35–1:00) Read the brief out loud. SLOW DOWN on the cross-property line ("Sarah saw none of this. She saw a person who knew her.")
5. (1:00–1:30) "Most chains lose their guest at the property line. Ours doesn't. The AI is the chain's institutional memory — silent, cross-property, always on."

## Branching

```bash
git checkout -b brand/josh
# work
git add public/brand/ app/brand-tokens.ts app/page.tsx
git commit -m "brand: logo + property plates + tokens"
git push origin brand/josh
```

James merges. If anything breaks, James reverts the merge, not your work.

## If you're blocked

Ping James. Don't fight it for more than 15 min — the build window is too short.

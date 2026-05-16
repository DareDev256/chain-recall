# BUILD LOG — Halcyon (chain-recall)

**Event:** SF Anthropic Hackathon · 2026-05-16
**Team:** James (data + agent + API) · Josh (brand + demo flow)
**Build window:** ~8 hours
**Target:** best-demo win + a story we can ship after the hackathon

This file is the source-of-truth journal of every decision and why we made it. It's also the script source for the demo video.

---

## The one-sentence pitch

> A members' club chain has 3 properties (Toronto, NYC, LA). When a member walks into ANY property — including one they've never been to — the staff tablet lights up with a personalized prep brief built from the member's history across the OTHER properties.

**Buyer reframe (after customer discovery — see Decision 1):**
> Your chain already pays for Oracle OPERA. Your front desk already enters every preference, allergy, complaint, and amenity request. You're just not using that data at the moment of arrival. We're the AI layer that unlocks the data you already own.

---

## Decision 1 · Oracle OPERA reframe (from real customer discovery)

**Source:** Josh spoke with a hospitality staff member on-site. They confirmed their chain runs **Oracle OPERA** as the property management system (PMS), and that staff already capture preferences, accommodations, allergies, and discretion notes at the guest-relationship level.

**Why this matters:**
- We are no longer a "rip-and-replace guest CRM." We are an **AI layer that sits on top of an existing enterprise system the buyer already pays for and already feeds with data.**
- Oracle OPERA dominates hospitality: Marriott, Hilton, Hyatt, plus thousands of independents and luxury brands. If we can ingest from OPERA, our addressable market is most of the global hotel industry overnight.
- Zero cold-start problem. Zero "first you have to make your staff change behavior." The data is already being entered today; we just light it up.
- Most hospitality AI pitches at this hackathon are end-to-end concierge replacements. Ours is the **augmentation layer** — strictly less ambitious, strictly more buyable.

**Architectural consequence:** We add an explicit OPERA adapter module (`lib/sources/opera.ts`) so the architecture diagram reads cleanly:
`Oracle OPERA (or any PMS) → Halcyon ingestion adapter → cross-property memory store → Claude composer → staff tablet`

In demo, the adapter wraps our seed data. In production, the same interface points at the OPERA REST API or OHIP (Oracle Hospitality Integration Platform).

---

## Decision 2 · Cache fallback as the wifi parachute

**Why:** Conference wifi will betray us. Live API calls during a 90-second pitch are a coin flip.

**How:** Every demo guest × demo property combo has a hand-written cached Brief in `lib/cache.ts`. The composer races Claude against a 4-second timeout. If Claude is slow OR the network is down OR the API key is missing — we silently fall back to the cached brief and the demo still lands.

**Cost:** The cached briefs are hand-tuned to feel like Claude wrote them, which means the cache and the live response are nearly indistinguishable. That's intentional — judges should not be able to tell the difference. The story is the same either way; only the substrate changes.

---

## Decision 3 · Server-Sent Events for the "magic moment"

**Why:** The wow moment is the tablet lighting up the instant the guest walks in. Polling looks like an app. A live push looks like the chain is alive.

**How:** `/api/stream` opens a long-lived SSE connection. `/api/arrive` POSTs, calls the composer, publishes the brief on an in-memory event bus, and the staff page picks it up in real time. No websockets infra needed.

**Limit:** In-memory event bus (`lib/eventBus.ts`) is single-process. Fine for hackathon. For production behind a load balancer this becomes Redis pub/sub or similar — trivial swap.

---

## Decision 4 · 3 properties × 3 guests demo matrix

**Why:** The cross-property handoff is the magic. Three properties means each guest has a "home" and an "away" — and the staff at the "away" property knowing things they couldn't have known from their own ledger is what sells the story.

**Matrix:**
- **Sarah Chen** (Toronto regular, NYC once) → walks into **LA** for the first time. Her chamomile request, her 19°C preference, her lavender headache, her daughter Emma's birthday — all from other properties.
- **Marcus Okafor** (NYC home, LA regular) → walks into **Toronto** for the first time. Discretion preference, Negroni-stirred, no-dairy, unmarked envelopes for night staff — all from other properties.
- **Priya Sharma** (Toronto regular) → walks into **LA** for the first time. Migraine-trigger fluorescents, working-dinner posture, ginger-on-the-side water, Devika the assistant — all from Toronto.

Each one has a single signature emotional beat (Emma's birthday, anniversary, Series A close) that lifts the brief from "facts" to "the chain knows you."

---

## Decision 5 · Quiet-luxury aesthetic (cream, ink, bronze)

**Reference frame:** Aman, Soho House, NeueHouse, The Carlyle.

**Why:** This is the visual code that signals "members' club" to anyone who's ever been in one. Hospitality buyers will recognize it instantly. Hackathon judges will register "this team understands the customer" before reading a word.

**Rules:** Cream background (`#faf7f2`), serif headings (Cormorant Garamond), Inter body, one bronze accent (`#6b5b3e`), no additional colors, no decoration. Negative space is the design.

---

## Decision 6 · Amenity replenishment as the lock-in mechanic *(in progress)*

**The retention story can't only be "we remember you." That's a feature. The lock-in is "the room is already set up the way you like before you arrive."**

**Examples we want surfacing:**
- "Bedside chamomile and kettle (Sarah used these on her NYC stay — staff there left them; she wrote a thank-you note)"
- "Rosewood body wash restocked in shower (used twice during last LA stay)"
- "Moleskine + single overhead lamp at corner table 4 (Marcus's working-dinner setup, NYC)"

**Why this is durable:**
- It converts intangible "memory" into tangible "the room is ready." Operations team can ship against this; finance team can measure it (linen swap counts, amenity restock SKUs).
- It moves the AI from "decision support" to "physical preparation." Higher perceived value.
- Buyers (especially luxury brands) instantly understand this in revenue terms: cross-sells, premium-tier justification, churn reduction.

**Implementation:** Extend the `Brief` type with `amenityReplenishment: { item: string; sourcedFrom: string }[]`, add amenity-relevant notes to guest visits, update the system prompt, update cache fallbacks, render a dedicated section on the staff tablet.

---

## Decision 7 · Magic-moment polish *(planned)*

Three small additions that move the demo from "neat" to "inevitable":

1. **Loading skeleton** on `/staff` between QR tap and brief render — eliminates the "is it frozen?" beat.
2. **Audio chime** when the brief lands — Web Audio API, one soft tone, no asset needed. The chime is the difference between "wow" and "judges glance up wondering if something happened."
3. **Reset button** — judges will ask to see it twice. Refreshing breaks the spell.

---

## Open research items (for the pitch, not the build)

- **The 10%/40% claim.** A funded pre-seed founder told James that "10% of travelers cover 40% of hospitality industry costs." Plausible-sounding (luxury / business-class travel concentration), but the exact ratio needs source verification before we use it in the pitch. Action: validate against Skift, STR, or McKinsey hospitality reports before recording the video.
- **OPERA / OHIP integration surface.** Worth a 20-minute scan of OHIP REST API docs to make sure our adapter shape is plausible. We don't need to actually integrate; we just need the architecture story to survive a hospitality-savvy judge asking "but how do you actually pull from OPERA?"

---

## Things we are NOT building (scope discipline)

- Voice readout (TTS). High-impact but TTS quality varies and ties the demo to network reliability.
- Multi-language brief generation. Not the story.
- Sentiment analysis on guest history. Too abstract; the brief is concrete enough.
- An admin panel. The brief IS the product surface; no chrome.
- Auth, login, multi-tenant scaffolding. Hackathon, not SaaS.

---

## Phase log (timestamped commits)

Each row is a commit. Each commit is one decision shipped. The video script narrates these in order.

| Phase | Commit | What landed | Why |
|---|---|---|---|
| A | (pending) | Initial scaffold: Next.js 16, Tailwind, Anthropic SDK tool-use loop, SSE bus, 3 guests × 3 properties seed data, cache fallback for 3 demo combos, quiet-luxury styling | Get a working spine in git before extending |
| B | (pending) | Oracle OPERA mock adapter | Make the architecture story tangible for judges |
| C | (pending) | Amenity replenishment feature | Lock-in mechanic — the room is ready before the guest arrives |
| D | (pending) | Magic-moment polish | Skeleton + chime + reset = demo lands clean |
| E | (pending) | README + video outline | Final assembly |

---

## Demo-day failure-mode contingency

| If this fails | We do this |
|---|---|
| Anthropic API down | Cache fallback fires silently; demo is identical to judges |
| Wifi dies | Tethered phone; cache fallback covers any guest×property combo we picked |
| Dev server crashes mid-pitch | Pre-recorded fallback video (record the demo running locally the night before) |
| Josh's QR scan misfires | James clicks the guest button on `/arrive` directly — same code path |
| Judge asks "how does this connect to a real PMS?" | Architecture slide: OPERA adapter → ingestion → memory → composer. Have it ready. |

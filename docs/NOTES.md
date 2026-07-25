# Sandy Chain-Recall — Running Notes

Live status, talking points, design brief for Josh, and the receptionist/GM research that informs the UI.

---

## Status snapshot (as of latest commit)

**Production build:** ✅ Green — 7 routes, TypeScript clean
**Repo:** https://github.com/DareDev256/chain-recall
**Commits:** 10
**Demo:** Runnable locally, end-to-end, with or without API keys (cache fallback covers all 4 guests)

### What's shipped

| Feature | Where | Status |
|---|---|---|
| Cross-property memory composer (Claude tool use) | `lib/compose.ts` | ✅ |
| Oracle OPERA mock adapter | `lib/sources/opera.ts` | ✅ |
| Brief schema (10 fields incl. arrival intel, accessibility, amenity replenishment, suggested Qs, local suggestions, discretion flags) | `lib/types.ts` | ✅ |
| 4 demo guests (Mei Lin, Marcus, Priya, Edson) at Rosewood HK / Sand Hill / London | `lib/data.ts`, `lib/cache.ts` | ✅ |
| SSE live tablet wake | `app/api/stream/route.ts` | ✅ |
| Loading skeleton + audio chime + Reset | `app/staff/page.tsx` | ✅ |
| ElevenLabs Whisper earpiece (+ browser TTS fallback) | `app/api/whisper/route.ts`, `lib/whisper.ts` | ✅ |
| Voice Note ingestion (browser STT → memory log) | `app/api/memory-note/route.ts`, `lib/memoryLog.ts` | ✅ |
| Quiet-luxury aesthetic (cream + ink + bronze) | `app/globals.css` | ✅ |
| Wifi parachute (cached briefs for all 4 demo guests) | `lib/cache.ts` | ✅ |

### What's still open

- [ ] **James:** drop `ANTHROPIC_API_KEY` into `.env.local`, optionally `ELEVENLABS_API_KEY` and `ELEVENLABS_VOICE_ID`
- [ ] **Josh:** logo + 3 property plates + title-card styling (his branch — see `HANDOFF.md`)
- [ ] **Both:** demo rehearsal — at least one full run-through with the SHOTLIST script
- [ ] **Both:** record the video (≤2 min) per `SHOTLIST.md`
- [ ] **Both:** prepare the architecture slide (OPERA → Hapi → adapter → composer → tablet+earpiece)

### What's parked (in pitch deck, not built)

- MCP server wrapper (v2 — composer exposed as MCP tool for Claude Desktop / Rosewood app)
- ElevenLabs Conversational AI for full bidirectional voice (today's Voice Note is one-way ingestion only)
- Real RAG / vector DB (today: in-memory seed corpus)
- Multi-tenant RBAC, GDPR portal, audit log (production v1)
- BLE beacons, license-plate recognition, app geofence (production presence detection)
- Per-staff-role brief views (concierge sees all, housekeeping sees room-prep, F&B sees dietary)

---

## Talking points for judges / Rosewood-style buyer conversations

### The pitch in one sentence
"Your luxury chain already pays for Oracle OPERA. Your front desk already enters every preference. You're just not using that data at the moment of arrival. Sandy Chain-Recall is the AI layer that unlocks the data you already own."

### Why this is buyable (not just impressive)
1. **Zero rip-and-replace.** We sit on top of OPERA via Hapi (the chain's existing event-streaming middleware). No staff retraining, no data migration, no procurement vortex.
2. **Zero cold-start.** Their staff already enters this data today. We don't ask them to change behavior. We make their existing behavior valuable.
3. **Loyalty product, not loyalty *program*.** Rosewood Elite is benefit-based, not points-based. Their pitch is staff knowledge. We are the infrastructure that delivers it.
4. **Day-one solution for new properties.** Rosewood is opening 5 properties in 2026 (SF, Milan, Rome, Crete, Shenzhen). New staff in new cities currently have no history on returning members. We solve that day one.
5. **The "Manor" pattern proves market readiness.** Rosewood already uses "Manor Club", "Manor Suite", "Grand Manor House Wing" across properties. They've already invented the cross-property language. We operationalize the cross-property memory.

### Numbers ready to cite (all verified — see `research/rosewood.md`)
- 38 hotels, 23 countries, 21+ in pipeline
- Entry ADR $1,000+/night, suites $5K–$25K
- Founded 1979 by Caroline Rose Hunt; acquired 2011 for ~$229M; consolidated under Chow Tai Fook 2015 for HK$1.96B
- Sonia Cheng (CEO) publicly uses "predictive analytics, knows you before you ask, relationship hospitality" in the 2024-2025 brand refresh
- Named **Hapi customer** (Hapi streams OPERA events to cloud)
- **Grand Manor House Wing in London is the only hotel suite in the world with its own postcode** — single most pitch-able Rosewood fact

### Lines that land
- "Mei Lin saw none of this. She just saw a person who knew her."
- "Most luxury chains lose their guest at the property line. Rosewood doesn't have to."
- "The AI is invisible. The recognition is felt."
- "Bell concierge at the portico before he's at the front gate."

---

## Josh — UI design brief

### What real receptionists / GMs currently see (industry baseline)

We're displacing the muscle memory of front-desk staff trained on OPERA's UI. Knowing what they currently see lets us design what they should see *instead*.

**Reservation card (current OPERA standard):**
- Guest name + member ID
- Arrival date + departure date
- Room number assigned
- Folio balance
- VIP indicator (red star, color flag)
- Loyalty tier badge
- Free-text profile notes (unstructured, often years of unedited paragraphs)
- Special-request checkboxes (high-floor, quiet room, extra pillows — generic)
- Group reservation linkage
- Payment + ID verification status

**Front-desk "Arrivals Today" screen:**
- List of expected arrivals, sorted by time
- Each row: name, room number, special status badges, ETA if known
- Click row → full reservation card

**GM dashboard (typically a separate Opera Cloud product):**
- Occupancy, ADR, RevPAR
- VIP arrivals today
- Issue queue (complaint tickets, service recovery in progress)
- Staff scheduling
- Revenue forecast vs. budget

### What's broken about that today

1. **Multi-tab navigation.** Staff tabs between reservation / profile / notes / housekeeping / billing. The "who is this person and how should I treat them" answer lives in *six places*.
2. **Free-text notes rot.** Years of "guest prefers blah blah" paragraphs accumulate. The relevant fact for *this* arrival is buried.
3. **Cross-property is invisible.** If a guest stayed at HK three times, the Sand Hill receptionist sees a generic "frequent guest" flag, not the actual preferences. The data exists; it's just not surfaced at the moment of need.
4. **No discretion layer.** No structured "do not mention X" — that lives in word-of-mouth between staff or in unhelpful free-text.
5. **No anticipatory operations.** The arrival ETA, baggage, fatigue state is in the reservation; the bell concierge doesn't see it until manually paged.
6. **Generic "special request" checkboxes don't capture the magic.** "Quiet room" is not the same as "no overhead fluorescents — migraine trigger, flagged Toronto Oct 2025."

### What we built that's different

The Brief on `/staff` is **one screen, one purpose, scannable in 5 seconds**:

1. Arrival intel (operational — ETA, baggage, energy state) — only when relevant
2. Non-negotiable (accessibility) — bronze accent, can't miss it
3. Prep (3-5 imperative actions)
4. In the room before arrival (physical replenishment with source attribution)
5. Ask the guest (verbatim staff scripts — the "informed offer, not interrogation" pattern)
6. If they have time (local suggestions tied to the guest's known interests)
7. Do not say (discretion flags)
8. Context (emotional notes)
9. Sourced from (every brief is traceable back to which prior visit informed it)

### Things that would make the UI *badass* for Josh to push on

These are stretch ideas — none are required. Pick what serves the pitch.

**Title card (`app/page.tsx`)**
- Logo at top: serif wordmark "Sandy Chain-Recall" or just "Sandy" — single-color ink on cream, no flourishes
- Subhead: a single editorial sentence ("Recognition, without asking.") rendered LARGE in serif, like a magazine cover
- Below: a small horizontal divider line + the cities list ("Hong Kong · Menlo Park · London") in 10pt uppercase with letter-spacing
- Two CTAs as text-only links with a thin underline on hover (no buttons that look like buttons — too tech-y)
- Possible: a single muted property plate in the background at 30% opacity, behind everything, soft cross-fade between the three locations every 8 seconds

**Staff tablet (`app/staff/page.tsx`)**
- Already designed as quiet luxury. If Josh wants to push:
  - Treat the header property line as a *masthead* — date in small uppercase serif, like a newspaper banner
  - Use a *tiny* property crest mark (single line drawing of Sand Hill's silhouette / HK harbor / London Big Ben) above the chain name — anchors the visual identity per property
  - The "Member arriving" label could pulse SLOWLY in bronze (not a hard pulse — a barely-perceptible breath) when the brief lands

**Arrive (QR target) (`app/arrive/page.tsx`)**
- Guest cards could feel like membership cards: serif name, fine-printed metadata, soft cream stock
- A subtle "scan complete" beat when the user taps — checkmark fades in, then fades to "Notifying front of house"

**Color discipline**
- DO NOT introduce a second accent color
- DO NOT use red or green for status (the bronze accent + bone cream is the palette)
- The single break is `bg-emerald-500` for the "Listening" connection dot — keep that, it's the only color signal in the whole product

**Type discipline**
- Cormorant Garamond for the headings and any italic editorial copy
- Inter for body
- Tiny 10pt uppercase with letter-spacing `0.3em` for eyebrow / label text — the whole product runs on this rhythm
- No third typeface

### What Josh should ABSOLUTELY NOT do
- Add gradient backgrounds
- Add drop shadows on cards
- Use rounded-XL or rounded-2XL corners (current is sharp by intention)
- Change the cream — `#faf7f2` is the specific shade
- Replace the serif with a "modern" sans display font
- Add stock photography of generic luxury (gold faucets, champagne flutes)
- Add emoji anywhere

---

## ElevenLabs voice strategy

### Default (no env set)
Voice = George (`JBFqnCBsd6RMkjVDRZzb`) — British butler timbre, ElevenLabs stock voice. Always works.

### Custom voice for the demo
Set `ELEVENLABS_VOICE_ID=<id>` in `.env.local`.

If using a recently-cloned voice: it's safe. ElevenLabs voices don't expire. The only risks are (a) low-quality output if training data was thin and (b) re-recording the voice today eats time we don't have.

**Recommended:** Use the existing voice ID `6F6qTD1GSCwVWEzc8mhM` for the demo. If it sounds wrong in practice, unset the env var to fall back to George. No need to create a new voice today.

---

## Open product questions for after the hackathon

- **Naming:** Is "Sandy Chain-Recall" the long-term product name, or just the hackathon working title? "Sandy" alone tests better. "Chain-Recall" is a great codename/repo name but might be too engineering-flavored for a sales conversation.
- **The Rosewood story:** Do we approach Rosewood directly post-hackathon, or use them as the deployment example for pitches to *any* OPERA-running chain (Mandarin Oriental, Aman, Belmond — all of whom have no public AI prep-brief play)?
- **Pricing model:** Per-property per-month? Per-guest-brief? Per-stay? (Standard luxury PMS pricing is $500-$2K/property/month — we should be priced in that band, integrated into existing IT budget.)
- **Sales motion:** Inside sales to Rosewood corp IT? Field motion via Hapi as a channel partner? Direct to GM at a single flagship to land a wedge deployment?
- **Privacy compliance roadmap:** SOC 2 timeline (target month 6), GDPR Art. 17 right-to-delete portal, data residency per property.

---

## Failure-mode contingency (for demo day)

| If this fails | We do this |
|---|---|
| Anthropic API down | Cache fallback fires silently; demo is identical |
| Wifi dies | Tether off James's phone LTE; cache covers all 4 demo guests |
| Dev server crashes mid-pitch | Pre-recorded fallback video (record locally the night before) |
| ElevenLabs whisper errors | Falls back to browser SpeechSynthesis automatically |
| Voice Note STT fails | Hide that button for the demo; nothing else depends on it |
| Judge asks "how does this connect to a real PMS?" | Architecture slide: OPERA → Hapi → adapter → memory → composer |
| Judge asks "did you actually talk to Rosewood?" | Honest no — this is what their public materials say they're moving toward (cite Sonia Cheng, Hapi customer status) |
| Judge asks "isn't this a privacy nightmare?" | Production roadmap slide: opt-in only, GDPR portal, per-property opt-out, audit log, SOC 2 target month 6 |

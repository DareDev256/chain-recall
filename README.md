# Chain Recall — Halcyon

> Recognition, without asking.

The silent institutional memory of a members' club chain. When a guest walks into ANY property — even one they've never visited — front-of-house staff is briefed on who they are, what they prefer, and how to treat them. The AI is invisible to the guest. Staff is just magically attentive.

Built at the SF Anthropic Hackathon · May 2026 · by James Olusoga & Joshua Dare.

---

## What we shipped today

- **3 mock guests × 3 mock properties** (Toronto, NYC, LA) — deep, specific, human histories
- **Claude composes prep briefs live** from cross-property guest history via tool use (`get_guest_history`)
- **Silent design** — guest sees zero AI surface. The agent is a quiet whisper to the staff
- **Cross-property handoff is the magic** — facts from one property surface at another, automatically
- **QR-triggered arrival** → SSE pushes brief to staff tablet in real time
- **Cached fallback briefs** for wifi-flaky demo conditions

### How to run

```bash
pnpm install
cp .env.local.example .env.local   # add your ANTHROPIC_API_KEY
pnpm dev
```

- `/` — Title card
- `/staff` — Staff tablet (the demo screen)
- `/arrive` — Member arrival trigger (the QR target)

### The data flow

```
QR scan  →  POST /api/arrive  →  compose() reads guest profile via Claude tool use
                              →  publishes Brief to in-memory event bus
                              →  GET /api/stream (SSE) pushes Brief to /staff page
                              →  Staff page renders, member walks through the door
```

If the Claude API errors or takes >4s, we fall back to a cached brief silently. Demo never breaks.

---

## What we'd build next (production v1, ~4 weeks)

Everything below is known-solved. Listed so reviewers see scope. We picked the slice that demos the magic; production hardens around it.

### Presence detection (replacing QR)

- BLE beacons at property entry — low-energy, no phone interaction required
- License plate recognition at valet (Rekor / Vaxtor)
- Member app geofence + opt-in foreground notification
- Walk-in fallback: staff manually tags an unrecognized member at the front desk

### Voice layer (staff-side only)

- Discreet earpiece whisper to staff as a guest approaches — staff walks up already knowing
- ElevenLabs / Cartesia for natural voice; private channel per staff member
- Ambient room listening for memory ingestion ("I'd love a chamomile" → memory grows for next visit)
- **Never** voice TO the guest. The guest only experiences a human who knows them.

### Memory layer

- Postgres + pgvector for retrieval (or Qdrant if scale demands)
- Every memory carries a ledger: which property created it, which staff member, which interaction
- Decay + conflict resolution — 90-day relevance half-life, contradicting facts surface for human review
- Source-grounded composition — every line of a brief can be expanded to "where did this come from?"

### Staff role hierarchy & permissions

- Concierge sees the full brief
- Housekeeping sees only room-prep details (allergens, temp, turndown)
- F&B sees only dietary + drink preferences
- Audit log on every read — guest can request a full access history

### Property system integrations

- Hotels: Opera Cloud, Mews, Cloudbeds
- Members' clubs: Salto KS / Brivo for access control
- F&B: Toast, Resy, OpenTable
- Boutique fitness: Mindbody, ABC Glofox

### Guest trust & compliance

- Guest portal: view, edit, redact, full-delete memory (GDPR Art. 17, CCPA §1798.105)
- Opt-in only — first stay collects nothing automatically; explicit consent flow
- Per-property opt-out ("don't share this visit with other locations")
- SOC 2 Type II target by month 6
- Data residency per property (EU stays don't leave EU)

### Quality loop

- Staff one-tap feedback after each interaction: "useful / partial / wrong"
- Briefs flagged "wrong" retrain retrieval ranking
- Weekly digest per property GM: top memories driving NPS lift

### Brief composition controls

- Per-brand voice template (Aman ≠ Equinox ≠ Soho House)
- Length cap enforced (60 words max — staff scan, not read)
- Tone audit: no flowery language, no "personality" — neutral utility
- Multilingual brief generation for international staff

### Edge cases handled on day one

- Anonymous walk-ins: never stored
- Conflicting preferences across properties: timestamp wins, both shown if recent
- Group bookings: separate briefs per guest, aggregate brief for host
- VIP / sensitive guests: tier-gated access, no system-wide search

---

## Stack

- Next.js 16.2.6 (App Router) · React 19 · TypeScript
- Tailwind 4
- Anthropic SDK (`claude-opus-4-7`) with tool use
- Plain JSON corpus, in-memory event bus (would be Postgres + Redis pubsub in prod)
- Server-Sent Events for live staff push
- Browser `speechSynthesis` for the staff earpiece whisper (production: ElevenLabs)

## Team

- **James Olusoga** (DareDev256) — data layer, Claude agent, API routes, infrastructure
- **Joshua Dare** — brand, demo flow, presentation

Toronto · May 2026

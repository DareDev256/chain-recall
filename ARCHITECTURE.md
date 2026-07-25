# Architecture & Roadmap — Sandy Chain-Recall

Full-depth explanation of what we built today, what's persistent vs ephemeral, and the production roadmap to a diamond deployment. Use this for any judge or exec who asks "but where does the data actually live?"

---

## TL;DR — the honest current state

| Layer | Today (hackathon) | v1 production |
|---|---|---|
| **Guest profile data** | In-memory seed corpus (`lib/data.ts`) — 5 guests | Postgres mirror of Oracle OPERA profile records, hydrated via Hapi event stream |
| **Memory of past interactions** | Embedded in seed corpus as `visits[].notes` + `amenitiesUsed[]` + `attractionsVisited[]` | Postgres event journal, append-only, ledgered by which staff member at which property at which time |
| **Semantic recall** | Pattern-matched by Claude's tool-use reading the structured profile | pgvector embeddings over memory observations — Claude calls a `search_memories` tool that returns relevant facts |
| **Voice-note ingestion** | Browser STT → POST `/api/memory-note` → in-memory `lib/memoryLog.ts` (lost on restart) | Same browser STT → same API route → Postgres event journal → Hapi pushes back to OPERA profile notes |
| **Brief delivery** | Server-Sent Events from in-memory event bus (`lib/eventBus.ts`) | Same SSE protocol on the wire; backing bus becomes Redis pub/sub for horizontal scale |
| **Integration boundary** | Mock OPERA adapter (`lib/sources/opera.ts`) — 80ms simulated latency, returns from seed corpus | Real OHIP REST client — `GET /crm/v1/profiles/{profileId}`, `GET /crm/v1/profiles/{profileId}/stayRecords`, etc. |
| **Audit log** | `loggedBy` strings baked into cached briefs (per-fact attribution) | Same field, populated from real staff IDs on every memory write; every read is logged with the staff member who saw it |

**The honest answer about persistent memory:** Today, no, we don't have it. We have:
- A static seed corpus that simulates what OPERA already stores
- A voice-note primitive that captures new observations but doesn't yet feed back into the next compose() call
- A cache fallback that ensures the demo lands even if Anthropic is slow

This is intentional. The job today was to prove the *primitive* — composer + tool use + Brief schema + SSE delivery + earpiece — not to ship a production memory system. The persistent memory layer is days of work, not weeks, because the integration boundary (`lib/sources/opera.ts`) is already drawn.

---

## Current architecture (today)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   /arrive (QR target — phone or laptop)                              │
│   ┌─────────────────────────────────────┐                            │
│   │  pick a member → pick a property    │                            │
│   │       │                              │                            │
│   │       └──→ POST /api/arrive          │                            │
│   └────────────────────┬─────────────────┘                            │
│                        │                                              │
│                        ▼                                              │
│   ┌────────────────────────────────────────────────────────┐          │
│   │  /api/arrive (Next.js API route, Node runtime)         │          │
│   │                                                         │          │
│   │  1. publish 'computing' event                          │          │
│   │  2. compose(guestId, propertyId)  ───────────┐          │          │
│   │  3. publish 'brief' event                    │          │          │
│   └──────────────────────────────────────────────│──────────┘          │
│                                                  │                    │
│                              ┌───────────────────▼─────────────┐      │
│                              │  lib/compose.ts (Anthropic SDK) │      │
│                              │                                  │      │
│                              │  1. fetch property record       │      │
│                              │  2. Claude messages.create()    │      │
│                              │  3. while stop_reason='tool_use'│      │
│                              │       run get_guest_history     │      │
│                              │       feed result back to Claude│      │
│                              │  4. parse final JSON brief      │      │
│                              │                                  │      │
│                              │  Race: 6s timeout → cache       │      │
│                              └────────┬────────────────────────┘      │
│                                       │                                │
│                              ┌────────▼────────────────────┐          │
│                              │  lib/sources/opera.ts        │          │
│                              │  (integration boundary)      │          │
│                              │  fetchGuestRecord()          │          │
│                              │  fetchPropertyRecord()       │          │
│                              │  +80ms simulated latency     │          │
│                              └────────┬─────────────────────┘          │
│                                       │                                │
│                              ┌────────▼─────────────────────┐          │
│                              │  lib/data.ts (seed corpus)   │          │
│                              │  5 guests, 3 properties      │          │
│                              │  Mei Lin, Marcus, Priya,     │          │
│                              │  Edson, Elena (opt-out)      │          │
│                              └──────────────────────────────┘          │
│                                                                       │
│                              ┌──────────────────────────────┐         │
│                              │  lib/cache.ts (parachute)    │         │
│                              │  5 pre-composed briefs ready │         │
│                              │  if compose() times out      │         │
│                              └──────────────────────────────┘         │
│                                                                       │
│                                                                       │
│   ┌──────────────────────────────────┐                                │
│   │  lib/eventBus.ts                  │  ←──── publish/subscribe       │
│   │  in-memory module singleton       │                                │
│   │  ChainEvent: computing|brief|note │                                │
│   └────────────┬─────────────────────┘                                │
│                │                                                       │
│                ▼                                                       │
│   ┌──────────────────────────────────┐                                │
│   │  GET /api/stream (SSE)            │  ←──── long-lived HTTP         │
│   │  forwards events to clients       │                                │
│   │  defensive enqueue with teardown  │                                │
│   └────────────┬─────────────────────┘                                │
│                │                                                       │
│                ▼                                                       │
│   ┌──────────────────────────────────────────────────────┐            │
│   │  /staff (the tablet)                                  │            │
│   │  - listens for 'computing' → skeleton                 │            │
│   │  - listens for 'brief' → renders + chime + LiveEta    │            │
│   │  - filters events by current property (URL ?property=) │           │
│   │  - sessionStorage persistence across navigation        │           │
│   │  - "Whisper" → POST /api/whisper → ElevenLabs audio    │           │
│   │  - "Voice Note" → browser STT → POST /api/memory-note  │           │
│   └────────────────────────────────────────────────────────┘          │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

### What is and isn't persistent today

| Surface | Persistence | Why |
|---|---|---|
| Guest profiles | Restart-stable (in source code) | They live in `lib/data.ts` — they ship with the binary |
| Cached briefs | Restart-stable | Same — `lib/cache.ts` |
| Voice-note transcripts | **Volatile** — wiped on dev server restart | `lib/memoryLog.ts` is an in-memory ring buffer |
| Active SSE connections | Per-process | One Node.js process holds them — restart drops them, browser reconnects |
| Brief state in browser | Cross-navigation only via sessionStorage | Lost when tab/window closes |
| .env.local secrets | File-system persistent | Read on dev server start; restart picks up changes |

---

## Production v1 (4-6 weeks)

### Data layer

**Source of truth:** Oracle OPERA Cloud (the chain's existing PMS). We do NOT replace it.

**Bridge:** Hapi (already a Rosewood vendor). Hapi exposes OPERA events as a Kafka-style stream. We subscribe.

**Our storage:**

```
Hapi event stream  ─→  Sandy ingestion worker (Node.js)
                          │
                          ├─→  Postgres (event journal)
                          │      append-only table
                          │      every OPERA mutation logged
                          │      who/what/when/which-property
                          │
                          ├─→  Postgres (projected guest profile)
                          │      materialized view of latest state
                          │      built from event journal
                          │      mirrors OPERA profile fields
                          │
                          └─→  pgvector (embedded memory)
                                 each visit note, amenity, observation
                                 embedded as 1536-dim vector
                                 enables semantic search
```

**Why this shape:** event-sourced is the only honest model for memory you're allowed to forget. GDPR right-to-delete operates on the event journal — replay omitting deleted events. The projected profile and vector store rebuild from the journal.

### Composer

`lib/compose.ts` does not change shape. What changes:
- `lib/sources/opera.ts` adapter implementation now hits the OHIP REST API instead of the seed corpus
- A new tool `search_memories` is added — Claude can call it with a semantic query ("guest preferences related to bedtime routines") and pgvector returns the top-k matching events
- The `get_guest_history` tool returns the projected profile from Postgres

### Voice-note ingestion

`/api/memory-note` writes to the event journal. Hapi back-publishes the note as an OPERA profile note. The note is now visible to the chain's existing staff in OPERA AND will surface in the next Sandy compose() call.

### Brief delivery

Same SSE protocol on the wire. Server-side:
- In-memory event bus (`lib/eventBus.ts`) becomes Redis pub/sub
- Multiple Sandy instances behind a load balancer all subscribe to the same Redis channel
- A brief published in one Node process reaches a staff tablet connected to another Node process

### Audio out

ElevenLabs Turbo v2.5 stays. Per-chain custom voices managed in the admin panel. Voice ID set per-property if a chain wants regional variation (British butler for London, Cantonese-fluent voice for Hong Kong, etc.).

### Audio in (production v1.5)

Browser Web Speech API stays as fallback. Primary path becomes ElevenLabs Conversational AI for full bidirectional voice — staff dictates a memory, Sandy confirms back ("Got it. Added 'lavender allergy' to Mei Lin's profile. Visible at all properties starting now."), staff confirms or corrects.

### Audit and compliance

- Every brief read logs: which staff member, which device, which property, which guest, which timestamp
- Every memory write logs: same
- Guest portal (separate Next.js app):
  - View every fact Sandy knows about you
  - Edit, redact, full-delete (GDPR Art. 17 / CCPA §1798.105 / PIPL Art. 47 / LGPD Art. 18)
  - Export your full Sandy file as JSON
  - Per-property opt-out toggles
  - Per-fact deletion (delete the "lavender allergy" memory but keep the "chamomile preference")
- SOC 2 Type II audit kickoff month 1, certification target month 6
- Data residency per property: EU stays' data stays in EU; APAC stays in APAC; Americas in Americas; written into the ingestion worker's routing layer

---

## Scale path (10x, 100x, 1000x deployments)

### 10x — Rosewood-wide rollout (38 properties)

- Single Redis cluster, single Postgres cluster (with read replicas per region)
- Per-property feature flags (a property in soft launch can disable Whisper for the first month)
- Per-property cost dashboard (concrete cost-per-brief, cost-per-voice-note)
- Disaster recovery: full Postgres point-in-time-recovery, daily restore drills

### 100x — multi-chain SaaS (~38 chains × ~30 properties = ~1,100 properties)

- Per-tenant Postgres schemas (chain-level isolation)
- Per-tenant ElevenLabs voice library
- Per-tenant SOC 2 Type II reporting
- White-label option for chains that want their own brand surfacing instead of "Sandy"
- Tier-pricing: per-property/month base + per-brief overage (luxury properties surface ~50-150 briefs/day at peak)

### 1000x — embedded in the PMS layer

- Direct partnership with Oracle (or Mews, Cloudbeds, Cloud-PMS) to ship as a native module
- "Sandy" becomes an opt-in checkbox in OPERA's admin UI
- Pricing flips: revenue share with the PMS vendor

---

## Efficiency improvements (what we'd do FIRST if given another week)

Ranked by ROI:

| # | Improvement | Why it matters |
|---|---|---|
| 1 | **Postgres event journal + projected profile** (the persistent memory layer) | This is the literal product. Today everything is in-memory. |
| 2 | **Hapi integration for one real Rosewood property** (Sand Hill ideally) | First real customer reference. Validates the integration shape. |
| 3 | **Brief schema versioning** | Production briefs need backward compatibility as we add fields. Add a `schemaVersion` field. |
| 4 | **Cache warming on guest arrival prediction** | If we know via OPERA that a guest is arriving in 2 hours, pre-compose their brief. Eliminates the 4-6s compose latency entirely. |
| 5 | **Streaming Claude responses** | Today we wait for the full JSON. Streaming would render the brief progressively — the receptionist sees fields appear as Claude writes them. Higher perceived speed. |
| 6 | **Brief deltas** | When the same guest arrives at a new property, compose only the cross-property *new* facts. Skip re-deriving everything. Saves tokens, saves latency. |
| 7 | **ElevenLabs Conversational AI** | Real two-way voice with staff. Memory captured AND confirmed in one breath. |
| 8 | **MCP server wrapper** | Wrap the composer as MCP tools so Claude Desktop and chain-specific apps can call `get_guest_history` and `compose_brief` directly. |
| 9 | **Per-staff-role brief views** | Concierge sees the full brief, housekeeping sees room-prep only, F&B sees dietary/drinks only. Reduces visual noise. |
| 10 | **Brief diff highlights** | "What's new since last stay" surfaces. Helps repeat-stay magic. |

---

## What today's demo proves vs. what it doesn't

**Proves:**
- The composer pattern works (Claude + tool use + structured Brief schema)
- The integration boundary is real (OPERA adapter is the swap point)
- The delivery surface lands (SSE → staff tablet)
- The earpiece layer works (ElevenLabs + browser TTS fallback)
- Voice-note ingestion works as a primitive (browser STT → API)
- The product can express privacy as a first-class state (Elena's opt-out)
- The product can express operational anticipation (Edson's arrival intel + live ETA)
- The product can deliver discretion (the "do not say" rules)

**Does NOT prove (and we'd lie to claim):**
- Persistent memory across server restarts
- Real OPERA integration (today is mock)
- Cross-tenant scale
- Voice notes feeding back into next brief (one-way capture only today)
- Conversational two-way voice
- Audit log persistence (today's `loggedBy` is per-fact static text, not query-able)
- Cost-per-brief economics at scale

**The honest pitch:** "We built the primitive that proves the product. The data layer behind it is what every PMS-using luxury chain already has — we just unlock it at the moment of arrival. Days, not weeks, to flip the adapter for one property."

---

## Diamond demo checklist (for the next ~80 minutes)

- [ ] **Refresh `/staff` in Safari** — confirm member snapshot line + Elena privacy banner
- [ ] **Trigger each of 5 members** at least once in the rehearsal (Edson is the showpiece, Elena is the closer)
- [ ] **Test Whisper button** — does ElevenLabs return your voice? (Or fallback to browser TTS?)
- [ ] **Test Voice Note** — speak a sentence, confirm the "Noted by staff" banner flashes
- [ ] **Test property switcher** — click HK, click London, click Sand Hill — confirm each shows "All quiet"
- [ ] **Test Reset** — confirm the brief clears
- [ ] **Record the 90-second demo** per `SHOTLIST.md`
- [ ] **Open the first operator conversation** post-pitch (outreach drafts kept locally, not in this repo)

That's it. Don't add more code. Don't redesign anything.

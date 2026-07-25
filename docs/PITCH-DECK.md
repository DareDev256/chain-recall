# Sandy Chain-Recall · Pitch Deck

8 slides. Markdown-native — paste into Google Slides / Keynote / Pitch.com / whatever. Each `---` is a slide break.

Designed for two audiences: hackathon judges (90-second pitch) and post-hackathon Rosewood (or any OPERA-running luxury chain) outreach.

---

## Slide 1 · Title

# Sandy Chain-Recall
### Recognition, without asking.

**The AI memory layer for luxury hospitality.**

Sand Hill · Hong Kong · London

*Built at the SF Anthropic Hackathon · May 2026*

— James Olusoga · Joshua Dare

---

## Slide 2 · The problem

# Luxury chains lose their guest at the property line.

A returning member who has stayed at Rosewood Hong Kong three times walks into Rosewood Sand Hill for the first time.

The Sand Hill staff have a generic "frequent guest" flag.

They do not know:
- She drinks chamomile, never caffeine after 4pm
- Lavender turndown gives her a headache
- Her daughter Emma's 8th birthday is in six days
- She wrote a thank-you note when London left a kettle in her room

**The data exists in Oracle OPERA. Nobody is using it at the moment of arrival.**

---

## Slide 3 · The insight

# Your chain already pays for the data.

Oracle OPERA is the dominant luxury hospitality PMS.

Your front desk already enters preferences at check-in. Your concierge already logs guest requests. Your housekeeping already flags allergies.

You are simply not using that data **at the moment of arrival.**

**Sandy Chain-Recall is the AI layer that unlocks the data you already own.**

> Zero rip-and-replace.
> Zero retraining.
> Zero cold-start.

---

## Slide 4 · The product

# Three surfaces. One memory.

### The staff tablet
At check-in, the front-desk receptionist sees a single-screen brief composed by Claude from the member's cross-property history:
- Arrival intel (ETA, baggage, fatigue state)
- Non-negotiable accessibility needs
- Prep actions (3-5 imperative)
- Amenity replenishment (pre-placed in the room)
- Suggested questions (verbatim scripts that offer choice, not interrogation)
- Local suggestions (anticipatory itinerary)
- Discretion flags (the "do not say" rules that make luxury work)

### The earpiece
For lobby, F&B floor, valet — anywhere there's no counter — ElevenLabs synthesizes a ~15-second whisper directly into the staff member's headset. Butler-grade voice. Guest hears the human, not the AI.

### The voice note
Mid-shift, staff dictates new observations to Sandy. Browser-native speech recognition. Memory grows the moment a guest walks out the door.

---

## Slide 5 · Why now, why Rosewood

# The market is asking for this out loud.

**Rosewood** — 38 properties, 23 countries, 21+ in pipeline including 2026 opens in San Francisco, Milan, Rome, Crete, Shenzhen.

**Sonia Cheng (CEO)** is publicly using the language of our product in the 2024-2025 brand refresh:
> "Predictive analytics. Knows you before you ask. Relationship hospitality."

**Rosewood Elite** is benefit-based, not points-based. Staff knowledge **is** the loyalty product.

**Hapi** (the middleware that streams OPERA events to cloud) is already a named Rosewood customer.

Competitors — Aman, Four Seasons, Mandarin Oriental, Belmond — have no public AI prep-brief play.

**Open white space at the luxury tier. Open path through Hapi. Open language from the CEO.**

---

## Slide 6 · Architecture

# One adapter. Same composer. Any property.

```
  Oracle OPERA (PMS)  ───→  Hapi event stream
       │                         │
       └─────────────────────────┴───→  lib/sources/opera.ts  ←── integration boundary
                                              │
                                              ▼
                          Claude Opus 4.7 with tool use
                          (composes the Brief)
                                              │
                                              ▼
                              SSE event bus  ───────┬──────┐
                                                    │      │
                                                    ▼      ▼
                                            Staff tablet  Earpiece (ElevenLabs)
```

**What changes from demo to production:**
- The adapter implementation (mock seed corpus → real Hapi REST client)
- The event bus (in-memory → Redis pub/sub behind load balancer)
- The memory store (in-memory → Postgres + pgvector)

**What stays the same:** the composer, the Brief schema, the UI, the SYSTEM_PROMPT.

Days of work to flip the adapter. Not weeks.

---

## Slide 7 · What we shipped today (90-second demo)

# Live cross-property memory · Live ETA · Earpiece audio

Demoed at Rosewood Sand Hill (a real property, real signature, real local context).

Four members walk in. Each has a cross-property history the Sand Hill staff couldn't possibly know from their own ledger:

| Member | Home property | First-time at | The cross-property facts |
|---|---|---|---|
| Mei Lin Chen | Hong Kong | Sand Hill | chamomile, 19°C, lavender allergy, daughter's birthday |
| Marcus Okafor | London | Sand Hill | knee recovery, Negroni-stirred, no dairy, discretion preference |
| Priya Sharma | Hong Kong | Sand Hill | migraine trigger from fluorescents, Series A close |
| **Daniel Edson** | London | Sand Hill (today) | **EL AL flight tracker, 2 checked bags, bell concierge at portico, do-not-mention-wife on solo trips** |

Edson is the showpiece. His arrival intel block ticks down in real time — Uber-style ETA counter — while his cross-property prep populates.

**Repo:** github.com/DareDev256/chain-recall

---

## Slide 8 · The ask

# Three paths

### Path A · Direct conversation with Rosewood
A 30-minute call with anyone in the corp tech / guest-experience leadership chain. We'd want to learn what the actual pain looks like inside their walls and validate the architecture.

### Path B · Hapi as the channel partner
Hapi already moves OPERA events to cloud for Rosewood. Sandy Chain-Recall is the natural consumer of that stream. A warm intro to Hapi's product team would be the highest-leverage move.

### Path C · A wedge deployment at a single flagship
Rosewood Sand Hill or Rosewood Hong Kong. 60-day pilot. We integrate with their OPERA instance via Hapi, light up cross-property memory for their VIP cohort, measure NPS lift and amenity-replenishment hit rate.

**What we need from you today:** a yes/no on whether this is a conversation worth having. Everything else we can build.

---

## Appendix · Numbers ready to cite

- 38 Rosewood properties · 23 countries · 21+ in pipeline
- 2026 opens: San Francisco, Milan, Rome, Crete, Shenzhen
- Rosewood entry ADR $1,000+/night · suites $5K-$25K
- Acquired 2011 for ~$229M · consolidated under Chow Tai Fook 2015 for HK$1.96B
- Grand Manor House Wing (London) is **the only hotel suite in the world with its own postcode**
- Sonia Cheng CEO since 2017 · brand refresh 2024-2025

— All verifiable in `research/rosewood.md` and `research/rosewood-properties.md`.

---

## Appendix · Speakers' notes

**For the 90-second judge pitch:** drop slides 6, 7-table, 8 to fit time. Lean on slides 2-3-5. Run the live demo on `/staff` between slides 5 and 6.

**For Rosewood corp outreach:** lead with slide 5 ("the market is asking for this out loud" — quote Sonia Cheng). Architecture (slide 6) is for Syed Azeez or any IT-side stakeholder. Slide 8 is the call to action.

**For Hapi partner outreach:** lead with slide 6 (architecture), then slide 5 (Rosewood is your customer; we're the natural consumer of your OPERA event stream).

**For investor / future-customer outreach:** lead with slide 2 (the problem), slide 4 (the product), slide 8 path C (the wedge).

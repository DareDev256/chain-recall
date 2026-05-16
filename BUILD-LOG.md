# BUILD LOG — Sandy Chain-Recall (chain-recall)

**Event:** SF Anthropic Hackathon · 2026-05-16
**Team:** James Olusoga (data + agent + API + audio) · Joshua Dare (brand + demo flow)
**Build window:** 11:00 → 17:00 (6 hours)
**Repo:** https://github.com/DareDev256/chain-recall

This file is the source-of-truth journal of every decision and why we made it. It is also the script source for the demo video — every bullet here corresponds to a scene or a slide.

---

## The pitch in one sentence

> Your luxury hotel chain already pays for Oracle OPERA. Your front desk already enters every preference, allergy, complaint, amenity request. You are simply not using that data at the moment of arrival. **Sandy Chain-Recall** is the AI layer that unlocks the data you already own — so when a member walks into any property, your staff already knows.

We demo it deployed against the chain we'd target first: **Rosewood Hotels & Resorts** — 38 properties, 23 countries, all OPERA-backed via Hapi. Three real Rosewood properties anchor the demo: **Hong Kong**, **Sand Hill (Menlo Park)**, **London**.

---

## Decision 1 · Buyer reframe — augmentation, not replacement *(commit ed8b3b5)*

**Source:** Josh confirmed on-site with a hospitality staff member at the hackathon venue: their chain runs **Oracle OPERA** and front-of-house already captures preferences, accommodations, and discretion notes.

**Why this matters:**
- We are no longer a "rip-and-replace guest CRM." We are an **AI layer that sits on top of the enterprise system the buyer already pays for and already feeds with data.**
- Oracle OPERA dominates hospitality: Marriott, Hilton, Hyatt, plus thousands of independents and luxury brands.
- Zero cold-start problem. Zero "first you have to make your staff change behavior."
- Most hospitality AI pitches at this hackathon are end-to-end concierge replacements. Ours is the augmentation layer — strictly less ambitious, strictly more buyable.

**Architectural consequence:** Explicit OPERA adapter at `lib/sources/opera.ts` (commit 86e4486). In demo, backed by the seed corpus. In production: OHIP REST client (`GET /crm/v1/profiles/{profileId}`, `GET /fof/v1/operations/property/{propertyCode}`, `GET /crm/v1/profiles/{profileId}/stayRecords`).

---

## Decision 2 · Rosewood as the deployment example *(commit 73dd87b)*

Why Rosewood specifically:

| Signal | Source |
|---|---|
| **38 hotels, 23 countries, 21+ in pipeline** including 2026 opens in SF, Milan, Rome, Crete, Shenzhen | Rosewood Hotel Group corporate pages |
| Sonia Cheng (CEO) is publicly using **"predictive analytics," "knows you before you ask," "relationship hospitality"** in the 2024–2025 brand refresh | EHL business school case study, Rosewood press releases |
| Named **Hapi customer** — Hapi's product is streaming OPERA events to cloud | Hapi case-study page |
| **Rosewood Elite** is benefit-based, not points-based — staff knowledge IS the loyalty product | Rosewood loyalty program documentation |
| Competitors (Aman, Four Seasons, Mandarin Oriental, Belmond) have no public AI prep-brief play | Independent search |
| **New-property cold-start hook** — 5 properties opening 2026 (SF, Milan, Rome, Crete, Shenzhen) means staff in those new locations have zero history on visiting members from existing properties. We solve that day one. | Rosewood pipeline announcements |
| Ownership: founded 1979 by Caroline Rose Hunt; acquired 2011 for ~$229M; consolidated under Chow Tai Fook 2015 for HK$1.96B | Public M&A records |
| Entry ADR $1,000+/night; suites $5K–$25K | Rate analysis |

Full property research at `research/rosewood-properties.md` and `research/rosewood.md`.

---

## Decision 3 · Three properties for the demo *(commit 73dd87b)*

Each guest walks into **Rosewood Sand Hill** for the first time. The staff there could not possibly know them from local ledgers — but Sandy Chain-Recall does, because the institutional memory is chain-wide.

**Rosewood Hong Kong** (18 Salisbury Road, Tsim Sha Tsui)
- Manor Club tier on the 40th floor
- HENRY (Cantonese steakhouse, named for Dr. Henry Cheng)
- DarkSide (jazz cocktails)
- Asaya by Guerlain spa (Silky Glow jade-and-silk facial)

**Rosewood Sand Hill** (2825 Sand Hill Road, Menlo Park)
- 16-acre Mission-ranch estate
- Madera (Michelin-recommended — Niman Ranch lamb chop, Friday jazz)
- Sense Spa (QMS Collagen Renewal Facial)
- 2025 NICOLEHOLLIS villa collection (Ridge, Redwood, Verde, Orchard, Valley, Summit House)

**Rosewood London** (252 High Holborn)
- Holborn Dining Room (Calum Franklin pies — Beef Hotpot signature, 700+ gins)
- Scarfes Bar (Gerald Scarfe illustrations of British political figures)
- Mirror Room (afternoon tea)
- **Grand Manor House Wing** — the only hotel suite in the world with its own postcode, private entrance from High Holborn, private lift, 1,991 sq ft

**Naming pattern that sells the pitch:** Rosewood ALREADY uses "Manor" as a recurring suite-tier idiom across multiple properties (Manor Club at HK, Grand Manor House Wing at London). They've already invented the cross-property language. Sandy Chain-Recall operationalizes the cross-property *memory*.

---

## Decision 4 · The four demo guests *(commit 73dd87b)*

Each guest is a different shape of cross-property magic.

| Guest | Home | History | Arriving | The "wow" moment |
|---|---|---|---|---|
| **Mei Lin Chen** | Hong Kong | HK ×2 + London ×1 | Sand Hill (first) | Sand Hill knows chamomile bedside, 19°C room, lavender allergy, daughter Emma's birthday — all from HK + London visits |
| **Marcus Okafor** | London | London ×2 + HK ×2 (Manor Club) | Sand Hill (first) | Knee-recovery accessibility flag (London profile), Negroni-stirred (corrected twice), no-dairy kitchen-wide, "do not announce his name at entry" — discretion across all properties |
| **Priya Sharma** | Singapore | HK ×2 | Sand Hill (first) | Migraine-trigger fluorescents (non-negotiable), vegetarian, assistant Devika in copy, low-key on her Series A close |
| **Daniel Edson** | London | London ×3 (incl. Grand Manor House Wing) + HK ×1 | Sand Hill (first), **today** | Arrival intel block: EL AL flight from Tel Aviv via Heathrow, 7h leg, 2 checked bags, ETA 15:50, bell concierge meeting at portico, light vegetarian dinner pre-stocked, blackout shades drawn, defer formal welcome |

Edson is the headline demo guest because his arrival intel block makes the operational layer (bell concierge timing, fatigue-aware welcome) tangible.

---

## Decision 5 · Cache fallback as the wifi parachute *(commit f942c95, extended 73dd87b)*

Conference wifi will betray us. Live API calls during a 90-second pitch are a coin flip.

Every demo guest × Sand Hill combo has a hand-written cached Brief in `lib/cache.ts`. The composer races Claude against a 6-second timeout. If Claude is slow OR the network is down OR the API key is missing — we silently fall back to the cached brief and the demo still lands. The cached briefs are hand-tuned to feel like Claude wrote them; judges should not be able to tell the difference.

---

## Decision 6 · Brief schema as the contract *(commits 2aed896, 73dd87b)*

The Brief shape — what gets rendered on the staff tablet — is the product. It is the visible artifact. Everything else is plumbing.

```ts
type Brief = {
  guestName: string;
  visitContext: string;
  arrivalIntel?: { expectedAt; flightContext; baggageNote; energyState };
  accessibilityNeeds: string[];          // non-negotiable, surfaced first
  prepActions: string[];                 // 3-5 imperative items
  amenityReplenishment: { item; sourcedFrom }[];   // physical pre-placement
  suggestedQuestions: { question; basedOn }[];     // verbatim staff scripts
  localSuggestions?: { title; detail; walkingMinutes?; basedOn }[];
  discretionFlags?: string[];            // explicit "do not say" rules
  emotionalNotes: string;
  sourceVisits: string[];
};
```

Each field is doing real work:
- **arrivalIntel** turns "memory" into "operations" (bell concierge timing, fatigue-aware welcome)
- **accessibilityNeeds** moves accessibility from an afterthought to a non-negotiable visual block
- **amenityReplenishment** converts memory into physical preparation — the room is already set up before the guest arrives
- **suggestedQuestions** scripts the moment of recognition — "last time at HK you preferred X, would you like X again or Y this time?" — gives the guest agency
- **localSuggestions** is anticipatory itinerary — the receptionist offers real local experiences justified by the guest's known interests
- **discretionFlags** encodes the "do not say" rules that make luxury hospitality work

---

## Decision 7 · Magic-moment polish *(commit 8b691fc)*

The three small details that move the demo from "neat" to "inevitable":

- **Loading skeleton** ("Reading institutional memory…") on `/staff` during the compose window. Eliminates the "is it frozen?" beat between QR tap and brief render.
- **Audio chime** (880 Hz sine, 0.7s decay, Web Audio API) when the brief lands. Sells the "the tablet just knew" moment.
- **Reset button** in the staff header. Judges WILL ask to see it twice; refreshing breaks the spell.

---

## Decision 8 · The earpiece — ElevenLabs whisper *(commit 0daa82b)*

The production architecture says: **tablet for the desk, earpiece for the floor.**

`/api/whisper` composes a short script (action-first, discretion-first — ~15 seconds of audio) and either:
- Calls ElevenLabs (default voice George — British butler timbre) if `ELEVENLABS_API_KEY` is set, returns audio/mpeg
- Returns JSON `{ script }` for browser SpeechSynthesis fallback otherwise

A "Whisper" button in the staff header plays it on demand. Either path tells the same story to judges. ElevenLabs is the future production layer (concierge headsets, doorman earpieces, valet); browser TTS is today's demo failsafe.

---

## Decision 9 · Server-Sent Events for live tablet wake *(commit f942c95, extended 8b691fc)*

`/api/stream` opens an SSE connection. `/api/arrive` POSTs, publishes a `computing` event on the in-memory bus, runs compose, then publishes the `brief` event. The staff page consumes both — skeleton on `computing`, brief render + chime on `brief`.

In-memory event bus is single-process — fine for hackathon, trivial swap to Redis pub/sub for production behind a load balancer.

---

## Decision 10 · Quiet-luxury aesthetic

**Reference frame:** Aman, Soho House, NeueHouse, The Carlyle (which is itself Rosewood-affiliated).

Cream background (`#faf7f2`), serif headings (Cormorant Garamond), Inter body, single bronze accent (`#6b5b3e`), no additional colors, no decoration. Negative space is the design. Restraint signals wealth — the opposite of telling a $50k-a-year member "we know you're a top-tier guest."

---

## Phase log (commit history)

| # | Commit | What landed | Why |
|---|---|---|---|
| 1 | f942c95 | scaffold: Next.js 16 + Tailwind + Anthropic SDK + tool-use composer + SSE + cache fallback | Working spine in git before extending |
| 2 | ed8b3b5 | docs: BUILD-LOG decision journal | Source for the video script |
| 3 | 86e4486 | Oracle OPERA mock adapter at the integration boundary | Architecture story tells the truth |
| 4 | 2aed896 | accessibility + amenity replenishment + suggested questions | Lock-in mechanics, not just facts |
| 5 | 73dd87b | Rosewood pivot — real properties, Edson, arrival intel, local suggestions, discretion flags | "No mock data for what matters" |
| 6 | 8b691fc | magic-moment polish — skeleton + chime + reset | Demo lands inevitable, not buggy |
| 7 | 0daa82b | ElevenLabs earpiece + browser TTS fallback | Production architecture at the demo layer |

---

## What we are NOT building today (scope discipline)

- **A custom MCP server.** The composer is already wired through the Anthropic SDK with tool use. An MCP server adds an abstraction layer judges can't see. The MCP angle is a pitch slide: "v2 ships our composer as an MCP server so Claude Desktop, the Rosewood app, or any Claude-powered surface can call `get_guest_history` and `compose_brief` as tools." Build this after the hackathon.
- **Multi-tenant auth, RBAC for staff roles, GDPR portal.** Production roadmap, pitch slides, not demo code.
- **Real RAG / vector DB for memory.** Today's seed corpus is `lib/data.ts`. Production: Postgres + pgvector, fed by Hapi's OPERA event stream.
- **TTS-to-guest.** Violates the core philosophy — *AI is invisible to the guest; staff is just magically attentive.* Earpiece is staff-side only.
- **A 4th demo property.** Three is enough to show cross-property; four is bloat.

---

## Demo-day failure-mode contingency

| If this fails | We do this |
|---|---|
| Anthropic API down | Cache fallback fires silently; demo is identical to judges |
| Wifi dies | Tether off James's phone LTE; cache fallback covers all 4 demo combos |
| Dev server crashes mid-pitch | Pre-recorded fallback video (record the demo running locally the night before) |
| QR scan misfires | James clicks the guest button on `/arrive` directly — same code path |
| ElevenLabs API rate limits or 5xx | Whisper falls back to browser SpeechSynthesis automatically |
| Judge asks "how does this connect to a real PMS?" | Architecture slide: OPERA → Hapi → adapter → memory → composer. Have it ready. |
| Judge asks "did you actually talk to Rosewood?" | Honest answer: no, this is what their public material says they're moving toward. Cite Sonia Cheng's 2024-2025 language. |

---

## The pitch script (~90 seconds)

Josh leads narration. James drives the laptop.

> **(0:00)** "This is Rosewood — 38 properties, 23 countries, all running Oracle OPERA. Today they capture every guest preference at check-in. They just don't use that data when the guest walks in somewhere new."
>
> **(0:15)** "Mei Lin Chen is a member. She's stayed at Rosewood Hong Kong twice — chamomile every night, room at 19°C, lavender gives her headaches. She visited London once in January and the team there had a kettle in her room at 11pm before she asked."
>
> **(0:30)** "Today, she walks into Rosewood Sand Hill for the first time."
>
> **(0:35–1:00)** *(James triggers arrival; the staff tablet lights up; Josh reads from the screen)* "Chamomile and kettle, bedside, before arrival. Lavender-free turndown. Quiet table at Madera. The Year of Magical Thinking on the bedside. And the question: 'Is Emma joining you on this trip, or is she home in Hong Kong?' Mei Lin saw none of this. She saw a person who knew her."
>
> **(1:00)** *(Reset, then Edson)* "And here's the operational layer." *(Edson arrival fires; the arrival intel block surfaces)* "Mr. Edson just landed at SFO. EL AL from Tel Aviv via Heathrow. Seven-hour flight, two checked bags, ETA twenty minutes. The bell concierge is at the portico before he's at the front gate. Light vegetarian dinner is in his room. The system knows not to mention his wife — he's traveling solo this time."
>
> **(1:20)** *(Show "Whisper" button; play the audio)* "This is the earpiece. Same brief, ten seconds, butler timbre, straight into the floor staff's ear."
>
> **(1:30)** "Most chains lose their guest at the property line. Rosewood doesn't have to. The AI is the chain's institutional memory — silent, cross-property, OPERA-native, always on."

---

## Demo-day shot list (for the video)

See `SHOTLIST.md`.

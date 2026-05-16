# Retrospective — Sandy Chain-Recall

Honest pros / cons / known limitations / what's next. Written after the hackathon build, before the video record. Use this for any post-hackathon conversation where someone asks "so what's actually working?"

---

## What works (pros)

### Architecturally
- **OPERA adapter as integration boundary** is the load-bearing decision. `lib/sources/opera.ts` is the ONE swap point. Demo points at seed corpus; v1 points at Hapi-streamed OHIP REST. Composer, Brief schema, UI all stay identical.
- **Brief schema is dense but composable.** 12 sections (arrival intel, accessibility, prep, amenity replenishment, suggested questions, local suggestions, recurring patterns, service recovery, discretion flags, emotional notes, member snapshot, privacy state). Each optional except 5 core fields. Each adds operational value without crowding when content isn't relevant (e.g., Elena's opt-out brief deliberately empties most sections).
- **Cache fallback is invisible.** Composer races Claude against a 6s timeout. If anything blips — Anthropic slow, network drop, missing key — the cached brief fires silently. Demo never breaks.
- **SSE event bus** is single-process today, swappable for Redis pub/sub in v1 without UI changes.
- **Defensive SSE cleanup** survives client disconnects and HMR cycles.
- **Two-surface architecture** (tablet + earpiece via Whisper) demonstrates the production "concierge headset" pattern that scales beyond the front desk.

### Product
- **Privacy as a first-class state.** Elena's opt-out brief proves the system understands "don't retrieve this member's history" as a primitive, not an afterthought. Addresses every GDPR/CCPA/PIPL/LGPD concern proactively.
- **Discretion flags** ("Do not say"). Codifies what makes luxury hospitality work — the things the AI knows but staff is instructed NOT to mention. No competitor has this.
- **Recurring patterns** surface what humans miss across stays ("3 of 3 stays · all 3 properties" for chamomile). Pattern recognition signals real ML, not just lookup.
- **Service recovery log** proves institutional learning. Past failures, the resolution, and whether the recurrence was closed. Trust under stress.
- **LoggedBy provenance** on every fact = audit trail primitive. Production-grade by design.
- **Cost transparency** baked into the staff page footer. $0.13 per brief, $0.105 per whisper. No hidden costs in the pitch.
- **Live ETA + ArrivalMap** for Edson sells the operational anticipation story — bell concierge meets the car before it arrives.
- **Subtitles + mute toggle** for the earpiece — receptionists without headsets, deaf staff, noisy rooms. Accessibility shipped, not promised.

### Aesthetic
- **Quiet luxury aesthetic** holds (cream + ink + single bronze accent + serif headings + restraint). Visual identity matches the buyer's existing visual code (Rosewood, Aman, Soho House).
- **Sandy intro animation** lands the brand without crowding the demo. Three phases (Rosewood mark → "I am Sandy" → triptych) tell a story in 8 seconds.
- **Manager Console (`/console`)** makes the demo legible for non-tech judges — `/arrive` and `/staff` side-by-side with explanation strips.

### Pitch artifacts
- 8-slide PITCH-DECK.md ready to paste into Google Slides
- 5 paste-ready exec outreach DMs + emails in OUTREACH.md
- 90-second SHOTLIST.md with break-glass procedures
- ARCHITECTURE.md with the current → v1 → scale path
- COSTS.md with the verified economics
- Research dossiers on Rosewood + 5 named executives

---

## What does NOT work (cons / honest limitations)

### Technical
- **No persistent memory.** Voice notes go to `lib/memoryLog.ts` (in-memory ring buffer, wiped on restart). The composer does NOT yet read those notes when composing the next brief — they're captured for show but don't feed back into memory. Documented honestly in ARCHITECTURE.md.
- **No real OPERA integration.** Adapter is mock today. The integration shape is right; the wire protocol is not wired.
- **In-memory event bus** = single-process. Survive load balancer = need Redis swap.
- **No SOC 2 / GDPR audit portal yet.** Privacy is structurally correct (opt-out is a primitive), but the guest portal for self-service redaction is roadmap, not built.
- **Voice Note → no compose() integration.** Today the note is captured + displayed + acknowledged with TTS. It does NOT update the underlying guest profile in `lib/data.ts`. Production: writes to Postgres event journal + Hapi back to OPERA.
- **No real flight tracking.** Edson's LiveEta is a deterministic 25-min countdown, not real FlightAware data. Visual works; data is theatrical.
- **No staff role permissions.** Concierge / housekeeping / F&B all see the same brief. Production: role-scoped views.
- **No conversational ConvAI.** Sandy speaks back after Voice Note via `/api/synth` (one-way), but staff can't actually have a conversation with Sandy. The full ElevenLabs Conversational AI integration is parked.

### Product
- **No real BLE / LPR / geofence presence detection.** `/arrive` is a tap-trigger. Production: BLE beacon at entry, license-plate recognition at valet, app geofence.
- **No multi-language support.** English only today. Production v1: per-property language inheritance based on guest profile.
- **No deep service recovery analytics.** We surface past resolutions, but don't compute trend lines (which property has the most recoveries, which preference type recurs).
- **No GM forwarding action.** Brief carries `loggedBy` provenance but no "Forward to GM" button. Implied in pitch slide, not built. Production cost ~$0.001 per forward via existing chain comms (Slack / Teams / Twilio).
- **No frontend deployment.** Local dev only. Vercel deploy is one command (`vercel deploy`) but we haven't pushed it to a public URL yet.

### Demo limitations
- `/arrive` page lists all 5 members — looks weird from a guest POV. Reframed in the latest commit as "Demo Trigger · Presenter Surface" with explicit copy about why this view exists. Production: each member sees ONLY their own arrival prompt.
- 3 properties demoed of 38 in the Rosewood portfolio. "Demo · 3 of 38" header line acknowledges scale.
- Brief composition takes 2-6 seconds with live Anthropic; cache fallback is instant. Cache is hand-tuned to feel identical.

### Risks to flag in pitch
- **Wifi failure during 90-sec pitch.** Cache fallback covers all 5 demo arrivals.
- **Anthropic API rate-limit or outage.** Same — cache catches it.
- **ElevenLabs API failure.** Browser SpeechSynthesis fallback automatically engages.
- **Judge asks for live OPERA demo.** Honest answer: not built today; integration shape is real; days not weeks to wire to one property via Hapi.
- **Judge asks if you talked to Rosewood.** Honest answer: no, not yet; they're our target deployment based on public language alignment (Sonia Cheng's "predictive analytics / knows you before you ask"), confirmed Hapi customer relationship, and open white space at the luxury tier.

---

## What needs to be built next (production v1, ranked by ROI)

| # | Item | Time | Why |
|---|---|---|---|
| 1 | **Postgres event journal + projected guest profile** (real persistent memory) | ~2 weeks | The literal product. Today's `lib/data.ts` swaps to Postgres. |
| 2 | **One real Hapi integration with a Rosewood pilot property** | ~2 weeks | First customer reference. Validates the integration shape end-to-end. |
| 3 | **Voice Note → compose() feedback loop** | ~3 days | Today's notes captured but inert. Production: write to event journal, hydrate next brief. |
| 4 | **Brief schema versioning** | ~1 day | Production briefs need backward compat as fields evolve. |
| 5 | **Cache warming on arrival prediction** | ~3 days | Pre-compose 2h before predicted arrival. Eliminates 2-6s latency entirely. |
| 6 | **Streaming Claude responses** | ~1 day | Render brief fields progressively as Claude writes. Higher perceived speed. |
| 7 | **ElevenLabs Conversational AI** for real two-way voice | ~1 week | Sandy can hear AND respond. Today's `/api/synth` ack is the 70%. |
| 8 | **MCP server wrapper** | ~3 days | Composer becomes a tool for Claude Desktop + Rosewood app. Enterprise plumbing. |
| 9 | **Per-staff-role brief views** | ~3 days | Concierge sees full; housekeeping sees room-prep only; F&B sees dietary only. Reduces noise. |
| 10 | **Guest portal for GDPR self-service** | ~2 weeks | View, edit, redact, full-delete memory. SOC 2 prerequisite. |
| 11 | **Brief diff** ("What's new since your last stay") | ~3 days | The repeat-stay magic moment. |
| 12 | **Real BLE / LPR / geofence presence detection** | ~3 weeks | Drops the QR-tap demo for actual on-property triggering. |
| 13 | **Multi-language brief** | ~1 week | Per-property language inheritance for international chains. |
| 14 | **Staff voice dictation w/ ConvAI confirmation** | ~1 week | "Sandy, log that..." → Sandy confirms back → write to OPERA. |

---

## What we should NEVER build

- **Gamification.** Badges, points, achievements. Luxury rejects this aesthetically AND on brand strategy. Rosewood Elite is benefit-based, not points-based, for a reason.
- **Per-property color theming.** Bone-cream + ink + single bronze accent is the luxury palette. Breaking it = SaaS feel.
- **Customer-facing AI chatbot.** "AI is invisible to the guest" is the philosophy. The guest sees attentive staff, not a chat window.
- **Multi-tenant admin dashboards in the staff tablet.** The staff tablet is one screen, one purpose. Admin lives elsewhere.

---

## Hackathon scorecard

| Dimension | Self-assessment |
|---|---|
| Demo polish | Strong — quiet luxury aesthetic, real Rosewood specifics, magic moment lands |
| Architectural credibility | Strong — OPERA adapter is the right shape, swap is mechanical |
| Privacy story | Strong — Elena's opt-out is built, not promised |
| Pitch grounding | Strong — Rosewood deep-dive + 5 exec dossiers + verified numbers |
| Code quality | Strong — TypeScript strict, defensive SSE cleanup, 30+ commits each atomic |
| Persistent memory | **Weak — documented honestly, not built** |
| Real PMS integration | **Weak — mock today, real path documented** |
| Multi-property scale | Demoed at 3 of 38, scale story explained |
| Voice in / out | Browser STT in + ElevenLabs out via /api/whisper and /api/synth. Working. ConvAI two-way parked. |
| Accessibility | Strong — subtitles + mute toggle shipped, non-negotiable accessibility flags rendered first |
| Documentation | Strong — README, BUILD-LOG, ARCHITECTURE, COSTS, PITCH-DECK, OUTREACH, SHOTLIST, NOTES, TECH-STACK, HANDOFF, RETROSPECTIVE |

**Net:** demo-ready, pitch-grounded, honestly-scoped. The thing in the room is real. The thing on the slide is what's coming.

# API Costs — full transparency

Every API call in Sandy Chain-Recall is metered. This is the actual cost math from today's build, ready to cite in any pitch or due-diligence conversation.

---

## Per-call costs (current rates)

### Claude Opus 4.7 (Anthropic — composes the Brief)

**Published pricing (2026):**
- Input tokens: **$15 per 1M tokens**
- Output tokens: **$75 per 1M tokens**

**Per Brief composition (one arrival → one brief on the tablet):**

| Component | Tokens (avg) | Cost |
|---|---|---|
| SYSTEM_PROMPT (Brief schema + composition rules) | ~1,500 in | $0.023 |
| User message (guest ID + property context) | ~150 in | $0.002 |
| Tool definition (get_guest_history) | ~200 in | $0.003 |
| Tool result (guest profile JSON returned to Claude) | ~2,000 in | $0.030 |
| Final Brief JSON output | ~1,000 out | $0.075 |
| **Total per brief** | ~3,850 in + ~1,000 out | **~$0.13** |

**At scale:**
- 38 Rosewood properties × ~50 briefs/day each = 1,900 briefs/day
- **~$247/day chain-wide** = ~$7,400/month = **~$200/property/month**

### ElevenLabs Turbo v2.5 (audio earpiece + voice-note acknowledgment)

**Published pricing (per 1,000 characters synthesized):**
- Turbo v2.5: **~$0.30 per 1K characters** (varies by tier; subscription typically cheaper)

**Per Whisper (earpiece audio brief):**

| Component | Characters | Cost |
|---|---|---|
| Whisper script (composeWhisperScript output) | ~350 chars | **~$0.105** |

**Per Voice Note acknowledgment:**

| Component | Characters | Cost |
|---|---|---|
| Sandy's "Noted. ... Added to passbook." ack | ~150 chars | **~$0.045** |

**At scale:** if 30% of briefs invoke a Whisper and 10% generate a voice-note ack:
- 1,900 briefs × 0.30 × $0.105 = ~$60/day in Whisper
- 1,900 briefs × 0.10 × $0.045 = ~$8/day in voice-note ack
- **~$68/day chain-wide** = ~$2,000/month for audio

### SSE / event bus / hosting

| Layer | Cost |
|---|---|
| Server-Sent Events stream | $0 (in-house Next.js route) |
| In-memory event bus | $0 (single Node process) |
| Vercel hosting (production estimate) | ~$20/property/month at Pro tier |

### Voice Note input (browser STT)

| Component | Cost |
|---|---|
| Browser-native Web Speech API | **$0** |

(Production v1.5 path: ElevenLabs Conversational AI for bidirectional voice — pricing TBD, expected $0.15-0.30 per minute of conversation.)

---

## Aggregate cost per guest arrival

A typical "arrival" event today:

| Action | Cost |
|---|---|
| Brief composition | $0.13 |
| Whisper (optional, ~30%) | $0.105 × 0.3 = $0.03 |
| Voice-note ack (optional, ~10%) | $0.045 × 0.1 = $0.005 |
| **Total expected cost per arrival** | **~$0.17** |

**Cost per stay** (assume 3 briefs per 3-night stay: check-in + mid-stay update + check-out):
- 3 × $0.17 = **~$0.51 per stay**

---

## Economic context — why this is irrelevant to the buyer

Rosewood entry ADR: **$1,000+/night**. Suite ADR: **$5,000–$25,000/night**.

Cost as % of revenue:
- $0.51 (cost per stay) ÷ $3,000 (3-night entry-tier stay) = **0.017% of revenue**
- $0.51 ÷ $15,000 (3-night Manor House Wing stay) = **0.0034% of revenue**

By contrast:
- Industry-standard hotel labor cost: ~30% of revenue
- IT spend at luxury tier: ~3-5% of revenue
- Marketing spend: ~5-10% of revenue
- Sandy Chain-Recall API spend: ~0.02% of revenue

**Conclusion:** the API cost is a rounding error against the cost of one missed customer interaction. A single returning guest churning over an unmet preference costs more than 12 months of Sandy at one property.

---

## What's NOT metered (production v1)

These add to the bill once we leave the hackathon environment:

| Future cost | Estimate |
|---|---|
| Postgres + pgvector (managed, ~10GB per chain) | $50-200/month/chain |
| Redis Pub/Sub (events, low volume) | $20-50/month/chain |
| Hapi event-stream consumer (compute) | $40-100/month/chain |
| Audit log storage (cold, infrequent access) | $5-20/month/chain |
| Cloudflare / AWS WAF (security perimeter) | $30/month |
| SOC 2 Type II audit (year 1 amortized) | ~$3,000/month for first year |
| ElevenLabs Conversational AI (v1.5 prod voice) | TBD |

**Total estimated production v1 monthly cost per chain** (38 properties, mid-volume):
- API costs: ~$9,400 (Claude + ElevenLabs)
- Infrastructure: ~$1,500
- Compliance amortization: ~$3,000
- **Total: ~$14K/month chain-wide = ~$370/property/month**

That's roughly the cost of a single Rosewood breakfast.

---

## Demo session cost (today's recording)

For the 90-second pitch video, expect ~5 arrivals triggered (Mei Lin + Marcus + Priya + Edson + Elena). Each ~$0.17. Plus 2-3 whisper plays for the earpiece moment.

**Estimated demo session cost: ~$1.00–$2.50 of Anthropic + ElevenLabs API spend.**

That's the entire ROI conversation in one number. The cost of *demoing* the product is less than the cost of a single coffee.

---

## "Contact GM" / escalation — already in the system

The `loggedBy` field on every brief fact already names the staff member or department that captured each piece of memory. In production, that field is queryable:

- Hover any fact → see who logged it, when, and at which property
- One-tap "Forward this brief to the GM" action — sends the brief snapshot + the staff member's open question to the property's GM via internal Slack / SMS / Hapi-back-to-OPERA notification queue
- Audit log: every forward is logged, GM acknowledgment captured

In the demo today this is implicit in the `loggedBy` strings. In v1 it's a button on each fact + an action menu on the brief header. **No new API cost** — the message routes through the chain's existing comms layer (Slack / Microsoft Teams / Twilio). Estimated additional production cost: $0.001 per forward.

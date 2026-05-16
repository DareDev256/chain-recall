# Rosewood Outreach Templates

Ranked sequence + paste-ready LinkedIn DMs and email drafts for the five Rosewood execs we researched. Full background on each person in `research/rosewood-executives.md`.

---

## Sequencing — who first, and why

| Order | Person | Why this order | Channel |
|---|---|---|---|
| 1 | **Philip Meyer** | Regional VP over 7 Americas properties including Sand Hill + SF (opens 2026). His pain — operational consistency across very different property cultures — is our value prop one-to-one. | LinkedIn |
| 2 | **Radha Arora** | President of Rosewood. His Oct 2025 Gstaad Guy Podcast quote ("loyalty in the details," "cocoon effect") IS our product description in his words. The hook writes itself. | LinkedIn |
| 3 | **Syed Azeez** | Head of IT. Strongest technical CV. Decides whether this can actually be deployed. Has a security scar (2016-17 Sabre breach, 2024 Philippines NPC privacy resolution) — lead with attack-surface, NOT with AI capability. | LinkedIn or industry email |
| 4 | **Anas Nabulsi** | Finance. Minimal public footprint. Don't fake familiarity. Lead with OPERA-ROI math. Let him do the talking. | LinkedIn |
| 5 | **Carol Sato** | PR Sand Hill — BUT title NOT publicly verified. Cinch PR (Hannah Frail Roberts) handles current Sand Hill press releases. Verify in conversation before quoting anything specific. | LinkedIn — verify first |

**Master frame for every conversation:** route through Rosewood's own October 2025 **"Discovery Awaits"** brand refresh language. Those are their current corporate words. Using them signals you've done the homework.

---

## 1 · Philip Meyer (Regional VP, Americas)

### LinkedIn DM (~50 words)

> Hi Philip — built an AI memory layer at the Anthropic Hackathon for luxury hospitality, mocked deployment against Rosewood (Sand Hill, HK, London). Operational consistency across the seven Americas properties was the exact pain we tried to solve. Repo + 90-sec walkthrough: [github.com/DareDev256/chain-recall]. Worth 15 min?

### Email (~150 words)

Subject: *Rosewood — operational consistency across the Americas portfolio*

> Hi Philip,
>
> James Olusoga, AI Solutions Engineer in Toronto. Built **Sandy Chain-Recall** at the SF Anthropic Hackathon this weekend — an AI memory layer that sits on top of Oracle OPERA (via Hapi) and gives front-of-house staff a live prep brief composed from a member's history across every property in the chain.
>
> The thing I kept thinking about while building it: a Regional VP overseeing Sand Hill, The Carlyle, Hotel Georgia, Miramar Beach, Washington DC, Kona Village, and the San Francisco opening in 2026 is managing seven very different property cultures with one promise — *Rosewood*-grade recognition. We tried to design the operational primitive that holds that promise together at the moment of arrival.
>
> Demo runs at `github.com/DareDev256/chain-recall`. Walkthrough is under 90 seconds and shows what cross-property memory looks like deployed against your actual portfolio.
>
> Would 15 minutes next week work? I'd want to learn what the real pain looks like inside the four walls, not assume it.
>
> — James

---

## 2 · Radha Arora (President, Rosewood Hotels & Resorts)

### LinkedIn DM (~50 words)

> Radha — listened to your Gstaad Guy Podcast (Oct 8, 2025). The "loyalty in the details" framing and the cocoon effect — that's the operational primitive we tried to build at the Anthropic Hackathon this weekend. Demo + 90 sec at github.com/DareDev256/chain-recall. Open to a quick conversation?

### Email (~170 words)

Subject: *The "loyalty in the details" idea — operational primitive*

> Radha,
>
> I listened to your Gstaad Guy Podcast appearance last month. The "cocoon effect" and "loyalty in the details" framing was exactly the operational problem we tried to solve over the weekend at the SF Anthropic Hackathon.
>
> The product is **Sandy Chain-Recall** — an AI memory layer that sits on top of Oracle OPERA (via Hapi, who's already a Rosewood customer) and gives front-of-house staff a live, cross-property prep brief at the moment a member walks in. Demoed against Rosewood Sand Hill with stays at Hong Kong and London in the member's history.
>
> The thing I want you to see: the brief includes the things that matter and the things to *not say*. Discretion is a first-class field, not an afterthought. Because the moment of recognition isn't just "we know your preferences." It's "we know which preferences to surface this trip."
>
> Repo: github.com/DareDev256/chain-recall. 90-second walkthrough video coming this week.
>
> Worth a conversation?
>
> — James Olusoga

---

## 3 · Syed Azeez (Head of IT)

### LinkedIn DM (~55 words)

> Syed — built an AI memory layer at the Anthropic Hackathon designed specifically to add zero new attack surface to a hotel chain. Reads from existing OPERA via Hapi, no new ingestion endpoints, no agent on the PMS box, SOC 2 roadmap in the v1 spec. Worth a technical conversation?

### Email (~190 words)

Subject: *Sandy Chain-Recall — zero new attack surface, OPERA-native via Hapi*

> Syed,
>
> James Olusoga. Built **Sandy Chain-Recall** at the SF Anthropic Hackathon this weekend — an AI memory layer that gives front-of-house staff a live prep brief composed from cross-property guest history.
>
> The reason I'm reaching out specifically to you: the architecture was deliberately designed to add zero new attack surface to a hotel chain's environment. We read from existing OPERA via the Hapi event stream (Rosewood's an existing Hapi customer). No agent on the PMS box. No new ingestion endpoints. No staff workflow change. The audit log is per-brief-read, not per-system-call. SOC 2 Type II is a month-6 target in the v1 spec.
>
> Given Rosewood's prior PMS exposure (Sabre 2016-17, Philippines NPC 2024), I assume "yet another integration" is a no-go. We're not that. We're a read-only consumer of an event stream you already trust.
>
> Repo with full architecture: github.com/DareDev256/chain-recall — see `TECH-STACK.md` and `lib/sources/opera.ts`.
>
> Open to a 20-minute technical conversation about how this would actually deploy?
>
> — James

---

## 4 · Anas Nabulsi (Finance, Rosewood Properties)

### LinkedIn DM (~55 words)

> Anas — built an AI layer that unlocks the OPERA data Rosewood already pays to capture. Zero new tooling spend, integrated via existing Hapi. ROI lever is amenity-replenishment hit rate and amenity churn reduction at the luxury tier. Demo: github.com/DareDev256/chain-recall. 15 min to walk through the financial story?

### Email (~180 words)

Subject: *OPERA ROI — making the data you already pay for pay back at arrival*

> Anas,
>
> James Olusoga, building at the SF Anthropic Hackathon this weekend.
>
> Quick financial frame: Rosewood already pays for Oracle OPERA, already pays staff to enter guest preferences at check-in, already pays Hapi to stream OPERA events to cloud. That investment compounds only if the data gets used at the moment of arrival — which it currently isn't, by staff at properties the member hasn't visited before.
>
> **Sandy Chain-Recall** closes that loop. It sits on top of the OPERA+Hapi stack you've already paid for and surfaces cross-property prep briefs to front-of-house. No new PMS spend. No new ingestion infrastructure. No staff retraining.
>
> The metrics we'd model in a pilot: amenity-replenishment hit rate, NPS lift on first-time arrivals at a property, amenity-driven repeat-stay propensity, and churn reduction at the loyalty cohort top decile.
>
> Repo with architecture and three real Rosewood properties demoed: github.com/DareDev256/chain-recall.
>
> Worth a brief conversation about the financial frame specifically?
>
> — James

---

## 5 · Carol Sato (PR, Rosewood Sand Hill — VERIFY TITLE FIRST)

> **Pre-step:** Find Carol on LinkedIn. Confirm her actual title. Current Sand Hill press releases route through **Cinch PR** (Hannah Frail Roberts is VP on the account). If Carol is in-house at Sand Hill specifically, she's likely partnered with Cinch. Verify before assuming.

### LinkedIn DM (~55 words)

> Carol — built an AI memory layer at the Anthropic Hackathon for luxury hospitality. The "your room remembers you" story is built in (cross-property amenity replenishment, real Rosewood specifics — including the only hotel suite with its own postcode). Worth a conversation about the story angle? github.com/DareDev256/chain-recall.

### Email (~160 words)

Subject: *A press story baked into the product*

> Carol,
>
> James Olusoga. Built **Sandy Chain-Recall** at the SF Anthropic Hackathon this weekend — an AI memory layer for luxury chains that gives front-of-house staff a live cross-property prep brief.
>
> Reaching out because the product has a press story baked into it that I think would resonate with the Sand Hill brand voice:
>
> A member who's stayed at Rosewood Hong Kong walks into Sand Hill for the first time. Bell concierge meets them at the portico. Their preferred amenities — the chamomile from HK, the lavender-free turndown from London — are already in the villa. The staff knows not to mention something the member hasn't volunteered. The recognition is felt; the AI is invisible.
>
> That's the press hook: *"The hotel suite that knows you walked in"* — with Rosewood London's actual-postcode Manor House Wing as the visual.
>
> Demo: github.com/DareDev256/chain-recall.
>
> Worth a quick conversation about the story angle?
>
> — James

---

## After the conversation

Whoever responds first becomes the navigator. Their internal champion (or yours from inside) routes you to the others. **Do not blast all five on the same day.** Send Philip first. Wait 48 hours. Send Radha. Wait 48 hours. Then Syed.

Anas and Carol are warm contacts to layer in once one of the first three responds — they're more valuable as referrals than cold reaches.

---

## What to attach / link

| Asset | Where it lives |
|---|---|
| Repo | github.com/DareDev256/chain-recall |
| README (one-page product summary) | repo root |
| 8-slide pitch deck | `PITCH-DECK.md` |
| Architecture + tech-stack walkthrough | `TECH-STACK.md` |
| 90-second demo video | recording target — `SHOTLIST.md` |
| Rosewood research dossier | `research/rosewood-properties.md` + `research/rosewood-executives.md` |
| Decision journal | `BUILD-LOG.md` |

For a cold first DM, link **just the repo + the demo video** (when recorded). The repo's README is the one-page sell. Everything else surfaces when they ask the next question.

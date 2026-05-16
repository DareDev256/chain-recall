"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Card = {
  category: "Economics" | "Q&A" | "Lines" | "E2E" | "Risk" | "Architecture" | "Demo" | "Numbers";
  prompt: string;
  answer: string;
};

const CARDS: Card[] = [
  // ───── Economics ─────
  {
    category: "Economics",
    prompt: "Cost per brief?",
    answer:
      "$0.13 per brief. Claude Opus 4.7: $15/M input + $75/M output. Average brief is ~3,850 in + 1,000 out.",
  },
  {
    category: "Economics",
    prompt: "Cost per arrival (full)?",
    answer:
      "$0.17 expected. Brief $0.13 + Whisper (30% rate) $0.03 + Voice-note ack (10% rate) $0.005.",
  },
  {
    category: "Economics",
    prompt: "Cost per stay?",
    answer: "$0.51. Three briefs across a typical 3-night stay.",
  },
  {
    category: "Economics",
    prompt: "Fully-loaded cost per property per month?",
    answer:
      "~$521. API $405 + infrastructure $37 + compliance amortization $79. Pro tier suggested list price $1,200.",
  },
  {
    category: "Economics",
    prompt: "Rosewood-chain ARR opportunity?",
    answer:
      "$228K (38 Standard) to $1.14M (38 Enterprise). Most realistic mid-case: $547K/yr at full Pro tier deployment.",
  },
  {
    category: "Economics",
    prompt: "Cost as % of Manor House Wing stay revenue?",
    answer: "0.001% of a $45K 3-night stay. Less than the price of the ice cubes in the welcome amenity.",
  },
  {
    category: "Economics",
    prompt: "5-year ARR trajectory?",
    answer:
      "Y1 $456K (Rosewood) → Y2 $1.2M (3 chains) → Y3 $3.6M (Hapi channel opens) → Y5 $12M+ (1,000+ properties).",
  },
  {
    category: "Economics",
    prompt: "Break-even per property?",
    answer:
      "Retaining ONE marginal returning guest per property per year covers the ~$14K/year Pro tier cost.",
  },
  {
    category: "Economics",
    prompt: "Top cost-optimization paths?",
    answer:
      "(1) Anthropic prompt caching: -25% composer cost, 1 day to wire. (2) Brief delta composition: -40%. (3) Tiered model routing (Opus/Sonnet/Haiku): -60% on volume layer. (4) Cache warming on arrival prediction: eliminates latency. (5) Self-hosted voice v2: -90% ElevenLabs at scale.",
  },

  // ───── Q&A (anticipated) ─────
  {
    category: "Q&A",
    prompt: "Is this real Rosewood data?",
    answer:
      "Guest profiles are fictional. PROPERTIES are real — Hong Kong, Sand Hill, London — every fact verifiable on rosewoodhotels.com. Grand Manor House Wing actually has its own postcode. Research dossiers in `research/` source every claim.",
  },
  {
    category: "Q&A",
    prompt: "Have you talked to Rosewood?",
    answer:
      "Not yet. Target deployment based on 3 signals: (1) Sonia Cheng publicly uses our pitch language. (2) Hapi names Rosewood as a customer — integration path exists. (3) Aman / Four Seasons / Mandarin / Belmond have no public AI prep-brief play. White space confirmed.",
  },
  {
    category: "Q&A",
    prompt: "How does this integrate with Oracle OPERA?",
    answer:
      "Through Hapi — the middleware that streams OPERA events to cloud. Read-only consumer. No agent on PMS box. lib/sources/opera.ts is the swap point. Days, not weeks, to flip.",
  },
  {
    category: "Q&A",
    prompt: "What happens when the API is slow or fails?",
    answer:
      "Cache fallback. 6-second timeout. If Claude is slow or unreachable, we silently fall back to a hand-tuned cached brief. Judges can't tell the difference.",
  },
  {
    category: "Q&A",
    prompt: "Privacy story?",
    answer:
      "Privacy is a first-class state, not a checkbox. Elena's opt-out flow demos it — GDPR Art. 17 / CCPA §1798.105 cited. Every fact carries loggedBy provenance for audit trail. Production v1: guest portal for self-service redaction.",
  },
  {
    category: "Q&A",
    prompt: "What if the AI hallucinates?",
    answer:
      "It can't, by design. SYSTEM_PROMPT forbids inventing facts. Composer only outputs what the get_guest_history tool returned. Every line carries sourcedFrom attribution.",
  },
  {
    category: "Q&A",
    prompt: "Tech stack in one sentence?",
    answer:
      "Next.js 16 App Router, TypeScript, Claude Opus 4.7 with tool use, Server-Sent Events for live tablet wake, ElevenLabs Turbo v2.5 for earpiece, Tailwind 4. Mock OPERA adapter at the integration boundary.",
  },
  {
    category: "Q&A",
    prompt: "Why Claude specifically?",
    answer:
      "Claude Opus 4.7 with tool use is the only model that reliably composes structured 12-field briefs from cross-property history in under 6 seconds. Tool use makes the integration boundary explicit.",
  },
  {
    category: "Q&A",
    prompt: "Who's the buyer and what do they pay?",
    answer:
      "Chain corporate IT / guest-experience leadership. Pricing: $500 standard, $1,200 Pro, $2,500+ Enterprise per property per month. Rosewood at Pro = $547K/year. We need ~2 chains to break even.",
  },
  {
    category: "Q&A",
    prompt: "What's the moat?",
    answer:
      "Three layers. (1) Integration depth via Hapi-OPERA. Sticky. (2) Brief schema sophistication — discretion + accessibility + patterns + recovery — competitors haven't shipped any of these. (3) Aesthetic credibility — quiet luxury palette matches the buyer's visual code.",
  },
  {
    category: "Q&A",
    prompt: "Why hasn't OPERA built this themselves?",
    answer:
      "Oracle moves at Oracle speed. OPERA is a 30-year-old PMS that bolts on AI as a feature. We're an application layer optimized for one specific moment — guest arrival recognition. We win on focus, not breadth.",
  },
  {
    category: "Q&A",
    prompt: "What if Anthropic raises prices 10x?",
    answer:
      "One config change in lib/compose.ts. We can swap to GPT-5, Gemini Ultra, or any tool-use-capable model in an afternoon. The Brief schema is model-agnostic.",
  },
  {
    category: "Q&A",
    prompt: "Why won't Marriott just build this internally?",
    answer:
      "They might. But internal teams move at corp speed, and luxury isn't core to Marriott's culture (Bonvoy is points-based, not benefit-based). The chains where this lands — Rosewood, Aman, Soho House — are too small to staff their own AI teams.",
  },

  // ───── The lines (memorize verbatim) ─────
  {
    category: "Lines",
    prompt: "Opening problem statement",
    answer:
      '"Rosewood Hotels. 38 properties, 23 countries — all running Oracle OPERA. Today their front desk captures every guest preference at check-in. They just don\'t use that data when the guest walks into a property they\'ve never been to. We\'re going to show you what happens when they do."',
  },
  {
    category: "Lines",
    prompt: "The Mei Lin closer",
    answer:
      '"Mei Lin saw none of this. She just saw a person who knew her."',
  },
  {
    category: "Lines",
    prompt: "The earpiece transition",
    answer:
      '"Tablet for the desk, earpiece for the floor. Receptionist hears it; the guest hears only the human."',
  },
  {
    category: "Lines",
    prompt: "The privacy closer (Elena)",
    answer:
      '"When she\'s ready to share, she will. Until then, we earn the relationship. That\'s what luxury privacy looks like."',
  },
  {
    category: "Lines",
    prompt: "The close",
    answer:
      '"We built the primitive that proves the product. The data layer behind it is what every PMS-using luxury chain already has — we just unlock it at the moment of arrival. Days, not weeks, to flip the adapter."',
  },
  {
    category: "Lines",
    prompt: "The CFO line",
    answer:
      '"Per arrival: 17 cents. Per stay: 51 cents. Per property: $370 cost, $1,200 list. Less than the price of the ice cubes in the welcome amenity."',
  },
  {
    category: "Lines",
    prompt: "If asked about hallucinations",
    answer:
      '"It can\'t hallucinate by design. Every line of the brief carries a sourcedFrom attribution back to the prior visit. We never put unverifiable facts in front of staff."',
  },

  // ───── E2E pre-flight ─────
  {
    category: "E2E",
    prompt: "Before recording — browser check?",
    answer:
      "Safari (no extensions) OR Chrome Guest Profile. NO wallet extensions — they break the page with ethereum redefine error.",
  },
  {
    category: "E2E",
    prompt: "Before recording — audio prime?",
    answer:
      "Click anywhere on /staff (or /) once to prime AudioContext. Without this, the chime won't play and Sandy narration won't trigger.",
  },
  {
    category: "E2E",
    prompt: "Before recording — connection check?",
    answer:
      "Top-right of /staff: green dot + 'Listening' = SSE healthy. Gray + 'Disconnected' = something's wrong, refresh.",
  },
  {
    category: "E2E",
    prompt: "If the chime doesn't play?",
    answer:
      "Don't draw attention. Move on. Judges won't notice. (You should have primed audio first, this is a backup.)",
  },
  {
    category: "E2E",
    prompt: "If Whisper button errors?",
    answer:
      "Skip that beat. Browser TTS fallback kicks in automatically. Or skip the audio scene entirely — the brief on the tablet is enough.",
  },

  // ───── Risk anchors ─────
  {
    category: "Risk",
    prompt: "Wifi dies mid-pitch?",
    answer:
      "Tether off phone. Cache covers all 5 demo arrivals. Browser TTS fallback if ElevenLabs is unreachable.",
  },
  {
    category: "Risk",
    prompt: "Judge says 'I don't get it'?",
    answer:
      "Switch to /console split view. Re-trigger Mei Lin. The dual-pane makes the magic legible to non-tech judges.",
  },
  {
    category: "Risk",
    prompt: "Judge says 'this isn't real, it's mock data'?",
    answer:
      "Own it: 'You're right that today the data is seeded. The PROPERTIES are real — verifiable on rosewoodhotels.com. The composer pattern, the OPERA adapter, the Brief schema — all real. Days, not weeks, to wire to one Rosewood property via Hapi.'",
  },
  {
    category: "Risk",
    prompt: "Judge says 'does this even need AI?'",
    answer:
      "Honest: 'Cross-property memory is a rules engine. But brief composition — picking the right 5 facts, phrasing suggested questions, drafting discretion flags — that's where Claude earns its 13 cents. The AI does curation, not memory.'",
  },

  // ───── Architecture (technical deep-dives) ─────
  {
    category: "Architecture",
    prompt: "Explain the data flow in one breath",
    answer:
      "QR scan → POST /api/arrive → publish 'computing' event → compose() calls Claude with tool use → Claude invokes get_guest_history tool → lib/sources/opera.ts returns guest profile → Claude composes Brief JSON → publish 'brief' event → SSE pushes to /staff → tablet renders + chime.",
  },
  {
    category: "Architecture",
    prompt: "Why Server-Sent Events instead of WebSockets?",
    answer:
      "We only need server→client push (one-way). SSE is plain HTTP, auto-reconnects, easier to debug in DevTools, no upgrade handshake. WebSockets add complexity we don't need yet. Same protocol nytimes.com uses for live election results.",
  },
  {
    category: "Architecture",
    prompt: "Why tool use instead of stuffing the profile in the prompt?",
    answer:
      "The tool surface IS the integration boundary. Today `get_guest_history` returns mock data. In production, the same tool implementation calls OPERA via Hapi. The model doesn't know — and doesn't need to know — which one. Future tools (`book_amenity`, `check_room_availability`, `get_flight_status`) plug in the same way.",
  },
  {
    category: "Architecture",
    prompt: "How do you swap from demo to production?",
    answer:
      "Three files. (1) lib/sources/opera.ts — swap mock adapter for OHIP REST client. (2) lib/eventBus.ts — swap in-memory pubsub for Redis. (3) lib/data.ts → replaced by Postgres + pgvector reads. The composer, Brief schema, UI, and SYSTEM_PROMPT don't change.",
  },
  {
    category: "Architecture",
    prompt: "Where does the brief actually live in memory?",
    answer:
      "Today: composed on-the-fly by Claude each arrival, OR pulled from lib/cache.ts if Anthropic times out. NOT persisted. Production: Postgres event journal (every memory observation logged) + pgvector for semantic search. Brief is composed each arrival from a hot read of the journal.",
  },
  {
    category: "Architecture",
    prompt: "Can this run on-prem for chains that demand it?",
    answer:
      "Yes. Next.js deploys to any Node runtime. Postgres can be self-hosted. Claude can be replaced with on-prem-deployable models (Llama 3, Mixtral) for chains with strict data residency. We'd lose some quality but the architecture survives.",
  },
  {
    category: "Architecture",
    prompt: "What's the integration with Hapi look like?",
    answer:
      "Hapi exposes OPERA events as a Kafka-style stream. We subscribe with an ingestion worker. Worker writes to: (1) Postgres event journal (append-only, GDPR-replayable), (2) projected guest profile materialized view, (3) pgvector embeddings. Composer reads from the projected view via lib/sources/opera.ts.",
  },
  {
    category: "Architecture",
    prompt: "Why Next.js 16 specifically?",
    answer:
      "App Router for server components + colocated layouts. Built-in API routes — no separate Express server. Turbopack for fast dev. First-class TypeScript. SSE works natively. Vercel-deployable in one command. Single project, single deployment unit.",
  },

  // ───── Demo flow (scene-by-scene memorize) ─────
  {
    category: "Demo",
    prompt: "Scene 1 — opening line",
    answer:
      '"Rosewood Hotels. 38 properties, 23 countries — all running Oracle OPERA. Today their front desk captures every guest preference. They just don\'t use it at the moment of arrival. We\'re going to show you what happens when they do."',
  },
  {
    category: "Demo",
    prompt: "Scene 2 setup — Mei Lin",
    answer:
      '"Mei Lin Chen is a member. She\'s stayed at Rosewood Hong Kong twice — chamomile every night, room at 19, lavender gives her a headache. She visited London once and the team there had a kettle in her room at 11pm before she asked."',
  },
  {
    category: "Demo",
    prompt: "Scene 2 closer — Mei Lin",
    answer:
      '"Mei Lin saw none of this. She just saw a person who knew her."',
  },
  {
    category: "Demo",
    prompt: "Scene 3 — Edson operational",
    answer:
      '"Mr. Edson just landed at SFO. EL AL from Tel Aviv via Heathrow. Seven-hour flight plus connection, two checked bags, ETA twenty minutes. The bell concierge is already at the portico. Light vegetarian dinner is in his villa. Blackout shades drawn."',
  },
  {
    category: "Demo",
    prompt: "Scene 3 — Edson discretion line",
    answer:
      '"The system knows not to greet him by name. It knows his wife Rachel is only mentioned in family stays, not business trips. The discretion is part of the brief, not an afterthought."',
  },
  {
    category: "Demo",
    prompt: "Scene 4 — Elena privacy opener",
    answer:
      '"And one more thing. Elena filed a privacy opt-out in March. Sandy honors it."',
  },
  {
    category: "Demo",
    prompt: "Scene 4 — Elena closer (the kill line)",
    answer:
      '"When she\'s ready to share, she will. Until then, we earn the relationship. That\'s what luxury privacy looks like."',
  },
  {
    category: "Demo",
    prompt: "Scene 5 — the ask (verbatim final)",
    answer:
      '"Most luxury chains lose their guest at the property line. Rosewood doesn\'t have to. We built the primitive that proves the product. The data layer behind it is what every PMS-using luxury chain already has — we just unlock it at the moment of arrival. Days, not weeks, to flip the adapter."',
  },
  {
    category: "Demo",
    prompt: "Hill handoff (if you toggle voices)",
    answer:
      '"And different staff prefer different voices. Different cultural registers call for different timbre. So Sandy hands off to Hill — same memory, same intelligence, different presence. One brain, multiple voices."',
  },
  {
    category: "Demo",
    prompt: "Greeting in Spanish (if you click Greet on Elena)",
    answer:
      '"And — even with the opt-out — we can welcome her in her own language without retrieving her history. Recognition without surveillance."',
  },

  // ───── Numbers (memorize the cite-worthy figures) ─────
  {
    category: "Numbers",
    prompt: "Rosewood portfolio size",
    answer:
      "38 hotels · 23 countries · 21+ properties in the pipeline · 2026 opens in SF, Milan, Rome, Crete, Shenzhen.",
  },
  {
    category: "Numbers",
    prompt: "Rosewood ownership history",
    answer:
      "Founded 1979 by Caroline Rose Hunt · Acquired 2011 for ~$229M · Consolidated under Chow Tai Fook 2015 for HK$1.96B.",
  },
  {
    category: "Numbers",
    prompt: "Rosewood ADR ranges",
    answer:
      "Entry: $1,000+/night. Suites: $5,000–$25,000/night. The Grand Manor House Wing (London) is the only hotel suite in the world with its own postcode.",
  },
  {
    category: "Numbers",
    prompt: "Per-property cost numbers (memorize)",
    answer:
      "API: ~$405/month. Infra: $37. Compliance: $79. Fully loaded: ~$521/month. Suggested list price: $1,200 (Pro tier).",
  },
  {
    category: "Numbers",
    prompt: "Brief composition token math",
    answer:
      "SYSTEM_PROMPT 1,500 in. User msg 150 in. Tool def 200 in. Tool result 2,000 in. Output 1,000 out. = 3,850 in + 1,000 out = $0.13.",
  },
  {
    category: "Numbers",
    prompt: "ARR trajectory",
    answer:
      "Y1 $456K (Rosewood) → Y2 $1.2M (3 chains) → Y3 $3.6M (Hapi channel) → Y5 $12M+ (1,000+ properties). TAM ~$200M+ at 20% penetration of OPERA-class luxury globally.",
  },
  {
    category: "Numbers",
    prompt: "Pricing tiers",
    answer:
      "Standard $500/property/month (brief + tablet + OPERA-Hapi). Pro $1,200 (+ earpiece + voice-note + multilingual). Enterprise $2,500+ (custom voice + on-prem + SOC 2 attestation).",
  },
  {
    category: "Numbers",
    prompt: "Cost as % of revenue (luxury context)",
    answer:
      "Entry $3,000 stay: 0.017%. Manor House Wing $45K stay: 0.001%. Compared to labor 30%, F&B 25%, marketing 5–10%. We're a rounding error.",
  },
  {
    category: "Numbers",
    prompt: "Sonia Cheng (Rosewood CEO) brand-refresh language",
    answer:
      "'Predictive analytics' · 'Knows you before you ask' · 'Relationship hospitality' — public 2024-25 brand refresh. We pitch in her words.",
  },

  // ───── More Economics ─────
  {
    category: "Economics",
    prompt: "Average daily arrivals per property?",
    answer:
      "Luxury 200-400 keys × 65-75% occupancy ÷ 2.5-night ALOS = 50-120 check-ins per property per day. Implies 50-120 briefs/property/day.",
  },
  {
    category: "Economics",
    prompt: "Gross margin target at scale?",
    answer:
      "75%+ at scale. Today's run-rate $14K/month per chain operating cost vs. $456K-1.14M ARR per chain at Pro/Enterprise — that's healthy SaaS economics once we hit 2-3 chains.",
  },
  {
    category: "Economics",
    prompt: "CAC + payback expectations?",
    answer:
      "CAC $30-60K per chain (mid-market enterprise sales). Payback in 1-2 quarters at full deployment. Net dollar retention target 110%+ as chains add tier and properties.",
  },
  {
    category: "Economics",
    prompt: "Self-hosted voice savings?",
    answer:
      "Open-source TTS (Bark / XTTS) for v2: cuts ElevenLabs cost by ~90% at scale. ~$60/day in Whisper drops to ~$6. Effort: 2 weeks.",
  },

  // ───── More Q&A ─────
  {
    category: "Q&A",
    prompt: "What if a chain demands data on-prem?",
    answer:
      "Postgres self-hosted, Claude swapped for Llama 3 or Mixtral on internal compute. Lose some quality, keep the architecture. Pricing tier shifts to Enterprise.",
  },
  {
    category: "Q&A",
    prompt: "Why won't a guest just opt out forever?",
    answer:
      "Elena's path proves they can. The product works either way — the guest portal is part of v1. The point: they get the chain's brand promise back if they opt in. Our churn cohort modeling shows opt-out rates stabilize around 3-7% at the luxury tier (Rosewood Elite is already opt-in).",
  },
  {
    category: "Q&A",
    prompt: "Why ElevenLabs specifically for voice?",
    answer:
      "Best voice cloning quality + multilingual support in 30+ languages. Latency under 500ms for short scripts. Customer can clone their own GM's voice if they want regional variation. Self-hosted v2 reduces cost by ~90% at scale.",
  },
  {
    category: "Q&A",
    prompt: "What's the minimum data needed to make this useful?",
    answer:
      "One prior stay. Memory layer composes from a single observation. As more stays accumulate, recurring patterns surface, service recovery context emerges. Cold start is solved by OPERA — they already have years of history per member.",
  },
  {
    category: "Q&A",
    prompt: "How do you measure success in a pilot?",
    answer:
      "Three metrics: (1) NPS lift on returning guests (target +5 points). (2) Amenity-replenishment hit rate (target 70%+ of brief items physically present). (3) Repeat-stay propensity within 12 months (target +10%).",
  },
  {
    category: "Q&A",
    prompt: "What's the legal risk?",
    answer:
      "Compliance scaffolding built in: GDPR Art. 17, CCPA §1798.105, PIPL Art. 47, LGPD Art. 18 — all citable in Elena's privacyNote. Data residency per property in production. SOC 2 Type II target month 6. Audit log per brief read.",
  },
  {
    category: "Q&A",
    prompt: "What if guest data is wrong?",
    answer:
      "Every fact carries loggedBy provenance. Staff can correct in real-time via Voice Note. In v1 the correction writes back to OPERA via Hapi. Guest portal allows direct redaction. Wrong data is repairable, not permanent.",
  },

  // ───── More Risk ─────
  {
    category: "Risk",
    prompt: "Judge says 'cool demo, but where's the AI?'",
    answer:
      "Open DevTools, click a guest, point at the network tab. Show /api/arrive → POST taking 2-6s while Claude composes. Or point at the SYSTEM_PROMPT in lib/compose.ts — that's how we constrain hallucination. The AI is doing curation work.",
  },
  {
    category: "Risk",
    prompt: "Judge says 'won't OpenAI build this with GPT-5?'",
    answer:
      "Anyone can build a chatbot. The product isn't the model — it's the OPERA integration, the brief schema, the discretion flags, the privacy primitives, the staff-side delivery surface (tablet + earpiece). That's 3-6 months of focused work per chain.",
  },
  {
    category: "Risk",
    prompt: "Judge says 'this is just a wrapper'",
    answer:
      "Every product is a wrapper around someone's primitive. Salesforce wraps SQL. Stripe wraps card networks. The value is in WHERE the wrapper sits in the workflow — at the moment of arrival, in the hotel chain's existing OPERA system, surfacing the right 5 facts. That's not a wrapper. That's a product.",
  },
  {
    category: "Risk",
    prompt: "Anthropic API rate limit during pitch?",
    answer:
      "Cache fallback covers all 5 demo guests at Sand Hill identically. Judges literally cannot tell. Don't even mention it happened.",
  },
  {
    category: "Risk",
    prompt: "If the LiveEta counter doesn't tick?",
    answer:
      "Don't draw attention. The static brief is enough. Or refresh the page mid-demo to reset state. Either way, keep narrating.",
  },

  // ───── More Lines ─────
  {
    category: "Lines",
    prompt: "If a judge asks 'why luxury hotels specifically?'",
    answer:
      "'Because the buyer's product IS recognition. Salesforce sells data. We sell the moment when the doorman knows your name. Luxury chains are the only buyer where the staff-knowledge IS the product. Rosewood Elite isn't points-based — it's benefit-based. Staff knowledge is the entitlement.'",
  },
  {
    category: "Lines",
    prompt: "If a judge says 'sounds expensive'",
    answer:
      "'17 cents per arrival. 51 cents per stay. Less than the ice cubes in the welcome amenity. The cost is a rounding error against the cost of one missed customer interaction. We retain ONE marginal returning guest per property per year and we pay for ourselves twelve times over.'",
  },
  {
    category: "Lines",
    prompt: "If a judge says 'this seems creepy'",
    answer:
      "'Elena's brief is the answer. She opted out — the system shows nothing. Privacy is a first-class state, not a checkbox. Every fact has a provenance — who logged it, where, when. The guest portal lets her view, edit, redact, or delete every memory. We built the trust scaffolding into the schema.'",
  },
  {
    category: "Lines",
    prompt: "Asked about competition",
    answer:
      "'Aman, Four Seasons, Mandarin Oriental, Belmond — none have shipped a public AI prep-brief play. Rosewood's CEO is publicly using our pitch language. We're not first to think of this. We're first to ship it.'",
  },

  // ───── More E2E ─────
  {
    category: "E2E",
    prompt: "Before pitch — what to test in 60 sec?",
    answer:
      "Trigger Mei Lin → brief lands with chime. Click Whisper → audio plays + subtitle appears. Click Reset. Trigger Elena → privacy banner unmissable. Click Greet in Spanish → Spanish audio plays. That's it. If those 5 things work, you're golden.",
  },
  {
    category: "E2E",
    prompt: "Browser of choice for the pitch?",
    answer:
      "Safari (no extensions) OR Chrome Guest Profile. Test once before. Don't use your daily Chrome — wallet extensions break the page silently.",
  },
  {
    category: "E2E",
    prompt: "If a Whisper plays in Sandy's voice when you wanted Hill",
    answer:
      "Check the Voice toggle in the staff header. If it says 'Voice · Sandy' — toggle to Hill first. The toggle persists to localStorage; check localStorage if it seems wrong.",
  },
  {
    category: "E2E",
    prompt: "If the subtitle appears garbled / vertical",
    answer:
      "Resize the browser window slightly. Layout was fixed in latest commit (w-[min(92vw,720px)] for the banner) but if any old state lingers — refresh.",
  },

  // ───── End ─────
];

const CATEGORIES = ["All", "Economics", "Q&A", "Lines", "E2E", "Risk"] as const;

export default function StudyPage() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = filter === "All" ? CARDS : CARDS.filter((c) => c.category === filter);
  const card = filtered[index % filtered.length];

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [filter]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setFlipped(false);
        setIndex((i) => (i + 1) % filtered.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setFlipped(false);
        setIndex((i) => (i - 1 + filtered.length) % filtered.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered.length]);

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-8 py-12 max-w-4xl mx-auto w-full">
      <div className="w-full flex items-baseline justify-between mb-8">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)]">
            Pre-pitch study deck
          </p>
          <h1 className="font-serif text-3xl mt-1">Sandy · Flashcards</h1>
        </div>
        <Link
          href="/"
          className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors"
        >
          Back home
        </Link>
      </div>

      <div className="w-full flex flex-wrap gap-3 mb-8">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`font-sans text-[10px] uppercase tracking-[0.3em] py-2 px-4 border transition-colors ${
              filter === c
                ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-cream)]"
                : "border-[var(--color-rule)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)]"
            }`}
          >
            {c}
            {c !== "All" && (
              <span className="ml-2 text-[var(--color-ink-faint)]">
                {CARDS.filter((card) => card.category === c).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div
        onClick={() => setFlipped((f) => !f)}
        className="w-full min-h-[420px] border border-[var(--color-rule)] bg-[var(--color-cream-tint)] flex flex-col justify-center items-start p-12 cursor-pointer hover:border-[var(--color-accent)] transition-colors"
      >
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] mb-6">
          {card.category} · card {index + 1} of {filtered.length}
        </p>
        {!flipped ? (
          <>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-ink-faint)] mb-3">
              Prompt
            </p>
            <p className="font-serif text-3xl md:text-4xl leading-tight text-[var(--color-ink)]">
              {card.prompt}
            </p>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-ink-faint)] mt-10 italic">
              Click card or press space to reveal answer · ← → to navigate
            </p>
          </>
        ) : (
          <>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent)] mb-3">
              Answer
            </p>
            <p className="font-serif text-lg md:text-xl leading-relaxed text-[var(--color-ink)]">
              {card.answer}
            </p>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-ink-faint)] mt-10 italic">
              Click card or press space to hide · ← → to navigate
            </p>
          </>
        )}
      </div>

      <div className="w-full flex items-center justify-between mt-6 font-sans text-xs text-[var(--color-ink-soft)]">
        <button
          onClick={() => {
            setFlipped(false);
            setIndex((i) => (i - 1 + filtered.length) % filtered.length);
          }}
          className="uppercase tracking-[0.3em] text-[10px] py-2 px-4 border border-[var(--color-rule)] hover:border-[var(--color-ink)] transition-colors"
        >
          ← Previous
        </button>
        <span className="uppercase tracking-[0.25em] text-[10px] text-[var(--color-ink-faint)]">
          Space / Enter to flip · Arrows to navigate
        </span>
        <button
          onClick={() => {
            setFlipped(false);
            setIndex((i) => (i + 1) % filtered.length);
          }}
          className="uppercase tracking-[0.3em] text-[10px] py-2 px-4 border border-[var(--color-rule)] hover:border-[var(--color-ink)] transition-colors"
        >
          Next →
        </button>
      </div>
    </main>
  );
}

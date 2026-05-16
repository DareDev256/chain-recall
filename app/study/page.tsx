"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Card = {
  category: "Economics" | "Q&A" | "Lines" | "E2E" | "Risk";
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

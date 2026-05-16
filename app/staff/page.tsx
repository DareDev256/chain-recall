"use client";

import { useEffect, useRef, useState } from "react";
import type { Brief } from "@/lib/types";

type Context = { guestId: string; propertyId: string };

export default function StaffPage() {
  const [brief, setBrief] = useState<Brief | null>(null);
  const [context, setContext] = useState<Context | null>(null);
  const [computing, setComputing] = useState(false);
  const [connected, setConnected] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [whispering, setWhispering] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const primeAudio = () => {
      if (!audioCtxRef.current) {
        try {
          audioCtxRef.current = new (window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext)();
        } catch {
          // audio unsupported — fail silently
        }
      }
    };
    document.addEventListener("click", primeAudio, { once: true });
    document.addEventListener("keydown", primeAudio, { once: true });
    return () => {
      document.removeEventListener("click", primeAudio);
      document.removeEventListener("keydown", primeAudio);
    };
  }, []);

  const playChime = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.75);
    } catch {
      // chime fail — silent
    }
  };

  const whisper = async () => {
    if (!context || whispering) return;
    setWhispering(true);
    try {
      const res = await fetch("/api/whisper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(context),
      });

      const contentType = res.headers.get("Content-Type") || "";

      if (contentType.startsWith("audio/")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.onended = () => URL.revokeObjectURL(url);
        await audio.play();
      } else {
        const data = await res.json();
        if (data.script && typeof window.speechSynthesis !== "undefined") {
          const utter = new SpeechSynthesisUtterance(data.script);
          utter.rate = 0.95;
          utter.pitch = 0.85;
          utter.volume = 0.7;
          window.speechSynthesis.speak(utter);
        }
      }
    } catch (err) {
      console.warn("[whisper] failed:", err);
    } finally {
      setTimeout(() => setWhispering(false), 1500);
    }
  };

  useEffect(() => {
    const es = new EventSource("/api/stream");
    es.onopen = () => setConnected(true);
    es.onerror = () => setConnected(false);
    es.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "computing") {
        setComputing(true);
        setBrief(null);
        setContext({ guestId: data.guestId, propertyId: data.propertyId });
      } else if (data.type === "brief") {
        setComputing(false);
        setPulse(true);
        setTimeout(() => setPulse(false), 1200);
        setBrief(data.brief);
        setContext({ guestId: data.guestId, propertyId: data.propertyId });
        playChime();
      }
    };
    return () => es.close();
  }, []);

  return (
    <main className="flex-1 flex flex-col px-12 py-10 max-w-5xl mx-auto w-full">
      <header className="flex items-baseline justify-between border-b border-[var(--color-rule)] pb-6">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)]">
            Rosewood Sand Hill · Front of House
          </p>
          <h1 className="font-serif text-3xl mt-1">Menlo Park · Sand Hill Road</h1>
        </div>
        <div className="flex items-center gap-4 font-sans text-xs text-[var(--color-ink-faint)]">
          {brief && (
            <button
              onClick={whisper}
              disabled={whispering}
              className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] hover:text-[var(--color-ink)] transition-colors disabled:opacity-50"
            >
              {whispering ? "Whispering…" : "Whisper"}
            </button>
          )}
          {(brief || computing) && (
            <button
              onClick={() => {
                setBrief(null);
                setComputing(false);
                setContext(null);
              }}
              className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors"
            >
              Reset
            </button>
          )}
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${
                connected ? "bg-emerald-500" : "bg-zinc-400"
              }`}
            />
            {connected ? "Listening" : "Disconnected"}
          </div>
        </div>
      </header>

      {!brief && !computing && (
        <div className="flex-1 flex flex-col items-center justify-center py-32">
          <p className="font-serif text-2xl text-[var(--color-ink-faint)] italic">
            All quiet.
          </p>
          <p className="font-sans text-xs text-[var(--color-ink-faint)] mt-3 uppercase tracking-[0.2em]">
            No members arriving.
          </p>
        </div>
      )}

      {computing && (
        <div className="flex-1 flex flex-col items-center justify-center py-32">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] mb-4">
            Member detected
          </p>
          <p className="font-serif text-2xl text-[var(--color-ink-soft)] italic animate-pulse">
            Reading institutional memory…
          </p>
          <p className="font-sans text-xs text-[var(--color-ink-faint)] mt-3 uppercase tracking-[0.2em]">
            Composing brief from cross-property history
          </p>
        </div>
      )}

      {brief && (
        <article className="mt-10">
          <div className="flex items-baseline gap-4">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)]">
              Member arriving
            </p>
            {pulse && (
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-emerald-700">
                · just now
              </span>
            )}
          </div>
          <h2 className="font-serif text-6xl mt-3 leading-tight">
            {brief.guestName}
          </h2>
          <p className="font-sans text-sm text-[var(--color-ink-soft)] mt-4 leading-relaxed max-w-2xl">
            {brief.visitContext}
          </p>

          {brief.arrivalIntel && (
            <section className="mt-8 border border-[var(--color-rule)] bg-[var(--color-cream-tint)] p-6 max-w-3xl">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] mb-3">
                Arrival intel
              </p>
              <p className="font-serif text-xl leading-snug mb-3">
                {brief.arrivalIntel.expectedAt}
              </p>
              <ul className="space-y-1.5 font-sans text-sm text-[var(--color-ink-soft)] leading-relaxed">
                <li>{brief.arrivalIntel.flightContext}</li>
                <li>{brief.arrivalIntel.baggageNote}</li>
                <li className="italic">{brief.arrivalIntel.energyState}</li>
              </ul>
            </section>
          )}

          {brief.accessibilityNeeds && brief.accessibilityNeeds.length > 0 && (
            <section className="mt-10 border-l-2 border-[var(--color-accent)] py-4 pl-6 max-w-2xl">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] mb-2 font-semibold">
                Non-negotiable
              </p>
              <ul className="space-y-2">
                {brief.accessibilityNeeds.map((need, i) => (
                  <li
                    key={i}
                    className="font-serif text-lg leading-snug text-[var(--color-ink)]"
                  >
                    {need}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-12">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)]">
              Prep
            </p>
            <ul className="mt-4 space-y-3">
              {brief.prepActions.map((action, i) => (
                <li
                  key={i}
                  className="font-serif text-xl leading-snug pl-6 relative"
                >
                  <span className="absolute left-0 top-2 w-3 h-px bg-[var(--color-ink)]" />
                  {action}
                </li>
              ))}
            </ul>
          </section>

          {brief.amenityReplenishment && brief.amenityReplenishment.length > 0 && (
            <section className="mt-12">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)]">
                In the room before arrival
              </p>
              <ul className="mt-4 space-y-4 max-w-3xl">
                {brief.amenityReplenishment.map((a, i) => (
                  <li key={i} className="pl-6 relative">
                    <span className="absolute left-0 top-3 w-3 h-px bg-[var(--color-ink)]" />
                    <p className="font-serif text-lg leading-snug">{a.item}</p>
                    <p className="font-sans text-[11px] text-[var(--color-ink-faint)] mt-1 italic">
                      {a.sourcedFrom}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {brief.suggestedQuestions && brief.suggestedQuestions.length > 0 && (
            <section className="mt-12">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)]">
                Ask the guest
              </p>
              <ul className="mt-4 space-y-5 max-w-3xl">
                {brief.suggestedQuestions.map((q, i) => (
                  <li key={i} className="pl-6 relative">
                    <span className="absolute left-0 top-3 w-3 h-px bg-[var(--color-accent)]" />
                    <p className="font-serif text-lg italic leading-snug">
                      &ldquo;{q.question}&rdquo;
                    </p>
                    <p className="font-sans text-[11px] text-[var(--color-ink-faint)] mt-1">
                      {q.basedOn}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {brief.localSuggestions && brief.localSuggestions.length > 0 && (
            <section className="mt-12">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)]">
                If they have time
              </p>
              <ul className="mt-4 space-y-4 max-w-3xl">
                {brief.localSuggestions.map((s, i) => (
                  <li key={i} className="pl-6 relative">
                    <span className="absolute left-0 top-3 w-3 h-px bg-[var(--color-ink)]" />
                    <div className="flex items-baseline gap-3">
                      <p className="font-serif text-lg leading-snug">{s.title}</p>
                      {s.walkingMinutes !== undefined && s.walkingMinutes !== null && (
                        <span className="font-sans text-[11px] text-[var(--color-ink-faint)] uppercase tracking-[0.2em]">
                          {s.walkingMinutes} min walk
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-sm text-[var(--color-ink-soft)] mt-1 leading-snug">
                      {s.detail}
                    </p>
                    <p className="font-sans text-[11px] text-[var(--color-ink-faint)] mt-1 italic">
                      {s.basedOn}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {brief.discretionFlags && brief.discretionFlags.length > 0 && (
            <section className="mt-12 border border-[var(--color-rule)] bg-[var(--color-cream-tint)] p-6 max-w-3xl">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)] mb-3">
                Do not say
              </p>
              <ul className="space-y-2">
                {brief.discretionFlags.map((flag, i) => (
                  <li
                    key={i}
                    className="font-serif text-base italic leading-snug text-[var(--color-ink-soft)]"
                  >
                    {flag}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {brief.emotionalNotes && (
            <section className="mt-12 border-l-2 border-[var(--color-accent)] pl-6 max-w-2xl">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)] mb-2">
                Context
              </p>
              <p className="font-serif text-lg italic leading-relaxed text-[var(--color-ink-soft)]">
                {brief.emotionalNotes}
              </p>
            </section>
          )}

          <section className="mt-16 pt-6 border-t border-[var(--color-rule)]">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)]">
              Sourced from
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {brief.sourceVisits.map((s, i) => (
                <span
                  key={i}
                  className="font-sans text-xs text-[var(--color-ink-soft)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        </article>
      )}
    </main>
  );
}

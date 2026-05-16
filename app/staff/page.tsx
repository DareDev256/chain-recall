"use client";

import { useEffect, useState } from "react";
import type { Brief } from "@/lib/types";

export default function StaffPage() {
  const [brief, setBrief] = useState<Brief | null>(null);
  const [connected, setConnected] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const es = new EventSource("/api/stream");
    es.onopen = () => setConnected(true);
    es.onerror = () => setConnected(false);
    es.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "brief") {
        setPulse(true);
        setTimeout(() => setPulse(false), 1200);
        setBrief(data.brief);
      }
    };
    return () => es.close();
  }, []);

  return (
    <main className="flex-1 flex flex-col px-12 py-10 max-w-5xl mx-auto w-full">
      <header className="flex items-baseline justify-between border-b border-[var(--color-rule)] pb-6">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)]">
            Halcyon · Front of House
          </p>
          <h1 className="font-serif text-3xl mt-1">Los Angeles · Beverly Grove</h1>
        </div>
        <div className="flex items-center gap-2 font-sans text-xs text-[var(--color-ink-faint)]">
          <span
            className={`inline-block w-1.5 h-1.5 rounded-full ${
              connected ? "bg-emerald-500" : "bg-zinc-400"
            }`}
          />
          {connected ? "Listening" : "Disconnected"}
        </div>
      </header>

      {!brief ? (
        <div className="flex-1 flex flex-col items-center justify-center py-32">
          <p className="font-serif text-2xl text-[var(--color-ink-faint)] italic">
            All quiet.
          </p>
          <p className="font-sans text-xs text-[var(--color-ink-faint)] mt-3 uppercase tracking-[0.2em]">
            No members arriving.
          </p>
        </div>
      ) : (
        <article
          className={`mt-10 transition-opacity duration-700 ${
            pulse ? "opacity-100" : "opacity-100"
          }`}
        >
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

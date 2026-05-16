"use client";

import { useState } from "react";

const GUESTS = [
  { id: "sarah-chen", name: "Sarah Chen", note: "Toronto member, first LA visit" },
  { id: "marcus-okafor", name: "Marcus Okafor", note: "NYC member, first Toronto visit" },
  { id: "priya-sharma", name: "Priya Sharma", note: "SF-based, first LA visit" },
];

const PROPERTIES = [
  { id: "la", name: "Los Angeles · Beverly Grove" },
  { id: "toronto", name: "Toronto · King East" },
  { id: "nyc", name: "New York · SoHo" },
];

export default function ArrivePage() {
  const [sending, setSending] = useState<string | null>(null);
  const [property, setProperty] = useState("la");

  async function trigger(guestId: string) {
    setSending(guestId);
    try {
      await fetch("/api/arrive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestId, propertyId: property }),
      });
    } finally {
      setTimeout(() => setSending(null), 800);
    }
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-8 py-16 max-w-2xl mx-auto w-full">
      <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)] mb-2">
        Member Arrival Trigger
      </p>
      <h1 className="font-serif text-4xl mb-2">Walk in.</h1>
      <p className="font-sans text-sm text-[var(--color-ink-soft)] text-center max-w-md">
        Production: BLE beacon at entry. Demo: tap your name.
      </p>

      <div className="mt-10 w-full">
        <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)] block mb-3">
          Property
        </label>
        <div className="grid grid-cols-3 gap-2">
          {PROPERTIES.map((p) => (
            <button
              key={p.id}
              onClick={() => setProperty(p.id)}
              className={`font-sans text-xs py-3 px-3 border transition-colors ${
                property === p.id
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-cream)]"
                  : "border-[var(--color-rule)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)]"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 w-full space-y-3">
        {GUESTS.map((g) => (
          <button
            key={g.id}
            disabled={sending === g.id}
            onClick={() => trigger(g.id)}
            className={`w-full text-left p-6 border border-[var(--color-rule)] hover:border-[var(--color-ink)] transition-colors disabled:opacity-50 ${
              sending === g.id ? "bg-[var(--color-ink)] text-[var(--color-cream)]" : ""
            }`}
          >
            <div className="font-serif text-2xl">{g.name}</div>
            <div className="font-sans text-xs text-[var(--color-ink-faint)] mt-1">
              {g.note}
            </div>
            {sending === g.id && (
              <div className="font-sans text-[10px] uppercase tracking-[0.3em] mt-2 text-emerald-300">
                Notifying front of house…
              </div>
            )}
          </button>
        ))}
      </div>
    </main>
  );
}

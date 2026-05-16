"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BRAND, PROPERTY_PLATES } from "./brand-tokens";

const PROPERTIES = [
  { name: "Rosewood Hong Kong", plate: PROPERTY_PLATES["hong-kong"] },
  { name: "Rosewood Sand Hill", plate: PROPERTY_PLATES["sand-hill"] },
  { name: "Rosewood London", plate: PROPERTY_PLATES.london },
];

type Stage = "rosewood" | "sandy" | "interior";

export default function Home() {
  const [stage, setStage] = useState<Stage>("rosewood");

  useEffect(() => {
    const toSandy = setTimeout(() => setStage("sandy"), 2200);
    const toInterior = setTimeout(() => setStage("interior"), 8800);
    return () => {
      clearTimeout(toSandy);
      clearTimeout(toInterior);
    };
  }, []);

  return (
    <main className="flex-1 relative">
      {/* Phase 0 — Rosewood mark fades in, holds, fades to Sandy */}
      <section
        aria-hidden={stage !== "rosewood"}
        className={`absolute inset-0 flex flex-col items-center justify-center px-8 text-center transition-all duration-[1100ms] ease-out ${
          stage === "rosewood" ? "opacity-100" : "opacity-0 blur-md scale-105 pointer-events-none"
        }`}
      >
        <img
          src="/brand/rosewood-mark.jpg"
          alt="Rosewood Hotels & Resorts"
          className="w-44 h-44 md:w-56 md:h-56 object-contain"
          style={{ animation: "sandy-emerge 900ms ease-out 100ms both" }}
        />
        <p
          className="font-sans text-[10px] uppercase tracking-[0.4em] text-[var(--color-ink-faint)] mt-10"
          style={{ animation: "sandy-emerge 700ms ease-out 1000ms both" }}
        >
          Rosewood Hotels &amp; Resorts
        </p>
      </section>

      {/* Phase 1 — Sandy introduction */}
      <section
        aria-hidden={stage !== "sandy"}
        className={`absolute inset-0 flex flex-col items-center justify-center px-8 text-center transition-all duration-[1100ms] ease-out ${
          stage === "sandy" ? "opacity-100" : "opacity-0 blur-md scale-105 pointer-events-none"
        }`}
      >
        <p
          className="font-serif text-2xl md:text-3xl italic text-[var(--color-ink-soft)] tracking-wide"
          style={{ animation: stage === "sandy" ? "sandy-emerge 700ms ease-out 250ms both" : "none" }}
        >
          I am
        </p>
        <h1
          className="font-serif text-7xl md:text-9xl font-normal leading-none tracking-tight mt-2"
          style={{ animation: stage === "sandy" ? "sandy-emerge 900ms ease-out 800ms both" : "none" }}
        >
          Sandy.
        </h1>
        <div
          className="mt-10 h-px w-20 bg-[var(--color-accent)] origin-left"
          style={{ animation: stage === "sandy" ? "sandy-rule 700ms ease-out 1700ms both" : "none" }}
        />
        <p
          className="font-serif text-2xl md:text-3xl text-[var(--color-ink-soft)] leading-snug mt-10 max-w-2xl"
          style={{ animation: stage === "sandy" ? "sandy-emerge 900ms ease-out 2200ms both" : "none" }}
        >
          The institutional memory of Rosewood.
        </p>
        <button
          onClick={() => setStage("interior")}
          className="mt-16 font-sans text-xs uppercase tracking-[0.3em] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] border-b border-[var(--color-rule)] hover:border-[var(--color-accent)] pb-1 transition-colors"
          style={{ animation: stage === "sandy" ? "sandy-emerge 700ms ease-out 3200ms both" : "none" }}
        >
          Step inside ↗
        </button>
        <p
          className="absolute bottom-12 font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)]"
          style={{ animation: stage === "sandy" ? "sandy-emerge 700ms ease-out 4000ms both" : "none" }}
        >
          Rosewood Sand Hill · on shift
        </p>
      </section>

      {/* Phase 2 — Interior / triptych */}
      <section
        aria-hidden={stage !== "interior"}
        className={`absolute inset-0 flex flex-col items-center justify-center px-8 py-12 text-center transition-all duration-[1100ms] ease-out overflow-y-auto ${
          stage === "interior" ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-95 pointer-events-none"
        }`}
      >
        {/* Ambient Rosewood reel — muted + looped, mounts only on interior stage */}
        {stage === "interior" && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
            src="/mashup/rosewood-trio-30s.mp4"
          />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-cream)] via-[var(--color-cream)]/55 to-[var(--color-cream)]"
        />

        <img
          src={BRAND.logo}
          alt={BRAND.productName}
          className="h-14 w-auto"
        />
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)] mt-3">
          · {BRAND.deploymentChain} ·
        </p>

        <h2 className="font-serif text-7xl md:text-8xl font-normal leading-[0.95] tracking-tight max-w-4xl mt-10">
          Recognition,<br />without asking.
        </h2>

        <p className="font-sans text-base text-[var(--color-ink-soft)] max-w-xl mt-6 leading-relaxed">
          {BRAND.subtitle}
        </p>

        <div className="mt-16 w-full max-w-6xl grid grid-cols-3 gap-6 md:gap-10">
          {PROPERTIES.map((p) => (
            <figure key={p.name} className="flex flex-col group">
              <div
                className="aspect-[16/9] border border-[var(--color-rule)] bg-[var(--color-cream)] bg-cover bg-center transition-all duration-500 group-hover:border-[var(--color-accent)] group-hover:shadow-[0_8px_30px_-12px_rgba(26,26,26,0.18)]"
                style={{ backgroundImage: `url(${p.plate})` }}
                aria-label={p.name}
              />
              <figcaption className="mt-5 font-serif text-xl text-[var(--color-ink)] leading-none">
                {p.name}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-4 font-sans text-sm">
          <Link
            href="/console"
            className="px-8 py-3 border border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-cream)] hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
          >
            Manager Console
            <span className="block text-[10px] font-sans uppercase tracking-[0.25em] text-[var(--color-cream)]/70 mt-0.5">
              Both views, side by side
            </span>
          </Link>
          <Link
            href="/staff"
            className="px-8 py-3 border border-[var(--color-rule)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] transition-colors"
          >
            Staff Tablet
            <span className="block text-[10px] font-sans uppercase tracking-[0.25em] text-[var(--color-ink-faint)] mt-0.5">
              Front-of-house view
            </span>
          </Link>
          <Link
            href="/arrive"
            className="px-8 py-3 border border-[var(--color-rule)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] transition-colors"
          >
            Member Arrival
            <span className="block text-[10px] font-sans uppercase tracking-[0.25em] text-[var(--color-ink-faint)] mt-0.5">
              QR target — guest side
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}

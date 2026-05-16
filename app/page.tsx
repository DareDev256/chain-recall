"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BRAND, PROPERTY_PLATES } from "./brand-tokens";

const PROPERTIES = [
  { name: "Rosewood Hong Kong", plate: PROPERTY_PLATES["hong-kong"] },
  { name: "Rosewood Sand Hill", plate: PROPERTY_PLATES["sand-hill"] },
  { name: "Rosewood London", plate: PROPERTY_PLATES.london },
];

export default function Home() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 6500);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="flex-1 relative">
      <section
        aria-hidden={entered}
        className={`absolute inset-0 flex flex-col items-center justify-center px-8 text-center transition-all duration-1200 ease-out ${
          entered ? "opacity-0 blur-md scale-105 pointer-events-none" : "opacity-100"
        }`}
      >
        <p
          className="font-serif text-2xl md:text-3xl italic text-[var(--color-ink-soft)] tracking-wide"
          style={{ animation: "sandy-emerge 700ms ease-out 250ms both" }}
        >
          I am
        </p>
        <h1
          className="font-serif text-7xl md:text-9xl font-normal leading-none tracking-tight mt-2"
          style={{ animation: "sandy-emerge 900ms ease-out 800ms both" }}
        >
          Sandy.
        </h1>
        <div
          className="mt-10 h-px w-20 bg-[var(--color-accent)] origin-left"
          style={{ animation: "sandy-rule 700ms ease-out 1700ms both" }}
        />
        <p
          className="font-serif text-2xl md:text-3xl text-[var(--color-ink-soft)] leading-snug mt-10 max-w-2xl"
          style={{ animation: "sandy-emerge 900ms ease-out 2200ms both" }}
        >
          The institutional memory of Rosewood.
        </p>
        <button
          onClick={() => setEntered(true)}
          className="mt-16 font-sans text-xs uppercase tracking-[0.3em] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] border-b border-[var(--color-rule)] hover:border-[var(--color-accent)] pb-1 transition-colors"
          style={{ animation: "sandy-emerge 700ms ease-out 3200ms both" }}
        >
          Step inside ↗
        </button>
        <p
          className="absolute bottom-12 font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)]"
          style={{ animation: "sandy-emerge 700ms ease-out 4000ms both" }}
        >
          Rosewood Sand Hill · on shift
        </p>
      </section>

      <section
        aria-hidden={!entered}
        className={`absolute inset-0 flex flex-col items-center justify-center px-8 py-12 text-center transition-all duration-1200 ease-out overflow-y-auto ${
          entered ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-95 pointer-events-none"
        }`}
      >
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
            href="/staff"
            className="px-8 py-3 border border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)] transition-colors"
          >
            Staff Tablet · Sand Hill
          </Link>
          <Link
            href="/arrive"
            className="px-8 py-3 border border-[var(--color-rule)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] transition-colors"
          >
            Member Arrival
          </Link>
        </div>
      </section>
    </main>
  );
}

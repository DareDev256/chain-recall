"use client";

import { useEffect, useRef, useState } from "react";
import type { Brief, PropertyId } from "@/lib/types";
import { LiveEta } from "./LiveEta";
import { ArrivalMap } from "./ArrivalMap";
import { SpeakerOnIcon, SpeakerOffIcon } from "../icons";
import { getGreeting } from "@/lib/greetings";

const BRIEF_STORAGE_KEY = "sandy:lastBrief";

type Context = { guestId: string; propertyId: string };

type CapturedNote = {
  id: string;
  transcript: string;
  capturedAt: string;
};

interface SpeechRecognitionLike extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((this: SpeechRecognitionLike, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognitionLike, ev: Event) => void) | null;
  onend: ((this: SpeechRecognitionLike, ev: Event) => void) | null;
}

type SpeechRecognitionEvent = Event & {
  resultIndex: number;
  results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean; length: number }>;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

const PROPERTY_LABEL: Record<PropertyId, { eyebrow: string; heading: string; short: string }> = {
  "sand-hill": {
    eyebrow: "Rosewood Sand Hill · Front of House",
    heading: "Menlo Park · Sand Hill Road",
    short: "Sand Hill",
  },
  "hong-kong": {
    eyebrow: "Rosewood Hong Kong · Front of House",
    heading: "Tsim Sha Tsui · Victoria Harbour",
    short: "Hong Kong",
  },
  london: {
    eyebrow: "Rosewood London · Front of House",
    heading: "High Holborn · Theatre District",
    short: "London",
  },
};

const PROPERTY_ORDER: PropertyId[] = ["sand-hill", "hong-kong", "london"];

export default function StaffPage() {
  const [currentProperty, setCurrentProperty] = useState<PropertyId>("sand-hill");

  // read property from URL on mount (sidesteps Next 16 useSearchParams Suspense
  // requirement; same UX, no static-prerender error)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("property") as PropertyId | null;
    if (p && PROPERTY_LABEL[p]) setCurrentProperty(p);
  }, []);

  const switchProperty = (id: PropertyId) => {
    setCurrentProperty(id);
    const url = new URL(window.location.href);
    url.searchParams.set("property", id);
    window.history.replaceState({}, "", url.toString());
  };

  const [brief, setBrief] = useState<Brief | null>(null);
  const [context, setContext] = useState<Context | null>(null);
  const [computing, setComputing] = useState(false);
  const [connected, setConnected] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [whispering, setWhispering] = useState(false);
  const [greeting, setGreeting] = useState(false);
  const [listening, setListening] = useState(false);
  const [recentNote, setRecentNote] = useState<CapturedNote | null>(null);
  const [allNotes, setAllNotes] = useState<CapturedNote[]>([]);
  const [muted, setMuted] = useState(false);
  const [subtitle, setSubtitle] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const interimRef = useRef<string>("");

  // clear state when the property changes — we are now a different tablet
  useEffect(() => {
    setBrief(null);
    setComputing(false);
    setContext(null);
  }, [currentProperty]);

  // restore last brief on mount so back/forward navigation doesn't blank the tablet
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(BRIEF_STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as {
        brief: Brief;
        context: Context;
        property: PropertyId;
      };
      if (parsed.property !== currentProperty) return;
      setBrief(parsed.brief);
      setContext(parsed.context);
    } catch {
      // ignore — corrupt storage just means no restore
    }
  }, [currentProperty]);

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
      let scriptText: string | null = null;

      if (contentType.startsWith("audio/")) {
        // try to read the base64-encoded script header set by /api/whisper
        const hdr = res.headers.get("X-Whisper-Script");
        if (hdr) {
          try {
            scriptText = atob(hdr);
          } catch {
            // ignore decode error
          }
        }
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        if (scriptText) setSubtitle(scriptText);
        if (!muted) {
          const audio = new Audio(url);
          audio.onended = () => URL.revokeObjectURL(url);
          await audio.play();
        } else {
          URL.revokeObjectURL(url);
        }
      } else {
        const data = await res.json();
        scriptText = data.script || null;
        if (scriptText) setSubtitle(scriptText);
        if (!muted && scriptText && typeof window.speechSynthesis !== "undefined") {
          const utter = new SpeechSynthesisUtterance(scriptText);
          utter.rate = 0.95;
          utter.pitch = 0.85;
          utter.volume = 0.7;
          window.speechSynthesis.speak(utter);
        }
      }

      // auto-dismiss subtitle after a beat
      if (scriptText) {
        setTimeout(() => setSubtitle((curr) => (curr === scriptText ? null : curr)), 18000);
      }
    } catch (err) {
      console.warn("[whisper] failed:", err);
    } finally {
      setTimeout(() => setWhispering(false), 1500);
    }
  };

  const greetGuest = async () => {
    if (!context || greeting) return;
    const line = getGreeting(context.guestId);
    if (!line) return;
    setGreeting(true);
    setSubtitle(
      `${line.text}\n\n${line.englishTranslation}`,
    );
    try {
      const res = await fetch("/api/synth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: line.text, voiceStyle: "warm" }),
      });
      const contentType = res.headers.get("Content-Type") || "";
      if (contentType.startsWith("audio/")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        if (!muted) {
          const audio = new Audio(url);
          audio.onended = () => URL.revokeObjectURL(url);
          await audio.play().catch(() => URL.revokeObjectURL(url));
        } else {
          URL.revokeObjectURL(url);
        }
      } else {
        const data = await res.json();
        if (!muted && data.script && typeof window.speechSynthesis !== "undefined") {
          const utter = new SpeechSynthesisUtterance(data.script);
          utter.lang = line.locale;
          utter.rate = 0.92;
          utter.volume = 0.85;
          window.speechSynthesis.speak(utter);
        }
      }
      // auto-dismiss after 20s
      const stash = line.text;
      setTimeout(() => setSubtitle((curr) => (curr?.startsWith(stash) ? null : curr)), 20000);
    } catch (err) {
      console.warn("[greet] failed:", err);
    } finally {
      setTimeout(() => setGreeting(false), 1500);
    }
  };

  const sendNote = async (transcript: string) => {
    if (!transcript.trim()) return;
    try {
      await fetch("/api/memory-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript,
          guestId: context?.guestId,
          propertyId: context?.propertyId,
        }),
      });

      // Sandy speaks back — short acknowledgment over the same earpiece layer
      const shortTranscript =
        transcript.length > 80 ? transcript.slice(0, 77).trimEnd() + "…" : transcript;
      const guestPart = brief?.guestName
        ? ` to ${brief.guestName.split(" ").slice(-1)[0]}'s passbook`
        : " to the passbook";
      const ack = `Noted. "${shortTranscript}." Added${guestPart}.`;

      try {
        const ackRes = await fetch("/api/synth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: ack, voiceStyle: "ack" }),
        });
        const ackType = ackRes.headers.get("Content-Type") || "";
        if (ackType.startsWith("audio/")) {
          const blob = await ackRes.blob();
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          audio.onended = () => URL.revokeObjectURL(url);
          await audio.play();
        } else if (typeof window.speechSynthesis !== "undefined") {
          const utter = new SpeechSynthesisUtterance(ack);
          utter.rate = 0.95;
          utter.pitch = 0.9;
          utter.volume = 0.75;
          window.speechSynthesis.speak(utter);
        }
      } catch (ackErr) {
        console.warn("[voice-note ack] failed:", ackErr);
      }
    } catch (err) {
      console.warn("[memory-note] failed:", err);
    }
  };

  const toggleVoiceNote = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const Ctor =
      (window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionConstructor })
        .webkitSpeechRecognition;

    if (!Ctor) {
      console.warn("[voice-note] SpeechRecognition unsupported in this browser");
      return;
    }

    const recognition = new Ctor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    interimRef.current = "";

    recognition.onresult = (event) => {
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const r = event.results[i];
        if (r.isFinal) final += r[0].transcript;
      }
      if (final) interimRef.current += final;
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
      const transcript = interimRef.current.trim();
      if (transcript) {
        sendNote(transcript);
      }
      interimRef.current = "";
    };

    recognitionRef.current = recognition;
    setListening(true);
    try {
      recognition.start();
    } catch (err) {
      console.warn("[voice-note] start failed:", err);
      setListening(false);
    }
  };

  useEffect(() => {
    const es = new EventSource("/api/stream");
    es.onopen = () => setConnected(true);
    es.onerror = () => setConnected(false);
    es.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "computing") {
        if (data.propertyId !== currentProperty) return;
        setComputing(true);
        setBrief(null);
        setContext({ guestId: data.guestId, propertyId: data.propertyId });
      } else if (data.type === "brief") {
        if (data.propertyId !== currentProperty) return;
        setComputing(false);
        setPulse(true);
        setTimeout(() => setPulse(false), 1200);
        setBrief(data.brief);
        setContext({ guestId: data.guestId, propertyId: data.propertyId });
        try {
          sessionStorage.setItem(
            BRIEF_STORAGE_KEY,
            JSON.stringify({
              brief: data.brief,
              context: { guestId: data.guestId, propertyId: data.propertyId },
              property: currentProperty,
            }),
          );
        } catch {
          // storage unavailable — fine, just no persistence
        }
        playChime();
      } else if (data.type === "note") {
        const note: CapturedNote = {
          id: data.note.id,
          transcript: data.note.transcript,
          capturedAt: data.note.capturedAt,
        };
        setRecentNote(note);
        setAllNotes((curr) => [note, ...curr].slice(0, 20));
        setTimeout(() => {
          setRecentNote((c) => (c?.id === note.id ? null : c));
        }, 6500);
      }
    };
    return () => es.close();
  }, [currentProperty]);

  const labels = PROPERTY_LABEL[currentProperty];

  return (
    <main className="flex-1 flex flex-col px-12 py-10 max-w-5xl mx-auto w-full relative">
      {subtitle && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-3xl bg-[var(--color-ink)] text-[var(--color-cream)] px-7 py-4 rounded-sm border border-[var(--color-accent)] shadow-2xl"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--color-accent)] mt-1 whitespace-nowrap">
              {muted ? "Sandy · subtitled" : "Sandy · speaking"}
            </span>
            <div className="flex-1">
              {subtitle.split("\n\n").map((line, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "font-serif text-base italic leading-snug"
                      : "font-sans text-[11px] leading-snug text-[var(--color-cream)]/65 mt-2 italic"
                  }
                >
                  {i === 0 ? <>&ldquo;{line}&rdquo;</> : <>&mdash; {line}</>}
                </p>
              ))}
            </div>
            <button
              onClick={() => setSubtitle(null)}
              className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-cream)]/60 hover:text-[var(--color-cream)] transition-colors ml-2"
              aria-label="Dismiss subtitle"
            >
              ×
            </button>
          </div>
        </div>
      )}
      <header className="flex items-baseline justify-between border-b border-[var(--color-rule)] pb-6">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)]">
            {labels.eyebrow}
          </p>
          <h1 className="font-serif text-3xl mt-1">{labels.heading}</h1>
          <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--color-ink-faint)] mt-1 italic">
            Demo · 3 of 38 Rosewood properties · 23 countries · 21+ in pipeline
          </p>
          <div className="mt-3 flex gap-5">
            {PROPERTY_ORDER.map((id) => (
              <button
                key={id}
                onClick={() => switchProperty(id)}
                className={`font-sans text-[10px] uppercase tracking-[0.3em] transition-colors ${
                  currentProperty === id
                    ? "text-[var(--color-ink)] underline underline-offset-[6px] decoration-[var(--color-accent)]"
                    : "text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]"
                }`}
              >
                {PROPERTY_LABEL[id].short}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 font-sans text-xs text-[var(--color-ink-faint)]">
          <button
            onClick={toggleVoiceNote}
            className={`font-sans text-[10px] uppercase tracking-[0.3em] transition-colors ${
              listening
                ? "text-emerald-700 animate-pulse"
                : "text-[var(--color-accent)] hover:text-[var(--color-ink)]"
            }`}
          >
            {listening ? "Listening…" : "Voice Note"}
          </button>
          {brief && context && getGreeting(context.guestId) && (
            <button
              onClick={greetGuest}
              disabled={greeting}
              className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] hover:text-[var(--color-ink)] transition-colors disabled:opacity-50"
              title={`Speak welcome in ${getGreeting(context.guestId)?.language ?? "guest's language"}`}
            >
              {greeting ? "Greeting…" : `Greet in ${getGreeting(context.guestId)?.language}`}
            </button>
          )}
          {brief && (
            <button
              onClick={whisper}
              disabled={whispering}
              className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] hover:text-[var(--color-ink)] transition-colors disabled:opacity-50"
            >
              {whispering ? "Whispering…" : muted ? "Whisper · subtitled" : "Whisper"}
            </button>
          )}
          <button
            onClick={() => setMuted((m) => !m)}
            className={`font-sans text-[10px] uppercase tracking-[0.3em] transition-colors flex items-center gap-1.5 ${
              muted
                ? "text-[var(--color-accent)] hover:text-[var(--color-ink)]"
                : "text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]"
            }`}
            title={muted ? "Audio muted — subtitles only" : "Audio on — click to mute and use subtitles"}
          >
            {muted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
            <span>{muted ? "Muted" : "Sound"}</span>
          </button>
          {(brief || computing) && (
            <button
              onClick={() => {
                setBrief(null);
                setComputing(false);
                setContext(null);
                try {
                  sessionStorage.removeItem(BRIEF_STORAGE_KEY);
                } catch {
                  // ignore
                }
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

      {recentNote && (
        <div className="mt-4 border border-[var(--color-rule)] bg-[var(--color-cream-tint)] px-5 py-3 max-w-3xl">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] mb-1">
            Added to passbook
          </p>
          <p className="font-serif text-base italic leading-snug">
            &ldquo;{recentNote.transcript}&rdquo;
          </p>
        </div>
      )}

      {!brief && !computing && (
        <div className="flex-1 flex flex-col items-center justify-center py-32">
          <p className="font-serif text-2xl text-[var(--color-ink-faint)] italic">
            All quiet.
          </p>
          <p className="font-sans text-xs text-[var(--color-ink-faint)] mt-3 uppercase tracking-[0.2em]">
            No members arriving at {labels.short}.
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
            Composing passbook from cross-property history
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

          {brief.memberSnapshot && (
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-sans text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink-faint)]">
              <span>Member since {brief.memberSnapshot.memberSince}</span>
              <span>· {brief.memberSnapshot.totalStays} stays</span>
              <span>· {brief.memberSnapshot.propertiesVisited} properties</span>
              {brief.memberSnapshot.loyaltyTier && (
                <span>· {brief.memberSnapshot.loyaltyTier}</span>
              )}
            </div>
          )}

          {brief.privacyState === "opted-out" && (
            <section className="mt-8 border-l-2 border-[var(--color-accent)] py-4 pl-6 max-w-3xl bg-[var(--color-cream-tint)]">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] mb-2 font-semibold">
                Privacy · cross-property recognition opted out
              </p>
              <p className="font-serif text-base leading-snug text-[var(--color-ink)] mb-2">
                Sandy did not retrieve this member&rsquo;s history. Treat this as a first conversation — the relationship earns the data, on her timeline.
              </p>
              {brief.privacyNote && (
                <p className="font-sans text-[11px] text-[var(--color-ink-faint)] italic leading-snug">
                  {brief.privacyNote}
                </p>
              )}
            </section>
          )}

          {brief.arrivalIntel && (
            <section className="mt-8 border border-[var(--color-rule)] bg-[var(--color-cream-tint)] p-6 max-w-3xl">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] mb-3">
                Arrival intel
              </p>
              <ArrivalMap resetKey={context?.guestId} />
              <LiveEta resetKey={context?.guestId} />
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-faint)] mb-3">
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

          {brief.recurringPatterns && brief.recurringPatterns.length > 0 && (
            <section className="mt-12">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)]">
                Patterns observed across stays
              </p>
              <ul className="mt-4 space-y-3 max-w-3xl">
                {brief.recurringPatterns.map((p, i) => (
                  <li key={i} className="pl-6 relative flex flex-wrap items-baseline gap-x-3">
                    <span className="absolute left-0 top-2 w-3 h-px bg-[var(--color-ink)]" />
                    <p className="font-serif text-base leading-snug">{p.pattern}</p>
                    <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent)]">
                      {p.frequency}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {brief.serviceRecovery && brief.serviceRecovery.length > 0 && (
            <section className="mt-12">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)]">
                Past resolutions
              </p>
              <ul className="mt-4 space-y-5 max-w-3xl">
                {brief.serviceRecovery.map((r, i) => (
                  <li key={i} className="pl-6 relative border-l border-[var(--color-rule)]">
                    <div className="flex items-baseline gap-3 mb-1">
                      <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink-faint)]">
                        {r.date} · {r.property}
                      </p>
                      {r.preventedRecurrence && (
                        <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-emerald-700">
                          · prevented
                        </span>
                      )}
                    </div>
                    <p className="font-serif text-base leading-snug text-[var(--color-ink)] mb-1">
                      {r.issue}
                    </p>
                    <p className="font-sans text-sm text-[var(--color-ink-soft)] leading-snug italic">
                      Resolution: {r.resolution}
                    </p>
                    {r.loggedBy && (
                      <p className="font-sans text-[10px] text-[var(--color-ink-faint)] mt-1 italic">
                        {r.loggedBy}
                      </p>
                    )}
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

          {allNotes.length > 0 && (
            <section className="mt-12">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-faint)]">
                Staff notes this session · {allNotes.length}
              </p>
              <ul className="mt-4 space-y-3 max-w-3xl">
                {allNotes.slice(0, 5).map((n) => (
                  <li key={n.id} className="pl-6 relative">
                    <span className="absolute left-0 top-3 w-3 h-px bg-[var(--color-accent)]" />
                    <p className="font-serif text-base italic leading-snug">
                      &ldquo;{n.transcript}&rdquo;
                    </p>
                    <p className="font-sans text-[10px] text-[var(--color-ink-faint)] mt-1 italic">
                      Captured {new Date(n.capturedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} · queued for next compose() pass · production: writes to OPERA profile via Hapi
                    </p>
                  </li>
                ))}
                {allNotes.length > 5 && (
                  <li className="pl-6 font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-ink-faint)] italic">
                    + {allNotes.length - 5} more this session
                  </li>
                )}
              </ul>
            </section>
          )}

          <section className="mt-8 flex flex-wrap gap-x-6 gap-y-1 font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-ink-faint)] italic">
            <span>Brief composed · Claude Opus 4.7 · ~$0.13</span>
            <span>· Whisper · ElevenLabs Turbo · ~$0.105 / play</span>
            <span>· Voice Note ack · ~$0.045</span>
            <span>· See COSTS.md for full economics</span>
          </section>
        </article>
      )}
    </main>
  );
}

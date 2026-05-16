import { NextRequest } from "next/server";

export const runtime = "nodejs";

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"; // George — same default as /api/whisper
const DEFAULT_MODEL_ID = "eleven_turbo_v2_5";

/**
 * Voice-style presets — each maps to ElevenLabs voice_settings tuned for
 * a specific emotional register. Lower stability = more emotional variation
 * (sass, warmth). Higher style = more stylistic delivery. Higher
 * similarity_boost = closer to the cloned voice's character.
 */
const VOICE_PRESETS: Record<string, {
  stability: number;
  similarity_boost: number;
  style: number;
  use_speaker_boost: boolean;
}> = {
  // Sandy introducing herself — confident, warm, slightly playful. The
  // "hi, I'm Sandy" with personality, not a corporate read.
  expressive: {
    stability: 0.32,
    similarity_boost: 0.78,
    style: 0.65,
    use_speaker_boost: true,
  },
  // Warm welcome to a guest in their own language — pleased, gracious,
  // slightly slower delivery. For the multilingual greeting flow.
  warm: {
    stability: 0.4,
    similarity_boost: 0.8,
    style: 0.55,
    use_speaker_boost: true,
  },
  // Concierge brief whispered into the bell captain's ear — brisk,
  // efficient, no theatrics. For the Whisper button.
  concierge: {
    stability: 0.55,
    similarity_boost: 0.75,
    style: 0.15,
    use_speaker_boost: true,
  },
  // Acknowledgment after a Voice Note — efficient + friendly.
  ack: {
    stability: 0.5,
    similarity_boost: 0.75,
    style: 0.25,
    use_speaker_boost: true,
  },
  // Default fallback — neutral professional.
  neutral: {
    stability: 0.55,
    similarity_boost: 0.75,
    style: 0.15,
    use_speaker_boost: true,
  },
};

/**
 * Generic text-to-speech endpoint. Unlike /api/whisper (which composes the
 * script from a Brief), this takes arbitrary text and returns audio. Used
 * by the Voice Note acknowledgment flow, the Sandy intro narration, and
 * the multilingual guest greeting flow.
 *
 * Accepts an optional `voiceStyle` field on the request body — see
 * VOICE_PRESETS above for the available registers. Defaults to neutral.
 */
export async function POST(req: NextRequest) {
  const { text, voiceStyle, voice } = await req.json();
  if (!text || typeof text !== "string") {
    return Response.json({ error: "text required" }, { status: 400 });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return Response.json({
      mode: "speech-synthesis",
      script: text,
      reason: "ELEVENLABS_API_KEY not set — fall back to browser TTS",
    });
  }

  const preset =
    (typeof voiceStyle === "string" && VOICE_PRESETS[voiceStyle]) ||
    VOICE_PRESETS.neutral;

  // Voice selection — supports "male" alternate when ELEVENLABS_VOICE_ID_MALE set
  const primaryVoiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;
  const maleVoiceId = process.env.ELEVENLABS_VOICE_ID_MALE || primaryVoiceId;
  const voiceId = voice === "male" ? maleVoiceId : primaryVoiceId;

  // Model selection — multilingual_v2 handles non-Latin scripts (Hebrew,
  // Mandarin, Hindi, etc.) much better than Turbo. Auto-pick multilingual
  // when the request is for the "warm" greeting register where multilingual
  // delivery matters most.
  const defaultModel = process.env.ELEVENLABS_MODEL_ID || DEFAULT_MODEL_ID;
  const modelId = voiceStyle === "warm" ? "eleven_multilingual_v2" : defaultModel;

  const upstream = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: preset,
      }),
    },
  );

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => "");
    console.warn("[synth] ElevenLabs upstream error:", upstream.status, detail);
    return Response.json({
      mode: "speech-synthesis",
      script: text,
      reason: `ElevenLabs upstream ${upstream.status} — falling back`,
    });
  }

  const audio = await upstream.arrayBuffer();
  return new Response(audio, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}

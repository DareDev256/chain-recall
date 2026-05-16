import { NextRequest } from "next/server";

export const runtime = "nodejs";

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"; // George — same default as /api/whisper
const DEFAULT_MODEL_ID = "eleven_turbo_v2_5";

/**
 * Generic text-to-speech endpoint. Unlike /api/whisper (which composes the
 * script from a Brief), this takes arbitrary text and returns audio. Used
 * by the Voice Note acknowledgment flow — Sandy speaks back after a note
 * is captured.
 */
export async function POST(req: NextRequest) {
  const { text } = await req.json();
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

  const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;
  const modelId = process.env.ELEVENLABS_MODEL_ID || DEFAULT_MODEL_ID;

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
        voice_settings: {
          stability: 0.55,
          similarity_boost: 0.75,
          style: 0.15,
          use_speaker_boost: true,
        },
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

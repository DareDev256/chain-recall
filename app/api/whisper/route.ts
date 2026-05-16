import { NextRequest } from "next/server";
import { getCachedBrief } from "@/lib/cache";
import { compose } from "@/lib/compose";
import { composeWhisperScript } from "@/lib/whisper";

export const runtime = "nodejs";

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"; // George — British butler timbre
const DEFAULT_MODEL_ID = "eleven_turbo_v2_5";

export async function POST(req: NextRequest) {
  const { guestId, propertyId, voice } = await req.json();
  if (!guestId || !propertyId) {
    return Response.json(
      { error: "guestId and propertyId required" },
      { status: 400 },
    );
  }

  const brief =
    getCachedBrief(guestId, propertyId) ?? (await compose(guestId, propertyId));
  const script = composeWhisperScript(brief);

  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    return Response.json({
      mode: "speech-synthesis",
      script,
      reason: "ELEVENLABS_API_KEY not set — falling back to browser TTS",
    });
  }

  const primaryVoiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;
  const hillVoiceId = process.env.ELEVENLABS_VOICE_ID_MALE || primaryVoiceId;
  const voiceId = voice === "hill" || voice === "male" ? hillVoiceId : primaryVoiceId;
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
        text: script,
        model_id: modelId,
        voice_settings: {
          stability: 0.55,
          similarity_boost: 0.75,
          style: 0.2,
          use_speaker_boost: true,
        },
      }),
    },
  );

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => "");
    console.warn("[whisper] ElevenLabs upstream error:", upstream.status, detail);
    return Response.json({
      mode: "speech-synthesis",
      script,
      reason: `ElevenLabs upstream ${upstream.status} — falling back`,
    });
  }

  const audio = await upstream.arrayBuffer();

  return new Response(audio, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
      "X-Whisper-Script": Buffer.from(script).toString("base64"),
    },
  });
}

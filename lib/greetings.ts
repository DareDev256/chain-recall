/**
 * Per-guest multilingual greetings. The receptionist clicks "Greet" and
 * Sandy speaks a welcome line in the guest's own language — Cantonese/
 * Mandarin for Mei Lin, Spanish for Elena, Hebrew for Edson, etc.
 *
 * The guest hears their language. The staff sees both the original line
 * AND the English translation as a subtitle so they can respond if the
 * guest opens conversation in that language.
 *
 * ElevenLabs Turbo v2.5 supports 30+ languages out of the box; we just
 * pass the text and let the voice model handle pronunciation.
 */

export type GuestGreeting = {
  language: string; // human-readable name shown in UI
  locale: string; // BCP 47 (for browser TTS fallback)
  text: string; // what Sandy says
  englishTranslation: string; // what staff sees as the subtitle's secondary line
};

export const GUEST_GREETINGS: Record<string, GuestGreeting> = {
  "mei-lin-chen": {
    language: "Mandarin",
    locale: "zh-CN",
    text: "陈女士，欢迎光临玫瑰木山丘酒店。您的房间已为您准备好，洋甘菊茶和水壶就在床边。",
    englishTranslation:
      "Ms. Chen, welcome to Rosewood Sand Hill. Your room is prepared — chamomile tea and kettle are at the bedside.",
  },
  "marcus-okafor": {
    language: "English (London register)",
    locale: "en-GB",
    text: "Mr. Okafor, welcome to Rosewood Sand Hill. Your villa is ground-floor, your Negroni is stirred at the bar, and we will not announce you at the entry.",
    englishTranslation:
      "Standard English — Marcus is London-based, native speaker. Same content as the brief.",
  },
  "priya-sharma": {
    language: "Hindi",
    locale: "hi-IN",
    text: "शर्मा जी, रोज़वुड सैंड हिल में आपका स्वागत है। आपकी मेज़ तैयार है, अदरक वाला पानी रखा गया है।",
    englishTranslation:
      "Ms. Sharma, welcome to Rosewood Sand Hill. Your table is ready, ginger water has been placed.",
  },
  "daniel-edson": {
    language: "Hebrew",
    locale: "he-IL",
    text: "ברוך הבא לרוזווד סנד היל, מר אדסון. הוילה שלך מוכנה, וקפה הפרנץ' פרס יחכה לך בשש וחצי בבוקר.",
    englishTranslation:
      "Welcome to Rosewood Sand Hill, Mr. Edson. Your villa is ready, and your French press coffee will be waiting at 6:30am.",
  },
  "elena-vasquez": {
    language: "Spanish",
    locale: "es-MX",
    text: "Bienvenida a Rosewood Sand Hill, Sra. Vasquez. Su llegada nos honra. Por favor avísenos si necesita cualquier cosa durante su estancia.",
    englishTranslation:
      "Welcome to Rosewood Sand Hill, Ms. Vasquez. Your arrival honors us. Please let us know if you need anything during your stay.",
  },
};

export function getGreeting(guestId: string): GuestGreeting | undefined {
  return GUEST_GREETINGS[guestId];
}

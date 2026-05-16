# Video Recording Tips — make it stand out

You and Josh have ~30 min for the recording itself. Here's how to land it.

---

## Pre-record (10 min before camera)

1. **Browser:** Safari OR Chrome Guest Profile. NO extensions. Verify by checking devtools console — should be silent.
2. **Audio prime:** Open `/staff`. Click anywhere on the page once. This unlocks the audio context.
3. **One full dry run end-to-end:** Trigger Mei Lin → trigger Edson → trigger Elena → click Whisper on at least one → click Voice Note on at least one. Watch the SSE connection stay green. If anything errors, fix or cut from script.
4. **Two browser windows open:**
   - LEFT: `/console` (full screen for the side-by-side hero shot)
   - RIGHT: `/staff` alone (for the close-up moments — the live ETA, the Elena privacy banner)
5. **Volume:** Sandy's voice needs to be audible to the camera mic. Test by playing one Whisper at the start.
6. **Phone tethered** as wifi backup.
7. **Lighting:** Cream background reads better on warm light. Avoid hard overheads. Side-light if possible.

---

## Camera composition

**Best frame for screen-capture demos:**
- 16:9 OBS or QuickTime screen recording at 1080p or higher
- Cursor visible — judges need to see where you're clicking
- Audio captured both from system (chime, Sandy voice) AND camera mic (Josh's narration)

**If both Josh and the screen are in frame:**
- Josh on the LEFT third of the frame
- Screen filling the right two-thirds
- Josh's face stays visible during the magic moments — judges want to see your reactions

**Phone-as-camera fallback:**
- Stable surface (no shake)
- Distance: arm's length to laptop
- Auto-focus locked to the screen

---

## Recording flow

### Take 1 — full SHOTLIST run

Hit record. Don't pause. Run the full SHOTLIST.md scene-by-scene. If you flub a line, keep going — you'll edit. Get the whole thing in one take so the SSE flow is continuous.

### Take 2 — pickups for any flubbed lines

If you want to re-record specific lines, do them with screen-only (no Josh in frame) so you can easily splice. State the line, deliver it 2-3 times to give yourself options.

### Take 3 — alternate close

Try a different version of the final line. Options:
- *"Days, not weeks, to flip the adapter."* (cool, technical)
- *"Recognition, without asking."* (warm, brand)
- *"AI is invisible. The recognition is felt."* (philosophical)

Pick the one that lands best in editing.

---

## Pacing rules

1. **PAUSE on the magic moments.** The brief landing. The Whisper playing. Elena's privacy banner. Give the visual 2 seconds of silence before narrating it. Don't rush.
2. **SLOW DOWN on the cross-property facts.** "Chamomile and kettle, bedside, before arrival. Sourced from Rosewood London, January." — say this slowly, one fact at a time. Each fact is a tiny gasp moment.
3. **STAY QUIET during the chime + the LiveEta tick.** Let the system breathe.
4. **DON'T explain the architecture during the demo.** Judges have rubric points for live demo (45%) and impact (20%). They don't watch demos for architecture diagrams. Save that for Q&A.
5. **END EARLY if you can.** A clean 2:30 beats a sloppy 2:55.

---

## What to emphasize per scene

### Scene 1 — Problem (0:00–0:30)
> "Rosewood. 38 properties. Today they capture every guest preference. **They just don't use it at the moment of arrival.**"

Punch the last 7 words. That's the problem statement.

### Scene 2 — Mei Lin (0:30–1:30)
The lines to slow down on:
- *"Chamomile and kettle, bedside, before arrival. Sourced from Rosewood London, January."*
- *"Is Emma joining you in California, or is she home in Hong Kong this trip?"*

Then the closer in italics, voice down:
- ***"Mei Lin saw none of this. She just saw a person who knew her."***

### Scene 3 — Edson (1:30–2:15)
Point at the screen as the LiveEta ticks. Verbal: *"The countdown is live. Bell concierge is at the portico before the car is at the front gate."*

Then click Whisper. Let the audio finish. Verbal: *"Tablet for the desk, earpiece for the floor. The guest hears only the human."*

### Scene 4 — Elena (2:15–2:45)
This is your CLOSER. Slow it way down.

> "And one more thing." *(pause)* "Elena filed a privacy opt-out in March. Sandy honors it." *(point at the privacy banner)* "The system understands 'do not retrieve' as a first-class state, not a checkbox. When she's ready to share, she will. **Until then, we earn the relationship. That's what luxury privacy looks like.**"

Punch every word in the bolded sentence.

### Scene 5 — The ask (2:45–3:00)
Look at camera, NOT screen. Memorized verbatim:

> "Most luxury chains lose their guest at the property line. Rosewood doesn't have to. **We built the primitive that proves the product. The data layer behind it is what every PMS-using luxury chain already has — we just unlock it at the moment of arrival. Days, not weeks, to flip the adapter.**"

2-second hold on the staff page. Stop recording.

---

## Editing tips (post-recording)

1. **Don't cut tight.** Leave 1-second pauses between scenes. They feel intentional, not awkward.
2. **Subtitle the killer lines** for accessibility. People watching on mute (LinkedIn / Twitter) need the closer captioned.
3. **Open with a 2-second hold on `/console`** in the side-by-side view before Josh starts talking. Gives the viewer context.
4. **End with the GitHub URL on screen** for 3 seconds. `github.com/DareDev256/chain-recall`.
5. **No background music** unless you're sure. Music can fight the chime + Sandy voice. Better to let the silence work.
6. **Export at 1080p H.264** for upload anywhere. Keep file under 100MB if possible.

---

## Stand-out moves (if you have budget)

- **Slow-motion the chime moment.** When the brief lands, slow the visual to 75% speed for 1.5 seconds. Adds drama.
- **Zoom in on the loggedBy provenance** when reading the brief. Shows the audit-trail story without saying it.
- **Pre-record a 30-second "behind the scenes" cut** showing the code briefly — the SYSTEM_PROMPT, the brief schema, the SSE route. Don't include in main pitch but have it ready as a follow-up share.
- **Caption the Elena banner.** When she's on screen, drop a subtitle: *"GDPR Art. 17 / CCPA §1798.105 cited verbatim."* Visual proof of compliance fluency.

---

## What you might be missing — checklist

- [ ] `.env.local` keys all set (Anthropic + ElevenLabs)
- [ ] Custom Sandy voice ID in .env.local (your voice, not George default)
- [ ] Dev server running, no errors in console
- [ ] All 5 guest profiles fire correctly on /arrive
- [ ] /console shows both panels live
- [ ] Whisper button works with your voice
- [ ] Voice Note + Sandy ack works (or skip if buggy)
- [ ] Subtitles render when audio plays
- [ ] Property switcher cycles through HK / Sand Hill / London
- [ ] Reset button clears the brief
- [ ] LiveEta countdown ticks for Edson
- [ ] Elena's privacy banner is unmissable
- [ ] /study route is up if you want flashcards on phone during break

---

## Final mindset reminders

- **You shipped something real.** 30+ atomic commits, production build green, every feature working. The pace is the proof.
- **Judges aren't trying to trip you up.** They want to find a winner. Make it easy for them — clean demo, clear narration, honest answers.
- **If anything breaks, OWN IT.** Don't apologize at length. "Oh, the chime didn't fire — let me re-trigger" + keep going. Confidence under failure scores higher than perfection.
- **You and Josh built this together.** Pause briefly to credit each other at the end if it feels right. Judges remember teams that respect each other.

Go win this.

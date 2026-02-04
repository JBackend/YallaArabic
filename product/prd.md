# Gulf Arabic Basics — Product Requirements Document

**Tagline:** "Yalla, let's learn!"

**Version:** MVP v1.0
**Timeline:** 2-week prototype

---

## 1. Product Overview

### Problem Statement

Most Arabic learning apps teach Modern Standard Arabic (MSA)—a formal dialect nobody actually speaks in daily life. People moving to Dubai want to connect with locals and navigate daily situations, but they're learning phrases they'll never hear on the street. This creates a gap between what learners study and what they actually need.

### Target Users

**Primary:** Complete Arabic beginners moving to or living in Dubai/Gulf region

**Characteristics:**
- Zero Arabic knowledge
- Expats (initial distribution: Canadians in UAE)
- Want quick, practical results over academic depth

### Value Proposition

Learn Gulf Arabic phrases you can actually use—today. No textbook Arabic, no formal grammar. Just the words and phrases you'll hear and need in real Dubai interactions.

**Core differentiator:** Spoken Gulf dialect, not MSA. Functional use, not literacy.

---

## 2. User Journeys

### First-Time User Experience (Happy Path)

| Step | User Action | App Response | Feeling |
|------|-------------|--------------|---------|
| 1 | Opens app | Sees 4 scenarios: Greetings, Workplace, Coffee Shop, Common | Curiosity, clear path |
| 2 | Taps "Greetings & Small Talk" | First phrase appears: transliteration + audio | "This looks manageable" |
| 3 | Taps audio | Hears native pronunciation | "Oh, that's how it sounds" |
| 4 | Swipes through phrases | Each phrase with audio + meaning | Building confidence |
| 5 | Completes phrases | "Now let's practice" → scenario starts | Anticipation |
| 6 | Tap-to-reveal conversation | Simulated networking dialogue | "I could do this" |
| 7 | Completes scenario | "Greetings ✓" + 3 more scenarios to explore | Accomplishment, reason to return |

**Time to complete first scenario:** 5–10 minutes
**Key moment:** Hearing "Allah ya'teek al-'afya" and realizing this is what locals actually say

### Returning User Flow

| Step | User Action | App Response |
|------|-------------|--------------|
| 1 | Opens app | Sees progress: "Greetings ✓, Workplace ✗, Coffee Shop ✗, Common ✗" |
| 2 | Taps next scenario | New phrase set + conversation |
| 3 | Completes | Progress updates, scenario marked complete |

### Edge Cases

| Scenario | Handling |
|----------|----------|
| User closes mid-session | Resume from last phrase on return |
| User forgets phrases | Can replay any completed scenario |
| User wants to skip ahead | All scenarios visible, but uncompleted ones show lock icon (MVP: allow access anyway) |
| Audio fails to load | Show transliteration + "Audio unavailable" message; don't block progress |

---

## 3. Features & Requirements

### Core Features (MVP)

**F1: Phrase Display**
- Transliteration (large, primary)
- Arabic script (small, below)
- English meaning
- Audio playback button
- Swipe/tap to navigate between phrases

**F2: Conversation Practice**
- Scenario context ("You're at a coffee shop")
- Tap-to-reveal dialogue flow
- User prompt → tap → see phrase to say → tap → hear audio → tap → see local's response
- End screen with completion confirmation

**F3: Progress Tracking**
- Scenario completion view
- Visual checklist: "Greetings ✓, Workplace ✗, Coffee Shop ✗, Common ✗"
- Persists between sessions

### Content Requirements (MVP)

| Content | Quantity |
|---------|----------|
| Phrases | 60 |
| Scenarios | 4 |
| Audio clips | 60 (one per phrase) |

---

### Scenario 1: Greetings & Small Talk (15 phrases)
*Focus: Networking events, meeting new people, small talk*

| # | Arabic | Transliteration | Meaning |
|---|--------|-----------------|---------|
| 1 | السلام عليكم | As-salamu alaykum | Peace be upon you |
| 2 | وعليكم السلام | Wa alaykum as-salam | And upon you peace (response) |
| 3 | هلا / هلا والله | Hala / Hala wallah | Hey / Hey! (casual, warm) |
| 4 | شلونك؟ / شلونج؟ | Shlonak? / Shlonich? | How are you? (m/f) |
| 5 | الحمد لله، زين | Al-hamdulillah, zain | Good, thanks be to God |
| 6 | تشرفنا | Tsharafna | Pleased to meet you |
| 7 | شسمك؟ / شسمج؟ | Shismak? / Shismich? | What's your name? (m/f) |
| 8 | أنا اسمي... | Ana ismi... | My name is... |
| 9 | من وين أنت؟ | Min wayn inta? | Where are you from? |
| 10 | وأنت؟ / وأنتي؟ | W'inta? / W'inti? | And you? (m/f) |
| 11 | شو تشتغل؟ | Shu tishtaghil? | What do you do? (work) |
| 12 | من متى في دبي؟ | Min mata fi Dubai? | How long have you been in Dubai? |
| 13 | عربيك زين! | Arabiyak zain! | Your Arabic is good! |
| 14 | يلا نتواصل | Yalla nitwasal | Let's stay in touch |
| 15 | تشرفت بمعرفتك | Tsharafat b'mariftak | It was nice meeting you |

---

### Scenario 2: Workplace (15 phrases)
*Focus: Daily office interactions, meetings, rapport with colleagues*

| # | Arabic | Transliteration | Meaning |
|---|--------|-----------------|---------|
| 1 | صباح الخير | Sabah al-khayr | Good morning |
| 2 | صباح النور | Sabah al-noor | Good morning (response) |
| 3 | مساء الخير | Masa' al-khayr | Good afternoon/evening |
| 4 | مساء النور | Masa' al-noor | Good afternoon/evening (response) |
| 5 | الله يعطيك العافية | Allah ya'teek al-'afya | May God give you strength |
| 6 | الله يعافيك | Allah y'afeek | May God keep you well (response) |
| 7 | كيف الشغل؟ | Kayf al-shughul? | How's work? |
| 8 | مشغول شوي | Mashghool shway | A bit busy |
| 9 | خلصت الاجتماع؟ | Khalasat al-ijtima'? | Did you finish the meeting? |
| 10 | عندي اجتماع | Indi ijtima' | I have a meeting |
| 11 | ممكن تساعدني؟ | Mumkin tisa'idni? | Can you help me? |
| 12 | طبعاً | Tab'an | Of course |
| 13 | شكراً جزيلاً | Shukran jazeelan | Thank you very much |
| 14 | عفواً | Afwan | You're welcome / Excuse me |
| 15 | مع السلامة | Ma'a salama | Goodbye |

---

### Scenario 3: Coffee Shop (10 phrases)
*Focus: Ordering, customizing, paying*

| # | Arabic | Transliteration | Meaning |
|---|--------|-----------------|---------|
| 1 | أبي واحد قهوة، من فضلك | Abee wahid qahwa, min fadlak | I'd like one coffee, please |
| 2 | قهوة عربية | Qahwa arabiya | Arabic coffee |
| 3 | كابتشينو | Cappuccino | Cappuccino |
| 4 | بدون سكر | Bidoon sukkar | Without sugar |
| 5 | شوي سكر | Shway sukkar | A little sugar |
| 6 | شو تنصحني؟ | Shu tinsahni? | What do you recommend? |
| 7 | ممكن الحساب؟ | Mumkin al-hisab? | Can I get the bill? |
| 8 | بكم؟ | Bikam? | How much? |
| 9 | هذا لك | Hatha lak | This is for you (tip) |
| 10 | شكراً، تمام | Shukran, tamam | Thanks, perfect |

---

### Scenario 4: Common Expressions (20 phrases)
*Focus: Responses and phrases that work everywhere*

| # | Arabic | Transliteration | Meaning |
|---|--------|-----------------|---------|
| 1 | إن شاء الله | Inshallah | God willing |
| 2 | ما شاء الله | Mashallah | God has willed it (appreciation) |
| 3 | يلا | Yalla | Let's go / Come on |
| 4 | خلاص | Khalas | Done / Enough / That's it |
| 5 | مافي مشكلة | Mafi mushkila | No problem |
| 6 | إيه / نعم | Eeh / Na'am | Yes |
| 7 | لا | La | No |
| 8 | مو متأكد | Mu mit'akid | I'm not sure |
| 9 | ما أفهم | Ma afham | I don't understand |
| 10 | شو يعني...؟ | Shu ya'ni...? | What does ... mean? |
| 11 | ممكن تعيد؟ | Mumkin t'eed? | Can you repeat that? |
| 12 | شوي شوي | Shway shway | Slowly / Little by little |
| 13 | الحين | Al-heen | Now |
| 14 | بعدين | Ba'dain | Later |
| 15 | صح | Sah | Right / Correct |
| 16 | والله؟ | Wallah? | Really? (surprised) |
| 17 | حلو | Hilu | Nice / Sweet |
| 18 | آسف / آسفة | Aasif / Aasfa | Sorry (m/f) |
| 19 | لا تشيل هم | La tsheel ham | Don't worry about it |
| 20 | الله يسلمك | Allah yisalmak | May God protect you (response to thanks) |

### Constraints

- No user accounts or authentication (MVP)
- No backend server—local storage only
- No speech recognition or pronunciation feedback
- No dialect comparison features
- Audio sourced externally (Forvo/ElevenLabs free tier)
- Single language (English UI)

---

## 4. UX/Design Direction

### Design Inspiration

**Primary reference:** Headspace—calm, warm, organic. Soft gradients, muted tones, gentle motion. The app should feel like a supportive friend, not a demanding teacher.

**Design positioning:** Subtly distinctive. Familiar interaction patterns executed with a memorable palette. Users should think "that warm desert app."

### Explicit Anti-Patterns (What to Avoid)

| Avoid | Why |
|-------|-----|
| Generic language app aesthetic | No Duolingo green, cartoonish mascots, gamification badges, streak flames |
| Corporate/clinical | No blue-and-white, no stock photo energy, no bank/healthcare vibes |
| Over-designed startup | No gradient blobs, no glassmorphism, no trendy-but-forgettable "AI slop" |
| Academic/textbook | No density, no small text, no homework feeling |
| Default fonts | Never use Inter, Roboto, Open Sans, system defaults |

### Typography

**Principle:** Soft and rounded—friendly, approachable, no sharp edges. Reduces language learning anxiety.

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Transliteration | Nunito or Quicksand | 600–700 | 28–32px |
| English meaning | Nunito or Quicksand | 400 | 16–18px |
| Arabic script | Noto Sans Arabic | 400 | 14–16px |
| UI elements | Nunito or Quicksand | 500 | 14–16px |

**Hierarchy:** Transliteration (large, prominent) > Meaning (supporting) > Arabic script (small, reference)

### Color Palette

**Theme:** Warm sand and terracotta—desert-inspired, earthy. Ties to Gulf region without being literal.

**Light Mode (Default):**

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Background | Warm cream | #FDF8F3 | Primary background |
| Surface | Soft sand | #F5EDE4 | Cards, elevated elements |
| Primary | Terracotta | #C17A5A | Primary buttons, key accents |
| Secondary | Warm brown | #8B6F5C | Secondary text, icons |
| Text | Deep charcoal | #3D3530 | Primary text |
| Text muted | Warm gray | #7A6F66 | Secondary text, hints |
| Success | Desert sage | #7D9B76 | Completed scenarios, confirmations |
| Audio accent | Burnt sienna | #A65D3F | Audio buttons, interactive highlights |

**Dark Mode:**

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Background | Deep brown | #1F1A17 | Primary background |
| Surface | Warm charcoal | #2D2622 | Cards, elevated elements |
| Primary | Soft terracotta | #D4896B | Primary buttons, key accents |
| Secondary | Muted sand | #A69383 | Secondary text, icons |
| Text | Warm white | #F5EDE4 | Primary text |
| Text muted | Dusty rose | #9C8B80 | Secondary text, hints |
| Success | Soft sage | #8FAA87 | Completed scenarios |
| Audio accent | Warm coral | #C4785C | Audio buttons, interactive highlights |

### Motion & Animation

**Principle:** Subtle and gentle—Headspace-style calm. Nothing jarring or demanding attention.

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Screen transitions | Soft fade + slight slide | 300ms | ease-out |
| Card reveals | Fade in + scale from 0.95 | 250ms | ease-out |
| Audio button tap | Gentle pulse | 200ms | ease-in-out |
| Progress updates | Smooth fill | 400ms | ease-out |
| Success states | Soft scale + fade | 350ms | ease-out |

**Motion guidelines:**
- No bounces or springs—keep everything smooth
- Animations should feel like breathing, not bouncing
- Audio button has subtle pulse when ready to play
- Completion moments get slightly longer, more satisfying motion

### Interaction Patterns

| Interaction | Pattern |
|-------------|---------|
| Navigate phrases | Swipe left/right with momentum, or tap subtle arrows |
| Play audio | Tap speaker icon (large tap target, min 48pt) with pulse feedback |
| Reveal dialogue | Tap card—content fades in softly, no harsh flips |
| Complete scenario | Auto-advance with gentle celebration moment |
| Return to menu | Top-left back arrow or swipe down |
| Theme toggle | Settings gear → toggle switch (MVP: can defer to system preference) |

### Screen Layout (Mobile-First)

```
┌─────────────────────────────┐
│  ←                    ☀/☾   │  Header (minimal)
├─────────────────────────────┤
│                             │
│                             │
│      Shlonak, zain?         │  Transliteration (large, centered)
│                             │
│        شلونك، زين؟           │  Arabic script (small, muted)
│                             │
│    How are you, good?       │  English meaning
│                             │
│          ( ▶ )              │  Audio button (prominent, warm)
│                             │
│                             │
├─────────────────────────────┤
│       ○ ○ ● ○ ○             │  Progress dots (subtle)
│                             │
│      [ Continue ]           │  Navigation (rounded, warm)
└─────────────────────────────┘
```

**Layout principles:**
- Generous whitespace—content should breathe
- Centered, focused layout—one thing at a time
- Rounded corners everywhere (12–16px radius)
- Soft shadows (no harsh drop shadows)

---

## 5. Technical Considerations

### Data Model

```
Phrase {
  id: string
  arabic: string
  transliteration: string
  meaning: string
  audioUrl: string
  scenarioId: string
}

Scenario {
  id: string
  title: string (e.g., "Coffee Shop")
  description: string
  phrases: Phrase[]
  dialogue: DialogueStep[]
}

DialogueStep {
  id: string
  speaker: "user" | "local"
  phraseId: string
  prompt: string (e.g., "The barista greets you")
}

UserProgress {
  completedScenarios: string[]
  currentScenario: string | null
  currentPhraseIndex: number
}
```

### Storage

**MVP:** Local storage (AsyncStorage for React Native, localStorage for web)

```
{
  "progress": {
    "completedScenarios": ["coffee-shop"],
    "currentScenario": "taxi",
    "currentPhraseIndex": 2
  }
}
```

### Audio

| Aspect | Approach |
|--------|----------|
| Source | Forvo.com (primary), ElevenLabs free tier (backup) |
| Format | MP3, 128kbps (small file size, good quality) |
| Hosting | Bundled in app (MVP) or free CDN (GitHub raw, Cloudflare R2 free tier) |
| Validation | Community review on r/arabic before shipping |

### APIs Needed

**MVP: None required**

All content is static and bundled. No external API calls.

**Future consideration:**
- Analytics (Mixpanel free tier, or simple self-hosted)
- Remote content updates (simple JSON endpoint)

### Performance Requirements

| Metric | Target |
|--------|--------|
| App launch to first phrase | < 2 seconds |
| Audio playback start | < 500ms after tap |
| Navigation between phrases | Instant (< 100ms) |
| App size | < 20MB (including audio) |

### Platform Decision (TBD)

| Option | Pros | Cons |
|--------|------|------|
| React Native | Cross-platform, JS familiarity | Setup overhead |
| Flutter | Fast, good mobile feel | Dart learning curve |
| PWA | No app store, easy sharing | Less native feel, audio quirks |
| SwiftUI (iOS only) | Best iOS experience | Single platform |

**Recommendation for 2-week MVP:** PWA or React Native, depending on your familiarity.

---

## 6. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| First session completion | ~30% | Users who complete 5 phrases + scenario |
| Return rate | ~10% | Users who open app again within 7 days |
| Real-world usage | Qualitative | Friends report using a phrase in Dubai |

**Distribution:** Canadians in UAE Facebook/WhatsApp groups

---

## 7. MVP Milestones

### Week 1: Core Experience
- [ ] Phrase display screen (transliteration + script + meaning + audio)
- [ ] Source audio for 60 phrases (Forvo + ElevenLabs)
- [ ] Build 4 scenarios: Greetings, Workplace, Coffee Shop, Common Expressions
- [ ] Tap-to-reveal conversation flow
- [ ] Basic navigation between scenarios

### Week 2: Polish & Ship
- [ ] Progress tracking (scenario completion path)
- [ ] Light/dark theme toggle
- [ ] PWA configuration (offline, add to home screen)
- [ ] Test with 3-5 friends
- [ ] Bug fixes
- [ ] Share to Canadians in UAE group

---

## 8. Out of Scope (Future)

- Dialect comparison (Gulf vs Egyptian vs Levantine)
- Speech recognition / pronunciation feedback
- Streak tracking / gamification
- User accounts / cloud sync
- Additional scenarios (Restaurant, Shopping, Directions)
- Spaced repetition for phrase review

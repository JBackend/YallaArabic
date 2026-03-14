# Numbers & Money Module — Design Spec

**Date:** 2026-03-13
**Module ID:** `numbers-money`
**Title:** Numbers & Money
**Icon:** 💰
**Description:** Count, pay, and haggle like a local

---

## Phrases (6)

| ID | Arabic | Transliteration | Meaning | Audio File |
|----|--------|----------------|---------|------------|
| `kam` | كم؟ | Kam? | How much? | `kam.mp3` |
| `ghali` | غالي | Ghāli | Expensive / Too much | `ghali.mp3` |
| `al-hisab` | الحساب | Al-ḥisāb | The bill / check | `al-hisab.mp3` |
| `wahid-ithnayn-thalatha` | واحد، اثنين، ثلاثة | Wāḥid, ithnain, thalātha | One, two, three | `wahid-ithnayn-thalatha.mp3` |
| `fils` | فلس | Fils | Small change / coins | `fils.mp3` |
| `fakkah` | فكّة | Fakkah | Change (money back) | `fakkah.mp3` |

## Dialogue (6 steps) — Shopping & Payment Scene

| Step | Speaker | Phrase ID | Prompt |
|------|---------|-----------|--------|
| 1 | user | `kam` | You ask the shopkeeper the price |
| 2 | local | `wahid-ithnayn-thalatha` | They count out the price |
| 3 | user | `ghali` | You say it's too expensive |
| 4 | local | `al-hisab` | They hand you the bill |
| 5 | user | `fils` | You ask about small change |
| 6 | local | `fakkah` | They give you change back |

## Implementation

1. Add scenario object to `src/data/scenarios.ts`
2. Generate 6 audio MP3 files via ElevenLabs script
3. No type or component changes needed — existing infrastructure handles it automatically

## Notes

- `kam` phrase already exists in coffee-shop module — reuse same audio file, define as separate phrase entry in this module (each module is self-contained)
- Follows existing pattern of 6-8 dialogue steps per module
- Smaller module (6 phrases vs 10-23 in others) per user request

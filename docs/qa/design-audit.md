# Design System Audit: UX Issues

## Screenshot Analysis
The current dialogue card in practice mode has significant usability problems.

---

## Critical Issues

### 1. Unclear Visual Hierarchy
**Problem:** Users don't know what to focus on or what each text element means.
- Transliteration ("Ana ismi...") is largest but users may not know what it is
- Arabic text is too small and muted
- English meaning is de-emphasized but is often what learners need most

**Fix:** Add clear labels and rebalance visual weight.

### 2. Confusing "YOU" Label
**Problem:** "YOU" has no context. Does it mean:
- You should say this?
- This is your turn?
- This represents you in the dialogue?

**Fix:** Replace with clearer contextual label like "Your turn to say:" or use an icon+text combination.

### 3. Audio Error State Unclear
**Problem:** The speaker icon with X doesn't clearly communicate:
- Why audio is unavailable
- What the user should do
- That this is an error state (coral color doesn't read as "error")

**Fix:** Add text feedback, use red for errors, or show helpful message.

### 4. Missing Section Labels
**Problem:** Three lines of text with no indication of what each represents.
- New users have to guess which is Arabic, transliteration, or meaning

**Fix:** Add subtle labels: "Say:", "Arabic:", "Means:"

### 5. Low Contrast Text
**Problem:** Muted gray text (#A69383) on dark background (#2D2622) is hard to read.

**Fix:** Increase contrast for body text, especially the Arabic script.

### 6. No Interaction Hints
**Problem:** Card doesn't indicate:
- Is it tappable?
- What happens if I tap?
- How do I proceed?

**Fix:** Add visual affordances (subtle border, tap hint text).

---

## Issue Breakdown for Execution

| ID | Issue | Priority | Tokens Est. |
|----|-------|----------|-------------|
| DS-1 | Add labels to phrase sections (Transliteration/Arabic/Meaning) | High | ~2K |
| DS-2 | Improve speaker labels ("YOU" → "Your turn") | High | ~1.5K |
| DS-3 | Rebalance visual hierarchy (meaning more prominent) | Medium | ~2K |
| DS-4 | Improve audio error state with text feedback | Medium | ~1.5K |
| DS-5 | Increase text contrast in dark mode | Medium | ~1K |
| DS-6 | Add interaction hints to practice cards | Low | ~1K |

---

## Proposed Visual Hierarchy (New)

```
┌────────────────────────────────┐
│  YOUR TURN                     │  ← Clear role indicator
│                                │
│  "My name is..."               │  ← MEANING first (large)
│                                │
│  Ana ismi...                   │  ← Transliteration (medium)
│  أنا اسمي                      │  ← Arabic (medium, better contrast)
│                                │
│      [▶ Play Audio]            │  ← Clear audio button
│                                │
│  ℹ️ Tap to reveal next phrase  │  ← Interaction hint
└────────────────────────────────┘
```

---

## Files to Modify

1. `src/components/DialogueStep.tsx` - Main practice card
2. `src/components/PhraseCard.tsx` - Learn mode card
3. `src/components/AudioButton.tsx` - Error state display
4. `tailwind.config.ts` - Adjust dark mode colors
5. `src/app/globals.css` - Add new utility classes

# Feature JAS-43: Separate Learn and Conversation Modes

## Swarm Execution Plan

### Wave 1: Foundation (Parallel)
These can run in parallel as they have no dependencies:

| Agent | Issue | Task |
|-------|-------|------|
| coder-1 | JAS-46 | Rename `/practice` to `/conversation` (folder, files, routes) |
| coder-2 | JAS-47 | Update `useProgressStore` with phrase tracking per scenario |

### Wave 2: Components (Parallel, after Wave 1)
Depends on Wave 1 completion:

| Agent | Issue | Task |
|-------|-------|------|
| coder-1 | JAS-44 | Update `ScenarioCard` with dual buttons (Learn/Conversation) |
| coder-2 | JAS-48 | Update `ConversationClient` to work standalone |

### Wave 3: Integration (Sequential, after Wave 2)
Final integration:

| Agent | Issue | Task |
|-------|-------|------|
| coder-1 | JAS-45 | Update home page routing for both modes |
| coder-1 | JAS-49 | Update LearnClient to return home on completion |

### Wave 4: Validation
| Agent | Issue | Task |
|-------|-------|------|
| tester | - | Build verification, route testing, flow testing |

---

## Dependency Graph

```
JAS-46 (rename) ──┬──> JAS-48 (conversation standalone)
                 │
                 └──> JAS-49 (learn flow)

JAS-47 (store) ────> JAS-44 (card) ────> JAS-45 (home)
```

---

## Files to Modify

### JAS-46: Rename Practice to Conversation
- `src/app/practice/` → `src/app/conversation/`
- `src/app/practice/[scenarioId]/page.tsx` → `src/app/conversation/[scenarioId]/page.tsx`
- `src/app/practice/[scenarioId]/PracticeClient.tsx` → `ConversationClient.tsx`
- Update all imports and references

### JAS-47: Progress Store
- `src/store/useProgressStore.ts` - Add `learnedPhrases: Record<string, string[]>`
- Add `markPhraseAsLearned(scenarioId, phraseId)` action
- Keep `completeScenario` for conversation completion

### JAS-44: ScenarioCard
- `src/components/ScenarioCard.tsx` - Add two buttons
- Update props: `onLearnClick`, `onConversationClick`
- Show phrase progress: "5/15 phrases"

### JAS-45: Home Page
- `src/app/page.tsx` - Handle both click types
- Route to `/learn/[id]` or `/conversation/[id]`

### JAS-48: ConversationClient
- Remove any guards checking for phrase completion
- Ensure standalone functionality

### JAS-49: LearnClient
- Change "Practice" button to "Done" or "Back to Scenarios"
- Navigate to home on completion, not to conversation

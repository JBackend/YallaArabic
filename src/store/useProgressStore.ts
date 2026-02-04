import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProgress } from '@/types'

interface ProgressStore extends UserProgress {
  // Actions
  completeScenario: (scenarioId: string) => void
  setCurrentScenario: (scenarioId: string | null) => void
  setCurrentPhraseIndex: (index: number) => void
  markPhraseAsLearned: (scenarioId: string, phraseId: string) => void
  getLearnedPhrasesCount: (scenarioId: string) => number
  resetProgress: () => void
}

const initialState: UserProgress = {
  completedScenarios: [],
  currentScenario: null,
  currentPhraseIndex: 0,
  lastActiveAt: Date.now(),
  learnedPhrases: {},
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      completeScenario: (scenarioId: string) => {
        const { completedScenarios } = get()
        if (!completedScenarios.includes(scenarioId)) {
          set({
            completedScenarios: [...completedScenarios, scenarioId],
            lastActiveAt: Date.now(),
          })
        }
      },

      setCurrentScenario: (scenarioId: string | null) => {
        set({
          currentScenario: scenarioId,
          currentPhraseIndex: 0,
          lastActiveAt: Date.now(),
        })
      },

      setCurrentPhraseIndex: (index: number) => {
        set({
          currentPhraseIndex: index,
          lastActiveAt: Date.now(),
        })
      },

      markPhraseAsLearned: (scenarioId: string, phraseId: string) => {
        const { learnedPhrases } = get()
        const scenarioPhrases = learnedPhrases[scenarioId] || []
        if (!scenarioPhrases.includes(phraseId)) {
          set({
            learnedPhrases: {
              ...learnedPhrases,
              [scenarioId]: [...scenarioPhrases, phraseId],
            },
            lastActiveAt: Date.now(),
          })
        }
      },

      getLearnedPhrasesCount: (scenarioId: string) => {
        const { learnedPhrases } = get()
        return learnedPhrases[scenarioId]?.length || 0
      },

      resetProgress: () => {
        set({
          ...initialState,
          lastActiveAt: Date.now(),
        })
      },
    }),
    {
      name: 'gulf-arabic-progress',
    }
  )
)

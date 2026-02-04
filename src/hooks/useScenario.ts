'use client'

import { useMemo, useCallback } from 'react'
import { scenarios, getScenarioById as getScenarioByIdFn, getScenarios as getScenariosFn } from '@/data/scenarios'
import type { Scenario, Phrase, DialogueStep } from '@/types'

/**
 * Hook for accessing scenario data with memoized functions to prevent unnecessary re-renders
 */
export function useScenario() {
  /**
   * Get all scenarios - memoized to prevent new array references
   */
  const getScenarios = useCallback((): Scenario[] => {
    return getScenariosFn()
  }, [])

  /**
   * Get a single scenario by ID
   */
  const getScenarioById = useCallback((id: string): Scenario | undefined => {
    return getScenarioByIdFn(id)
  }, [])

  /**
   * Get a specific phrase from a scenario
   */
  const getPhraseById = useCallback((scenarioId: string, phraseId: string): Phrase | undefined => {
    const scenario = getScenarioByIdFn(scenarioId)
    if (!scenario) return undefined
    return scenario.phrases.find((p) => p.id === phraseId)
  }, [])

  /**
   * Get dialogue steps for a scenario
   */
  const getDialogueSteps = useCallback((scenarioId: string): DialogueStep[] => {
    const scenario = getScenarioByIdFn(scenarioId)
    if (!scenario) return []
    return scenario.dialogue
  }, [])

  /**
   * Get a phrase by its ID across all scenarios
   */
  const findPhraseById = useCallback((phraseId: string): { phrase: Phrase; scenario: Scenario } | undefined => {
    for (const scenario of scenarios) {
      const phrase = scenario.phrases.find((p) => p.id === phraseId)
      if (phrase) {
        return { phrase, scenario }
      }
    }
    return undefined
  }, [])

  return useMemo(() => ({
    getScenarios,
    getScenarioById,
    getPhraseById,
    getDialogueSteps,
    findPhraseById,
  }), [getScenarios, getScenarioById, getPhraseById, getDialogueSteps, findPhraseById])
}

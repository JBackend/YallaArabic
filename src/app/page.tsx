'use client'

import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useScenario } from '@/hooks'
import { useProgressStore } from '@/store'
import { ThemeToggle } from '@/components/ui'
import { ScenarioCard } from '@/components'

export default function Home() {
  const router = useRouter()
  const { getScenarios } = useScenario()
  const { completedScenarios, learnedPhrases } = useProgressStore()

  // Memoize scenarios to prevent recalculation on each render
  const scenarios = useMemo(() => getScenarios(), [getScenarios])

  // Click handler for Learn mode - navigates to phrase learning flow
  const handleLearnClick = useCallback((scenarioId: string) => {
    router.push(`/learn/${scenarioId}`)
  }, [router])

  // Click handler for Conversation mode - navigates to conversation practice
  const handleConversationClick = useCallback((scenarioId: string) => {
    router.push(`/conversation/${scenarioId}`)
  }, [router])

  // Helper to get learned phrases count for a scenario
  const getLearnedCount = useCallback((scenarioId: string) => {
    return learnedPhrases[scenarioId]?.length || 0
  }, [learnedPhrases])

  // Memoize completed status lookup for better performance
  const completedSet = useMemo(() => new Set(completedScenarios), [completedScenarios])

  return (
    <main id="main-content" className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-charcoal dark:text-warm-white">
            Yalla, let&apos;s learn!
          </h1>
          <p className="text-sm text-warm-gray dark:text-muted-sand mt-1">
            Gulf Arabic Basics
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* Progress summary */}
      <div className="mb-6 p-4 bg-sand/50 dark:bg-warm-charcoal/50 rounded-card" aria-live="polite">
        <p className="text-sm text-warm-gray dark:text-muted-sand">
          <span className="font-semibold text-sage dark:text-soft-sage">
            {completedScenarios.length}
          </span>
          {' / '}
          {scenarios.length} scenarios completed
        </p>
      </div>

      {/* Scenario list */}
      <nav aria-label="Learning scenarios">
        <ul className="space-y-4 stagger-children list-none">
          {scenarios.map((scenario) => (
            <li key={scenario.id}>
              <ScenarioCard
                scenario={scenario}
                isCompleted={completedSet.has(scenario.id)}
                onLearnClick={handleLearnClick}
                onConversationClick={handleConversationClick}
                learnedPhrasesCount={getLearnedCount(scenario.id)}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-warm-gray/60 dark:text-muted-sand/60">
        <p>Learn practical phrases for Dubai &amp; UAE</p>
      </footer>
    </main>
  )
}

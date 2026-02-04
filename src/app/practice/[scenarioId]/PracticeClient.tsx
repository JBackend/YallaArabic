'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useScenario } from '@/hooks'
import { useProgressStore } from '@/store'
import { DialogueStep, CompletionScreen } from '@/components'

interface PracticeClientProps {
  scenarioId: string
}

export default function PracticeClient({ scenarioId }: PracticeClientProps) {
  const router = useRouter()
  const { getScenarioById, getPhraseById } = useScenario()
  const { completeScenario } = useProgressStore()

  const [revealedSteps, setRevealedSteps] = useState<Set<string>>(new Set())
  const [isCompleted, setIsCompleted] = useState(false)

  const scenario = getScenarioById(scenarioId)

  // Redirect if scenario not found
  useEffect(() => {
    if (!scenario) {
      router.replace('/')
    }
  }, [scenario, router])

  if (!scenario) {
    return null
  }

  const dialogueSteps = scenario.dialogue
  const totalSteps = dialogueSteps.length
  const revealedCount = revealedSteps.size

  const handleReveal = (stepId: string) => {
    const newRevealed = new Set(revealedSteps)
    newRevealed.add(stepId)
    setRevealedSteps(newRevealed)

    // Check if all steps are revealed
    if (newRevealed.size === totalSteps) {
      setTimeout(() => {
        completeScenario(scenarioId)
        setIsCompleted(true)
      }, 500)
    }
  }

  const handleContinue = () => {
    router.push('/')
  }

  const handleBack = () => {
    router.push(`/learn/${scenarioId}`)
  }

  if (isCompleted) {
    return <CompletionScreen scenario={scenario} onContinue={handleContinue} />
  }

  return (
    <main id="main-content" className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center gap-4 border-b border-warm-gray/10 dark:border-muted-sand/10">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 rounded-full hover:bg-sand dark:hover:bg-warm-charcoal transition-colors focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
          aria-label="Go back to learning mode"
        >
          <svg className="w-6 h-6 text-charcoal dark:text-warm-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="font-semibold text-charcoal dark:text-warm-white">
            Practice: {scenario.title}
          </h1>
          <p className="text-xs text-warm-gray dark:text-muted-sand">
            Tap cards to reveal phrases
          </p>
        </div>
        <span className="text-2xl" aria-hidden="true">{scenario.icon}</span>
      </header>

      {/* Progress */}
      <div className="px-6 py-3 border-b border-warm-gray/5 dark:border-muted-sand/5">
        <div className="flex items-center justify-between text-sm mb-2">
          <span id="progress-label" className="text-warm-gray dark:text-muted-sand">Progress</span>
          <span className="font-medium text-charcoal dark:text-warm-white" aria-live="polite">
            {revealedCount} / {totalSteps}
          </span>
        </div>
        <div
          className="h-2 bg-warm-gray/20 dark:bg-muted-sand/20 rounded-full overflow-hidden"
          role="progressbar"
          aria-labelledby="progress-label"
          aria-valuenow={revealedCount}
          aria-valuemin={0}
          aria-valuemax={totalSteps}
          aria-valuetext={`${revealedCount} of ${totalSteps} phrases revealed`}
        >
          <div
            className="h-full bg-terracotta dark:bg-soft-terracotta transition-all duration-progress rounded-full"
            style={{ width: `${(revealedCount / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Dialogue */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-lg mx-auto space-y-6">
          {dialogueSteps.map((step, index) => {
            const phrase = getPhraseById(scenarioId, step.phraseId)
            if (!phrase) return null

            const previousRevealed = index === 0 ||
              dialogueSteps.slice(0, index).every(s => revealedSteps.has(s.id))

            if (!previousRevealed && !revealedSteps.has(step.id)) {
              return null
            }

            return (
              <DialogueStep
                key={step.id}
                step={step}
                phrase={phrase}
                isRevealed={revealedSteps.has(step.id)}
                onReveal={() => handleReveal(step.id)}
              />
            )
          })}
        </div>
      </div>

      {/* Footer hint */}
      {revealedCount < totalSteps && (
        <footer className="p-4 text-center border-t border-warm-gray/10 dark:border-muted-sand/10">
          <p className="text-sm text-warm-gray dark:text-muted-sand">
            {revealedCount === 0 ? 'Tap the first card to begin' : `${totalSteps - revealedCount} more to reveal`}
          </p>
        </footer>
      )}
    </main>
  )
}

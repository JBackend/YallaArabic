'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useScenario } from '@/hooks'
import { useProgressStore } from '@/store'
import { Button, ProgressDots } from '@/components/ui'
import { PhraseCard } from '@/components'
import { analytics } from '@/lib/analytics'

interface LearnClientProps {
  scenarioId: string
}

export default function LearnClient({ scenarioId }: LearnClientProps) {
  const router = useRouter()
  const { getScenarioById } = useScenario()
  const { setCurrentScenario, setCurrentPhraseIndex } = useProgressStore()

  const [phraseIndex, setPhraseIndex] = useState(0)
  const hasTrackedStart = useRef(false)

  // Memoize scenario lookup to prevent unnecessary recalculation
  const scenario = useMemo(() => getScenarioById(scenarioId), [getScenarioById, scenarioId])

  // Memoize derived values to prevent recalculation on each render
  const phrases = useMemo(() => scenario?.phrases ?? [], [scenario])
  const currentPhrase = useMemo(() => phrases[phraseIndex], [phrases, phraseIndex])
  const isLastPhrase = phraseIndex === phrases.length - 1
  const isFirstPhrase = phraseIndex === 0

  // Redirect if scenario not found, track start
  useEffect(() => {
    if (!scenario) {
      router.replace('/')
      return
    }
    setCurrentScenario(scenarioId)

    // Track learn start (once)
    if (!hasTrackedStart.current) {
      analytics.learnStart(scenarioId, scenario.title)
      hasTrackedStart.current = true
    }
  }, [scenario, scenarioId, router, setCurrentScenario])

  // Track phrase views with virtual pageviews
  useEffect(() => {
    setCurrentPhraseIndex(phraseIndex)
    if (phrases.length > 0 && currentPhrase) {
      analytics.learnPhrase(scenarioId, phraseIndex, phrases.length, currentPhrase.id)
    }
  }, [phraseIndex, setCurrentPhraseIndex, scenarioId, phrases.length, currentPhrase])

  // Memoize handlers to prevent re-renders in child components
  const handleNext = useCallback(() => {
    if (phraseIndex === phrases.length - 1) {
      analytics.learnComplete(scenarioId, phrases.length)
      router.push('/')
    } else {
      setPhraseIndex((i) => i + 1)
    }
  }, [phraseIndex, phrases.length, router, scenarioId])

  const handlePrevious = useCallback(() => {
    if (phraseIndex > 0) {
      setPhraseIndex((i) => i - 1)
    }
  }, [phraseIndex])

  const handleBack = useCallback(() => {
    // Track flow exit
    analytics.flowExit(scenarioId, 'learn', phraseIndex + 1, phrases.length)
    router.push('/')
  }, [router, scenarioId, phraseIndex, phrases.length])

  if (!scenario) {
    return null
  }

  return (
    <main id="main-content" className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center gap-4 border-b border-warm-gray/10 dark:border-muted-sand/10">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 rounded-full hover:bg-sand dark:hover:bg-warm-charcoal transition-colors focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
          aria-label="Go back to scenario list"
        >
          <svg
            className="w-6 h-6 text-charcoal dark:text-warm-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="font-semibold text-charcoal dark:text-warm-white">
            {scenario.title}
          </h1>
          <p className="text-xs text-warm-gray dark:text-muted-sand">
            {phraseIndex + 1} of {phrases.length} phrases
          </p>
        </div>
        <span className="text-2xl" aria-hidden="true">{scenario.icon}</span>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <PhraseCard phrase={currentPhrase} scenarioId={scenarioId} />
        </div>
      </div>

      {/* Navigation */}
      <footer className="p-6 space-y-4">
        <ProgressDots total={phrases.length} current={phraseIndex} />
        <div className="flex gap-3" role="group" aria-label="Phrase navigation">
          <Button variant="ghost" onClick={handlePrevious} disabled={isFirstPhrase} className="flex-1" aria-label="Go to previous phrase">
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </Button>
          <Button onClick={handleNext} className="flex-1" aria-label={isLastPhrase ? 'Return to scenarios' : 'Go to next phrase'}>
            {isLastPhrase ? 'Done' : 'Next'}
            <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </footer>
    </main>
  )
}

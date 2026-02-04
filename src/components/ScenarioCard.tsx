'use client'

import { memo, useCallback } from 'react'
import type { Scenario } from '@/types'
import { Button, Card } from '@/components/ui'

interface ScenarioCardProps {
  scenario: Scenario
  isCompleted: boolean
  onLearnClick: (scenarioId: string) => void
  onConversationClick: (scenarioId: string) => void
  learnedPhrasesCount: number
}

/**
 * ScenarioCard - Memoized for performance optimization
 * Prevents re-renders when parent component updates but props haven't changed
 */
export const ScenarioCard = memo(function ScenarioCard({
  scenario,
  isCompleted,
  onLearnClick,
  onConversationClick,
  learnedPhrasesCount,
}: ScenarioCardProps) {
  // Memoize click handlers to use stable references
  const handleLearnClick = useCallback(() => {
    onLearnClick(scenario.id)
  }, [onLearnClick, scenario.id])

  const handleConversationClick = useCallback(() => {
    onConversationClick(scenario.id)
  }, [onConversationClick, scenario.id])

  return (
    <Card
      className={`
        ${isCompleted ? 'opacity-80' : ''}
      `}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="text-3xl flex-shrink-0" aria-hidden="true">
          {scenario.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-charcoal dark:text-warm-white truncate">
            {scenario.title}
          </h3>
          <p className="text-sm text-warm-gray dark:text-muted-sand truncate">
            {scenario.description}
          </p>
          <p className="text-xs text-warm-gray/70 dark:text-muted-sand/70 mt-1">
            {learnedPhrasesCount}/{scenario.phrases.length} phrases
          </p>
        </div>

        {/* Status indicator */}
        <div className="flex-shrink-0" aria-hidden="true">
          {isCompleted ? (
            <div className="w-8 h-8 rounded-full bg-sage dark:bg-soft-sage flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          ) : (
            <svg
              className="w-6 h-6 text-warm-gray dark:text-muted-sand"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-4">
        <Button
          variant="primary"
          size="sm"
          onClick={handleLearnClick}
          aria-label={`Learn ${scenario.title}`}
        >
          Learn
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleConversationClick}
          aria-label={`Practice conversation for ${scenario.title}`}
        >
          Conversation
        </Button>
      </div>
    </Card>
  )
})

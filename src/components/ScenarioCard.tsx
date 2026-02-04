'use client'

import { memo, useCallback } from 'react'
import type { Scenario } from '@/types'
import { Card } from '@/components/ui'

interface ScenarioCardProps {
  scenario: Scenario
  isCompleted: boolean
  onClick: (scenarioId: string) => void
}

/**
 * ScenarioCard - Memoized for performance optimization
 * Prevents re-renders when parent component updates but props haven't changed
 */
export const ScenarioCard = memo(function ScenarioCard({ scenario, isCompleted, onClick }: ScenarioCardProps) {
  // Memoize click handler to use stable reference
  const handleClick = useCallback(() => {
    onClick(scenario.id)
  }, [onClick, scenario.id])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick(scenario.id)
    }
  }, [onClick, scenario.id])

  return (
    <Card
      className={`
        cursor-pointer
        transition-transform duration-card
        hover:scale-[1.02]
        active:scale-[0.98]
        focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2
        ${isCompleted ? 'opacity-80' : ''}
      `}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${scenario.title}: ${scenario.description}. ${scenario.phrases.length} phrases. ${isCompleted ? 'Completed.' : 'Not completed.'}`}
      onKeyDown={handleKeyDown}
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
            {scenario.phrases.length} phrases
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
    </Card>
  )
})

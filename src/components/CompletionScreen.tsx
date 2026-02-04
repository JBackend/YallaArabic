'use client'

import type { Scenario } from '@/types'
import { Button, Card } from '@/components/ui'

interface CompletionScreenProps {
  scenario: Scenario
  onContinue: () => void
}

export function CompletionScreen({ scenario, onContinue }: CompletionScreenProps) {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center min-h-[60vh] p-8 text-center" role="alert" aria-live="polite">
      {/* Celebration icon */}
      <div className="text-6xl mb-6 animate-pulse-gentle" role="img" aria-label="Celebration">
        🎉
      </div>

      {/* Success message */}
      <Card className="max-w-md w-full">
        <div className="py-6 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-sage dark:bg-soft-sage flex items-center justify-center" aria-hidden="true">
            <svg
              className="w-10 h-10 text-white"
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

          <h2 className="text-2xl font-bold text-charcoal dark:text-warm-white">
            Scenario Completed!
          </h2>

          <p className="text-warm-gray dark:text-muted-sand">
            You&apos;ve finished <span className="font-semibold">{scenario.title}</span>
          </p>

          <div className="flex items-center justify-center gap-2 text-lg">
            <span className="text-3xl">{scenario.icon}</span>
            <span className="text-warm-brown dark:text-dusty-rose font-medium">
              {scenario.phrases.length} phrases learned
            </span>
          </div>

          <div className="pt-4">
            <Button onClick={onContinue} size="lg" className="w-full">
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

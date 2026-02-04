'use client'

import type { DialogueStep as DialogueStepType, Phrase } from '@/types'
import { Card } from '@/components/ui'
import { AudioButton } from './AudioButton'

interface DialogueStepProps {
  step: DialogueStepType
  phrase: Phrase
  isRevealed: boolean
  onReveal: () => void
}

export function DialogueStep({ step, phrase, isRevealed, onReveal }: DialogueStepProps) {
  const isUser = step.speaker === 'user'

  return (
    <div
      className={`
        flex flex-col gap-2
        ${isUser ? 'items-end' : 'items-start'}
      `}
    >
      {/* Prompt/context */}
      <p className={`
        text-sm text-warm-gray dark:text-muted-sand italic px-2
        ${isUser ? 'text-right' : 'text-left'}
      `}>
        {step.prompt}
      </p>

      {/* Card - tap to reveal or show phrase */}
      {isRevealed ? (
        <Card
          className={`
            max-w-[85%] animate-card-reveal
            ${isUser
              ? 'bg-terracotta/10 dark:bg-soft-terracotta/10'
              : 'bg-sand dark:bg-warm-charcoal'
            }
          `}
          animate={false}
        >
          <div className="space-y-2">
            {/* Transliteration */}
            <p className="text-lg font-semibold text-charcoal dark:text-warm-white">
              {phrase.transliteration}
            </p>

            {/* Arabic */}
            <p className="arabic-text text-sm text-warm-gray dark:text-muted-sand" lang="ar">
              {phrase.arabic}
            </p>

            {/* Meaning */}
            <p className="text-sm text-warm-brown dark:text-dusty-rose">
              {phrase.meaning}
            </p>

            {/* Audio button */}
            <div className={`pt-1 ${isUser ? 'flex justify-end' : ''}`}>
              <AudioButton audioFile={phrase.audioFile} size={40} />
            </div>
          </div>
        </Card>
      ) : (
        <button
          onClick={onReveal}
          aria-label={`Tap to reveal phrase: ${step.prompt}`}
          className={`
            max-w-[85%] p-4
            rounded-card
            border-2 border-dashed
            border-warm-gray/30 dark:border-muted-sand/30
            text-warm-gray dark:text-muted-sand
            transition-all duration-card
            hover:border-terracotta dark:hover:border-soft-terracotta
            hover:text-terracotta dark:hover:text-soft-terracotta
            hover:bg-terracotta/5 dark:hover:bg-soft-terracotta/5
            focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2
            active:scale-95
            ${isUser
              ? 'bg-terracotta/5 dark:bg-soft-terracotta/5'
              : 'bg-sand/50 dark:bg-warm-charcoal/50'
            }
          `}
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span className="font-medium">Tap to reveal</span>
          </div>
        </button>
      )}

      {/* Speaker label */}
      <span className={`
        text-xs uppercase tracking-wide px-2
        ${isUser
          ? 'text-terracotta dark:text-soft-terracotta'
          : 'text-sage dark:text-soft-sage'
        }
      `}>
        {isUser ? 'You' : 'Local'}
      </span>
    </div>
  )
}

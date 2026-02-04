'use client'

import type { DialogueStep as DialogueStepType, Phrase } from '@/types'
import { Card } from '@/components/ui'
import { AudioButton } from './AudioButton'

interface DialogueStepProps {
  step: DialogueStepType
  phrase: Phrase
  isRevealed: boolean
  onReveal: () => void
  scenarioId?: string
}

export function DialogueStep({ step, phrase, isRevealed, onReveal, scenarioId }: DialogueStepProps) {
  const isUser = step.speaker === 'user'

  return (
    <div
      className={`
        flex flex-col gap-2
        ${isUser ? 'items-end' : 'items-start'}
      `}
    >
      {/* Speaker role - clear indicator */}
      <div className={`
        flex items-center gap-2 px-2
        ${isUser ? 'flex-row-reverse' : ''}
      `}>
        <span className={`
          text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full
          ${isUser
            ? 'bg-terracotta/20 text-terracotta dark:bg-soft-terracotta/20 dark:text-soft-terracotta'
            : 'bg-sage/20 text-sage dark:bg-soft-sage/20 dark:text-soft-sage'
          }
        `}>
          {isUser ? 'Your turn' : 'They say'}
        </span>
      </div>

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
              ? 'bg-terracotta/10 dark:bg-soft-terracotta/15 border border-terracotta/20 dark:border-soft-terracotta/20'
              : 'bg-sand dark:bg-warm-charcoal border border-warm-gray/10 dark:border-muted-sand/10'
            }
          `}
          animate={false}
        >
          <div className="space-y-3">
            {/* Meaning - FIRST and most prominent for learners */}
            <div>
              <span className="text-[10px] uppercase tracking-wider text-warm-gray/60 dark:text-muted-sand/60 font-medium">
                Meaning
              </span>
              <p className="text-lg font-semibold text-charcoal dark:text-warm-white mt-0.5">
                {phrase.meaning}
              </p>
            </div>

            {/* Pronunciation guide */}
            <div>
              <span className="text-[10px] uppercase tracking-wider text-warm-gray/60 dark:text-muted-sand/60 font-medium">
                Say it
              </span>
              <p className="text-base text-warm-brown dark:text-dusty-rose font-medium mt-0.5">
                {phrase.transliteration}
              </p>
            </div>

            {/* Arabic script - larger and better contrast */}
            <div>
              <span className="text-[10px] uppercase tracking-wider text-warm-gray/60 dark:text-muted-sand/60 font-medium">
                Arabic
              </span>
              <p className="arabic-text text-xl text-charcoal/80 dark:text-warm-white/90 mt-0.5" lang="ar" dir="rtl">
                {phrase.arabic}
              </p>
            </div>

            {/* Audio button with label */}
            <div className={`pt-2 flex items-center gap-3 ${isUser ? 'justify-end' : ''}`}>
              <AudioButton
                audioFile={phrase.audioFile}
                phraseId={phrase.id}
                scenarioId={scenarioId}
                size={44}
              />
              <span className="text-xs text-warm-gray dark:text-muted-sand">
                Tap to hear
              </span>
            </div>
          </div>
        </Card>
      ) : (
        <button
          onClick={onReveal}
          aria-label={`Tap to reveal: ${step.prompt}`}
          className={`
            max-w-[85%] p-5
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
          <div className="flex flex-col items-center gap-2">
            <svg
              className="w-6 h-6"
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
            <span className="font-medium text-sm">Tap to reveal phrase</span>
          </div>
        </button>
      )}
    </div>
  )
}

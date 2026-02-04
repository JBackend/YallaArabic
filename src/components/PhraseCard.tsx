'use client'

import type { Phrase } from '@/types'
import { Card } from '@/components/ui'
import { AudioButton } from './AudioButton'

interface PhraseCardProps {
  phrase: Phrase
  scenarioId?: string
  className?: string
}

export function PhraseCard({ phrase, scenarioId, className = '' }: PhraseCardProps) {
  return (
    <Card className={`animate-fade-in ${className}`}>
      <div className="space-y-5 py-4">
        {/* Meaning - what the phrase means (most important for learners) */}
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-wider text-warm-gray/60 dark:text-muted-sand/60 font-medium">
            This means
          </span>
          <p className="text-xl md:text-2xl font-semibold text-charcoal dark:text-warm-white mt-1">
            {phrase.meaning}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-warm-gray/10 dark:border-muted-sand/10" />

        {/* How to say it */}
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-wider text-warm-gray/60 dark:text-muted-sand/60 font-medium">
            Say it like this
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-terracotta dark:text-soft-terracotta mt-1">
            {phrase.transliteration}
          </h2>
        </div>

        {/* Arabic script - larger with better contrast */}
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-wider text-warm-gray/60 dark:text-muted-sand/60 font-medium">
            In Arabic
          </span>
          <p className="arabic-text text-2xl md:text-3xl text-charcoal/80 dark:text-warm-white/90 mt-1" lang="ar" dir="rtl">
            {phrase.arabic}
          </p>
        </div>

        {/* Audio button - centered with hint */}
        <div className="flex flex-col items-center gap-2 pt-2">
          <AudioButton
            audioFile={phrase.audioFile}
            phraseId={phrase.id}
            scenarioId={scenarioId}
            size={56}
          />
          <span className="text-xs text-warm-gray dark:text-muted-sand">
            Tap to hear pronunciation
          </span>
        </div>
      </div>
    </Card>
  )
}

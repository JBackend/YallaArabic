'use client'

import type { Phrase } from '@/types'
import { Card } from '@/components/ui'
import { AudioButton } from './AudioButton'

interface PhraseCardProps {
  phrase: Phrase
  className?: string
}

export function PhraseCard({ phrase, className = '' }: PhraseCardProps) {
  return (
    <Card className={`animate-fade-in text-center ${className}`}>
      <div className="space-y-4 py-4">
        {/* Transliteration - large and prominent */}
        <h2 className="text-2xl md:text-3xl font-semibold text-charcoal dark:text-warm-white">
          {phrase.transliteration}
        </h2>

        {/* Arabic script - smaller, muted */}
        <p className="arabic-text text-base md:text-lg text-warm-gray dark:text-muted-sand" lang="ar">
          {phrase.arabic}
        </p>

        {/* English meaning */}
        <p className="text-lg text-warm-brown dark:text-dusty-rose">
          {phrase.meaning}
        </p>

        {/* Audio button - centered */}
        <div className="flex justify-center pt-2">
          <AudioButton audioFile={phrase.audioFile} size={56} />
        </div>
      </div>
    </Card>
  )
}

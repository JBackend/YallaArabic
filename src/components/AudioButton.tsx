'use client'

import { useRef } from 'react'
import { useAudio } from '@/hooks/useAudio'
import { analytics } from '@/lib/analytics'

interface AudioButtonProps {
  audioFile: string
  phraseId?: string
  scenarioId?: string
  size?: number
  className?: string
  showLabel?: boolean
}

export function AudioButton({
  audioFile,
  phraseId,
  scenarioId,
  size = 48,
  className = '',
  showLabel = false
}: AudioButtonProps) {
  const { isPlaying, isLoading, error, play, stop } = useAudio(audioFile)
  const playCount = useRef(0)
  const playStartTime = useRef<number | null>(null)

  const handleClick = () => {
    if (error) {
      // Track audio error
      if (phraseId) {
        analytics.audioError(phraseId, 'load_failed')
      }
      return
    }

    if (isPlaying) {
      stop()
    } else {
      // Track audio play
      if (phraseId && scenarioId) {
        const isReplay = playCount.current > 0
        analytics.audioPlay(phraseId, scenarioId, isReplay)
        playCount.current++
        playStartTime.current = Date.now()
      }
      play()
    }
  }

  // Determine button state for styling
  const getButtonStyles = () => {
    if (error) {
      return 'bg-warm-gray/30 dark:bg-muted-sand/20 text-warm-gray dark:text-muted-sand cursor-not-allowed'
    }
    if (isPlaying) {
      return 'bg-sage dark:bg-soft-sage text-white'
    }
    return 'bg-sienna dark:bg-coral text-white hover:bg-terracotta dark:hover:bg-soft-terracotta'
  }

  const getLabel = () => {
    if (error) return 'Audio not available'
    if (isLoading) return 'Loading...'
    if (isPlaying) return 'Playing...'
    return 'Play audio'
  }

  return (
    <div className={`inline-flex flex-col items-center gap-1 ${className}`}>
      <button
        onClick={handleClick}
        disabled={!!error}
        className={`
          inline-flex items-center justify-center
          rounded-full
          transition-all duration-card
          focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2
          ${getButtonStyles()}
          ${!isPlaying && !isLoading && !error ? 'animate-pulse-gentle' : ''}
        `}
        style={{ width: size, height: size, minWidth: size, minHeight: size }}
        aria-label={getLabel()}
      >
        {isLoading ? (
          // Loading spinner
          <svg className="w-1/2 h-1/2 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : error ? (
          // Error icon (muted speaker) - more muted styling
          <svg className="w-1/2 h-1/2 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        ) : isPlaying ? (
          // Playing icon (stop square)
          <svg className="w-1/3 h-1/3" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
        ) : (
          // Idle icon (play triangle)
          <svg className="w-1/2 h-1/2 ml-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      {/* Optional label shown below button */}
      {showLabel && (
        <span className={`text-[10px] ${error ? 'text-warm-gray/60 dark:text-muted-sand/60' : 'text-warm-gray dark:text-muted-sand'}`}>
          {getLabel()}
        </span>
      )}
    </div>
  )
}

'use client'

import { useAudio } from '@/hooks/useAudio'

interface AudioButtonProps {
  audioFile: string
  size?: number
  className?: string
}

export function AudioButton({ audioFile, size = 48, className = '' }: AudioButtonProps) {
  const { isPlaying, isLoading, error, play, stop } = useAudio(audioFile)

  const handleClick = () => {
    if (isPlaying) {
      stop()
    } else {
      play()
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={!!error}
      className={`
        inline-flex items-center justify-center
        rounded-full
        bg-sienna dark:bg-coral
        text-white
        transition-all duration-card
        hover:bg-terracotta dark:hover:bg-soft-terracotta
        focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${!isPlaying && !isLoading && !error ? 'animate-pulse-gentle' : ''}
        ${className}
      `}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      aria-label={error ? 'Audio unavailable' : isPlaying ? 'Stop audio' : 'Play audio'}
      title={error || undefined}
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
        // Error icon (muted speaker)
        <svg className="w-1/2 h-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
        // Playing icon (filled speaker with waves)
        <svg className="w-1/2 h-1/2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path
            fillRule="evenodd"
            d="M15.536 8.464a5 5 0 010 7.072l-1.414-1.414a3 3 0 000-4.243l1.414-1.415zM17.95 6.05a8 8 0 010 11.314l-1.414-1.414a6 6 0 000-8.486l1.414-1.414z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        // Idle icon (speaker)
        <svg className="w-1/2 h-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
      )}
    </button>
  )
}

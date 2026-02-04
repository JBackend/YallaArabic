'use client'

interface ProgressDotsProps {
  total: number
  current: number
  className?: string
}

export function ProgressDots({ total, current, className = '' }: ProgressDotsProps) {
  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      role="group"
      aria-label={`Progress: step ${current + 1} of ${total}`}
    >
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`
            w-2 h-2 rounded-full
            transition-all duration-progress
            ${i === current
              ? 'bg-terracotta dark:bg-soft-terracotta w-3'
              : i < current
                ? 'bg-sage dark:bg-soft-sage'
                : 'bg-warm-gray/30 dark:bg-muted-sand/30'
            }
          `}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Step {current + 1} of {total}</span>
    </div>
  )
}

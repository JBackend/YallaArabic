'use client'

import { forwardRef } from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  animate?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', animate = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          bg-sand dark:bg-warm-charcoal
          rounded-card
          shadow-sm
          p-4
          ${animate ? 'animate-card-reveal' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

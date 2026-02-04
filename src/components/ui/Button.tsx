'use client'

import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-terracotta text-white hover:bg-sienna dark:bg-soft-terracotta dark:hover:bg-coral',
  secondary: 'bg-warm-brown text-white hover:bg-charcoal dark:bg-muted-sand dark:text-deep-brown dark:hover:bg-dusty-rose',
  ghost: 'bg-transparent text-charcoal hover:bg-sand dark:text-warm-white dark:hover:bg-warm-charcoal',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center
          font-medium rounded-button
          transition-all duration-card
          focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          active:scale-95
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

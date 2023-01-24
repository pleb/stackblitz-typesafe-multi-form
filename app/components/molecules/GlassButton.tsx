import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '~/utilities/cn'
import { Button, ButtonProps } from '~/components/atoms/Button'

export type GlassButtonProps = ButtonProps & {
  backgroundClass?: string
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ children, backgroundClass, className, ...props }, ref) => (
    <Button
      ref={ref}
      className={cn(
        'border border-glass-1',
        !backgroundClass &&
          '[&]:bg-slate-300 [&:not(:disabled)]:hover:bg-slate-200 [&:not(:disabled)]:active:bg-slate-100',
        backgroundClass,
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  ),
)
GlassButton.displayName = 'GlassButton'

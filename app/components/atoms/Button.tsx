import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '~/utilities/cn'

export type ButtonProps = {
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'p-2',
        'border border-slate-300 bg-slate-400 rounded-md',
        'hover:bg-slate-200 active:bg-slate-50',
        
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
)
Button.displayName = 'Button'

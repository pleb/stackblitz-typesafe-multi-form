import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '~/utilities/cn'
import { Button, ButtonProps } from '~/components/atoms/Button'
import {
  GlassButton,
  GlassButtonProps,
} from '~/components/molecules/GlassButton'

type IconButtonProps = GlassButtonProps & {
  backgroundClass?: string
  color: 'Red' | 'Green'
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, backgroundClass, color, className, ...props }, ref) => (
    <GlassButton
      ref={ref}
      className={cn('py-1', 'px-2', className)}
      backgroundClass={cn(
        color === 'Red' &&
          '[&]:bg-red-700 [&:not(:disabled)]:hover:bg-red-500 [&:not(:disabled)]:active:bg-red-300',
        color === 'Green' &&
          '[&]:bg-green-700 [&:not(:disabled)]:hover:bg-green-500 [&:not(:disabled)]:active:bg-green-300',
      )}
      {...props}
    >
      {children}
    </GlassButton>
  ),
)
IconButton.displayName = 'IconButton'

/*
            <GlassButton
              backgroundClass='[&]:bg-green-700 [&]:hover:bg-green-500 [&]:active:bg-green-300'
              className='py-1 px-2 '
              onClick={() => onEdit(todo)}
            >
              <Edit />
            </GlassButton>
            */

import { Input as BaseInput } from '@base-ui/react/input'
import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { textVariantClasses } from './textVariants'

export type InputProps = ComponentProps<typeof BaseInput> & {
  /** Decorative icon rendered inside the leading edge of the control. */
  startIcon?: ReactNode
}

/**
 * Single-line text input styled like the `Select` trigger: `background/offset`
 * surface, `border/base` stepping to `offset` on hover and `offset/plus` on
 * focus, `status/error` when the surrounding `Field` is invalid.
 *
 * Works standalone or inside `Field`, where it picks up label, description
 * and validation wiring automatically.
 */
export function Input({ className, startIcon, ...props }: InputProps) {
  const input = (
    <BaseInput
      className={cn(
        textVariantClasses.body,
        'h-8 w-full min-w-0 rounded-md border border-border-base bg-background-offset px-2.5 text-text-primary transition-colors outline-none placeholder:text-text-secondary',
        'hover:border-border-offset focus-visible:border-border-offset-plus',
        'data-[invalid]:border-status-error data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        startIcon && 'pl-8',
        className,
      )}
      {...props}
    />
  )

  if (!startIcon) {
    return input
  }

  return (
    <div className="relative w-full">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-2.5 flex -translate-y-1/2 text-text-secondary"
      >
        {startIcon}
      </span>
      {input}
    </div>
  )
}

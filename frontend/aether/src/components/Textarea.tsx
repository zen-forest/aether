import { Field as BaseField } from '@base-ui/react/field'
import type { ComponentProps, ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/utils'

import { textVariantClasses } from './textVariants'

export type TextareaProps = Omit<ComponentProps<typeof BaseField.Control>, 'render'> &
  Pick<ComponentPropsWithoutRef<'textarea'>, 'rows' | 'cols' | 'wrap'>

/**
 * Multi-line text control: a native `<textarea>` registered as the `Field`
 * control via `Field.Control`'s `render` prop, so labels, descriptions and
 * validation work exactly as they do for `Input`. Vertically resizable.
 */
export function Textarea({ className, rows, cols, wrap, ...props }: TextareaProps) {
  return (
    <BaseField.Control
      render={<textarea rows={rows} cols={cols} wrap={wrap} />}
      className={cn(
        textVariantClasses.body,
        'min-h-20 w-full min-w-0 resize-y rounded-md border border-border-base bg-background-offset px-2.5 py-1.5 text-text-primary transition-colors outline-none placeholder:text-text-secondary',
        'hover:border-border-offset focus-visible:border-border-offset-plus',
        'data-[invalid]:border-status-error data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

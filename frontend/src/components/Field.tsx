import { Field as BaseField } from '@base-ui/react/field'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { textVariantClasses } from './textVariants'

/**
 * Groups a label, control, description and error message and wires their
 * ARIA associations. Any Base UI control (`Input`, `Textarea`, `Select`, …)
 * placed inside registers itself automatically.
 *
 * Compose: Field > FieldLabel + Input + FieldDescription + FieldError.
 * Validation comes from `validate`, `validationMode`, native constraint
 * attributes on the control, or the app-controlled `invalid` prop.
 */
export const Field = BaseField.Root

/** Label associated with the field's control; clicking it focuses the control. */
export function FieldLabel({
  className,
  ...props
}: ComponentProps<typeof BaseField.Label>) {
  return (
    <BaseField.Label
      className={cn(
        textVariantClasses.subhead,
        'text-text-primary data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

/** Helper text announced via `aria-describedby`. */
export function FieldDescription({
  className,
  ...props
}: ComponentProps<typeof BaseField.Description>) {
  return (
    <BaseField.Description
      className={cn(textVariantClasses.subhead, 'text-text-secondary', className)}
      {...props}
    />
  )
}

/**
 * Error message shown when the field fails validation. Renders nothing while
 * the field is valid; pass `match` to control visibility yourself and
 * `children` to override the computed message.
 */
export function FieldError({
  className,
  ...props
}: ComponentProps<typeof BaseField.Error>) {
  return (
    <BaseField.Error
      className={cn(textVariantClasses.subhead, 'text-status-error', className)}
      {...props}
    />
  )
}

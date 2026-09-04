import { cn } from '@/lib/utils'

import { textVariantClasses } from './textVariants'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md'

/**
 * Per-variant surface, border, and text classes.
 *
 * Monochrome: primary is the inverted surface, secondary and ghost step through
 * the surface/border scale on hover, destructive is the only status color.
 * `text/primary/inverse` on `status/error` is the higher-contrast pairing in
 * both themes (4.6:1 light, 5.0:1 dark), so no theme-specific override.
 */
export const buttonVariantClasses = {
  primary: 'bg-text-primary text-text-primary-inverse hover:opacity-90',
  secondary:
    'border border-border-base bg-background-offset text-text-primary hover:border-border-offset hover:bg-background-offset-plus',
  ghost: 'bg-transparent text-text-primary hover:bg-background-offset-plus',
  destructive: 'bg-status-error text-text-primary-inverse hover:opacity-90',
} as const satisfies Record<ButtonVariant, string>

/** Height, padding, radius, and type per size. */
export const buttonSizeClasses = {
  md: cn(textVariantClasses.body, 'h-8 rounded-md px-3'),
  sm: cn(textVariantClasses.subhead, 'h-7 rounded-sm px-2.5'),
} as const satisfies Record<ButtonSize, string>

/** Square footprint for icon-only buttons; overrides the size's horizontal padding. */
export const buttonIconOnlyClasses = {
  md: 'w-8 px-0',
  sm: 'w-7 px-0',
} as const satisfies Record<ButtonSize, string>

const buttonBaseClasses =
  'inline-flex shrink-0 cursor-default items-center justify-center gap-2 whitespace-nowrap transition-colors select-none'

const buttonFocusClasses =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-offset-plus'

const buttonDisabledClasses =
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'

/**
 * Full class string for a button look without the component, e.g. to make an
 * `<a>` or a Base UI trigger read as a button.
 */
export function buttonClasses(
  variant: ButtonVariant = 'secondary',
  size: ButtonSize = 'md',
  iconOnly = false,
): string {
  return cn(
    buttonBaseClasses,
    buttonSizeClasses[size],
    iconOnly && buttonIconOnlyClasses[size],
    buttonVariantClasses[variant],
    buttonFocusClasses,
    buttonDisabledClasses,
  )
}

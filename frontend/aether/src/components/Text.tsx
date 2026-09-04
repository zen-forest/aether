import type { ComponentPropsWithoutRef, ElementType } from 'react'

import { textVariantClasses, type TextVariant } from './textVariants'

export type { TextVariant }

/** Elements `Text` may render. Pick by semantics; `variant` picks the look. */
export type TextElement =
  | 'p'
  | 'span'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'label'
  | 'li'
  | 'dt'
  | 'dd'
  | 'figcaption'
  | 'legend'

export type TextProps<T extends TextElement = 'p'> = Omit<
  ComponentPropsWithoutRef<T>,
  'as'
> & {
  /** Rendered element. Defaults to `p`; use `span` inline and `h1`–`h4` for headings. */
  as?: T
  variant?: TextVariant
}

/**
 * Typography primitive. Every text style in the system is a `variant`; the
 * element is chosen independently so visual hierarchy never dictates markup.
 */
export function Text<T extends TextElement = 'p'>({
  as,
  variant = 'body',
  className,
  ...props
}: TextProps<T>) {
  const Component = (as ?? 'p') as ElementType
  const classes = className
    ? `${textVariantClasses[variant]} ${className}`
    : textVariantClasses[variant]

  return (
    <Component
      className={classes}
      data-text-variant={variant}
      {...(props as Record<string, unknown>)}
    />
  )
}

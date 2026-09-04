import type { ComponentPropsWithoutRef } from 'react'

import { textVariantClasses, type TextBlockVariant } from './textVariants.ts'

export type { TextBlockVariant }

export type TextBlockProps = ComponentPropsWithoutRef<'p'> & {
  variant?: TextBlockVariant
}

export function TextBlock({
  children,
  className,
  variant = 'body',
  ...props
}: TextBlockProps) {
  const classes = className
    ? `${textVariantClasses[variant]} ${className}`
    : textVariantClasses[variant]

  return (
    <p className={classes} data-text-variant={variant} {...props}>
      {children}
    </p>
  )
}

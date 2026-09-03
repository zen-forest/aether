import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from 'react'

const variantClasses = {
  'large-title': 'font-sans text-[36px] leading-[44px]',
  'title-2': 'font-sans text-[24px] leading-[32px]',
  'title-3': 'font-sans text-[17px] leading-[26px]',
  headline: 'font-sans text-[14px] font-semibold leading-[21px]',
  body: 'font-sans text-[14px] leading-[24px]',
  'body-bold': 'font-sans text-[14px] font-bold leading-[24px]',
  'body-mono': 'font-mono text-[14px] leading-[24px]',
  'body-mono-bold': 'font-mono text-[14px] font-bold leading-[24px]',
  subhead: 'font-sans text-[12px] leading-[18px]',
  'subhead-bold': 'font-sans text-[12px] font-bold leading-[18px]',
  'subhead-mono': 'font-mono text-[12px] leading-[18px]',
  'subhead-mono-bold': 'font-mono text-[12px] font-bold leading-[18px]',
  footnote: 'font-sans text-[11px] leading-[normal]',
  'caption-1': 'font-sans text-[10px] leading-[14px]',
  'caption-1-mono': 'font-mono text-[10px] leading-[14px]',
  'caption-2': 'font-sans text-[9px] leading-[14px]',
} as const

export type TextBlockVariant = keyof typeof variantClasses

type TextBlockOwnProps<E extends ElementType> = {
  as?: E
  children?: ReactNode
  className?: string
  variant?: TextBlockVariant
}

export type TextBlockProps<E extends ElementType = 'p'> =
  TextBlockOwnProps<E> &
    Omit<ComponentPropsWithoutRef<E>, keyof TextBlockOwnProps<E>>

export function TextBlock<E extends ElementType = 'p'>({
  as,
  children,
  className,
  variant = 'body',
  ...props
}: TextBlockProps<E>) {
  const Component = as ?? 'p'
  const classes = className
    ? `${variantClasses[variant]} ${className}`
    : variantClasses[variant]

  return (
    <Component className={classes} data-text-variant={variant} {...props}>
      {children}
    </Component>
  )
}

import { Button as BaseButton } from '@base-ui/react/button'
import { motion } from 'motion/react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'
import { usePressMotion } from '@/theme/usePressMotion'

import { buttonClasses, type ButtonSize, type ButtonVariant } from './buttonVariants'

type ButtonBaseProps = ComponentProps<typeof BaseButton> & {
  /** Visual emphasis. `primary` is the inverted surface; `destructive` is the only colored one. */
  variant?: ButtonVariant
  /** `md` (32px, body type) for controls; `sm` (28px, subhead type) for dense rows. */
  size?: ButtonSize
}

/** An icon-only button is square and must carry an accessible name. */
type ButtonIconOnlyProps = ButtonBaseProps & {
  iconOnly: true
  'aria-label': string
}

type ButtonLabeledProps = ButtonBaseProps & {
  iconOnly?: false
}

export type ButtonProps = ButtonIconOnlyProps | ButtonLabeledProps

/**
 * Action button built on Base UI's `Button`, styled with design tokens.
 *
 * Icons go in as children (`<PlusIcon aria-hidden="true" className="size-4" />`).
 * Set `iconOnly` for a square button; the type then requires `aria-label`.
 * Use `buttonClasses()` from `buttonVariants.ts` to give a link the same look.
 */
export function Button({
  variant = 'secondary',
  size = 'md',
  iconOnly = false,
  className,
  render,
  ...props
}: ButtonProps) {
  const motionProps = usePressMotion()

  return (
    <BaseButton
      render={render ?? <motion.button {...motionProps} />}
      className={cn(buttonClasses(variant, size, iconOnly), className)}
      {...props}
    />
  )
}

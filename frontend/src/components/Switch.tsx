import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { motion } from 'motion/react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'
import { stateMotionClasses } from '@/theme/motion'
import { usePressMotion } from '@/theme/usePressMotion'

/**
 * On/off toggle built on Base UI, styled with design tokens.
 *
 * Monochrome: the off track sits on `background/offset/plus` with a
 * `text/primary` thumb; on inverts to a `text/primary` track with a
 * `text/primary/inverse` thumb. State is styled purely through Base UI's
 * `data-checked` / `data-disabled` attributes, so it works uncontrolled,
 * controlled, or inside a Base UI `Field`.
 */
export function Switch({
  className,
  render,
  ...props
}: ComponentProps<typeof BaseSwitch.Root>) {
  const motionProps = usePressMotion()

  return (
    <BaseSwitch.Root
      render={render ?? <motion.span {...motionProps} />}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-border-offset bg-background-offset-plus p-px transition-colors',
        stateMotionClasses,
        'data-[checked]:border-text-primary data-[checked]:bg-text-primary',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-offset-plus',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        className={cn(
          'size-4 rounded-full bg-text-primary transition-[translate,background-color]',
          stateMotionClasses,
          'data-[checked]:translate-x-4 data-[checked]:bg-text-primary-inverse',
        )}
      />
    </BaseSwitch.Root>
  )
}

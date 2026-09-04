import { Switch as BaseSwitch } from '@base-ui/react/switch'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/**
 * On/off toggle built on Base UI, styled with design tokens.
 *
 * Monochrome: the off track sits on `background/offset/plus` with a
 * `text/primary` thumb; on inverts to a `text/primary` track with a
 * `text/primary/inverse` thumb. State is styled purely through Base UI's
 * `data-checked` / `data-disabled` attributes, so it works uncontrolled,
 * controlled, or inside a Base UI `Field`.
 */
export function Switch({ className, ...props }: ComponentProps<typeof BaseSwitch.Root>) {
  return (
    <BaseSwitch.Root
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-border-offset bg-background-offset-plus p-px transition-colors',
        'data-[checked]:border-text-primary data-[checked]:bg-text-primary',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-offset-plus',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        className={cn(
          'size-4 rounded-full bg-text-primary transition-transform',
          'data-[checked]:translate-x-4 data-[checked]:bg-text-primary-inverse',
        )}
      />
    </BaseSwitch.Root>
  )
}

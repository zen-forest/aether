import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { CheckIcon, MinusIcon } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/**
 * Tri-state checkbox built on Base UI, styled with design tokens.
 *
 * Unchecked sits on `background/offset` with a `border/offset` edge; checked
 * and indeterminate invert to a `text/primary` box with an inverse-colored
 * icon (check or minus). Pass `indeterminate` for the mixed state; it is
 * visual only and clears on the next user toggle via `onCheckedChange`.
 * Works uncontrolled, controlled, or inside a Base UI `Field`.
 */
export function Checkbox({
  className,
  ...props
}: ComponentProps<typeof BaseCheckbox.Root>) {
  return (
    <BaseCheckbox.Root
      className={cn(
        'inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-border-offset bg-background-offset transition-colors',
        'hover:border-border-offset-plus',
        'data-[checked]:border-text-primary data-[checked]:bg-text-primary',
        'data-[indeterminate]:border-text-primary data-[indeterminate]:bg-text-primary',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-offset-plus',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className="group flex text-text-primary-inverse">
        <CheckIcon
          aria-hidden="true"
          className="size-3 group-data-[indeterminate]:hidden"
          strokeWidth={3}
        />
        <MinusIcon
          aria-hidden="true"
          className="hidden size-3 group-data-[indeterminate]:block"
          strokeWidth={3}
        />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  )
}

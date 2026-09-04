import { Popover as BasePopover } from '@base-ui/react/popover'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { textVariantClasses } from './textVariants'

/**
 * Anchored, non-modal popup built on Base UI, styled with design tokens.
 *
 * Non-modal by default: outside clicks and Escape dismiss it, focus returns to
 * the trigger on close, and the rest of the page stays interactive. Pass Base
 * UI's `modal` prop (`true` or `'trap-focus'`) to trap focus; when you do,
 * render a `PopoverClose` inside the popup so assistive tech can escape.
 * Compose: Popover > PopoverTrigger + PopoverPopup > PopoverTitle,
 * PopoverDescription, PopoverClose.
 */
export const Popover = BasePopover.Root

/**
 * Element that toggles the popover. Renders an unstyled `<button>` so it can
 * take any button's classes or `render={<Button />}`. Exposes
 * `data-popup-open` and `data-pressed` for state styling.
 */
export const PopoverTrigger = BasePopover.Trigger

/**
 * Portal + Positioner + Popup. `side`, `align`, and `sideOffset` (default 8)
 * go to the Positioner; everything else lands on the Popup.
 */
export function PopoverPopup({
  className,
  side,
  align,
  sideOffset = 8,
  ...props
}: ComponentProps<typeof BasePopover.Popup> &
  Pick<ComponentProps<typeof BasePopover.Positioner>, 'side' | 'align' | 'sideOffset'>) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-50 outline-none"
      >
        <BasePopover.Popup
          className={cn(
            'w-72 origin-(--transform-origin) rounded-lg border border-border-base bg-background-offset p-4 text-text-primary shadow-md outline-none',
            'transition-[opacity,scale] duration-100 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
            className,
          )}
          {...props}
        />
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}

/** Heading that labels the popup (`aria-labelledby` is wired by Base UI). Renders `<h2>`. */
export function PopoverTitle({ className, ...props }: ComponentProps<typeof BasePopover.Title>) {
  return (
    <BasePopover.Title
      className={cn(textVariantClasses.headline, 'text-text-primary', className)}
      {...props}
    />
  )
}

/** Supporting copy for the popup (`aria-describedby` is wired by Base UI). Renders `<p>`. */
export function PopoverDescription({
  className,
  ...props
}: ComponentProps<typeof BasePopover.Description>) {
  return (
    <BasePopover.Description
      className={cn(textVariantClasses.subhead, 'text-text-secondary', className)}
      {...props}
    />
  )
}

/**
 * Button that closes the popover. Unstyled so callers can render it as a
 * secondary button or an icon-only control (give the latter `aria-label`).
 * Required inside the popup when `modal` is set.
 */
export const PopoverClose = BasePopover.Close

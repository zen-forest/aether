import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'
import { popupMotionClasses } from '@/theme/motion'

import { textVariantClasses } from './textVariants'

/**
 * Shares hover delay across sibling tooltips: once one is showing, adjacent
 * tooltips open instantly. Wrap a toolbar or a whole page once.
 * Defaults `delay` to 300ms.
 */
export function TooltipProvider({
  delay = 300,
  ...props
}: ComponentProps<typeof BaseTooltip.Provider>) {
  return <BaseTooltip.Provider delay={delay} {...props} />
}

/**
 * Hover/focus label built on Base UI, styled with design tokens.
 *
 * The popup is deliberately inverted (`text/primary` surface, inverse text)
 * so the monochrome tooltip stands apart from `background/offset` popups.
 * Compose: Tooltip > TooltipTrigger + TooltipPopup.
 */
export const Tooltip = BaseTooltip.Root

/**
 * Element the tooltip is anchored to. Renders a `<button>` by default; pass
 * `render` to attach it to an existing control instead of nesting buttons.
 */
export function TooltipTrigger({
  className,
  ...props
}: ComponentProps<typeof BaseTooltip.Trigger>) {
  return <BaseTooltip.Trigger className={cn('outline-none', className)} {...props} />
}

/**
 * Portal + Positioner + Popup with a small inverted arrow. `side` and
 * `sideOffset` (default 6) pass through to the Positioner.
 */
export function TooltipPopup({
  className,
  children,
  side,
  sideOffset = 6,
  align,
  ...props
}: ComponentProps<typeof BaseTooltip.Popup> &
  Pick<ComponentProps<typeof BaseTooltip.Positioner>, 'side' | 'sideOffset' | 'align'>) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        className="z-50 outline-none"
      >
        <BaseTooltip.Popup
          className={cn(
            textVariantClasses.subhead,
            'origin-(--transform-origin) rounded-sm bg-text-primary px-2 py-1 text-text-primary-inverse shadow-sm outline-none',
            popupMotionClasses,
            'data-[instant]:transition-none',
            className,
          )}
          {...props}
        >
          {children}
          <BaseTooltip.Arrow
            className={cn(
              'size-2 rotate-45 bg-text-primary',
              'data-[side=top]:-bottom-1 data-[side=bottom]:-top-1 data-[side=left]:-right-1 data-[side=right]:-left-1',
              'data-[side=inline-end]:-left-1 data-[side=inline-start]:-right-1',
            )}
          />
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  )
}

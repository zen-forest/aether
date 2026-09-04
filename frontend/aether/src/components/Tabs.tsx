import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { createContext, use, type ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { textVariantClasses } from './textVariants'

type TabsListVariant = 'line' | 'segmented'

const TabsListVariantContext = createContext<TabsListVariant>('line')

/**
 * Tabbed views built on Base UI, styled with design tokens.
 *
 * Compose: Tabs > TabsList > Tab (+ TabsIndicator for `line`), then one
 * TabsPanel per tab. The `variant` set on `TabsList` styles every `Tab`
 * inside it: `line` draws an animated underline via `TabsIndicator`;
 * `segmented` is an inset track whose active tab steps up to `offset/plus`.
 */
export const Tabs = BaseTabs.Root

/**
 * Groups the tab buttons. `line` (default) is a bottom-bordered row that
 * expects a `TabsIndicator` child; `segmented` is an inset `background/base`
 * track for use on a card.
 */
export function TabsList({
  className,
  variant = 'line',
  ...props
}: ComponentProps<typeof BaseTabs.List> & { variant?: TabsListVariant }) {
  return (
    <TabsListVariantContext value={variant}>
      <BaseTabs.List
        data-variant={variant}
        className={cn(
          'relative flex',
          variant === 'line'
            ? 'gap-4 border-b border-border-base'
            : 'gap-1 rounded-md bg-background-base p-1',
          className,
        )}
        {...props}
      />
    </TabsListVariantContext>
  )
}

/** One tab button; styles follow the enclosing `TabsList` variant. */
export function Tab({ className, ...props }: ComponentProps<typeof BaseTabs.Tab>) {
  const variant = use(TabsListVariantContext)
  return (
    <BaseTabs.Tab
      className={cn(
        textVariantClasses.body,
        'inline-flex items-center gap-1.5 text-text-secondary transition-colors outline-none select-none',
        'hover:text-text-primary data-[active]:text-text-primary',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-border-offset-plus',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        variant === 'line'
          ? 'relative px-1 pb-2'
          : 'rounded-sm px-3 py-1 data-[active]:bg-background-offset-plus data-[active]:shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Animated underline for the `line` variant. Place it inside `TabsList`
 * after the tabs; it tracks the active tab via Base UI's
 * `--active-tab-left` / `--active-tab-width` variables.
 */
export function TabsIndicator({
  className,
  ...props
}: ComponentProps<typeof BaseTabs.Indicator>) {
  return (
    <BaseTabs.Indicator
      className={cn(
        'absolute -bottom-px left-0 h-0.5 w-(--active-tab-width) translate-x-(--active-tab-left) bg-text-primary transition-[translate,width] duration-200 ease-out',
        className,
      )}
      {...props}
    />
  )
}

/** Content shown for the active tab. */
export function TabsPanel({ className, ...props }: ComponentProps<typeof BaseTabs.Panel>) {
  return (
    <BaseTabs.Panel
      className={cn(textVariantClasses.body, 'pt-4 outline-none', className)}
      {...props}
    />
  )
}

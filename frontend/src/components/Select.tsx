import { Select as BaseSelect } from '@base-ui/react/select'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { textVariantClasses } from './textVariants'

/**
 * Single-value select built on Base UI, styled with design tokens.
 *
 * Trigger and popup sit on `background/offset`; the highlighted item steps up
 * to `offset/plus`. Compose: Select > SelectTrigger + SelectPopup > SelectItem.
 */
export const Select = BaseSelect.Root

export function SelectTrigger({
  className,
  children,
  placeholder,
  ...props
}: ComponentProps<typeof BaseSelect.Trigger> & {
  /** Shown in `text/secondary` while no value is selected. */
  placeholder?: ReactNode
}) {
  return (
    <BaseSelect.Trigger
      className={cn(
        textVariantClasses.body,
        'flex h-8 w-full min-w-0 items-center justify-between gap-2 rounded-md border border-border-base bg-background-offset px-2.5 text-left text-text-primary transition-colors outline-none select-none',
        'hover:border-border-offset data-[popup-open]:border-border-offset',
        'focus-visible:border-border-offset-plus',
        'data-[placeholder]:text-text-secondary data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      {children ?? <BaseSelect.Value className="truncate" placeholder={placeholder} />}
      <BaseSelect.Icon className="flex shrink-0 text-text-secondary">
        <ChevronDownIcon aria-hidden="true" className="size-4" />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  )
}

export function SelectPopup({
  className,
  children,
  sideOffset = 4,
  ...props
}: ComponentProps<typeof BaseSelect.Popup> &
  Pick<ComponentProps<typeof BaseSelect.Positioner>, 'sideOffset' | 'align'>) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner sideOffset={sideOffset} className="z-50 outline-none">
        <BaseSelect.Popup
          className={cn(
            'min-w-(--anchor-width) origin-(--transform-origin) rounded-md border border-border-base bg-background-offset p-1 text-text-primary shadow-md outline-none',
            'transition-[opacity,scale] duration-100 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
            className,
          )}
          {...props}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
}

export function SelectItem({
  className,
  children,
  ...props
}: ComponentProps<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item
      className={cn(
        textVariantClasses.body,
        'grid cursor-default grid-cols-[1fr_1rem] items-center gap-2 rounded-md py-1 pr-2 pl-2.5 outline-none select-none',
        'data-[highlighted]:bg-background-offset-plus data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <BaseSelect.ItemText className="truncate">{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className="flex text-text-secondary">
        <CheckIcon aria-hidden="true" className="size-4" />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  )
}

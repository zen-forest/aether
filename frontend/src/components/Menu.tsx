import { Menu as BaseMenu } from '@base-ui/react/menu'
import { CheckIcon } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { popupMotionClasses } from '@/theme/motion'

import { textVariantClasses } from './textVariants'

/**
 * Action menu built on Base UI, styled with design tokens.
 *
 * Trigger and popup sit on `background/offset`; the highlighted item steps up
 * to `offset/plus`. Compose: Menu > MenuTrigger + MenuPopup > MenuItem |
 * MenuSeparator | MenuGroup > MenuGroupLabel | MenuCheckboxItem |
 * MenuRadioGroup > MenuRadioItem.
 */
export const Menu = BaseMenu.Root

/** Unstyled trigger wrapper; pass `render` to reuse an existing button element. */
export function MenuTrigger({ className, ...props }: ComponentProps<typeof BaseMenu.Trigger>) {
  return <BaseMenu.Trigger className={cn('outline-none', className)} {...props} />
}

/** Portal + positioner + popup. `sideOffset`/`align` forward to the positioner. */
export function MenuPopup({
  className,
  children,
  sideOffset = 6,
  align,
  ...props
}: ComponentProps<typeof BaseMenu.Popup> &
  Pick<ComponentProps<typeof BaseMenu.Positioner>, 'sideOffset' | 'align'>) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner sideOffset={sideOffset} align={align} className="z-50 outline-none">
        <BaseMenu.Popup
          className={cn(
            'min-w-40 origin-(--transform-origin) rounded-md border border-border-base bg-background-offset p-1 text-text-primary shadow-md outline-none',
            popupMotionClasses,
            className,
          )}
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

const itemClasses = cn(
  textVariantClasses.body,
  'flex cursor-default items-center gap-2 rounded-sm py-1 pr-2 pl-2.5 outline-none select-none',
  'data-[highlighted]:bg-background-offset-plus data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
)

const shortcutClasses = cn(
  textVariantClasses['caption-1-mono'],
  'ml-auto shrink-0 pl-4 text-text-secondary',
)

/** Plain action item with an optional leading `icon` and trailing keyboard `shortcut`. */
export function MenuItem({
  className,
  children,
  icon,
  shortcut,
  ...props
}: ComponentProps<typeof BaseMenu.Item> & { icon?: ReactNode; shortcut?: string }) {
  return (
    <BaseMenu.Item className={cn(itemClasses, className)} {...props}>
      {icon ? <span className="flex shrink-0 text-text-secondary">{icon}</span> : null}
      <span className="truncate">{children}</span>
      {shortcut ? <span className={shortcutClasses}>{shortcut}</span> : null}
    </BaseMenu.Item>
  )
}

/** Hairline between item groups. */
export function MenuSeparator({ className, ...props }: ComponentProps<typeof BaseMenu.Separator>) {
  return <BaseMenu.Separator className={cn('my-1 h-px bg-border-base', className)} {...props} />
}

/** Wraps related items so a `MenuGroupLabel` can label them. */
export const MenuGroup = BaseMenu.Group

/** Secondary caption naming a `MenuGroup`. */
export function MenuGroupLabel({ className, ...props }: ComponentProps<typeof BaseMenu.GroupLabel>) {
  return (
    <BaseMenu.GroupLabel
      className={cn(
        textVariantClasses['caption-1-mono'],
        'px-2.5 py-1 text-text-secondary select-none',
        className,
      )}
      {...props}
    />
  )
}

/** Toggleable item; a check appears when `data-checked`. */
export function MenuCheckboxItem({
  className,
  children,
  shortcut,
  ...props
}: ComponentProps<typeof BaseMenu.CheckboxItem> & { shortcut?: string }) {
  return (
    <BaseMenu.CheckboxItem className={cn(itemClasses, className)} {...props}>
      <BaseMenu.CheckboxItemIndicator
        keepMounted
        className="flex size-4 shrink-0 items-center justify-center text-text-secondary data-[unchecked]:invisible"
      >
        <CheckIcon aria-hidden="true" className="size-4" />
      </BaseMenu.CheckboxItemIndicator>
      <span className="truncate">{children}</span>
      {shortcut ? <span className={shortcutClasses}>{shortcut}</span> : null}
    </BaseMenu.CheckboxItem>
  )
}

/** Single-choice group; pass `value`/`defaultValue` and `onValueChange`. */
export const MenuRadioGroup = BaseMenu.RadioGroup

/** One choice inside a `MenuRadioGroup`; a dot appears when `data-checked`. */
export function MenuRadioItem({
  className,
  children,
  ...props
}: ComponentProps<typeof BaseMenu.RadioItem>) {
  return (
    <BaseMenu.RadioItem className={cn(itemClasses, className)} {...props}>
      <BaseMenu.RadioItemIndicator
        keepMounted
        className="flex size-4 shrink-0 items-center justify-center text-text-secondary data-[unchecked]:invisible"
      >
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      </BaseMenu.RadioItemIndicator>
      <span className="truncate">{children}</span>
    </BaseMenu.RadioItem>
  )
}

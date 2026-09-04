import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'
import { backdropMotionClasses, dialogMotionClasses } from '@/theme/motion'

import { textVariantClasses } from './textVariants'

/**
 * Modal dialog built on Base UI, styled with design tokens.
 *
 * The popup sits on `background/offset` above a `background/base` scrim.
 * Focus is trapped, page scroll is locked, and Escape / backdrop press close
 * it (`modal="trap-focus"` keeps the trap but frees scroll and outside
 * pointer events; `modal={false}` drops both). Compose:
 * Dialog > DialogTrigger + DialogPopup > DialogTitle + DialogDescription + DialogClose.
 */
export const Dialog = BaseDialog.Root

/**
 * Opens the dialog. Renders an unstyled `<button>`; wrap another control via
 * Base UI's `render` prop, which replaces the rendered element while Base UI
 * merges its own props (`onClick`, `aria-*`, `data-*`, ref) onto it:
 *
 * ```tsx
 * <DialogTrigger render={<Button variant="secondary" />}>Open</DialogTrigger>
 * ```
 *
 * `render` also accepts `(props, state) => ReactElement`. If the rendered
 * element is not a native `<button>`, pass `nativeButton={false}` so Base UI
 * adds the button role and keyboard handling itself.
 */
export function DialogTrigger({
  className,
  ...props
}: ComponentProps<typeof BaseDialog.Trigger>) {
  return (
    <BaseDialog.Trigger
      className={cn(
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Portal + backdrop + centered popup. Enter/exit animate via Base UI's
 * `data-starting-style` / `data-ending-style`. A nested dialog's popup gets
 * `data-nested` and skips its own backdrop; the parent gets
 * `data-nested-dialog-open` and recedes slightly. `className` goes on the
 * popup; use `backdropClassName` for the scrim.
 */
export function DialogPopup({
  className,
  backdropClassName,
  children,
  ...props
}: ComponentProps<typeof BaseDialog.Popup> & {
  /** Classes merged onto the backdrop scrim. */
  backdropClassName?: string
}) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop
        className={cn(
          'fixed inset-0 z-50 bg-background-base/60',
          backdropMotionClasses,
          backdropClassName,
        )}
      />
      <BaseDialog.Popup
        className={cn(
          'fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border-base bg-background-offset p-6 text-text-primary shadow-lg outline-none',
          dialogMotionClasses,
          'data-[nested-dialog-open]:scale-[0.97] data-[nested-dialog-open]:opacity-70',
          className,
        )}
        {...props}
      >
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  )
}

/** Dialog heading; Base UI labels the popup with it. Renders an `<h2>`. */
export function DialogTitle({
  className,
  ...props
}: ComponentProps<typeof BaseDialog.Title>) {
  return (
    <BaseDialog.Title
      className={cn(textVariantClasses['title-3'], 'text-text-primary', className)}
      {...props}
    />
  )
}

/** Supporting copy; Base UI wires it up as the popup's description. Renders a `<p>`. */
export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof BaseDialog.Description>) {
  return (
    <BaseDialog.Description
      className={cn(textVariantClasses.body, 'mt-1 text-text-secondary', className)}
      {...props}
    />
  )
}

/**
 * Closes the dialog. Unstyled like `DialogTrigger`; wrap a `Button` via
 * `render`. Always render one inside a modal popup so touch screen readers
 * can dismiss it.
 */
export function DialogClose({
  className,
  ...props
}: ComponentProps<typeof BaseDialog.Close>) {
  return (
    <BaseDialog.Close
      className={cn(
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

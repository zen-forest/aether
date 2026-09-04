import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/utils'

/** Bordered container whose rows are separated by hairlines. */
export function Panel({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('overflow-hidden rounded-lg border border-border-base', className)}
      {...props}
    />
  )
}

/** One row of a `Panel`; pass grid columns via `className`. */
export function PanelRow({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'grid gap-3 border-b border-border-base px-5 py-4 last:border-b-0 sm:px-6',
        className,
      )}
      {...props}
    />
  )
}

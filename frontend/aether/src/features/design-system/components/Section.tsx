import type { ReactNode } from 'react'

import { TextBlock } from '@/components/TextBlock'

export type SectionProps = {
  /** Anchor target; must match an entry in the page's section list. */
  id: string
  title: string
  intro: ReactNode
  children: ReactNode
}

/** Top-level page section: anchored heading, one-paragraph intro, then content. */
export function Section({ id, title, intro, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-16 not-first:mt-24">
      <TextBlock variant="large-title">{title}</TextBlock>
      <TextBlock className="mt-3 max-w-xl text-text-secondary">{intro}</TextBlock>
      {children}
    </section>
  )
}

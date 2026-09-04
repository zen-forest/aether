import type { ReactNode } from 'react'

import { Text } from '@/components/Text'

export type SectionProps = {
  /** Anchor target; must match an entry in the page's section list. */
  id: string
  title: string
  /** Heading element; the first section on a page is `h1`. */
  as?: 'h1' | 'h2'
  intro: ReactNode
  children: ReactNode
}

/** Top-level page section: anchored heading, one-paragraph intro, then content. */
export function Section({ id, title, as = 'h2', intro, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-16 not-first:mt-24">
      <Text as={as} variant="large-title">
        {title}
      </Text>
      <Text className="mt-3 max-w-xl text-text-secondary">{intro}</Text>
      {children}
    </section>
  )
}

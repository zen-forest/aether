import { TextBlock, type TextBlockVariant } from '@/components/TextBlock'

import { Panel, PanelRow } from './Panel'
import { Section } from './Section'

const textStyles: ReadonlyArray<{
  label: string
  sample: string
  variant: TextBlockVariant
}> = [
  { variant: 'large-title', label: 'Large title · 36/44', sample: 'Designing with clarity' },
  { variant: 'title-2', label: 'Title 2 · 24/32', sample: 'A system for product interfaces' },
  { variant: 'title-3', label: 'Title 3 · 17/26', sample: 'Typography should create useful hierarchy' },
  { variant: 'headline', label: 'Headline · 14/21', sample: 'A concise headline draws attention to what matters.' },
  { variant: 'body', label: 'Body · 14/24', sample: 'Geist is the primary typeface for readable interface copy.' },
  { variant: 'body-bold', label: 'Body bold · 14/24', sample: 'Bold body text adds emphasis without changing rhythm.' },
  { variant: 'body-mono', label: 'Body mono · 14/24', sample: 'const typeface = "Geist Mono"' },
  { variant: 'body-mono-bold', label: 'Body mono bold · 14/24', sample: 'font-weight: 700' },
  { variant: 'subhead', label: 'Subhead · 12/18', sample: 'Supporting information and compact interface copy' },
  { variant: 'subhead-bold', label: 'Subhead bold · 12/18', sample: 'Emphasized supporting information' },
  { variant: 'subhead-mono', label: 'Subhead mono · 12/18', sample: 'request_id aether_01' },
  { variant: 'subhead-mono-bold', label: 'Subhead mono bold · 12/18', sample: 'STATUS CONNECTED' },
  { variant: 'footnote', label: 'Footnote · 11/normal', sample: 'Use for supplemental details.' },
  { variant: 'caption-1', label: 'Caption 1 · 10/14', sample: 'Figure and metadata labels' },
  { variant: 'caption-1-mono', label: 'Caption 1 mono · 10/14', sample: 'UPDATED 09:41 UTC' },
  { variant: 'caption-2', label: 'Caption 2 · 9/14', sample: 'The smallest supporting label' },
]

export function TypographySection() {
  return (
    <Section
      id="typography"
      title="Typography"
      intro="Geist and Geist Mono establish the first set of reusable text styles. Element semantics stay independent from visual style."
    >
      <Panel className="mt-12">
        {textStyles.map(({ label, sample, variant }) => (
          <PanelRow
            key={variant}
            className="py-5 sm:grid-cols-[180px_1fr] sm:items-baseline"
          >
            <TextBlock variant="caption-1-mono" className="text-text-secondary">
              {label}
            </TextBlock>
            <TextBlock variant={variant}>{sample}</TextBlock>
          </PanelRow>
        ))}
      </Panel>
    </Section>
  )
}

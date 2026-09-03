import {
  TextBlock,
  type TextBlockVariant,
} from './components/TextBlock.tsx'

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

function App() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-neutral-100 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <TextBlock variant="subhead-mono" className="text-neutral-500">
          AETHER / DESIGN SYSTEM
        </TextBlock>
        <TextBlock as="h1" variant="large-title" className="mt-3">
          Typography
        </TextBlock>
        <TextBlock className="mt-3 max-w-xl text-neutral-400">
          Geist and Geist Mono establish the first set of reusable text styles.
          Element semantics stay independent from visual style.
        </TextBlock>

        <section className="mt-12 overflow-hidden rounded-2xl border border-white/10">
          {textStyles.map(({ label, sample, variant }) => (
            <div
              className="grid gap-3 border-b border-white/10 px-5 py-5 last:border-b-0 sm:grid-cols-[180px_1fr] sm:items-baseline sm:px-6"
              key={variant}
            >
              <TextBlock variant="caption-1-mono" className="text-neutral-500">
                {label}
              </TextBlock>
              <TextBlock variant={variant}>{sample}</TextBlock>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}

export default App

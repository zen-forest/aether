import { TextBlock } from '@/components/TextBlock'

import { DocumentCard, type DocumentCardProps } from './DocumentCard'
import { Section } from './Section'

const integrations: ReadonlyArray<{
  name: string
  status: string
  description: string
}> = [
  {
    name: 'MCP server',
    status: 'PLANNED',
    description:
      'Exposes tokens, components, and usage guidance to coding agents so generated UI uses the real system instead of approximations.',
  },
  {
    name: 'Figma library',
    status: 'PLANNED',
    description:
      'Tokens published as Figma variables and components linked through Code Connect, keeping design files and this page in step.',
  },
]

export function IntroductionSection({ document }: { document: DocumentCardProps }) {
  return (
    <Section
      id="introduction"
      title="Aether Design System"
      intro="A living reference for the primitives that make up Aether's interface: type, color, spacing, and the components built from them. Start with the document below, then browse each section to see the rendered result next to the tokens and components that produce it."
    >
      <div className="mt-8">
        <DocumentCard {...document} />
      </div>

      <div className="mt-12">
        <TextBlock variant="headline">Integrations</TextBlock>
        <TextBlock variant="subhead" className="mt-1 text-text-secondary">
          Where this system will be available beyond the browser.
        </TextBlock>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {integrations.map(({ name, status, description }) => (
            <div
              key={name}
              className="rounded-2xl border border-dashed border-border-offset px-5 py-5"
            >
              <div className="flex items-center justify-between gap-3">
                <TextBlock variant="headline">{name}</TextBlock>
                <TextBlock
                  variant="caption-1-mono"
                  className="rounded-full border border-border-base px-2 py-0.5 text-text-secondary"
                >
                  {status}
                </TextBlock>
              </div>
              <TextBlock variant="subhead" className="mt-2 text-text-secondary">
                {description}
              </TextBlock>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

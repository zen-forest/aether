import { Text } from '@/components/Text'

import { DocumentCard, type DocumentCardProps } from './DocumentCard'
import { Section } from './Section'

const integrations: ReadonlyArray<{
  name: string
  status: string
  description: string
}> = [
  {
    name: 'MCP server',
    status: 'AVAILABLE',
    description:
      'Run `pnpm mcp` and register `mcp/server.ts` with your agent. Exposes tokens, themes, component source, and this document.',
  },
  {
    name: 'Figma library',
    status: 'READY TO IMPORT',
    description:
      '`pnpm tokens` writes `tokens.json` in W3C Design Tokens format for Tokens Studio or the Figma Variables API. Components still need Code Connect.',
  },
]

export function IntroductionSection({ document }: { document: DocumentCardProps }) {
  return (
    <Section
      id="introduction"
      as="h1"
      title="Aether Design System"
      intro="A living reference for the primitives that make up Aether's interface: type, color, spacing, and the components built from them. Start with the document below, then browse each section to see the rendered result next to the tokens and components that produce it."
    >
      <div className="mt-8">
        <DocumentCard {...document} />
      </div>

      <div className="mt-12">
        <Text as="h3" variant="headline">
          Integrations
        </Text>
        <Text variant="subhead" className="mt-1 text-text-secondary">
          Where this system is available beyond the browser.
        </Text>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {integrations.map(({ name, status, description }) => (
            <div
              key={name}
              className="rounded-lg border border-dashed border-border-offset px-5 py-5"
            >
              <div className="flex items-center justify-between gap-3">
                <Text as="h4" variant="headline">
                  {name}
                </Text>
                <Text
                  as="span"
                  variant="caption-1-mono"
                  className="rounded-full border border-border-base px-2 py-0.5 text-text-secondary"
                >
                  {status}
                </Text>
              </div>
              <Text variant="subhead" className="mt-2 text-text-secondary">
                {description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

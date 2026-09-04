import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

import { buildTokens, serializeTokens, tokenGroups } from '../scripts/tokens.ts'
import { themes } from '../src/theme/themes.ts'

const root = path.resolve(import.meta.dirname, '..')
const componentsDir = path.join(root, 'src/components')
const designDoc = path.join(root, 'design.md')

type ComponentSummary = { name: string; exports: Array<{ name: string; summary: string }> }

/** Every `src/components/*.tsx` file with its exported functions and their first JSDoc paragraph. */
function listComponents(): ComponentSummary[] {
  const files = readdirSync(componentsDir)
    .filter((file) => file.endsWith('.tsx'))
    .sort()
  return files.map((file) => {
    const source = readFileSync(path.join(componentsDir, file), 'utf8')
    const exports: ComponentSummary['exports'] = []
    // A JSDoc block counts only when nothing but whitespace separates it from the export.
    const pattern = /(?:\/\*\*((?:(?!\*\/)[\s\S])*)\*\/\s*)?export (?:function|const) (\w+)/g
    for (const match of source.matchAll(pattern)) {
      const [, doc = '', name] = match
      const summary = doc
        .split('\n')
        .map((line) => line.replace(/^\s*\*? ?/, '').trimEnd())
        .join('\n')
        .trim()
        .split(/\n\s*\n/)[0]
        .replace(/\s*\n\s*/g, ' ')
      exports.push({ name, summary })
    }
    return { name: path.basename(file, '.tsx'), exports }
  })
}

function json(value: unknown) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(value, null, 2) }] }
}

function text(value: string) {
  return { content: [{ type: 'text' as const, text: value }] }
}

const server = new McpServer({ name: 'aether-design-system', version: '0.0.0' })

server.registerTool(
  'list_tokens',
  {
    title: 'List design tokens',
    description:
      'Aether design tokens in W3C Design Tokens (DTCG) format. Omit `group` for the whole document; pass one of color | hue | shadow | radius | typography for a single group. Colors carry per-theme values under $extensions.aether.values.',
    inputSchema: { group: z.enum(tokenGroups).optional() },
  },
  ({ group }) => {
    const document = buildTokens()
    return text(serializeTokens(group ? document[group] : document))
  },
)

server.registerTool(
  'get_theme',
  {
    title: 'Get theme',
    description: `Full theme object (semantic colors, hue palettes, shadows) for a theme id. Known ids: ${themes.map((theme) => theme.id).join(', ')}.`,
    inputSchema: { id: z.string() },
  },
  ({ id }) => {
    const theme = themes.find((candidate) => candidate.id === id)
    if (!theme) {
      return { isError: true, ...text(`Unknown theme "${id}". Known: ${themes.map((t) => t.id).join(', ')}`) }
    }
    return json(theme)
  },
)

server.registerTool(
  'list_components',
  {
    title: 'List components',
    description:
      'Every component file under src/components with its exported functions and the first paragraph of each JSDoc comment.',
  },
  () => json(listComponents()),
)

server.registerTool(
  'get_component',
  {
    title: 'Get component source',
    description: 'Full TypeScript source of src/components/<name>.tsx (e.g. "Button", "Select").',
    inputSchema: { name: z.string().regex(/^[A-Za-z0-9]+$/) },
  },
  ({ name }) => {
    const file = path.join(componentsDir, `${name}.tsx`)
    try {
      return text(readFileSync(file, 'utf8'))
    } catch {
      return { isError: true, ...text(`No component named "${name}". Use list_components to see what exists.`) }
    }
  },
)

server.registerTool(
  'get_design_doc',
  {
    title: 'Get design document',
    description: 'design.md: the source of truth for typography, color, and component usage rules.',
  },
  () => text(readFileSync(designDoc, 'utf8')),
)

server.registerResource(
  'design-doc',
  'aether://design.md',
  { title: 'Aether design document', mimeType: 'text/markdown' },
  (uri) => ({ contents: [{ uri: uri.href, mimeType: 'text/markdown', text: readFileSync(designDoc, 'utf8') }] }),
)

server.registerResource(
  'tokens',
  'aether://tokens.json',
  { title: 'Aether design tokens (DTCG)', mimeType: 'application/json' },
  (uri) => ({
    contents: [{ uri: uri.href, mimeType: 'application/json', text: serializeTokens(buildTokens()) }],
  }),
)

await server.connect(new StdioServerTransport())

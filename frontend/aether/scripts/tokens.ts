import { readFileSync } from 'node:fs'
import path from 'node:path'

import { textVariantClasses } from '../src/components/textVariants.ts'
import { defaultTheme, themes } from '../src/theme/themes.ts'
import {
  cssVariable,
  hueRoles,
  hues,
  radius,
  semanticTokens,
  shadowLevels,
  type Theme,
} from '../src/theme/tokens.ts'

/**
 * W3C Design Tokens (DTCG) document. Colors stay as the CSS strings the
 * themes declare (`#hex`, `rgb(… / a)`, `color-mix(…)`) because `color-mix`
 * has no DTCG color-object equivalent; dimensions, shadows, and typography use
 * the structured DTCG value shapes.
 */
export type TokenDocument = {
  $schema: string
  $extensions: { aether: RootExtensions }
  color: TokenGroup
  hue: TokenGroup
  shadow: TokenGroup
  radius: TokenGroup
  typography: TokenGroup
}

export type TokenGroups = keyof Omit<TokenDocument, '$schema' | '$extensions'>

export const tokenGroups = ['color', 'hue', 'shadow', 'radius', 'typography'] as const

type RootExtensions = {
  defaultTheme: string
  themes: ReadonlyArray<Pick<Theme, 'id' | 'label' | 'scheme'>>
}

type Dimension = { value: number; unit: 'px' }

type Shadow = {
  offsetX: Dimension
  offsetY: Dimension
  blur: Dimension
  spread: Dimension
  color: string
  inset?: true
}

type Typography = {
  fontFamily: ReadonlyArray<string>
  fontSize: Dimension
  fontWeight: number
  lineHeight: Dimension | 'normal'
}

type TokenValue = string | Dimension | ReadonlyArray<Shadow> | Typography

type Token = {
  $type: 'color' | 'dimension' | 'shadow' | 'typography'
  $value: TokenValue
  $description?: string
  $extensions?: { aether: Record<string, unknown> }
}

type TokenGroup = { [key: string]: Token | TokenGroup }

/**
 * Leaf name used when a token's path is also a prefix of another token's
 * path (`text/primary` vs `text/primary/inverse`). DTCG tokens cannot carry
 * child groups, so the shorter token becomes `text.primary.DEFAULT`.
 */
const DEFAULT_LEAF = 'DEFAULT'

const root = path.resolve(import.meta.dirname, '..')

/** Per-theme values for a token, keyed by theme id in declaration order. */
function themed(pick: (theme: Theme) => string): {
  $value: string
  values: Record<string, string>
} {
  const values: Record<string, string> = {}
  for (const theme of themes) values[theme.id] = pick(theme)
  return { $value: pick(defaultTheme), values }
}

function insertAtPath(group: TokenGroup, segments: ReadonlyArray<string>, token: Token): void {
  let cursor = group
  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i]
    const existing = cursor[segment]
    if (existing === undefined) {
      const next: TokenGroup = {}
      cursor[segment] = next
      cursor = next
    } else if ('$value' in existing) {
      // A token already sits here; demote it to the DEFAULT leaf of a new group.
      const next: TokenGroup = { [DEFAULT_LEAF]: existing }
      cursor[segment] = next
      cursor = next
    } else {
      cursor = existing
    }
  }
  const leaf = segments[segments.length - 1]
  const existing = cursor[leaf]
  if (existing !== undefined && !('$value' in existing)) {
    existing[DEFAULT_LEAF] = token
  } else {
    cursor[leaf] = token
  }
}

function buildColor(): TokenGroup {
  const group: TokenGroup = {}
  for (const name of semanticTokens) {
    const { $value, values } = themed((theme) => theme.semantic[name])
    insertAtPath(group, name.split('/'), {
      $type: 'color',
      $value,
      $extensions: { aether: { name, cssVariable: cssVariable(name), values } },
    })
  }
  return group
}

function buildHue(): TokenGroup {
  const group: TokenGroup = {}
  for (const hue of hues) {
    const palette: TokenGroup = {}
    for (const role of hueRoles) {
      const { $value, values } = themed((theme) => theme.hues[hue][role])
      const derived = $value.startsWith('color-mix(')
      palette[role] = {
        $type: 'color',
        $value,
        $extensions: {
          aether: {
            cssVariable: cssVariable(hue, role),
            ...(derived ? { derivedFrom: 'solid' } : {}),
            values,
          },
        },
      }
    }
    group[hue] = palette
  }
  return group
}

function px(raw: string): Dimension {
  const match = /^(-?\d*\.?\d+)(px)?$/.exec(raw)
  if (!match) throw new Error(`Not a px length: ${raw}`)
  return { value: Number(match[1]), unit: 'px' }
}

/** Split a comma-separated CSS list, ignoring commas nested in parentheses. */
function splitTopLevel(list: string): string[] {
  const parts: string[] = []
  let depth = 0
  let start = 0
  for (let i = 0; i < list.length; i++) {
    const ch = list[i]
    if (ch === '(') depth++
    else if (ch === ')') depth--
    else if (ch === ',' && depth === 0) {
      parts.push(list.slice(start, i).trim())
      start = i + 1
    }
  }
  parts.push(list.slice(start).trim())
  return parts
}

/** Parse one `box-shadow` layer: `[inset] x y [blur [spread]] color`. */
function parseShadowLayer(layer: string): Shadow {
  const words = layer.split(/\s+(?![^(]*\))/)
  const inset = words[0] === 'inset'
  if (inset) words.shift()
  const color = words.pop()
  if (color === undefined) throw new Error(`Shadow layer has no color: ${layer}`)
  const [x = '0', y = '0', blur = '0', spread = '0'] = words
  return {
    offsetX: px(x),
    offsetY: px(y),
    blur: px(blur),
    spread: px(spread),
    color,
    ...(inset ? { inset: true } : {}),
  }
}

function buildShadow(): TokenGroup {
  const group: TokenGroup = {}
  for (const level of shadowLevels) {
    const values: Record<string, Shadow[]> = {}
    const css: Record<string, string> = {}
    for (const theme of themes) {
      css[theme.id] = theme.shadows[level]
      values[theme.id] = splitTopLevel(theme.shadows[level]).map(parseShadowLayer)
    }
    group[level] = {
      $type: 'shadow',
      $value: values[defaultTheme.id],
      $extensions: { aether: { cssVariable: cssVariable('shadow', level), css, values } },
    }
  }
  return group
}

function buildRadius(): TokenGroup {
  const group: TokenGroup = {}
  for (const [step, value] of Object.entries(radius)) {
    group[step] = {
      $type: 'dimension',
      $value: px(value),
      $extensions: { aether: { cssVariable: cssVariable('radius', step as keyof typeof radius) } },
    }
  }
  return group
}

type FontStacks = Record<'sans' | 'mono', string[]>

/** Read `--font-sans` / `--font-mono` stacks from `src/index.css`. */
function fontStacks(): FontStacks {
  const css = readFileSync(path.join(root, 'src/index.css'), 'utf8')
  const stack = (name: string): string[] => {
    const match = new RegExp(`--font-${name}:\\s*([^;]+);`).exec(css)
    if (!match) throw new Error(`--font-${name} not found in src/index.css`)
    return splitTopLevel(match[1]).map((family) => family.replace(/^['"]|['"]$/g, ''))
  }
  return { sans: stack('sans'), mono: stack('mono') }
}

const fontWeights: Record<string, number> = {
  'font-normal': 400,
  'font-medium': 500,
  'font-semibold': 600,
  'font-bold': 700,
}

/** Parse a `textVariantClasses` entry into a DTCG typography value. */
function parseTypography(classes: string, fonts: FontStacks): Typography {
  let fontFamily: string[] | undefined
  let fontSize: Dimension | undefined
  let fontWeight = 400
  let lineHeight: Typography['lineHeight'] | undefined
  for (const cls of classes.split(/\s+/)) {
    if (cls === 'font-sans') fontFamily = fonts.sans
    else if (cls === 'font-mono') fontFamily = fonts.mono
    else if (cls in fontWeights) fontWeight = fontWeights[cls]
    else if (cls.startsWith('text-[')) fontSize = px(cls.slice(6, -1))
    else if (cls === 'leading-[normal]') lineHeight = 'normal'
    else if (cls.startsWith('leading-[')) lineHeight = px(cls.slice(9, -1))
    else throw new Error(`Unrecognized text variant class: ${cls}`)
  }
  if (!fontFamily || !fontSize || !lineHeight) {
    throw new Error(`Incomplete text variant: ${classes}`)
  }
  return { fontFamily, fontSize, fontWeight, lineHeight }
}

function buildTypography(): TokenGroup {
  const fonts = fontStacks()
  const group: TokenGroup = {}
  for (const [variant, classes] of Object.entries(textVariantClasses)) {
    group[variant] = {
      $type: 'typography',
      $value: parseTypography(classes, fonts),
      $extensions: { aether: { classes } },
    }
  }
  return group
}

/** Build the full DTCG document from the theme and typography sources. */
export function buildTokens(): TokenDocument {
  return {
    $schema: 'https://www.designtokens.org/schemas/2025.10/format.json',
    $extensions: {
      aether: {
        defaultTheme: defaultTheme.id,
        themes: themes.map(({ id, label, scheme }) => ({ id, label, scheme })),
      },
    },
    color: buildColor(),
    hue: buildHue(),
    shadow: buildShadow(),
    radius: buildRadius(),
    typography: buildTypography(),
  }
}

/** Serialize with 2-space indentation and a trailing newline. */
export function serializeTokens(document: TokenDocument | TokenGroup): string {
  return `${JSON.stringify(document, null, 2)}\n`
}

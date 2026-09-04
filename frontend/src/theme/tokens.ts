export const semanticTokens = [
  'text/primary',
  'text/primary/inverse',
  'text/secondary',
  'text/secondary/inverse',
  'background/base',
  'background/offset',
  'background/offset/plus',
  'border/base',
  'border/offset',
  'border/offset/plus',
  'status/success',
  'status/error',
  'status/warning',
  'status/info',
  'notification',
] as const

export type SemanticToken = (typeof semanticTokens)[number]

export const hues = [
  'red',
  'orange',
  'amber',
  'green',
  'teal',
  'blue',
  'indigo',
  'purple',
  'pink',
] as const

export type Hue = (typeof hues)[number]

/**
 * Roles within a hue palette, ordered from lightest touch to strongest.
 * `subtle` and `line` carry alpha so they compose over any background.
 */
export const hueRoles = ['subtle', 'line', 'solid', 'fg'] as const

export type HueRole = (typeof hueRoles)[number]

export type HuePalette = Record<HueRole, string>

/** Elevation steps. Values are full `box-shadow` lists and differ per theme. */
export const shadowLevels = ['sm', 'md', 'lg'] as const

export type ShadowLevel = (typeof shadowLevels)[number]

/**
 * Corner radii. Theme-independent; the only `rounded-*` utilities that exist.
 * `full` is Tailwind's built-in pill radius and is not listed here.
 */
export const radius = {
  sm: '6px',
  md: '10px',
  lg: '16px',
  xl: '24px',
} as const

export type RadiusStep = keyof typeof radius

export type Theme = {
  id: string
  label: string
  scheme: 'light' | 'dark'
  semantic: Record<SemanticToken, string>
  hues: Record<Hue, HuePalette>
  shadows: Record<ShadowLevel, string>
}

/**
 * Runtime custom-property name for a token.
 * `text/primary/inverse` → `--text-primary-inverse`; `red` + `fg` → `--red-fg`;
 * shadows → `--elevation-sm`; radii → `--radii-sm`. Tailwind's own `--shadow-*`
 * and `--radius-*` namespaces are reserved for the utilities that read these.
 */
export function cssVariable(token: SemanticToken): string
export function cssVariable(hue: Hue, role: HueRole): string
export function cssVariable(kind: 'shadow', level: ShadowLevel): string
export function cssVariable(kind: 'radius', step: RadiusStep): string
export function cssVariable(name: string, suffix?: string): string {
  if (name === 'shadow') return `--elevation-${suffix}`
  if (name === 'radius') return `--radii-${suffix}`
  const base = name.replaceAll('/', '-')
  return suffix ? `--${base}-${suffix}` : `--${base}`
}

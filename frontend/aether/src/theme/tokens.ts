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

export type Theme = {
  id: string
  label: string
  scheme: 'light' | 'dark'
  semantic: Record<SemanticToken, string>
  hues: Record<Hue, HuePalette>
}

/** `text/primary/inverse` → `--text-primary-inverse`; `red` + `fg` → `--red-fg`. */
export function cssVariable(token: SemanticToken): string
export function cssVariable(hue: Hue, role: HueRole): string
export function cssVariable(name: string, role?: HueRole): string {
  const base = name.replaceAll('/', '-')
  return role ? `--${base}-${role}` : `--${base}`
}

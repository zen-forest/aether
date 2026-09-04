import {
  cssVariable,
  hueRoles,
  hues,
  radius,
  semanticTokens,
  shadowLevels,
  type Theme,
} from './tokens.ts'

/** Custom property → value for one theme. */
export function themeVariables(theme: Theme): Record<string, string> {
  const vars: Record<string, string> = {}
  for (const token of semanticTokens) {
    vars[cssVariable(token)] = theme.semantic[token]
  }
  for (const hue of hues) {
    for (const role of hueRoles) {
      vars[cssVariable(hue, role)] = theme.hues[hue][role]
    }
  }
  for (const level of shadowLevels) {
    vars[cssVariable('shadow', level)] = theme.shadows[level]
  }
  return vars
}

function block(selector: string, declarations: Record<string, string>): string {
  const body = Object.entries(declarations)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n')
  return `${selector} {\n${body}\n}\n`
}

/**
 * Stylesheet holding every theme as CSS custom properties.
 *
 * `:root` carries radii and the default theme so markup is styled before any
 * script runs; `[data-theme="<id>"]` blocks override per theme. Switching
 * theme is therefore an attribute change, never a JS-driven repaint.
 */
export function themesCss(themes: ReadonlyArray<Theme>, defaultTheme: Theme): string {
  const radii = Object.fromEntries(
    Object.entries(radius).map(([step, value]) => [
      cssVariable('radius', step as keyof typeof radius),
      value,
    ]),
  )
  const root = block(':root', {
    ...radii,
    'color-scheme': defaultTheme.scheme,
    ...themeVariables(defaultTheme),
  })
  const perTheme = themes
    .map((theme) =>
      block(`[data-theme="${theme.id}"]`, {
        'color-scheme': theme.scheme,
        ...themeVariables(theme),
      }),
    )
    .join('\n')
  return `/* Generated from src/theme/themes.ts — do not edit. */\n${root}\n${perTheme}`
}

import {
  cssVariable,
  hueRoles,
  hues,
  semanticTokens,
  type Theme,
} from './tokens.ts'

/** Flat map of CSS custom property → value for a theme. */
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
  return vars
}

/** Write a theme's variables onto `<html>` so every token utility repaints immediately. */
export function applyTheme(theme: Theme) {
  const root = document.documentElement
  for (const [name, value] of Object.entries(themeVariables(theme))) {
    root.style.setProperty(name, value)
  }
  root.style.colorScheme = theme.scheme
  root.dataset.theme = theme.id
}

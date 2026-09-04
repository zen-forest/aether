import type { Plugin } from 'vite'

import { themesCss } from './css.ts'
import { defaultTheme, themes } from './themes.ts'

export const THEME_CSS_ID = 'virtual:aether-theme.css'

/**
 * Serves `virtual:aether-theme.css`, the stylesheet generated from
 * `src/theme/themes.ts`. Vite restarts the dev server when a config
 * dependency changes, so edits to the theme files regenerate it.
 */
export function aetherTheme(): Plugin {
  const resolvedId = `\0${THEME_CSS_ID}`
  return {
    name: 'aether-theme',
    resolveId(id) {
      return id === THEME_CSS_ID ? resolvedId : undefined
    },
    load(id) {
      return id === resolvedId ? themesCss(themes, defaultTheme) : undefined
    },
  }
}

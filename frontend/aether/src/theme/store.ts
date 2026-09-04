import { useSyncExternalStore } from 'react'

import { defaultTheme, themes } from './themes.ts'
import type { Theme } from './tokens.ts'

/** localStorage key; also read by the pre-paint script in index.html. */
export const THEME_STORAGE_KEY = 'aether-theme'

const listeners = new Set<() => void>()

function resolve(id: string | undefined): Theme {
  return themes.find((theme) => theme.id === id) ?? defaultTheme
}

// The boot script in index.html has already set data-theme; adopt it, and
// correct the attribute if it named a theme that no longer exists.
let current = resolve(document.documentElement.dataset.theme)
document.documentElement.dataset.theme = current.id

/** Switch the active theme: one attribute write, persisted for the next load. */
export function setTheme(theme: Theme) {
  if (theme === current) return
  current = theme
  document.documentElement.dataset.theme = theme.id
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme.id)
  } catch {
    // Storage may be unavailable (private mode, quota); the theme still applies.
  }
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Current theme plus setter; re-renders subscribers when the theme changes. */
export function useTheme(): [Theme, (theme: Theme) => void] {
  const theme = useSyncExternalStore(subscribe, () => current)
  return [theme, setTheme]
}

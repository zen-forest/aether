import type { Hue, HuePalette, Theme } from './tokens.ts'

/** Derive the alpha roles from a hue's solid color so they layer over any surface. */
function palette(solid: string, fg: string): HuePalette {
  return {
    subtle: `color-mix(in oklab, ${solid} 14%, transparent)`,
    line: `color-mix(in oklab, ${solid} 40%, transparent)`,
    solid,
    fg,
  }
}

const darkHues: Record<Hue, HuePalette> = {
  red: palette('#fb2c36', '#ff6467'),
  orange: palette('#ff6900', '#ff8904'),
  amber: palette('#fd9a00', '#ffb900'),
  green: palette('#00c950', '#05df72'),
  teal: palette('#00bba7', '#00d5be'),
  blue: palette('#2b7fff', '#51a2ff'),
  indigo: palette('#615fff', '#7c86ff'),
  purple: palette('#ad46ff', '#c27aff'),
  pink: palette('#f6339a', '#fb64b6'),
}

export const dark: Theme = {
  id: 'dark',
  label: 'Dark',
  scheme: 'dark',
  hues: darkHues,
  semantic: {
    'text/primary': '#f5f5f5',
    'text/primary/inverse': '#101010',
    'text/secondary': '#9a9a9a',
    'text/secondary/inverse': '#5c5c5c',
    'background/base': '#101010',
    'background/offset': '#181818',
    'background/offset/plus': '#222222',
    'border/base': 'rgb(255 255 255 / 0.10)',
    'border/offset': 'rgb(255 255 255 / 0.16)',
    'border/offset/plus': 'rgb(255 255 255 / 0.26)',
    'status/success': darkHues.green.solid,
    'status/error': darkHues.red.solid,
    'status/warning': darkHues.amber.solid,
    'status/info': darkHues.blue.solid,
    notification: darkHues.red.solid,
  },
}

const lightHues: Record<Hue, HuePalette> = {
  red: palette('#e7000b', '#c10007'),
  orange: palette('#f54a00', '#ca3500'),
  amber: palette('#e17100', '#bb4d00'),
  green: palette('#00a63e', '#008236'),
  teal: palette('#009689', '#00786f'),
  blue: palette('#155dfc', '#1447e6'),
  indigo: palette('#4f39f6', '#432dd7'),
  purple: palette('#9810fa', '#8200db'),
  pink: palette('#e60076', '#c6005c'),
}

export const light: Theme = {
  id: 'light',
  label: 'Light',
  scheme: 'light',
  hues: lightHues,
  semantic: {
    'text/primary': '#0a0a0a',
    'text/primary/inverse': '#fafafa',
    'text/secondary': '#6b6b6b',
    'text/secondary/inverse': '#a1a1a1',
    'background/base': '#ffffff',
    'background/offset': '#f5f5f5',
    'background/offset/plus': '#ebebeb',
    'border/base': 'rgb(0 0 0 / 0.10)',
    'border/offset': 'rgb(0 0 0 / 0.16)',
    'border/offset/plus': 'rgb(0 0 0 / 0.26)',
    'status/success': lightHues.green.solid,
    'status/error': lightHues.red.solid,
    'status/warning': lightHues.amber.solid,
    'status/info': lightHues.blue.solid,
    notification: lightHues.red.solid,
  },
}

export const themes: ReadonlyArray<Theme> = [dark, light]

export const defaultTheme = dark

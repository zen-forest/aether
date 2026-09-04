import { parse } from 'culori'

/** sRGB color; channels and alpha are in `[0, 1]`. */
export type Rgba = { r: number; g: number; b: number; a: number }

const COLOR_MIX = /^color-mix\(\s*in\s+oklab\s*,\s*(.+?)\s+(\d+(?:\.\d+)?)%\s*,\s*transparent\s*\)$/i

/**
 * Parse a token value into sRGB.
 *
 * Accepts anything culori parses (hex, `rgb(r g b / a)`, named colors) plus
 * the one `color-mix()` form the themes emit:
 * `color-mix(in oklab, <color> N%, transparent)`. Mixing with `transparent` in
 * a premultiplied-alpha space leaves the color channels untouched and scales
 * alpha to `N/100`, so the mix is computed directly instead of round-tripping
 * through oklab.
 */
export function parseColor(value: string): Rgba {
  const trimmed = value.trim()
  const mix = COLOR_MIX.exec(trimmed)
  if (mix) {
    const base = parseColor(mix[1])
    return { ...base, a: base.a * (Number(mix[2]) / 100) }
  }
  const parsed = parse(trimmed)
  if (!parsed || parsed.mode !== 'rgb') {
    throw new Error(`Unsupported color value: ${JSON.stringify(value)}`)
  }
  return { r: parsed.r, g: parsed.g, b: parsed.b, a: parsed.alpha ?? 1 }
}

/** Source-over: `fg` painted on top of `bg`. */
export function composite(fg: Rgba, bg: Rgba): Rgba {
  const a = fg.a + bg.a * (1 - fg.a)
  if (a === 0) return { r: 0, g: 0, b: 0, a: 0 }
  const over = (f: number, b: number) => (f * fg.a + b * bg.a * (1 - fg.a)) / a
  return { r: over(fg.r, bg.r), g: over(fg.g, bg.g), b: over(fg.b, bg.b), a }
}

function linearize(channel: number): number {
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
}

/** WCAG 2.x relative luminance of an opaque color (alpha is ignored). */
export function relativeLuminance({ r, g, b }: Rgba): number {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
}

/**
 * WCAG 2.x contrast ratio in `[1, 21]`. Both colors are treated as opaque:
 * `composite()` a translucent foreground onto its surface first.
 */
export function contrastRatio(fg: Rgba, bg: Rgba): number {
  const lf = relativeLuminance(fg)
  const lb = relativeLuminance(bg)
  const [light, dark] = lf > lb ? [lf, lb] : [lb, lf]
  return (light + 0.05) / (dark + 0.05)
}

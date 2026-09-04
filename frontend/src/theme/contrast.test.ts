import { interpolateWithPremultipliedAlpha, rgb, wcagContrast } from 'culori'
import { describe, expect, test } from 'vitest'

import { composite, contrastRatio, parseColor, type Rgba } from './contrast.ts'
import { themesCss } from './css.ts'
import { defaultTheme, themes } from './themes.ts'
import { hues, radius, type SemanticToken, type Theme } from './tokens.ts'

/** WCAG AA for body text. */
const TEXT = 4.5
/** WCAG AA for non-text UI components and graphical objects. */
const UI = 3

const surfaces = ['background/base', 'background/offset', 'background/offset/plus'] as const
const indicators = ['status/success', 'status/error', 'status/warning', 'status/info', 'notification'] as const

function semantic(theme: Theme, token: SemanticToken): Rgba {
  return parseColor(theme.semantic[token])
}

describe('parseColor', () => {
  test.each([
    ['#fb2c36', { r: 0xfb / 255, g: 0x2c / 255, b: 0x36 / 255, a: 1 }],
    ['#fff', { r: 1, g: 1, b: 1, a: 1 }],
    ['#00000080', { r: 0, g: 0, b: 0, a: 0x80 / 255 }],
    ['rgb(255 255 255 / 0.10)', { r: 1, g: 1, b: 1, a: 0.1 }],
    ['rgb(0 0 0 / 0.26)', { r: 0, g: 0, b: 0, a: 0.26 }],
    ['transparent', { r: 0, g: 0, b: 0, a: 0 }],
  ])('parses %s', (value, expected) => {
    const actual = parseColor(value)
    expect(actual.r).toBeCloseTo(expected.r, 10)
    expect(actual.g).toBeCloseTo(expected.g, 10)
    expect(actual.b).toBeCloseTo(expected.b, 10)
    expect(actual.a).toBeCloseTo(expected.a, 10)
  })

  test.each([
    ['color-mix(in oklab, #fb2c36 14%, transparent)', '#fb2c36', 0.14],
    ['color-mix(in oklab, #155dfc 40%, transparent)', '#155dfc', 0.4],
    ['color-mix(in oklab, rgb(0 0 0 / 0.5) 50%, transparent)', 'rgb(0 0 0 / 0.5)', 0.25],
  ])('%s matches a premultiplied oklab mix', (value, base, alpha) => {
    const actual = parseColor(value)
    const mixed = rgb(interpolateWithPremultipliedAlpha([base, 'transparent'], 'oklab')(1 - alpha / parseColor(base).a))
    expect(actual.r).toBeCloseTo(mixed.r, 6)
    expect(actual.g).toBeCloseTo(mixed.g, 6)
    expect(actual.b).toBeCloseTo(mixed.b, 6)
    expect(actual.a).toBeCloseTo(alpha, 10)
  })

  test.each(['color-mix(in srgb, #fff 50%, transparent)', 'color-mix(in oklab, #fff 50%, #000)', 'nonsense'])(
    'rejects %s',
    (value) => {
      expect(() => parseColor(value)).toThrow(/Unsupported color value/)
    },
  )
})

describe('composite', () => {
  test('opaque foreground replaces the background', () => {
    expect(composite(parseColor('#123456'), parseColor('#ffffff'))).toEqual(parseColor('#123456'))
  })

  test('fully transparent foreground leaves the background', () => {
    expect(composite(parseColor('transparent'), parseColor('#123456'))).toEqual(parseColor('#123456'))
  })

  test('half-alpha white over black is mid grey', () => {
    const out = composite(parseColor('rgb(255 255 255 / 0.5)'), parseColor('#000'))
    expect(out).toEqual({ r: 0.5, g: 0.5, b: 0.5, a: 1 })
  })
})

describe('contrastRatio', () => {
  test('black on white is 21:1 and symmetric', () => {
    const black = parseColor('#000')
    const white = parseColor('#fff')
    expect(contrastRatio(black, white)).toBeCloseTo(21, 10)
    expect(contrastRatio(white, black)).toBeCloseTo(21, 10)
  })

  test('identical colors are 1:1', () => {
    expect(contrastRatio(parseColor('#808080'), parseColor('#808080'))).toBe(1)
  })

  test.each([
    ['#767676', '#ffffff'],
    ['#f5f5f5', '#101010'],
    ['#6b6b6b', '#ebebeb'],
  ])('%s on %s agrees with culori', (fg, bg) => {
    expect(contrastRatio(parseColor(fg), parseColor(bg))).toBeCloseTo(wcagContrast(fg, bg), 10)
  })
})

describe.each(themes.map((theme) => [theme.id, theme] as const))('theme %s', (_id, theme) => {
  test.each(surfaces)(`text/primary on %s ≥ ${TEXT}`, (surface) => {
    expect(contrastRatio(semantic(theme, 'text/primary'), semantic(theme, surface))).toBeGreaterThanOrEqual(TEXT)
  })

  test.each(surfaces)(`text/secondary on %s ≥ ${TEXT}`, (surface) => {
    expect(contrastRatio(semantic(theme, 'text/secondary'), semantic(theme, surface))).toBeGreaterThanOrEqual(TEXT)
  })

  test(`text/primary/inverse on text/primary (inverted button) ≥ ${TEXT}`, () => {
    expect(
      contrastRatio(semantic(theme, 'text/primary/inverse'), semantic(theme, 'text/primary')),
    ).toBeGreaterThanOrEqual(TEXT)
  })

  test.each(
    hues.flatMap((hue) =>
      (['background/base', 'background/offset'] as const).map((surface) => [hue, surface] as const),
    ),
  )(`%s fg on subtle over %s ≥ ${TEXT}`, (hue, surface) => {
    const fg = parseColor(theme.hues[hue].fg)
    const bg = composite(parseColor(theme.hues[hue].subtle), semantic(theme, surface))
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(TEXT)
  })

  test.each(indicators)(`%s on background/base ≥ ${UI}`, (token) => {
    expect(contrastRatio(semantic(theme, token), semantic(theme, 'background/base'))).toBeGreaterThanOrEqual(UI)
  })
})

describe('themesCss', () => {
  const css = themesCss(themes, defaultTheme)

  test.each(themes.map((theme) => theme.id))('has a [data-theme="%s"] block', (id) => {
    expect(css).toContain(`[data-theme="${id}"] {`)
  })

  test.each(Object.entries(radius))(':root declares --radii-%s: %s', (step, value) => {
    const root = css.slice(css.indexOf(':root {'), css.indexOf('\n}\n', css.indexOf(':root {')))
    expect(root).toContain(`--radii-${step}: ${value};`)
  })
})

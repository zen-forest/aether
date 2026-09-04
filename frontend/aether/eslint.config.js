import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

/**
 * Design-token guardrails. Class strings live in Literals and template
 * chunks; each selector matches a `value` / `value.raw` against a regex.
 * `-subtle|-line|-solid|-fg` hue utilities never match because the palette
 * regex requires a numeric shade or an opacity slash after the hue.
 */
const arbitraryColorUtility =
  String.raw`\b(bg|text|border|ring|outline|fill|stroke|decoration|shadow|from|via|to|divide|accent|caret|placeholder)-\[(#|rgb|hsl|oklch|oklab|color-mix)`
const tailwindPalette =
  String.raw`\b(bg|text|border|ring|outline|fill|stroke|decoration|divide)-(white|black|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(\d{2,3}|\/)|\b(bg|text)-(white|black)\b`
const adHocFontSize = String.raw`\btext-(xs|sm|base|lg|[2-9]?xl)\b`

function restricted(pattern, message) {
  return [`Literal[value=/${pattern}/]`, `TemplateElement[value.raw=/${pattern}/]`].map(
    (selector) => ({ selector, message }),
  )
}

const colorRules = [
  ...restricted(arbitraryColorUtility, 'Use a design token utility (see design.md › Color)'),
  ...restricted(tailwindPalette, 'Use a design token utility (see design.md › Color)'),
]
const typeRules = restricted(adHocFontSize, 'Use a Text variant (textVariantClasses)')

export default defineConfig([
  globalIgnores(['dist', 'src/routeTree.gen.ts']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-restricted-syntax': ['error', ...colorRules, ...typeRules],
    },
  },
  {
    files: ['src/components/textVariants.ts'],
    rules: {
      'no-restricted-syntax': ['error', ...colorRules],
    },
  },
])

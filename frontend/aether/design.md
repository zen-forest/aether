# Aether Design System

This file is the written source of truth for the system. The live reference at `/design-system` renders it inline at the top of the page and offers it for download, then walks through each primitive: typography, then color.

## Typography

Aether uses two locally bundled variable fonts:

- **Geist** for interface and editorial text.
- **Geist Mono** for code, identifiers, measurements, and technical metadata.

Both families support weights from 100 through 900. The default weight is 400, `headline` uses 600, and variants ending in `-bold` use 700.

### Text styles

| Variant | Family | Weight | Size | Line height |
| --- | --- | ---: | ---: | ---: |
| `large-title` | Geist | 400 | 36px | 44px |
| `title-2` | Geist | 400 | 24px | 32px |
| `title-3` | Geist | 400 | 17px | 26px |
| `headline` | Geist | 600 | 14px | 21px |
| `body` | Geist | 400 | 14px | 24px |
| `body-bold` | Geist | 700 | 14px | 24px |
| `body-mono` | Geist Mono | 400 | 14px | 24px |
| `body-mono-bold` | Geist Mono | 700 | 14px | 24px |
| `subhead` | Geist | 400 | 12px | 18px |
| `subhead-bold` | Geist | 700 | 12px | 18px |
| `subhead-mono` | Geist Mono | 400 | 12px | 18px |
| `subhead-mono-bold` | Geist Mono | 700 | 12px | 18px |
| `footnote` | Geist | 400 | 11px | `normal` |
| `caption-1` | Geist | 400 | 10px | 14px |
| `caption-1-mono` | Geist Mono | 400 | 10px | 14px |
| `caption-2` | Geist | 400 | 9px | 14px |

### `TextBlock`

Import the component from `@/components/TextBlock` and select a visual style with `variant`:

```tsx
import { TextBlock } from '@/components/TextBlock'

<TextBlock variant="large-title">Account activity</TextBlock>

<TextBlock variant="body-mono">request_id aether_01</TextBlock>
```

`TextBlock` always renders a `p` and defaults to the `body` variant. Native paragraph props and `className` are forwarded to that element.

### `DocumentCard`

`src/features/design-system/components/DocumentCard.tsx` renders a markdown file inline as a collapsible document (a native `details` element, closed by default) with a file name and download button. It belongs to the design-system feature because nothing else renders documents; move it to `src/components/` if that changes. The page uses it to show this file:

```tsx
import designMdSource from '../../../design.md?raw'
import designMdUrl from '../../../design.md?url'

<DocumentCard name="design.md" source={designMdSource} href={designMdUrl} />
```

Markdown is rendered with `react-markdown` and `remark-gfm`; headings, paragraphs, lists, code, and tables map onto the text styles above.

## Color

Color is defined once as data in `src/theme/themes.ts` and applied at runtime as CSS custom properties on `<html>` by `applyTheme` (`src/theme/applyTheme.ts`). Tailwind's default palette is disabled; the only color utilities that exist are the tokens below, mapped in `src/index.css`. Switching themes rewrites the variables, so the whole app repaints without a reload.

### Semantic tokens

Named by purpose. Components should use these, not hues, unless the color *is* the meaning (tags, charts, avatars). There is deliberately no accent: the interface is monochrome, and emphasis comes from surface steps, weight, and hue palettes used sparingly.

| Token | Utility | Use |
| --- | --- | --- |
| `text/primary` | `text-text-primary` | Default foreground |
| `text/primary/inverse` | `text-text-primary-inverse` | Foreground on inverted surfaces (solid buttons, tooltips) |
| `text/secondary` | `text-text-secondary` | Supporting copy, labels, metadata |
| `text/secondary/inverse` | `text-text-secondary-inverse` | Secondary foreground on inverted surfaces |
| `background/base` | `bg-background-base` | Page canvas |
| `background/offset` | `bg-background-offset` | Raised surfaces: cards, headers, inputs |
| `background/offset/plus` | `bg-background-offset-plus` | One step further: hover, nested surfaces, inline code |
| `border/base` | `border-border-base` | Default hairline |
| `border/offset` | `border-border-offset` | Emphasized or hovered border |
| `border/offset/plus` | `border-border-offset-plus` | Strongest border, list markers, underline decoration |
| `status/success` | `text-status-success` | Aliases `green/solid` |
| `status/error` | `text-status-error` | Aliases `red/solid` |
| `status/warning` | `text-status-warning` | Aliases `amber/solid` |
| `status/info` | `text-status-info` | Aliases `blue/solid` |
| `notification` | `bg-notification` | Unread dots and badge counts |

### Hue palettes

Nine hues: `red`, `orange`, `amber`, `green`, `teal`, `blue`, `indigo`, `purple`, `pink`. Each has four roles:

| Role | Utility | Purpose |
| --- | --- | --- |
| `subtle` | `bg-red-subtle` | Ghosted fill with alpha; layers over any surface |
| `line` | `border-red-line` | Border with alpha |
| `solid` | `bg-red-solid` | The color itself, for fills and indicators |
| `fg` | `text-red-fg` | Text and icons placed on `subtle` |

A tag composes three of them:

```tsx
<span className="rounded-full border border-teal-line bg-teal-subtle text-teal-fg">
  Teal
</span>
```

`subtle` and `line` are derived from `solid` with `color-mix`, so a theme only chooses `solid` and `fg` per hue unless it wants to override the alphas.

### Themes

`themes.ts` exports `dark` (default) and `light`. A theme is a plain object: `id`, `label`, `scheme`, `semantic` (one value per semantic token), and `hues` (one palette per hue). To try an idea, add another object to the `themes` array; it appears in the sidebar switcher on `/design-system` immediately. `main.tsx` applies `defaultTheme` before the first render.

## Components

Components are Aether's own, built on [Base UI](https://base-ui.com) headless primitives (`@base-ui/react`) and styled only with the tokens and text styles above. They live in `src/components/`, one file per component, and are the sole vocabulary for interactive UI: there is no second component library and no alias layer.

### Why Base UI, not a styled kit

A styled kit ships its own color vocabulary (`card`, `muted`, `accent`, …) and its own surface model. Translating that onto `background/base → offset → offset/plus` was lossy: names collapsed onto the same step, highlights vanished, light mode never looked native. Base UI provides behavior, accessibility, positioning, and state attributes with zero styling, so every pixel comes from this document.

### Conventions

- **Surfaces.** Triggers and popups sit on `background/offset`; the highlighted or pressed item steps to `background/offset/plus`. Borders are `border/base`, `border/offset` on hover or open, `border/offset/plus` on focus.
- **State via data attributes.** Base UI exposes `data-highlighted`, `data-selected`, `data-popup-open`, `data-starting-style`, `data-ending-style`, and so on. Style them with Tailwind's `data-[…]:` variants; never track UI state in React just to pick a class.
- **Text.** Use `textVariantClasses` from `@/components/textVariants` inside components (`body` for controls, `subhead` for dense lists). Never `text-sm`-style ad hoc sizes.
- **Icons.** `lucide-react`, sized with `size-4`, `aria-hidden`.
- **Class merging.** `cn()` from `@/lib/utils` so call-site `className` overrides win.
- **Popups.** Rendered through `Portal` + `Positioner`; `#root { isolation: isolate }` in `index.css` keeps them stacked above the app. Enter and exit use `transition-*` on `data-starting-style` / `data-ending-style`.
- **Exports.** One component per file, named exports, no `index.ts` barrels. Compose parts (`Select`, `SelectTrigger`, `SelectPopup`, `SelectItem`) rather than exposing one component with many props.

### `Select`

```tsx
import { Select, SelectItem, SelectPopup, SelectTrigger } from '@/components/Select'

<Select value={value} onValueChange={setValue} items={options}>
  <SelectTrigger aria-label="Theme" />
  <SelectPopup>
    {options.map(({ value, label }) => (
      <SelectItem key={value} value={value}>{label}</SelectItem>
    ))}
  </SelectPopup>
</Select>
```

`items` lets the trigger render the selected label without waiting for the popup to mount. `SelectTrigger` renders `Select.Value` and a chevron by default; pass children to replace the value. `SelectPopup` wraps Portal, Positioner (`sideOffset` 4), and Popup. Base UI's default `alignItemWithTrigger` keeps the selected item over the trigger like a native select.

# Aether Design System

This file is the written source of truth for the system. The live reference at `/design-system` renders it inline at the top of the page and offers it for download, then walks through the foundations (typography, color, shape) and every component with live examples.

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

### `Text`

Import from `@/components/Text`. `variant` picks the look; `as` picks the element, so hierarchy never dictates markup:

```tsx
import { Text } from '@/components/Text'

<Text as="h1" variant="large-title">Account activity</Text>
<Text>Body copy defaults to a paragraph.</Text>
<Text as="span" variant="body-mono">request_id aether_01</Text>
<Text as="label" variant="subhead" htmlFor="email">Email</Text>
```

`as` accepts `p` (default), `span`, `div`, `h1`–`h4`, `label`, `li`, `dt`, `dd`, `figcaption`, `legend`; props are typed for the chosen element. Use `span` anywhere inline (inside buttons, links, summaries) — a `p` there is invalid HTML. Components that need the classes without the element (Base UI parts, `<code>`) import `textVariantClasses` from `@/components/textVariants`.

### `DocumentCard`

`src/features/design-system/components/DocumentCard.tsx` renders a markdown file inline as a collapsible document (a native `details` element, closed by default) with a file name and download button. It belongs to the design-system feature because nothing else renders documents; move it to `src/components/` if that changes. The page uses it to show this file:

```tsx
import designMdSource from '../../../design.md?raw'
import designMdUrl from '../../../design.md?url'

<DocumentCard name="design.md" source={designMdSource} href={designMdUrl} />
```

Markdown is rendered with `react-markdown` and `remark-gfm`; headings, paragraphs, lists, code, and tables map onto the text styles above.

## Color

Color is defined once as data in `src/theme/themes.ts`. A Vite plugin (`src/theme/vite-plugin.ts`) turns every theme into CSS custom properties — `:root` holds the default, `[data-theme="<id>"]` overrides per theme — served as `virtual:aether-theme.css`. Tailwind's default palette is disabled; the only color utilities that exist are the tokens below, mapped in `src/index.css`. Switching theme is a single attribute change on `<html>`; nothing is written by JavaScript.

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

`themes.ts` exports `dark` (default) and `light`. A theme is a plain object: `id`, `label`, `scheme`, `semantic` (one value per semantic token), `hues` (one palette per hue), and `shadows`. To try an idea, add another object to the `themes` array; it appears in the sidebar switcher on `/design-system` immediately.

Selection flows like this:

1. An inline script in `index.html` reads `localStorage['aether-theme']`, falls back to `prefers-color-scheme`, and sets `data-theme` before first paint. No flash.
2. `src/theme/store.ts` adopts that attribute, corrects it if it names a theme that no longer exists, and exposes `useTheme()` → `[theme, setTheme]`. `setTheme` writes the attribute and persists the id.
3. Any component may call `useTheme()`; the design-system sidebar is one consumer, not the owner.

## Shape

Radius and elevation are tokens too; Tailwind's `rounded-*` and `shadow-*` defaults are disabled (`rounded-full` remains).

| Token | Utility | Value | Use |
| --- | --- | --- | --- |
| `radius/sm` | `rounded-sm` | 6px | chips, menu items, inline code |
| `radius/md` | `rounded-md` | 10px | controls: inputs, buttons, popovers |
| `radius/lg` | `rounded-lg` | 16px | cards, panels |
| `radius/xl` | `rounded-xl` | 24px | dialogs, sheets |
| `shadow/sm` | `shadow-sm` | per theme | raised controls |
| `shadow/md` | `shadow-md` | per theme | popovers, menus |
| `shadow/lg` | `shadow-lg` | per theme | dialogs |

Radii live in `src/theme/tokens.ts` (`radius`) and are theme-independent. Shadows live on each theme in `themes.ts` because dark surfaces need heavier, tighter shadows to register. On dark themes a shadow never replaces a border; use both.

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
- **Popups.** Rendered through `Portal` + `Positioner`; `#root { isolation: isolate }` in `index.css` keeps them stacked above the app. Enter and exit use `data-starting-style` / `data-ending-style` with `transition-[opacity,scale]` — Tailwind v4's `scale-*` sets the `scale` property, so `transition-transform` alone would snap.
- **Focus rings.** `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-offset-plus` for buttons and toggles; border step-up (`focus-visible:border-border-offset-plus`) for inputs and triggers. Never add a base `outline-none` next to an outline ring: in Tailwind v4 it sets `--tw-outline-style: none`, which `outline-2` inherits, and the ring vanishes.
- **Triggers.** `DialogTrigger`, `MenuTrigger`, `PopoverTrigger`, `TooltipTrigger` are unstyled. Give them `className={buttonClasses('secondary')}` or `render={<Button />}` so they read as buttons.
- **Exports.** One component per file, named exports, no `index.ts` barrels. Compose parts (`Select`, `SelectTrigger`, `SelectPopup`, `SelectItem`) rather than exposing one component with many props.

### `Button`

Action button on Base UI's `Button`. Emphasis is monochrome: `primary` inverts the surface (`bg-text-primary text-text-primary-inverse`), `secondary` (default) sits on `background/offset` with `border/base` and steps to `offset/plus` + `border/offset` on hover, `ghost` has no surface until hover, and `destructive` is the only colored button (`bg-status-error` with inverse text, 4.6:1 light / 5.0:1 dark). Sizes: `md` is 32px, `rounded-md`, body type; `sm` is 28px, `rounded-sm`, subhead type. Focus-visible draws a 2px `border/offset/plus` outline with 2px offset; disabled buttons get `data-disabled` from Base UI and render at 50% opacity, pointer-events none. Icons go in as children.

```tsx
import { Button } from '@/components/Button'
import { buttonClasses } from '@/components/buttonVariants'

<Button variant="primary">Save</Button>
<Button size="sm">
  <PlusIcon aria-hidden="true" className="size-4" />
  New document
</Button>
<Button iconOnly aria-label="Delete" variant="destructive">
  <Trash2Icon aria-hidden="true" className="size-4" />
</Button>
<Button disabled focusableWhenDisabled>Unavailable</Button>

{/* links that look like buttons stay <a> */}
<a href="/docs" className={buttonClasses('secondary', 'md')}>Docs</a>
```

Props: `variant: 'primary' | 'secondary' | 'ghost' | 'destructive'` (default `secondary`), `size: 'sm' | 'md'` (default `md`), `iconOnly?: boolean` (square `w-8`/`w-7`, `px-0`; the props union makes `aria-label` required when set), plus every Base UI Button prop (`disabled`, `focusableWhenDisabled`, `nativeButton`, `render`). `buttonClasses(variant, size, iconOnly)` from `buttonVariants.ts` returns the same class string for non-button elements. Note: no base `outline-none` — in Tailwind v4 it sets `--tw-outline-style: none`, which `outline-2` inherits and the focus ring disappears.

### `Field`, `FieldLabel`, `FieldDescription`, `FieldError`

Wraps a control with its label, helper text and error message and wires `for`/`aria-labelledby`/`aria-describedby` automatically (Base UI `Field`). Any Base UI control inside — `Input`, `Textarea`, `Select`, `Checkbox` — registers itself. Validation comes from native constraints on the control, a `validate` callback (with `validationMode="onSubmit" | "onBlur" | "onChange"`), or the app-controlled `invalid` prop; state is exposed as `data-invalid`, `data-disabled`, `data-focused`, `data-dirty`, `data-touched`, `data-filled` on every part.

```tsx
<Field validationMode="onChange" validate={(v) => (v === '' ? 'Required.' : null)}>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" placeholder="ada@example.com" />
  <FieldDescription>We only use this for sign-in.</FieldDescription>
  <FieldError />
</Field>
```

- `Field` = `Field.Root`: `disabled`, `name`, `invalid`, `validate`, `validationMode`, `validationDebounceTime`, `actionsRef`.
- `FieldLabel`: `subhead` / `text/primary`, dims when disabled.
- `FieldDescription`: `subhead` / `text/secondary`.
- `FieldError`: `subhead` / `status/error`; renders nothing while valid. `match` (`true` or a `ValidityState` key) forces visibility; `children` overrides the computed message.

### `Input`

Single-line text control matching the `Select` trigger: `h-8`, `rounded-md`, `background/offset`, `border/base` → `border/offset` on hover → `border/offset/plus` on focus-visible, `status/error` border when its `Field` is invalid, 50% opacity when disabled. Works standalone or inside `Field`.

```tsx
<Input placeholder="Search documents" startIcon={<SearchIcon aria-hidden="true" className="size-4" />} />
```

- All Base UI `Input` props (`value`, `defaultValue`, `onValueChange`, native `<input>` attributes).
- `startIcon?: ReactNode` — decorative leading icon; adds a relative wrapper and `pl-8`.

### `Textarea`

Multi-line control: a native `<textarea>` registered as the field control through `Field.Control render={<textarea />}`, so it gets the same labelling and validation as `Input`. Same surface/border tokens, `min-h-20`, `resize-y`.

```tsx
<Field>
  <FieldLabel>Bio</FieldLabel>
  <Textarea rows={4} placeholder="A few words about yourself" />
</Field>
```

- `Field.Control` props plus `rows`, `cols`, `wrap`.

### `Select`

Single-value choice from a short list, built on `@base-ui/react/select`. Trigger and popup sit on `background/offset` (`rounded-md`, `border/base` → `border/offset` on hover/open → `border/offset/plus` on focus); the highlighted item steps to `offset/plus`; the selected item shows a check.

```tsx
import { Select, SelectItem, SelectPopup, SelectTrigger } from '@/components/Select'

<Select value={value} onValueChange={setValue} items={options}>
  <SelectTrigger aria-label="Region" placeholder="Choose a region" />
  <SelectPopup>
    {options.map(({ value, label }) => (
      <SelectItem key={value} value={value}>{label}</SelectItem>
    ))}
  </SelectPopup>
</Select>
```

`items` lets the trigger render the selected label without waiting for the popup to mount. `SelectTrigger` renders `Select.Value` (with optional `placeholder`) and a chevron by default; pass children to replace the value. `SelectPopup` wraps Portal, Positioner (`sideOffset` 4), and Popup. Base UI's default `alignItemWithTrigger` keeps the selected item over the trigger like a native select.

### `Switch`

On/off toggle built on `@base-ui/react/switch` (`Root` + `Thumb`). Monochrome: off is a `background/offset/plus` track with a `text/primary` thumb; on inverts to a `text/primary` track with a `text/primary/inverse` thumb. State is styled through Base UI's `data-checked` / `data-disabled` attributes, so it works uncontrolled, controlled, or inside a Base UI `Field`. Focus-visible draws a 2px `border/offset/plus` outline.

```tsx
import { Switch } from '@/components/Switch'

<label className="flex items-center gap-3">
  <Switch checked={enabled} onCheckedChange={setEnabled} />
  <Text as="span">Email notifications</Text>
</label>
```

Props: everything from `Switch.Root` — `checked` / `defaultChecked`, `onCheckedChange(checked, details)`, `disabled`, `readOnly`, `required`, `name` / `value` / `uncheckedValue` for forms, `inputRef`. Icon-only usage needs `aria-label`.

### `Checkbox`

Tri-state checkbox built on `@base-ui/react/checkbox` (`Root` + `Indicator`). Unchecked sits on `background/offset` with a `border/offset` edge (`border/offset/plus` on hover); checked and indeterminate invert to a `text/primary` box with an inverse lucide `Check` or `Minus`. Works uncontrolled, controlled, or inside a Base UI `Field`; for a group of options wrap in a `<label>` with `Text as="span"`.

```tsx
import { Checkbox } from '@/components/Checkbox'

<label className="flex items-center gap-3">
  <Checkbox defaultChecked name="remember" />
  <Text as="span">Remember this device</Text>
</label>

// parent / mixed state: indeterminate is a prop, clear it yourself
<Checkbox
  indeterminate={state === 'indeterminate'}
  checked={state === true}
  onCheckedChange={setState}
/>
```

Props: everything from `Checkbox.Root` — `checked` / `defaultChecked`, `indeterminate`, `onCheckedChange(checked, details)`, `disabled`, `readOnly`, `required`, `name` / `value` / `uncheckedValue`, `inputRef`, `parent` (for `CheckboxGroup`).

### `Tabs`

Switches between sibling views without leaving the page. Built on Base UI `Tabs`; compose `Tabs > TabsList > Tab (+ TabsIndicator)` with one `TabsPanel` per tab. `TabsList` picks the look for every tab inside it: `line` (default) is a hairline row where the active tab turns `text/primary` and a `TabsIndicator` slides an underline to it; `segmented` is an inset `background/base` track for cards, where the active tab steps up to `background/offset/plus` and no indicator is needed. Arrow keys move focus, Enter/Space activates; disabled tabs stay focusable but never activate.

```tsx
import { Tab, Tabs, TabsIndicator, TabsList, TabsPanel } from '@/components/Tabs'

<Tabs defaultValue="overview">
  <TabsList aria-label="Project">
    <Tab value="overview">Overview</Tab>
    <Tab value="activity">Activity</Tab>
    <Tab value="billing" disabled>Billing</Tab>
    <TabsIndicator />
  </TabsList>
  <TabsPanel value="overview">…</TabsPanel>
  <TabsPanel value="activity">…</TabsPanel>
</Tabs>

<TabsList variant="segmented" aria-label="Account">
  <Tab value="profile"><UserIcon aria-hidden="true" className="size-4" />Profile</Tab>
  …
</TabsList>
```

- `Tabs`: Base UI `Tabs.Root` — `value` / `defaultValue` / `onValueChange`, `orientation`.
- `TabsList`: `variant?: 'line' | 'segmented'` (default `line`); also `activateOnFocus`, `loopFocus` from Base UI. Give it an `aria-label`.
- `Tab`: `value`, `disabled`. Styles follow the parent `TabsList` variant; state via `data-active` / `data-disabled`.
- `TabsIndicator`: only for `line`; place after the tabs inside `TabsList`. Positioned with Base UI's `--active-tab-left` / `--active-tab-width`.
- `TabsPanel`: `value`, `keepMounted`. Body type, `pt-4`.

### `Menu`

Action menu built on Base UI `Menu`. The popup sits on `background/offset` with a `border/base` hairline and `shadow-md`; the highlighted item steps up to `background/offset/plus`; disabled items drop to 50% opacity. Checked state is shown by an indicator (check mark or dot), never by color. Keyboard: Arrow keys move highlight, Enter/Space activate, Escape closes and returns focus, typing jumps to a matching label. Compose `Menu` > `MenuTrigger` + `MenuPopup` > `MenuItem` | `MenuSeparator` | `MenuGroup` > `MenuGroupLabel` | `MenuCheckboxItem` | `MenuRadioGroup` > `MenuRadioItem`.

```tsx
import { Menu, MenuTrigger, MenuPopup, MenuItem, MenuSeparator, MenuGroup, MenuGroupLabel, MenuCheckboxItem, MenuRadioGroup, MenuRadioItem } from '@/components/Menu'

<Menu>
  <MenuTrigger render={<Button variant="secondary">Edit</Button>} />
  <MenuPopup align="start">
    <MenuItem icon={<CopyIcon aria-hidden="true" className="size-4" />} shortcut="⌘C">Copy</MenuItem>
    <MenuItem disabled>Delete</MenuItem>
    <MenuSeparator />
    <MenuGroup>
      <MenuGroupLabel>View</MenuGroupLabel>
      <MenuCheckboxItem checked={hidden} onCheckedChange={setHidden}>Hidden files</MenuCheckboxItem>
    </MenuGroup>
    <MenuSeparator />
    <MenuRadioGroup value={sort} onValueChange={setSort}>
      <MenuRadioItem value="name">Name</MenuRadioItem>
      <MenuRadioItem value="size">Size</MenuRadioItem>
    </MenuRadioGroup>
  </MenuPopup>
</Menu>
```

- `MenuTrigger` is unstyled; pass the styled button through `render` so the trigger inherits `data-popup-open`. `disabled` forwards to the button.
- `MenuPopup` renders Portal + Positioner + Popup; `sideOffset` (default 6) and `align` go to the positioner, everything else to the popup. Enter/exit: 100ms scale/opacity via `data-starting-style` / `data-ending-style`.
- `MenuItem`: optional `icon` (leading, `text/secondary`) and `shortcut` (trailing, `caption-1-mono text/secondary`). `MenuCheckboxItem` also accepts `shortcut`.
- `MenuCheckboxItem` / `MenuRadioItem` keep their indicator mounted (`keepMounted`) and hide it via `data-unchecked` so labels stay aligned. Both stay open on activation (Base UI `closeOnClick` default `false`); pass `closeOnClick` to change.
- `MenuGroup` and `MenuRadioGroup` are Base UI parts re-exported unstyled; `MenuGroupLabel` is `caption-1-mono text/secondary px-2.5 py-1`.
- Items use `rounded-sm` (6px) inside the `rounded-md` (10px) popup, per the radius table.

### `Popover`

Anchored, non-modal popup for supplementary content — a short explanation, a small form, a confirmation. Built on Base UI `Popover`. Opens on click, closes on outside click or Escape, and returns focus to its trigger; the rest of the page stays interactive. Popup sits on `background/offset` with `border/base`, `radius/lg`, `shadow/md` and 16px padding, positioned with an 8px offset and scaled in from `--transform-origin`. Title is `headline`, description is `subhead` on `text/secondary`. `PopoverTrigger` and `PopoverClose` are unstyled so any button classes (or `render={<Button />}`) apply; icon-only closes need `aria-label`. For blocking decisions use `Dialog`; for a one-line hint use `Tooltip`.

```tsx
import { Popover, PopoverClose, PopoverDescription, PopoverPopup, PopoverTitle, PopoverTrigger } from '@/components/Popover'

<Popover>
  <PopoverTrigger className={secondaryButtonClasses}>Share settings</PopoverTrigger>
  <PopoverPopup side="bottom" align="center">
    <PopoverTitle>Share settings</PopoverTitle>
    <PopoverDescription className="mt-1">Anyone with the link can view.</PopoverDescription>
    <PopoverClose className={secondaryButtonClasses}>Done</PopoverClose>
  </PopoverPopup>
</Popover>
```

Notable props: `Popover` — `open`/`defaultOpen`/`onOpenChange`, `modal` (`false` default; `true` locks scroll and blocks outside pointer events, `'trap-focus'` traps focus only — both require a `PopoverClose` inside the popup). `PopoverTrigger` — `openOnHover`, `delay`, `render`, `disabled`; exposes `data-popup-open` / `data-pressed`. `PopoverPopup` — `side` (`top | right | bottom | left | inline-start | inline-end`), `align` (`start | center | end`), `sideOffset` (default 8), `initialFocus`, `finalFocus`; exposes `data-open`, `data-starting-style`, `data-ending-style`, `data-side`, `data-align`.

### `Tooltip`

A short label revealed on hover or keyboard focus, built on `@base-ui/react/tooltip`. It is the one deliberately inverted surface: `bg-text-primary` with `text-text-primary-inverse` and a matching rotated-square arrow, so it reads as an annotation rather than another panel. Type is `subhead` (12/18), radius `sm`, shadow `sm`; it fades and scales in via `data-starting-style`/`data-ending-style`. Wrap a toolbar or page once in `TooltipProvider` (300ms delay) so adjacent tooltips open instantly once one is showing. The tooltip is not an accessible name: icon-only triggers still need `aria-label`.

```tsx
import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from '@/components/Tooltip'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger aria-label="Settings" className="…">
      <SettingsIcon aria-hidden="true" className="size-4" />
    </TooltipTrigger>
    <TooltipPopup side="bottom">Settings</TooltipPopup>
  </Tooltip>
</TooltipProvider>
```

Notable props: `TooltipProvider` — `delay` (default 300), `closeDelay`, `timeout`. `Tooltip` — `open`/`defaultOpen`/`onOpenChange`, `disabled`. `TooltipTrigger` — renders a `<button>`; pass `render={<YourControl />}` to attach to an existing control. `TooltipPopup` — `side` (`top` default, `bottom`, `left`, `right`), `sideOffset` (default 6), `align`; `className` merges via `cn()` and wins.

### `Dialog`

Modal surface for a focused task or confirmation, built on `@base-ui/react/dialog`. The popup sits on `background/offset` with `border/base`, `rounded-xl`, and `shadow-lg`, centered over a `bg-background-base/60` scrim. Base UI traps focus, locks page scroll, restores focus to the trigger on close, and dismisses on Escape, backdrop press, or `DialogClose`. Enter/exit animate from `data-starting-style` / `data-ending-style` (`opacity` + `scale`, 150ms). Nested dialogs are supported: the child gets `data-nested` (and no second backdrop), the parent gets `data-nested-dialog-open` and recedes.

```tsx
import { Dialog, DialogClose, DialogDescription, DialogPopup, DialogTitle, DialogTrigger } from '@/components/Dialog'

<Dialog>
  <DialogTrigger render={<Button variant="secondary" />}>Delete workspace</DialogTrigger>
  <DialogPopup>
    <DialogTitle>Delete this workspace?</DialogTitle>
    <DialogDescription>All documents and settings will be removed.</DialogDescription>
    <div className="mt-6 flex justify-end gap-2">
      <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
      <DialogClose render={<Button variant="primary" />}>Delete</DialogClose>
    </div>
  </DialogPopup>
</Dialog>
```

- `Dialog` is Base UI's `Root`: `open` / `defaultOpen` / `onOpenChange`, `modal` (`true` default; `'trap-focus'` keeps the trap but frees scroll and outside pointer events; `false` drops both), `disablePointerDismissal`, `actionsRef`.
- `DialogTrigger` and `DialogClose` render unstyled `<button>`s so they can wrap a `Button` via Base UI's `render` prop: pass a React element (`render={<Button />}`) or `(props, state) => element`; Base UI merges its `onClick`, `aria-*`, `data-*`, and ref onto that element. Pass `nativeButton={false}` if the rendered element is not a native button.
- `DialogPopup` wraps `Portal` + `Backdrop` + `Popup`; `className` targets the popup, `backdropClassName` the scrim. `initialFocus` / `finalFocus` pass through to Base UI's `Popup`.
- `DialogTitle` renders `<h2>` in `title-3`; `DialogDescription` renders `<p>` in `body` + `text-text-secondary`. Both are wired to `aria-labelledby` / `aria-describedby` automatically.
- Always render a `DialogClose` inside a modal popup so touch screen readers can dismiss it.

## Tooling

### Token export

`pnpm tokens` runs `scripts/export-tokens.ts` and writes `tokens.json` at the package root in W3C Design Tokens (DTCG) format, suitable for Tokens Studio or a Figma Variables API import. Groups: `color` (semantic tokens nested by `/` path; a token that is also a group prefix lives at `DEFAULT`, e.g. `color.text.primary.DEFAULT`), `hue.<hue>.<role>`, `shadow.<level>`, `radius.<step>`, `typography.<variant>`. `$value` is the default (dark) theme; per-theme values sit under `$extensions.aether.values` and the runtime custom property under `$extensions.aether.cssVariable`. Regenerate and commit whenever `src/theme/*` or `src/components/textVariants.ts` change.

### MCP server

`pnpm mcp` starts a stdio Model Context Protocol server (`mcp/server.ts`) that exposes this system to coding agents. Register it with `command: node`, `args: ["<abs path>/mcp/server.ts"]` (see `mcp/README.md` for Claude Code and Cursor config). Tools: `list_tokens` (optional `group`), `get_theme` (`id`), `list_components`, `get_component` (`name`), `get_design_doc`. Resources: `aether://design.md`, `aether://tokens.json`. Everything is read from the working tree at call time, so no rebuild is needed.

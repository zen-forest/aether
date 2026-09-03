# Aether Design System

## Typography

The live reference page starts with typography at `/design-system`.

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

Import the component from `src/components/TextBlock.tsx` and select a visual style with `variant`:

```tsx
import { TextBlock } from './components/TextBlock.tsx'

<TextBlock variant="large-title">Account activity</TextBlock>

<TextBlock variant="body-mono">request_id aether_01</TextBlock>
```

`TextBlock` always renders a `p` and defaults to the `body` variant. Native paragraph props and `className` are forwarded to that element.

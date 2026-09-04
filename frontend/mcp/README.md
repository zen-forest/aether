# Aether design-system MCP server

A stdio [Model Context Protocol](https://modelcontextprotocol.io) server that gives coding agents the real Aether tokens, themes, component source, and `design.md` so generated UI uses the system instead of approximations.

Runs directly on Node 24 (no build step): `pnpm mcp` or `node mcp/server.ts`. It reads the theme and component sources at call time, so it always reflects the working tree.

## Registering

The server resolves every path from its own file location, so the working directory does not matter. Node 24 runs the `.ts` file directly; `pnpm install` in `frontend/` must have been run once for `@modelcontextprotocol/sdk`.

### Claude Code (already done for this repo)

`/.mcp.json` at the repository root registers the server project-wide:

```json
{
  "mcpServers": {
    "aether-design-system": {
      "command": "node",
      "args": ["frontend/mcp/server.ts"]
    }
  }
}
```

Claude Code spawns it automatically when a session starts in this repo (first time, it asks you to approve the project's servers). Check with `claude mcp list` from the shell or `/mcp` inside a session; a connected server lists its five tools. Nothing needs to be running beforehand.

To register it personally instead (any directory): `claude mcp add aether-design-system -- node /abs/path/to/frontend/mcp/server.ts`.

### Cursor

`.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global):

```json
{
  "mcpServers": {
    "aether-design-system": {
      "command": "node",
      "args": ["/abs/path/to/frontend/mcp/server.ts"]
    }
  }
}
```

## Tools

| Tool | Arguments | Returns |
| --- | --- | --- |
| `list_tokens` | `group?`: `color` \| `hue` \| `shadow` \| `radius` \| `typography` \| `motion` | The W3C Design Tokens (DTCG) document, or just one top-level group. Same output as `pnpm tokens` / `tokens.json`. Themed tokens carry `$value` for the default theme and `$extensions.aether.values` keyed by theme id. |
| `get_theme` | `id`: theme id (`dark`, `light`) | The full `Theme` object from `src/theme/themes.ts`: `semantic` colors, `hues` palettes, `shadows`. Errors on an unknown id and lists the known ones. |
| `list_components` | none | Every `src/components/*.tsx` file with its exported functions and the first paragraph of each export's JSDoc. |
| `get_component` | `name`: file name without extension (`Button`, `Select`) | The full TypeScript source of that component file. |
| `get_design_doc` | none | `design.md` as markdown text. |

## Resources

| URI | MIME | Content |
| --- | --- | --- |
| `aether://design.md` | `text/markdown` | `design.md` |
| `aether://tokens.json` | `application/json` | The DTCG token document, regenerated on read |

## Token document shape

- `color.<path>` — semantic tokens nested by `/` path (`text/primary/inverse` → `color.text.primary.inverse`). When a token's path is also a group (`text/primary` vs `text/primary/inverse`) the shorter token lives at `DEFAULT` (`color.text.primary.DEFAULT`). `$extensions.aether.name` holds the original slash path and `cssVariable` the runtime custom property.
- `hue.<hue>.<role>` — `subtle`, `line`, `solid`, `fg` per hue. `subtle`/`line` are `color-mix(...)` strings derived from `solid` (`$extensions.aether.derivedFrom: "solid"`).
- `shadow.<level>` — arrays of DTCG shadow objects parsed from the CSS `box-shadow` lists; the raw CSS per theme is under `$extensions.aether.css`.
- `radius.<step>` — `dimension` tokens.
- `typography.<variant>` — `fontFamily` (stack from `src/index.css`), `fontSize`, `fontWeight`, `lineHeight` (px dimension or `"normal"`) parsed from `src/components/textVariants.ts`; the source class string is under `$extensions.aether.classes`.
- `motion.duration`, `motion.easing`, `motion.press` — semantic timings, cubic Bézier curves, and Motion spring values from `src/theme/motion.ts`.
- Root `$extensions.aether` lists `themes` (`id`, `label`, `scheme`) and `defaultTheme`.

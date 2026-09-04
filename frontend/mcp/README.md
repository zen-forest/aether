# Aether design-system MCP server

A stdio [Model Context Protocol](https://modelcontextprotocol.io) server that gives coding agents the real Aether tokens, themes, component source, and `design.md` so generated UI uses the system instead of approximations.

Runs directly on Node 24 (no build step): `pnpm mcp` or `node mcp/server.ts`. It reads the theme and component sources at call time, so it always reflects the working tree.

## Registering

The server must run with `frontend` as its working directory. Use the absolute path to `mcp/server.ts` (`realpath mcp/server.ts`).

### Claude Code

```sh
claude mcp add aether-design-system -- node /abs/path/to/frontend/mcp/server.ts
```

or in `.mcp.json` / `~/.claude.json`:

```json
{
  "mcpServers": {
    "aether-design-system": {
      "command": "node",
      "args": ["/abs/path/to/frontend/mcp/server.ts"],
      "cwd": "/abs/path/to/frontend"
    }
  }
}
```

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

Cursor has no `cwd` field; the server resolves every path from its own file location, so the working directory does not matter.

## Tools

| Tool | Arguments | Returns |
| --- | --- | --- |
| `list_tokens` | `group?`: `color` \| `hue` \| `shadow` \| `radius` \| `typography` | The W3C Design Tokens (DTCG) document, or just one top-level group. Same output as `pnpm tokens` / `tokens.json`. Themed tokens carry `$value` for the default theme and `$extensions.aether.values` keyed by theme id. |
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
- Root `$extensions.aether` lists `themes` (`id`, `label`, `scheme`) and `defaultTheme`.

import type { CSSProperties } from 'react'

import { TextBlock } from '@/components/TextBlock'
import { textVariantClasses } from '@/components/textVariants'
import {
  cssVariable,
  hueRoles,
  hues,
  semanticTokens,
  type Theme,
} from '@/theme/tokens'

import { Panel, PanelRow } from './Panel'
import { Section } from './Section'

function Swatch({ style }: { style: CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      className="size-9 shrink-0 rounded-md border border-border-base"
      style={style}
    />
  )
}

export function ColorSection({ theme }: { theme: Theme }) {
  return (
    <Section
      id="color"
      title="Color"
      intro="Every color utility resolves to a runtime variable, so switching the theme in the sidebar repaints this page and the application without a reload. Semantic tokens describe purpose; hue palettes carry identity."
    >
      <TextBlock variant="headline" className="mt-12">
        Semantic
      </TextBlock>
      <TextBlock variant="subhead" className="mt-1 text-text-secondary">
        Use these for surfaces, text, borders, and status. They are the only
        colors most components should reach for.
      </TextBlock>
      <Panel className="mt-4">
        {semanticTokens.map((token) => (
          <PanelRow key={token} className="items-center sm:grid-cols-[36px_220px_1fr]">
            <Swatch style={{ backgroundColor: `var(${cssVariable(token)})` }} />
            <TextBlock variant="subhead-mono">{token}</TextBlock>
            <TextBlock variant="caption-1-mono" className="text-text-secondary">
              {theme.semantic[token]}
            </TextBlock>
          </PanelRow>
        ))}
      </Panel>

      <TextBlock variant="headline" className="mt-12">
        Hues
      </TextBlock>
      <TextBlock variant="subhead" className="mt-1 text-text-secondary">
        Each hue has four roles: <code className="font-mono">subtle</code> for
        ghosted fills, <code className="font-mono">line</code> for borders,{' '}
        <code className="font-mono">solid</code> for the color itself, and{' '}
        <code className="font-mono">fg</code> for text on top of subtle. The
        tag on the right composes the first, second, and fourth.
      </TextBlock>
      <Panel className="mt-4">
        <PanelRow className="hidden text-text-secondary sm:grid sm:grid-cols-[80px_repeat(4,36px)_1fr] sm:items-center">
          <TextBlock variant="caption-1-mono">hue</TextBlock>
          {hueRoles.map((role) => (
            <TextBlock key={role} variant="caption-1-mono">
              {role}
            </TextBlock>
          ))}
          <TextBlock variant="caption-1-mono">example</TextBlock>
        </PanelRow>
        {hues.map((hue) => (
          <PanelRow
            key={hue}
            className="items-center sm:grid-cols-[80px_repeat(4,36px)_1fr]"
          >
            <TextBlock variant="subhead-mono">{hue}</TextBlock>
            {hueRoles.map((role) => (
              <Swatch
                key={role}
                style={{ backgroundColor: `var(${cssVariable(hue, role)})` }}
              />
            ))}
            <div>
              <span
                className={`${textVariantClasses['subhead-bold']} inline-flex items-center rounded-full border px-2.5 py-0.5`}
                style={{
                  backgroundColor: `var(${cssVariable(hue, 'subtle')})`,
                  borderColor: `var(${cssVariable(hue, 'line')})`,
                  color: `var(${cssVariable(hue, 'fg')})`,
                }}
              >
                {hue}
              </span>
            </div>
          </PanelRow>
        ))}
      </Panel>
    </Section>
  )
}

import { Text } from '@/components/Text'
import { cssVariable, radius, shadowLevels, type Theme } from '@/theme/tokens'

import { Panel, PanelRow } from './Panel'
import { Section } from './Section'

const radiusSteps = Object.entries(radius) as ReadonlyArray<
  [keyof typeof radius, string]
>

export function ShapeSection({ theme }: { theme: Theme }) {
  return (
    <Section
      id="shape"
      title="Shape"
      intro="Corner radii and elevation. Tailwind's defaults are disabled, so these are the only rounded-* and shadow-* utilities that exist. Radii are theme-independent; shadows differ per theme because dark surfaces need heavier, tighter shadows to read."
    >
      <Text as="h3" variant="headline" className="mt-12">
        Radius
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        <code className="font-mono">sm</code> for inline chips and menu items,{' '}
        <code className="font-mono">md</code> for controls,{' '}
        <code className="font-mono">lg</code> for cards and panels,{' '}
        <code className="font-mono">xl</code> for dialogs and sheets.{' '}
        <code className="font-mono">rounded-full</code> remains for pills and
        avatars.
      </Text>
      <Panel className="mt-4">
        {radiusSteps.map(([step, value]) => (
          <PanelRow key={step} className="items-center sm:grid-cols-[64px_120px_1fr]">
            <div
              aria-hidden="true"
              className="size-12 border border-border-offset bg-background-offset"
              style={{ borderRadius: `var(${cssVariable('radius', step)})` }}
            />
            <Text as="span" variant="subhead-mono">
              radius/{step}
            </Text>
            <Text as="span" variant="caption-1-mono" className="text-text-secondary">
              {value} · rounded-{step}
            </Text>
          </PanelRow>
        ))}
      </Panel>

      <Text as="h3" variant="headline" className="mt-12">
        Shadow
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        <code className="font-mono">sm</code> for raised controls,{' '}
        <code className="font-mono">md</code> for popovers and menus,{' '}
        <code className="font-mono">lg</code> for dialogs. Shadows never
        replace borders on dark themes; use both.
      </Text>
      <Panel className="mt-4">
        {shadowLevels.map((level) => (
          <PanelRow key={level} className="items-center py-6 sm:grid-cols-[64px_120px_1fr]">
            <div
              aria-hidden="true"
              className="size-12 rounded-md border border-border-base bg-background-offset"
              style={{ boxShadow: `var(${cssVariable('shadow', level)})` }}
            />
            <Text as="span" variant="subhead-mono">
              shadow/{level}
            </Text>
            <Text
              as="span"
              variant="caption-1-mono"
              className="truncate text-text-secondary"
              title={theme.shadows[level]}
            >
              {theme.shadows[level]}
            </Text>
          </PanelRow>
        ))}
      </Panel>
    </Section>
  )
}

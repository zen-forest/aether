import { InfoIcon } from 'lucide-react'
import type { ComponentProps } from 'react'

import { buttonClasses } from '@/components/buttonVariants'
import { Text } from '@/components/Text'
import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from '@/components/Tooltip'

import { Section } from './Section'

const secondaryButtonClasses = buttonClasses('secondary')

const placements = [
  { side: 'top', label: 'Top' },
  { side: 'bottom', label: 'Bottom' },
  { side: 'right', label: 'Right' },
] as const satisfies ReadonlyArray<{
  side: NonNullable<ComponentProps<typeof TooltipPopup>['side']>
  label: string
}>

export function TooltipSection() {
  return (
    <Section
      id="tooltip"
      title="Tooltip"
      intro="A short label revealed on hover or keyboard focus. Tooltips are the one inverted surface in the system: text/primary as background with inverse text, so they read as an annotation rather than another panel. Keep the copy to a few words; anything that needs a heading or an action is a Popover."
    >
      <Text as="h3" variant="headline" className="mt-12">
        Placement
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        Hover or Tab to a trigger. <code className="font-mono">side</code> on{' '}
        <code className="font-mono">TooltipPopup</code> picks the preferred
        side; Base UI flips it when there is no room. Siblings inside one{' '}
        <code className="font-mono">TooltipProvider</code> share the 300ms
        delay, so moving between them opens instantly.
      </Text>
      <TooltipProvider>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {placements.map(({ side, label }) => (
            <Tooltip key={side}>
              <TooltipTrigger className={secondaryButtonClasses}>{label}</TooltipTrigger>
              <TooltipPopup side={side}>Shown on the {side}</TooltipPopup>
            </Tooltip>
          ))}
        </div>

        <Text as="h3" variant="headline" className="mt-12">
          Icon-only trigger
        </Text>
        <Text variant="subhead" className="mt-1 text-text-secondary">
          The tooltip is not an accessible name. Icon-only triggers still need{' '}
          <code className="font-mono">aria-label</code>; the tooltip repeats or
          expands on it for sighted users.
        </Text>
        <div className="mt-4 flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger
              aria-label="About tooltips"
              className={buttonClasses('secondary', 'md', true)}
            >
              <InfoIcon aria-hidden="true" className="size-4" />
            </TooltipTrigger>
            <TooltipPopup>About tooltips</TooltipPopup>
          </Tooltip>
        </div>
      </TooltipProvider>
    </Section>
  )
}

import { Button } from '@/components/Button'
import { Select, SelectItem, SelectPopup, SelectTrigger } from '@/components/Select'
import { Switch } from '@/components/Switch'
import { Text } from '@/components/Text'
import {
  motionDurations,
  motionEasings,
  pressMotion,
  pressSpring,
} from '@/theme/motion'

import { Panel, PanelRow } from './Panel'
import { Section } from './Section'

const durations = Object.entries(motionDurations)
const easings = Object.entries(motionEasings)
const selectItems = [
  { label: 'Subtle', value: 'subtle' },
  { label: 'Direct', value: 'direct' },
  { label: 'Reduced', value: 'reduced' },
]

export function MotionSection() {
  return (
    <Section
      id="motion"
      title="Motion"
      intro="Motion explains cause and effect without slowing the interface down. Direct manipulation uses a compact Motion spring; state and position changes use short transitions; Base UI overlays use its starting and ending lifecycle states so close animations finish before unmount. Every path honors reduced-motion preferences."
    >
      <Text as="h3" variant="headline" className="mt-12">
        Patterns
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        Press each control. Feedback stays local to the element that changed; nothing moves only
        for decoration.
      </Text>
      <Panel className="mt-4">
        <PanelRow className="items-center sm:grid-cols-[140px_1fr_180px]">
          <Text as="span" variant="subhead-mono">
            Direct feedback
          </Text>
          <Text as="span" variant="subhead" className="text-text-secondary">
            Scale to {pressMotion.whileTap.scale} and return on a highly damped spring.
          </Text>
          <Button variant="primary" className="justify-self-start">
            Press me
          </Button>
        </PanelRow>
        <PanelRow className="items-center sm:grid-cols-[140px_1fr_180px]">
          <Text as="span" variant="subhead-mono">
            State change
          </Text>
          <Text as="span" variant="subhead" className="text-text-secondary">
            Color and position transition together; the control also uses press feedback.
          </Text>
          <Switch aria-label="Motion example" defaultChecked className="justify-self-start" />
        </PanelRow>
        <PanelRow className="items-center sm:grid-cols-[140px_1fr_180px]">
          <Text as="span" variant="subhead-mono">
            Overlay lifecycle
          </Text>
          <Text as="span" variant="subhead" className="text-text-secondary">
            Fade plus 0.98 scale from the anchor; exit remains mounted until it finishes.
          </Text>
          <Select defaultValue="subtle" items={selectItems}>
            <SelectTrigger aria-label="Motion style" className="w-40" />
            <SelectPopup alignItemWithTrigger={false}>
              {selectItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </PanelRow>
      </Panel>

      <Text as="h3" variant="headline" className="mt-12">
        Timing
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        Use the semantic role, not the nearest arbitrary duration. Values live in{' '}
        <code className="font-mono">src/theme/motion.ts</code> and export with the design tokens.
      </Text>
      <Panel className="mt-4">
        {durations.map(([name, seconds]) => (
          <PanelRow key={name} className="items-center sm:grid-cols-[140px_100px_1fr]">
            <Text as="span" variant="subhead-mono">
              duration/{name}
            </Text>
            <Text as="span" variant="caption-1-mono" className="text-text-secondary">
              {seconds * 1000}ms
            </Text>
            <Text as="span" variant="subhead" className="text-text-secondary">
              {name === 'feedback'
                ? 'Immediate hover and press-adjacent feedback.'
                : name === 'overlay'
                  ? 'Popup, dialog, and state transitions.'
                  : 'Movement whose destination must remain legible.'}
            </Text>
          </PanelRow>
        ))}
      </Panel>

      <Text as="h3" variant="headline" className="mt-12">
        Curves and spring
      </Text>
      <Panel className="mt-4">
        {easings.map(([name, curve]) => (
          <PanelRow key={name} className="items-center sm:grid-cols-[140px_1fr]">
            <Text as="span" variant="subhead-mono">
              easing/{name}
            </Text>
            <Text as="span" variant="caption-1-mono" className="text-text-secondary">
              cubic-bezier({curve.join(', ')})
            </Text>
          </PanelRow>
        ))}
        <PanelRow className="items-center sm:grid-cols-[140px_1fr]">
          <Text as="span" variant="subhead-mono">
            spring/press
          </Text>
          <Text as="span" variant="caption-1-mono" className="text-text-secondary">
            stiffness {pressSpring.stiffness} · damping {pressSpring.damping} · mass{' '}
            {pressSpring.mass}
          </Text>
        </PanelRow>
      </Panel>
    </Section>
  )
}

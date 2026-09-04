import { useState } from 'react'

import { Checkbox } from '@/components/Checkbox'
import { Switch } from '@/components/Switch'
import { Text } from '@/components/Text'

import { Panel, PanelRow } from './Panel'
import { Section } from './Section'

export function TogglesSection() {
  const [notifications, setNotifications] = useState(false)
  const [mixed, setMixed] = useState<'indeterminate' | boolean>('indeterminate')

  return (
    <Section
      id="toggles"
      title="Switch & Checkbox"
      intro="Binary controls. Switch flips a setting immediately; Checkbox collects choices for a form and adds an indeterminate state for parent/child selections. Both are monochrome: on inverts to text/primary with an inverse thumb or icon, off sits on an offset surface."
    >
      <Text as="h3" variant="headline" className="mt-12">
        Switch
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        Track on <code className="font-mono">background/offset/plus</code>, thumb{' '}
        <code className="font-mono">text/primary</code>; checked inverts both.
        Space toggles, focus shows a{' '}
        <code className="font-mono">border/offset/plus</code> ring.
      </Text>
      <Panel className="mt-4">
        <PanelRow className="items-center sm:grid-cols-[120px_1fr]">
          <Text as="span" variant="subhead-mono">
            default
          </Text>
          <Switch aria-label="Default switch" />
        </PanelRow>
        <PanelRow className="items-center sm:grid-cols-[120px_1fr]">
          <Text as="span" variant="subhead-mono">
            checked
          </Text>
          <Switch defaultChecked aria-label="Checked switch" />
        </PanelRow>
        <PanelRow className="items-center sm:grid-cols-[120px_1fr]">
          <Text as="span" variant="subhead-mono">
            disabled
          </Text>
          <div className="flex items-center gap-4">
            <Switch disabled aria-label="Disabled switch" />
            <Switch disabled defaultChecked aria-label="Disabled checked switch" />
          </div>
        </PanelRow>
      </Panel>

      <Text as="h3" variant="headline" className="mt-12">
        Checkbox
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        Box on <code className="font-mono">background/offset</code> with a{' '}
        <code className="font-mono">border/offset</code> edge; checked and
        indeterminate invert to <code className="font-mono">text/primary</code>{' '}
        with an inverse check or minus.
      </Text>
      <Panel className="mt-4">
        <PanelRow className="items-center sm:grid-cols-[120px_1fr]">
          <Text as="span" variant="subhead-mono">
            default
          </Text>
          <Checkbox aria-label="Default checkbox" />
        </PanelRow>
        <PanelRow className="items-center sm:grid-cols-[120px_1fr]">
          <Text as="span" variant="subhead-mono">
            checked
          </Text>
          <Checkbox defaultChecked aria-label="Checked checkbox" />
        </PanelRow>
        <PanelRow className="items-center sm:grid-cols-[120px_1fr]">
          <Text as="span" variant="subhead-mono">
            indeterminate
          </Text>
          <div className="flex items-center gap-3">
            <Checkbox
              aria-label="Indeterminate checkbox"
              indeterminate={mixed === 'indeterminate'}
              checked={mixed === true}
              onCheckedChange={(checked) => setMixed(checked)}
            />
            <Text as="span" variant="caption-1-mono" className="text-text-secondary">
              {String(mixed)} · toggling resolves it
            </Text>
          </div>
        </PanelRow>
        <PanelRow className="items-center sm:grid-cols-[120px_1fr]">
          <Text as="span" variant="subhead-mono">
            disabled
          </Text>
          <div className="flex items-center gap-4">
            <Checkbox disabled aria-label="Disabled checkbox" />
            <Checkbox disabled defaultChecked aria-label="Disabled checked checkbox" />
            <Checkbox disabled indeterminate aria-label="Disabled indeterminate checkbox" />
          </div>
        </PanelRow>
      </Panel>

      <Text as="h3" variant="headline" className="mt-12">
        Labeled
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        Wrap the control and a <code className="font-mono">Text as="span"</code>{' '}
        in a plain <code className="font-mono">label</code>; clicking the text
        toggles the control. Inside a Base UI Field use{' '}
        <code className="font-mono">Field.Label</code> instead.
      </Text>
      <Panel className="mt-4">
        <PanelRow className="items-center">
          <label className="flex w-fit items-center gap-3">
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
            <Text as="span">Email notifications</Text>
            <Text as="span" variant="caption-1-mono" className="text-text-secondary">
              {notifications ? 'on' : 'off'}
            </Text>
          </label>
        </PanelRow>
        <PanelRow className="items-center">
          <div className="flex flex-col gap-2">
            <label className="flex w-fit items-center gap-3">
              <Checkbox defaultChecked />
              <Text as="span">Remember this device</Text>
            </label>
            <label className="flex w-fit items-center gap-3">
              <Checkbox />
              <Text as="span">Subscribe to release notes</Text>
            </label>
            <label className="flex w-fit items-center gap-3">
              <Checkbox disabled />
              <Text as="span" className="text-text-secondary">
                Requires a verified email
              </Text>
            </label>
          </div>
        </PanelRow>
      </Panel>
    </Section>
  )
}

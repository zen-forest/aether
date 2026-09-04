import { useState } from 'react'

import { Select, SelectItem, SelectPopup, SelectTrigger } from '@/components/Select'
import { Text } from '@/components/Text'

import { Section } from './Section'

const regions = [
  { value: 'eu-west', label: 'Europe (West)' },
  { value: 'us-east', label: 'US (East)' },
  { value: 'ap-south', label: 'Asia Pacific (South)' },
] as const

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
] as const

export function SelectSection() {
  const [region, setRegion] = useState<string | null>(null)

  return (
    <Section
      id="select"
      title="Select"
      intro="Single-value choice from a short list. Trigger and popup sit on background/offset; the highlighted item steps to offset/plus. Pass items so the trigger can show the selected label before the popup has ever mounted."
    >
      <Text as="h3" variant="headline" className="mt-12">
        Default and placeholder
      </Text>
      <div className="mt-4 grid max-w-md gap-4 sm:grid-cols-2">
        <Select defaultValue="editor" items={roles}>
          <SelectTrigger aria-label="Role" />
          <SelectPopup>
            {roles.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <Select value={region} onValueChange={setRegion} items={regions}>
          <SelectTrigger aria-label="Region" placeholder="Choose a region" />
          <SelectPopup>
            {regions.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      </div>
      <Text variant="subhead" className="mt-2 text-text-secondary">
        Region: {region ?? 'none selected'}
      </Text>

      <Text as="h3" variant="headline" className="mt-12">
        Disabled
      </Text>
      <div className="mt-4 max-w-md sm:w-1/2">
        <Select defaultValue="viewer" items={roles} disabled>
          <SelectTrigger aria-label="Role (disabled)" />
          <SelectPopup>
            {roles.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      </div>
    </Section>
  )
}

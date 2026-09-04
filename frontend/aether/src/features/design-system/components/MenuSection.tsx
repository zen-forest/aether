import {
  ChevronDownIcon,
  CopyIcon,
  PencilIcon,
  ScissorsIcon,
  Trash2Icon,
} from 'lucide-react'
import { useState } from 'react'

import {
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuTrigger,
} from '@/components/Menu'
import { buttonClasses } from '@/components/buttonVariants'
import { Text } from '@/components/Text'

import { Panel, PanelRow } from './Panel'
import { Section } from './Section'

const triggerClasses = buttonClasses('secondary')

const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'modified', label: 'Date modified' },
  { value: 'size', label: 'Size' },
] as const

export function MenuSection() {
  const [showHidden, setShowHidden] = useState(true)
  const [showExtensions, setShowExtensions] = useState(false)
  const [sortBy, setSortBy] = useState<(typeof sortOptions)[number]['value']>('name')

  return (
    <Section
      id="menu"
      title="Menu"
      intro="A list of actions opened from a trigger. Built on Base UI Menu: popup on background/offset, highlighted item on offset/plus, checked state shown by an indicator rather than color. Arrow keys move highlight, Enter or Space activates, Escape closes, typing jumps to a matching item."
    >
      <Text as="h3" variant="headline" className="mt-12">
        Actions, checkboxes, radio group
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        Items take an optional leading icon and a trailing shortcut. Checkbox
        items stay open on click; radio items share one selected value. The
        group label sits in caption-1-mono.
      </Text>
      <Panel className="mt-4">
        <PanelRow className="items-center sm:grid-cols-[160px_1fr]">
          <Text as="span" variant="subhead-mono">
            default
          </Text>
          <div className="flex flex-wrap items-center gap-4">
            <Menu>
              <MenuTrigger
                render={
                  <button type="button" className={triggerClasses}>
                    Edit
                    <ChevronDownIcon aria-hidden="true" className="size-4 text-text-secondary" />
                  </button>
                }
              />
              <MenuPopup align="start">
                <MenuItem icon={<ScissorsIcon aria-hidden="true" className="size-4" />} shortcut="⌘X">
                  Cut
                </MenuItem>
                <MenuItem icon={<CopyIcon aria-hidden="true" className="size-4" />} shortcut="⌘C">
                  Copy
                </MenuItem>
                <MenuItem icon={<PencilIcon aria-hidden="true" className="size-4" />} shortcut="⌘E">
                  Rename
                </MenuItem>
                <MenuItem icon={<Trash2Icon aria-hidden="true" className="size-4" />} shortcut="⌫" disabled>
                  Delete
                </MenuItem>
                <MenuSeparator />
                <MenuGroup>
                  <MenuGroupLabel>View</MenuGroupLabel>
                  <MenuCheckboxItem checked={showHidden} onCheckedChange={setShowHidden} shortcut="⌘.">
                    Hidden files
                  </MenuCheckboxItem>
                  <MenuCheckboxItem checked={showExtensions} onCheckedChange={setShowExtensions}>
                    File extensions
                  </MenuCheckboxItem>
                </MenuGroup>
                <MenuSeparator />
                <MenuGroup>
                  <MenuGroupLabel>Sort by</MenuGroupLabel>
                  <MenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                    {sortOptions.map((option) => (
                      <MenuRadioItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuRadioItem>
                    ))}
                  </MenuRadioGroup>
                </MenuGroup>
              </MenuPopup>
            </Menu>
            <Text as="span" variant="subhead" className="text-text-secondary">
              hidden {showHidden ? 'on' : 'off'} · extensions{' '}
              {showExtensions ? 'on' : 'off'} · sort {sortBy}
            </Text>
          </div>
        </PanelRow>
        <PanelRow className="items-center sm:grid-cols-[160px_1fr]">
          <Text as="span" variant="subhead-mono">
            disabled trigger
          </Text>
          <div>
            <Menu>
              <MenuTrigger
                disabled
                render={
                  <button type="button" className={triggerClasses}>
                    Edit
                    <ChevronDownIcon aria-hidden="true" className="size-4 text-text-secondary" />
                  </button>
                }
              />
              <MenuPopup>
                <MenuItem>Unreachable</MenuItem>
              </MenuPopup>
            </Menu>
          </div>
        </PanelRow>
      </Panel>
    </Section>
  )
}

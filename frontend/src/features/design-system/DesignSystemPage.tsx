import designMdSource from '../../../design.md?raw'
import designMdUrl from '../../../design.md?url'

import { Text } from '@/components/Text'
import { useTheme } from '@/theme/store'

import { ButtonSection } from './components/ButtonSection'
import { ColorSection } from './components/ColorSection'
import { DialogSection } from './components/DialogSection'
import { FieldSection } from './components/FieldSection'
import { IntroductionSection } from './components/IntroductionSection'
import { MenuSection } from './components/MenuSection'
import { PopoverSection } from './components/PopoverSection'
import { SelectSection } from './components/SelectSection'
import { ShapeSection } from './components/ShapeSection'
import { TabsSection } from './components/TabsSection'
import { ThemeSelect } from './components/ThemeSelect'
import { TogglesSection } from './components/TogglesSection'
import { TooltipSection } from './components/TooltipSection'
import { TypographySection } from './components/TypographySection'

/** Sidebar groups; ids must match each section's `<Section id>`. */
const navigation: ReadonlyArray<{
  group: string
  items: ReadonlyArray<{ id: string; label: string }>
}> = [
  {
    group: 'Foundations',
    items: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'typography', label: 'Typography' },
      { id: 'color', label: 'Color' },
      { id: 'shape', label: 'Shape' },
    ],
  },
  {
    group: 'Components',
    items: [
      { id: 'button', label: 'Button' },
      { id: 'field', label: 'Field & Input' },
      { id: 'select', label: 'Select' },
      { id: 'toggles', label: 'Switch & Checkbox' },
      { id: 'tabs', label: 'Tabs' },
      { id: 'menu', label: 'Menu' },
      { id: 'popover', label: 'Popover' },
      { id: 'tooltip', label: 'Tooltip' },
      { id: 'dialog', label: 'Dialog' },
    ],
  },
]

function DesignSystemPage() {
  const [theme, setTheme] = useTheme()

  return (
    <div className="min-h-screen bg-background-base text-text-primary lg:flex">
      <aside className="border-b border-border-base px-6 py-8 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-56 lg:shrink-0 lg:flex-col lg:border-b-0 lg:border-r lg:px-6 lg:py-10">
        <Text variant="subhead-mono" className="text-text-secondary">
          AETHER / DESIGN SYSTEM
        </Text>
        <nav
          aria-label="Design system sections"
          className="mt-6 flex flex-wrap gap-x-8 gap-y-4 lg:min-h-0 lg:flex-1 lg:flex-col lg:flex-nowrap lg:gap-6 lg:overflow-y-auto"
        >
          {navigation.map(({ group, items }) => (
            <div key={group}>
              <Text
                as="span"
                variant="caption-1-mono"
                className="block text-text-secondary uppercase"
              >
                {group}
              </Text>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 lg:flex-col lg:gap-1">
                {items.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="block rounded-sm text-text-secondary transition-colors hover:text-text-primary lg:-mx-2 lg:px-2 lg:py-1 lg:hover:bg-background-offset"
                    >
                      <Text as="span" variant="subhead" className="text-inherit">
                        {label}
                      </Text>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="mt-8">
          <ThemeSelect value={theme} onChange={setTheme} />
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <IntroductionSection
            document={{ name: 'design.md', source: designMdSource, href: designMdUrl }}
          />
          <TypographySection />
          <ColorSection theme={theme} />
          <ShapeSection theme={theme} />

          <ButtonSection />
          <FieldSection />
          <SelectSection />
          <TogglesSection />
          <TabsSection />
          <MenuSection />
          <PopoverSection />
          <TooltipSection />
          <DialogSection />
        </div>
      </main>
    </div>
  )
}

export default DesignSystemPage

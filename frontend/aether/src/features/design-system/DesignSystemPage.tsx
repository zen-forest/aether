import { useState } from 'react'

import designMdSource from '../../../design.md?raw'
import designMdUrl from '../../../design.md?url'

import { TextBlock } from '@/components/TextBlock'
import { applyTheme } from '@/theme/applyTheme'
import { defaultTheme } from '@/theme/themes'

import { ColorSection } from './components/ColorSection'
import { IntroductionSection } from './components/IntroductionSection'
import { ThemeSelect } from './components/ThemeSelect'
import { TypographySection } from './components/TypographySection'

const sections: ReadonlyArray<{ id: string; label: string }> = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'typography', label: 'Typography' },
  { id: 'color', label: 'Color' },
]

function DesignSystemPage() {
  const [theme, setTheme] = useState(defaultTheme)

  return (
    <div className="min-h-screen bg-background-base text-text-primary lg:flex">
      <aside className="border-b border-border-base px-6 py-8 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-56 lg:shrink-0 lg:flex-col lg:border-b-0 lg:border-r lg:px-6 lg:py-10">
        <TextBlock variant="subhead-mono" className="text-text-secondary">
          AETHER / DESIGN SYSTEM
        </TextBlock>
        <nav aria-label="Design system sections" className="mt-6 lg:flex-1">
          <ul className="flex gap-4 lg:flex-col lg:gap-1">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="block rounded-md text-text-secondary transition-colors hover:text-text-primary lg:-mx-2 lg:px-2 lg:py-1.5 lg:hover:bg-background-offset"
                >
                  <TextBlock variant="subhead" className="text-inherit">
                    {label}
                  </TextBlock>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8">
          <ThemeSelect
            value={theme}
            onChange={(next) => {
              applyTheme(next)
              setTheme(next)
            }}
          />
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <IntroductionSection
            document={{ name: 'design.md', source: designMdSource, href: designMdUrl }}
          />
          <TypographySection />
          <ColorSection theme={theme} />
        </div>
      </main>
    </div>
  )
}

export default DesignSystemPage

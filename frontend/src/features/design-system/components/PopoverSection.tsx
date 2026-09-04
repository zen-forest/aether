import { XIcon } from 'lucide-react'

import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/Popover'
import { buttonClasses } from '@/components/buttonVariants'
import { Text } from '@/components/Text'
import { cn } from '@/lib/utils'

import { Section } from './Section'

const secondaryButton = buttonClasses('secondary')

const iconButton = cn(
  'inline-flex size-6 shrink-0 items-center justify-center rounded-md text-text-secondary transition-colors outline-none',
  'hover:bg-background-offset-plus hover:text-text-primary focus-visible:bg-background-offset-plus focus-visible:text-text-primary',
)

export function PopoverSection() {
  return (
    <Section
      id="popover"
      title="Popover"
      intro="An anchored, non-modal surface for supplementary content: a short explanation, a small form, a confirmation. It opens on click, closes on outside click or Escape, and returns focus to its trigger. For blocking decisions use a Dialog; for a one-line hint use a Tooltip."
    >
      <Text as="h3" variant="headline" className="mt-12">
        Default
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        Popup on <code className="font-mono">background/offset</code> with{' '}
        <code className="font-mono">shadow/md</code>, positioned below the
        trigger with an 8px offset. Title is <code className="font-mono">headline</code>,
        description is <code className="font-mono">subhead</code> on secondary text.
      </Text>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Popover>
          <PopoverTrigger className={secondaryButton}>Share settings</PopoverTrigger>
          <PopoverPopup>
            <div className="flex items-start justify-between gap-3">
              <PopoverTitle>Share settings</PopoverTitle>
              <PopoverClose className={iconButton} aria-label="Close">
                <XIcon aria-hidden="true" className="size-4" />
              </PopoverClose>
            </div>
            <PopoverDescription className="mt-1">
              Anyone with the link can view this document. Editing is limited to
              members of the workspace.
            </PopoverDescription>
            <div className="mt-4 flex justify-end">
              <PopoverClose className={secondaryButton}>Done</PopoverClose>
            </div>
          </PopoverPopup>
        </Popover>

        <Popover>
          <PopoverTrigger className={secondaryButton} disabled>
            Disabled trigger
          </PopoverTrigger>
          <PopoverPopup>
            <PopoverTitle>Unreachable</PopoverTitle>
          </PopoverPopup>
        </Popover>
      </div>

      <Text as="h3" variant="headline" className="mt-12">
        Placement
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        <code className="font-mono">side</code> and{' '}
        <code className="font-mono">align</code> pass through to the Positioner.
        Base UI flips the side automatically when there is no room; the popup
        scales from its anchor via <code className="font-mono">--transform-origin</code>.
      </Text>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Popover>
          <PopoverTrigger className={secondaryButton}>Open to the right</PopoverTrigger>
          <PopoverPopup side="right" align="start">
            <PopoverTitle>Anchored right</PopoverTitle>
            <PopoverDescription className="mt-1">
              Rendered with <code className="font-mono">side=&quot;right&quot;</code> and{' '}
              <code className="font-mono">align=&quot;start&quot;</code>, so the popup&apos;s
              top edge lines up with the trigger.
            </PopoverDescription>
            <div className="mt-4 flex justify-end">
              <PopoverClose className={secondaryButton}>Close</PopoverClose>
            </div>
          </PopoverPopup>
        </Popover>

        <Popover>
          <PopoverTrigger className={secondaryButton}>Open above</PopoverTrigger>
          <PopoverPopup side="top">
            <PopoverTitle>Anchored top</PopoverTitle>
            <PopoverDescription className="mt-1">
              <code className="font-mono">side=&quot;top&quot;</code> with the default
              centre alignment.
            </PopoverDescription>
          </PopoverPopup>
        </Popover>
      </div>
    </Section>
  )
}

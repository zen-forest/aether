import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from '@/components/Dialog'
import { buttonClasses } from '@/components/buttonVariants'
import { Text } from '@/components/Text'

import { Panel, PanelRow } from './Panel'
import { Section } from './Section'

const secondaryButton = buttonClasses('secondary')
const primaryButton = buttonClasses('primary')

export function DialogSection() {
  return (
    <Section
      id="dialog"
      title="Dialog"
      intro="A modal surface for a focused task or confirmation. The popup sits on background/offset, one radius step above cards, behind a background/base scrim. Base UI traps focus, locks scroll, restores focus on close, and dismisses on Escape or a backdrop press; the enter and exit transitions run off its data-starting-style and data-ending-style attributes."
    >
      <Text as="h3" variant="headline" className="mt-12">
        Confirmation
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        Title, description, and a footer row. Actions are plain buttons wrapped
        by <code className="font-mono">DialogClose</code> via the{' '}
        <code className="font-mono">render</code> prop.
      </Text>
      <Panel className="mt-4">
        <PanelRow className="items-center sm:grid-cols-[160px_1fr]">
          <Text as="span" variant="subhead-mono">
            modal
          </Text>
          <div className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger className={secondaryButton}>Delete workspace</DialogTrigger>
              <DialogPopup>
                <DialogTitle>Delete this workspace?</DialogTitle>
                <DialogDescription>
                  All documents and settings will be removed. This cannot be
                  undone.
                </DialogDescription>
                <div className="mt-6 flex justify-end gap-2">
                  <DialogClose className={secondaryButton}>Cancel</DialogClose>
                  <DialogClose className={primaryButton}>Delete</DialogClose>
                </div>
              </DialogPopup>
            </Dialog>
          </div>
        </PanelRow>
        <PanelRow className="items-center sm:grid-cols-[160px_1fr]">
          <Text as="span" variant="subhead-mono">
            trap-focus
          </Text>
          <div className="flex flex-wrap items-center gap-3">
            <Dialog modal="trap-focus">
              <DialogTrigger className={secondaryButton}>Open without scroll lock</DialogTrigger>
              <DialogPopup>
                <DialogTitle>Focus stays here</DialogTitle>
                <DialogDescription>
                  Tab cycles inside the popup, but the page still scrolls and
                  outside pointer events are allowed; an outside press closes it.
                </DialogDescription>
                <div className="mt-6 flex justify-end">
                  <DialogClose className={secondaryButton}>Close</DialogClose>
                </div>
              </DialogPopup>
            </Dialog>
          </div>
        </PanelRow>
        <PanelRow className="items-center sm:grid-cols-[160px_1fr]">
          <Text as="span" variant="subhead-mono">
            disabled
          </Text>
          <div className="flex flex-wrap items-center gap-3">
            <Dialog>
              <DialogTrigger disabled className={secondaryButton}>
                Unavailable
              </DialogTrigger>
              <DialogPopup>
                <DialogTitle>Never shown</DialogTitle>
              </DialogPopup>
            </Dialog>
          </div>
        </PanelRow>
      </Panel>

      <Text as="h3" variant="headline" className="mt-12">
        Nested
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        A dialog opened from inside another. Base UI marks the child{' '}
        <code className="font-mono">data-nested</code> (no second backdrop) and
        the parent <code className="font-mono">data-nested-dialog-open</code>,
        which recedes it. Escape closes only the topmost dialog.
      </Text>
      <Panel className="mt-4">
        <PanelRow className="items-center sm:grid-cols-[160px_1fr]">
          <Text as="span" variant="subhead-mono">
            nested
          </Text>
          <div className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger className={secondaryButton}>Edit profile</DialogTrigger>
              <DialogPopup>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Changes are saved when you close this dialog.
                </DialogDescription>
                <div className="mt-6 flex justify-end gap-2">
                  <Dialog>
                    <DialogTrigger className={secondaryButton}>Change avatar</DialogTrigger>
                    <DialogPopup>
                      <DialogTitle>Change avatar</DialogTitle>
                      <DialogDescription>
                        This is a nested dialog. Closing it returns focus to the
                        control that opened it.
                      </DialogDescription>
                      <div className="mt-6 flex justify-end">
                        <DialogClose className={secondaryButton}>Done</DialogClose>
                      </div>
                    </DialogPopup>
                  </Dialog>
                  <DialogClose className={primaryButton}>Save</DialogClose>
                </div>
              </DialogPopup>
            </Dialog>
          </div>
        </PanelRow>
      </Panel>
    </Section>
  )
}

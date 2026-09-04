import { BellIcon, LockIcon, UserIcon } from 'lucide-react'

import { Tab, Tabs, TabsIndicator, TabsList, TabsPanel } from '@/components/Tabs'
import { Text } from '@/components/Text'

import { Section } from './Section'

export function TabsSection() {
  return (
    <Section
      id="tabs"
      title="Tabs"
      intro="Switch between sibling views without leaving the page. The line variant sits directly on a page or panel and marks the active tab with an animated underline; the segmented variant is an inset track for cards and toolbars. Arrow keys move focus between tabs and Enter or Space activates; disabled tabs stay focusable so screen readers can announce them, but never activate."
    >
      <Text as="h3" variant="headline" className="mt-12">
        Line
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        Default. A hairline under the list, the active tab in{' '}
        <code className="font-mono">text/primary</code>, and a{' '}
        <code className="font-mono">TabsIndicator</code> that slides to the
        active tab.
      </Text>
      <Tabs defaultValue="overview" className="mt-4">
        <TabsList aria-label="Project">
          <Tab value="overview">Overview</Tab>
          <Tab value="activity">Activity</Tab>
          <Tab value="settings">Settings</Tab>
          <Tab value="billing" disabled>
            Billing
          </Tab>
          <TabsIndicator />
        </TabsList>
        <TabsPanel value="overview">
          A summary of the project: recent documents, open tasks, and the
          people working on them.
        </TabsPanel>
        <TabsPanel value="activity">
          A chronological feed of edits, comments, and status changes across
          the project.
        </TabsPanel>
        <TabsPanel value="settings">
          Project name, visibility, and integrations. Changes apply to every
          member.
        </TabsPanel>
        <TabsPanel value="billing">Billing is managed by the workspace owner.</TabsPanel>
      </Tabs>

      <Text as="h3" variant="headline" className="mt-12">
        Segmented
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        Set <code className="font-mono">variant="segmented"</code> on{' '}
        <code className="font-mono">TabsList</code>. The track is{' '}
        <code className="font-mono">background/base</code> inset into a card;
        the active tab steps up to{' '}
        <code className="font-mono">background/offset/plus</code>. No indicator
        is needed.
      </Text>
      <div className="mt-4 rounded-lg border border-border-base bg-background-offset p-5">
        <Tabs defaultValue="profile">
          <TabsList variant="segmented" aria-label="Account" className="w-fit">
            <Tab value="profile">
              <UserIcon aria-hidden="true" className="size-4" />
              Profile
            </Tab>
            <Tab value="notifications">
              <BellIcon aria-hidden="true" className="size-4" />
              Notifications
            </Tab>
            <Tab value="security" disabled>
              <LockIcon aria-hidden="true" className="size-4" />
              Security
            </Tab>
          </TabsList>
          <TabsPanel value="profile">
            Display name, avatar, and the email address other members see.
          </TabsPanel>
          <TabsPanel value="notifications">
            Choose which events reach you by email, push, or in-app badge.
          </TabsPanel>
          <TabsPanel value="security">
            Security settings are locked while a device review is pending.
          </TabsPanel>
        </Tabs>
      </div>
    </Section>
  )
}

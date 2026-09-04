import { SearchIcon } from 'lucide-react'

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/Field'
import { Input } from '@/components/Input'
import { Text } from '@/components/Text'
import { Textarea } from '@/components/Textarea'

import { Panel, PanelRow } from './Panel'
import { Section } from './Section'

export function FieldSection() {
  return (
    <Section
      id="field"
      title="Field & Input"
      intro="Text entry and the labelling around it. Field wires a label, control, description and error together with the right ARIA relationships; Input and Textarea are the controls. Borders step from base to offset on hover and offset/plus on focus; validation state arrives through data attributes, never through React state."
    >
      <Text as="h3" variant="headline" className="mt-12">
        Field
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        Label above, control, then a description. Clicking the label focuses the
        control. Disabled propagates from the field to every part.
      </Text>
      <Panel className="mt-4">
        <PanelRow className="sm:grid-cols-2">
          <Field className="flex flex-col gap-1.5">
            <FieldLabel>Display name</FieldLabel>
            <Input placeholder="Ada Lovelace" />
            <FieldDescription>Shown on your profile and in mentions.</FieldDescription>
          </Field>
          <Field disabled className="flex flex-col gap-1.5">
            <FieldLabel>Workspace</FieldLabel>
            <Input defaultValue="Analytical Engines" />
            <FieldDescription>Managed by your organization.</FieldDescription>
          </Field>
        </PanelRow>
      </Panel>

      <Text as="h3" variant="headline" className="mt-12">
        Validation
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        An invalid field turns its border to status/error and shows FieldError
        below the control. The left example is controlled by the app via{' '}
        <code className="font-mono">invalid</code>; the right one validates live
        with <code className="font-mono">validate</code> on change.
      </Text>
      <Panel className="mt-4">
        <PanelRow className="sm:grid-cols-2">
          <Field invalid className="flex flex-col gap-1.5">
            <FieldLabel>Username</FieldLabel>
            <Input defaultValue="ada lovelace" />
            <FieldError match>Usernames cannot contain spaces.</FieldError>
          </Field>
          <Field
            validationMode="onChange"
            validate={(value) =>
              typeof value === 'string' && value.length > 0 && !value.includes('@')
                ? 'Enter a valid email address.'
                : null
            }
            className="flex flex-col gap-1.5"
          >
            <FieldLabel>Email</FieldLabel>
            <Input type="email" required placeholder="ada@example.com" />
            <FieldDescription>Type without an @ to see the error.</FieldDescription>
            <FieldError />
          </Field>
        </PanelRow>
      </Panel>

      <Text as="h3" variant="headline" className="mt-12">
        Input
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        Same height and surface as the Select trigger so they line up in forms.{' '}
        <code className="font-mono">startIcon</code> places a lucide icon inside the
        leading edge.
      </Text>
      <Panel className="mt-4">
        <PanelRow className="sm:grid-cols-2">
          <Field className="flex flex-col gap-1.5">
            <FieldLabel>Search</FieldLabel>
            <Input
              type="search"
              placeholder="Search documents"
              startIcon={<SearchIcon aria-hidden="true" className="size-4" />}
            />
          </Field>
          <Field className="flex flex-col gap-1.5">
            <FieldLabel>Standalone</FieldLabel>
            <Input placeholder="Placeholder text" />
          </Field>
        </PanelRow>
      </Panel>

      <Text as="h3" variant="headline" className="mt-12">
        Textarea
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        A native textarea registered as the field control. Resizes vertically;
        minimum height 80px.
      </Text>
      <Panel className="mt-4">
        <PanelRow className="sm:grid-cols-2">
          <Field className="flex flex-col gap-1.5">
            <FieldLabel>Bio</FieldLabel>
            <Textarea placeholder="A few words about yourself" />
            <FieldDescription>Markdown is not supported.</FieldDescription>
          </Field>
          <Field disabled className="flex flex-col gap-1.5">
            <FieldLabel>Notes</FieldLabel>
            <Textarea defaultValue="Read-only while the document is locked." />
          </Field>
        </PanelRow>
      </Panel>
    </Section>
  )
}

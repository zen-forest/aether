import { ExternalLinkIcon, PlusIcon, Trash2Icon } from 'lucide-react'

import { Button } from '@/components/Button'
import {
  buttonClasses,
  type ButtonSize,
  type ButtonVariant,
} from '@/components/buttonVariants'
import { Text } from '@/components/Text'

import { Panel, PanelRow } from './Panel'
import { Section } from './Section'

const variants: ReadonlyArray<ButtonVariant> = ['primary', 'secondary', 'ghost', 'destructive']
const sizes: ReadonlyArray<ButtonSize> = ['md', 'sm']

const variantNotes: Record<ButtonVariant, string> = {
  primary: 'inverted surface; one per view',
  secondary: 'default; offset surface with border',
  ghost: 'no surface until hover; toolbars and inline actions',
  destructive: 'status/error; irreversible actions only',
}

const rowClassName = 'items-center sm:grid-cols-[120px_1fr]'

export function ButtonSection() {
  return (
    <Section
      id="button"
      title="Button"
      intro="Actions. Built on Base UI's Button, which keeps keyboard and disabled semantics correct and exposes state as data attributes. Emphasis comes from surface and border steps, not color: primary inverts the surface, secondary and ghost step through offset and offset/plus on hover, and destructive is the only button that uses a status color. Hover and focus states below are live."
    >
      <Text as="h3" variant="headline" className="mt-12">
        Variants and sizes
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        <code className="font-mono">md</code> (32px, body) for controls;{' '}
        <code className="font-mono">sm</code> (28px, subhead) for dense rows and
        panel headers. Icons are children, <code className="font-mono">size-4</code>.
      </Text>
      <Panel className="mt-4">
        {variants.map((variant) => (
          <PanelRow key={variant} className={rowClassName}>
            <div>
              <Text as="span" variant="subhead-mono">
                {variant}
              </Text>
              <Text variant="caption-1" className="text-text-secondary">
                {variantNotes[variant]}
              </Text>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={size} variant={variant} size={size}>
                  {variant === 'destructive' ? (
                    <Trash2Icon aria-hidden="true" className="size-4" />
                  ) : (
                    <PlusIcon aria-hidden="true" className="size-4" />
                  )}
                  {variant === 'destructive' ? 'Delete' : 'New document'}
                </Button>
              ))}
              {sizes.map((size) => (
                <Button key={`${size}-text`} variant={variant} size={size}>
                  {size === 'md' ? 'Continue' : 'Save'}
                </Button>
              ))}
            </div>
          </PanelRow>
        ))}
      </Panel>

      <Text as="h3" variant="headline" className="mt-12">
        Icon only
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        <code className="font-mono">iconOnly</code> makes the button square and
        the type requires <code className="font-mono">aria-label</code>.
      </Text>
      <Panel className="mt-4">
        {sizes.map((size) => (
          <PanelRow key={size} className={rowClassName}>
            <Text as="span" variant="subhead-mono">
              {size}
            </Text>
            <div className="flex flex-wrap items-center gap-3">
              {variants.map((variant) => (
                <Button
                  key={variant}
                  variant={variant}
                  size={size}
                  iconOnly
                  aria-label={variant === 'destructive' ? 'Delete' : 'Add'}
                >
                  {variant === 'destructive' ? (
                    <Trash2Icon aria-hidden="true" className="size-4" />
                  ) : (
                    <PlusIcon aria-hidden="true" className="size-4" />
                  )}
                </Button>
              ))}
            </div>
          </PanelRow>
        ))}
      </Panel>

      <Text as="h3" variant="headline" className="mt-12">
        Disabled
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        Base UI sets <code className="font-mono">data-disabled</code>; the button
        drops to 50% opacity and ignores the pointer. Pass{' '}
        <code className="font-mono">focusableWhenDisabled</code> when a disabled
        control must stay reachable for a tooltip.
      </Text>
      <Panel className="mt-4">
        <PanelRow className={rowClassName}>
          <Text as="span" variant="subhead-mono">
            disabled
          </Text>
          <div className="flex flex-wrap items-center gap-3">
            {variants.map((variant) => (
              <Button key={variant} variant={variant} disabled>
                {variant === 'destructive' ? 'Delete' : 'Continue'}
              </Button>
            ))}
            <Button iconOnly aria-label="Add" disabled>
              <PlusIcon aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </PanelRow>
        <PanelRow className={rowClassName}>
          <Text as="span" variant="subhead-mono">
            focusable
          </Text>
          <div className="flex flex-wrap items-center gap-3">
            <Button disabled focusableWhenDisabled>
              Tab reaches me
            </Button>
          </div>
        </PanelRow>
      </Panel>

      <Text as="h3" variant="headline" className="mt-12">
        As link
      </Text>
      <Text variant="subhead" className="mt-1 text-text-secondary">
        Navigation stays an <code className="font-mono">&lt;a&gt;</code>. Apply{' '}
        <code className="font-mono">buttonClasses(variant, size, iconOnly)</code>{' '}
        instead of rendering a button.
      </Text>
      <Panel className="mt-4">
        <PanelRow className={rowClassName}>
          <Text as="span" variant="subhead-mono">
            {'<a>'}
          </Text>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://base-ui.com/react/components/button"
              target="_blank"
              rel="noreferrer"
              className={buttonClasses('secondary', 'md')}
            >
              Base UI docs
              <ExternalLinkIcon aria-hidden="true" className="size-4" />
            </a>
            <a
              href="https://base-ui.com/react/components/button"
              target="_blank"
              rel="noreferrer"
              className={buttonClasses('ghost', 'sm')}
            >
              Read more
            </a>
          </div>
        </PanelRow>
      </Panel>
    </Section>
  )
}

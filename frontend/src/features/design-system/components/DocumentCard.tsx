import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Text } from '@/components/Text'
import { textVariantClasses } from '@/components/textVariants'
import { cn } from '@/lib/utils'
import { stateMotionClasses } from '@/theme/motion'

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className={`${textVariantClasses['title-2']} text-text-primary`}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className={`${textVariantClasses['title-3']} mt-10 text-text-primary`}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className={`${textVariantClasses.headline} mt-8 text-text-primary`}>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <Text className="mt-4 text-text-secondary">{children}</Text>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="underline decoration-border-offset-plus underline-offset-4 transition-colors hover:text-text-primary hover:decoration-text-secondary"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className={`${textVariantClasses.body} mt-4 list-disc space-y-1 pl-5 text-text-secondary marker:text-border-offset-plus`}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className={`${textVariantClasses.body} mt-4 list-decimal space-y-1 pl-5 text-text-secondary marker:text-border-offset-plus`}>
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-text-primary">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="rounded-sm bg-background-offset-plus px-1.5 py-0.5 font-mono text-[0.9em] text-text-primary">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className={`${textVariantClasses['subhead-mono']} mt-4 overflow-x-auto rounded-md border border-border-base bg-background-base p-4 text-text-primary [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[inherit]`}>
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto rounded-md border border-border-base">
      <table className={`${textVariantClasses.subhead} w-full border-collapse text-left`}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-border-base bg-background-offset text-text-secondary">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 font-medium whitespace-nowrap">{children}</th>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-border-base text-text-secondary">
      {children}
    </tbody>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 whitespace-nowrap">{children}</td>
  ),
}

export type DocumentCardProps = {
  /** File name shown in the header and used for the download. */
  name: string
  /** Raw markdown source to render. */
  source: string
  /** URL the download button points at. */
  href: string
}

export function DocumentCard({ name, source, href }: DocumentCardProps) {
  return (
    <details className="group overflow-hidden rounded-lg border border-border-base">
      <summary
        className={cn(
          'flex cursor-pointer list-none items-center gap-3 bg-background-offset py-2 pr-3 pl-5 transition-colors group-open:border-b group-open:border-border-base hover:bg-background-offset-plus [&::-webkit-details-marker]:hidden',
          stateMotionClasses,
        )}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            'size-3.5 text-text-secondary transition-transform group-open:rotate-90',
            stateMotionClasses,
          )}
        >
          <path d="M6 3.5 10.5 8 6 12.5" />
        </svg>
        <Text as="span" variant="subhead-mono" className="flex-1 text-text-secondary">
          {name}
        </Text>
        <a
          href={href}
          download={name}
          className="inline-flex items-center gap-2 rounded-md border border-border-base px-3 py-1.5 text-text-secondary transition-colors hover:border-border-offset hover:bg-background-offset-plus hover:text-text-primary"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3.5"
          >
            <path d="M8 2.5v8m0 0L5 7.5m3 3 3-3M3 12.5h10" />
          </svg>
          <Text as="span" variant="subhead" className="text-inherit">
            Download
          </Text>
        </a>
      </summary>
      <div className="px-6 py-8 sm:px-10 sm:py-10">
        <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {source}
        </Markdown>
      </div>
    </details>
  )
}

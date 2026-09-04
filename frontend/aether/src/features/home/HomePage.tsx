import { Link } from '@tanstack/react-router'

import { TextBlock } from '@/components/TextBlock'

function HomePage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background-base px-6 text-text-primary">
      <div className="w-full max-w-2xl">
        <TextBlock variant="subhead-mono" className="text-text-secondary">
          AETHER / APPLICATION
        </TextBlock>
        <TextBlock variant="large-title" className="mt-3">
          Aether
        </TextBlock>
        <TextBlock className="mt-3 text-text-secondary">
          Your application workspace.
        </TextBlock>
        <TextBlock className="mt-8">
          <Link
            className="text-text-secondary underline decoration-border-offset-plus underline-offset-4 transition-colors hover:text-text-primary"
            to="/design-system"
          >
            Design system
          </Link>
        </TextBlock>
      </div>
    </main>
  )
}

export default HomePage

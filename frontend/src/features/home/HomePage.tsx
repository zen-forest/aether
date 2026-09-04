import { Link } from '@tanstack/react-router'

import { Text } from '@/components/Text'

function HomePage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background-base px-6 text-text-primary">
      <div className="w-full max-w-2xl">
        <Text variant="subhead-mono" className="text-text-secondary">
          AETHER / APPLICATION
        </Text>
        <Text variant="large-title" className="mt-3">
          Aether
        </Text>
        <Text className="mt-3 text-text-secondary">
          Your application workspace.
        </Text>
        <Text className="mt-8">
          <Link
            className="text-text-secondary underline decoration-border-offset-plus underline-offset-4 transition-colors hover:text-text-primary"
            to="/design-system"
          >
            Design system
          </Link>
        </Text>
      </div>
    </main>
  )
}

export default HomePage

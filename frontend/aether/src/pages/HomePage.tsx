import { Link } from '@tanstack/react-router'
import { TextBlock } from '../components/TextBlock.tsx'

function HomePage() {
  return (
    <main className="grid min-h-screen place-items-center bg-neutral-950 px-6 text-neutral-100">
      <div className="w-full max-w-2xl">
        <TextBlock variant="subhead-mono" className="text-neutral-500">
          AETHER / APPLICATION
        </TextBlock>
        <TextBlock variant="large-title" className="mt-3">
          Aether
        </TextBlock>
        <TextBlock className="mt-3 text-neutral-400">
          Your application workspace.
        </TextBlock>
        <TextBlock className="mt-8">
          <Link
            className="text-neutral-300 underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-white"
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

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'


export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const navigate = useNavigate()
  
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          TwoFrame
        </h1>

        <p className="mt-4 max-w-xl text-muted-foreground">
          Tournament
        </p>

        <div className="mt-8 flex gap-4">
          <Button size="lg" onClick={() => navigate({ to: '/create' })}>
            Create or edit
          </Button>
          <Button size="lg">Join</Button>
        </div>
      </section>

    </main>
  )
}

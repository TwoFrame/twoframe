import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">

        <h1 className="text-6xl md:text-8xl font-black mb-6 text-center">
          <span className="bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            twoframe
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed text-center">
          Run tournaments, match up players, and track brackets in real time. A simple way to manage competitive gaming events.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg"
            className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300"
            onClick={() => navigate({ to: "/create" }) }>
            Create a Tournament
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-green-400 text-green-600 hover:bg-green-400/10 hover:text-green-700 px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300"
            onClick={() => navigate({ to: "/join" })}>
            Join a Tournament
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap gap-8 justify-center items-center text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Live Tournaments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            <span>Real-Time Brackets</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
            <span>Easy Event Setup</span>
          </div>
        </div>

      </div>
    </div>
  );
}

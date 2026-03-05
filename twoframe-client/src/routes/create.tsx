import { createFileRoute, Link } from "@tanstack/react-router";
import { useCreateTournament } from "@/features/create/hooks/useCreateTournamnet";
import { TournamentForm } from "@/features/create/components/TournamentForm";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/create")({
  component: CreateTournamentPage,
});

function CreateTournamentPage() {
  const mutation = useCreateTournament();

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white border border-green-200 rounded-xl p-8 shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-black mb-3 text-center">
            <span className="bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Create Tournament
            </span>
          </h1>
          <p className="text-gray-600 mb-8 text-center text-sm">
            Set up your tournament and get a shareable code for participants
          </p>

          <TournamentForm
            onSubmit={(values) => mutation.mutateAsync(values)}
            isSubmitting={mutation.isPending}
          />

          {mutation.isError && (
            <p className="text-red-500 text-sm mt-3">
              {mutation.error.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

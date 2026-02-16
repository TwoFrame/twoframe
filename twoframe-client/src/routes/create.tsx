import { createFileRoute } from "@tanstack/react-router";
import { useCreateTournament } from "@/features/create/hooks/useCreateTournamnet";
import { TournamentForm } from "@/features/create/components/TournamentForm";

export const Route = createFileRoute("/create")({
  component: CreateTournamentPage,
});

function CreateTournamentPage() {
  const mutation = useCreateTournament();

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Tournament</h2>
      <TournamentForm
        onSubmit={(values) => mutation.mutateAsync(values)}
        isSubmitting={mutation.isPending}
      />

      {mutation.isError && (
        <p className="text-red-500 text-sm mt-1">{mutation.error.message}</p>
      )}
    </div>
  );
}

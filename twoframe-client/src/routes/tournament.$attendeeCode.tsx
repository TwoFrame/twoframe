import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import Bracket from "@/features/bracket/components/Bracket";

export const Route = createFileRoute("/tournament/$attendeeCode")({
  component: TournamentPage,
});

function TournamentPage() {
  const { attendeeCode } = Route.useParams();

  const tournament = useQuery({
    queryKey: ["tournament", attendeeCode],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_TWOFRAME_SERVER_URL}/tournament/attendee/${attendeeCode}`,
        {
          method: "GET",
        },
      );
      return await response.json();
    },
  });

  if (tournament.isLoading) {
    return <div>Loading...</div>;
  }

  if (tournament.isError) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto border border-red-500">
      <h1 className="text-3xl font-bold">{tournament.data.name}</h1>
      <p>State: {tournament.data.state}</p>

      <h1 className="text-3xl font-bold">Bracket</h1>
      {tournament.data.state === "open" && (
        <p>
          Tournament has not started yet. Contact the creator for more
          information.
        </p>
      )}
      {(tournament.data.state === "playing" ||
        tournament.data.state === "completed") && (
        <Bracket
          tournament={tournament}
          attendees={tournament.data.attendees}
          readOnly={true}
        />
      )}
    </div>
  );
}

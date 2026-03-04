import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import Bracket from "@/features/bracket/components/Bracket";
import type { TournamentData } from "@/types/tournament";

export const Route = createFileRoute("/tournament/$attendeeCode")({
  component: TournamentPage,
});

function TournamentPage() {
  const { attendeeCode } = Route.useParams();

  const tournament = useQuery<TournamentData>({
    queryKey: ["tournament", attendeeCode],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_TWOFRAME_SERVER_URL}/tournament/attendee/${attendeeCode}`,
        { method: "GET" },
      );
      return await response.json();
    },
  });

  if (tournament.isLoading) {
    return (
      <div className="size-full min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-green-600">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce [animation-delay:0ms]" />
          <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce [animation-delay:150ms]" />
          <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    );
  }

  if (tournament.isError) {
    return (
      <div className="size-full min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="bg-white border border-red-200 rounded-xl p-8 shadow-lg text-center">
          <p className="text-red-500 font-semibold">Something went wrong.</p>
          <p className="text-gray-500 text-sm mt-1">Invalid attendee code.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white border border-green-200 rounded-xl p-6 shadow-lg">
          <h1 className="text-4xl font-black text-gray-800">
            {tournament.data?.name}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-gray-500 text-sm font-medium">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                tournament.data?.state === "playing"
                  ? "bg-green-100 text-green-700 border-green-200"
                  : tournament.data?.state === "completed"
                    ? "bg-gray-100 text-gray-600 border-gray-200"
                    : "bg-blue-100 text-blue-700 border-blue-200"
              }`}
            >
              {tournament.data?.state}
            </span>
          </div>
        </div>

        <div className="bg-white border border-green-200 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-black mb-4 text-gray-800">
            Tournament Bracket
          </h2>
          {tournament.data?.state === "open" && (
            <div className="flex items-center justify-center h-48 border-2 border-dashed border-green-200 rounded-xl bg-green-50">
              <p className="text-gray-400 text-center">
                Tournament hasn't started yet.
                <br />
                <span className="text-sm">Check back soon!</span>
              </p>
            </div>
          )}
          {(tournament.data?.state === "playing" ||
            tournament.data?.state === "completed") && (
            <Bracket
              readOnly={true}
              tournament={tournament.data}
              attendees={tournament.data?.attendees ?? []}
            />
          )}
        </div>
      </div>
    </div>
  );
}
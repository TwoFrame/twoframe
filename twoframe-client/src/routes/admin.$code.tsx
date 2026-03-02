import { AddAttendeeDialog } from "@/features/admin/components/AddAttendeeDialog";
import { TournamentCodes } from "@/features/admin/components/TournamentCodes";
import { createFileRoute } from "@tanstack/react-router";
import { TournamentSection } from "@/features/admin/components/TournamentSection";
import { useGetTournamentWithAdminCode } from "@/features/admin/hooks/useGetTournament";
import { useGetAttendees } from "@/features/admin/hooks/useGetAttendees";
import { TournamentHeader } from "@/features/admin/components/TournamentHeader";

export const Route = createFileRoute("/admin/$code")({
  component: AdminPage,
});

function AdminPage() {
  const { code } = Route.useParams();

  const tournament = useGetTournamentWithAdminCode(code);
  const attendees = useGetAttendees(code, tournament?.data?.tournament_id);
  const canStart = (attendees.data?.attendees?.length ?? 0) >= 2;

  if (tournament.isError) {
    return (
      <div className="size-full min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="bg-white border border-red-200 rounded-xl p-8 shadow-lg text-center">
          <p className="text-red-500 font-semibold">Something went wrong.</p>
          <p className="text-gray-500 text-sm mt-1">
            Check your admin code and try again.
          </p>
        </div>
      </div>
    );
  }

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

  const canAddAttendees = tournament.data.state === "open";

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white border border-green-200 rounded-xl p-6 shadow-lg">
          <TournamentHeader
            tournament={tournament.data}
            canStartTournament={canStart}
          />

          {canAddAttendees && (
            <div className="mt-4">
              <AddAttendeeDialog
                onSuccess={() => attendees.refetch()}
                attendeeCode={tournament.data.attendee_code}
              />
            </div>
          )}
        </div>

        <TournamentCodes
          attendeeCode={tournament.data.attendee_code}
          adminCode={tournament.data.admin_code}
        />

        {attendees.data && (
          <TournamentSection
            attendees={attendees.data.attendees}
            tournament={tournament.data}
          />
        )}
      </div>
    </div>
  );
}
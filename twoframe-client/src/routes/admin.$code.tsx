import { AddAttendeeDialog } from "@/features/admin/components/AddAttendeeDialog";
import { TournamentCodes } from "@/features/admin/components/TournamentCodes";
import { createFileRoute } from "@tanstack/react-router";
import { TournamentSection } from "@/features/admin/components/AttendeeSection";
import { useGetTournament } from "@/features/admin/hooks/useGetTournament";
import { useGetAttendees } from "@/features/admin/hooks/useGetAttendees";
import { TournamentHeader } from "@/features/admin/components/TournamentHeader";

//TODO: USE CONTEXT INSTEAD OF PASSING A BUNCH OF TOUNRAMENT DATA TO ALL THE REACT FLOW NODES
export const Route = createFileRoute("/admin/$code")({
  component: AdminPage,
});

function AdminPage() {
  const { code } = Route.useParams();

  const tournament = useGetTournament(code);

  const tournamentId = tournament?.data?.tournament_id;

  const attendeesQuery = useGetAttendees(code, tournamentId);

  const canStart = (attendeesQuery.data?.attendees?.length ?? 0) >= 2;;

  if (tournament.isError) {
    return <div>Something went wrong.</div>;
  }
  if (tournament.isLoading) {
    return <div>Loading...</div>;
  }

  const canAddAttendees = tournament.data.state === "open";

  return (
    <div className="p-8">
      <TournamentHeader
        tournament={tournament.data}
        canStartTournament={canStart}
      />

      {canAddAttendees && (
        <div className="mt-4">
          <AddAttendeeDialog
            onSuccess={() => attendeesQuery.refetch()}
            attendeeCode={tournament.data.attendee_code}
          />
        </div>
      )}

      <TournamentCodes
        attendeeCode={tournament.data.attendee_code}
        adminCode={tournament.data.admin_code}
      />

      {attendeesQuery.data && (
        <TournamentSection
          attendees={attendeesQuery.data.attendees}
          tournament={tournament}
        />
      )}
    </div>
  );
}

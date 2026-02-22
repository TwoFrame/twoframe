import { AddAttendeeDialog } from "@/features/admin/components/AddAttendeeDialog";
import { TournamentCodes } from "@/features/admin/components/TournamentCodes";
import { createFileRoute } from "@tanstack/react-router";
import { TournamentSection } from "@/features/admin/components/TournamentSection";
import { useGetTournamentWithAdminCode } from "@/features/admin/hooks/useGetTournament";
import { useGetAttendees } from "@/features/admin/hooks/useGetAttendees";
import { TournamentHeader } from "@/features/admin/components/TournamentHeader";

//TODO: USE CONTEXT INSTEAD OF PASSING A BUNCH OF TOUNRAMENT DATA TO ALL THE REACT FLOW NODES
export const Route = createFileRoute("/admin/$code")({
  component: AdminPage,
});

function AdminPage() {
  const { code } = Route.useParams();

  const tournament = useGetTournamentWithAdminCode(code);
  //note: if you look in hooks the attendees query is actually dependent on tournament query
  const attendees = useGetAttendees(code, tournament?.data?.tournament_id);
  const canStart = (attendees.data?.attendees?.length ?? 0) >= 2;

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
            onSuccess={() => attendees.refetch()}
            attendeeCode={tournament.data.attendee_code}
          />
        </div>
      )}

      <TournamentCodes
        attendeeCode={tournament.data.attendee_code}
        adminCode={tournament.data.admin_code}
      />

      {attendees.data && (
        <TournamentSection
          attendees={attendees.data.attendees}
          tournament={tournament}
        />
      )}
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { JoinTournamentForm } from "@/components/join/addAttendeeForm"; 
import { createFileRoute } from "@tanstack/react-router";
import Bracket from "@/components/bracket/Bracket";
import { useTournament } from "@/hooks/admin/useGetTournament";
import { useAttendees } from "@/hooks/admin/useGetAttendees";
import { TournamentHeader } from "@/components/admin/TournamentHeader";


//TODO: USE CONTEXT INSTEAD OF PASSING A BUNCH OF TOUNRAMENT DATA TO ALL THE REACT FLOW NODES
export const Route = createFileRoute("/admin/$code")({
  component: AdminPage,
});


function AdminPage() {
  const [open, setOpen] = useState(false);
  const { code } = Route.useParams();
  

  const tournament = useTournament(code);

  const tournamentId = tournament?.data?.tournament_id;

  const attendeesQuery = useAttendees(code, tournamentId);

  if (tournament.isError) {
    return <div>Something went wrong.</div>;
  }
  if (tournament.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <TournamentHeader tournament={tournament.data} />

      <div className="mt-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Attendee</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Attendee</DialogTitle>
            </DialogHeader>

            <JoinTournamentForm
              onSuccess={() => {
                setOpen(false);
                attendeesQuery.refetch();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 p-4 border rounded">
        <h2 className="font-semibold">Attendee Join Code</h2>
        <p className="text-xl">{tournament.data.attendee_code}</p>
      </div>
      <div className="mt-6 p-4 border rounded">
        <h2 className="font-semibold">Admin Code</h2>
        <p className="text-xl">{tournament.data.admin_code}</p>
      </div>
      {attendeesQuery.data && (
        <>
          <h2 className="text-2xl font-bold">
            Attendees: {attendeesQuery.data.attendees.length}
          </h2>
          <ul>
            {attendeesQuery.data.attendees.map(
              (attendee: {
                name: string;
                tournament_id: string;
                attendee_id: string;
              }) => (
                <li key={attendee.attendee_id}>{attendee.name}</li>
              ),
            )}
          </ul>
          {(tournament.data.state == "playing" ||
            tournament.data.state == "completed") && (
            <Bracket
              tournament={tournament}
              attendees={attendeesQuery.data.attendees}
            />
          )}
        </>
      )}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import ChangeTournamentStateForm from "@/components/tournamentStateForm";
import {useQuery} from "@tanstack/react-query";
import Bracket from "@/components/TournamentBracket";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/$code")({
  component: AdminPage,
});

function AdminPage() {
  const { code } = Route.useParams();

  const tournament = useQuery({
    queryKey: ["tournament", code],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_TWOFRAME_SERVER_URL}/tournament/admin/${code}`, {
      method: "GET"})
      return await response.json()
    }
  });

  const tournamentId = tournament?.data?.tournament_id;

  //this query is dependent on the first query which grabs the tournament
  //once the tournament is succesfully grabbed, we can perform a fetch of the attendees
  const attendees = useQuery({
    queryKey: ["attendees", code],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_TWOFRAME_SERVER_URL}/tournament/${tournamentId}/attendees`, {
      method: "GET"})
      const data = await response.json();
      console.log(data);
      return data;
    },
    enabled: !!(tournamentId)

  });


  if (tournament.isError) {
    return <div>Something went wrong.</div>
  }
  if (tournament.isLoading) {
    return <div>Loading...</div>
  }

  return (
    
    <div className="p-8">
      <h1 className="text-3xl font-bold">{tournament.data.name}</h1>
      <p className="text-muted-foreground">{tournament.data.date}</p>
      <div className="flex items-center gap-2">
        <p>Status:</p>
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" variant={tournament.data.state == "open" ? "default" : "secondary"}>{tournament.data.state}</Badge>
      </div>
      <ChangeTournamentStateForm id={tournament.data.tournament_id} code={tournament.data.admin_code} currentState={tournament.data.state} />

      <div className="mt-6 p-4 border rounded">
        <h2 className="font-semibold">Attendee Join Code</h2>
        <p className="text-xl">{tournament.data.attendee_code}</p>
      </div>
      <div className="mt-6 p-4 border rounded">
        <h2 className="font-semibold">Admin Code</h2>
        <p className="text-xl">{tournament.data.admin_code}</p>
      </div>
      {attendees.data && (
        <>
          <h2 className="text-2xl font-bold">Attendees: {attendees.data.attendees.length}</h2>
          <ul>
            {attendees.data.attendees.map((attendee: any) => (
              <li key={attendee.attendee_id}>
                {attendee.name}
              </li>
            ))}
          </ul>
          {(tournament.data.state == "playing" || tournament.data.state == "completed") &&
          <Bracket numAttendees={attendees.data.attendees.length} />
          }
        </>
      )}
    </div>
  );
}

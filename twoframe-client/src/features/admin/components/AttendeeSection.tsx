import Bracket from "@/features/bracket/components/Bracket";

type Attendee = {
  name: string;
  tournament_id: string;
  attendee_id: string;
};

type Props = {
  attendees: Attendee[];
  tournament: any; // tighten this later
};

export function TournamentSection({ attendees, tournament }: Props) {
  return (
    <>
      <h2 className="text-2xl font-bold">Attendees: {attendees.length}</h2>
      <ul>
        {attendees.map(
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
        <Bracket tournament={tournament} attendees={attendees} />
      )}
    </>
  );
}

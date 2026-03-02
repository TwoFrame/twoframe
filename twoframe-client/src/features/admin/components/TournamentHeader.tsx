import ChangeTournamentStateForm from "@/features/admin/components/TournamentStateUpdate";

type Tournament = {
  tournament_id: string;
  name: string;
  date: string;
  state: "open" | "playing" | "completed";
  admin_code: string;
  attendee_code: string;
};

type TournamentHeaderProps = {
  tournament: Tournament;
  canStartTournament: boolean;
};

const stateStyles: Record<string, string> = {
  open: "bg-blue-100 text-blue-700 border-blue-200",
  playing: "bg-green-100 text-green-700 border-green-200",
  completed: "bg-gray-100 text-gray-600 border-gray-200",
};

export function TournamentHeader({
  tournament,
  canStartTournament,
}: TournamentHeaderProps) {
  return (
    <div className="space-y-3">
      <h1 className="text-4xl font-black text-gray-800">{tournament.name}</h1>
      <p className="text-gray-500 text-sm">
        {new Date(tournament.date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm font-medium">Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${stateStyles[tournament.state]}`}
          >
            {tournament.state}
          </span>
        </div>
        <ChangeTournamentStateForm
          id={tournament.tournament_id}
          code={tournament.admin_code}
          currentState={tournament.state}
          canStart={canStartTournament}
        />
      </div>
    </div>
  );
}
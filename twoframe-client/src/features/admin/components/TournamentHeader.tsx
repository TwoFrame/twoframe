import ChangeTournamentStateForm from "@/features/admin/components/TournamentStateUpdate";
import { AddAttendeeDialog } from "@/features/admin/components/AddAttendeeDialog";

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
  onAttendeeAdded?: () => void;
};

const stateStyles: Record<string, { badge: string; dot: string; label: string }> = {
  open: {
    badge: "bg-teal-50 text-teal-700 border-teal-200",
    dot: "bg-teal-400",
    label: "Open",
  },
  playing: {
    badge: "bg-green-50 text-green-700 border-green-200",
    dot: "bg-green-500 animate-pulse",
    label: "Live",
  },
  completed: {
    badge: "bg-gray-100 text-gray-500 border-gray-200",
    dot: "bg-gray-400",
    label: "Completed",
  },
};

export function TournamentHeader({
  tournament,
  canStartTournament,
  onAttendeeAdded,
}: TournamentHeaderProps) {
  const canAddAttendees = tournament.state === "open";
  const { badge, dot, label } = stateStyles[tournament.state];

  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      {/* Left: title, date, status */}
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-gray-700">{tournament.name}</h1>
        <p className="text-gray-400 text-sm">
          {new Date(tournament.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm font-medium">Status</span>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
            {label}
          </span>
        </div>
      </div>

      {/* Right: action buttons stacked */}
      <div className="flex flex-col items-stretch gap-2 min-w-[160px]">
        {canAddAttendees && (
          <AddAttendeeDialog
            onSuccess={onAttendeeAdded}
            attendeeCode={tournament.attendee_code}
          />
        )}
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
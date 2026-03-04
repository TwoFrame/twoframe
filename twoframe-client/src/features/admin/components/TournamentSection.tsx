import Bracket from "@/features/bracket/components/Bracket";
import { Users } from "lucide-react";
import type { Attendee, TournamentData } from "@/types/tournament";

type Props = {
  attendees: Attendee[];
  tournament: TournamentData;
};

export function TournamentSection({ attendees, tournament }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-green-200 rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-green-500" />
          <h2 className="text-xl font-black text-gray-700">
            Attendees:{" "}
            <span className="text-green-600">{attendees.length}</span>
          </h2>
        </div>
        <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
          {attendees.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">
              No attendees yet. Share the join code to get started.
            </p>
          ) : (
            attendees.map((attendee: Attendee) => (
              <div
                key={attendee.attendee_id}
                className="p-3 bg-green-50 rounded-lg border border-green-100 hover:border-green-300 transition-colors text-gray-800 text-sm font-medium"
              >
                {attendee.name}
              </div>
            ))
          )}
        </div>
      </div>

      {(tournament.state === "playing" || tournament.state === "completed") && (
        <div className="bg-white border border-green-200 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-black mb-4 text-gray-800">
            Tournament Bracket
          </h2>
          <Bracket tournament={tournament} attendees={attendees} readOnly={false} />
        </div>
      )}
    </div>
  );
}
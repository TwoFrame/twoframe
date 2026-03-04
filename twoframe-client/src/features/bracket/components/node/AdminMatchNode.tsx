import { Handle, Position } from "@xyflow/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CaseAMatchForm from "./form/CaseAMatchForm";
import CaseBMatchForm from "./form/CaseBMatchForm";
import CaseCMatchForm from "./form/CaseCMatchForm";
import CaseDMatchForm from "./form/CaseDMatchForm";

const NODE_WIDTH = 200;
const NODE_HEIGHT = 76;

enum MatchControlCase {
  A = 0,
  B = 1,
  C = 2,
  D = 3,
}

export default function AdminMatchNode({
  data,
}: {
  data: {
    round: number;
    match: number;
    player1: string | null;
    player2: string | null;
    score1: number;
    score2: number;
    winner: 1 | 2 | null;
    target: string | null;
    playerSources: Record<string, [string, boolean]>;
    final?: boolean;
    attendees: {
      name: string;
      attendee_id: string;
      tournament_id: string;
    }[];
    state: "playing" | "completed";
  };
}) {
  const [open, setOpen] = useState(false);
  const sources = Object.values(data.playerSources);

  let controlCase: MatchControlCase | null = null;

  if (data.state == "playing" && data.round <= 2 && data.winner == null && sources.length == 0) {
    controlCase = MatchControlCase.A;
  } else if (data.state == "playing" && sources.length == 1 && sources[0][1] && data.winner == null) {
    controlCase = MatchControlCase.B;
  } else if (
    data.state == "playing" &&
    sources.length == 2 &&
    ((sources[0][1] && !sources[1][1]) || (!sources[0][1] && sources[1][1])) &&
    data.winner == null
  ) {
    controlCase = MatchControlCase.C;
  } else if (
    data.state == "playing" &&
    sources.length == 2 &&
    sources[0][1] &&
    sources[1][1] &&
    (data.winner == null || data.final)
  ) {
    controlCase = MatchControlCase.D;
  }

  const isClickable = controlCase != null;

  const matchNodeContent = (
    <div
      className={`bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col transition-all duration-150 ${
        isClickable
          ? "border-teal-300 hover:border-teal-400 hover:shadow-md hover:shadow-teal-100 cursor-pointer"
          : "border-green-200"
      }`}
      style={{ width: `${NODE_WIDTH}px`, height: `${NODE_HEIGHT}px` }}
    >
      {/* Label row */}
      <div className="flex justify-between items-center px-2 pt-1 pb-0.5">
        <span className="bg-teal-100 text-teal-700 border border-teal-200 text-[10px] font-semibold rounded-full px-2 py-0.5 leading-none">
          R{data.round} M{data.match}
        </span>

      </div>

      {/* Players grid */}
      <div className="flex-1 grid grid-cols-[1fr_auto] grid-rows-2">
        {/* Player 1 Name */}
        <div className={`pl-2 flex items-center text-sm truncate border-b border-r border-green-100 ${data.winner === 1 ? "font-semibold text-green-700" : "text-gray-600"}`}>
          {data.player1 || <span className="text-gray-300 italic">TBD</span>}
        </div>

        {/* Player 1 Score */}
        <div className={`w-10 flex items-center justify-center text-sm font-bold border-b border-green-100 ${
          data.winner === 1 ? "bg-gradient-to-br from-green-500 to-teal-500 text-white" : "text-gray-500"
        }`}>
          {data.score1 ?? 0}
        </div>

        {/* Player 2 Name */}
        <div className={`pl-2 flex items-center text-sm truncate border-r border-green-100 ${data.winner === 2 ? "font-semibold text-green-700" : "text-gray-600"}`}>
          {data.player2 || <span className="text-gray-300 italic">TBD</span>}
        </div>

        {/* Player 2 Score */}
        <div className={`w-10 flex items-center justify-center text-sm font-bold ${
          data.winner === 2 ? "bg-gradient-to-br from-green-500 to-teal-500 text-white" : "text-gray-500"
        }`}>
          {data.score2 ?? 0}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {Object.keys(data.playerSources).length > 0 && (
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: "#14b8a6", border: "2px solid #99f6e4" }}
        />
      )}

      {isClickable ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>{matchNodeContent}</DialogTrigger>
          <DialogContent className="border-green-200">
            <DialogHeader>
              <DialogTitle className="text-gray-700">Update Match</DialogTitle>
            </DialogHeader>
            <DialogDescription></DialogDescription>
            {(() => {
              switch (+controlCase!) {
                case MatchControlCase.A:
                  return (
                    <CaseAMatchForm
                      data={{
                        matchId: `R${data.round}M${data.match}`,
                        player1: data.player1,
                        player2: data.player2,
                        score1: data.score1,
                        score2: data.score2,
                        attendees: data.attendees,
                      }}
                      setOpen={setOpen}
                    />
                  );
                case MatchControlCase.B:
                  const sourceKey = Object.keys(data.playerSources)[0];
                  return (
                    <CaseBMatchForm
                      data={{
                        matchId: `R${data.round}M${data.match}`,
                        sourcedPlayer: (sourceKey === "player1" ? 1 : 2) as 1 | 2,
                        player1: sourceKey === "player1" ? data.player1 : null,
                        player2: sourceKey === "player2" ? data.player2 : null,
                        score1: data.score1,
                        score2: data.score2,
                        attendees: data.attendees,
                      }}
                      setOpen={setOpen}
                    />
                  );
                case MatchControlCase.C:
                  const sourceEntries = Object.entries(data.playerSources);
                  const filledSource = sourceEntries.find(([, v]) => v[1])!;
                  return (
                    <CaseCMatchForm
                      data={{
                        matchId: `R${data.round}M${data.match}`,
                        sourcedPlayer: (filledSource[0] === "player1" ? 1 : 2) as 1 | 2,
                        player1: data.player1,
                        player2: data.player2,
                      }}
                      setOpen={setOpen}
                    />
                  );
                case MatchControlCase.D:
                  return (
                    <CaseDMatchForm
                      data={{
                        matchId: `R${data.round}M${data.match}`,
                        player1: data.player1,
                        player2: data.player2,
                        score1: data.score1,
                        score2: data.score2,
                      }}
                      setOpen={setOpen}
                    />
                  );
                default:
                  return null;
              }
            })()}
          </DialogContent>
        </Dialog>
      ) : (
        matchNodeContent
      )}

      {!data.final && (
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: "#14b8a6", border: "2px solid #99f6e4" }}
        />
      )}
    </>
  );
}
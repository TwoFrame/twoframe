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
const NODE_HEIGHT = 64;
//just read case-explanations.txt for what these mean
enum MatchControlCase {
  A = 0,
  B = 1,
  C = 2,
  D = 3,
}
//TODO: attendees and state are being thrown into each individual match node. super bad but did it to get working
// should probably have the nodes in the flow pull from the reactflow parent component or some context.
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

  if (data.state == "playing" && data.round == 1 && data.winner == null) {
    controlCase = MatchControlCase.A;
  } else if (
    data.state == "playing" &&
    sources.length == 1 &&
    sources[0][1] &&
    data.winner == null
  ) {
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
  console.log(`R${data.round}M${data.match}`, controlCase);

  const matchNodeContent = (
    <div
      className={`relative bg-secondary grid grid-cols-[85fr_15fr] grid-rows-2 ${controlCase != null ? "hover:cursor-pointer hover:bg-secondary/80" : ""}`}
      style={{
        width: `${NODE_WIDTH}px`,
        height: `${NODE_HEIGHT}px`,
      }}
    >
      <div className="text-xs bg-cyan-300 absolute -top-[12px] rounded px-1">
        R{data.round}M{data.match}
      </div>

      {/* Player 1 Name */}
      <div className="pl-2 flex items-center text-sm truncate border-b border-r border-gray-300">
        {data.player1 || "TBD"}
      </div>

      {/* Player 1 Score */}
      <div
        className={`px-2 flex items-center justify-end text-sm font-semibold border-b border-gray-300 ${data.winner === 1 ? "bg-cyan-600 text-white" : ""}`}
      >
        {data.score1 ?? 0}
      </div>

      {/* Player 2 Name */}
      <div className="pl-2 flex items-center text-sm truncate border-r border-gray-300">
        {data.player2 || "TBD"}
      </div>

      {/* Player 2 Score */}
      <div
        className={`px-2 flex items-center justify-end text-sm font-semibold ${data.winner === 2 ? "bg-cyan-600 text-white" : ""}`}
      >
        {data.score2 ?? 0}
      </div>
    </div>
  );

  return (
    <>
      {Object.keys(data.playerSources).length > 0 && (
        <Handle type="target" position={Position.Left} />
      )}

      {controlCase != null ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>{matchNodeContent}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Match</DialogTitle>
            </DialogHeader>
            <DialogDescription></DialogDescription>
            {(() => {
              switch (+controlCase) {
                case MatchControlCase.A:
                  let caseAData = {
                    matchId: `R${data.round}M${data.match}`,
                    player1: data.player1,
                    player2: data.player2,
                    score1: data.score1,
                    score2: data.score2,
                    attendees: data.attendees,
                  };
                  return <CaseAMatchForm data={caseAData} setOpen={setOpen} />;
                case MatchControlCase.B:
                  const sourceKey = Object.keys(data.playerSources)[0];
                  let caseBData = {
                    matchId: `R${data.round}M${data.match}`,
                    sourcedPlayer: (sourceKey === "player1" ? 1 : 2) as 1 | 2,
                    player1: sourceKey === "player1" ? data.player1 : null,
                    player2: sourceKey === "player2" ? data.player2 : null,
                    score1: data.score1,
                    score2: data.score2,
                    attendees: data.attendees,
                  };
                  return <CaseBMatchForm data={caseBData} setOpen={setOpen} />;
                case MatchControlCase.C:
                  const sourceEntries = Object.entries(data.playerSources);
                  const filledSource = sourceEntries.find(([, v]) => v[1])!;
                  let caseCData = {
                    matchId: `R${data.round}M${data.match}`,
                    sourcedPlayer: (filledSource[0] === "player1" ? 1 : 2) as
                      | 1
                      | 2,
                    player1: data.player1,
                    player2: data.player2,
                  };
                  return <CaseCMatchForm data={caseCData} setOpen={setOpen} />;
                case MatchControlCase.D:
                  let caseDData = {
                    matchId: `R${data.round}M${data.match}`,
                    player1: data.player1,
                    player2: data.player2,
                    score1: data.score1,
                    score2: data.score2,
                  };
                  return <CaseDMatchForm data={caseDData} setOpen={setOpen} />;
                default:
                  return null;
              }
            })()}
          </DialogContent>
        </Dialog>
      ) : (
        matchNodeContent
      )}
      {!data.final && <Handle type="source" position={Position.Right} />}
    </>
  );
}

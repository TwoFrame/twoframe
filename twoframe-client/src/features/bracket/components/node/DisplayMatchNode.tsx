import { Handle, Position } from "@xyflow/react";

const NODE_WIDTH = 200;
const NODE_HEIGHT = 64;

export default function DisplayMatchNode({
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
  };
}) {
  return (
    <>
      {Object.keys(data.playerSources).length > 0 && (
        <Handle type="target" position={Position.Left} />
      )}

      <div
        className="relative bg-secondary grid grid-cols-[85fr_15fr] grid-rows-2"
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

      {!data.final && <Handle type="source" position={Position.Right} />}
    </>
  );
}

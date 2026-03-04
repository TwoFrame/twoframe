import { Handle, Position } from "@xyflow/react";

const NODE_WIDTH = 200;
const NODE_HEIGHT = 76;

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
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: "#14b8a6", border: "2px solid #99f6e4" }}
        />
      )}

      <div
        className="bg-white border border-green-200 rounded-lg shadow-sm overflow-hidden flex flex-col"
        style={{ width: `${NODE_WIDTH}px`, height: `${NODE_HEIGHT}px` }}
      >
        {/* Round label row */}
        <div className="flex justify-start px-2 pt-1 pb-0.5">
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
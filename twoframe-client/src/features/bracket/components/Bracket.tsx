import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import AdminMatchNode from "./node/AdminMatchNode";
import DisplayMatchNode from "./node/DisplayMatchNode";
import RoundLabelNode from "./node/RoundLabelNode";
import type { Attendee, TournamentData } from "@/types/tournament";

export default function Bracket({
  readOnly,
  tournament,
  attendees,
}: {
  readOnly: boolean;
  tournament: TournamentData;
  attendees: Attendee[];
}) {
  const deserializedBracket = JSON.parse(tournament.bracket!);

  const assignedPlayers = new Set<string>();
  for (const key of Object.keys(deserializedBracket.nodes)) {
    const nodeData = deserializedBracket.nodes[key].data;
    if (nodeData.player1) assignedPlayers.add(nodeData.player1);
    if (nodeData.player2) assignedPlayers.add(nodeData.player2);
  }

  const finalNodes = [];
  for (const key of Object.keys(deserializedBracket.nodes)) {
    const nodeData = deserializedBracket.nodes[key].data;
    const nodeAttendees = attendees.filter(
      (a) =>
        !assignedPlayers.has(a.name) ||
        a.name === nodeData.player1 ||
        a.name === nodeData.player2,
    );
    finalNodes.push({
      ...deserializedBracket.nodes[key],
      data: {
        ...nodeData,
        attendees: nodeAttendees,
        state: tournament.state,
      },
    });
  }

  const finalEdges = [];
  for (const key of Object.keys(deserializedBracket.edges)) {
    finalEdges.push({
      ...deserializedBracket.edges[key],
      style: { stroke: "#5eead4", strokeWidth: 2 },
    });
  }

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden border border-green-200">
      <ReactFlow
        nodes={finalNodes}
        edges={finalEdges}
        nodeTypes={{
          bracketNode: readOnly ? DisplayMatchNode : AdminMatchNode,
          roundLabelNode: RoundLabelNode,
        }}
        maxZoom={4}
        minZoom={0.1}
        fitView
      >
        <Background
          color="#86efac"
          gap={20}
          size={1.5}
          variant={BackgroundVariant.Dots}
          style={{ backgroundColor: "#f0fdf4" }}
        />
        <Controls className="[&>button]:border-green-200 [&>button]:bg-white [&>button]:text-green-700 [&>button:hover]:bg-green-50" />
      </ReactFlow>
    </div>
  );
}

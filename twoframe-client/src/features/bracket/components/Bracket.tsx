import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import MatchNode from "./node/MatchNode";
import RoundLabelNode from "./node/RoundLabelNode";

export default function Bracket({
  tournament,
  attendees,
}: {
  tournament: any;
  attendees: {
    tournament_id: string;
    attendee_id: string;
    name: string;
  }[];
}) {
  // console.log(tournament.data.bracket);
  const deserializedBracket = JSON.parse(tournament.data.bracket);
  console.log(deserializedBracket);
  const finalNodes = [];
  for (const key of Object.keys(deserializedBracket.nodes)) {
    finalNodes.push({
      ...deserializedBracket.nodes[key],
      data: {
        ...deserializedBracket.nodes[key].data,
        attendees,
        state: tournament.data.state,
      },
    });
  }
  const finalEdges = [];
  for (const key of Object.keys(deserializedBracket.edges)) {
    finalEdges.push(deserializedBracket.edges[key]);
  }

  return (
    <div className="h-[500px] w-full border">
      <ReactFlow
        nodes={finalNodes}
        edges={finalEdges}
        nodeTypes={{
          bracketNode: MatchNode,
          roundLabelNode: RoundLabelNode,
        }}
        maxZoom={4}
        minZoom={0.1}
        fitView
      >
        <Background bgColor="var(--secondary-foreground)" />
        <Controls />
      </ReactFlow>
    </div>
  );
}

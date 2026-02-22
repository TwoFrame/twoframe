import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import AdminMatchNode from "./node/AdminMatchNode";
import DisplayMatchNode from "./node/DisplayMatchNode";
import RoundLabelNode from "./node/RoundLabelNode";

export default function Bracket({
  readOnly,
  tournament,
  attendees,
}: {
  readOnly: boolean;
  tournament: any;
  attendees: {
    tournament_id: string;
    attendee_id: string;
    name: string;
  }[];
}) {
  const deserializedBracket = JSON.parse(tournament.data.bracket);
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
          bracketNode: readOnly ? DisplayMatchNode : AdminMatchNode,
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

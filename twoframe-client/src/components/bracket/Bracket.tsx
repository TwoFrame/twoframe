import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import MatchNode from "./MatchNode";
import RoundLabelNode from "./RoundLabelNode";

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
  const parsedBracket = JSON.parse(tournament.data.bracket);
  const finalNodes = [];
  const finalEdges = [];
  for (let i = 0; i < parsedBracket.nodes.length; i++) {
    finalNodes.push({
      ...parsedBracket.nodes[i],
      data: {
        ...parsedBracket.nodes[i].data,
        attendees,
        state: tournament.data.state,
      },
    });
  }
  for (let i = 0; i < parsedBracket.edges.length; i++) {
    finalEdges.push(parsedBracket.edges[i]);
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

import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useMemo } from 'react';
import { Handle, Position } from '@xyflow/react';

const NODE_HEIGHT = 64;
const NODE_WIDTH = 200;
const FIRST_ROUND_NODE_GAP = 100
const ROUND_GAP = 264;

export function RoundLabelNode({ data }: { data: {
  label: string;
} }) {

  return (
  <div 
      className={`w-[${NODE_WIDTH}px] h-[${NODE_HEIGHT}px] font-extrabold text-3xl overflow-hidden whitespace-nowrap text-center`}
      style={{ 
        borderBottom: `1px solid var(--bracket-border)`,
        color: 'white'
      }}
    >
      {data.label}
    </div>
  );
}

function BracketNode({ data }: { data: {
  round: number;
  match: number;
} }) {

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className={`py-1 flex flex-col relative w-[${NODE_WIDTH}px] h-[${NODE_HEIGHT}px] divide-y divide-gray-300 bg-secondary rounded`}>
        <div className="text-xs bg-cyan-300 absolute -top-[12px] rounded ">
          R{data.round}M{data.match}
        </div>
        <div className="flex-1 text-gray-500">Player 1</div>
        <div className="flex-1 text-gray-500">Player 2</div>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}

const generateSkeletonBracketNodesAndEdges = (attendees: number) => {
  //two things we need to calculate beforehand
  //1. number of total rounds given number of attendees
  //2. vertical space that first round nodes should take up
  const rounds = Math.ceil(Math.log2(attendees))
  const nodesInFirstRound = Math.pow(2, rounds)/2
  // const verticalCapacity = (NODE_HEIGHT * nodesInFirstRound) + ((nodesInFirstRound -1) * FIRST_ROUND_NODE_GAP)

  const calculateX = (round: number) => {
    // (round gaps) + (all node widths up to that round) - last node. 
    // formula written explicitly for clarity
    return (round-1)*ROUND_GAP + (round)*NODE_WIDTH - NODE_WIDTH
  }

  //bfs starting at grand finals node
  const q = [];
  const nodes = [];
  const edges = [];
  for (let i = 0; i < nodesInFirstRound; i++){
    q.push({
      id: `R1_M${i+1}`,
      position: { x: calculateX(1), y: i*(NODE_HEIGHT + FIRST_ROUND_NODE_GAP)},
      data: { round: 1, match: i+1 },
      type: 'bracketNode',
    })
  }


  while (q.length > 0) {
    const n1:any = q.shift()
    nodes.push(n1)
    if (q.length == 0) {
      break;
    }
    const n2:any = q.shift()
    nodes.push(n2)

    const nextRound = n1!.data.round + 1
    const n3 = {
      id: `R${nextRound}_M${(n1!.data.match+1)/2}`,
      position: { x: calculateX(nextRound), y: (n1!.position.y + n2!.position.y)/2 },
      data: { round: nextRound, match: (n1!.data.match+1)/2 },
      type: 'bracketNode',
    }
    q.push(n3)
    edges.push({
      id: `${n1!.id}-${n3!.id}`,
      source: n1!.id,
      target: n3!.id,
      type: "smoothstep",
      animated: true,
      
    })
    edges.push({
      id: `e${n2!.id}-${n3!.id}`,
      source: n2!.id,
      target: n3!.id,
      type: "smoothstep",
      animated: true,
    })
  }
  //final adding of label nodes for each round/column
  for (let i = 0; i < rounds; i++) {
    nodes.push({
      id: `RL${i+1}`,
      position: { x: calculateX(i+1), y: -FIRST_ROUND_NODE_GAP },
      data: { label: `Round ${i+1}` },
      type: 'roundLabelNode',
    })

  }
    
  return {nodes, edges}


}
export default function Bracket({numAttendees}: {numAttendees: number}) {
  const nodesAndEdges = useMemo(() => {
    let result = generateSkeletonBracketNodesAndEdges(numAttendees)
    
    return result;
  }, []);
  return (
    <div className="h-[500px] w-full border">
      <ReactFlow 
      nodes={nodesAndEdges.nodes as any} 
      edges={nodesAndEdges.edges as any} 
      nodeTypes={{
        bracketNode: BracketNode,
        roundLabelNode: RoundLabelNode,
      }} 
      maxZoom={4} 
      minZoom={0.1}
      fitView>
        <Background bgColor="var(--secondary-foreground)" />
        <Controls />
      </ReactFlow>
    </div>
  );
}
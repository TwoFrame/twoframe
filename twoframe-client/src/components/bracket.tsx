import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export default function Bracket() {

  const intialNodes = [
    {
      id: 'n1',
      position: { x: 0, y: 0 },
      data: { label: 'Node 1' },
      type: 'input',
    },
    {
      id: 'n2',
      position: { x: 100, y: 100 },
      data: { label: 'Node 2' },
    }
  ]
  return (
    <div className="h-[500px] w-full border">
      <ReactFlow nodes={intialNodes}>
        <Background bgColor="var(--secondary-foreground)"/>
        <Controls />
      </ReactFlow>
    </div>
  );
}
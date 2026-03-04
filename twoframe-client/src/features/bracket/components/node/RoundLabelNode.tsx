const NODE_WIDTH = 200;
const NODE_HEIGHT = 64;

export default function RoundLabelNode({
  data,
}: {
  data: {
    label: string;
  };
}) {
  return (
    <div
      className="flex items-center justify-center font-black text-xl tracking-wide text-teal-600"
      style={{
        width: `${NODE_WIDTH}px`,
        height: `${NODE_HEIGHT}px`,
      }}
    >
      {data.label}
    </div>
  );
}
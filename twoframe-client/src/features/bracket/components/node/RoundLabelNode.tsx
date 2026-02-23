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
      className="underline font-extrabold text-3xl overflow-hidden whitespace-nowrap text-center text-white"
      style={{
        width: `${NODE_WIDTH}px`,
        height: `${NODE_HEIGHT}px`,
      }}
    >
      {data.label}
    </div>
  );
}

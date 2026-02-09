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
      className="font-extrabold text-3xl overflow-hidden whitespace-nowrap text-center"
      style={{
        width: `${NODE_WIDTH}px`,
        height: `${NODE_HEIGHT}px`,
        borderBottom: `1px solid var(--bracket-border)`,
        color: "white",
      }}
    >
      {data.label}
    </div>
  );
}

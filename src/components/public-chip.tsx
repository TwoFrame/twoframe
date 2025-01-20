export default function PublicChip({ is_public }: { is_public: boolean }) {
  return (
    <>
      {is_public && (
        <p className="text-xs font-semibold text-color-lime bg-background-light-green py-1 px-2 rounded-md">
          public
        </p>
      )}
      {!is_public && (
        <p className="text-xs font-semibold text-color-light-blue bg-primary py-1 px-2 rounded-md">
          private
        </p>
      )}
    </>
  );
}

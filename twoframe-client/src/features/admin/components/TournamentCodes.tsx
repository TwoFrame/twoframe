type Props = {
  attendeeCode: string;
  adminCode: string;
};

export function TournamentCodes({ attendeeCode, adminCode }: Props) {
  return (
    <>
      <div className="mt-6 p-4 border rounded">
        <h2 className="font-semibold">Attendee Join Code</h2>
        <p className="text-xl">{attendeeCode}</p>
      </div>
      <div className="mt-6 p-4 border rounded">
        <h2 className="font-semibold">Save this Admin URL!</h2>
        <p className="text-xl">localhost:3000/admin/{adminCode}</p>
      </div>
    </>
  );
}

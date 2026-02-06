import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/admin/$code")({
  component: AdminPage,
});

function AdminPage() {
  const { code } = Route.useParams();
  const [tournament, setTournament] = useState<any>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_TWOFRAME_SERVER_URL}/tournament/admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ admin_code: code }),
    })
      .then((res) => res.json())
      .then(setTournament);
  }, [code]);

  if (!tournament) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{tournament.name}</h1>
      <p className="text-muted-foreground">{tournament.date}</p>
      <p>State: {tournament.state}</p>

      <div className="mt-6 p-4 border rounded">
        <h2 className="font-semibold">Attendee Join Code</h2>
        <p className="text-xl">{tournament.attendee_code}</p>
      </div>
      <div className="mt-6 p-4 border rounded">
        <h2 className="font-semibold">Admin Code</h2>
        <p className="text-xl">{tournament.admin_code}</p>
      </div>
    </div>
  );
}

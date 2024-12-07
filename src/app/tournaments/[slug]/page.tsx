import { TournamentTable } from "@/db/schema";
import { getTournamentBySlug } from "@/db/queries/select";

export default async function TournamentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const { tournament_data, error } = await getTournamentBySlug(slug);

  if (tournament_data) {
    return (
      <div>
        <h1>Tournament: {tournament_data.title}</h1>
        <p>
          Start Date: {new Date(tournament_data.start_date).toLocaleString()}
        </p>
        <p>End Date: {new Date(tournament_data.end_date).toLocaleString()}</p>
      </div>
    );
  }

  return <div>Error: {error}</div>;
}

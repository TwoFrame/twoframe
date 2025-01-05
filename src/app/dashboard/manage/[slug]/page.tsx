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
      <section className="p-4">
        <p>
          Start Date: {new Date(tournament_data.start_date).toLocaleString()}
        </p>
        <p>End Date: {new Date(tournament_data.end_date).toLocaleString()}</p>
      </section>
    );
  }

  return <div>Error: {error}</div>;
}
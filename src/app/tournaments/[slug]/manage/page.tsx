import { TournamentTable } from "@/db/schema";
import { getTournamentBySlug } from "@/db/queries/select";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function TournamentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const supabase = await createClient();
  const { data, error: supabase_error } = await supabase.auth.getUser();

  //this just checks if the user trying to edit this tournament is logged in
  if (supabase_error || !data?.user) {
    redirect("/error");
  }

  //this just checks if we can get tournament based on the slug
  const { tournament_data, error: drizzle_error } =
    await getTournamentBySlug(slug);
  if (drizzle_error || !tournament_data) {
    redirect("/error");
  }

  //final check. Is the person trying to manage this tournament an owner?
  if (tournament_data.owner_id != data.user.id) {
    redirect("/error");
  }

  return (
    <div>
      <h1>Manage Page</h1>
      <h2>Tournament: {tournament_data.title}</h2>
      <p>Start Date: {new Date(tournament_data.start_date).toLocaleString()}</p>
      <p>End Date: {new Date(tournament_data.end_date).toLocaleString()}</p>
    </div>
  );
}

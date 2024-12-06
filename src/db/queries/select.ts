import { count, eq } from "drizzle-orm";
import { db } from "../db";
import { TournamentTable } from "../schema";

export async function getTournamentsByTitle(query_title: string) {
  try {
    const result = await db
      .select({ count: count() })
      .from(TournamentTable)
      .where(eq(TournamentTable.title, query_title));

    return { title_count: result[0].count };
  } catch (error) {
    return { selecterror: error };
  }
}

export async function getTournamentBySlug(slug: string) {
  try {
    const result = await db
      .select()
      .from(TournamentTable)
      .where(eq(TournamentTable.slug, slug));

    if (result.length === 0) {
      return { error: "Tournament not found" };
    }

    return { tournament_data: result[0] }; // Assuming you only want the first result, since slug should be unique
  } catch (error) {
    return { error: "Failed to fetch tournament data" };
  }
}

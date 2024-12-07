import { eq } from "drizzle-orm";
import { db } from "../db";
import { TournamentTable, SlugBaseTable } from "../schema";

export async function getSlugNumber(slug: string) {
  try {
    const result = await db.query.SlugBaseTable.findFirst({
      where: eq(SlugBaseTable.slug_base, slug),
    });
    //slug base doesnt exist yet just return 0
    if (!result) {
      return { title_count: 0 };
    }
    return { title_count: result.latest_number + 1 };
  } catch (error) {
    return { selecterror: error };
  }
}

export async function getTournamentBySlug(slug: string) {
  try {
    const result = await db.query.TournamentTable.findFirst({
      where: eq(TournamentTable.slug, slug),
    });
    if (!result) {
      return { error: "No tournament found" };
    }
    return { tournament_data: result };
  } catch (error) {
    return { error: "Failed to fetch tournament data" };
  }
}

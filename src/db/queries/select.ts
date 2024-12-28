import { and, eq } from "drizzle-orm";
import { db} from "../db";
import { tournaments, slugs, profiles,} from "../schema";

export async function getSlugNumber(slug: string) {
  try {
    const result = await db.query.slugs.findFirst({
      where: eq(slugs.slug_base, slug),
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
    const result = await db.query.tournaments.findFirst({
      where: eq(tournaments.slug, slug),
    });
    if (!result) {
      return { error: "No tournament found" };
    }
    return { tournament_data: result };
  } catch (error) {
    console.log(error)
    return { error: "Failed to fetch tournament data" };
  }
}

export async function getPageOfManagedTournaments(page: number, user_id: string) {

  try {
    const result = await db.query.tournaments.findMany({
      where: eq(tournaments.owner_id, user_id),
      limit: 6,
      offset: page,
    }); 

    if (!result) {
      return {error: "User has not created any tournaments"};
    }
    return {tournament_data: result};
  } catch (error) {
    console.log(error)
    return { error: "Failed to fetch tournament data" };
  }
}

export async function getProfileByUsernameAndTag(username: string, tag: string) {
  try {
    const result = await db.query.profiles.findFirst({
      where: and(
        eq(profiles.username, username),
        eq(profiles.tag, tag)
      ),
    });

    if (!result) {
      return { error: `No profile found for username: ${username} and tag: ${tag}` };
    }

    return { profile_data: result };
  } catch (error) {
    console.log(error)
    return { error: 'Failed to fetch profile data' };
  }
}
import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { tournaments, events, slugs, profiles } from "../schema";

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

export async function getIsTournamentOwner(
  tournament_id: string,
  owner_id: string,
) {
  try {
    const result = await db.query.tournaments.findFirst({
      where: and(
        eq(tournaments.id, tournament_id),
        eq(tournaments.owner_id, owner_id),
      ),
    });

    if (!result) {
      return {
        is_owner:
          "Couldn't authenticate user to create an event for this tournament",
      };
    }

    return { is_owner: true };
  } catch (error) {
    return { tournament_owner_select_error: error };
  }
}

export async function getEventTitleExistsInTournament(
  tournament_id: string,
  event_title: string,
) {
  try {
    const result = await db.query.events.findFirst({
      where: and(
        eq(events.tournament_id, tournament_id),
        eq(events.title, event_title),
      ),
    });
    //this tournament already has an event named this title,
    if (!result) {
      return { event_title_valid: true };
    }
    return {
      event_title_error:
        "An event already exists under this tournament with the given title",
    };
  } catch (error) {
    return { event_title_error: error };
  }
}

export async function getTournamentStartEndDates(id: string) {
  try {
    const result = await db.query.tournaments.findFirst({
      where: eq(tournaments.id, id),
    });

    return { dates: [result!.start_date, result!.end_date] };
  } catch (error) {
    return { tournament_dates_select_error: error };
  }
}

// Temporary function to retreive all tournaments for the explore page
export async function getAllTournaments() {
  try {
    const result = await db.query.tournaments.findMany({
      where: eq(tournaments.public, true),
    });
    return { tournament_data: result };
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch tournament data" };
  }
}

export async function getAllEventsForTournament(tournament_id: string) {
  try {
    const result = await db.query.events.findMany({
      where: eq(events.tournament_id, tournament_id),
    });
    return { event_data: result };
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch event data for tournament" };
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
    console.log(error);
    return { error: "Failed to fetch tournament data" };
  }
}

export async function getPageOfManagedTournaments(
  page: number,
  user_id: string,
) {
  try {
    const result = await db.query.tournaments.findMany({
      where: eq(tournaments.owner_id, user_id),
      // TODO: Add pagination later on
      // limit: 6,
      // offset: page,
    });

    if (!result) {
      return { error: "User has not created any tournaments" };
    }
    return { tournament_data: result };
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch tournament data" };
  }
}

export async function getProfileByUsernameAndTag(
  username: string,
  tag: string,
) {
  try {
    const result = await db.query.profiles.findFirst({
      where: and(eq(profiles.username, username), eq(profiles.tag, tag)),
    });

    if (!result) {
      return {
        error: `No profile found for username: ${username} and tag: ${tag}`,
      };
    }

    return { profile_data: result };
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch profile data" };
  }
}

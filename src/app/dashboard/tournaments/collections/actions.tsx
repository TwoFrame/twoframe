"use server";

import { getPageOfManagedTournaments } from "@/db/queries/select";
import { TournamentData } from "../types";

export async function fetchManagedTournaments(page: number, user_id: string): Promise<TournamentData[] | undefined> {
  "use server";
  const {tournament_data, error} = await getPageOfManagedTournaments(page, user_id)
  if (error) {
      console.log(error)
      return []
  }
  return tournament_data!
}


"use server";

import { getPageOfManagedTournaments, getTournamentBySlug } from "@/db/queries/select";
import { TournamentData } from "../../tournaments/types";
import { TournamentContextType } from "../../tournaments/types";

export async function fetchTournamentBySlug(slug: string): Promise<TournamentData | null> {
  "use server";
  const {tournament_data, error} = await getTournamentBySlug(slug)
  if (error) {
      console.log(error)
      return null
  }
  return tournament_data ?? null
}




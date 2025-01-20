"use server";

import { getAllTournaments } from "@/db/queries/select";
import { TournamentData } from "../types";

export async function fetchAllTournaments(): Promise<
  TournamentData[] | undefined
> {
  "use server";
  const { tournament_data, error } = await getAllTournaments();
  if (error) {
    console.log(error);
    return [];
  }
  return tournament_data;
}

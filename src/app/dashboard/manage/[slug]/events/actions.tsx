"use server";

import {EventData} from './types';
import { getAllEventsForTournament} from "@/db/queries/select";


export async function fetchAllEventsUnderTournament(tournament_id: string): Promise<
  EventData[] | undefined
> {
  "use server";
  const { event_data, error } = await getAllEventsForTournament(tournament_id);
  if (error) {
    console.log(error);
    return [];
  }
  return event_data;
}

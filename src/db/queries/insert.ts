import { db } from "../db";
import { InsertTournament, TournamentTable } from "../schema";

export async function createTournament(data: InsertTournament) {
  try {
    const insertedTournament = await db.insert(TournamentTable).values(data);

    return { insertedTournament };
  } catch (error) {
    return { inserterror: error };
  }
}

import { db } from "../db";
import {
  InsertTournament,
  InsertSlugBase,
  TournamentTable,
  SlugBaseTable,
} from "../schema";

export async function createTournament(data: InsertTournament) {
  try {
    const insertedTournament = await db.insert(TournamentTable).values(data);

    return { insertedTournament };
  } catch (error) {
    return { insert_error: error };
  }
}

export async function createSlugBase(data: InsertSlugBase) {
  try {
    const insertedSlugBase = await db.insert(SlugBaseTable).values(data);

    return { insertedSlugBase };
  } catch (error) {
    return { insert_error: error };
  }
}

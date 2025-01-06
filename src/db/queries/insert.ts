import { db } from "../db";
import {
  InsertProfile,
  InsertTournament,
  InsertSlugBase,
  profiles,
  tournaments,
  slugs,
  InsertEntrant,
  entrants,
} from "../schema";

export async function createProfile(data: InsertProfile) {
  try {
    const insertedProfile = await db.insert(profiles).values(data);

    return { insertedProfile };
  } catch (error) {
    return { insert_error: error };
  }
}

export async function createTournament(data: InsertTournament) {
  try {
    const insertedTournament = await db.insert(tournaments).values(data);

    return { insertedTournament };
  } catch (error) {
    return { insert_error: error };
  }
}

export async function createSlugBase(data: InsertSlugBase) {
  try {
    const insertedSlugBase = await db.insert(slugs).values(data);

    return { insertedSlugBase };
  } catch (error) {
    return { insert_error: error };
  }
}


export async function registerForTournament(data: InsertEntrant)  {
  try {
    const insertedEntrant = await db.insert(entrants).values(data)
    return {insertedEntrant}
  } catch (error) {
    return {insert_error: error}
  }
}
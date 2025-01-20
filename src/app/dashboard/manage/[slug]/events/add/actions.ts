"use server";

import slugify from "slugify/slugify";
import { EventCreateSchema } from "@/app/_lib/schemas";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {
  getEventTitleExistsInTournament,
  getIsTournamentOwner,
} from "@/db/queries/select";
import { createEvent } from "@/db/queries/insert";

export interface EventCreateState {
  validation_error: {
    tournament_id?: string[];
    title?: string[];
    game?: string[];
    start_date?: string[];
    rules?: string[];
    entrant_limit?: string[];
  } | null;
  server_error?: any;
  success?: boolean;
}

export async function createEventAction(
  prevState: EventCreateState | null,
  formData: FormData,
): Promise<EventCreateState> {
  //ACTUAL FORM VALIDATION FIRST, SIMPLE CHECKS OF THE INPUTTED DATA
  console.log(formData);
  const validationResult = EventCreateSchema.safeParse({
    tournament_id: formData.get("tournament_id"),
    title: formData.get("title"),
    game: formData.get("game"),
    entrant_limit: formData.get("entrant_limit"),
    start_date: new Date(formData.get("start_date") as string).toISOString(),
    rules: formData.get("rules"),
  });

  if (validationResult.error) {
    console.log("not all fields are valid");
    console.log(validationResult.error.flatten().fieldErrors);
    return {
      validation_error: validationResult.error.flatten().fieldErrors,
      server_error: null,
      success: false,
    };
  }

  //ARE WE EVEN LOGGED IN
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  //DO WE EVEN OWN THE TOURNAMENT WE ARE MAKING AN EVENT FOR
  const { tournament_owner_select_error } = await getIsTournamentOwner(
    formData.get("tournament_id") as string,
    data.user.id,
  );

  if (tournament_owner_select_error) {
    return {
      validation_error: null,
      server_error: tournament_owner_select_error,
      success: false,
    };
  }

  //TODO: CUSTOM CHECK TO SEE IF START DATE IS WITHIN TOURNAMENT'S START-END DATES
  //OPTING OUT OF THE ABOVE OPTION. MIGHT BE KIND OF ANNOYING IF THEY MESS UP THEIR TOURNAMENT START-END DATES

  //MAKE SURE THERE ISN'T AN EVENT WITH THE SAME NAME UNDER THIS TOURNAMENT
  const { event_title_valid, event_title_error } =
    await getEventTitleExistsInTournament(
      formData.get("tournament_id") as string,
      formData.get("title") as string,
    );

  if (event_title_error) {
    console.log("event title already exists under this tournament");
    return {
      validation_error: null,
      server_error: event_title_error,
      success: false,
    };
  }

  const { tournament_id, title, start_date, game, entrant_limit, rules } =
    validationResult!.data;
  const { insert_error } = await createEvent({
    tournament_id: tournament_id,
    title: title,
    game: game,
    start_date: start_date,
    rules: rules,
    entrant_limit: entrant_limit as unknown as number,
    slug: slugify(title),
    serialized_bracket: "",
    completed: false,
  });

  if (insert_error) {
    return {
      validation_error: null,
      server_error: insert_error,
      success: false,
    };
  }

  return {
    validation_error: null,
    server_error: null,
    success: true,
  };
}

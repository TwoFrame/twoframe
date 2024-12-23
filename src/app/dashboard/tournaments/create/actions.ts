"use server";

import { TournamentCreateSchema } from "@/app/_lib/schemas";
import { TournamentCreateState } from "../types";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import { createTournament, createSlugBase } from "@/db/queries/insert";
import { updateSlugBase } from "@/db/queries/update";
import { getSlugNumber } from "@/db/queries/select";
import slugify from "slugify/slugify";

export async function createTournamentAction(
  prevState: TournamentCreateState | null,
  formData: FormData,
): Promise<TournamentCreateState> {
  //we have protections on the client side (aka redirect),
  //but we also want to protect this actual server action
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  //run a custom check. zod can run a datetime check afterwards
  //not sure if this is needed. required attribute within the input tags should make sure the strings are parsable
  const startDateObject = Date.parse(formData.get("start_date") as string);
  const endDateObject = Date.parse(formData.get("end_date") as string);
  if (isNaN(startDateObject) || isNaN(endDateObject)) {
    return {
      validation_error: {
        start_date: isNaN(startDateObject)
          ? ["Unreadable end date format"]
          : [],
        end_date: isNaN(endDateObject) ? ["Unreadable end date format"] : [],
      },
      server_error: null, 
      success: false
    };
  }

  //make sure what the user gave us is formatted properly
  const validationResult = TournamentCreateSchema.safeParse({
    title: formData.get("title"),
    start_date: new Date(formData.get("start_date") as string).toISOString(),
    end_date: new Date(formData.get("end_date") as string).toISOString(),
    description: formData.get("description")
  });

  if (validationResult.error) {
    console.log('not all fields are valid')
    console.log(validationResult.error.flatten().fieldErrors )
    return {
      validation_error: validationResult.error.flatten().fieldErrors,
      server_error: null,
      success: false
    };
  }

  const { title, start_date, end_date, description } = validationResult!.data;

  //we want to generate the slug next
  const { title_count, selecterror } = await getSlugNumber(slugify(title));
  if (selecterror) {
    redirect("/error");
  }

  const { insert_error } = await createTournament({
    owner_id: data.user.id,
    title: title,
    slug: slugify(title + " " + title_count),
    start_date: start_date,
    end_date: end_date,
    registration_deadline: start_date,
    description: description
  });

  if (insert_error) {
    return {
      validation_error: null,
      server_error: insert_error,
      success: false
    }
  }

  //now that our tournament has been inserted, we need to now make sure the slugtable is updated as well
  if (title_count == 0) {
    //current slug isn't in the slug table yet, add with 0
    const { insert_error } = await createSlugBase({
      slug_base: slugify(title),
    });

    if (insert_error) {
      return {
        validation_error: null,
        server_error: insert_error,
        success: false
      }
    }
  } else {
    //slug_base already exists, just increment
    const { update_error } = await updateSlugBase(slugify(title), {
      latest_number: title_count,
    });
    if (update_error) {
      return {
        validation_error: null,
        server_error: update_error,
        success: false
      }
    }
  }

  console.log("Successful insertion")
  return {
    validation_error: null,
    server_error: null,
    success: true
  }
}

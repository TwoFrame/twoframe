"use server";

import { TournamentCreateSchema } from "@/app/_lib/schemas";
import { TournamentCreateState } from "../types";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import { createTournament } from "@/db/queries/insert";
import { getTournamentsByTitle } from "@/db/queries/select";
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
      errors: {
        start_date: isNaN(startDateObject)
          ? ["Unreadable end date format"]
          : [],
        end_date: isNaN(endDateObject) ? ["Unreadable end date format"] : [],
      },
    };
  }

  //make what the user gave us is formatted properly
  const validationResult = TournamentCreateSchema.safeParse({
    title: formData.get("title"),
    start_date: new Date(formData.get("start_date") as string).toISOString(),
    end_date: new Date(formData.get("end_date") as string).toISOString(),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { title, start_date, end_date } = validationResult.data;

  //we want to generate the slug next
  const { title_count, selecterror } = await getTournamentsByTitle(title);
  if (selecterror) {
    console.log(selecterror);
    redirect("/error");
  }

  console.log(title + " " + title_count);
  const { inserterror } = await createTournament({
    owner_id: data.user.id,
    title: title,
    slug: slugify(title + " " + title_count),
    start_date: start_date,
    end_date: end_date,
  });

  if (inserterror) {
    console.log(inserterror);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

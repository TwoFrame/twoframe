"use server";

import { SignupSchema } from "@/app/_lib/schemas";
import { SignupState } from "../types";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createProfile } from "@/db/queries/insert";
import { createClient } from "@/utils/supabase/server";

export async function signup(
  prevState: SignupState | null,
  formData: FormData,
): Promise<SignupState> {
  const supabase = await createClient();

  const validationResult = SignupSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    cpassword: formData.get("cpassword"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = validationResult.data;

  const { data, error } = await supabase.auth.signUp({ email, password });

  //if something goes wrong with creating the user
  if (error || !data?.user) {
    redirect("/error");
  }
  //add user
  const { insert_error } = await createProfile({
      user_id: data.user.id,
      username: username,
    });
  
    if (insert_error) {
      redirect("/error");
    }




  revalidatePath("/", "layout");
  redirect("/");
}

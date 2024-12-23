"use server";

import { SignupSchema } from "@/app/_lib/schemas";
import { SignupState } from "../types";
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

  // If something goes wrong with creating the user, redirect to an error page
  if (error || !data?.user) {
    redirect("/error");
  }
  
  // Create the user
  const { insert_error } = await createProfile({
      user_id: data.user.id,
      username: username,
  });

  if (insert_error) {
    console.log(insert_error)
    redirect("/error");
  }

  console.log('Created profile')
    
  // Return a successful sign up state back to the client
  return {
    errors: undefined,
    success: true
  }
}

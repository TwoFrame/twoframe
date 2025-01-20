"use server";

import { LoginSchema } from "@/app/_lib/schemas";
import { LoginState } from "../types";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(
  prevState: LoginState | null,
  formData: FormData,
): Promise<LoginState> {
  const supabase = await createClient();

  // Validate form Data
  const validationResult = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationResult.success) {
    console.log(
      "Validation failed",
      validationResult.error.flatten().fieldErrors,
    );
    return {
      errors: validationResult.error.flatten().fieldErrors,
      success: false,
    };
  }

  // Sign in using supabase auth
  const { email, password } = validationResult.data;
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  //
  if (error) {
    console.log("Sign-in error:", error.message);
    redirect("/error");
  }

  // Return a successful login state back to the client
  return {
    errors: undefined,
    success: true,
  };
}

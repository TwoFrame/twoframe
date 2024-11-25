"use server";

import { LoginSchema } from "@/app/_lib/schemas";
import { LoginState } from "../types";

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {

  const supabase = await createClient()

  // Validate form Data
  const validationResult = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      success: false
    };
  }

  // Console Info
  const { email, password } = validationResult.data;
  console.log("HANDLE LOGIN");
  console.log("EMAIL:" + email);
  console.log("PASSWORD:" + password);


  // Attempt to sign in
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
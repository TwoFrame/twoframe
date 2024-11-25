"use server";

import { SignupSchema } from "@/app/_lib/schemas";
import { SignupState } from "../types";


import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function signup(
  prevState: SignupState | null,
  formData: FormData
): Promise<SignupState> {

  const supabase = await createClient()

  
  const validationResult = SignupSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    cpassword: formData.get("cpassword"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors
    };
  }

  const { email, password } = validationResult.data;
  console.log("HANDLE SIGNUP");
  console.log("EMAIL:" + email);
  console.log("PASSWORD:" + password);

  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
"use server";

import { SignupSchema } from "@/app/_lib/schemas";

export async function signup(state: any, formData: FormData) {
  //1. Form validation, if form not filled correctly display error to user (red text)
  const validationResult = SignupSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    cpassword: formData.get('cpassword'),
  })

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors
    }
  }
  
  console.log("TODO: ACTUALLY SIGN UP USER")


}

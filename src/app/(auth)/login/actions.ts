"use server";

import { LoginSchema } from "@/app/_lib/schemas";

export async function login(state: any, formData: FormData) {
   //1. Form validation, if form not filled correctly display error to user (red text)
   const validationResult = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors
    }
  }
  console.log("HANDLE LOGIN");
  console.log("EMAIL:" + formData.get("email"));
  console.log("USERNAME:" + formData.get("username"));
}

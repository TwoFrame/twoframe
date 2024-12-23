"use server";

import { SignupSchema } from "@/app/_lib/schemas";
import { SignupState } from "../types";
import { redirect } from "next/navigation";
import { createProfile } from "@/db/queries/insert";
import { createClient } from "@/utils/supabase/server";
import { getProfileByUsernameAndTag } from "@/db/queries/select";

// Function to generate a random tag of length 6 (alphanumeric)
function generateRandomTag(length: number = 6): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function checkTagExistence(username: string, tag: string) {
  try {
    const result = await getProfileByUsernameAndTag(username, tag);
    return !result.error;
  } catch (error) {
    console.error('Error checking tag existence:', error);
  }
}

async function generateUniqueTag(username: string) {
  const defaultTag = '2frame';
  let isUnique = false;
  let tag = defaultTag; 

  isUnique = !(await checkTagExistence(username, tag));

  if (!isUnique) {
    while (!isUnique) {
      tag = generateRandomTag();
      isUnique = !(await checkTagExistence(username, tag));
    }
  }

  return tag;
}

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
    console.log(error)
    redirect("/error");
  }

  // Generate a unique tag for the user
  const uniqueTag = await generateUniqueTag(username);
  
  const { insert_error } = await createProfile({
    user_id: data.user.id,
    username: username,
    tag: uniqueTag
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

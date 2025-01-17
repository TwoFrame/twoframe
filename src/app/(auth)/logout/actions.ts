"use server";

import { createClient } from "@/utils/supabase/server";

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  return { success: !error, error };
}

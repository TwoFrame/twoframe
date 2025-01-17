"use server";

import { getPictureUrl } from "@/db/queries/select";

export async function fetchUserProfilePicture(userId: string): Promise<string | null> {
  try {
    // Fetch the picture URL from the database using the user ID
    const { picture_url, error } = await getPictureUrl(userId);

    if (error) {
      console.error('Error fetching picture URL:', error);
      return null;
    }

    return picture_url ?? null; // Return the picture URL or null if not found
  } catch (error) {
    console.error('Error in fetchUserProfilePicture:', error);
    return null;
  }
}
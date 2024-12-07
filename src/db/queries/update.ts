import { eq } from "drizzle-orm";
import { db } from "../db";
import { SelectSlugBase, SlugBaseTable } from "../schema";

export async function updateSlugBase(
  slug_base: SelectSlugBase["slug_base"],
  data: Partial<Omit<SelectSlugBase, "slug_base">>,
) {
  try {
    const updated_slug = await db
      .update(SlugBaseTable)
      .set(data)
      .where(eq(SlugBaseTable.slug_base, slug_base));
    return { updated_slug };
  } catch (error) {
    return { update_error: error };
  }
}

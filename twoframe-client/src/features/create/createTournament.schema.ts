import { z } from "zod";

//using tanstack form for easier data validation and submission handling
export interface TournamentFormEntry {
  name: string;
  date: string;
}

export const defaultFormValues = {
  name: "",
  date: "",
};

export const formSchema = z.object({
  name: z
    .string()
    .min(4, "Tournament name must have at least 4 characters")
    .max(64, "Tournament name must be at most 64 characters"),
  date: z
    .string()
    .refine(
      (val) => val && new Date(val) > new Date(),
      "Event must be in the future",
    ),
});
import { z } from "zod";

export const SignupSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: "Username must be at least 4 characters long." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    cpassword: z.string(),
  })
  .refine((data) => data.password === data.cpassword, {
    path: ["cpassword"],
    message: "Passwords do not match.",
  });

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export const TournamentCreateSchema = z
  .object({
    title: z
      .string()
      .min(4, {
        message: "Tournament title must at least be 4 characters long",
      })
      .max(60, {
        message: "Tournament title must be at most 60 characters long",
      }),
    start_date: z.string().datetime(),
    end_date: z.string().datetime(),
    description: z.string(),
    is_public: z.boolean(),
  })
  .refine((data) => new Date(data.start_date) > new Date(), {
    message: "Start date must be in the future",
    path: ["start_date"],
  })
  .refine((data) => new Date(data.end_date) > new Date(data.start_date), {
    message: "End date must be after start date",
    path: ["end_date"],
  });

export const GAMES = [
  "super_smash_bros_ultimate",
  "super_smash_bros_melee",
  "street_fighter_6",
  "tekken_8",
] as const;
export const EventCreateSchema = z.object({
  tournament_id: z.string(),
  title: z
    .string()
    .min(4, {
      message: "Event title must at least be 4 characters long",
    })
    .max(32, {
      message: "Event title must be at most 30 characters long",
    }),
  game: z.enum(GAMES, { message: "Not a valid game" }),
  entrant_limit: z.string().refine(
    (val) => {
      const num = parseInt(val, 10);
      return !isNaN(num) && num >= 2 && num <= 128;
    },
    {
      message:
        "Event cannot have less than 2 entrants for more than 128 entrants",
    },
  ),
  //start date no zod check, just run a custom one in the action
  start_date: z.string().datetime(),
  rules: z.string().max(2000, {
    message: "Rules cannot be more than 300 chars long",
  }),
});

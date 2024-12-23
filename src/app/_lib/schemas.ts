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
    description: z.string()
  })
  .refine((data) => new Date(data.start_date) > new Date(), {
    message: "Start date must be in the future",
    path: ["start_date"],
  })
  .refine((data) => new Date(data.end_date) > new Date(data.start_date), {
    message: "End date must be after start date",
    path: ["end_date"],
  });

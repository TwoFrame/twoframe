import { z } from "zod"

export const SignupSchema = z.object({
    username: z.string().min(4, { message: "Username must be at least 4 characters long." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
    cpassword: z.string(),
}).refine((data) => data.password === data.cpassword, {
    path: ["cpassword"],
    message: "Passwords do not match.",
  });

export const LoginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
})
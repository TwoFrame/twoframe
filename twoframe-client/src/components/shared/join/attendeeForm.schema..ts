import { z } from "zod";
import { formOptions } from "@tanstack/react-form";

export const attendeeFormSchema = z.object({
  name: z
    .string()
    .min(1, "Enter your name")
    .max(32, "Name must be less than 32 characters"),
  attendee_code: z.string().length(8, "Invalid code"),
});

export const formOpts = formOptions({
  defaultValues: {
    name: "",
    attendee_code: "",
  },
  validators: {
    onMount: attendeeFormSchema,
    // onBlur: joinFormSchema,
    onChange: attendeeFormSchema,
  },
});

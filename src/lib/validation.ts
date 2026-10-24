import { z } from "zod";

export const waitlistSchema = z.object({
  email: z
    .string({
      required_error: "Email address is required.",
      invalid_type_error: "Email must be a valid string.",
    })
    .trim()
    .min(3, "Email must be at least 3 characters long.")
    .max(254, "Email must be 254 characters or fewer.")
    .email("Please provide a valid email address.")
    .refine((val) => !val.includes(" "), "Email cannot contain spaces."),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}


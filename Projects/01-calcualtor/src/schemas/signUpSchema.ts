import { z } from "zod";

// Password validation for shared use
const passwordValidation = z
  .string()
  .min(6, { message: "Password must be more than 6 characters." })
  .max(30, { message: "Password must not be more than 30 characters." });

// Sign-up schema with password confirmation validation
export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: "Name must be more than 4 characters." })
      .max(20, { message: "Name must not be more than 20 characters." })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "User name must not contain special characters.",
      }),

    email: z.string().email(),

    password: passwordValidation,

    confirmPassword: passwordValidation,
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

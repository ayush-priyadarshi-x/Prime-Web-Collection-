import { z } from "zod";

export interface signInInterface {
  identifier: string;
  password: string;
}

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(4, {
      message: "Username or Password should not be less than 4 characters. ",
    }),
  password: z
    .string()
    .min(6, { message: "Password must not be more less 6 characters. " })
    .max(30, { message: "Password must not be more than 30 characters. " }),
});

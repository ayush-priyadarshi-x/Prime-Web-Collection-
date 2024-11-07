import { z } from "zod";

export const verifyCodeSchema = z.object({
  verifyCode: z
    .string()
    .length(6, { message: "The length of code should be 6 . " }),
});

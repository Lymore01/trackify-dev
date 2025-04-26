import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address!",
  }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long" }),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(6, { message: "User name should be at least 6 characters long" })
    .max(15, { message: "User name should be less than 15 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long" }),
});


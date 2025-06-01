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

export const forgotPassSchema = z.object({
  email: z.string().email("Email is required1!"),
});

export const resetPassSchema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(6),
  token: z.string().optional(),
  currentPassword: z.string().optional(),
}).refine(
  (data) => data.token || data.currentPassword,
  {
    message: "Either token or currentPassword must be provided.",
    path: ["token", "currentPassword"],
  }
);

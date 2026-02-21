import { z } from "zod";

const envSchema = z.object({
  DIRECT_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  REDIS_TOKEN: z.string().min(1),
  COOKIE_SESSION_KEY: z.string().min(1),
  GOOGLE_APP_ID: z.string().optional(),
  EMAIL_SENDER: z.string().email().optional(),
  IPINFO_TOKEN: z.string().min(1).optional(),
  BASE_URL: z.string().url().default("http://localhost:3000"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

const env = envSchema.safeParse({
  DIRECT_URL: process.env.DIRECT_URL,
  REDIS_URL: process.env.UPSTASH_REDIS_REST_URL,
  REDIS_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  COOKIE_SESSION_KEY: process.env.COOKIE_SESSION_KEY,
  GOOGLE_APP_ID: process.env.GOOGLE_APP_ID,
  EMAIL_SENDER: process.env.EMAIL_SENDER,
  IPINFO_TOKEN: process.env.IPINFO_TOKEN,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NODE_ENV: process.env.NODE_ENV,
});

if (!env.success) {
  console.error("❌ Invalid environment variables:", env.error.format());
  throw new Error("Invalid environment variables");
}

export const config = env.data;

import { z } from "zod";

export const webhookSchema = z.object({
  url: z.string().url().nonempty("URL is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  events: z.array(z.string()),
  app: z.string(),
});
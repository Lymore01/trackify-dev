import { z } from "zod";

export const urlSchema = z.object({
  originalUrl: z.string().url("Invalid URL").nonempty("URL cannot be empty"),
  description: z.string().optional(),
  appId: z.string().nonempty("App ID cannot be empty"),
});

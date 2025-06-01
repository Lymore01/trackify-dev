import { z } from "zod";

export const webhookSchema = z.object({
  url: z.string().url().nonempty("URL is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  events: z.array(z.string()),
  app: z.string(),
});

export const webhookRequestSchema = z.object({
  appId: z.string().min(1, "appId is required"),
  endpointId: z.string().min(1, "endpointId is required"),
  statusCode: z.number().int().nonnegative(),
  response: z.any(), // you can refine this depending on the structure
  payload: z.any(),  // optionally replace with stricter schema if known
  eventType: z.string().min(1, "eventType is required"),
  durationMs: z.number().optional()
});
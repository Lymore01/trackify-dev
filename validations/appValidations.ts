import { z } from "zod";

export const createAppSchema = z.object({
  appName: z.string().min(2, {
    message: "App name required!",
  }),
});


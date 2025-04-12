import { z } from "zod";

export const approveOrDisaproveSchema = z.object({
  body: z.object({
    userId: z.string(),
  }),
  query: z.object({}),
  params: z.object({}),
});
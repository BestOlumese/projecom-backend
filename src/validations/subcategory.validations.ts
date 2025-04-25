import { z } from "zod";

const MAX_NAME_LENGTH = 255;

export const nameSchema = z
  .string()
  .trim()
  .min(1, "Name cannot be empty")
  .max(MAX_NAME_LENGTH, `Name cannot exceed ${MAX_NAME_LENGTH} characters`);

export const subcategorySchema = z.object({
  body: z.object({
    name: nameSchema,
    categoryId: z.string(),
  }),
  query: z.object({}),
  params: z.object({}),
});
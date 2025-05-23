import { z } from "zod";

const MAX_NAME_LENGTH = 255;

export const businessNameSchema = z
  .string()
  .trim()
  .min(3, "Business name cannot be empty")
  .max(MAX_NAME_LENGTH, `Business cannot exceed ${MAX_NAME_LENGTH} characters`);

export const  vendorSchema = z.object({
  body: z.object({
    businessName: businessNameSchema,
    description: z
      .string()
      .trim()
      .optional(),
    address: z
      .string()
      .trim()
      .min(5, "Address name cannot be empty")
      .optional(),
    phone: z.string(),
    website: z.string().optional().nullable(),
    approved: z.boolean().default(false)
  }),
  query: z.object({}),
  params: z.object({}),
});

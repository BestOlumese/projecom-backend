import { z } from "zod";

const MAX_NAME_LENGTH = 255;
const MIN_PASSWORD_LENGTH = 4;

export const nameSchema = z
  .string()
  .trim()
  .min(1, "Name cannot be empty")
  .max(MAX_NAME_LENGTH, `Name cannot exceed ${MAX_NAME_LENGTH} characters`);

export const passwordSchema = z
  .string()
  .trim()
  .min(
    MIN_PASSWORD_LENGTH,
    `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
  );

export const userUpdateSchema = z.object({
  body: z.object({
    name: nameSchema,
  }),
  query: z.object({}),
  params: z.object({}),
});

export const userNewPasswordSchema = z.object({
  body: z.object({
    old_password: z.string().trim(),
    new_password: passwordSchema,
  }),
  query: z.object({}),
  params: z.object({}),
});

export const userUpdateImageSchema = z.object({
  body: z.object({
    image: z.string().min(1, "Image cannot be empty"),
  }),
  query: z.object({}),
  params: z.object({}),
});

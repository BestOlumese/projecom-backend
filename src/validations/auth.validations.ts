import { z } from "zod";

// Constants
const MIN_PASSWORD_LENGTH = 4;
const MAX_EMAIL_LENGTH = 255;
const MAX_NAME_LENGTH = 255;
const MAX_ROLE_LENGTH = 10;

// Role enum (better than string for fixed values)
export const UserRoles = {
  USER: "USER",
  VENDOR: "VENDOR",
  ADMIN: "ADMIN",
} as const;

export type UserRoleType = keyof typeof UserRoles;

// Base schemas
export const emailSchema = z
  .string()
  .trim()
  .email("Invalid email address")
  .min(1, "Email cannot be empty")
  .max(MAX_EMAIL_LENGTH, `Email cannot exceed ${MAX_EMAIL_LENGTH} characters`);

export const passwordSchema = z
  .string()
  .trim()
  .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`);

export const nameSchema = z
  .string()
  .trim()
  .min(1, "Name cannot be empty")
  .max(MAX_NAME_LENGTH, `Name cannot exceed ${MAX_NAME_LENGTH} characters`);

export const roleSchema = z
  .string()
  .trim()
  .min(1, "Role cannot be empty")
  .max(MAX_ROLE_LENGTH, `Role cannot exceed ${MAX_ROLE_LENGTH} characters`)
  .refine(
    (val) => Object.values(UserRoles).includes(val as UserRoleType),
    `Role must be one of: ${Object.values(UserRoles).join(", ")}`
  );

// Composite schemas
export const loginSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: passwordSchema,
  }),
  query: z.object({}),
  params: z.object({}),
});

export const resendVerificationSchema = z.object({
  body: z.object({
    email: emailSchema,
  }),
  query: z.object({}),
  params: z.object({}),
});

export const registerSchema = z.object({
  body: z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    role: roleSchema,
  }),
  query: z.object({}),
  params: z.object({}),
});

// Type exports
export type EmailType = z.infer<typeof emailSchema>;
export type PasswordType = z.infer<typeof passwordSchema>;
export type NameType = z.infer<typeof nameSchema>;
export type RoleType = z.infer<typeof roleSchema>;
export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

// Optional: Type guards
export function isUserRole(role: string): role is UserRoleType {
  return Object.values(UserRoles).includes(role as UserRoleType);
}
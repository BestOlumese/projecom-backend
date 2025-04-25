import { z } from "zod";

// Constants for validation
const MAX_TITLE_LENGTH = 100;
const MIN_TITLE_LENGTH = 3;
const MAX_SLUG_LENGTH = 100;
const MIN_SLUG_LENGTH = 3;
const MIN_DESCRIPTION_LENGTH = 20;
const MAX_IMAGES = 10;
const MIN_IMAGES = 1;

// Basic schemas
export const titleSchema = z
  .string()
  .trim()
  .min(MIN_TITLE_LENGTH, `Title must be at least ${MIN_TITLE_LENGTH} characters`)
  .max(MAX_TITLE_LENGTH, `Title cannot exceed ${MAX_TITLE_LENGTH} characters`);

export const descriptionSchema = z
  .string()
  .trim()
  .min(MIN_DESCRIPTION_LENGTH, `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters`);

export const priceSchema = z
  .union([
    z.number().positive("Price must be positive"),
    z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format").transform(Number)
  ]);

export const stockSchema = z
  .union([
    z.number().int().nonnegative("Stock cannot be negative"),
    z.string().regex(/^\d+$/, "Stock must be a whole number").transform(Number)
  ]);

export const subcategoryIdSchema = z
  .string()
  .trim()
  .min(1, "Subcategory ID cannot be empty");

export const urlSchema = z
  .string()
  .url("Must be a valid URL")
  .or(z.string().regex(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, "Invalid URL format"));

export const specificationsSchema = z
  .record(z.any())
  // .refine(specs => {
  //   // Required laptop specifications
  //   const requiredSpecs = ['processor', 'ram', 'storage', 'displaySize'];
  //   return requiredSpecs.every(spec => spec in specs);
  // }, {
  //   message: "Missing required specifications: processor, ram, storage, displaySize"
  // });

// Product creation schema
export const createProductSchema = z.object({
  body: z.object({
    title: titleSchema,
    description: descriptionSchema,
    price: priceSchema,
    stock: stockSchema,
    specifications: specificationsSchema,
    subcategoryId: subcategoryIdSchema,
    images: z.array(urlSchema)
      .min(MIN_IMAGES, `At least ${MIN_IMAGES} image is required`)
      .max(MAX_IMAGES, `Maximum ${MAX_IMAGES} images allowed`)
  }),
  query: z.object({}),
  params: z.object({})
});

// Product update schema - all fields are optional
export const updateProductSchema = z.object({
  body: z.object({
    title: titleSchema.optional(),
    description: descriptionSchema.optional(),
    price: priceSchema.optional(),
    stock: stockSchema.optional(),
    specifications: specificationsSchema.optional(),
    subcategoryId: subcategoryIdSchema.optional(),
    images: z.array(urlSchema)
      .min(MIN_IMAGES, `At least ${MIN_IMAGES} image is required`)
      .max(MAX_IMAGES, `Maximum ${MAX_IMAGES} images allowed`)
      .optional()
  }),
  query: z.object({}),
  params: z.object({})
});

// Search and filter schema
export const searchProductsSchema = z.object({
  body: z.object({}),
  query: z.object({
    query: z.string().optional(),
    minPrice: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid minimum price").transform(Number).optional(),
    maxPrice: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid maximum price").transform(Number).optional(),
    subcategory: z.string().optional(),
    status: z.enum(['DRAFT', 'PENDING', 'APPROVED', 'REJECTED']).optional(),
    inStock: z.enum(['true', 'false']).optional(),
    sortBy: z.enum(['createdAt', 'price', 'title', 'stock']).optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
    page: z.string().regex(/^\d+$/, "Page must be a number").transform(Number).optional().default('1'),
    limit: z.string().regex(/^\d+$/, "Limit must be a number").transform(Number).optional().default('10'),
    specifications: z.string().optional().transform(val => {
      if (!val) return undefined;
      try {
        return JSON.parse(val);
      } catch (e) {
        throw new Error('Invalid specifications JSON format');
      }
    })
  }),
  params: z.object({})
}).refine(data => {
  // Ensure minPrice <= maxPrice if both are provided
  if (data.query.minPrice !== undefined && data.query.maxPrice !== undefined) {
    return data.query.minPrice <= data.query.maxPrice;
  }
  return true;
}, {
  message: "Minimum price must be less than or equal to maximum price",
  path: ["query.minPrice"]
});
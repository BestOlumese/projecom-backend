// @ts-nocheck
import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getAllProductByVendor,
  getProductById,
  getProductByIdAndVendorId,
  getProductBySlug,
  updateProduct,
} from "../services/productService";
import { generateSlug } from "../utils/slug";
import { Prisma } from "@prisma/client";
import { subcategoryIdSchema } from "../validations/product.validations";
import { getSubcategoryById } from "../services/subcategoryService";

export const createProductController = async (req: Request, res: Response) => {
  try {
    const vendorId = req.user.vendor.id;
    const slug = generateSlug(req.body.title);
    req.body.slug = slug;

    // Check if slug is already in use
    const existingProduct = await getProductBySlug(slug);

    if (existingProduct) {
      return res.status(HTTPSTATUS.CONFLICT).json({
        message: "A product with this slug already exists",
      });
    }

    const getsubcategory = await getSubcategoryById(req.body.subcategoryId);

    if (!getsubcategory) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        message: "subcategory does not exists",
      });
    }

    // Create product with connected images
    const product = await createProduct(vendorId, req.body);

    if (!product) {
      return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong try again",
      });
    }

    return res.status(HTTPSTATUS.CREATED).json({
      status: "Product created successfully",
      product,
    });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error code:", error.message);
    }
    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong try again",
    });
  }
};

export const  getAllProducts = async (req: Request, res: Response) => {
  try {
    const {
      query,
      minPrice,
      maxPrice,
      subcategory,
      status,
      inStock,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 10,
      specifications,
    } = req.query;

    // Initialize where clause with approved products
    const where: any = {
      status: "APPROVED",
      isApproved: true,
    };

    // Text search with sanitization
    if (query && typeof query === "string") {
      where.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }

    // Price range validation
    if (minPrice || maxPrice) {
      where.price = {};
      const min = Number(minPrice);
      const max = Number(maxPrice);

      if (!isNaN(min)) where.price.gte = min;
      if (!isNaN(max)) where.price.lte = max;
    }

    // Subcategory validation
    if (subcategory && typeof subcategory === "string") {
      where.subcategoryId = subcategory;
    }

    // Stock filter
    if (inStock === "true") {
      where.stock = { gt: 0 };
    } else if (inStock === "false") {
      where.stock = { lte: 0 };
    }

    // Specifications filtering with error handling
    // Updated specifications filtering section
    if (specifications && typeof specifications === "string") {
      try {
        const specFilters = JSON.parse(specifications);
        const specificationConditions: any[] = [];

        Object.entries(specFilters).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            // For array values like processors: ["Intel", "AMD"]
            specificationConditions.push({
              specifications: {
                path: [key],
                array_contains: value,
              },
            });
          } else if (typeof value === "object" && value !== null) {
            // For range filters like {min: x, max: y}
            const rangeCondition: any = {
              specifications: {
                path: [key],
              },
            };
            if (typeof value.min === "number") {
              rangeCondition.specifications.gte = value.min;
            }
            if (typeof value.max === "number") {
              rangeCondition.specifications.lte = value.max;
            }
            if (Object.keys(rangeCondition.specifications).length > 1) {
              // More than just path
              specificationConditions.push(rangeCondition);
            }
          } else {
            // For simple equality checks
            specificationConditions.push({
              specifications: {
                path: [key],
                equals: value,
              },
            });
          }
        });

        if (specificationConditions.length > 0) {
          where.AND = (where.AND || []).concat(specificationConditions);
        }
      } catch (e) {
        return res.status(400).json({
          message: "Invalid specifications filter format",
        });
      }
    }

    // Validate sort parameters
    const validSortFields = ["createdAt", "price", "title", "stock"];
    const sortField = validSortFields.includes(sortBy as string)
      ? sortBy
      : "createdAt";

    const validOrders = ["asc", "desc"];
    const sortDir = validOrders.includes((sortOrder as string).toLowerCase())
      ? sortOrder
      : "desc";

    // Pagination validation
    const pageNumber = Math.max(1, parseInt(page as string) || 1);
    const pageSize = Math.min(
      100,
      Math.max(1, parseInt(limit as string) || 10)
    );
    const skip = (pageNumber - 1) * pageSize;

    // Execute query
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: true,
          subcategory: true,
          vendor: {
            select: { id: true, businessName: true },
          },
        },
        orderBy: { [sortField as string]: sortDir },
        skip,
        take: pageSize,
      }),
      prisma.product.count({ where }),
    ]);

    return res.status(200).json({
      status: "Success",
      products,
      meta: {
        currentPage: pageNumber,
        itemsPerPage: pageSize,
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    });
  } catch (error: unknown) {
    console.error("Error in getAllProducts:", error);
    return res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? (error as Error).message
          : "Internal server error",
    });
  }
};

export const getAllProductsByVendor = async (req: Request, res: Response) => {
  try {
    const vendorId = req.user.vendor.id;

    const products = await getAllProductByVendor(vendorId);

    if (!products) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        message: "Products not found",
      });
    }

    return res.status(HTTPSTATUS.OK).json({
      status: "Products fetched successfully",
      products,
    });
  } catch (error: unknown) {
    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong try again",
    });
  }
};

export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        message: "Product not found",
      });
    }

    return res.status(HTTPSTATUS.OK).json({
      status: "Product fetched successfully",
      product,
    });
  } catch (error: unknown) {
    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong try again",
    });
  }
};

export const getSingleProductByVendor = async (req: Request, res: Response) => {
  try {
    const vendorId = req.user.vendor.id;

    const product = await getProductByIdAndVendorId(req.params.id, vendorId);

    if (!product) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        message: "Product not found",
      });
    }

    return res.status(HTTPSTATUS.OK).json({
      status: "Product fetched successfully",
      product,
    });
  } catch (error: unknown) {
    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong try again",
    });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const getproduct = await getProductByIdAndVendorId(
      productId,
      req.user.vendor.id
    );

    if (!getproduct) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        message: "Product not found",
      });
    }

    const product = await updateProduct(
      req.user.vendor.id,
      productId,
      req.body
    );

    if (!product) {
      return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong try again",
      });
    }

    return res.status(HTTPSTATUS.OK).json({
      message: "Product updated successfully",
    });
  } catch (error: unknown) {
    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong try again",
    });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const product = await getProductByIdAndVendorId(
      productId,
      req.user.vendor.id
    );

    if (!product) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        message: "Product not found",
      });
    }

    const deleteproduct = await deleteProduct(productId);

    if (!deleteproduct) {
      return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong try again",
      });
    }

    return res.status(HTTPSTATUS.NO_CONTENT).json({
      message: "Product deleted successfully",
    });
  } catch (error: unknown) {
    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong try again",
    });
  }
};

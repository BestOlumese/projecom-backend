import { Decimal } from "@prisma/client/runtime/library";
import { generateSlug } from "../utils/slug";
import { getSubcategoryById } from "./subcategoryService";

export const getProductById = async (id: string) => {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
      subcategory: true,
    },
  });
};

export const getProductByIdAndVendorId = async (id: string, vendorId: string) => {
    return await prisma.product.findUnique({
      where: { id, vendorId },
      include: {
        images: true,
        subcategory: true,
      },
    });
  };
  

export const getProductBySlug = async (slug: string) => {
  return await prisma.product.findUnique({
    where: { slug },
    include: {
      images: true,
      subcategory: true,
    },
  });
};

export const createProduct = async (
  vendorId: string,
  body: {
    title: string;
    slug: string;
    description: string;
    price: number | Decimal;
    stock: number;
    specifications: Record<string, any>;
    subcategoryId: string;
    images: [];
  }
) => {
  const {
    title,
    slug,
    description,
    price,
    stock,
    specifications,
    subcategoryId,
    images,
  } = body;

  return await prisma.product.create({
    data: {
      title,
      slug,
      description,
      price,
      stock,
      specifications,
      subcategoryId,
      vendorId,
      status: "DRAFT",
      images: {
        create: images.map((url: string) => ({ url })),
      },
    },
    include: {
      images: true,
      subcategory: true,
    },
  });
};

export const updateProduct = async (
    vendorId: string,
    productId: string,
    body: {
      title?: string;
      description?: string;
      price?: Decimal;
      stock?: number;
      specifications?: [];
      subcategoryId?: string;
      images?: string[]; // Make images optional
    }
  ) => {
    const {
      title,
      description,
      price,
      stock,
      specifications,
      subcategoryId,
      images,
    } = body;

    const getsubcategory = getSubcategoryById(subcategoryId);

    if(!getsubcategory) {
        return null;
    }
  
    const updateData = {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(price !== undefined && { price }),
      ...(stock !== undefined && { stock }),
      ...(specifications !== undefined && { specifications }),
      ...(subcategoryId !== undefined && { subcategoryId }),
      status: "DRAFT", // Reset status to DRAFT after update
      isApproved: false, // Reset approval
    };
  
    // Handle images if provided (even if empty array)
    if (images !== undefined) {
      // Delete existing images
      await prisma.image.deleteMany({
        where: { productId }
      });
  
      // Only create new images if array is not empty
      if (images.length > 0) {
        updateData.images = {
          create: images.map(url => ({ url }))
        };
      }
    }
  
    // Update the product
    return await prisma.product.update({
      where: { id: productId, vendorId },
      data: updateData,
      include: {
        images: true,
        subcategory: true
      }
    });
  };

  export const deleteProduct = async (productId: string) => {
    return await prisma.$transaction([
      prisma.image.deleteMany({ where: { productId } }),
      prisma.product.delete({ where: { id: productId } })
    ]);
  }

export const getAllProduct = async () => {
  return await prisma.product.findMany({
    include: {
      images: true,
      subcategory: true,
    },
  });
};

export const getAllProductByVendor = async (vendorId: string) => {
  return await prisma.product.findMany({
    where: {
      vendorId,
    },
    include: {
      images: true,
      subcategory: true,
    },
  });
};

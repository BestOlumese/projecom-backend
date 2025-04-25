import { generateSlug } from "../utils/slug";

export const createSubcategory = async (body: { name: string, categoryId: string; }) => {
  return await prisma.subcategory.create({
    data: {
      name: body.name,
      categoryId: body.categoryId,
      slug: generateSlug(body.name),
    },
  });
};

export const getAllSubcategory = async () => {
  return await prisma.subcategory.findMany({
    include: {
      products: true,
    }
  });
};

export const getSubcategoryById = async (id: string) => {
  return await prisma.subcategory.findFirst({
    where: {
      id: id,
    },
  });
};

export const getSubcategoryBySlug = async (slug: string) => {
  return await prisma.subcategory.findFirst({
    where: {
      slug: slug,
    },
  });
};

export const updateSubcategory = async (id: string, body: { name: string, categoryId: string }) => {
  return await prisma.subcategory.update({
    where: {
      id: id,
    },
    data: {
      name: body.name,
      categoryId: body.categoryId,
      slug: generateSlug(body.name),
    },
  });
};

export const deleteSubcategory = async (id: string) => {
  return await prisma.subcategory.delete({
    where: {
      id: id,
    },
  });
};

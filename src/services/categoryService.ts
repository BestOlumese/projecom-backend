import { generateSlug } from "../utils/slug";

export const createCategory = async (body: { name: string }) => {
  return await prisma.category.create({
    data: {
      name: body.name,
      slug: generateSlug(body.name),
    },
  });
};

export const getAllCategory = async () => {
  return await prisma.category.findMany({
    include: {
      subcategories: {
        include: {
          products: true,
        },
      },
    }
  });
};

export const getCategoryById = async (id: string) => {
  return await prisma.category.findFirst({
    where: {
      id: id,
    },
  });
};

export const getCategoryBySlug = async (slug: string) => {
  return await prisma.category.findFirst({
    where: {
      slug: slug,
    },
  });
};

export const updateCategory = async (id: string, body: { name: string }) => {
  return await prisma.category.update({
    where: {
      id: id,
    },
    data: {
      name: body.name,
      slug: generateSlug(body.name),
    },
  });
};

export const deleteCategory = async (id: string) => {
  return await prisma.category.delete({
    where: {
      id: id,
    },
  });
};

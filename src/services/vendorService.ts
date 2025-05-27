import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";

export const getVendors = async (options?: VendorProductQuery) => {
  const {
    location,
    name,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = options || {};

  const where: Prisma.VendorWhereInput = {};

  if (location) {
    where.address = { contains: location, mode: "insensitive" };
  }

  if (name) {
    where.businessName = { contains: name, mode: "insensitive" };
  }

  const skip = (page - 1) * limit;

  const vendors = await prisma.vendor.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const totalCount = await prisma.vendor.count({ where });

  return {
    vendors,
    meta: {
      currentPage: page,
      itemsPerPage: limit,
      totalItems: totalCount,
      totalPages: Math.ceil(totalCount / limit),
    },
  };
};

export const vendorDetailsByUserId = async (userId: string) => {
  const vendor = await prisma.vendor.findFirst({ where: { userId } });

  return vendor;
};

export const createVendor = async (
  userId: string,
  body: {
    businessName: string;
    description: string;
    address: string;
    phone: string;
    userId: string;
    website: string;
  }
) => {
  const { businessName, description, address, phone , website } = body;

  const vendor = await prisma.vendor.create({
    data: {
      businessName: businessName,
      description: description,
      address: address,
      phone: phone,
      userId: userId,
      website: website || "",
    },
  });

  return vendor;
};

export const updateVendor = async (
  userId: string,
  body: {
    businessName: string;
    address: string;
    phone: string;
    userId: string;
    website: string;
    description: string;
  }
) => {
  const { businessName, address, phone, description, website } = body;

  const vendor = await prisma.vendor.update({
    where: { userId: userId },
    data: {
      businessName,
      address,
      phone,
      description,
      website: website || "",
    },
  });

  return vendor;
};

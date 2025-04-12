import prisma from "../lib/prisma";

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

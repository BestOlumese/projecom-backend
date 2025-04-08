import prisma from "../lib/prisma";

export const vendorDetailsByUserId = async (userId: string) => {
    const vendor = await prisma.vendor.findFirst({ where: { userId } })

    return vendor;
}

export const createVendor = async (body: {
    businessName: string
    address: string
    phone: string
    userId: string
}) => {
    const { businessName, address, phone, userId } = body

    const vendor = await prisma.vendor.create({
        data: {
            businessName: businessName,
            address: address,
            phone: phone,
            userId: userId
        }
    })

    return vendor;
}

export const updateVendor = async (body: {
    businessName: string
    address: string
    phone: string
    userId: string
    website: string
    description: string
}) => {
    const { businessName, address, phone, userId, description, website } = body

    const vendor = await prisma.vendor.update({
        where: { userId: userId },
        data: {
          businessName,
          address,
          phone,
          description,
          website
        }
      })      

    return vendor;
}
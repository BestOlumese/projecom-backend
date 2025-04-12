import prisma from "../lib/prisma";

export const approveVendor = async (userId: string) => {
    return await prisma.vendor.update({
        where: {
            userId: userId,
        },
        data: {
            approved: true,
        },
    });
}

export const disapproveVendor = async (userId: string) => {
    return await prisma.vendor.update({
        where: {
            userId: userId,
        },
        data: {
            approved: false,
        },
    });
}

export const getAllVendors = async (userId: string) => {
    return await prisma.user.findMany({
        where: {
            id: userId,
        },
        include: {
            vendor: true,
            password: false,
            verifyToken: false,
            verifyExpires: false
        },
    });
}
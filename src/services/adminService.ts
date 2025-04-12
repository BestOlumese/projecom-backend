import { Role } from "@prisma/client";
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
    return await prisma.user.findFirst({
        where: {
            id: userId,
            role: {
                in: [Role.ADMIN, Role.VENDOR]
            }
        },
        select: {
            id: true,
            name: true,
            email: true,
            isVerified: true,
            image: true,
            role: true,
            vendor: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}
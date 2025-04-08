import prisma from "../lib/prisma";

export const updateUserRole = async (userId: string, role: "USER" | "VENDOR" | "ADMIN") => {
    return prisma.user.update({
        where: { id: userId },
        data: { role }
    });
}
import prisma from "../lib/prisma";
import { comparePassword, hashPassword } from "../utils/password";

export const updateUserRole = async (userId: string, role: "USER" | "VENDOR" | "ADMIN") => {
    return prisma.user.update({
        where: { id: userId },
        data: { role }
    });
}

export const updateUser = async (userId: string, body: {
    name: string;
}) => {
    return prisma.user.update({
        where: { id: userId },
        data: {
            name: body.name,
        }
    });
}

export const updateUserImage = async (userId: string, body: {
    name: string;
}) => {
    return prisma.user.update({
        where: { id: userId },
        data: {
            image: body.image,
        }
    });
}

export const updateUserPassword = async (userId: string, body: {
    old_password: string;
    new_password: string;
}) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        

        if (!user) {
            return false;
        }

        const validPassword = await comparePassword(
            body.old_password,
            user.password
        );
        

        if (!validPassword) {
            return false;
        }

        const hashedPassword = await hashPassword(body.new_password);

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedPassword,
            }
        });

        delete updatedUser.password;
        delete updatedUser.verifyExpires;
        delete updatedUser.verifyToken;

        return updatedUser;
    } catch (error: unknown) {
        throw new Error("Something went wrong");
    }
}
// @ts-nocheck

import { BadRequestError } from "../errors/CustomError";
import prisma from "../lib/prisma";
import { hashPassword, comparePassword } from "../utils/password";
import { Role } from "@prisma/client";
import { generateEmailToken } from "../utils/tokenUtils";

export const registerService = async (body: {
  email: string;
  name: string;
  password: string;
  role: Role;
}) => {
  const { email, name, password, role } = body;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new BadRequestError("Email already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
        isVerified: false,  // Add this
      },
    });

    // Then update with the token
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        verifyToken: generateEmailToken(user.id),
        verifyExpires: new Date(Date.now() + 24 * 60 * 60 * 1000)
      },
      include: { vendor: true }
    });

    // Clean up the response
    const { password: _, verifyExpires, verifyToken, ...userWithoutSensitiveData } = updatedUser;
    return userWithoutSensitiveData;
  } catch (error: any) {
    throw error;
  }
};

export const getUserFromDb = async (email: string, password: string) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
      include: { vendor: true }
    });

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const validPassword = await comparePassword(
      password,
      existingUser.password
    );

    if (!validPassword) {
      throw new BadRequestError("Invalid credentials");
    }

    return existingUser;
  } catch (error: unknown) {
    throw error;
  }
};

import { BadRequestError } from "../errors/CustomError";
import prisma from "../lib/prisma";
import { hashPassword, comparePassword } from "../utils/password";
import { Role } from "@prisma/client";

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
      },
    });

    delete user.id;
    delete user.password;
    delete user.emailVerified;

    return user;
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
  } catch (error: any) {
    throw error;
  }
};

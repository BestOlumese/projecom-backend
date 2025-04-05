import { NextFunction, Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { getUserFromDb, registerService } from "../services/authService";
import jwt from "jsonwebtoken";
import { transporter } from "../config/email.config";
import { generateEmailToken } from "../utils/tokenUtils";

export const registerController = async (req: Request, res: Response) => {
  const body = req.body;

  const user = await registerService(body);

  const verificationUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/verify-email?token=${user.verifyToken}`;

  await transporter.sendMail({
    from: '"Laptop Ecom" <no-reply@laptopecom.com>',
    to: user.email,
    subject: "Email Verification",
    html: `Click <a href="${verificationUrl}">here</a> to verify your email.`,
  });

  return res.status(HTTPSTATUS.CREATED).json({
    message: "User created successfully",
    user,
  });
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    // Find user by token
    const user = await prisma.user.findFirst({
      where: {
        verifyToken: token as string,
        verifyExpires: { gt: new Date() }, // Check if token hasn't expired
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Update user as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verifyToken: null,
        verifyExpires: null,
      },
    });

    return res
      .status(HTTPSTATUS.OK)
      .json({ message: "Email verified successfully" });
  } catch (error) {
    return res
      .status(HTTPSTATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const resendVerification = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  if (!user) {
    return res.status(HTTPSTATUS.NOT_FOUND).json({ error: "User not found" });
  }

  if (user.isVerified) {
    return res
      .status(HTTPSTATUS.BAD_REQUEST)
      .json({ error: "Email already verified" });
  }

  // Generate new token
  const newToken = generateEmailToken(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      verifyToken: newToken,
      verifyExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  // Send new email
  const verificationUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/verify-email?token=${newToken}`;

  await transporter.sendMail({
    to: user.email,
    subject: "Email Verification",
    html: `Click <a href="${verificationUrl}">here</a> to verify your email.`,
  });

  return res.status(200).json({ message: "Verification email resent" });
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await getUserFromDb(email, password);

  delete user.password;
  delete user.verifyToken;
  delete user.verifyExpires;

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.cookie("token", token, {
    httpOnly: true,
    // secure: true,
    // maxAge: 1000000,
  });

  return res.status(HTTPSTATUS.OK).json({
    message: "User logged in successfully",
  });
};

export const userController = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res
      .status(HTTPSTATUS.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }

  return res.status(HTTPSTATUS.OK).json({
    user,
  });
};

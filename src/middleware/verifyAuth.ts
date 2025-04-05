import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HTTPSTATUS } from "../config/http.config";

// Extend the Request type to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: jwt.JwtPayload | string;
    }
  }
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(HTTPSTATUS.UNAUTHORIZED).json({
      message: "No token provided",
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = user;
    next();
  } catch (error: unknown) {
    res.clearCookie("token");

    if (error instanceof Error) {
      res.status(HTTPSTATUS.UNAUTHORIZED).json({
        message: "Unauthorized",
        error: error.message,
      });
    }

    res.status(HTTPSTATUS.UNAUTHORIZED).json({
      message: "Unauthorized",
    });
  }
};

export const checkVerified = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user.isVerified) {
    res.status(HTTPSTATUS.FORBIDDEN).json({
      error: "Please verify your email address",
    });
  }
  next();
};

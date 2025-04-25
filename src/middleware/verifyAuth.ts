// @ts-nocheck

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HTTPSTATUS } from "../config/http.config";
import { Role } from "@prisma/client";

// Extend the Request type to include the user property
// First, create an interface for your JWT payload
interface UserJwtPayload extends jwt.JwtPayload {
  id: string;
  email: string;
  name?: string;
  role: Role;
  isVerified: boolean;
  verifyToken?: string;
  vendor?: {
    id: string;
    approved: boolean;
  };
}

// Then update the Request interface
declare global {
  namespace Express {
    interface Request {
      user?: UserJwtPayload;
    }
  }
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) : void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(HTTPSTATUS.UNAUTHORIZED).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    
    // Check if decoded is a string or an object
    if (typeof decoded === 'string') {
      // Handle the case where decoded is a string
      // This might happen if you used a simple string payload
      res.status(HTTPSTATUS.UNAUTHORIZED).json({
        message: "Invalid token format",
      });
    } else {
      // Now decoded is definitely a JwtPayload
      req.user = decoded as UserJwtPayload;
      next();
    }
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
  if (!req.user?.isVerified) {
    res.status(HTTPSTATUS.FORBIDDEN).json({
      error: "Please verify your email address",
    });
  }
  next();
};

export const checkVendor = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // User should be either:
  // 1. A VENDOR with approved vendor status, OR
  // 2. An ADMIN (no vendor approval needed)
  if (
    !req.user?.role || // No role
    (req.user.role === Role.VENDOR && !req.user?.vendor?.approved) || // Is VENDOR but not approved
    (req.user.role !== Role.VENDOR && req.user.role !== Role.ADMIN) // Neither VENDOR nor ADMIN
  ) {
    res.status(HTTPSTATUS.FORBIDDEN).json({
      error: "You are not authorized to access this resource",
    });
    return; // Don't forget to return after sending response
  }
  next();
};

export const checkAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user.role || req.user.role !== Role.ADMIN) {
    res.status(HTTPSTATUS.FORBIDDEN).json({
      error: "You are not authorized to access this resource",
    });
  }
  next();
};

import { checkVerified } from './../middleware/verifyAuth';
import express from "express";
import { loginController, registerController, resendVerification, userController, verifyEmail } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { validateRequest } from "../middleware/validateRequest";
import { registerSchema, resendVerificationSchema } from "../validations/auth.validations";
import { loginSchema } from "../validations/auth.validations";
import { checkAuth } from "../middleware/verifyAuth";

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  asyncHandler(registerController)
);

router.post(
  "/login",
  validateRequest(loginSchema),
  asyncHandler(loginController)
);

router.get(
  "/verify-email",
  asyncHandler(verifyEmail)
);

router.post(
  "/resend-verification",
  validateRequest(resendVerificationSchema),
  asyncHandler(resendVerification)
);

router.get(
  "/me",
  checkAuth,
  checkVerified,
  asyncHandler(userController)
);

export default router;

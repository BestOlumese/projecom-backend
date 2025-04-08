import { checkVerified } from './../middleware/verifyAuth';
import express from "express";
import { forgotPasswordController, loginController, logoutController, newPasswordController, registerController, resendVerification, userController, verifyEmail } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { validateRequest } from "../middleware/validateRequest";
import { forgotPasswordSchema, newPasswordSchema, registerSchema, resendVerificationSchema } from "../validations/auth.validations";
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
  "/logout",
  asyncHandler(logoutController)
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

router.post(
  "/forgot-password",
  validateRequest(forgotPasswordSchema),
  asyncHandler(forgotPasswordController)
);

router.post(
  "/new-password",
  validateRequest(newPasswordSchema),
  asyncHandler(newPasswordController)
);

router.get(
  "/me",
  checkAuth,
  checkVerified,
  asyncHandler(userController)
);

export default router;

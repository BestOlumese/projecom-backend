import express from "express";
import { loginController, registerController, userController } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { validateRequest } from "../middleware/validateRequest";
import { registerSchema } from "../validations/auth.validations";
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
  "/me",
  checkAuth,
  asyncHandler(userController)
);

export default router;

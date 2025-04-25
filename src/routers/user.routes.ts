import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validateRequest } from "../middleware/validateRequest";
import { userNewPasswordSchema, userUpdateImageSchema, userUpdateSchema } from "../validations/user.validations";
import { userNewPasswordController, userUpdateController, userUpdateImageController } from "../controllers/user.controller";
import { checkAuth, checkVerified } from "../middleware/verifyAuth";

const router = express.Router();

router.put(
  "/update",
  validateRequest(userUpdateSchema),
  checkAuth,
  checkVerified,
  asyncHandler(userUpdateController)
);

router.put(
  "/new-password",
  validateRequest(userNewPasswordSchema),
  checkAuth,
  checkVerified,
  asyncHandler(userNewPasswordController)
);

router.put(
  "/image",
  validateRequest(userUpdateImageSchema),
  checkAuth,
  checkVerified,
  asyncHandler(userUpdateImageController)
);

export default router;

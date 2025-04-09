import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validateRequest } from "../middleware/validateRequest";
import { userNewPasswordSchema, userUpdateImageSchema, userUpdateSchema } from "../validations/user.validations";
import { userNewPasswordController, userUpdateController, userUpdateImageController } from "../controllers/user.controller";
import { checkAuth } from "../middleware/verifyAuth";

const router = express.Router();

router.put(
  "/update",
  validateRequest(userUpdateSchema),
  checkAuth,
  asyncHandler(userUpdateController)
);

router.put(
  "/new-password",
  validateRequest(userNewPasswordSchema),
  checkAuth,
  asyncHandler(userNewPasswordController)
);

router.put(
  "/image",
  validateRequest(userUpdateImageSchema),
  checkAuth,
  asyncHandler(userUpdateImageController)
);

export default router;

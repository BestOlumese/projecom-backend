import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { checkAdmin, checkAuth, checkVerified } from "../middleware/verifyAuth";
import { validateRequest } from "../middleware/validateRequest";
import { categorySchema } from "../validations/category.validations";
import { createCategoryController, deleteCategoryController, getAllCategoryController, updateCategoryController } from "../controllers/category.controller";

const router = express.Router();

router.get(
  "/all",
  checkAuth,
  checkVerified,
  asyncHandler(getAllCategoryController)
);

router.post(
  "/create",
  checkAuth,
  checkVerified,
  checkAdmin,
  validateRequest(categorySchema),
  asyncHandler(createCategoryController)
);

router.put(
  "/update/:id",
  checkAuth,
  checkVerified,
  checkAdmin,
  validateRequest(categorySchema),
  asyncHandler(updateCategoryController)
);

router.delete(
  "/delete/:id",
  checkAuth,
  checkVerified,
  checkAdmin,
  asyncHandler(deleteCategoryController)
);

export default router;

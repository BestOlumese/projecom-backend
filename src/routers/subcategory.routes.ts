import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { checkAdmin, checkAuth, checkVerified } from "../middleware/verifyAuth";
import { validateRequest } from "../middleware/validateRequest";
import { subcategorySchema } from "../validations/subcategory.validations";
import { createSubcategoryController, deleteSubcategoryController, getAllSubcategoryController, updateSubcategoryController } from "../controllers/subcategory.controller";

const router = express.Router();

router.get(
  "/all",
  checkAuth,
  checkVerified,
  asyncHandler(getAllSubcategoryController)
);

router.post(
  "/create",
  checkAuth,
  checkVerified,
  checkAdmin,
  validateRequest(subcategorySchema),
  asyncHandler(createSubcategoryController)
);

router.put(
  "/update/:id",
  checkAuth,
  checkVerified,
  checkAdmin,
  validateRequest(subcategorySchema),
  asyncHandler(updateSubcategoryController)
);

router.delete(
  "/delete/:id",
  checkAuth,
  checkVerified,
  checkAdmin,
  asyncHandler(deleteSubcategoryController)
);

export default router;

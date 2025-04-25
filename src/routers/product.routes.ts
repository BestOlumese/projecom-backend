import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validateRequest } from "../middleware/validateRequest";
import {
  checkAuth,
  checkVendor,
  checkVerified,
} from "../middleware/verifyAuth";
import { createProductSchema, updateProductSchema } from "../validations/product.validations";
import {
  createProductController,
  deleteProductController,
  getAllProducts,
  getAllProductsByVendor,
  getSingleProduct,
  getSingleProductByVendor,
  updateProductController,
} from "../controllers/product.controller";

const router = express.Router();

router.post(
  "/create",
  validateRequest(createProductSchema),
  checkAuth,
  checkVendor,
  checkVerified,
  asyncHandler(createProductController)
);

router.get("/all", asyncHandler(getAllProducts));

router.get(
  "/vendors/all",
  checkAuth,
  checkVendor,
  checkVerified,
  asyncHandler(getAllProductsByVendor)
);

router.get("/:id", asyncHandler(getSingleProduct));

router.get(
  "/:id/vendor",
  checkAuth,
  checkVendor,
  checkVerified,
  asyncHandler(getSingleProductByVendor)
);

router.put(
  "/update/:id",
  validateRequest(updateProductSchema),
  checkAuth,
  checkVendor,
  checkVerified,
  asyncHandler(updateProductController)
);

router.delete(
  "/delete/:id",
  checkAuth,
  checkVendor,
  checkVerified,
  asyncHandler(deleteProductController)
);

export default router;

import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validateRequest } from "../middleware/validateRequest";
import {
  checkAuth,
  checkVendor,
  checkVerified,
} from "../middleware/verifyAuth";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/product.validations";
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

router.get("/", asyncHandler(getAllProducts));

router.get(
  "/vendor",
  checkAuth,
  checkVendor,
  checkVerified,
  asyncHandler(getAllProductsByVendor)
);

router.get(
  "/vendor/:id",
  checkAuth,
  checkVendor,
  checkVerified,
  asyncHandler(getSingleProductByVendor)
);

router.post(
  "/",
  validateRequest(createProductSchema),
  checkAuth,
  checkVendor,
  checkVerified,
  asyncHandler(createProductController)
);

router.put(
  "/:id",
  validateRequest(updateProductSchema),
  checkAuth,
  checkVendor,
  checkVerified,
  asyncHandler(updateProductController)
);

router.delete(
  "/:id",
  checkAuth,
  checkVendor,
  checkVerified,
  asyncHandler(deleteProductController)
);

router.get("/:id", asyncHandler(getSingleProduct));

export default router;

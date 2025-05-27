import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createVendorDetails,
  getAllVendors,
  getVendorByIdDetails,
  getVendorDetails,
  updateVendorDetails,
} from "../controllers/vendor.controller";
import { validateRequest } from "../middleware/validateRequest";
import { vendorSchema } from "../validations/vendor.validations";
import {
  checkAuth,
  checkVendor,
  checkVerified,
} from "../middleware/verifyAuth";

const router = express.Router();

router.post(
  "/",
  checkAuth,
  checkVerified,
  validateRequest(vendorSchema),
  asyncHandler(createVendorDetails)
);

router.get(
  "/",
  asyncHandler(getAllVendors)
);

router.get(
  "/me",
  checkAuth,
  checkVerified,
  checkVendor,
  asyncHandler(getVendorDetails)
);

router.put(
  "/",
  checkAuth,
  checkVerified,
  checkVendor,
  validateRequest(vendorSchema),
  asyncHandler(updateVendorDetails)
);

router.get(
  "/:userId",
  checkAuth,
  checkVerified,
  checkVendor,
  asyncHandler(getVendorByIdDetails)
);

export default router;
import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createVendorDetails,
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
  "/create",
  checkAuth,
  checkVerified,
  validateRequest(vendorSchema),
  asyncHandler(createVendorDetails)
);

router.get(
  "/me",
  checkAuth,
  checkVerified,
  checkVendor,
  asyncHandler(getVendorDetails)
);

router.get(
  "/:userId",
  checkAuth,
  checkVerified,
  checkVendor,
  asyncHandler(getVendorByIdDetails)
);

router.put(
  "/edit",
  checkAuth,
  checkVerified,
  checkVendor,
  validateRequest(vendorSchema),
  asyncHandler(updateVendorDetails)
);

export default router;

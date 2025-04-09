import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createVendorDetails,
  getVendorDetails,
  updateVendorDetails,
} from "../controllers/vendor.controller";
import { validateRequest } from "../middleware/validateRequest";
import { vendorSchema } from "../validations/vendor.validations";

const router = express.Router();

router.post("/create", validateRequest(vendorSchema), asyncHandler(createVendorDetails));

router.get("/me", asyncHandler(getVendorDetails));

router.put("/edit", validateRequest(vendorSchema), asyncHandler(updateVendorDetails));

export default router;

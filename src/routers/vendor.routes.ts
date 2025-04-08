import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createVendorDetails, getVendorDetails, updateVendorDetails } from "../controllers/vendor.controller";

const router = express.Router();

router.post("/", asyncHandler(createVendorDetails))

router.get("/me",asyncHandler(getVendorDetails));

router.put("/me", asyncHandler(updateVendorDetails))

export default router;
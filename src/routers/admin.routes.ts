import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { checkAdmin, checkAuth, checkVerified } from "../middleware/verifyAuth";
import { validateRequest } from "../middleware/validateRequest";
import { approveOrDisaproveSchema } from "../validations/admin.validations";
import { approveVendorController, disapproveVendorController, getAllVendorsController } from "../controllers/admin.controller";

const router = express.Router();

router.get(
  "/vendor/all",
  checkAuth,
  checkVerified,
  checkAdmin,
  asyncHandler(getAllVendorsController)
);

router.put(
  "/vendor/approve",
  checkAuth,
  checkVerified,
  checkAdmin,
  validateRequest(approveOrDisaproveSchema),
  asyncHandler(approveVendorController)
);

router.put(
  "/vendor/disapprove",
  checkAuth,
  checkVerified,
  checkAdmin,
  validateRequest(approveOrDisaproveSchema),
  asyncHandler(disapproveVendorController)
);

export default router;

import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { meController } from "../controllers/vendor.controller";

const router = express.Router();

router.get(
  "/me",
  asyncHandler(meController)
);

export default router;
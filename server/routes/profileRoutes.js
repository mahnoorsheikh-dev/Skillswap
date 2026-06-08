import express from "express";
import {
  getProfile,
  updateProfile,
  getAllProfiles,
} from "../controllers/profileController.js";
import upload from "../middleware/upload.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllProfiles);
router.get("/:userId", getProfile);
router.put("/:userId", protect, upload.single("avatar"), updateProfile);

export default router;
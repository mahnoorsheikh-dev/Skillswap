import express from "express";
import { createChat, getUserChats } from "../controllers/chatController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createChat);
router.get("/:userId", protect, getUserChats);

export default router;
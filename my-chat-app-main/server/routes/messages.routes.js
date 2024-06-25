import express, { Router } from "express";
import {sendMessage,getMessages} from "../controllers/messages.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Add protectRoute middleware
router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessages);

export default router;

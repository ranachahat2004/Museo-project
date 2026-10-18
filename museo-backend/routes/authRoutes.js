import express from "express";

import {
  registerUser,
  loginUser,
  verifyEmail,
} from "../controllers/authController.js";

const router = express.Router();

// Register new user or exhibitor
router.post("/register", registerUser);

// Verify email address
router.get("/verify-email", verifyEmail);

// Login
router.post("/login", loginUser);

export default router;
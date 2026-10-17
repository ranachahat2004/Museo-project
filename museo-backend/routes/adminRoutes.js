import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  getAdminDashboard,
  getAllUsers,
  updateUserStatus,
} from "../controllers/adminController.js";

const router = express.Router();

/* =========================
   ADMIN PROTECTION
========================= */

router.use(authMiddleware);

router.use(
  roleMiddleware("admin")
);

/* =========================
   DASHBOARD
========================= */

router.get(
  "/dashboard",
  getAdminDashboard
);

/* =========================
   USERS
========================= */

router.get(
  "/users",
  getAllUsers
);

router.put(
  "/users/:userId/status",
  updateUserStatus
);

export default router;
import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getMyProfile,
  updateMyProfile,
  getFavoriteArtifacts,
  addFavorite,
  removeFavorite,
} from "../controllers/userController.js";

const router = express.Router();

/* =========================
   PROFILE
========================= */

router.get(
  "/profile",
  authMiddleware,
  getMyProfile
);

router.put(
  "/profile",
  authMiddleware,
  updateMyProfile
);

/* =========================
   FAVORITES
========================= */

router.get(
  "/favorites",
  authMiddleware,
  getFavoriteArtifacts
);

router.post(
  "/favorites/:artifactId",
  authMiddleware,
  addFavorite
);

router.delete(
  "/favorites/:artifactId",
  authMiddleware,
  removeFavorite
);

export default router;
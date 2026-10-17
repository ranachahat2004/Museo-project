import express from "express";

import {
  getArtifacts,
  getFeaturedArtifacts,
  getArtifactById,
} from "../controllers/artifactController.js";

const router = express.Router();

// Get all artifacts
router.get(
  "/",
  getArtifacts
);

// Get featured artifacts
router.get(
  "/featured",
  getFeaturedArtifacts
);

// Get single artifact
router.get(
  "/:id",
  getArtifactById
);

export default router;
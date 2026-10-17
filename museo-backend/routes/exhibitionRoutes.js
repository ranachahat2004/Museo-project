import express from "express";

import {
  getExhibitions,
  getFeaturedExhibitions,
  getExhibitionById,
} from "../controllers/exhibitionController.js";

const router = express.Router();

// Get all exhibitions
router.get(
  "/",
  getExhibitions
);

// Get featured exhibitions
router.get(
  "/featured",
  getFeaturedExhibitions
);

// Get single exhibition
router.get(
  "/:id",
  getExhibitionById
);

export default router;
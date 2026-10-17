import express from "express";

import {
  getCategories,
  getCategoryById,
} from "../controllers/categoryController.js";

const router = express.Router();

// Get all categories
router.get(
  "/",
  getCategories
);

// Get single category
router.get(
  "/:id",
  getCategoryById
);

export default router;
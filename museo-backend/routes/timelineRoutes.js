import express from "express";

import {
  getTimelineEvents,
  getTimelineEventById,
} from "../controllers/timelineController.js";

const router = express.Router();

// Get all timeline events
router.get(
  "/",
  getTimelineEvents
);

// Get single timeline event
router.get(
  "/:id",
  getTimelineEventById
);

export default router;
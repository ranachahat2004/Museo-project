import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createCollection,
  getMyCollections,
  getCollectionById,
  addArtifactToCollection,
  removeArtifactFromCollection,
  deleteCollection,
} from "../controllers/collectionController.js";

const router = express.Router();

/*
  All collection routes require login
*/

router.use(authMiddleware);

router.post("/", createCollection);

router.get("/", getMyCollections);

router.get("/:id", getCollectionById);

router.post(
  "/:id/artifacts",
  addArtifactToCollection
);

router.delete(
  "/:id/artifacts/:artifactId",
  removeArtifactFromCollection
);

router.delete("/:id", deleteCollection);

export default router;
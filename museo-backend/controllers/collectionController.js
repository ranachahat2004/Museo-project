import Collection from "../models/Collection.js";
import Artifact from "../models/Artifact.js";

/* =========================
   CREATE COLLECTION
========================= */

export const createCollection = async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Collection name is required",
      });
    }

    const collection = await Collection.create({
      name: name.trim(),
      description: description || "",
      isPublic: isPublic || false,
      user: req.user._id,
      artifacts: [],
    });

    res.status(201).json({
      success: true,
      message: "Collection created successfully",
      collection,
    });
  } catch (error) {
    console.error("Create Collection Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create collection",
    });
  }
};

/* =========================
   GET MY COLLECTIONS
========================= */

export const getMyCollections = async (req, res) => {
  try {
    const collections = await Collection.find({
      user: req.user._id,
    })
      .populate(
        "artifacts",
        "title image period origin"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: collections.length,
      collections,
    });
  } catch (error) {
    console.error("Get Collections Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch collections",
    });
  }
};

/* =========================
   GET COLLECTION BY ID
========================= */

export const getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate(
      "artifacts",
      "title image description period origin material"
    );

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    res.status(200).json({
      success: true,
      collection,
    });
  } catch (error) {
    console.error("Get Collection Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch collection",
    });
  }
};

/* =========================
   ADD ARTIFACT TO COLLECTION
========================= */

export const addArtifactToCollection = async (
  req,
  res
) => {
  try {
    const { artifactId } = req.body;

    if (!artifactId) {
      return res.status(400).json({
        success: false,
        message: "Artifact ID is required",
      });
    }

    const collection = await Collection.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    const artifact = await Artifact.findOne({
      _id: artifactId,
      isActive: true,
    });

    if (!artifact) {
      return res.status(404).json({
        success: false,
        message: "Artifact not found",
      });
    }

    const alreadyAdded = collection.artifacts.some(
      (id) => id.toString() === artifactId
    );

    if (alreadyAdded) {
      return res.status(400).json({
        success: false,
        message: "Artifact already exists in this collection",
      });
    }

    collection.artifacts.push(artifactId);

    await collection.save();

    const updatedCollection =
      await Collection.findById(collection._id).populate(
        "artifacts",
        "title image period origin"
      );

    res.status(200).json({
      success: true,
      message: "Artifact added to collection",
      collection: updatedCollection,
    });
  } catch (error) {
    console.error(
      "Add Artifact To Collection Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to add artifact to collection",
    });
  }
};

/* =========================
   REMOVE ARTIFACT
========================= */

export const removeArtifactFromCollection = async (
  req,
  res
) => {
  try {
    const { artifactId } = req.params;

    const collection = await Collection.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    collection.artifacts =
      collection.artifacts.filter(
        (id) => id.toString() !== artifactId
      );

    await collection.save();

    const updatedCollection =
      await Collection.findById(collection._id).populate(
        "artifacts",
        "title image period origin"
      );

    res.status(200).json({
      success: true,
      message: "Artifact removed from collection",
      collection: updatedCollection,
    });
  } catch (error) {
    console.error(
      "Remove Artifact Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to remove artifact",
    });
  }
};

/* =========================
   DELETE COLLECTION
========================= */

export const deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Collection Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to delete collection",
    });
  }
};
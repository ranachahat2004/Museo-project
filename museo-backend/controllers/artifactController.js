import Artifact from "../models/Artifact.js";

// ======================================
// GET ALL ARTIFACTS
// ======================================

export const getArtifacts = async (
  req,
  res
) => {
  try {
    const artifacts =
      await Artifact.find({
        isActive: true,
      })
        .populate(
          "category",
          "name image"
        )
        .populate(
          "exhibition",
          "title image"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: artifacts.length,
      artifacts,
    });
  } catch (error) {
    console.error(
      "Get Artifacts Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to fetch artifacts",
    });
  }
};

// ======================================
// GET FEATURED ARTIFACTS
// ======================================

export const getFeaturedArtifacts =
  async (req, res) => {
    try {
      const artifacts =
        await Artifact.find({
          isActive: true,
          featured: true,
        })
          .populate(
            "category",
            "name image"
          )
          .populate(
            "exhibition",
            "title image"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        count: artifacts.length,
        artifacts,
      });
    } catch (error) {
      console.error(
        "Get Featured Artifacts Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch featured artifacts",
      });
    }
  };

// ======================================
// GET SINGLE ARTIFACT
// ======================================

export const getArtifactById =
  async (req, res) => {
    try {
      const artifact =
        await Artifact.findOne({
          _id: req.params.id,
          isActive: true,
        })
          .populate(
            "category",
            "name image description"
          )
          .populate(
            "exhibition",
            "title image description"
          );

      if (!artifact) {
        return res.status(404).json({
          success: false,
          message: "Artifact not found",
        });
      }

      res.status(200).json({
        success: true,
        artifact,
      });
    } catch (error) {
      console.error(
        "Get Artifact Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch artifact",
      });
    }
  };
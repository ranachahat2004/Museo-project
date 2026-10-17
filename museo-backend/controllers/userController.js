import User from "../models/User.js";
import Artifact from "../models/Artifact.js";

/* =========================
   GET MY PROFILE
========================= */

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate(
        "favorites",
        "title image shortDescription period origin"
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch profile",
    });
  }
};

/* =========================
   UPDATE MY PROFILE
========================= */

export const updateMyProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      profileImage,
    } = req.body;

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (firstName !== undefined) {
      user.firstName = firstName;
    }

    if (lastName !== undefined) {
      user.lastName = lastName;
    }

    if (profileImage !== undefined) {
      user.profileImage = profileImage;
    }

    await user.save();

    const updatedUser =
      await User.findById(user._id)
        .select("-password")
        .populate(
          "favorites",
          "title image shortDescription period origin"
        );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(
      "Update Profile Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to update profile",
    });
  }
};

/* =========================
   GET FAVORITE ARTIFACTS
========================= */

export const getFavoriteArtifacts = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user._id
    ).populate({
      path: "favorites",
      match: {
        isActive: true,
      },
      select:
        "title slug description shortDescription image images period origin material",
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      count: user.favorites.length,
      favorites: user.favorites,
    });
  } catch (error) {
    console.error(
      "Get Favorites Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch favorite artifacts",
    });
  }
};

/* =========================
   ADD FAVORITE
========================= */

export const addFavorite = async (
  req,
  res
) => {
  try {
    const { artifactId } = req.params;

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

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const alreadyFavorite =
      user.favorites.some(
        (id) =>
          id.toString() === artifactId
      );

    if (alreadyFavorite) {
      return res.status(400).json({
        success: false,
        message:
          "Artifact is already in favorites",
      });
    }

    user.favorites.push(artifactId);

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Artifact added to favorites",
      artifactId,
    });
  } catch (error) {
    console.error(
      "Add Favorite Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to add artifact to favorites",
    });
  }
};

/* =========================
   REMOVE FAVORITE
========================= */

export const removeFavorite = async (
  req,
  res
) => {
  try {
    const { artifactId } = req.params;

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isFavorite =
      user.favorites.some(
        (id) =>
          id.toString() === artifactId
      );

    if (!isFavorite) {
      return res.status(400).json({
        success: false,
        message:
          "Artifact is not in favorites",
      });
    }

    user.favorites =
      user.favorites.filter(
        (id) =>
          id.toString() !== artifactId
      );

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Artifact removed from favorites",
      artifactId,
    });
  } catch (error) {
    console.error(
      "Remove Favorite Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to remove artifact from favorites",
    });
  }
};
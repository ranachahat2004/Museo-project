import User from "../models/User.js";
import Artifact from "../models/Artifact.js";
import Exhibition from "../models/Exhibition.js";
import Category from "../models/Category.js";
import Timeline from "../models/Timeline.js";

/* =========================
   ADMIN DASHBOARD
========================= */

export const getAdminDashboard = async (
  req,
  res
) => {
  try {
    const [
      totalUsers,
      totalArtifacts,
      totalExhibitions,
      totalCategories,
      totalTimelineEvents,
      activeUsers,
      featuredArtifacts,
      featuredExhibitions,
    ] = await Promise.all([
      User.countDocuments(),

      Artifact.countDocuments({
        isActive: true,
      }),

      Exhibition.countDocuments({
        isActive: true,
      }),

      Category.countDocuments({
        isActive: true,
      }),

      Timeline.countDocuments({
        isActive: true,
      }),

      User.countDocuments({
        isActive: true,
      }),

      Artifact.countDocuments({
        isActive: true,
        featured: true,
      }),

      Exhibition.countDocuments({
        isActive: true,
        featured: true,
      }),
    ]);

    res.status(200).json({
      success: true,

      dashboard: {
        totalUsers,
        totalArtifacts,
        totalExhibitions,
        totalCategories,
        totalTimelineEvents,
        activeUsers,
        featuredArtifacts,
        featuredExhibitions,
      },
    });
  } catch (error) {
    console.error(
      "Admin Dashboard Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to fetch admin dashboard",
    });
  }
};

/* =========================
   GET ALL USERS
========================= */

export const getAllUsers = async (
  req,
  res
) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(
      "Get All Users Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch users",
    });
  }
};

/* =========================
   UPDATE USER STATUS
========================= */

export const updateUserStatus = async (
  req,
  res
) => {
  try {
    const { userId } = req.params;

    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message:
          "isActive must be true or false",
      });
    }

    const user = await User.findById(
      userId
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /* Prevent admin from disabling
       their own account */

    if (
      user._id.toString() ===
      req.user._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "You cannot change your own account status",
      });
    }

    user.isActive = isActive;

    await user.save();

    res.status(200).json({
      success: true,
      message: isActive
        ? "User activated successfully"
        : "User deactivated successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error(
      "Update User Status Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to update user status",
    });
  }
};
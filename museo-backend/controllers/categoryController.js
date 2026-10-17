import Category from "../models/Category.js";

// ======================================
// GET ALL CATEGORIES
// ======================================

export const getCategories = async (
  req,
  res
) => {
  try {
    const categories =
      await Category.find({
        isActive: true,
      }).sort({
        name: 1,
      });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error(
      "Get Categories Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to fetch categories",
    });
  }
};

// ======================================
// GET SINGLE CATEGORY
// ======================================

export const getCategoryById =
  async (req, res) => {
    try {
      const category =
        await Category.findOne({
          _id: req.params.id,
          isActive: true,
        });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      res.status(200).json({
        success: true,
        category,
      });
    } catch (error) {
      console.error(
        "Get Category Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch category",
      });
    }
  };
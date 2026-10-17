import Exhibition from "../models/Exhibition.js";

// =========================
// GET ALL EXHIBITIONS
// =========================

export const getExhibitions = async (
  req,
  res
) => {
  try {
    const exhibitions =
      await Exhibition.find({
        isActive: true,
      })
        .populate(
          "category",
          "name image"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: exhibitions.length,
      exhibitions,
    });
  } catch (error) {
    console.error(
      "Get Exhibitions Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to fetch exhibitions",
    });
  }
};

// =========================
// GET FEATURED EXHIBITIONS
// =========================

export const getFeaturedExhibitions =
  async (req, res) => {
    try {
      const exhibitions =
        await Exhibition.find({
          isActive: true,
          featured: true,
        })
          .populate(
            "category",
            "name image"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        count: exhibitions.length,
        exhibitions,
      });
    } catch (error) {
      console.error(
        "Get Featured Exhibitions Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch featured exhibitions",
      });
    }
  };

// =========================
// GET SINGLE EXHIBITION
// =========================

export const getExhibitionById =
  async (req, res) => {
    try {
      const exhibition =
        await Exhibition.findOne({
          _id: req.params.id,
          isActive: true,
        }).populate(
          "category",
          "name image description"
        );

      if (!exhibition) {
        return res.status(404).json({
          success: false,
          message: "Exhibition not found",
        });
      }

      res.status(200).json({
        success: true,
        exhibition,
      });
    } catch (error) {
      console.error(
        "Get Exhibition Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch exhibition",
      });
    }
  };
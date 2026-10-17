import Timeline from "../models/Timeline.js";

// ======================================
// GET ALL TIMELINE EVENTS
// ======================================

export const getTimelineEvents = async (
  req,
  res
) => {
  try {
    const timeline =
      await Timeline.find({
        isActive: true,
      })
        .populate(
          "category",
          "name image"
        )
        .sort({
          order: 1,
          year: 1,
        });

    res.status(200).json({
      success: true,
      count: timeline.length,
      timeline,
    });
  } catch (error) {
    console.error(
      "Get Timeline Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to fetch timeline",
    });
  }
};

// ======================================
// GET SINGLE TIMELINE EVENT
// ======================================

export const getTimelineEventById =
  async (req, res) => {
    try {
      const timelineEvent =
        await Timeline.findOne({
          _id: req.params.id,
          isActive: true,
        }).populate(
          "category",
          "name image description"
        );

      if (!timelineEvent) {
        return res.status(404).json({
          success: false,
          message:
            "Timeline event not found",
        });
      }

      res.status(200).json({
        success: true,
        timelineEvent,
      });
    } catch (error) {
      console.error(
        "Get Timeline Event Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch timeline event",
      });
    }
  };
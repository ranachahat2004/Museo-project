import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    artifacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artifact",
      },
    ],

    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Collection = mongoose.model(
  "Collection",
  collectionSchema
);

export default Collection;
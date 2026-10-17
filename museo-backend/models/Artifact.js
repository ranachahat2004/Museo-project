import mongoose from "mongoose";

const artifactSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    images: [
      {
        type: String,
      },
    ],

    period: {
      type: String,
      default: "",
    },

    origin: {
      type: String,
      default: "",
    },

    material: {
      type: String,
      default: "",
    },

    dimensions: {
      type: String,
      default: "",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    exhibition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exhibition",
      default: null,
    },

    audioUrl: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Artifact = mongoose.model(
  "Artifact",
  artifactSchema
);

export default Artifact;
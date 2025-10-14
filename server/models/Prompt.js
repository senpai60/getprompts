const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },

    promptText: {
      type: String,
      required: true,
      trim: true,
    },

    keywords: [
      {
        type: String,
        trim: true,
      },
    ],

    category: {
      type: String,
      trim: true,
      default: "general",
    },

    // IDs of users who saved this prompt
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Optional: associate the creator/uploader
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// For better searching later (index keywords + prompt text)
promptSchema.index({ promptText: "text", keywords: 1, category: 1 });

module.exports = mongoose.model("Prompt", promptSchema);

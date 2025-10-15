const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    promptText: { type: String, required: true, trim: true },
    keywords: [{ type: String, trim: true }], // keep it as simple array
    category: { type: String, trim: true, default: "general" },
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// ✅ Only text index on promptText
promptSchema.index({ promptText: "text" });

module.exports = mongoose.model("Prompt", promptSchema);

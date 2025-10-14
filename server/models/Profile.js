const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bio: {
      type: String,
      trim: true,
      default: "",
    },

    avatarUrl: {
      type: String,
      default: "https://s.pinimg.com/images/user/default_75.png",
    },

    savedPrompts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prompt",
      },
    ],

    socialLinks: {
      instagram: { type: String, trim: true },
      twitter: { type: String, trim: true },
      website: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);

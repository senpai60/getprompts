const express = require("express");
const router = express.Router();
const pins = require("../data/pins.json");
const extractText = require("../utils/extractText");
const Prompt = require("../models/Prompt");

router.get("/", async (req, res) => {
  try {
    const prompts = await Prompt.find({});
    // console.log(pinUrls[0]);
    res.status(200).json(prompts);
  } catch (err) {}
});
router.get("/:pinId", async (req, res) => {
  try {
    const {pinId} = req.params;
    const prompt = await Prompt.findById(pinId);

    if (!prompt) {
      return res.status(404).json({ error: "Prompt not found" });
    }

    res.status(200).json(prompt);
  } catch (err) {
    console.error("Error fetching prompt:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

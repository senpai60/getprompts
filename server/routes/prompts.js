const express = require("express");
const router = express.Router();
const pins = require("../data/pins.json");
const extractText = require("../utils/extractText");

router.get("/", (req, res) => {
  try {
    const pinUrls = pins.map((pin) => {
      const images = pin.data.images;
      return images[images.length - 1].url;
    });
    // console.log(pinUrls[0]);
    res.status(200).json(pinUrls)
  } catch (err) {}
});

module.exports = router;

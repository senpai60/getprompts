const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const extractText = require("../utils/extractText");
const Prompt = require("../models/Prompt");

const imageUrlsPath = path.join(__dirname, "..", "data", "imageUrls.json");
// load as let so we can modify in-memory; we'll write back to file when we remove items
let imageUrls = require(imageUrlsPath);

router.post("/extract", async (req, res) => {
  const savedPrompts = [];
  const skippedUrls = [];
  const removedUrls = []; // removed from imageUrls list (already in DB or invalid)
  const failed = [];

  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i];

    try {
      // 1) Skip if already in DB
      const exists = await Prompt.findOne({ imageUrl }).lean();
      if (exists) {
        console.log(`⚠️ URL already exists, skipping: ${imageUrl}`);
        skippedUrls.push(imageUrl);

        // remove from the in-memory array and mark for persistence
        imageUrls.splice(i, 1);
        removedUrls.push(imageUrl);
        i--; // shift index because we removed current element
        continue;
      }

      console.log(`🖼️ Processing image: ${imageUrl}`);
      const promptText = await extractText(imageUrl);

      // 2) Validate OCR output before saving
      if (!promptText || typeof promptText !== "string" || promptText.trim().length < 3) {
        console.log(`⚠️ OCR returned empty/insignificant text, skipping: ${imageUrl}`);
        failed.push({ imageUrl, reason: "empty or too short OCR result" });

        // Option: remove tiny thumbnails or known-bad urls (e.g. 75x75)
        // If you'd like to remove thumbnails automatically, uncomment below:
        // imageUrls.splice(i, 1);
        // removedUrls.push(imageUrl);
        // i--;
        continue;
      }

      // 3) Save
      const promptDoc = new Prompt({
        imageUrl,
        promptText: promptText.trim(),
        category: "general",
        keywords: [],
      });

      const saved = await promptDoc.save();
      savedPrompts.push(saved);
      console.log(`✅ Saved prompt for ${imageUrl}`);

      // Optionally remove saved URL from imageUrls so we don't process again
      imageUrls.splice(i, 1);
      removedUrls.push(imageUrl);
      i--;

    } catch (err) {
      // Handle per-image errors without breaking the whole loop
      console.error(`Failed to process ${imageUrl}:`, err);
      failed.push({ imageUrl, error: err.message || err.toString() });
      // continue to next URL
    }
  }

  // Persist the updated imageUrls array back to file so removedUrls remain removed next time
  try {
    fs.writeFileSync(imageUrlsPath, JSON.stringify(imageUrls, null, 2), "utf8");
    console.log("✅ Updated imageUrls.json (removed processed/duplicate entries).");
  } catch (fsErr) {
    console.error("Failed to write imageUrls.json:", fsErr);
  }

  res.status(200).json({ savedPrompts, skippedUrls, removedUrls, failed, remaining: imageUrls.length });
});

module.exports = router;

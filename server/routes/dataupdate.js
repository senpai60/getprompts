const express = require('express');
const router = express.Router();
const extractText = require('../utils/extractText'); // Make sure the path is correct
const Pin = require('../data/pins.json')

// Example route: POST /api/extract
// It expects a JSON body with an "imageUrl" property.
router.post('/extract', async (req, res) => {
  
const imageUrl = "https://i.pinimg.com/736x/39/04/d7/3904d774f7e9bf41a5b7cc0bb4c20ebc.jpg"

  if (!imageUrl) {
    return res.status(400).json({ error: 'Image URL is required' });
  }

  console.log(`🖼️ Processing image: ${imageUrl}`);

  try {
    const prompt = await extractText(imageUrl);
    console.log(`✅ Extracted Prompt: "${prompt}"`);
    res.status(200).json({ prompt });
  } catch (error) {
    console.error("Failed to process image:", error);
    res.status(500).json({ error: 'Failed to extract text from the image.' });
  }
});

module.exports = router;
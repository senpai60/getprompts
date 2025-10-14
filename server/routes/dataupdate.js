const express = require('express');
const router = express.Router()

const extractText = require('../utils/extractText');

const Prompt = require('../models/Prompt');
const pins = require('../data/pins.json');

router.get('/',(req,res)=>{
    res.send('dadadadad')
})

router.post('/create-pin-model', async (req, res) => {
  try {
    const imageUrl = pins[0].data.images[pins[0].data.images.length - 1].url;
    console.log("🖼️ Using image:", imageUrl);

    const promptText = await extractText(imageUrl);
    console.log("📝 Extracted prompt:", promptText);

    res.status(200).send(promptText);
  } catch (err) {
    console.error("❌ Error extracting text:", err);
    res.status(500).send("Error extracting text");
  }
});




module.exports = router

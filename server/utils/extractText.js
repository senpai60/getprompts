// This file should contain ONLY the text extraction logic.
const Tesseract = require("tesseract.js");
const Jimp = require("jimp");

/**
 * Extracts text from an image URL by first cropping to the prompt area.
 * @param {string} imageUrl - The URL of the image to process.
 * @returns {Promise<string>} - The extracted text (prompt).
 */
const extractText = async (imageUrl) => {
  if (!imageUrl) {
    throw new Error("No image URL provided");
  }

  try {
    const image = await Jimp.read(imageUrl);

    // Crop to the bottom 25% of the image, which is a safer bet for prompts
    const cropHeight = image.bitmap.height * 0.25;
    const cropY = image.bitmap.height - cropHeight;
    image.crop(0, cropY, image.bitmap.width, cropHeight);

    // Convert to grayscale and increase contrast for better OCR accuracy
    image.greyscale();
    image.contrast(0.2);

    const croppedImageBuffer = await image.getBufferAsync(Jimp.MIME_PNG);

    const { data: { text } } = await Tesseract.recognize(
      croppedImageBuffer,
      "eng",
      {
        logger: m => console.log(`[OCR] ${Math.round(m.progress * 100)}% - ${m.status}`)
      }
    );

    // Clean up the text by removing newlines and extra spaces
    return text.replace(/\s+/g, ' ').trim();

  } catch (err) {
    console.error("Error during text extraction:", err.message);
    // It's better to throw the original error to see the full stack trace
    throw err;
  }
};

module.exports = extractText;
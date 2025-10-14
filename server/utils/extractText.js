const Tesseract = require("tesseract.js");
const Jimp = require("jimp"); // Make sure this line is here

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
    // This line was failing because 'Jimp' was not a valid object.
    const image = await Jimp.read(imageUrl);

    const cropHeight = image.bitmap.height * 0.20;
    const cropY = image.bitmap.height - cropHeight;

    image.crop(0, cropY, image.bitmap.width, cropHeight);

    const croppedImageBuffer = await image.getBufferAsync(Jimp.MIME_PNG);

    const { data: { text } } = await Tesseract.recognize(
      croppedImageBuffer,
      "eng",
      {
        logger: m => console.log(`[OCR] ${Math.round(m.progress * 100)}% - ${m.status}`)
      }
    );

    return text.replace(/\n/g, ' ').trim();

  } catch (err) {
    console.error("Error extracting text:", err.message);
    throw err;
  }
};

module.exports = extractText;
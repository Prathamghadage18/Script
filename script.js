const puppeteer = require("puppeteer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const JSZip = require("jszip");

const SEARCH_QUERY = "The Orchid Hotel Pune";
const MAX_IMAGES = 30;
const ZIP_FILE = "hotel_images.zip";

async function scrapeImages() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Navigate to Google Images
  await page.goto(
    `https://www.google.com/search?q=${encodeURIComponent(
      SEARCH_QUERY
    )}&tbm=isch`,
    {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    }
  );

  // Scroll to load more images
  let imageCount = 0;
  const uniqueUrls = new Set();

  while (imageCount < MAX_IMAGES) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newUrls = await page.$$eval('img[src^="http"]', (imgs) =>
      imgs.map((img) => img.src).filter((src) => src.startsWith("http"))
    );

    newUrls.forEach((url) => uniqueUrls.add(url));
    imageCount = uniqueUrls.size;
  }

  await browser.close();
  return Array.from(uniqueUrls).slice(0, MAX_IMAGES);
}

async function downloadImage(url, index) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    });

    const contentType = response.headers["content-type"];
    const extension = contentType.split("/")[1] || "jpg";
    return {
      data: Buffer.from(response.data),
      name: `hotel_image_${index}.${extension}`,
    };
  } catch (error) {
    console.error(`Failed to download: ${url}`);
    return null;
  }
}

async function createZip(images) {
  const zip = new JSZip();

  images.forEach((image) => {
    if (image) {
      zip.file(image.name, image.data);
    }
  });

  const content = await zip.generateAsync({ type: "nodebuffer" });
  fs.writeFileSync(ZIP_FILE, content);
}

(async () => {
  try {
    console.log("Starting image scraping...");
    const imageUrls = await scrapeImages();
    console.log(`Found ${imageUrls.length} unique images`);

    console.log("Downloading images...");
    const downloadPromises = imageUrls.map((url, i) => downloadImage(url, i));
    const images = (await Promise.all(downloadPromises)).filter(Boolean);

    console.log(`Downloaded ${images.length} valid images`);
    await createZip(images);
    console.log(`Created ZIP archive: ${ZIP_FILE}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();

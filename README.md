<h1 align="center">🌿 The Orchid Hotel Pune Image Scraper</h1>

<p align="center">
  <strong>A Node.js script that scrapes and archives hotel images from the web</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-14%2B-green" alt="Node.js Version">
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="License">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen" alt="Status">
</p>

<h2>📋 Description</h2>
<p>This script automatically:</p>
<ul>
  <li>🔍 Searches Google Images for "The Orchid Hotel Pune"</li>
  <li>⬇️ Downloads multiple high-quality images</li>
  <li>🗜️ Compresses them into a single ZIP archive</li>
  <li>🛡️ Handles duplicates and network errors</li>
</ul>

<h2>✨ Features</h2>
<ul>
  <li><strong>Smart Scraping</strong>: Uses Puppeteer for headless browsing</li>
  <li><strong>Deduplication</strong>: Avoids duplicate images</li>
  <li><strong>Error Resilient</strong>: Skips broken links gracefully</li>
  <li><strong>Auto-Formatting</strong>: Preserves original image formats</li>
  <li><strong>No Temp Files</strong>: Creates ZIP directly in memory</li>
</ul>

<h2>🚀 Quick Start</h2>

<h3>Prerequisites</h3>
<pre><code>Node.js 14+ installed
</code></pre>

<h3>Installation</h3>
<pre><code>git clone https://github.com/yourusername/orchid-hotel-scraper.git
cd orchid-hotel-scraper
npm install
</code></pre>

<h3>Usage</h3>
<pre><code>node script.js
</code></pre>
<p>Output will be saved as <code>hotel_images.zip</code></p>

<h2>🛠️ Configuration</h2>
<p>Edit these variables in <code>script.js</code>:</p>
<pre><code>const SEARCH_QUERY = 'The Orchid Hotel Pune'; // Change search term
const MAX_IMAGES = 30; // Adjust number of images
const ZIP_FILE = 'hotel_images.zip'; // Output filename
</code></pre>

<h2>📦 Output Example</h2>
<pre>
hotel_images.zip
├── hotel_image_0.jpg
├── hotel_image_1.png
└── hotel_image_2.webp
</pre>

<h2>⚠️ Legal Note</h2>
<p>This script is for educational purposes only. Ensure you have permission to use scraped images according to their respective licenses.</p>

<h2>📜 License</h2>
<p>MIT © 2025 Prathamesh Ghadage</p>

<div align="center">
  <p>
    <a href="https://github.com/yourusername/orchid-hotel-scraper/issues">Report Bug</a> •
    <a href="https://github.com/yourusername/orchid-hotel-scraper/pulls">Request Feature</a>
  </p>
</div>

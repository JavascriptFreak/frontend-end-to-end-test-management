const { Builder } = require('selenium-webdriver');
require('chromedriver');
const fs = require('fs');
const path = require('path');
const resemble = require('resemblejs');

// Define paths relative to project root (for CI/CD safety)
const currentDir = path.resolve(__dirname, '../visual/current');
const diffsDir = path.resolve(__dirname, '../visual/diffs');

// Create output folders if they don’t exist
if (!fs.existsSync(currentDir)) fs.mkdirSync(currentDir, { recursive: true });
if (!fs.existsSync(diffsDir)) fs.mkdirSync(diffsDir, { recursive: true });

// Main test function
async function runTests(url, designImagePath) {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Load page and take screenshot
    await driver.get(url);
    await driver.manage().window().setRect({ width: 1280, height: 800 });

    const screenshotBase64 = await driver.takeScreenshot();
    const currentScreenshotPath = path.join(currentDir, 'current.png');
    fs.writeFileSync(currentScreenshotPath, screenshotBase64, 'base64');

    const diffPath = path.join(diffsDir, 'diff.png');

    // Compare screenshots using Resemble.js
    return new Promise((resolve, reject) => {
      resemble(fs.readFileSync(path.resolve(designImagePath)))
        .compareTo(fs.readFileSync(currentScreenshotPath))
        .ignoreColors()
        .onComplete((data) => {
          fs.writeFileSync(diffPath, data.getBuffer());
          resolve({
            mismatchPercentage: data.misMatchPercentage,
            diffImage: diffPath,
            currentScreenshot: currentScreenshotPath
          });
        });
    });
  } finally {
    await driver.quit();
  }
}

// Export for server.js or other modules
module.exports = runTests;

// Enable CLI usage (for GitHub Actions or terminal)
if (require.main === module) {
  const [,, url, designImagePath] = process.argv;

  if (!url || !designImagePath) {
    console.error("❌ Usage: node runTests.js <url> <designImagePath>");
    process.exit(1);
  }

  runTests(url, designImagePath)
    .then(result => {
      console.log("✅ Visual Test Complete");
      console.log(`Mismatch Percentage: ${result.mismatchPercentage}%`);
      console.log(`Diff Image: ${result.diffImage}`);
      console.log(`Current Screenshot: ${result.currentScreenshot}`);

      // Optional: fail the CI job if mismatch is too high
      if (parseFloat(result.mismatchPercentage) > 5) {
        console.error("❌ Visual mismatch too high!");
        process.exit(1);
      }
    })
    .catch(err => {
      console.error("❌ Error during visual test:", err);
      process.exit(1);
    });
}

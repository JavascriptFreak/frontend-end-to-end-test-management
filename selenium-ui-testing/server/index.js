const { Builder } = require('selenium-webdriver');
require('chromedriver');
const fs = require('fs');
const path = require('path');
const resemble = require('resemblejs');

const currentDir = path.join(__dirname, 'visual/current');
const diffsDir = path.join(__dirname, 'visual/diffs');

// Ensure directories exist
if (!fs.existsSync(currentDir)) fs.mkdirSync(currentDir, { recursive: true });
if (!fs.existsSync(diffsDir)) fs.mkdirSync(diffsDir, { recursive: true });

async function runTests(url, designImagePath) {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get(url);
    await driver.manage().window().setRect({ width: 1280, height: 800 });

    // Screenshot current state
    const screenshotBase64 = await driver.takeScreenshot();
    const currentScreenshotPath = path.join(currentDir, 'current.png');
    fs.writeFileSync(currentScreenshotPath, screenshotBase64, 'base64');

    // Compare with design image
    const diffPath = path.join(diffsDir, 'diff.png');

    return new Promise((resolve, reject) => {
      resemble(fs.readFileSync(designImagePath))
        .compareTo(fs.readFileSync(currentScreenshotPath))
        .ignoreColors()
        .onComplete((data) => {
          fs.writeFileSync(diffPath, data.getBuffer());
          resolve({
            mismatchPercentage: data.misMatchPercentage,
            diffImage: `/visual/diffs/diff.png`,
            currentScreenshot: `/visual/current/current.png`
          });
        });
    });
  } finally {
    await driver.quit();
  }
}

module.exports = runTests;

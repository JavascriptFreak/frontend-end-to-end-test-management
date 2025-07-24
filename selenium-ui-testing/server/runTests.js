const { Builder } = require('selenium-webdriver');

const runFunctionalTests = require('./functionalRunner');
const generateHTMLReport = require('./generateReport');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');
const resemble = require('resemblejs');

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 }
];

const baseDir = path.resolve(__dirname, '../visual');
const currentDir = path.join(baseDir, 'current');
const diffsDir = path.join(baseDir, 'diffs');

if (!fs.existsSync(currentDir)) fs.mkdirSync(currentDir, { recursive: true });
if (!fs.existsSync(diffsDir)) fs.mkdirSync(diffsDir, { recursive: true });

async function runTests(url, designImagePath) {
  const results = [];

  for (const device of viewports) {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get(url);
      await driver.manage().window().setRect({ width: device.width, height: device.height });

      const functionalResults = await runFunctionalTests(driver, url);

      const screenshotBase64 = await driver.takeScreenshot();
      const currentScreenshotPath = path.join(currentDir, `${device.name}.png`);
      const diffPath = path.join(diffsDir, `${device.name}-diff.png`);

      fs.writeFileSync(currentScreenshotPath, screenshotBase64, 'base64');

      const data = await new Promise((resolve) => {
        resemble(fs.readFileSync(path.resolve(designImagePath)))
          .compareTo(fs.readFileSync(currentScreenshotPath))
          .ignoreColors()
          .onComplete(resolve);
      });

      fs.writeFileSync(diffPath, data.getBuffer());

      const diffBase64 = await fs.promises.readFile(diffPath, { encoding: 'base64' });

      results.push({
        device: device.name,
        mismatchPercentage: data.misMatchPercentage,
        currentScreenshot: `data:image/png;base64,${screenshotBase64}`,
        diffImage: `data:image/png;base64,${diffBase64}`,
        functionalResults
      });

    } catch (err) {
      console.error(`Error testing ${device.name}:`, err);
    } finally {
      await driver.quit();
    }
  }

  generateHTMLReport(results); // move outside loop so it's called once
  return results;
}

module.exports = runTests;

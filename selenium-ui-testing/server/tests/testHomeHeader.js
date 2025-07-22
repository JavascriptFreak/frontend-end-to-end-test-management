
const { By } = require('selenium-webdriver');

module.exports = async function testHomeHeader(driver,url) {
  await driver.get(url);
  const headerSelectors = ['h1', '.header', '.page-header'];
  for (let sel of headerSelectors) {
    if (await elementExists(sel)) {
      const text = await driver.findElement(By.css(sel)).getText();
      console.log(`🏠 Home header found: ${text}`);
      return;
    }
  }
  console.log('ℹ️ Home header not found');
};
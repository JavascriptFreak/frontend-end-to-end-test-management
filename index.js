const { Builder } = require('selenium-webdriver');

(async function openWebsite() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://books.toscrape.com/');
    console.log('Website opened successfully');
  } catch (error) {
    console.error('Error opening website:', error);
  } finally {
    //await driver.quit();
  }
})();

const { By, Key } = require('selenium-webdriver');
const config = require('../config/config');
const { findFirstExistingSelector, waitForElement } = require('../helpers/elementUtils');

module.exports = async function testSearchFunctionality(driver) {
  const searchSelector = await findFirstExistingSelector(config.selectors.searchInput);
  if (searchSelector) {
    if (await waitForElement(searchSelector)) {
      console.log('🔍 Performing search...');
      const input = await driver.findElement(By.css(searchSelector));
      await input.clear();
      await input.sendKeys(config.searchKeyword, Key.RETURN);
      await driver.sleep(2000);
      console.log('✅ Search performed');
    }
  } else {
    console.log('ℹ️ Search not available');
  }
};

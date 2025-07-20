const { By } = require('selenium-webdriver');
const config = require('../config/config');
const { findFirstExistingSelector } = require('../helpers/elementUtils');

module.exports = async function testCategoryNavigation(driver) {
  const categorySelector = await findFirstExistingSelector(config.selectors.categories);
  if (categorySelector) {
    const links = await driver.findElements(By.css(categorySelector));
    if (links.length > 0) {
      const href = await links[0].getAttribute('href');
      if (href) {
        await driver.get(href);
        console.log(`✅ Navigated to category: ${href}`);
        await driver.sleep(1000);
        return;
      }
    }
  }
  console.log('ℹ️ No categories found');
};

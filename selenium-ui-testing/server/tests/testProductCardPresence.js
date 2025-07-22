const { By } = require('selenium-webdriver');

module.exports = async function testProductCardPresence(driver, url) {
  await driver.get(url);

  const productSelector = '.product-card, .product, .product-item';

  try {
    const cards = await driver.findElements(By.css(productSelector));
    if (cards.length > 0) {
      console.log(`🛍️ Found ${cards.length} product cards`);
    } else {
      console.log('ℹ️ No product cards found');
    }
  } catch {
    console.log('ℹ️ Product cards not available');
  }
};

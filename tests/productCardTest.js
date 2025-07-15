const config = require('../config/config');
const { findFirstExistingSelector } = require('../helpers/elementUtils');

module.exports = async function testProductCardPresence(driver) {
  const productSelector = await findFirstExistingSelector(config.selectors.productCards);
  if (productSelector) {
    const cards = await driver.findElements(By.css(productSelector));
    if (cards.length > 0) {
      console.log(`🛍️ Found ${cards.length} product cards`);
    } else {
      console.log('ℹ️ No product cards found');
    }
  } else {
    console.log('ℹ️ Product cards not available');
  }
};

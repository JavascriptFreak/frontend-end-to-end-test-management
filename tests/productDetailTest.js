const config = require('../config/config');
const { findFirstExistingSelector } = require('../helpers/elementUtils');

module.exports = async function testFirstProductDetail(driver) {
  const productLinkSelector = await findFirstExistingSelector(config.selectors.productLinks);
  if (productLinkSelector) {
    const links = await driver.findElements(By.css(productLinkSelector));
    if (links.length > 0) {
      const href = await links[0].getAttribute('href');
      if (href) {
        await driver.get(href);
        console.log(`🔎 Opened product detail page: ${href}`);
        await driver.sleep(1000);
        return;
      }
    }
  }
  console.log('ℹ️ Product detail not available');
};

const { By } = require('selenium-webdriver');

module.exports = async function testFirstProductDetail(driver, url) {
  await driver.get(url);

  const productLinkSelector = '.product-card a, .product-item a, .product-link';

  try {
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
    console.log('ℹ️ Product detail not available');
  } catch {
    console.log('ℹ️ Product detail not available');
  }
};

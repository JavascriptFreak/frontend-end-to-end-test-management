const { By } = require('selenium-webdriver');

module.exports = async function testAddToCart(driver,url) {
    await driver.get(url);
  const addBtnSelector = await findFirstExistingSelector(config.selectors.addToCartBtn);
  if (addBtnSelector) {
    const btn = await driver.findElement(By.css(addBtnSelector));
    await btn.click();
    console.log('🛒 Add to cart clicked');
  } else {
    console.log('ℹ️ Add to cart not available');
  }
};
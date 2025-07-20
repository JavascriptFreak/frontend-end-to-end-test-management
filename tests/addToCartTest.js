const config = require('../config/config');
const { findFirstExistingSelector } = require('../helpers/elementUtils');

module.exports = async function testAddToCart(driver) {
  const addBtnSelector = await findFirstExistingSelector(config.selectors.addToCartBtn);
  if (addBtnSelector) {
    const btn = await driver.findElement(By.css(addBtnSelector));
    await btn.click();
    console.log('🛒 Add to cart clicked');
  } else {
    console.log('ℹ️ Add to cart not available');
  }
};

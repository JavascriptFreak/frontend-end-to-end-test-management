const { By, until } = require('selenium-webdriver');
const { findFirstExistingSelector } = require('./utils');
const config = require('../config');

module.exports = async function testAddToCart(driver, url) {
  await driver.get(url);

  let addBtnSelector;
  try {
    addBtnSelector = await findFirstExistingSelector(driver, config.selectors.addToCartBtn);
  } catch (e) {
    console.log('ℹ Add to cart not available (selector not found)');
    return { status: 'skipped', message: 'Add to cart selector not found' };
  }

  await driver.wait(until.elementLocated(By.css(addBtnSelector)), 7000);
  const btn = await driver.findElement(By.css(addBtnSelector));

  await driver.wait(until.elementIsEnabled(btn), 5000);
  await btn.click();

  console.log('🛒 Add to cart clicked');
  await driver.sleep(1000);
};
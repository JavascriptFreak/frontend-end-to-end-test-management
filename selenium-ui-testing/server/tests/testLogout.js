const { By } = require('selenium-webdriver');
const { findFirstExistingSelector } = require('./utils');
const config = require('../config');

module.exports = async function testLogout(driver, url) {
  await driver.get(url);

  const logoutSelector = await findFirstExistingSelector(driver, config.selectors.logout);

  if (logoutSelector) {
    await driver.findElement(By.css(logoutSelector)).click();
    console.log('👋 Logged out');
    await driver.sleep(1000);
  } else {
    console.log('ℹ️ Logout not available');
  }
};

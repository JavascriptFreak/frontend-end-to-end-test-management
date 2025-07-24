const { By, until } = require('selenium-webdriver');
const { findFirstExistingSelector } = require('./utils');
const config = require('../config');

module.exports = async function testLogout(driver, url) {
  await driver.get(url);

  let logoutSelector;
  try {
    logoutSelector = await findFirstExistingSelector(driver, config.selectors.logout);
  } catch (e) {
    console.log('ℹ Logout not available (selector not found)');
    return { status: 'skipped', message: 'Logout selector not found' };
  }

  await driver.wait(until.elementLocated(By.css(logoutSelector)), 7000);
  const logoutBtn = await driver.findElement(By.css(logoutSelector));

  await driver.wait(until.elementIsEnabled(logoutBtn), 5000);
  await logoutBtn.click();

  console.log('👋 Logged out');
  await driver.sleep(1000);
};

const { By, until } = require('selenium-webdriver');
const { findFirstExistingSelector } = require('./utils');
const config = require('../config');

async function waitForElement(driver, selector, timeout = 5000) {
  const el = By.css(selector);
  await driver.wait(until.elementLocated(el), timeout);
  return true;
}

module.exports = async function testLogin(driver, url) {
  await driver.get(url);

  let usernameSelector, passwordSelector, loginBtnSelector;

  try {
    usernameSelector = await findFirstExistingSelector(driver, config.selectors.login.username);
    passwordSelector = await findFirstExistingSelector(driver, config.selectors.login.password);
    loginBtnSelector = await findFirstExistingSelector(driver, config.selectors.login.loginBtn);
  } catch (e) {
    console.log('ℹ️ Login not available (selectors not found)');
    return; // Exit the test early
  }

  if (usernameSelector && passwordSelector && loginBtnSelector) {
    if (await waitForElement(driver, usernameSelector) && await waitForElement(driver, passwordSelector)) {
      console.log('🔐 Attempting Login..');
      await driver.findElement(By.css(usernameSelector)).sendKeys(config.user.username);
      await driver.findElement(By.css(passwordSelector)).sendKeys(config.user.password);
      await driver.findElement(By.css(loginBtnSelector)).click();
      await driver.sleep(1000);
      console.log('✅ Login attempted');
    }
  } else {
    console.log('ℹ️ Login elements not found');
  }
};
const { By } = require('selenium-webdriver');
const config = require('../config/config');
const { findFirstExistingSelector, waitForElement } = require('../helpers/elementUtils');

module.exports = async function testLogin(driver) {
    const usernameSelector = await findFirstExistingSelector(config.selectors.login.username);
  const passwordSelector = await findFirstExistingSelector(config.selectors.login.password);
  const loginBtnSelector = await findFirstExistingSelector(config.selectors.login.loginBtn);

  if (usernameSelector && passwordSelector && loginBtnSelector) {
    if (await waitForElement(usernameSelector) && await waitForElement(passwordSelector)) {
      console.log('🔐 Attempting Login..');
      await driver.findElement(By.css(usernameSelector)).sendKeys(config.user.username);
      await driver.findElement(By.css(passwordSelector)).sendKeys(config.user.password);
      await driver.findElement(By.css(loginBtnSelector)).click();
      await driver.sleep(1000);
      console.log('✅ Login attempted');
    }
  } else {
    console.log('ℹ️ Login not available');
  }
}

const config = require('../config/config');
const { findFirstExistingSelector } = require('../helpers/elementUtils');

module.exports = async function testLogout(driver) {
  const logoutSelector = await findFirstExistingSelector(config.selectors.logout);
  if (logoutSelector) {
    await driver.findElement(By.css(logoutSelector)).click();
    console.log('👋 Logged out');
    await driver.sleep(1000);
  } else {
    console.log('ℹ️ Logout not available');
  }
};

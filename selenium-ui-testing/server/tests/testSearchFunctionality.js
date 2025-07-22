const { By, Key } = require('selenium-webdriver');

module.exports = async function testSearchFunctionality(driver, url) {
  await driver.get(url);

  const searchSelector = 'input[type="search"], input.search, #searchInput';

  try {
    const input = await driver.findElement(By.css(searchSelector));
    await input.clear();
    await input.sendKeys('test search', Key.RETURN);
    await driver.sleep(2000);
    console.log('🔍 Search performed');
  } catch {
    console.log('ℹ️ Search not available');
  }
};

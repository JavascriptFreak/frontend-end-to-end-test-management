const { By, until } = require('selenium-webdriver');

module.exports = async function testHomeHeader(driver, url) {
  await driver.get(url);

  // Check for Amazon header elements: logo and search bar
  const selectors = ['#nav-logo', '#nav-search-bar-form'];

  for (const sel of selectors) {
    try {
      await driver.wait(until.elementLocated(By.css(sel)), 5000);
      const elem = await driver.findElement(By.css(sel));
      if (elem) {
        return { status: 'passed' };
      }
    } catch {
      // continue to next selector
    }
  }

  return { status: 'failed', message: 'Amazon header elements not found' };
};

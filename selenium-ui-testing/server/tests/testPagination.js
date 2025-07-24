const { By } = require('selenium-webdriver');
const { findFirstExistingSelector } = require('./utils');
const config = require('../config');

module.exports = async function testPagination(driver, url) {
  await driver.get(url);

  const nextSelector = await findFirstExistingSelector(driver, config.selectors.paginationNext);

  if (nextSelector) {
    console.log('➡️ Pagination detected, clicking next...');
    const next = await driver.findElement(By.css(nextSelector));
    await next.click();
    await driver.sleep(1000);
    console.log('✅ Paginated to next page');
  } else {
    console.log('ℹ️ Pagination not available');
  }
};

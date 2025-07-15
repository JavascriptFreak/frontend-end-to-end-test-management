const { By } = require('selenium-webdriver');
const config = require('../config/config');
const { findFirstExistingSelector } = require('../helpers/elementUtils');

module.exports = async function testPagination(driver) {
  const nextSelector = await findFirstExistingSelector(config.selectors.paginationNext);
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

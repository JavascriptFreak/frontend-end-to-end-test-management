const { Builder } = require('selenium-webdriver');
require('chromedriver');
const config = require('./config/config');
const safeTest = require('./helpers/safeTest');
const { setDriver } = require('./helpers/elementUtils');

// Import test cases
const loginTest = require('./tests/loginTest');
const homeHeaderTest = require('./tests/homeHeaderTest');
const categoryNavigationTest = require('./tests/categoryNavigationTest');
const searchFunctionalityTest = require('./tests/searchFunctionalityTest');
const productCardTest = require('./tests/productCardTest');
const paginationTest = require('./tests/paginationTest');
const productDetailTest = require('./tests/productDetailTest');
const addToCartTest = require('./tests/addToCartTest');
const responsiveUITest = require('./tests/responsiveUITest');
const buttonVisibilityTest = require('./tests/buttonVisibilityTest');
const logoutTest = require('./tests/logoutTest');
const brokenLinksTest = require('./tests/brokenLinksTest');

async function runAllTests() {
  const driver = await new Builder().forBrowser('chrome').build();
  setDriver(driver);

  try {
    await driver.get(config.baseUrl);

    await safeTest(() => loginTest(driver), 'Login Test');
    await safeTest(() => homeHeaderTest(driver), 'Home Header Test');
    await safeTest(() => categoryNavigationTest(driver), 'Category Navigation Test');
    await safeTest(() => searchFunctionalityTest(driver), 'Search Functionality Test');
    await safeTest(() => productCardTest(driver), 'Product Card Presence Test');
    await safeTest(() => paginationTest(driver), 'Pagination Test');
    await safeTest(() => productDetailTest(driver), 'First Product Detail Test');
    await safeTest(() => addToCartTest(driver), 'Add to Cart Test');
    await safeTest(() => responsiveUITest(driver), 'Responsive UI Test');
    await safeTest(() => buttonVisibilityTest(driver), 'Button Visibility Test');
    await safeTest(() => logoutTest(driver), 'Logout Test');
    await safeTest(() => brokenLinksTest(driver), 'Broken Links Test');

    console.log('\n🎉 Universal E2E Test Completed!');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await driver.quit();
  }
}

runAllTests();

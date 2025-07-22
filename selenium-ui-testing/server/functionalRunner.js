const testLogin = require('./tests/testLogin');
const testLogout = require('./tests/testLogout');
const testSearch = require('./tests/testSearchFunctionality');
const testAddToCart = require('./tests/testAddToCart');
const testPagination = require('./tests/testPagination');
const testCategoryNavigation = require('./tests/testCategoryNavigation');
const testHomeHeader = require('./tests/testHomeHeader');
const testButtonVisibility = require('./tests/testButtonVisibility');
const testResponsiveUI = require('./tests/testResponsiveUI');
const testProductCardPresence = require('./tests/testProductCardPresence');
const testFirstProductDetail = require('./tests/testFirstProductDetail');

async function runFunctionalTests(driver,url) {
  const tests = [
    testLogin,
    testSearch,
    testAddToCart,
    testPagination,
    testCategoryNavigation,
    testHomeHeader,
    testButtonVisibility,
    testProductCardPresence,
    testFirstProductDetail,
    testLogout,
    testResponsiveUI
  ];

  const results = [];

  for (const test of tests) {
    try {
      await test(driver, url);
      results.push({ test: test.name, status: 'passed' });
    } catch (err) {
      console.error(`❌ Error running ${test.name}:`, err.message);
      results.push({ test: test.name, status: 'failed', message: err.message });
    }
  }

  return results;
}

module.exports = runFunctionalTests;


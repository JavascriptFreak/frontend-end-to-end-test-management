const testLogin = require('./tests/testLogin');
const testBrokenLinks =require('./tests/testBrokenLinks')
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
const testProductNavigation = require('./tests/testProductNavigation')

async function runFunctionalTests(driver,url) {
  const tests = [
    testLogin,
    testBrokenLinks,
    testSearch,
    testAddToCart,
    testPagination,
    testCategoryNavigation,
    testHomeHeader,
    testButtonVisibility,
    testProductCardPresence,
    testFirstProductDetail,
    testLogout,
    testResponsiveUI,
    testProductNavigation
  ];

  const results = [];
  for (const test of tests) {
    try {
      const result = await test(driver, url);
      
      if (result?.status === 'skipped') {
        results.push({ test: test.name, status: 'skipped', message: result.message });
      } else {
        results.push({ test: test.name, status: 'passed' });
      }
  
    } catch (err) {
      // console.error(❌ Error running ${test.name}:, err.message);
      results.push({ test: test.name, status: 'failed', message: err.message });
    }
  }

  // for (const test of tests) {
  //   try {
  //     await test(driver, url);
  //     results.push({ test: test.name, status: 'passed' });
  //   } catch (err) {
  //     console.error(`❌ Error running ${test.name}:`, err.message);
  //     results.push({ test: test.name, status: 'failed', message: err.message });
  //   }
  // }

  return results;
}

module.exports = runFunctionalTests;


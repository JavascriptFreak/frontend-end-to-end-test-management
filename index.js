const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');
const fetch = require('node-fetch');

const config = {
  baseUrl: 'https://demoqa.com/',  // Change this per website
  user: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  searchKeyword: 'sample',
  selectors: {
    login: {
      username: ['input[type="text"]', 'input[name*="user"]'],
      password: ['input[type="password"]'],
      loginBtn: ['button[type="submit"]', 'input[type="submit"]', 'button.login'],
    },
    searchInput: ['input[type="search"]', 'input[name*="search"]'],
    categories: ['nav a', '.categories a', '.side_categories a'],
    productCards: ['.product', '.product-card', '.inventory_item', '.product_pod'],
    paginationNext: ['.pagination .next a', '.pager .next a', 'a[rel="next"]'],
    productLinks: ['a[href*="product"]', '.inventory_item a', 'h3 a'],
    addToCartBtn: ['button.add-to-cart', '.btn_primary', '.btn-add-to-cart'],
    logout: ['a[href*="logout"]', 'button.logout', '#logout_sidebar_link'],
  }
};

let driver;

async function elementExists(selector) {
  try {
    await driver.findElement(By.css(selector));
    return true;
  } catch {
    return false;
  }
}

async function findFirstExistingSelector(selectors) {
  for (const sel of selectors) {
    if (await elementExists(sel)) {
      return sel;
    }
  }
  return null;
}

async function waitForElement(selector, timeout = 5000) {
  try {
    await driver.wait(until.elementLocated(By.css(selector)), timeout);
    await driver.wait(until.elementIsVisible(driver.findElement(By.css(selector))), timeout);
    return true;
  } catch {
    return false;
  }
}

async function safeTest(testFunc, name) {
  try {
    await testFunc();
  } catch (e) {
    console.error(`❌ Error in ${name}:`, e.message);
  }
}

async function testLogin() {
  const usernameSelector = await findFirstExistingSelector(config.selectors.login.username);
  const passwordSelector = await findFirstExistingSelector(config.selectors.login.password);
  const loginBtnSelector = await findFirstExistingSelector(config.selectors.login.loginBtn);

  if (usernameSelector && passwordSelector && loginBtnSelector) {
    if (await waitForElement(usernameSelector) && await waitForElement(passwordSelector)) {
      console.log('🔐 Attempting Login...');
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

async function testHomeHeader() {
  const headerSelectors = ['h1', '.header', '.page-header'];
  for (let sel of headerSelectors) {
    if (await elementExists(sel)) {
      const text = await driver.findElement(By.css(sel)).getText();
      console.log(`🏠 Home header found: ${text}`);
      return;
    }
  }
  console.log('ℹ️ Home header not found');
}

async function testCategoryNavigation() {
  const categorySelector = await findFirstExistingSelector(config.selectors.categories);
  if (categorySelector) {
    const links = await driver.findElements(By.css(categorySelector));
    if (links.length > 0) {
      const href = await links[0].getAttribute('href');
      if (href) {
        await driver.get(href);
        console.log(`✅ Navigated to category: ${href}`);
        await driver.sleep(1000);
        return;
      }
    }
  }
  console.log('ℹ️ No categories found');
}

async function testSearchFunctionality() {
  const searchSelector = await findFirstExistingSelector(config.selectors.searchInput);
  if (searchSelector) {
    if (await waitForElement(searchSelector)) {
      console.log('🔍 Performing search...');
      const input = await driver.findElement(By.css(searchSelector));
      await input.clear();
      await input.sendKeys(config.searchKeyword, Key.RETURN);
      await driver.sleep(2000);
      console.log('✅ Search performed');
    }
  } else {
    console.log('ℹ️ Search not available');
  }
}

async function testProductCardPresence() {
  const productSelector = await findFirstExistingSelector(config.selectors.productCards);
  if (productSelector) {
    const cards = await driver.findElements(By.css(productSelector));
    if (cards.length > 0) {
      console.log(`🛍️ Found ${cards.length} product cards`);
    } else {
      console.log('ℹ️ No product cards found');
    }
  } else {
    console.log('ℹ️ Product cards not available');
  }
}

async function testPagination() {
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
}

async function testFirstProductDetail() {
  const productLinkSelector = await findFirstExistingSelector(config.selectors.productLinks);
  if (productLinkSelector) {
    const links = await driver.findElements(By.css(productLinkSelector));
    if (links.length > 0) {
      const href = await links[0].getAttribute('href');
      if (href) {
        await driver.get(href);
        console.log(`🔎 Opened product detail page: ${href}`);
        await driver.sleep(1000);
        return;
      }
    }
  }
  console.log('ℹ️ Product detail not available');
}

async function testAddToCart() {
  const addBtnSelector = await findFirstExistingSelector(config.selectors.addToCartBtn);
  if (addBtnSelector) {
    const btn = await driver.findElement(By.css(addBtnSelector));
    await btn.click();
    console.log('🛒 Add to cart clicked');
  } else {
    console.log('ℹ️ Add to cart not available');
  }
}

async function testResponsiveUI() {
  const sizes = [[375, 667], [768, 1024], [1440, 900]];
  console.log('📱 Testing responsiveness...');
  for (const [w, h] of sizes) {
    await driver.manage().window().setRect({ width: w, height: h });
    await driver.sleep(500);
    console.log(`✅ Viewport ${w}x${h} tested`);
  }
}

async function testButtonVisibility() {
  try {
    const btns = await driver.findElements(By.css('button, input[type="button"]'));
    console.log(`🔘 Found ${btns.length} buttons`);
  } catch {
    console.log('ℹ️ No buttons found');
  }
}

async function testLogout() {
  const logoutSelector = await findFirstExistingSelector(config.selectors.logout);
  if (logoutSelector) {
    await driver.findElement(By.css(logoutSelector)).click();
    console.log('👋 Logged out');
    await driver.sleep(1000);
  } else {
    console.log('ℹ️ Logout not available');
  }
}

async function testBrokenLinks() {
  const anchors = await driver.findElements(By.css('a'));
  console.log('🔗 Checking links...');
  for (let a of anchors.slice(0, 10)) {
    try {
      const href = await a.getAttribute('href');
      if (href && href.startsWith('http')) {
        const response = await fetch(href, { method: 'HEAD' });
        if (!response.ok) {
          console.warn(`❌ Broken link: ${href} (status: ${response.status})`);
        } else {
          console.log(`✅ Link OK: ${href}`);
        }
      }
    } catch {
      console.warn(`⚠️ Link check failed`);
    }
  }
}

async function runAllTests() {
  driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get(config.baseUrl);

    await safeTest(testLogin, 'Login Test');
    await safeTest(testHomeHeader, 'Home Header Test');
    await safeTest(testCategoryNavigation, 'Category Navigation Test');
    await safeTest(testSearchFunctionality, 'Search Functionality Test');
    await safeTest(testProductCardPresence, 'Product Card Presence Test');
    await safeTest(testPagination, 'Pagination Test');
    await safeTest(testFirstProductDetail, 'First Product Detail Test');
    await safeTest(testAddToCart, 'Add to Cart Test');
    await safeTest(testResponsiveUI, 'Responsive UI Test');
    await safeTest(testButtonVisibility, 'Button Visibility Test');
    await safeTest(testLogout, 'Logout Test');
    await safeTest(testBrokenLinks, 'Broken Links Test');

    console.log('\n🎉 Universal E2E Test Completed!');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await driver.quit();
  }
}

runAllTests();

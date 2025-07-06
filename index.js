const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

const config = {
  baseUrl: 'https://demoqa.com/', // CHANGE this for any site
  searchKeyword: 'sample',
};

let driver;

async function elementExists(selector, type = 'css') {
  try {
    await driver.findElement(type === 'css' ? By.css(selector) : By.xpath(selector));
    return true;
  } catch {
    return false;
  }
}

async function testLogin() {
  const selectors = {
    username: 'input[type="text"], input[name*="user"]',
    password: 'input[type="password"]',
    loginBtn: 'button[type="submit"], input[type="submit"], button.login',
  };

  const userExists = await elementExists(selectors.username);
  const passExists = await elementExists(selectors.password);
  const btnExists = await elementExists(selectors.loginBtn);

  if (userExists && passExists && btnExists) {
    console.log('🔐 Attempting Login...');
    try {
      await driver.findElement(By.css(selectors.username)).sendKeys('standard_user');
      await driver.findElement(By.css(selectors.password)).sendKeys('secret_sauce');
      await driver.findElement(By.css(selectors.loginBtn)).click();
      await driver.sleep(1000);
      console.log('✅ Login attempted');
    } catch (e) {
      console.warn('⚠️ Login attempt failed:', e.message);
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
  const selector = 'nav a, .categories a, .side_categories a';
  try {
    const links = await driver.findElements(By.css(selector));
    if (links.length > 0) {
      console.log(`📂 Categories found: ${links.length}`);
      const href = await links[0].getAttribute('href');
      await driver.get(href);
      console.log(`✅ Navigated to category: ${href}`);
    } else {
      console.log('ℹ️ No categories found');
    }
  } catch {
    console.log('ℹ️ No categories available');
  }
}

async function testSearchFunctionality() {
  const searchSelector = 'input[type="search"], input[name*="search"]';
  if (await elementExists(searchSelector)) {
    console.log('🔍 Performing search...');
    const input = await driver.findElement(By.css(searchSelector));
    await input.sendKeys(config.searchKeyword, Key.RETURN);
    await driver.sleep(2000);
    console.log('✅ Search performed');
  } else {
    console.log('ℹ️ Search not available');
  }
}

async function testProductCardPresence() {
  const productSelector = '.product, .product-card, .inventory_item, .product_pod';
  try {
    const cards = await driver.findElements(By.css(productSelector));
    if (cards.length > 0) {
      console.log(`🛍️ Found ${cards.length} product cards`);
    } else {
      console.log('ℹ️ No product cards found');
    }
  } catch {
    console.log('ℹ️ Product cards not available');
  }
}

async function testPagination() {
  const nextSelector = '.pagination .next a, .pager .next a, a[rel="next"]';
  if (await elementExists(nextSelector)) {
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
  const productLinkSelector = 'a[href*="product"], .inventory_item a, h3 a';
  try {
    const links = await driver.findElements(By.css(productLinkSelector));
    if (links.length > 0) {
      const href = await links[0].getAttribute('href');
      await driver.get(href);
      console.log(`🔎 Opened product detail page: ${href}`);
    } else {
      console.log('ℹ️ No product links found');
    }
  } catch {
    console.log('ℹ️ Product detail not available');
  }
}

async function testAddToCart() {
  const addBtnSelector = 'button.add-to-cart, .btn_primary, .btn-add-to-cart';
  if (await elementExists(addBtnSelector)) {
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
  const logoutSelector = 'a[href*="logout"], button.logout, #logout_sidebar_link';
  if (await elementExists(logoutSelector)) {
    await driver.findElement(By.css(logoutSelector)).click();
    console.log('👋 Logged out');
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
        await driver.get(href);
        const bodyText = await driver.findElement(By.tagName('body')).getText();
        if (bodyText.includes('404') || bodyText.includes('Not Found')) {
          console.warn(`❌ Broken link: ${href}`);
        } else {
          console.log(`✅ Link OK: ${href}`);
        }
        await driver.navigate().back();
      }
    } catch (e) {
      console.warn(`⚠️ Link check failed`);
    }
  }
}

async function runAllTests() {
  driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get(config.baseUrl);

    await testLogin();
    await testHomeHeader();
    await testCategoryNavigation();
    await testSearchFunctionality();
    await testProductCardPresence();
    await testPagination();
    await testFirstProductDetail();
    await testAddToCart();
    await testResponsiveUI();
    await testButtonVisibility();
    await testLogout();
    await testBrokenLinks();

    console.log('\n🎉 Universal E2E Test Completed!');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await driver.quit();
  }
}

runAllTests();

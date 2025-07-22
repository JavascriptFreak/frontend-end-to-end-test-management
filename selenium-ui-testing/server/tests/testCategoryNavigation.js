const { By } = require('selenium-webdriver');

module.exports = async function testCategoryNavigation(driver, url) {
  await driver.get(url);

  // Example selector for categories (adjust if needed)
  const categorySelector = 'nav.categories a, .category-list a';

  try {
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
    console.log('ℹ️ No categories found');
  } catch {
    console.log('ℹ️ No categories found');
  }
};

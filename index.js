const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

(async function fullE2ETest() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://books.toscrape.com/');
    console.log('📘 Opened Home Page');

    const categories = await driver.findElements(By.css('.side_categories ul li ul li a'));
    const categoryLinks = [];

    // Store all category hrefs
    for (const cat of categories) {
      const href = await cat.getAttribute('href');
      categoryLinks.push(href);
    }

    // Loop through each category
    for (const categoryUrl of categoryLinks) {
      await driver.get(categoryUrl);
      const categoryTitle = await driver.findElement(By.css('.page-header h1')).getText();
      console.log(`📂 Category: ${categoryTitle}`);

      let hasNextPage = true;

      while (hasNextPage) {
        const books = await driver.findElements(By.css('ol.row li h3 a'));
        const bookLinks = [];

        // Store all book hrefs on the current page
        for (const book of books) {
          const href = await book.getAttribute('href');
          const fullUrl = new URL(href, categoryUrl).href;
          bookLinks.push(fullUrl);
        }

        // Visit each book page and validate
        for (const bookUrl of bookLinks) {
          await driver.get(bookUrl);
          const title = await driver.findElement(By.css('.product_main h1')).getText();
          const addButton = await driver.findElement(By.xpath("//button[contains(text(), 'Add to basket')]"));
          const isVisible = await addButton.isDisplayed();
          const breadcrumb = await driver.findElement(By.css('.breadcrumb li.active')).getText();

          if (breadcrumb !== title) {
            console.warn(`⚠️ Breadcrumb mismatch on: ${title}`);
          } else {
            console.log(`✅ Book: ${title} — Add to basket visible: ${isVisible}`);
          }
        }

        // Check for next page
        const nextLinks = await driver.findElements(By.css('.pager .next a'));
        if (nextLinks.length > 0) {
          const nextUrl = await nextLinks[0].getAttribute('href');
          const newPageUrl = new URL(nextUrl, driver.getCurrentUrl()).href;
          await driver.get(newPageUrl);
        } else {
          hasNextPage = false;
        }
      }
    }

    console.log('🎉 Full E2E test completed for all categories and books!');
  } catch (err) {
    console.error('❌ Test failed:', err.message);
  } finally {
    await driver.quit();
  }
})();

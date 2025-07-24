const { By, until } = require('selenium-webdriver');

module.exports = async function testProductNavigation(driver, url) {
  await driver.get(url);

  try {
    // 1. Wait for product list to load
    await driver.wait(until.elementLocated(By.css('.s-main-slot')), 10000);

    // 2. Get first product link from search results
    const productElements = await driver.findElements(
      By.css('.s-main-slot .s-result-item[data-asin] h2 a')
    );

    if (productElements.length === 0) {
      return { status: 'skipped', message: 'No products found on page' };
    }

    // 3. Click first product
    const firstProduct = productElements[0];
    await driver.executeScript("arguments[0].scrollIntoView(true);", firstProduct);
    await driver.wait(until.elementIsVisible(firstProduct), 5000);
    await firstProduct.click();

    // 4. Wait for product page to load (add to cart button)
    await driver.wait(until.elementLocated(By.id('add-to-cart-button')), 10000);
    const addToCartBtn = await driver.findElement(By.id('add-to-cart-button'));

    await driver.wait(until.elementIsVisible(addToCartBtn), 5000);
    await addToCartBtn.click();

    // 5. Wait for cart confirmation to appear (different types exist)
    await driver.wait(
      until.elementLocated(
        By.css('#nav-cart-count, #huc-v2-order-row-confirm-text, .a-box-inner .a-text-bold')
      ),
      10000
    );

    // 6. Navigate to cart
    const cartIcon = await driver.findElement(By.css('#nav-cart'));
    await cartIcon.click();

    // 7. Wait for cart page
    await driver.wait(until.urlContains('/gp/cart/view.html'), 10000);
    await driver.wait(until.elementLocated(By.css('.sc-list-body')), 8000);

    return { status: 'passed' };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
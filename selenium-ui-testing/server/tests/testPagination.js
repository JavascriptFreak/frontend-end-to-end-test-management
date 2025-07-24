const { By, until } = require('selenium-webdriver');

module.exports = async function testPagination(driver, url) {
  await driver.get(url);

  try {
    // Wait for product results
    await driver.wait(until.elementLocated(By.css('.s-main-slot .s-result-item')), 10000);
    const oldResults = await driver.findElements(By.css('.s-main-slot .s-result-item'));

    // Try finding standard 'Next' button (Amazon)
    let nextButtons = await driver.findElements(By.css('a.s-pagination-next:not([aria-disabled="true"])'));

    // Fallback: arrows like › or >
    if (nextButtons.length === 0) {
      nextButtons = await driver.findElements(
        By.xpath("//a[contains(text(), '›') or contains(text(), '>')]")
      );
    }

    if (nextButtons.length === 0) {
      return {
        status: 'skipped',
        message: 'Pagination not present. Skipping test.',
      };
    }

    // Scroll & click the next button
    await driver.executeScript('arguments[0].scrollIntoView(true);', nextButtons[0]);
    await driver.sleep(1000); // Wait a bit before click
    await nextButtons[0].click();

    // Wait for page change by checking number of results
    await driver.wait(async () => {
      const newResults = await driver.findElements(By.css('.s-main-slot .s-result-item'));
      return newResults.length !== oldResults.length;
    }, 10000);

    return { status: 'passed' };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};

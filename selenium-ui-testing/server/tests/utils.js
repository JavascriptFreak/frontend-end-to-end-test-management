async function findFirstExistingSelector(driver, selectors) {
  for (const selector of selectors) {
    try {
      await driver.findElement({ css: selector });
      return selector;
    } catch (err) {
      // Ignore and continue
    }
  }
  throw new Error('None of the selectors exist: ' + selectors.join(', '));
}

async function elementExists(driver, selector) {
  try {
    await driver.findElement({ css: selector });
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  findFirstExistingSelector,
  elementExists
};

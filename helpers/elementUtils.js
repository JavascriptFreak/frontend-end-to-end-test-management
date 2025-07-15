const { By, until } = require('selenium-webdriver');

let driver;

function setDriver(d) {
  driver = d;
}

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

module.exports = {
  setDriver,
  elementExists,
  findFirstExistingSelector,
  waitForElement
};

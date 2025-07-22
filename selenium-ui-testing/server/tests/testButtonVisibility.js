const { By } = require('selenium-webdriver');
module.exports = async function testButtonVisibility(driver,url) {
  await driver.get(url);
  try {
    const btns = await driver.findElements({ css: 'button, input[type="button"]' });
    console.log(`🔘 Found ${btns.length} buttons`);
  } catch {
    console.log('ℹ️ No buttons found');
  }
};
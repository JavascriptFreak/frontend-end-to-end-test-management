const fetch = require('node-fetch');
const { By } = require('selenium-webdriver');

module.exports = async function testBrokenLinks(driver, url) {
  await driver.get(url);
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
};

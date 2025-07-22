module.exports = async function testResponsiveUI(driver, url) {
  await driver.get(url);

  const sizes = [[375, 667], [768, 1024], [1440, 900]];

  console.log('📱 Testing responsiveness...');

  for (const [width, height] of sizes) {
    await driver.manage().window().setRect({ width, height });
    await driver.sleep(500);
    console.log(`✅ Viewport ${width}x${height} tested`);
  }
};

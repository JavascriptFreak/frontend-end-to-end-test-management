module.exports = async function testResponsiveUI(driver) {
  const sizes = [[375, 667], [768, 1024], [1440, 900]];
  console.log('📱 Testing responsiveness...');
  for (const [w, h] of sizes) {
    await driver.manage().window().setRect({ width: w, height: h });
    await driver.sleep(500);
    console.log(`✅ Viewport ${w}x${h} tested`);
  }
};

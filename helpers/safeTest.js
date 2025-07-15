async function safeTest(testFunc, name) {
  try {
    await testFunc();
  } catch (e) {
    console.error(`❌ Error in ${name}:`, e.message);
  }
}

module.exports = safeTest;

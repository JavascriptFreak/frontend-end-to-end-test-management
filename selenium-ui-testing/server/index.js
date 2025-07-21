const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const runTests = require('./runTests'); // Move your visual comparison logic to this file
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/visual', express.static(path.join(__dirname, 'visual')));

const upload = multer({ dest: 'uploads/' });

// Endpoint to run test
app.post('/compare', upload.single('design'), async (req, res) => {
  const url = req.body.url;
  const designImagePath = req.file.path;

  try {
    const result = await runTests(url, designImagePath);
    res.json(result);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Comparison failed' });
  } finally {
    fs.unlinkSync(designImagePath); // Clean up uploaded file
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

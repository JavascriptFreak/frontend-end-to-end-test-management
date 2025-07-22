const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const runTests = require('./runTests');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Log all incoming requests to help debugging
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
});

app.use('/visual', express.static(path.join(__dirname, 'visual')));

// Simple test route to confirm server is reachable
app.get('/test', (req, res) => {
  res.json({ message: 'Server reachable' });
});

const upload = multer({ dest: 'uploads/' });

app.post('/compare', upload.single('design'), async (req, res) => {
  const url = req.body.url;
  const designImagePath = req.file?.path;

  if (!url || !designImagePath) {
    return res.status(400).json({ error: 'Please provide URL and design image file.' });
  }

  try {
    const results = await runTests(url, designImagePath);
    res.json(results);
  } catch (err) {
    console.error('Error running tests:', err);
    res.status(500).json({ error: 'Comparison failed' });
  } finally {
    // Delete uploaded design image file after processing
    if (designImagePath) {
      try {
        await fs.unlink(designImagePath);
      } catch (e) {
        console.warn('Failed to delete uploaded file:', e.message);
      }
    }
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});

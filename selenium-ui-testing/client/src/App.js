import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const bgImage =
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80';

function App() {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRunTests = async () => {
    setError('');
    setResults(null);

    if (!url || !file) {
      setError('Please provide both a URL and a design image.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('url', url);
    formData.append('design', file);

    try {
      const response = await fetch('http://localhost:3001/compare', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error(Error);

      const data = await response.json();
      setResults(data); // Now an array of device-specific results
    }  catch (err) {
      console.error('Error caught in handleRunTests:', err);
      setError('Failed to run comparison. Please check the server and try again. ' + (err.message || ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 8,
        px: 3,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: 4,
          boxShadow: 4,
          p: 5,
        }}
      >
        <Typography variant="h4" align="center" fontWeight={700} mb={2} color="#003366">
          Visual Regression Tester
        </Typography>

        <Typography variant="subtitle1" align="center" color="text.secondary" mb={4}>
          Upload your design and test your site visually on all screen sizes
        </Typography>

        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
          />

          <Button variant="outlined" component="label" startIcon={<UploadFileIcon />}>
            Upload Design Image
            <input type="file" hidden onChange={handleFileChange} />
          </Button>

          {file && (
            <Typography variant="body2" color="text.secondary">
              Selected: {file.name}
            </Typography>
          )}

          {error && <Alert severity="error">{error}</Alert>}

          <Button
            variant="contained"
            color="primary"
            onClick={handleRunTests}
            disabled={loading}
            sx={{ fontWeight: 'bold' }}
          >
            {loading ? 'Testing...' : 'Run Tests'}
          </Button>
        </Box>

        {loading && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}

        {results && (
          <Box mt={6}>
            <Typography variant="h6" mb={2}>
              Test Results (by device):
            </Typography>

            {results.map((res, i) => (
              <Box key={i} mb={6}>
                <Alert
                  icon={
                    res.mismatchPercentage < 1 ? (
                      <CheckCircleOutlineIcon />
                    ) : (
                      <ErrorOutlineIcon />
                    )
                  }
                  severity={res.mismatchPercentage < 1 ? 'success' : 'warning'}
                  sx={{ mb: 2 }}
                >
                  <strong>{res.device.toUpperCase()}</strong> – Visual Mismatch:{' '}
                  <strong>{parseFloat(res.mismatchPercentage).toFixed(2)}%</strong>
                </Alert>
                <Box mb={2}>
                  <Typography variant="subtitle1" gutterBottom>Functional Test Results:</Typography>
                  <ul>
                    {res.functionalResults.map((test, index) => (
                      <li key={index} style={{ color: test.status === 'passed' ? 'green' : 'red' }}>
                        {test.test}: {test.status} {test.message && `– ${test.message}`}
                      </li>
                    ))}
                  </ul>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Current Screenshot ({res.device})
                    </Typography>
                    <img
                      src={res.currentScreenshot}
                      alt={`${res.device} Screenshot`}
                      style={{ width: '100%', borderRadius: 8 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Diff Image ({res.device})
                    </Typography>
                    <img
                      src={res.diffImage}
                      alt={`${res.device} Diff`}
                      style={{ width: '100%', borderRadius: 8 }}
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        )}
        <Box mt={4} textAlign="center">
          <Button
            variant="outlined"
            color="success"
            href="http://localhost:3001/visual/reports/result.html"
            target="_blank"
            download
          >
            Download Full Report
          </Button>
        </Box>

        <Box textAlign="center" mt={6} fontSize={14} color="text.secondary">
          © {new Date().getFullYear()} | Built for Final Year Projects
        </Box>
      </Container>
    </Box>
  );
}

export default App;

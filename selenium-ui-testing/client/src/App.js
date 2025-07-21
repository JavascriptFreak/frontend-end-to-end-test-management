import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Paper,
  Alert,
  Grid,
  Link,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const bgImage = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80';

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
    if (!url.trim()) {
      setError('Please enter a valid URL.');
      return;
    }
    if (!file) {
      setError('Please upload a screenshot or design file.');
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      const formData = new FormData();
      formData.append('url', url);
      formData.append('designImage', file);

      const response = await fetch('http://localhost:3001/run-tests', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Server error: ' + response.statusText);
      }

      const data = await response.json();

      // Debug log to check what backend sends
      console.log('Test results:', data);

      setResults({
        mismatchPercentage:
          typeof data.mismatchPercentage === 'number'
            ? data.mismatchPercentage.toFixed(2)
            : 'N/A',
        visualDiffImage: data.diffImage,
        currentScreenshot: data.currentScreenshot,
      });
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
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
        backgroundRepeat: 'no-repeat',
        py: 10,
        px: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 4,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          p: 5,
          maxWidth: 800,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            letterSpacing: 1.2,
            color: '#003366',
            mb: 1,
          }}
        >
          Visual & Functional Frontend Tester
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          sx={{ mb: 4, fontStyle: 'italic' }}
        >
          Enter your website URL and upload your design files. Get comprehensive UI & functionality test reports instantly.
        </Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}
          onSubmit={(e) => {
            e.preventDefault();
            handleRunTests();
          }}
        >
          <TextField
            label="Website URL"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
            placeholder="https://www.example.com"
            size="medium"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
            sx={{
              alignSelf: 'flex-start',
              borderRadius: 2,
              borderColor: '#003366',
              color: '#003366',
              fontWeight: 600,
              px: 3,
              textTransform: 'none',
              transition: 'background-color 0.3s ease, color 0.3s ease',
              '&:hover': {
                backgroundColor: '#003366',
                color: '#fff',
              },
            }}
          >
            Upload Screenshot or Figma File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {file && (
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ mt: 1, fontWeight: 500 }}
            >
              Selected file: {file.name}
            </Typography>
          )}

          {error && (
            <Alert severity="error" variant="outlined" sx={{ mt: 1 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            size="large"
            sx={{
              backgroundColor: '#003366',
              borderRadius: 3,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: 'uppercase',
              py: 1.8,
              boxShadow: '0 6px 18px rgba(0, 51, 102, 0.5)',
              '&:hover': {
                backgroundColor: '#0059b3',
                boxShadow: '0 8px 22px rgba(0, 89, 179, 0.7)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {loading ? 'Running Tests...' : 'Run Tests'}
          </Button>
        </Box>

        {loading && (
          <Box display="flex" justifyContent="center" my={4} aria-label="Loading tests">
            <CircularProgress size={50} thickness={5} />
          </Box>
        )}

        {results && (
          <Paper
            elevation={8}
            sx={{ p: 4, borderRadius: 3, mt: 4, backgroundColor: '#f9fafd' }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 700, color: '#003366' }}
            >
              Test Results Summary
            </Typography>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Mismatch Percentage:</strong> {results.mismatchPercentage}%
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Visual Difference Preview:
                </Typography>
                <Box
                  component="img"
                  src={`http://localhost:3001${results.visualDiffImage}`}
                  alt="Visual Difference"
                  sx={{
                    width: '100%',
                    borderRadius: 4,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Current Screenshot:
                </Typography>
                <Box
                  component="img"
                  src={`http://localhost:3001${results.currentScreenshot}`}
                  alt="Current Screenshot"
                  sx={{
                    width: '100%',
                    borderRadius: 4,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        )}

        <Box
          component="footer"
          textAlign="center"
          color="text.secondary"
          fontSize={14}
          mt={6}
          sx={{ userSelect: 'none' }}
        >
          © {new Date().getFullYear()} Visual & Functional Testing Platform —{' '}
          <Link
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="inherit"
          >
            GitHub Repo
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default App;

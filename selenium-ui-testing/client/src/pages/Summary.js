import React, { useContext } from 'react';
import { TestResultsContext } from '../context/TestResultsContext';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Utility to format mismatch numbers
const formatMismatch = (val) => {
  const num = Number(val);
  return !isNaN(num) ? num.toFixed(2) : 'N/A';
};

export default function Summary() {
  const { url, setUrl, file, setFile, loading, error, results, runTests } =
    useContext(TestResultsContext);

  const canRun = url.trim() !== '' || file;

  return (
    <Box
      sx={{
        fontFamily: "'Inter', sans-serif",
        minHeight: '100vh',
        background: `linear-gradient(
          135deg,
          #0d0d0d 0%,
          #274060 25%,
          #3b6aa0 60%,
          #5082c6 90%
        )`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        pt: 10,
        pb: 10,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: '100%',
            maxWidth: 1000,
            p: 6,
            borderRadius: 4,
            boxShadow:
              '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 0 40px rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {/* Left side: Input form */}
          <Box sx={{ flex: '1 1 350px', minWidth: 320 }}>
            <Typography
              variant="h3"
              fontFamily="'Playfair Display', serif"
              fontWeight={700}
              color="primary.dark"
              gutterBottom
              sx={{ letterSpacing: '0.06em' }}
            >
              Visual Regression Testing
            </Typography>

            <Stack spacing={3} mb={5}>
              <TextField
                label="Website URL"
                variant="outlined"
                size="medium"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                fullWidth
                sx={{
                  '& label': { fontWeight: 600, color: '#334e68' },
                  '& input': { fontWeight: 500, fontSize: 16, color: '#243b53' },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    backgroundColor: '#f8fafc',
                    '& fieldset': {
                      borderColor: '#cbd5e1',
                    },
                    '&:hover fieldset': {
                      borderColor: '#1e40af',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1e40af',
                      borderWidth: 2,
                    },
                  },
                }}
              />

              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadFileIcon />}
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  borderColor: '#1e40af',
                  color: '#1e40af',
                  fontWeight: 600,
                  fontSize: 16,
                  letterSpacing: '0.04em',
                  borderRadius: 3,
                  px: 3,
                  py: 1.5,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(30, 64, 175, 0.1)',
                    borderColor: '#1e3c72',
                    color: '#1e3c72',
                  },
                }}
              >
                Upload Design File
                <input
                  type="file"
                  hidden
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".png,.jpg,.jpeg,.svg,.pdf"
                />
              </Button>

              {file && (
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  mt={-1}
                  color="#64748b"
                  sx={{ fontSize: 14, fontWeight: 500, userSelect: 'none' }}
                >
                  <InsertDriveFileIcon fontSize="small" />
                  <Typography noWrap>{file.name}</Typography>
                  <Typography variant="caption" color="text.disabled">
                    ({(file.size / 1024).toFixed(2)} KB)
                  </Typography>
                </Box>
              )}
            </Stack>

            {error && (
              <Typography
                color="#dc2626"
                fontWeight={600}
                sx={{ mb: 2, userSelect: 'none' }}
              >
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              size="large"
              disabled={!canRun || loading}
              onClick={runTests}
              sx={{
                width: '100%',
                fontWeight: 700,
                py: 1.8,
                fontSize: 18,
                letterSpacing: '0.05em',
                background:
                  'linear-gradient(90deg, #1e40af 0%, #2563eb 100%)',
                boxShadow:
                  '0 6px 20px rgba(37, 99, 235, 0.6)',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background:
                    'linear-gradient(90deg, #2563eb 0%, #1e3c72 100%)',
                  boxShadow:
                    '0 8px 30px rgba(37, 99, 235, 0.8)',
                },
                '&:disabled': {
                  backgroundColor: '#93c5fd',
                  boxShadow: 'none',
                  color: '#e0e7ff',
                },
              }}
            >
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{ color: 'white', mr: 1.5 }}
                  thickness={5}
                />
              )}
              {loading ? 'Running Tests...' : 'Run Tests'}
            </Button>
          </Box>

          {/* Right side: Test Results Summary */}
          <Box
            sx={{
              flex: '1 1 420px',
              minWidth: 350,
              bgcolor: '#f1f5f9',
              borderRadius: 4,
              p: 4,
              boxShadow: 'inset 0 0 15px #cbd5e1',
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              maxHeight: 520,
              overflowY: 'auto',
              userSelect: 'none',
            }}
          >
            <Typography
              variant="h5"
              fontFamily="'Playfair Display', serif"
              fontWeight={700}
              mb={2}
              color="#1e3c72"
              sx={{ borderBottom: '2px solid #dbeafe', pb: 1, letterSpacing: '0.04em' }}
            >
              Test Summary
            </Typography>

            {!results?.length && !loading && (
              <Typography
                color="#64748b"
                sx={{ mt: 4, textAlign: 'center', fontWeight: 500, fontStyle: 'italic' }}
              >
                No results yet. Run a test to see results here.
              </Typography>
            )}

            {results?.map((res, i) => {
              const mismatch = Number(res.mismatchPercentage);
              const isSuccess = !isNaN(mismatch) && mismatch < 1;

              return (
                <Box
                  key={i}
                  sx={{
                    p: 2.5,
                    bgcolor: 'white',
                    borderRadius: 3,
                    boxShadow: '0 3px 14px rgb(0 0 0 / 0.05)',
                    borderLeft: `6px solid ${isSuccess ? '#2563eb' : '#ef4444'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    cursor: 'default',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      boxShadow: '0 10px 30px rgb(0 0 0 / 0.12)',
                    },
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="#1e3c72"
                      noWrap
                      sx={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {res.device.toUpperCase()}
                    </Typography>
                    {isSuccess ? (
                      <Tooltip title="Tests Passed">
                        <CheckCircleOutlineIcon
                          sx={{ color: '#2563eb', fontSize: 28 }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Tests Failed">
                        <ErrorOutlineIcon sx={{ color: '#ef4444', fontSize: 28 }} />
                      </Tooltip>
                    )}
                  </Stack>

                  <Typography
                    variant="body2"
                    color="#475569"
                    fontWeight={600}
                    sx={{ letterSpacing: '0.02em' }}
                  >
                    Mismatch Percentage
                  </Typography>

                  <Tooltip title={`${formatMismatch(res.mismatchPercentage)} mismatch`}>
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: 14,
                        borderRadius: 8,
                        backgroundColor: '#e2e8f0',
                        overflow: 'hidden',
                        boxShadow: 'inset 0 1px 2px rgb(255 255 255 / 0.7)',
                      }}
                    >
                      <Box
                        sx={{
                          width: `${isNaN(mismatch) ? 0 : mismatch}%`,
                          height: '100%',
                          backgroundColor: isSuccess ? '#2563eb' : '#ef4444',
                          borderRadius: 8,
                          transition: 'width 0.7s ease-in-out',
                        }}
                      />
                    </Box>
                  </Tooltip>

                  <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    sx={{
                      color: isSuccess ? '#2563eb' : '#ef4444',
                      userSelect: 'none',
                      mt: 0.5,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {formatMismatch(res.mismatchPercentage)}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

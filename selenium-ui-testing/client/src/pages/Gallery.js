import React, { useContext } from 'react';
import { TestResultsContext } from '../context/TestResultsContext';
import { Box, Typography, Grid, Paper, Stack } from '@mui/material';

export default function Gallery() {
  const { results } = useContext(TestResultsContext);

  return (
    <Box p={4}>
      <Typography variant="h4" mb={4} fontWeight={700} color="primary.main">
        Screenshot Gallery
      </Typography>

      {results && results.length > 0 ? (
        <Grid container spacing={4}>
          {results.map((res, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: '#fafafa',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <Typography
                  variant="h6"
                  mb={2}
                  fontWeight={700}
                  color="text.primary"
                  textAlign="center"
                >
                  {res.device.toUpperCase()}
                </Typography>

                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" mb={1} color="text.secondary" fontWeight={600}>
                      Current Screenshot
                    </Typography>
                    <img
                      src={res.currentScreenshot}
                      alt={`${res.device} current screenshot`}
                      style={{
                        width: '100%',
                        borderRadius: 8,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" mb={1} color="text.secondary" fontWeight={600}>
                      Diff Image
                    </Typography>
                    <img
                      src={res.diffImage}
                      alt={`${res.device} diff screenshot`}
                      style={{
                        width: '100%',
                        borderRadius: 8,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          mt={6}
          fontStyle="italic"
        >
          No screenshots to display. Run a test first.
        </Typography>
      )}
    </Box>
  );
}

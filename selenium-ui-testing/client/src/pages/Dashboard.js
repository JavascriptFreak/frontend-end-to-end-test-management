import React, { useContext } from 'react';
import { TestResultsContext } from '../context/TestResultsContext';
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  useTheme,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

export default function Dashboard() {
  const theme = useTheme();
  const { results } = useContext(TestResultsContext);

  // Calculate summary stats
  const summary = { passed: 0, failed: 0, skipped: 0 };
  results?.forEach((res) => {
    res.functionalResults.forEach((test) => {
      if (test.status === 'passed') summary.passed++;
      else if (test.status === 'failed') summary.failed++;
      else if (test.status === 'skipped') summary.skipped++;
    });
  });

  // User-friendly report text
  const createReportText = () => {
    if (!results || results.length === 0) {
      return 'No test results available.';
    }
    let report = `Test Summary Report\n\nTotal tests run: ${
      summary.passed + summary.failed + summary.skipped
    }\nPassed: ${summary.passed}\nFailed: ${summary.failed}\nSkipped: ${
      summary.skipped
    }\n\nDetailed results per device:\n`;

    results.forEach((res) => {
      report += `\nDevice: ${res.device.toUpperCase()}\n`;
      res.functionalResults.forEach((test) => {
        report += ` - ${test.test}: ${
          test.status === 'passed'
            ? '✅ Passed'
            : test.status === 'skipped'
            ? '⚠️ Skipped'
            : '❌ Failed'
        }\n`;
      });
    });
    return report;
  };

  // Download report as .txt file
  const downloadReport = () => {
    const text = createReportText();
    const blob = new Blob([text], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.download = 'test-report.txt';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  // Helper for colored chips
  const StatusChip = ({ label, color, count }) => (
    <Chip
      label={`${label}: ${count}`}
      color={color}
      sx={{
        fontWeight: 700,
        fontSize: '1.1rem',
        py: 1,
        px: 3,
        borderRadius: 2,
        boxShadow: theme.shadows[3],
        minWidth: 120,
      }}
    />
  );

  return (
    <Box p={{ xs: 2, md: 4 }} maxWidth="900px" mx="auto">
      <Typography
        variant="h3"
        fontWeight={900}
        mb={5}
        color="primary.main"
        textAlign="center"
        sx={{ letterSpacing: 2 }}
      >
        Test Dashboard
      </Typography>

      {results && results.length > 0 ? (
        <>
          {/* Summary Section */}
          <Paper
            sx={{
              p: 4,
              mb: 6,
              borderRadius: 4,
              bgcolor: '#f9fafe',
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              flexWrap: 'wrap',
              boxShadow: theme.shadows[4],
            }}
          >
            <StatusChip label="Passed" color="success" count={summary.passed} />
            <StatusChip label="Failed" color="error" count={summary.failed} />
            <StatusChip label="Skipped" color="warning" count={summary.skipped} />
          </Paper>

          {/* User-Friendly Report Section */}
          <Paper
            sx={{
              p: 3,
              mb: 6,
              borderRadius: 3,
              bgcolor: '#f4f6f8',
              boxShadow: theme.shadows[2],
              whiteSpace: 'pre-wrap',
              fontFamily: 'Source Code Pro, monospace',
              maxHeight: 320,
              overflowY: 'auto',
              fontSize: '0.95rem',
              lineHeight: 1.5,
            }}
            elevation={2}
          >
            <Typography variant="h5" mb={2} fontWeight={700} color="text.primary">
              Detailed User-Friendly Report
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {createReportText()}
            </Typography>
          </Paper>

          {/* Download Button */}
          <Box textAlign="center" mb={8}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<DownloadIcon />}
              onClick={downloadReport}
              sx={{
                fontWeight: 700,
                letterSpacing: 1,
                px: 5,
                py: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                  transform: 'scale(1.05)',
                },
              }}
            >
              Download Report
            </Button>
          </Box>
        </>
      ) : (
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          mt={10}
          fontStyle="italic"
        >
          No results to show yet. Run a test to see the dashboard.
        </Typography>
      )}
    </Box>
  );
}

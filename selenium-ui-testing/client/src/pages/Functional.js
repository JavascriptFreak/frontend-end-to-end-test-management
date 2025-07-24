import React, { useContext } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { TestResultsContext } from '../context/TestResultsContext';

export default function Functional() {
  const { results } = useContext(TestResultsContext);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'passed':
        return <CheckCircleIcon sx={{ color: 'success.main' }} />;
      case 'skipped':
        return <HourglassEmptyIcon sx={{ color: 'warning.main' }} />;
      case 'failed':
      default:
        return <ErrorIcon sx={{ color: 'error.main' }} />;
    }
  };

  const getFriendlyStatus = (status) => {
    switch (status) {
      case 'passed':
        return '✅ This test passed successfully';
      case 'skipped':
        return '⚠️ This test was skipped';
      case 'failed':
      default:
        return '❌ This test did not pass';
    }
  };

  const getReadableTestName = (testName) => {
    switch (testName) {
      case 'login':
        return 'Login functionality was tested';
      case 'signup':
        return 'User registration process was tested';
      case 'checkout':
        return 'Checkout workflow was verified';
      case 'search':
        return 'Search feature functionality was tested';
      // Add more mappings as needed
      default:
        return `Test "${testName}" was executed`;
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3} fontWeight={700} color="primary.main">
        Functional Test Results
      </Typography>

      {results && results.length > 0 ? (
        <Stack spacing={4}>
          {results.map((res, idx) => (
            <Paper
              key={idx}
              elevation={3}
              sx={{ p: 3, borderRadius: 3, bgcolor: '#fafafa' }}
            >
              <Typography variant="h6" fontWeight={700} mb={2} color="text.primary">
                {res.device.toUpperCase()} Test Summary
              </Typography>

              <List dense>
                {res.functionalResults.map((test, i) => (
                  <ListItem key={i}>
                    <ListItemIcon>{getStatusIcon(test.status)}</ListItemIcon>
                    <ListItemText
                      primary={getReadableTestName(test.test)}
                      secondary={getFriendlyStatus(test.status)}
                      primaryTypographyProps={{ fontWeight: 600 }}
                      secondaryTypographyProps={{ fontSize: '0.9rem' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          ))}
        </Stack>
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', mt: 6 }}
        >
          No results to show yet. Please run a test to see detailed results here.
        </Typography>
      )}
    </Box>
  );
}

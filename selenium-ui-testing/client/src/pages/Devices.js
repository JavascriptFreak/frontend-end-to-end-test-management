import React, { useContext } from 'react';
import { TestResultsContext } from '../context/TestResultsContext';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Avatar,
} from '@mui/material';
import DevicesIcon from '@mui/icons-material/Devices';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function Devices() {
  const { results } = useContext(TestResultsContext);

  if (!results || results.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h5" color="textSecondary">
          No results available. Run a test first.
        </Typography>
      </Box>
    );
  }

  const getMismatchSeverity = (value) => {
    if (value < 1) return { label: 'Low', color: 'success' };
    if (value < 10) return { label: 'Moderate', color: 'warning' };
    return { label: 'High', color: 'error' };
  };

  const chartData = results.map((res) => {
    const mismatch = Number(res.mismatchPercentage);
    return {
      device: res.device.toUpperCase(),
      mismatch: isNaN(mismatch) ? 0 : mismatch,
    };
  });

  return (
    <Box p={4}>
      <Typography variant="h4" mb={4} fontWeight={700} color="primary.main">
        Device Comparison
      </Typography>

      <Grid container spacing={3} mb={6}>
        {results.map((res, i) => {
          const mismatch = Number(res.mismatchPercentage);
          const isValid = !isNaN(mismatch);
          const severity = getMismatchSeverity(mismatch);

          return (
            <Grid item xs={12} md={6} key={i}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  bgcolor: '#f9f9f9',
                  borderLeft: `6px solid`,
                  borderColor: `${severity.color}.main`,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 6,
                  },
                }}
              >
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <DevicesIcon />
                </Avatar>
                <Box flexGrow={1}>
                  <Typography variant="h6" fontWeight={600}>
                    {res.device.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mismatch: {isValid ? `${mismatch.toFixed(2)}%` : 'N/A'}
                  </Typography>
                </Box>
                {isValid && (
                  <Chip
                    label={`${severity.label} mismatch`}
                    color={severity.color}
                    size="small"
                  />
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Typography variant="h5" mb={2} fontWeight={700} color="primary.main">
        Mismatch Percentage Chart
      </Typography>

      <Paper sx={{ p: 3, height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="device" />
            <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} allowDecimals={false} />
            <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
            <Bar dataKey="mismatch" fill="#1976d2" radius={[5, 5, 0, 0]} maxBarSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

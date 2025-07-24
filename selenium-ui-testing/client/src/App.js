import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Devices from './pages/Devices';
import Functional from './pages/Functional';
import Gallery from './pages/Gallery';
import Dashboard from './pages/Dashboard';
import Summary from './pages/Summary';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Summary/>} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/functional" element={<Functional />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

// import React, { useState } from 'react';
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   CircularProgress,
//   Alert,
//   Grid,
//   AppBar,
//   Toolbar,
//   CssBaseline,
//   Paper,
// } from '@mui/material';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import DevicesIcon from '@mui/icons-material/Devices';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from 'recharts';

// const bgImage =
//   'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80';

// function App() {
//   const [url, setUrl] = useState('');
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState('');

//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   const handleRunTests = async () => {
//     setError('');
//     setResults(null);

//     if (!url || !file) {
//       setError('Please provide both a URL and a design image.');
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append('url', url);
//     formData.append('design', file);

//     try {
//       const response = await fetch('http://localhost:3001/compare', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) throw new Error('Server error');

//       const data = await response.json();
//       setResults(data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to run comparison. Please check the server and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <CssBaseline />
//       <AppBar position="sticky" sx={{ backgroundColor: '#0d47a1' }}>
//         <Toolbar>
//           <DevicesIcon sx={{ mr: 1 }} />
//           <Typography variant="h6" fontWeight={600}>
//             Functionalist Device Comparison
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Box
//         sx={{
//           minHeight: '100vh',
//           backgroundImage: `url(${bgImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           py: 6,
//           px: 2,
//           display: 'flex',
//           justifyContent: 'center',
//         }}
//       >
//         <Container maxWidth="lg">
//           <Paper
//             elevation={6}
//             sx={{
//               p: 5,
//               borderRadius: 4,
//               backgroundColor: 'rgba(255,255,255,0.95)',
//             }}
//           >
//             <Typography variant="h4" align="center" fontWeight={700} mb={2} color="#003366">
//               Visual Regression Dashboard
//             </Typography>

//             <Typography variant="subtitle1" align="center" color="text.secondary" mb={4}>
//               Upload your design and test your website visually across devices
//             </Typography>

//             <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} mb={4}>
//               <TextField
//                 label="Website URL"
//                 value={url}
//                 onChange={(e) => setUrl(e.target.value)}
//                 fullWidth
//               />
//               <Button
//                 variant="outlined"
//                 component="label"
//                 startIcon={<UploadFileIcon />}
//                 sx={{ whiteSpace: 'nowrap' }}
//               >
//                 Upload Design
//                 <input type="file" hidden onChange={handleFileChange} />
//               </Button>
//             </Box>

//             {file && (
//               <Typography variant="body2" color="text.secondary" mb={2}>
//                 Selected: {file.name}
//               </Typography>
//             )}

//             {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleRunTests}
//               disabled={loading}
//               sx={{ fontWeight: 'bold', mb: 4 }}
//               fullWidth
//             >
//               {loading ? 'Testing...' : 'Run Visual Comparison'}
//             </Button>

//             {loading && (
//               <Box display="flex" justifyContent="center" mt={4}>
//                 <CircularProgress />
//               </Box>
//             )}

//             {results && (
//               <>
//                 <Box mt={4}>
//                   <Typography variant="h6" mb={2}>
//                     Visual Mismatch Overview
//                   </Typography>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={results}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="device" />
//                       <YAxis unit="%" />
//                       <Tooltip />
//                       <Bar dataKey="mismatchPercentage" fill="#1976d2" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </Box>

//                 <Box mt={6}>
//                   <Typography variant="h5" fontWeight={600} mb={3}>
//                     Device-wise Test Details
//                   </Typography>
//                   <Grid container spacing={4}>
//                     {results.map((res, i) => (
//                       <Grid item xs={12} md={6} key={i}>
//                         <Box
//                           sx={{
//                             borderRadius: 4,
//                             p: 3,
//                             boxShadow: 3,
//                             backgroundColor: '#f9f9f9',
//                             borderLeft: `6px solid ${res.mismatchPercentage < 1 ? '#4caf50' : '#ff9800'}`,
//                           }}
//                         >
//                           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                             <Typography variant="h6">{res.device.toUpperCase()}</Typography>
//                             <Box
//                               px={2}
//                               py={0.5}
//                               borderRadius={8}
//                               bgcolor={res.mismatchPercentage < 1 ? '#e8f5e9' : '#fff3e0'}
//                               color={res.mismatchPercentage < 1 ? 'green' : 'orange'}
//                               fontWeight="bold"
//                             >
//                               {res.mismatchPercentage < 1 ? 'PASS' : 'WARNING'}
//                             </Box>
//                           </Box>

//                           <Typography fontSize={14} mb={1}>
//                             <strong>Visual Mismatch:</strong> {parseFloat(res.mismatchPercentage).toFixed(2)}%
//                           </Typography>

//                           <Box mb={2}>
//                             <Box height={8} width="100%" bgcolor="#e0e0e0" borderRadius={4}>
//                               <Box
//                                 height="100%"
//                                 width={`${res.mismatchPercentage}%`}
//                                 bgcolor={res.mismatchPercentage < 1 ? '#4caf50' : '#ff9800'}
//                                 borderRadius={4}
//                               />
//                             </Box>
//                           </Box>

//                           <Typography fontSize={14} fontWeight={500} gutterBottom>
//                             Functional Tests:
//                           </Typography>
//                           <Box component="ul" sx={{ pl: 2, mb: 2 }}>
//                             {res.functionalResults.map((test, index) => (
//                               <li
//                                 key={index}
//                                 style={{
//                                   color:
//                                     test.status === 'passed'
//                                       ? 'green'
//                                       : test.status === 'skipped'
//                                       ? 'orange'
//                                       : 'red',
//                                 }}
//                               >
//                                 {test.test}: {test.status}
//                                 {test.message && ` – ${test.message}`}
//                               </li>
//                             ))}
//                           </Box>

//                           <Grid container spacing={2}>
//                             <Grid item xs={6}>
//                               <Typography variant="caption" gutterBottom>
//                                 Current Screenshot
//                               </Typography>
//                               <img
//                                 src={res.currentScreenshot}
//                                 alt="Current"
//                                 style={{ width: '100%', borderRadius: 8 }}
//                               />
//                             </Grid>
//                             <Grid item xs={6}>
//                               <Typography variant="caption" gutterBottom>
//                                 Diff Image
//                               </Typography>
//                               <img
//                                 src={res.diffImage}
//                                 alt="Diff"
//                                 style={{ width: '100%', borderRadius: 8 }}
//                               />
//                             </Grid>
//                           </Grid>
//                         </Box>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </Box>
//               </>
//             )}

//             <Box mt={4} textAlign="center">
//               <Button
//                 variant="outlined"
//                 color="success"
//                 href="http://localhost:3001/visual/reports/result.html"
//                 target="_blank"
//               >
//                 Download Full Report
//               </Button>
//             </Box>

//             <Box textAlign="center" mt={6} fontSize={14} color="text.secondary">
//               © {new Date().getFullYear()} | Visual QA Platform for Web Projects
//             </Box>
//           </Paper>
//         </Container>
//       </Box>
//     </>
//   );
// }

// export default App;
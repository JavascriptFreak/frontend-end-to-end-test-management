import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="sticky" 
    sx={{
      background: 'linear-gradient(90deg, #0d0d0d 0%, #1a1a1a 100%)',
    }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
      End to End Test Management
        </Typography>
        <Button color="inherit" component={NavLink} to="/">
          Summary
        </Button>
        <Button color="inherit" component={NavLink} to="/devices">
          Devices
        </Button>
        <Button color="inherit" component={NavLink} to="/functional">
          Functional
        </Button>
        <Button color="inherit" component={NavLink} to="/gallery">
          Gallery
        </Button>
        <Button color="inherit" component={NavLink} to="/dashboard">
          Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
}
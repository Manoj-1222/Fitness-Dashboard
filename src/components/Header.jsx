import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme, Box } from '@mui/material';

export default function Header({ darkMode, onToggleTheme }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <AppBar position="sticky" sx={{
      background: 'linear-gradient(90deg, rgba(124, 214, 206, 0.95) 60%, rgba(80, 20, 115, 0.92) 100%)',
      boxShadow: '0 4px 24px 0 rgba(76, 147, 175, 0.12)',
      backdropFilter: 'blur(10px)',
      borderBottom: '2px solid #4CAF50',
      borderRadius: '10px',
    }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src="/logo.png" alt="logo" style={{ width: 40, height: 40, marginRight: '15px' }} />
          <Typography variant="h5" fontWeight="bold" sx={{ letterSpacing: 1, color: isDark ? '#fff' : '#222' }}>
            Fitness Tracker Dashboard
          </Typography>
        </Box>
        <IconButton color="inherit" onClick={onToggleTheme}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
} 
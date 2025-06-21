import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', color: 'text.secondary', position: { md: 'sticky', xs: 'static' }, bottom: 0, width: '100%', background: 'inherit', zIndex: 10 }}>
      <Typography variant="body2" sx={{ color: isDark ? '#fff' : 'text.secondary' }}>
        &copy; {new Date().getFullYear()} Fitness Tracker Dashboard
      </Typography>
    </Box>
  );
} 
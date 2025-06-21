import React from 'react';
import { Card, CardContent, Typography, Box, useTheme, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';

export default function StatsCard({ title, value, unit, icon, color }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: `0 0 16px ${color}` }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', minWidth: 0 }}
    >
      <Card elevation={3} sx={{ borderLeft: `4px solid ${color}`, minHeight: 120, width: '100%', minWidth: 0, background: isDark ? '#23233a' : '#fff' }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
            {icon}
            <Box minWidth={0}>
              <Typography variant="h6" fontWeight="bold" noWrap sx={{ color: isDark ? '#fff' : '#222' }}>{title}</Typography>
              <Typography variant="h4" sx={{ fontSize: { xs: 20, md: 32 }, color: isDark ? '#fff' : '#222' }}>
                {value} <span style={{ fontSize: 16, color: isDark ? '#fff' : '#222' }}>{unit}</span>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
} 
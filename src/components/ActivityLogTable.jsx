import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, useTheme, Button, Divider } from '@mui/material';

export default function ActivityLogTable({ logs }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [showAll, setShowAll] = useState(false);
  const rowsToShow = showAll ? logs.length : 7;

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      <Typography variant="h6" fontWeight="bold" mb={1} sx={{ color: isDark ? '#fff' : '#222' }}>Activity Logs</Typography>
      <TableContainer component={Paper} sx={{ width: '100%', background: isDark ? '#23233a' : '#fff' }}>
        <Table stickyHeader size="small" aria-label="activity log table" sx={{ minWidth: 480 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: isDark ? '#fff' : '#222', background: isDark ? '#23233a' : '#fff' }}>Date</TableCell>
              <TableCell sx={{ color: isDark ? '#fff' : '#222', background: isDark ? '#23233a' : '#fff' }}>Type</TableCell>
              <TableCell sx={{ color: isDark ? '#fff' : '#222', background: isDark ? '#23233a' : '#fff' }}>Duration</TableCell>
              <TableCell sx={{ color: isDark ? '#fff' : '#222', background: isDark ? '#23233a' : '#fff' }}>Calories</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.slice(0, rowsToShow).map((row, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ color: isDark ? '#fff' : '#222', background: isDark ? '#23233a' : '#fff' }}>{row.date}</TableCell>
                <TableCell sx={{ color: isDark ? '#fff' : '#222', background: isDark ? '#23233a' : '#fff' }}>{row.type}</TableCell>
                <TableCell sx={{ color: isDark ? '#fff' : '#222', background: isDark ? '#23233a' : '#fff' }}>{row.duration}</TableCell>
                <TableCell sx={{ color: isDark ? '#fff' : '#222', background: isDark ? '#23233a' : '#fff' }}>{row.calories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {logs.length > 7 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="center">
            <Button variant="outlined" color="primary" onClick={() => setShowAll(v => !v)}>
              {showAll ? 'Show Less' : 'Show More'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
} 
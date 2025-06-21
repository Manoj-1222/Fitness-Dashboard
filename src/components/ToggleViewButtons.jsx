import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useTheme } from '@mui/material';

export default function ToggleViewButtons({ view, onChange }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={(e, val) => val && onChange(val)}
      sx={{ 
        mb: 2,
        '& .MuiToggleButton-root': {
          color: isDark ? '#fff' : '#222',
          borderColor: isDark ? '#fff' : '#222',
          '&.Mui-selected': {
            backgroundColor: isDark ? '#4CAF50' : '#4CAF50',
            color: isDark ? '#fff' : '#fff',
            '&:hover': {
              backgroundColor: isDark ? '#45a049' : '#45a049',
            }
          },
          '&:hover': {
            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          }
        }
      }}
      color="primary"
    >
      <ToggleButton value="daily">Daily</ToggleButton>
      <ToggleButton value="weekly">Weekly</ToggleButton>
      <ToggleButton value="monthly">Monthly</ToggleButton>
    </ToggleButtonGroup>
  );
} 
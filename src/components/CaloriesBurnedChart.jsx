import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography, useTheme } from '@mui/material';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function CaloriesBurnedChart({ data }) {
  const chartRef = useRef();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Calories Burned',
        data,
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: c } = chart;
          const gradient = c.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, '#FF7043');
          gradient.addColorStop(1, 'rgba(255, 112, 67, 0.1)');
          return gradient;
        },
        borderColor: '#FF7043',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#FFC107',
        pointHoverRadius: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 4,
        shadowBlur: 10,
        shadowColor: '#FF7043',
      },
    ],
  };

  const fontColor = isDark ? '#fff' : '#222';

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => `Calories: ${tooltipItem.raw}`,
        },
        titleColor: fontColor,
        bodyColor: fontColor,
        backgroundColor: isDark ? '#222' : '#fff',
      },
    },
    scales: {
      x: {
        grid: { color: '#e0e0e0', borderDash: [4, 4] },
        ticks: { color: fontColor },
      },
      y: {
        grid: { color: '#e0e0e0', borderDash: [4, 4] },
        min: 400,
        max: 3200,
        ticks: {
          stepSize: 100,
          color: fontColor,
          callback: function(value) {
            return value;
          }
        }
      },
    },
    animation: {
      duration: 1200,
      easing: 'easeOutQuart',
    },
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" mb={2} color={isDark ? '#fff' : 'inherit'}>
        Calories Burned (Weekly)
      </Typography>
      <Line ref={chartRef} data={chartData} options={options} height={200} />
    </Box>
  );
} 
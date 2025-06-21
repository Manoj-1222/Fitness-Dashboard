import React, { useRef, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

export default function ActivityChart({ data, view }) {
  const chartRef = useRef();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const labels = view === 'daily'
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : view === 'weekly'
    ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    : ['Jan', 'Feb', 'Mar', 'Apr'];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Steps',
        data,
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: c } = chart;
          const gradient = c.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, '#4CAF50');
          gradient.addColorStop(1, '#F1F1F1');
          return gradient;
        },
        borderColor: '#4CAF50',
        borderWidth: 3,
        borderRadius: 12,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#FFC107',
        pointHoverRadius: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 4,
        shadowBlur: 10,
        shadowColor: '#4CAF50',
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
          label: (tooltipItem) => `Steps: ${tooltipItem.raw}`,
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
        beginAtZero: true,
        ticks: { color: fontColor },
      },
    },
    animation: {
      duration: 1200,
      easing: 'easeOutQuart',
    },
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
      {view === 'daily' ? (
        <Line ref={chartRef} data={chartData} options={options} height={200} />
      ) : (
        <Bar ref={chartRef} data={chartData} options={options} height={200} />
      )}
    </motion.div>
  );
} 
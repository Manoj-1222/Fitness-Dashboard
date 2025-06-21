import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

Chart.register(ArcElement, Tooltip, Legend);

export default function WorkoutTypePieChart({ data }) {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          '#4CAF50', '#FFC107', '#42A5F5', '#FF7043', '#66BB6A', '#1E1E2F'
        ],
        borderWidth: 2,
        borderColor: '#fff',
        hoverOffset: 16,
        shadowColor: '#4CAF50',
        shadowBlur: 10,
      },
    ],
  };
  const options = {
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { enabled: true },
    },
    animation: {
      animateRotate: true,
      duration: 1200,
      easing: 'easeOutQuart',
    },
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
      <Pie data={chartData} options={options} height={220} />
    </motion.div>
  );
} 
import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container, Grid, Box } from '@mui/material';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import ToggleViewButtons from './components/ToggleViewButtons';
import ActivityChart from './components/ActivityChart';
import WorkoutTypePieChart from './components/WorkoutTypePieChart';
import GoalsPanel from './components/GoalsPanel';
import ActivityLogTable from './components/ActivityLogTable';
import CaloriesBurnedChart from './components/CaloriesBurnedChart';
import Footer from './components/Footer';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import themeBase from './theme';
import dummyData from './data/dummyData.json';

function getInitialLogs() {
  const logs = localStorage.getItem('activityLogs');
  return logs ? JSON.parse(logs) : dummyData.dailyLogs;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState('daily');
  const [logs] = useState(getInitialLogs());

  useEffect(() => {
    localStorage.setItem('activityLogs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const theme = useMemo(() => ({
    ...themeBase,
    palette: {
      ...themeBase.palette,
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#1E1E2F' : '#F1F1F1',
        paper: darkMode ? '#23233a' : '#fff',
      },
    },
  }), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
        <Header darkMode={darkMode} onToggleTheme={() => setDarkMode(m => !m)} />

        <Grid container spacing={2} alignItems="stretch" sx={{ mt: 2 }}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={3}><StatsCard title="Steps Today" value={dummyData.stats.steps} unit="steps" icon={<DirectionsWalkIcon sx={{ fontSize: { xs: 28, md: 40 } }} />} color="#42A5F5" /></Grid>
              <Grid item xs={3}><StatsCard title="Calories Burned" value={dummyData.stats.calories} unit="Kcal" icon={<FitnessCenterIcon sx={{ fontSize: { xs: 28, md: 40 } }} />} color="#FF7043" /></Grid>
              <Grid item xs={3}><StatsCard title="Heart Rate" value={dummyData.stats.heartRate} unit="bpm" icon={<FavoriteIcon sx={{ fontSize: { xs: 28, md: 40 } }} />} color="#FFC107" /></Grid>
              <Grid item xs={3}><StatsCard title="Active Minutes" value={dummyData.stats.activeMinutes} unit="min" icon={<AccessTimeIcon sx={{ fontSize: { xs: 28, md: 40 } }} />} color="#4CAF50" /></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <ActivityLogTable logs={logs} />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="flex-start" sx={{ mt: 2 }}>
          <Grid item xs={12} md={3}>
            <GoalsPanel goals={dummyData.goals} stats={dummyData.stats} />
          </Grid>
          <Grid item xs={12} md={5}>
            <WorkoutTypePieChart data={dummyData.workoutTypes} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <ToggleViewButtons view={view} onChange={setView} />
              <ActivityChart data={dummyData.chartData[view]} view={view} />
              <CaloriesBurnedChart data={dummyData.caloriesBurned.weekly} />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </ThemeProvider>
  );
} 
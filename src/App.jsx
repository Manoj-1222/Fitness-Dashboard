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
  const [activityLogs] = useState(getInitialLogs());

  useEffect(() => {
    localStorage.setItem('activityLogs', JSON.stringify(activityLogs));
  }, [activityLogs]);

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
      <Container
  maxWidth="xl"
  sx={{
    mt: { xs: 1, sm: 2 },
    mb: { xs: 1, sm: 2 },
    px: { xs: 1, sm: 2 }, // More padding on mobile
  }}
>
  <Grid container direction="column" spacing={2}>
    {/* Header */}
    <Grid item>
      <Header darkMode={darkMode} onToggleTheme={() => setDarkMode(m => !m)} />
    </Grid>

    {/* Top Section: Stats + Activity Log */}
    <Grid item>
      <Grid
        container
        spacing={2}
        direction="row"
        wrap="wrap"
        alignItems="stretch"
      >
        {/* Stats Cards */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {[
              {
                title: "Steps Today",
                value: dummyData.stats.steps,
                unit: "steps",
                icon: <DirectionsWalkIcon />,
                color: "#42A5F5",
              },
              {
                title: "Calories Burned",
                value: dummyData.stats.calories,
                unit: "Kcal",
                icon: <FitnessCenterIcon />,
                color: "#FF7043",
              },
              {
                title: "Heart Rate",
                value: dummyData.stats.heartRate,
                unit: "bpm",
                icon: <FavoriteIcon />,
                color: "#FFC107",
              },
              {
                title: "Active Minutes",
                value: dummyData.stats.activeMinutes,
                unit: "min",
                icon: <AccessTimeIcon />,
                color: "#4CAF50",
              },
            ].map((card, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <StatsCard {...card} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Activity Log */}
        <Grid item xs={12} md={4}>
          <ActivityLogTable logs={activityLogs} />
        </Grid>
      </Grid>
    </Grid>

    {/* Bottom Grid Section */}
    <Grid item>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        wrap="wrap"
      >
        {/* Goals Panel */}
        <Grid item xs={12} sm={6} md={4} sx={{ width: "100%" }}>
          <GoalsPanel goals={dummyData.goals} stats={dummyData.stats} />
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} sm={6} md={4} sx={{ width: "100%" }}>
          <WorkoutTypePieChart data={dummyData.workoutTypes} />
        </Grid>

        {/* Toggle View & Activity Chart */}
        <Grid item xs={12} md={6} sx={{ width: "100%" }}>
          <Box sx={{ mb: 2 }}>
            <ToggleViewButtons view={view} onChange={setView} />
          </Box>
          <ActivityChart data={dummyData.chartData[view]} view={view} />
        </Grid>

        {/* Calories Burned Chart */}
        <Grid item xs={12} md={6} sx={{ width: "100%" }}>
          <CaloriesBurnedChart data={dummyData.caloriesBurned.weekly} />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
</Container>

      <Footer />
    </ThemeProvider>
  );
}
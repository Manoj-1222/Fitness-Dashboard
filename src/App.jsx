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
      <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
        <Grid container direction="column" spacing={2}>
          {/* Header */}
          <Grid item>
            <Header darkMode={darkMode} onToggleTheme={() => setDarkMode(m => !m)} />
          </Grid>

          {/* Top Section: Stats + Activity Log + Calories Chart */}
          <Grid item>
            <Grid container spacing={2} alignItems="flex-start">
              {/* Stats Cards */}
              <Grid item xs={12} md={8}>
                <Grid container spacing={2} alignItems="flex-start">
                  <Grid item xs={12} sm={6} md={3}>
                    <StatsCard title="Steps Today" value={dummyData.stats.steps} unit="steps" icon={<DirectionsWalkIcon />} color="#42A5F5" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <StatsCard title="Calories Burned" value={dummyData.stats.calories} unit="Kcal" icon={<FitnessCenterIcon />} color="#FF7043" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <StatsCard title="Heart Rate" value={dummyData.stats.heartRate} unit="bpm" icon={<FavoriteIcon />} color="#FFC107" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <StatsCard title="Active Minutes" value={dummyData.stats.activeMinutes} unit="min" icon={<AccessTimeIcon />} color="#4CAF50" />
                  </Grid>
                </Grid>
              </Grid>

              {/* Activity Log and Calories Burned (Right side stack) */}
              <Grid item xs={12} md={4}>
                <Grid container direction="column" spacing={2} alignItems="stretch">
                  <Grid item>
                    <ActivityLogTable logs={activityLogs} />
                  </Grid>
                  
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Bottom Section with paddingBottom fix */}
          <Grid item>
            <Grid
              container
              spacing={2}
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                paddingBottom: '0px'  //  padding-bottom fix  here
              }}
            >
              {/* Goals */}
              <Grid item sx={{ width: 'fit-content' }}>
                <GoalsPanel goals={dummyData.goals} stats={dummyData.stats} />
              </Grid>

              {/* Pie Chart */}
              <Grid item sx={{ width: 'fit-content' }}>
                <WorkoutTypePieChart data={dummyData.workoutTypes} />
              </Grid>

              {/* Toggle and Activity Chart */}
              <Grid item sx={{ width: 'fit-content' }}>
                <Box sx={{ mb: 2 }}>
                  <ToggleViewButtons view={view} onChange={setView} />
                </Box>
                <Box>
                  <ActivityChart data={dummyData.chartData[view]} view={view} />
                </Box>
                
              </Grid>
              <Grid item>
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

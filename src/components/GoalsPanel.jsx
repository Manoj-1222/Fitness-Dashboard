import React, { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress, TextField, IconButton, Collapse, useTheme, Card, CardContent, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function getColor(progress) {
  if (progress > 0.75) return '#4CAF50';
  if (progress > 0.4) return '#FFC107';
  return '#FF7043';
}

export default function GoalsPanel({ goals, stats }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [editingGoal, setEditingGoal] = useState(null);
  const [currentGoals, setCurrentGoals] = useState(() => {
    const saved = localStorage.getItem('userGoals');
    return saved ? JSON.parse(saved) : goals;
  });

  useEffect(() => {
    localStorage.setItem('userGoals', JSON.stringify(currentGoals));
  }, [currentGoals]);

  const progressData = [
    {
      key: 'steps',
      label: 'Weekly Step Goal',
      value: stats.steps,
      goal: currentGoals.steps,
      unit: 'steps',
    },
    {
      key: 'calories',
      label: 'Calorie Burn Goal',
      value: stats.calories,
      goal: currentGoals.calories,
      unit: 'calories',
    },
    {
      key: 'workouts',
      label: 'Workout Frequency Goal',
      value: stats.activeMinutes || 0,
      goal: currentGoals.workouts * 60, // assuming 1 workout = 60 min
      unit: 'min',
    }
  ];

  const handleEdit = (goalKey) => {
    setEditingGoal(goalKey);
  };

  const handleSave = (goalKey, newValue) => {
    setCurrentGoals(prev => ({
      ...prev,
      [goalKey]: parseInt(newValue) || 0
    }));
    setEditingGoal(null);
  };

  const handleCancel = () => {
    setEditingGoal(null);
  };

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="h6" fontWeight="bold" mb={1} sx={{ color: isDark ? '#fff' : '#222' }}>Goals</Typography>
      {progressData.map((item) => {
        const progress = Math.min(item.value / item.goal, 1);
        const isEditing = editingGoal === item.key;
        return (
          <Card key={item.label} elevation={3} sx={{ background: isDark ? '#23233a' : '#fff', borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: isDark ? '#fff' : '#222' }}>{item.label}</Typography>
                <Box display="flex" gap={0.5}>
                  {!isEditing ? (
                    <IconButton size="small" onClick={() => handleEdit(item.key)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton size="small" onClick={() => handleSave(item.key, document.getElementById(`goal-${item.key}`).value)}>
                        <SaveIcon fontSize="small" color="primary" />
                      </IconButton>
                      <IconButton size="small" onClick={handleCancel}>
                        <CancelIcon fontSize="small" />
                      </IconButton>
                    </>
                  )}
                </Box>
              </Box>
              <Collapse in={isEditing}>
                <TextField
                  id={`goal-${item.key}`}
                  size="small"
                  defaultValue={item.key === 'workouts' ? Math.round(item.goal / 60) : item.goal}
                  type="number"
                  fullWidth
                  sx={{ mb: 1, color: isDark ? '#fff' : '#222', input: { color: isDark ? '#fff' : '#222' } }}
                  label={
                    item.key === 'workouts'
                      ? 'Workouts per week'
                      : item.key === 'steps'
                      ? 'Steps per day'
                      : 'Calories per day'
                  }
                  InputLabelProps={{ style: { color: isDark ? '#fff' : '#222' } }}
                />
              </Collapse>
              <LinearProgress
                variant="determinate"
                value={progress * 100}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  background: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    background: getColor(progress),
                    transition: 'all 0.8s',
                  },
                }}
              />
              <Typography variant="caption" sx={{ color: isDark ? '#fff' : '#222' }}>
                {Math.round(item.value)} / {item.goal} {item.unit}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
} 
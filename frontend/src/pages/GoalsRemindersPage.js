import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Select, MenuItem, FormControl,
  InputLabel, List, ListItem, ListItemText, ListItemIcon, IconButton,
  Paper, Chip, CircularProgress, LinearProgress, Switch, FormControlLabel,
  Checkbox, FormGroup, Tabs, Tab,
} from '@mui/material';
import {
  Flag, Alarm, Delete, Add, CheckCircle, Edit, EmojiEvents,
} from '@mui/icons-material';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const GoalsRemindersPage = () => {
  const [tab, setTab] = useState(0);
  const [goals, setGoals] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Goal dialog
  const [goalDialog, setGoalDialog] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '', description: '', targetDate: '', goalType: 'general',
    targetValue: '', unit: '',
  });

  // Reminder dialog
  const [reminderDialog, setReminderDialog] = useState(false);
  const [newReminder, setNewReminder] = useState({
    routineId: '', title: '', reminderTime: '08:00', reminderDays: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [goalsRes, remindersRes, routinesRes] = await Promise.all([
        fetch('http://localhost:5000/api/goals', { credentials: 'include' }),
        fetch('http://localhost:5000/api/reminders', { credentials: 'include' }),
        fetch('http://localhost:5000/api/routines', { credentials: 'include' }),
      ]);

      if (goalsRes.ok) setGoals(await goalsRes.json());
      if (remindersRes.ok) setReminders(await remindersRes.json());
      if (routinesRes.ok) {
        const data = await routinesRes.json();
        setRoutines(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Goal functions
  const handleCreateGoal = async () => {
    if (!newGoal.title) return;
    try {
      const res = await fetch('http://localhost:5000/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newGoal),
      });
      if (res.ok) {
        setGoalDialog(false);
        setNewGoal({ title: '', description: '', targetDate: '', goalType: 'general', targetValue: '', unit: '' });
        fetchData();
      }
    } catch (err) {
      console.error('Error creating goal:', err);
    }
  };

  const handleCompleteGoal = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/goals/${id}/complete`, {
        method: 'PUT',
        credentials: 'include',
      });
      fetchData();
    } catch (err) {
      console.error('Error completing goal:', err);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/goals/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setGoals(goals.filter(g => g.id !== id));
    } catch (err) {
      console.error('Error deleting goal:', err);
    }
  };

  // Reminder functions
  const handleCreateReminder = async () => {
    if (!newReminder.title || newReminder.reminderDays.length === 0) return;
    try {
      const res = await fetch('http://localhost:5000/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...newReminder,
          reminderDays: newReminder.reminderDays.join(','),
        }),
      });
      if (res.ok) {
        setReminderDialog(false);
        setNewReminder({ routineId: '', title: '', reminderTime: '08:00', reminderDays: [] });
        fetchData();
      }
    } catch (err) {
      console.error('Error creating reminder:', err);
    }
  };

  const handleToggleReminder = async (id, isActive) => {
    try {
      await fetch(`http://localhost:5000/api/reminders/${id}/toggle`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ isActive: !isActive }),
      });
      fetchData();
    } catch (err) {
      console.error('Error toggling reminder:', err);
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/reminders/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setReminders(reminders.filter(r => r.id !== id));
    } catch (err) {
      console.error('Error deleting reminder:', err);
    }
  };

  const handleDayToggle = (day) => {
    setNewReminder(prev => ({
      ...prev,
      reminderDays: prev.reminderDays.includes(day)
        ? prev.reminderDays.filter(d => d !== day)
        : [...prev.reminderDays, day],
    }));
  };

  const getProgress = (goal) => {
    if (!goal.target_value) return 0;
    return Math.min(100, (goal.current_value / goal.target_value) * 100);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No deadline';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, bgcolor: '#0f172a', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" color="white" sx={{ mb: 3 }}>
        Goals & Reminders
      </Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Fitness Goals" icon={<Flag />} iconPosition="start" sx={{ color: 'white' }} />
        <Tab label="Workout Reminders" icon={<Alarm />} iconPosition="start" sx={{ color: 'white' }} />
      </Tabs>

      {/* Goals Tab */}
      {tab === 0 && (
        <>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setGoalDialog(true)}
            sx={{ mb: 3, bgcolor: '#477CD8' }}
          >
            New Goal
          </Button>

          {goals.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#1e293b' }}>
              <EmojiEvents sx={{ fontSize: 60, color: '#64748b', mb: 2 }} />
              <Typography color="#94a3b8">No goals yet. Set your first fitness goal!</Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {goals.map((goal) => (
                <Grid item xs={12} md={6} key={goal.id}>
                  <Card sx={{ bgcolor: goal.status === 'completed' ? '#1e3a2f' : '#1e293b' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <Box>
                          <Typography variant="h6" color="white" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {goal.title}
                            {goal.status === 'completed' && <CheckCircle color="success" />}
                          </Typography>
                          <Typography color="#94a3b8" variant="body2">{goal.description}</Typography>
                        </Box>
                        <Box>
                          {goal.status !== 'completed' && (
                            <IconButton onClick={() => handleCompleteGoal(goal.id)} sx={{ color: '#22c55e' }}>
                              <CheckCircle />
                            </IconButton>
                          )}
                          <IconButton onClick={() => handleDeleteGoal(goal.id)} sx={{ color: '#ef4444' }}>
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>

                      {goal.target_value && (
                        <Box sx={{ mt: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography color="#94a3b8" variant="body2">Progress</Typography>
                            <Typography color="white" variant="body2">
                              {goal.current_value || 0} / {goal.target_value} {goal.unit}
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={getProgress(goal)} 
                            sx={{ height: 8, borderRadius: 4, bgcolor: '#334155' }}
                          />
                        </Box>
                      )}

                      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <Chip label={goal.goal_type} size="small" sx={{ bgcolor: '#334155', color: 'white' }} />
                        <Chip label={formatDate(goal.target_date)} size="small" sx={{ bgcolor: '#334155', color: 'white' }} />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {/* Reminders Tab */}
      {tab === 1 && (
        <>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setReminderDialog(true)}
            sx={{ mb: 3, bgcolor: '#477CD8' }}
          >
            New Reminder
          </Button>

          {reminders.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#1e293b' }}>
              <Alarm sx={{ fontSize: 60, color: '#64748b', mb: 2 }} />
              <Typography color="#94a3b8">No reminders yet. Set up workout reminders!</Typography>
            </Paper>
          ) : (
            <List>
              {reminders.map((reminder) => (
                <Paper key={reminder.id} sx={{ mb: 2, bgcolor: '#1e293b', opacity: reminder.is_active ? 1 : 0.6 }}>
                  <ListItem
                    secondaryAction={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Switch
                          checked={reminder.is_active}
                          onChange={() => handleToggleReminder(reminder.id, reminder.is_active)}
                          color="primary"
                        />
                        <IconButton onClick={() => handleDeleteReminder(reminder.id)} sx={{ color: '#ef4444' }}>
                          <Delete />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemIcon><Alarm sx={{ color: '#477CD8' }} /></ListItemIcon>
                    <ListItemText
                      primary={<Typography color="white">{reminder.title}</Typography>}
                      secondary={
                        <Box>
                          <Typography color="#94a3b8" variant="body2">
                            {reminder.reminder_time} • {reminder.reminder_days}
                          </Typography>
                          {reminder.routine_name && (
                            <Chip label={reminder.routine_name} size="small" sx={{ mt: 1, bgcolor: '#334155', color: 'white' }} />
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                </Paper>
              ))}
            </List>
          )}
        </>
      )}

      {/* Goal Dialog */}
      <Dialog open={goalDialog} onClose={() => setGoalDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Set New Fitness Goal</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth label="Goal Title" value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            sx={{ mt: 2 }} placeholder="e.g., Lose 10 pounds"
          />
          <TextField
            fullWidth label="Description (Optional)" value={newGoal.description}
            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
            sx={{ mt: 2 }} multiline rows={2}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Goal Type</InputLabel>
            <Select value={newGoal.goalType} label="Goal Type"
              onChange={(e) => setNewGoal({ ...newGoal, goalType: e.target.value })}>
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="weight">Weight Loss/Gain</MenuItem>
              <MenuItem value="strength">Strength</MenuItem>
              <MenuItem value="cardio">Cardio</MenuItem>
              <MenuItem value="flexibility">Flexibility</MenuItem>
              <MenuItem value="habit">Habit Building</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth label="Target Date" type="date" value={newGoal.targetDate}
            onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
            sx={{ mt: 2 }} InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
              label="Target Value" type="number" value={newGoal.targetValue}
              onChange={(e) => setNewGoal({ ...newGoal, targetValue: e.target.value })}
              sx={{ flex: 1 }}
            />
            <TextField
              label="Unit" value={newGoal.unit}
              onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
              sx={{ flex: 1 }} placeholder="lbs, reps, miles..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGoalDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateGoal} variant="contained" disabled={!newGoal.title}>
            Create Goal
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reminder Dialog */}
      <Dialog open={reminderDialog} onClose={() => setReminderDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Set Workout Reminder</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth label="Reminder Title" value={newReminder.title}
            onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
            sx={{ mt: 2 }} placeholder="e.g., Morning Workout"
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Link to Routine (Optional)</InputLabel>
            <Select value={newReminder.routineId} label="Link to Routine (Optional)"
              onChange={(e) => setNewReminder({ ...newReminder, routineId: e.target.value })}>
              <MenuItem value="">None</MenuItem>
              {routines.map((r) => (
                <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth label="Reminder Time" type="time" value={newReminder.reminderTime}
            onChange={(e) => setNewReminder({ ...newReminder, reminderTime: e.target.value })}
            sx={{ mt: 2 }} InputLabelProps={{ shrink: true }}
          />
          <Typography color="text.secondary" sx={{ mt: 2, mb: 1 }}>Repeat on:</Typography>
          <FormGroup row>
            {DAYS.map((day) => (
              <FormControlLabel
                key={day}
                control={
                  <Checkbox
                    checked={newReminder.reminderDays.includes(day)}
                    onChange={() => handleDayToggle(day)}
                  />
                }
                label={day.slice(0, 3)}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReminderDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateReminder} variant="contained" 
            disabled={!newReminder.title || newReminder.reminderDays.length === 0}>
            Create Reminder
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GoalsRemindersPage;

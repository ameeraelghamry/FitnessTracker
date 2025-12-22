import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Avatar,
  Snackbar,
  Alert
} from '@mui/material';
import { Person, Lock } from '@mui/icons-material';

const SettingsPage = () => {
  const [user, setUser] = useState({ username: '', email: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser({
      username: storedUser.username || '',
      email: storedUser.email || '',
    });
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem('user', JSON.stringify(user));
    setSnackbar({ open: true, message: 'Profile updated!', severity: 'success' });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAFB', p: 4 }}>
      <Typography variant="h4" sx={{ color: '#1F2937', fontWeight: 700, mb: 4 }}>
        Settings
      </Typography>

      {/* Profile Section */}
      <Card sx={{ borderRadius: 3, mb: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Person sx={{ color: '#667eea' }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937' }}>
              Profile
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: '#667eea',
                fontSize: '2rem',
                fontWeight: 600
              }}
            >
              {user.username?.[0]?.toUpperCase() || 'U'}
            </Avatar>
            <Box>
              <Typography sx={{ fontWeight: 600, color: '#1F2937' }}>
                {user.username || 'User'}
              </Typography>
              <Typography sx={{ color: '#6B7280', fontSize: '0.875rem' }}>
                {user.email || 'No email set'}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
            <TextField
              label="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              fullWidth
            />
            <TextField
              label="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleSaveProfile}
              sx={{
                bgcolor: '#667eea',
                '&:hover': { bgcolor: '#5568d3' },
                textTransform: 'none',
                fontWeight: 600,
                alignSelf: 'flex-start'
              }}
            >
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Security Section */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Lock sx={{ color: '#667eea' }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937' }}>
              Security
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
            <TextField
              label="Current Password"
              type="password"
              fullWidth
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
            />
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
            />
            <Button
              variant="outlined"
              sx={{
                borderColor: '#667eea',
                color: '#667eea',
                '&:hover': { borderColor: '#5568d3', bgcolor: '#EEF2FF' },
                textTransform: 'none',
                fontWeight: 600,
                alignSelf: 'flex-start'
              }}
            >
              Change Password
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPage;

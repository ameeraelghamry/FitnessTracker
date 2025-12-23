import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Paper,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Share,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Delete,
  Add,
} from '@mui/icons-material';

const SocialSharesPage = () => {
  const [shares, setShares] = useState([]);
  const [stats, setStats] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newShare, setNewShare] = useState({
    routineId: '',
    platform: '',
    shareType: 'routine',
    message: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sharesRes, statsRes, routinesRes] = await Promise.all([
        fetch('http://localhost:5000/api/social-shares', { credentials: 'include' }),
        fetch('http://localhost:5000/api/social-shares/stats', { credentials: 'include' }),
        fetch('http://localhost:5000/api/routines', { credentials: 'include' }),
      ]);

      if (sharesRes.ok) setShares(await sharesRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
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

  const handleShare = async () => {
    if (!newShare.platform) return;

    try {
      const res = await fetch('http://localhost:5000/api/social-shares', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newShare),
      });

      if (res.ok) {
        setDialogOpen(false);
        setNewShare({ routineId: '', platform: '', shareType: 'routine', message: '' });
        fetchData();
      }
    } catch (err) {
      console.error('Error creating share:', err);
    }
  };

  const deleteShare = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/social-shares/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setShares(shares.filter(s => s.id !== id));
    } catch (err) {
      console.error('Error deleting share:', err);
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'facebook': return <Facebook sx={{ color: '#1877f2' }} />;
      case 'twitter': return <Twitter sx={{ color: '#1da1f2' }} />;
      case 'instagram': return <Instagram sx={{ color: '#e4405f' }} />;
      case 'linkedin': return <LinkedIn sx={{ color: '#0077b5' }} />;
      default: return <Share color="primary" />;
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#0f172a', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="white">
          Social Shares
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setDialogOpen(true)}
          sx={{ bgcolor: '#477CD8' }}
        >
          New Share
        </Button>
      </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((platform) => {
            const stat = stats.find(s => s.platform?.toLowerCase() === platform.toLowerCase());
            return (
              <Grid item xs={6} md={3} key={platform}>
                <Card sx={{ bgcolor: '#1e293b', textAlign: 'center' }}>
                  <CardContent>
                    {getPlatformIcon(platform)}
                    <Typography variant="h4" color="white" sx={{ my: 1 }}>
                      {stat?.count || 0}
                    </Typography>
                    <Typography color="#94a3b8">{platform}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Share History */}
        <Typography variant="h6" color="white" sx={{ mb: 2 }}>
          Share History
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : shares.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#1e293b' }}>
            <Share sx={{ fontSize: 60, color: '#64748b', mb: 2 }} />
            <Typography color="#94a3b8">No shares yet. Start sharing your progress!</Typography>
          </Paper>
        ) : (
          <List>
            {shares.map((share) => (
              <Paper key={share.id} sx={{ mb: 2, bgcolor: '#1e293b' }}>
                <ListItem
                  secondaryAction={
                    <IconButton onClick={() => deleteShare(share.id)} sx={{ color: '#ef4444' }}>
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemIcon>{getPlatformIcon(share.platform)}</ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography color="white">
                          {share.routine_name || 'General Share'}
                        </Typography>
                        <Chip label={share.platform} size="small" sx={{ bgcolor: '#334155', color: 'white' }} />
                      </Box>
                    }
                    secondary={
                      <Box>
                        {share.message && (
                          <Typography color="#94a3b8" variant="body2">
                            "{share.message}"
                          </Typography>
                        )}
                        <Typography color="#64748b" variant="caption">
                          {formatDate(share.shared_at)}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        )}

        {/* New Share Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Share Your Progress</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Platform</InputLabel>
              <Select
                value={newShare.platform}
                label="Platform"
                onChange={(e) => setNewShare({ ...newShare, platform: e.target.value })}
              >
                <MenuItem value="Facebook">Facebook</MenuItem>
                <MenuItem value="Twitter">Twitter</MenuItem>
                <MenuItem value="Instagram">Instagram</MenuItem>
                <MenuItem value="LinkedIn">LinkedIn</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Routine (Optional)</InputLabel>
              <Select
                value={newShare.routineId}
                label="Routine (Optional)"
                onChange={(e) => setNewShare({ ...newShare, routineId: e.target.value })}
              >
                <MenuItem value="">None</MenuItem>
                {routines.map((r) => (
                  <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Message (Optional)"
              value={newShare.message}
              onChange={(e) => setNewShare({ ...newShare, message: e.target.value })}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleShare} variant="contained" disabled={!newShare.platform}>
              Share
            </Button>
          </DialogActions>
        </Dialog>
    </Box>
  );
};

export default SocialSharesPage;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  Chip,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Notifications,
  FitnessCenter,
  Share,
  CheckCircle,
  Delete,
  MarkEmailRead,
} from '@mui/icons-material';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/notifications', {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
        method: 'PUT',
        credentials: 'include',
      });
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, is_read: true } : n
      ));
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch('http://localhost:5000/api/notifications/read-all', {
        method: 'PUT',
        credentials: 'include',
      });
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'routine': return <FitnessCenter color="primary" />;
      case 'share': return <Share color="secondary" />;
      case 'achievement': return <CheckCircle color="success" />;
      default: return <Notifications color="info" />;
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#0f172a', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" color="white">
            Notifications
          </Typography>
          {notifications.some(n => !n.is_read) && (
            <Button
              variant="outlined"
              startIcon={<MarkEmailRead />}
              onClick={markAllAsRead}
              sx={{ color: '#477CD8', borderColor: '#477CD8' }}
            >
              Mark All as Read
            </Button>
          )}
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : notifications.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#1e293b' }}>
            <Notifications sx={{ fontSize: 60, color: '#64748b', mb: 2 }} />
            <Typography color="#94a3b8">No notifications yet</Typography>
          </Paper>
        ) : (
          <List>
            {notifications.map((notification) => (
              <Paper
                key={notification.id}
                sx={{
                  mb: 2,
                  bgcolor: notification.is_read ? '#1e293b' : '#1e3a5f',
                  borderLeft: notification.is_read ? 'none' : '4px solid #477CD8',
                }}
              >
                <ListItem
                  secondaryAction={
                    <Box>
                      {!notification.is_read && (
                        <IconButton onClick={() => markAsRead(notification.id)} sx={{ color: '#477CD8' }}>
                          <CheckCircle />
                        </IconButton>
                      )}
                      <IconButton onClick={() => deleteNotification(notification.id)} sx={{ color: '#ef4444' }}>
                        <Delete />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemIcon>{getIcon(notification.type)}</ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography color="white" fontWeight={notification.is_read ? 'normal' : 'bold'}>
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography color="#94a3b8" variant="body2">
                          {notification.message}
                        </Typography>
                        <Typography color="#64748b" variant="caption">
                          {formatDate(notification.created_at)}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        )}
    </Box>
  );
};

export default NotificationsPage;

import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Divider,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const API_BASE_URL = "http://localhost:5000/api/admin";

const allParts = ["Chest", "Back", "Legs", "Arms", "Shoulders"];

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [workoutStats, setWorkoutStats] = useState([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
    status: "Active",
    workoutStats: [],
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching users from:", `${API_BASE_URL}/users`);
      
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      
      console.log(`✅ Fetched ${data.length} users from database:`, data);
      setUsers(data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => setAddOpen(true);
  const handleCloseAdd = () => setAddOpen(false);

  const handleChange = (e) => setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Please fill in all required fields!");
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role || "User",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create user");
      }

      console.log("✅ User created successfully:", data);
      alert("User created successfully!");
      
      // Reset form
      setNewUser({ name: "", email: "", password: "", role: "User", status: "Active", workoutStats: [] });
      handleCloseAdd();
      
      // Refresh users list
      fetchUsers();
    } catch (err) {
      console.error("Error creating user:", err);
      alert(err.message || "Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      // Refresh users list
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Please try again.");
    }
  };

  const fetchUserWorkouts = async (userId) => {
    try {
      setLoadingWorkouts(true);
      const response = await fetch(`${API_BASE_URL}/users/${userId}/workouts`);
      if (!response.ok) {
        throw new Error("Failed to fetch workout stats");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error fetching workout stats:", err);
      return [];
    } finally {
      setLoadingWorkouts(false);
    }
  };

  const handleOpenProfile = async (user) => {
    setSelectedUser(user);
    setProfileOpen(true);
    // Fetch workout stats for this user
    const stats = await fetchUserWorkouts(user.id);
    setWorkoutStats(stats);
  };
  const handleCloseProfile = () => {
    setProfileOpen(false);
    setSelectedUser(null);
    setWorkoutStats([]);
  };

  const handleProfileChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      if (selectedUser.status) {
        const response = await fetch(`${API_BASE_URL}/users/${selectedUser.id}/status`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: selectedUser.status }),
        });
        if (!response.ok) {
          throw new Error("Failed to update user status");
        }
      }
      // Refresh users list
      fetchUsers();
      handleCloseProfile();
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user. Please try again.");
    }
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Email,Role,Status", ...users.map(u => `${u.name},${u.email},${u.role},${u.status}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Convert workout stats to chart data
  const getChartData = (stats) => {
    if (!stats || stats.length === 0) return [];
    return stats.map(day => {
      const obj = { date: day.date };
      allParts.forEach(part => {
        obj[part] = day.parts && day.parts.includes(part) ? 1 : 0;
      });
      return obj;
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={1}>
        Users Management
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Total Users: {users.length}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="contained" onClick={handleOpenAdd}>Add User</Button>
        <Button variant="outlined" onClick={handleExport}>Export Users</Button>
      </Stack>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography color="text.secondary">No users found</Typography>
              </TableCell>
            </TableRow>
          ) : (
            users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <Button variant="text" onClick={() => handleOpenProfile(u)}>{u.name}</Button>
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={u.role || "User"} 
                    color={u.role === "Admin" ? "primary" : "default"} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <Chip label={u.status || "Active"} color={u.status === "Active" ? "success" : "error"} size="small" />
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDeleteUser(u.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Add User Dialog */}
      <Dialog open={addOpen} onClose={handleCloseAdd}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Name" name="name" fullWidth value={newUser.name} onChange={handleChange} />
          <TextField margin="dense" label="Email" name="email" fullWidth value={newUser.email} onChange={handleChange} />
          <TextField margin="dense" label="Password" name="password" type="password" fullWidth value={newUser.password} onChange={handleChange} />
          <TextField margin="dense" label="Role" name="role" select fullWidth value={newUser.role} onChange={handleChange}>
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
          <TextField margin="dense" label="Status" name="status" select fullWidth value={newUser.status} onChange={handleChange}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Blocked">Blocked</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd}>Cancel</Button>
          <Button variant="contained" onClick={handleAddUser}>Add User</Button>
        </DialogActions>
      </Dialog>

      {/* User Profile & Workout Stats Dialog */}
      {selectedUser && (
        <Dialog open={profileOpen} onClose={handleCloseProfile} maxWidth="md" fullWidth>
          <DialogTitle>User Profile & Workout Stats</DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1" fontWeight={600}>Workout Statistics</Typography>
            <Divider sx={{ my: 1 }} />

            {loadingWorkouts ? (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
              </Box>
            ) : workoutStats.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getChartData(workoutStats)}>
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  {allParts.map(part => (
                    <Bar key={part} dataKey={part} stackId="a" fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Typography color="text.secondary" sx={{ py: 3, textAlign: "center" }}>
                No workout data available for this user.
              </Typography>
            )}

            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" fontWeight={600}>Manage Profile</Typography>
            <TextField
              margin="dense"
              label="Role"
              name="role"
              select
              fullWidth
              value={selectedUser.role}
              onChange={handleProfileChange}
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>
            <TextField
              margin="dense"
              label="Status"
              name="status"
              select
              fullWidth
              value={selectedUser.status}
              onChange={handleProfileChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Blocked">Blocked</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseProfile}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveProfile}>Save Changes</Button>
          </DialogActions>
        </Dialog>
      )}
    </Card>
  );
};

export default UsersPage;

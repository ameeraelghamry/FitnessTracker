import React, { useState } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const initialUsers = [
  {
    name: "John Doe",
    role: "User",
    status: "Active",
    email: "john@example.com",
    workoutStats: [
      { date: "2025-12-18", parts: ["Chest", "Back"] },
      { date: "2025-12-19", parts: ["Legs"] },
      { date: "2025-12-20", parts: ["Arms", "Shoulders"] },
    ],
  },
  {
    name: "Sarah Ahmed",
    role: "User",
    status: "Blocked",
    email: "sarah@example.com",
    workoutStats: [
      { date: "2025-12-19", parts: ["Legs"] },
      { date: "2025-12-20", parts: ["Chest"] },
    ],
  },
];

const allParts = ["Chest", "Back", "Legs", "Arms", "Shoulders"];

const UsersPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [addOpen, setAddOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
    status: "Active",
    workoutStats: [],
  });

  const handleOpenAdd = () => setAddOpen(true);
  const handleCloseAdd = () => setAddOpen(false);

  const handleChange = (e) => setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Please fill in all required fields!");
      return;
    }
    setUsers([...users, { ...newUser, workoutStats: [] }]);
    setNewUser({ name: "", email: "", password: "", role: "User", status: "Active", workoutStats: [] });
    handleCloseAdd();
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
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

  const handleOpenProfile = (user) => {
    setSelectedUser(user);
    setProfileOpen(true);
  };
  const handleCloseProfile = () => setProfileOpen(false);

  const handleProfileChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    const updatedUsers = users.map(u => (u.email === selectedUser.email ? selectedUser : u));
    setUsers(updatedUsers);
    handleCloseProfile();
  };

  // Convert workout stats to chart data
  const getChartData = (workoutStats) => {
    return workoutStats.map(day => {
      const obj = { date: day.date };
      allParts.forEach(part => {
        obj[part] = day.parts.includes(part) ? 1 : 0;
      });
      return obj;
    });
  };

  return (
    <Card sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>Users Management</Typography>

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
          {users.map((u, i) => (
            <TableRow key={i}>
              <TableCell>
                <Button variant="text" onClick={() => handleOpenProfile(u)}>{u.name}</Button>
              </TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell>
                <Chip label={u.status} color={u.status === "Active" ? "success" : "error"} size="small" />
              </TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => handleDeleteUser(i)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
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

            {selectedUser.workoutStats.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getChartData(selectedUser.workoutStats)}>
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
              <Typography>No workout data available.</Typography>
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

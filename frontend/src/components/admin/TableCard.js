import {
  Card,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Box,
} from "@mui/material";

const TableCard = ({ title, users = [] }) => {
  // Show first 10 users (increased from 5)
  const displayUsers = users.length > 0 ? users.slice(0, 10) : [];
  
  console.log(`TableCard: Received ${users.length} users, displaying ${displayUsers.length}`);

  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Typography fontWeight={600} mb={2}>
        {title} {users.length > 0 && `(${users.length} total)`}
      </Typography>

      {displayUsers.length === 0 ? (
        <Box sx={{ py: 2, textAlign: "center" }}>
          <Typography color="text.secondary" variant="body2">
            {users.length === 0 ? "No users found in database" : "No users to display"}
          </Typography>
          {users.length === 0 && (
            <Typography color="text.secondary" variant="caption" sx={{ mt: 1, display: "block" }}>
              Make sure your backend server is running and the database has users.
            </Typography>
          )}
        </Box>
      ) : (
        <>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {displayUsers.map((user) => (
                <TableRow key={user.id || user.email}>
                  <TableCell>{user.name || user.username || "N/A"}</TableCell>
                  <TableCell>{user.email || "N/A"}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.status || "Active"}
                      color={user.status === "Active" ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {users.length > 10 && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
              Showing first 10 of {users.length} users
            </Typography>
          )}
        </>
      )}
    </Card>
  );
};

export default TableCard;

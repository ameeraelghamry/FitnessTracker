import { Box } from "@mui/material";

const UserLayout = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
      }}
    >
      {children}
    </Box>
  );
};

export default UserLayout;

import { Box, Typography, Avatar } from "@mui/material";

const Topbar = () => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        p: 2,
        borderRadius: 3,
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        Dashboard
      </Typography>

      <Avatar sx={{ bgcolor: "#477CD8" }}>A</Avatar>
    </Box>
  );
};

export default Topbar;

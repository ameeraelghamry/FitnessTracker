import { Box } from "@mui/material";

const PageContainer = ({ sidebar, children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F3F4F6" }}>
      {sidebar}
      <Box sx={{ flexGrow: 1, p: 3 }}>{children}</Box>
    </Box>
  );
};

export default PageContainer;

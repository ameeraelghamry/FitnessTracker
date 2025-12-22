import { Card, Typography, Box } from "@mui/material";

const StatCard = ({ title, value }) => {
  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Typography color="text.secondary">{title}</Typography>
      <Typography variant="h5" fontWeight={700} mt={1}>
        {value}
      </Typography>
    </Card>
  );
};

export default StatCard;

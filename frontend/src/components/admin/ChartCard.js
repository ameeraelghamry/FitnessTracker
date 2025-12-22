import { Card, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartCard = ({ title, data = [] }) => {
  return (
    <Card sx={{ p: 3, borderRadius: 3, height: 300 }}>
      <Typography fontWeight={600} mb={2}>
        {title}
      </Typography>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" fill="#477CD8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Typography color="text.secondary" sx={{ mt: 4, textAlign: "center" }}>
          No data available
        </Typography>
      )}
    </Card>
  );
};

export default ChartCard;

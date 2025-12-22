import { Card, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 700 },
  { name: "Mar", value: 500 },
];

const ChartCard = ({ title }) => {
  return (
    <Card sx={{ p: 3, borderRadius: 3, height: 300 }}>
      <Typography fontWeight={600} mb={2}>
        {title}
      </Typography>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="value" fill="#477CD8" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ChartCard;

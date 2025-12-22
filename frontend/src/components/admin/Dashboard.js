import { Grid } from "@mui/material";
import Topbar from "./Topbar";
import StatCard from "./StatCard";
import ChartCard from "./ChartCard";
import TableCard from "./TableCard";

const Dashboard = () => {
  return (
    <>
      <Topbar />

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard title="Total Users" value="2,953" />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="Memberships" value="601" />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="Pending" value="34" />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="Revenue" value="$19,216" />
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard title="Types of Users" />
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard title="Website Traffic" />
        </Grid>

      </Grid>
    </>
  );
};

export default Dashboard;

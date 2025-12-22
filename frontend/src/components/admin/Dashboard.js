import { useState, useEffect } from "react";
import { Grid, CircularProgress, Box } from "@mui/material";
import Topbar from "./Topbar";
import StatCard from "./StatCard";
import ChartCard from "./ChartCard";
import TableCard from "./TableCard";

const API_BASE_URL = "http://localhost:5000/api/admin";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    memberships: 0,
    pending: 0,
  });
  const [userTypes, setUserTypes] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [statsRes, userTypesRes, userRolesRes, usersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/stats`).catch(() => ({ ok: false, json: () => Promise.resolve({}) })),
        fetch(`${API_BASE_URL}/stats/user-types`).catch(() => ({ ok: false, json: () => Promise.resolve(null) })),
        fetch(`${API_BASE_URL}/stats/user-roles`).catch(() => ({ ok: false, json: () => Promise.resolve([]) })),
        fetch(`${API_BASE_URL}/users`).catch(() => ({ ok: false, json: () => Promise.resolve([]) })),
      ]);

      const [statsData, userTypesData, userRolesData, usersData] = await Promise.all([
        statsRes.json(),
        userTypesRes.json(),
        userRolesRes.json(),
        usersRes.json(),
      ]);

      setStats({
        totalUsers: Number(statsData?.totalUsers) || 0,
        memberships: Number(statsData?.memberships) || 0,
        pending: Number(statsData?.pending) || 0,
      });
      setUserTypes(userTypesData);
      setUserRoles(Array.isArray(userRolesData) ? userRolesData : []);
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setStats({ totalUsers: 0, memberships: 0, pending: 0 });
      setUserTypes(null);
      setUserRoles([]);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Topbar />

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard title="Total Users" value={(stats.totalUsers ?? 0).toLocaleString()} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Memberships" value={(stats.memberships ?? 0).toLocaleString()} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Pending" value={(stats.pending ?? 0).toLocaleString()} />
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard 
            title="Users by Questionnaire Status" 
            data={userTypes ? [
              { name: "With Questionnaire", value: userTypes.withQuestionnaire },
              { name: "Without Questionnaire", value: userTypes.withoutQuestionnaire },
            ] : []}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard 
            title="Users by Role" 
            data={userRoles.map(item => ({ name: item.role, value: item.count }))}
          />
        </Grid>

        <Grid item xs={12}>
          <TableCard title="Recent Users" users={users} />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;

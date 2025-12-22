import React from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

// Components
import Sidebar from "./components/profilepage/SideBar";

// User Pages
import Home from "./pages/HomePage";
import ExerciseDetail from "./pages/ExerciseDetail";
import QuestionnairePage from "./pages/Questionnairepage";
import ProfilePage from "./pages/ProfilePage";
import RoutinesPage from "./pages/RoutinesPage";
import RoutineDetailPage from "./pages/RoutineDetailPage";
import EditRoutinePage from "./pages/EditRoutinePage";
import ExercisesPage from "./pages/ExercisesPage";
import SettingsPage from "./pages/SettingsPage";
import Workouts from "./pages/Workouts";
import BodyPartPage from "./pages/BodyPart";
import LoginSignup from "./pages/Login-Signup";

// Admin Pages & Layout
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import UsersPage from "./pages/admin/UsersPage";
import WorkoutsPage from "./pages/admin/WorkoutsPage";
import AdminSettingsPage from "./pages/admin/SettingsPage";

const App = () => {
  const location = useLocation();

  // Routes that should show the sidebar
  const sidebarRoutes = ["/routines", "/exercises", "/settings"];
  const showSidebar = sidebarRoutes.includes(location.pathname);

  // Routes that should be full-width (no sidebar)
  const fullWidthRoutes = location.pathname.startsWith("/routines/");

  // ProfilePage has its own layout
  const profileRoute = location.pathname === "/ProfilePage";

  // Public pages with their own layout
  const publicFullPages = ["/workouts"];
  const isPublicFullPage = publicFullPages.includes(location.pathname);

  // Admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="workouts" element={<WorkoutsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    );
  }

  return (
    <>
      {profileRoute ? (
        <Routes>
          <Route path="/ProfilePage" element={<ProfilePage />} />
        </Routes>
      ) : isPublicFullPage ? (
        <Routes>
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      ) : fullWidthRoutes ? (
        <Routes>
          <Route path="/routines/:id" element={<RoutineDetailPage />} />
          <Route path="/routines/:id/edit" element={<EditRoutinePage />} />
        </Routes>
      ) : showSidebar ? (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "250px",
              height: "100vh",
              bgcolor: "#111827",
              zIndex: 1000,
            }}
          >
            <Sidebar />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              ml: "250px",
              bgcolor: "#F9FAFB",
              minHeight: "100vh",
            }}
          >
            <Routes>
              <Route path="/routines" element={<RoutinesPage />} />
              <Route path="/exercises" element={<ExercisesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </Box>
        </Box>
      ) : (
        <Box width="400px" sx={{ width: { xl: "1488" } }} m="auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/Questionnairepage" element={<QuestionnairePage />} />
            <Route path="/bodypart/:bodyPartName" element={<BodyPartPage />} />
            <Route path="/Login-Signup" element={<LoginSignup />} />
          </Routes>
        </Box>
      )}
    </>
  );
};

export default App;

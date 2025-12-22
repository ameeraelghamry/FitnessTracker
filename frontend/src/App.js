import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

/* ========== LAYOUTS ========== */
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

/* ========== USER PAGES ========== */
import Home from "./pages/HomePage";
import ExerciseDetail from "./pages/ExerciseDetail";
import QuestionnairePage from "./pages/Questionnairepage";
import ProfilePage from "./pages/ProfilePage";
import RoutinesPage from "./pages/RoutinesPage";
import Workouts from "./pages/Workouts";
import BodyPartPage from "./pages/BodyPart";
import LoginSignup from "./pages/Login-Signup";

/* ========== ADMIN PAGES ========== */
import DashboardPage from "./pages/admin/DashboardPage";
import UsersPage from "./pages/admin/UsersPage";
import WorkoutsPage from "./pages/admin/WorkoutsPage";

import SettingsPage from "./pages/admin/SettingsPage";

const App = () => {
  return (
    <Routes>
      {/* ================= USER ROUTES ================= */}
      <Route
        path="/"
        element={
          <UserLayout>
            <Home />
          </UserLayout>
        }
      />

      <Route
        path="/exercise/:id"
        element={
          <UserLayout>
            <ExerciseDetail />
          </UserLayout>
        }
      />

      <Route
        path="/ProfilePage"
        element={
          <UserLayout>
            <ProfilePage />
          </UserLayout>
        }
      />

      <Route
        path="/RoutinesPage"
        element={
          <UserLayout>
            <RoutinesPage />
          </UserLayout>
        }
      />

      <Route
        path="/Questionnairepage"
        element={
          <UserLayout>
            <QuestionnairePage />
          </UserLayout>
        }
      />

      <Route
        path="/Workouts"
        element={
          <UserLayout>
            <Workouts />
          </UserLayout>
        }
      />

      <Route
        path="/bodypart/:bodyPartName"
        element={
          <UserLayout>
            <BodyPartPage />
          </UserLayout>
        }
      />

      <Route
        path="/Login-Signup"
        element={
          <UserLayout>
            <LoginSignup />
          </UserLayout>
        }
      />

      {/* ================= ADMIN ROUTES ================= */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="workouts" element={<WorkoutsPage />} />
       
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

export default App;

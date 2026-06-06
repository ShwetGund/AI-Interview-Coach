import { Routes, Route, Navigate } from "react-router-dom";
import InterviewSummaryPage from "../pages/InterviewSummaryPage";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import DashboardPage from "../pages/DashboardPage";
import InterviewPage from "../pages/InterviewPage";
import ResumePage from "../pages/ResumePage";



import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      

      <Route path="/summary" element={<InterviewSummaryPage />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/interview"
          element={<InterviewPage />}
        />

        <Route
          path="/resume"
          element={<ResumePage />}
        />

        <Route
          path="/summary"
          element={<InterviewSummaryPage />}
        />

      </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}
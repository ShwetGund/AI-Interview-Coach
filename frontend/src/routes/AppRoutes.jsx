import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import LandingPage from "../pages/LandingPage";
import DashboardPage from "../pages/DashboardPage";
import InterviewPage from "../pages/InterviewPage";
import ResumePage from "../pages/ResumePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/achievements" element={<PlaceholderPage title="Achievements" />} />
        <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
        <Route path="/help" element={<PlaceholderPage title="Help & Docs" />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="flex items-center justify-center h-full min-h-64">
      <div className="text-center">
        <p className="font-display font-bold text-2xl text-white mb-2">{title}</p>
        <p className="text-slate-500 font-body text-sm">This section is coming soon.</p>
      </div>
    </div>
  );
}

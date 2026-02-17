import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import FundraisingTracker from "../pages/FundraisingTracker";
import TeamManagement from "../pages/TeamManagement";
import Profile from "../pages/Profile";
import MilestoneTracking from "../pages/MilestoneTracking";
import ProductRoadmap from "../pages/ProductRoadmap";
import LegalCompliance from "../pages/LegalCompliance";
import MyClients from "../pages/MyClients";
import Schemes from "../pages/Schemes";
import Myprofile from "../pages/Myprofile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="fundraising" element={<FundraisingTracker />} />
        <Route path="team" element={<TeamManagement />} />
        <Route path="clients" element={<MyClients />} />
        <Route path="schemes" element={<Schemes />} />
        <Route path="milestones" element={<MilestoneTracking />} />
        <Route path="roadmap" element={<ProductRoadmap />} />
        <Route path="legal" element={<LegalCompliance />} />
        <Route path="profile/view" element={<Myprofile />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

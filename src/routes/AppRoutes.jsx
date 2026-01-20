import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import Dashboard from "../pages/Dashboard";
import Fundraising from "../pages/Fundraising";
import TeamManagement from "../pages/TeamManagement";
import MilestoneTracking from "../pages/MilestoneTracking";
import InvestorRelations from "../pages/InvestorRelation";
import ProductRoadmap from "../pages/ProductRoadmap";
import LegalCompliance from "../pages/LegalCompliance";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/fundraising" element={<Fundraising />} />
        <Route path="/team-management" element={<TeamManagement />} />
        <Route path="/milestone-tracking" element={<MilestoneTracking />} />
        <Route path="/investor-relations" element={<InvestorRelations />} />
        <Route path="/product-roadmap" element={<ProductRoadmap />} />
        <Route path="/legal-compliance" element={<LegalCompliance />} />
      </Route>
    </Routes>
  );
}

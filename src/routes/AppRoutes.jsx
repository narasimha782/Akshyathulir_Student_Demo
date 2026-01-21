import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Fundraising from "../pages/Fundraising";
import TeamManagement from "../pages/TeamManagement";
import MilestoneTracking from "../pages/MilestoneTracking";
import InvestorRelation from "../pages/InvestorRelation";
import ProductRoadmap from "../pages/ProductRoadmap";
import LegalCompliance from "../pages/LegalCompliance";
import Profile from "../pages/Profile";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/fundraising" element={<Fundraising />} />
      <Route path="/team-management" element={<TeamManagement />} />
      <Route path="/milestone-tracking" element={<MilestoneTracking />} />
      <Route path="/investor-relations" element={<InvestorRelation />} />
      <Route path="/product-roadmap" element={<ProductRoadmap />} />
      <Route path="/legal-compliance" element={<LegalCompliance />} />
      <Route path="/profile" element={<Profile />} />

    </Routes>
  );
}

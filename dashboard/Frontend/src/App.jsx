import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EmailProvider } from "./context/EmailContext";
import DashboardLayout from "./components/DashboardLayout";

import Dashboard          from "./pages/Dashboard";
import Profile            from "./pages/Profile";
import Schemes            from "./pages/Schemes";
import FundraisingTracker from "./pages/FundraisingTracker";
import TeamManagement     from "./pages/TeamManagement";
import MyClients          from "./pages/MyClients";
import MilestoneTracking  from "./pages/MilestoneTracking";
import ProductRoadmap     from "./pages/ProductRoadmap";
import LegalCompliance    from "./pages/LegalCompliance";
import Opportunities      from "./pages/Opportunities";
import Courses            from "./pages/Courses";

function App() {
  return (
    <EmailProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"               element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/profile"        element={<DashboardLayout><Profile /></DashboardLayout>} />
          <Route path="/schemes"        element={<DashboardLayout><Schemes /></DashboardLayout>} />
          <Route path="/fundraising"    element={<DashboardLayout><FundraisingTracker /></DashboardLayout>} />
          <Route path="/team"           element={<DashboardLayout><TeamManagement /></DashboardLayout>} />
          <Route path="/clients"        element={<DashboardLayout><MyClients /></DashboardLayout>} />
          <Route path="/milestones"     element={<DashboardLayout><MilestoneTracking /></DashboardLayout>} />
          <Route path="/roadmap"        element={<DashboardLayout><ProductRoadmap /></DashboardLayout>} />
          <Route path="/legal"          element={<DashboardLayout><LegalCompliance /></DashboardLayout>} />
          <Route path="/opportunities"  element={<DashboardLayout><Opportunities /></DashboardLayout>} />
          <Route path="/courses"        element={<DashboardLayout><Courses /></DashboardLayout>} />
          <Route path="*"              element={<DashboardLayout><h2>Page Not Found</h2></DashboardLayout>} />
        </Routes>
      </BrowserRouter>
    </EmailProvider>
  );
}

export default App;
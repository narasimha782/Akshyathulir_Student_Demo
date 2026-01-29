import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <Box
        sx={{
          ml: sidebarOpen ? "250px" : "60px",
          p: 3,
          width: "100%",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Header />
        <Box mt={2}>{children}</Box>
      </Box>
    </Box>
  );
}

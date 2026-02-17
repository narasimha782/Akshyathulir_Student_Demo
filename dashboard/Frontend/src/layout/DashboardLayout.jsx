import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={open} setOpen={setOpen} />

      <Box
        sx={{
          flexGrow: 1,
          ml: open ? "250px" : "64px",
          transition: "margin-left 0.25s ease",
        }}
      >
        <Header />
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

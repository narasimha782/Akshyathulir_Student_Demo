import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: "#1f4d3a",
        color: "white",
        p: 2,
        borderRadius: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">Startup Dashboard</Typography>

      <Box>
        {/* My Profile */}
        <IconButton
          color="inherit"
          onClick={() => navigate("/profile")}
        >
          <AccountCircleIcon />
        </IconButton>

        {/* Logout */}
        <IconButton
          color="inherit"
          onClick={() => navigate("/")}
        >
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

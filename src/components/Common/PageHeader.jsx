import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation } from "react-router-dom";
import { menuItems } from "../../config/menuConfig";

export default function PageHeader({ open, setOpen }) {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const current =
    menuItems.find((item) => item.path === location.pathname) || menuItems[0];

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        bgcolor: "#1b4332",
        color: "#ffffffff",
        top: 9,
        ml: open ? "248px" : "78px",
        width: `calc(100% - ${open ? "256px" : "86px"})`,
        borderRadius: 2,
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 56,
          px: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* ========= LEFT SIDE ========= */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton 
            onClick={() => setOpen(!open)} 
            sx={{ color: "#ffffffff" }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" fontWeight="bold">
            {current.text}
          </Typography>
        </Box>

        {/* ========= RIGHT SIDE ========= */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          
          {/* User Name Removed from here */}

          {/* 1. Profile Avatar */}
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar
              sx={{
                bgcolor: "#186344ff", 
                width: 34,
                height: 34,
              }}
            >
             
            </Avatar>
          </IconButton>

          {/* 2. Logout Icon (Right of Profile) */}
          <IconButton 
             size="small" 
             sx={{ color: "#ff4d4d" }} // Slightly brighter red for visibility on dark green
             aria-label="logout" 
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "../../config/menuConfig";

export default function PageHeader({ open, setOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);

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
        {/* ✅ LEFT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            sx={{ color: "#ffffffff" }}
            onClick={() => setOpen(!open)} // ✅ working toggle
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" fontWeight="bold">
            {current.text}
          </Typography>
        </Box>

        {/* ✅ RIGHT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* ✅ Profile Avatar */}
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar
              sx={{
                bgcolor: "#186344ff",
                width: 34,
                height: 34,
              }}
            >
              N
            </Avatar>
          </IconButton>

          {/* ✅ Profile Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                navigate("/profile"); // ✅ go Profile
              }}
            >
              <AccountCircleIcon sx={{ mr: 1 }} />
              Profile
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                navigate("/"); // ✅ logout action (change if needed)
              }}
              sx={{ color: "red" }}
            >
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>

          {/* ✅ Logout Icon Button */}
          <IconButton
            size="small"
            sx={{ color: "#ff4d4d" }}
            aria-label="logout"
            onClick={() => navigate("/")}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

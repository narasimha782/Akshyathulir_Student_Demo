import React, { useRef } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
/* Icons */
import DashboardIcon from "@mui/icons-material/Dashboard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";
import FlagIcon from "@mui/icons-material/Flag";
import HandshakeIcon from "@mui/icons-material/Handshake";
import MapIcon from "@mui/icons-material/Map";
import GavelIcon from "@mui/icons-material/Gavel";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// Configurable constants
const DRAWER_WIDTH_OPEN = 240;
const DRAWER_WIDTH_CLOSED = 70;
const icons = {
  Dashboard: <DashboardIcon />,
  Fundraising: <MonetizationOnIcon />,
  "Team Management": <PeopleIcon />,
  "Milestone Tracking": <FlagIcon />,
  "Investor Relations": <HandshakeIcon />,
  "Product Roadmap": <MapIcon />,
  "Profile": <AccountCircleIcon />,
  "Legal Compliance": <GavelIcon />,
};
// Assuming menuItems comes from your config
import { menuItems } from "../config/menuConfig";

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const timerRef = useRef(null);

  // Open sidebar on hover
  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  };
  // Close sidebar after a small delay
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: open ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED,
        bgcolor: "#1b4332",
        color: "#fff",
        transition: "width 0.25s ease-in-out",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        zIndex: 1200,
        boxShadow: open ? "5px 0px 15px rgba(0,0,0,0.3)" : "none",
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "flex-start" : "center",
          px: open ? 3 : 0,
          fontSize: "1.2rem",
          fontWeight: 900,
          letterSpacing: "1.5px",
          whiteSpace: "nowrap",
        }}
      >
        {open ? "STARTUP" : "S"}
      </Box>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.3)", mx: 1 }} />

      {/* Main Menu */}
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Tooltip
              key={item.text}
              title={!open ? item.text : ""}
              placement="right"
              arrow
            >
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  mx: 1,
                  my: 0.5,
                  borderRadius: 1,
                  bgcolor: active ? "#2d6a4f" : "transparent",
                  "&:hover": { bgcolor: "rgba(45, 106, 79, 1)" },
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#fff",
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {icons[item.text] || <DashboardIcon />}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: active ? 700 : 500,
                      noWrap: true,
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      {/* Logout Section at the Bottom */}
      <Box sx={{ mt: "auto", pb: 2 }}>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.3)", mx: 1, mb: 1 }} />
        <Tooltip title={!open ? "Logout" : ""} placement="right" arrow>
          <ListItemButton
            sx={{
              mx: 1,
              borderRadius: 1,
              justifyContent: open ? "initial" : "center",
              "&:hover": { bgcolor: "rgba(214, 40, 40, 0.4)" },
            }}
          >
            <ListItemIcon
              sx={{
                color: "#fff",
                minWidth: 0,
                mr: open ? 2 : "auto",
                justifyContent: "center",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
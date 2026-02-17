import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// ICONS
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";
import TimelineIcon from "@mui/icons-material/Timeline";
import GavelIcon from "@mui/icons-material/Gavel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DescriptionIcon from "@mui/icons-material/Description";

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Box
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      sx={{
        width: open ? 250 : 64,
        height: "100vh",
        bgcolor: "#1f4d3a",
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s ease",
        overflowX: "hidden",
        zIndex: 1200,
      }}
    >
      {/* LOGO */}
      <Box
        sx={{
          height: 64,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "flex-start" : "center",
          gap: 1.5,
        }}
      >
        <RocketLaunchIcon sx={{ fontSize: 32 }} />
        <Typography
          variant="h6"
          fontWeight="bold"
          noWrap
          sx={{
            opacity: open ? 1 : 0,
            transition: "opacity 0.2s ease",
            whiteSpace: "nowrap",
          }}
        >
          Startup
        </Typography>
      </Box>

      {/* MENU ITEMS */}
      <List sx={{ flexGrow: 1 }}>
        <MenuItem
          open={open}
          icon={<DashboardIcon />}
          text="Dashboard"
          onClick={() => navigate("/")}
        />

        <MenuItem
          open={open}
          icon={<AccountCircleIcon />}
          text="Profile"
          onClick={() => navigate("/profile/view")}
        />

        <MenuItem
          open={open}
          icon={<TrendingUpIcon />}
          text="Fundraising Tracker"
          onClick={() => navigate("/fundraising")}
        />

        <MenuItem
          open={open}
          icon={<GroupIcon />}
          text="Team Management"
          onClick={() => navigate("/team")}
        />

        <MenuItem
          open={open}
          icon={<PeopleAltIcon />}
          text="My Clients"
          onClick={() => navigate("/clients")}
        />

        <MenuItem
          open={open}
          icon={<DescriptionIcon />}
          text="Schemes"
          onClick={() => navigate("/schemes")}
        />

        <MenuItem
          open={open}
          icon={<TimelineIcon />}
          text="Milestone Tracking"
          onClick={() => navigate("/milestones")}
        />

        <MenuItem
          open={open}
          icon={<HelpOutlineIcon />}
          text="Product Roadmap"
          onClick={() => navigate("/roadmap")}
        />

        <MenuItem
          open={open}
          icon={<GavelIcon />}
          text="Legal Compliance"
          onClick={() => navigate("/legal")}
        />
      </List>

      {/* LOGOUT */}
      <Box sx={{ mb: 2 }}>
        <MenuItem
          open={open}
          icon={<LogoutIcon />}
          text="Logout"
          onClick={() => navigate("/")}
        />
      </Box>
    </Box>
  );
}

/* ================= MENU ITEM COMPONENT ================= */

function MenuItem({ icon, text, onClick, open }) {
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        height: 48,
        px: 2,
        justifyContent: open ? "flex-start" : "center",
        transition: "all 0.2s ease",
        "&:hover": {
          bgcolor: "rgba(255,255,255,0.1)",
        },
      }}
    >
      <ListItemIcon
        sx={{
          color: "white",
          minWidth: 0,
          mr: open ? 2 : 0,
          justifyContent: "center",
        }}
      >
        {icon}
      </ListItemIcon>

      <ListItemText
        primary={text}
        sx={{
          opacity: open ? 1 : 0,
          whiteSpace: "nowrap",
          transition: "opacity 0.2s ease",
        }}
      />
    </ListItemButton>
  );
}

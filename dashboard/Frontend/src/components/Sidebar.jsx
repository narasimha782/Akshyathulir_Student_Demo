import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";
import TimelineIcon from "@mui/icons-material/Timeline";
import GavelIcon from "@mui/icons-material/Gavel";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DescriptionIcon from "@mui/icons-material/Description";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MenuBookIcon from "@mui/icons-material/MenuBook";

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
          sx={{ opacity: open ? 1 : 0 }}
        >
          Startup
        </Typography>
      </Box>

      {/* MENU */}
      <List sx={{ flexGrow: 1 }}>
        <MenuItem icon={<DashboardIcon />} text="Dashboard" open={open} onClick={() => navigate("/")} />
        <MenuItem icon={<AccountCircleIcon />} text="Profile" open={open} onClick={() => navigate("/profile")} />
        <MenuItem icon={<DescriptionIcon />} text="Schemes" open={open} onClick={() => navigate("/schemes")} />
        <MenuItem icon={<TrendingUpIcon />} text="Fundraising Tracker" open={open} onClick={() => navigate("/fundraising")} />
        <MenuItem icon={<GroupIcon />} text="Team Management" open={open} onClick={() => navigate("/team")} />
        <MenuItem icon={<PeopleAltIcon />} text="My Clients" open={open} onClick={() => navigate("/clients")} />
        <MenuItem icon={<TimelineIcon />} text="Milestone Tracking" open={open} onClick={() => navigate("/milestones")} />
        <MenuItem icon={<HelpOutlineIcon />} text="Product Roadmap" open={open} onClick={() => navigate("/roadmap")} />
        <MenuItem icon={<GavelIcon />} text="Legal Compliance" open={open} onClick={() => navigate("/legal")} />
        <MenuItem icon={<EmojiEventsIcon />} text="Opportunities" open={open} onClick={() => navigate("/opportunities")} />
        <MenuItem icon={<MenuBookIcon />} text="Courses" open={open} onClick={() => navigate("/courses")} />
      </List>

      {/* LOGOUT */}
      <Box sx={{ mb: 2 }}>
        <MenuItem icon={<LogoutIcon />} text="Logout" open={open} />
      </Box>
    </Box>
  );
}

/* MENU ITEM */
function MenuItem({ icon, text, onClick, open }) {
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        height: 48,
        px: 2,
        justifyContent: open ? "flex-start" : "center",
        "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
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
        sx={{ opacity: open ? 1 : 0, whiteSpace: "nowrap" }}
      />
    </ListItemButton>
  );
}
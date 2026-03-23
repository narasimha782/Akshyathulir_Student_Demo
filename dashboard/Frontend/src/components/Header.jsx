import { Box, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
export default function Header() {
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
      }}>
      <Typography variant="h5">Startup Dashboard</Typography>
      <Box>
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
        <IconButton color="inherit">
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
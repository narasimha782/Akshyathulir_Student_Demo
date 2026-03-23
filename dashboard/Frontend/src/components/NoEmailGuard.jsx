import { Box, Typography, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

export default function NoEmailGuard() {
  const navigate = useNavigate();
  return (
    <Box display="flex" flexDirection="column" alignItems="center"
         justifyContent="center" height={400} gap={2}>
      <AccountCircleIcon sx={{ fontSize: 64, color: "#1f4d3a", opacity: 0.4 }} />
      <Typography variant="h6" color="text.secondary">
        No profile loaded
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        Please go to the Profile page, enter your email<br />
        and load or create your profile first.
      </Typography>
      <Button variant="contained" sx={{ bgcolor: "#1f4d3a" }}
        onClick={() => navigate("/profile")}>
        Go to Profile
      </Button>
    </Box>
  );
}
import MainLayout from "../layout/MainLayout";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
} from "@mui/material";

//Icons
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import PaidIcon from "@mui/icons-material/Paid";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import TodayIcon from "@mui/icons-material/Today";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import EventNoteIcon from "@mui/icons-material/EventNote";

function MetricCard({
  title,
  value,
  subtitle,
  chipLeft,
  chipRight,
  icon,
}) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0px 10px 30px rgba(0,0,0,0.06)",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Title_Icon_smallcircle */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            {icon}
            <Typography variant="body1" fontWeight={600}>
              {title}
            </Typography>
          </Box>

          {/* right green dot */}
          <Box
            sx={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              border: "2px solid #4CAF50",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "#4CAF50",
              }}
            />
          </Box>
        </Box>

        {/* Big Value */}
        <Typography variant="h3" fontWeight="bold" sx={{ mt: 3, mb: 2 }}>
          {value}
        </Typography>

        {/* Bottom row */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>

          <Stack direction="row" spacing={1}>
            <Chip
              icon={<TodayIcon sx={{ fontSize: 16 }} />}
              label={chipLeft}
              size="small"
              sx={{
                bgcolor: "#E8F5E9",
                color: "#2E7D32",
                fontWeight: 600,
                borderRadius: 10,
              }}
            />
            <Chip
              icon={<ArrowUpwardIcon sx={{ fontSize: 16 }} />}
              label={chipRight}
              size="small"
              sx={{
                bgcolor: "#E8F5E9",
                color: "#2E7D32",
                fontWeight: 600,
                borderRadius: 10,
              }}
            />
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function FundraisingTracker() {
  return (
    <MainLayout>
      <Box
        sx={{
          minHeight: "100vh",
          px: { xs: 2, md: 4 },
          py: 3,
          bgcolor: "#F4FBF7",
        }}
      >
        {/* PAGE TITLE */}
        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <TrendingUpIcon sx={{ color: "#2E7D32" }} />
          <Typography variant="h5" fontWeight="bold">
            Fundraising Tracker
          </Typography>
        </Box>

        {/* METRIC CARDS */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <MetricCard
              title="Target Amount"
              value="2.0M"
              subtitle="Seed Round"
              chipLeft="+0 today"
              chipRight="0%"
              icon={<TrackChangesIcon sx={{ color: "#2E7D32" }} />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <MetricCard
              title="Amount Raised"
              value="0.8M"
              subtitle="37.5% of target"
              chipLeft="+0 today"
              chipRight="37.5%"
              icon={<PaidIcon sx={{ color: "#2E7D32" }} />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <MetricCard
              title="Active Investors"
              value="12"
              subtitle="In pipeline"
              chipLeft="+0 today"
              chipRight="0%"
              icon={<GroupsIcon sx={{ color: "#2E7D32" }} />}
            />
          </Grid>
        </Grid>

        {/* FUNDING ROUNDS TABLE */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Funding Rounds
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Round</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Target Date</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>Pre-Seed</TableCell>
                  <TableCell>$0.5M</TableCell>
                  <TableCell>
                    <Chip
                      icon={<CheckCircleIcon sx={{ fontSize: 18 }} />}
                      label="Completed"
                      size="small"
                      sx={{
                        bgcolor: "#C8E6C9",
                        color: "#1B5E20",
                        fontWeight: 600,
                        borderRadius: 10,
                        px: 1,
                      }}
                    />
                  </TableCell>
                  <TableCell>Jan 15, 2026</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Seed</TableCell>
                  <TableCell>$2.0M</TableCell>
                  <TableCell>
                    <Chip
                      icon={<HourglassBottomIcon sx={{ fontSize: 18 }} />}
                      label="In Progress"
                      size="small"
                      sx={{
                        bgcolor: "#A5D6A7",
                        color: "#1B5E20",
                        fontWeight: 600,
                        borderRadius: 10,
                        px: 1,
                      }}
                    />
                  </TableCell>
                  <TableCell>Jun 30, 2026</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Series A</TableCell>
                  <TableCell>$5.0M</TableCell>
                  <TableCell>
                    <Chip
                      icon={<EventNoteIcon sx={{ fontSize: 18 }} />}
                      label="Planned"
                      size="small"
                      sx={{
                        bgcolor: "#E0E0E0",
                        color: "#424242",
                        fontWeight: 600,
                        borderRadius: 10,
                        px: 1,
                      }}
                    />
                  </TableCell>
                  <TableCell>Mar 15, 2027</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  );
}

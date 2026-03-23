import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  IconButton,
  Avatar,
  Divider,
  Paper,
} from "@mui/material";

// ICONS
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GavelIcon from "@mui/icons-material/Gavel";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import Api from "./api";
import { useEmail } from "../context/EmailContext";
import NoEmailGuard from "../components/NoEmailGuard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

/* ================= GREEN COLOR PALETTE ================= */
const GREEN_COLORS = {
  darkGreen:   "#1f4d3a",
  forestGreen: "#2e5c47",
  emerald:     "#3d7456",
  jade:        "#4d8c65",
  mint:        "#66a182",
  sage:        "#80b69f",
  lightGreen:  "#a8d5ba",
  paleGreen:   "#c8e6d3",
};

// Icon + color mapping for activity types
const ACTIVITY_CONFIG = {
  funding:   { icon: <TrendingUpIcon />,          color: GREEN_COLORS.darkGreen },
  team:      { icon: <GroupIcon />,               color: GREEN_COLORS.forestGreen },
  milestone: { icon: <CheckCircleOutlineIcon />,  color: GREEN_COLORS.emerald },
  client:    { icon: <BusinessCenterIcon />,      color: GREEN_COLORS.jade },
};

// Priority color mapping for upcoming tasks
const PRIORITY_COLOR = {
  High:     GREEN_COLORS.darkGreen,
  Critical: GREEN_COLORS.forestGreen,
  Medium:   GREEN_COLORS.jade,
  Low:      GREEN_COLORS.mint,
};

export default function Dashboard() {
  const { activeEmail } = useEmail();
  const [timeframe] = useState("This Quarter");
  const [summary, setSummary]   = useState(null);

  useEffect(() => {
    if (!activeEmail) return;
    Api.get(`/dashboard/summary?email=${encodeURIComponent(activeEmail)}`)
      .then(res => setSummary(res.data))
      .catch(err => console.error("Dashboard fetch error:", err));
  }, [activeEmail]);

  /* ── Safe helpers ── */
  const ms        = summary?.milestones  || { total: 0, completed: 0, inProgress: 0, pending: 0 };
  const deptMap   = summary?.teamByDept  || {};
  const chart     = summary?.fundingChart || { labels: ["Jan","Feb","Mar","Apr","May","Jun"], raised: [0,0,0,0,0,0], target: [0,0,0,0,0,0] };
  const activities     = summary?.recentActivity || [];
  const upcomingTasks  = summary?.upcomingTasks  || [];

  const totalFunding  = summary?.totalFunding  || 0;
  const totalTarget   = summary?.targetFunding  || 0;
  const fundingPct    = totalTarget > 0 ? Math.round((totalFunding / totalTarget) * 100) : 0;
  const msPct         = ms.total > 0 ? Math.round((ms.completed / ms.total) * 100) : 0;

  /* ================= METRIC CARDS DATA ================= */
  const metrics = [
    {
      title:   "Total Funding",
      value:   totalFunding >= 1_000_000
                 ? `₹${(totalFunding / 1_000_000).toFixed(1)}M`
                 : totalFunding >= 1_000
                   ? `₹${(totalFunding / 1_000).toFixed(0)}K`
                   : `₹${totalFunding}`,
      change:  `₹${(totalFunding / 1_000).toFixed(0)}K raised`,
      percent: `${fundingPct}% of target`,
      trend:   "up",
      icon:    <AttachMoneyIcon sx={{ fontSize: 40 }} />,
      color:   GREEN_COLORS.darkGreen,
      bg:      `linear-gradient(135deg, ${GREEN_COLORS.darkGreen} 0%, ${GREEN_COLORS.darkGreen}dd 100%)`,
    },
    {
      title:   "Active Projects",
      value:   String(summary?.activeProjects ?? 0),
      change:  `${summary?.activeProjects ?? 0} in dev`,
      percent: "In Development",
      trend:   "up",
      icon:    <BusinessCenterIcon sx={{ fontSize: 40 }} />,
      color:   GREEN_COLORS.forestGreen,
      bg:      `linear-gradient(135deg, ${GREEN_COLORS.forestGreen} 0%, ${GREEN_COLORS.forestGreen}dd 100%)`,
    },
    {
      title:   "Team Members",
      value:   String(summary?.teamMembers ?? 0),
      change:  `${summary?.teamMembers ?? 0} total`,
      percent: `${Object.keys(deptMap).length} dept${Object.keys(deptMap).length !== 1 ? "s" : ""}`,
      trend:   "up",
      icon:    <GroupIcon sx={{ fontSize: 40 }} />,
      color:   GREEN_COLORS.emerald,
      bg:      `linear-gradient(135deg, ${GREEN_COLORS.emerald} 0%, ${GREEN_COLORS.emerald}dd 100%)`,
    },
    {
      title:   "Milestones",
      value:   `${ms.completed}/${ms.total}`,
      change:  `${ms.completed} done`,
      percent: `${msPct}%`,
      trend:   "up",
      icon:    <CheckCircleOutlineIcon sx={{ fontSize: 40 }} />,
      color:   GREEN_COLORS.jade,
      bg:      `linear-gradient(135deg, ${GREEN_COLORS.jade} 0%, ${GREEN_COLORS.jade}dd 100%)`,
    },
    {
      title:   "Compliance Rate",
      value:   `${summary?.complianceScore ?? 0}%`,
      change:  `${summary?.complianceScore ?? 0}% done`,
      percent: (summary?.complianceScore ?? 0) >= 80 ? "Excellent" : "Needs Work",
      trend:   "up",
      icon:    <GavelIcon sx={{ fontSize: 40 }} />,
      color:   GREEN_COLORS.mint,
      bg:      `linear-gradient(135deg, ${GREEN_COLORS.mint} 0%, ${GREEN_COLORS.mint}dd 100%)`,
    },
    {
      title:   "Active Clients",
      value:   String(summary?.activeClients ?? 0),
      change:  `${summary?.activeClients ?? 0} active`,
      percent: "Active now",
      trend:   "up",
      icon:    <AssignmentIcon sx={{ fontSize: 40 }} />,
      color:   GREEN_COLORS.sage,
      bg:      `linear-gradient(135deg, ${GREEN_COLORS.sage} 0%, ${GREEN_COLORS.sage}dd 100%)`,
    },
  ];

  /* ================= FUNDING PROGRESS CHART ================= */
  const fundingData = {
    labels: chart.labels,
    datasets: [
      {
        label:                "Funding Raised (₹M)",
        data:                 chart.raised,
        borderColor:          GREEN_COLORS.darkGreen,
        backgroundColor:      GREEN_COLORS.darkGreen + "20",
        tension:              0.4,
        fill:                 true,
        pointRadius:          6,
        pointHoverRadius:     8,
        pointBackgroundColor: GREEN_COLORS.darkGreen,
        pointBorderColor:     "#fff",
        pointBorderWidth:     2,
      },
      {
        label:                "Target (₹M)",
        data:                 chart.target,
        borderColor:          GREEN_COLORS.jade,
        backgroundColor:      GREEN_COLORS.jade + "20",
        tension:              0.4,
        fill:                 true,
        borderDash:           [5, 5],
        pointRadius:          4,
        pointBackgroundColor: GREEN_COLORS.jade,
        pointBorderColor:     "#fff",
        pointBorderWidth:     2,
      },
    ],
  };

  /* ================= TEAM DISTRIBUTION CHART ================= */
  const deptLabels = Object.keys(deptMap);
  const deptValues = Object.values(deptMap);
  const deptColors = [
    GREEN_COLORS.darkGreen,
    GREEN_COLORS.forestGreen,
    GREEN_COLORS.emerald,
    GREEN_COLORS.jade,
    GREEN_COLORS.mint,
    GREEN_COLORS.sage,
  ];
  const teamData = {
    labels: deptLabels.length > 0 ? deptLabels : ["No Data"],
    datasets: [
      {
        label:           "Team Members",
        data:            deptValues.length > 0 ? deptValues : [0],
        backgroundColor: deptColors.slice(0, Math.max(deptLabels.length, 1)),
      },
    ],
  };

  /* ================= MILESTONE STATUS CHART ================= */
  const milestoneData = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        data: [ms.completed, ms.inProgress, ms.pending],
        backgroundColor: [
          GREEN_COLORS.darkGreen,
          GREEN_COLORS.jade,
          GREEN_COLORS.lightGreen,
        ],
        borderWidth: 0,
      },
    ],
  };

  if (!activeEmail) return <NoEmailGuard />;

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color={GREEN_COLORS.darkGreen}>
            Welcome back! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={0.5}>
            Here's what's happening with your startup today
          </Typography>
        </Box>

        <Box display="flex" gap={2}>
          <Chip
            icon={<CalendarTodayIcon />}
            label={timeframe}
            sx={{
              bgcolor: GREEN_COLORS.paleGreen,
              color:   GREEN_COLORS.darkGreen,
              fontWeight: 500,
            }}
          />
          <IconButton sx={{ bgcolor: GREEN_COLORS.paleGreen, color: GREEN_COLORS.darkGreen }}>
            <NotificationsIcon />
          </IconButton>
        </Box>
      </Box>

      {/* ================= METRIC CARDS ================= */}
      <Grid container spacing={3} mb={4}>
        {metrics.map((metric, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Card
              sx={{
                borderRadius: 3,
                height: "100%",
                background: metric.bg,
                color: "white",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                      {metric.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {metric.value}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} mt={1.5}>
                      <Chip
                        size="small"
                        label={metric.change}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.2)",
                          color: "white",
                          fontSize: "0.75rem",
                          height: 24,
                        }}
                      />
                      <Typography variant="caption" sx={{ opacity: 0.9 }}>
                        {metric.percent}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      borderRadius: 2,
                      p: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {metric.icon}
                  </Box>
                </Box>
              </CardContent>

              {/* Decorative background element */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: -20,
                  right: -20,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.1)",
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ================= CHARTS ROW ================= */}
      <Grid container spacing={3} mb={4}>
        {/* Funding Progress Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color={GREEN_COLORS.darkGreen}>
                    Fundraising Progress
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monthly funding raised vs target
                  </Typography>
                </Box>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>

              <Box sx={{ height: 300 }}>
                <Line
                  data={fundingData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: "bottom" } },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: { callback: (value) => `₹${value}M` },
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Milestone Status Doughnut */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color={GREEN_COLORS.darkGreen}>
                    Milestone Status
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Current quarter progress
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ height: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {ms.total === 0 ? (
                  <Typography color="text.secondary">No milestones added yet</Typography>
                ) : (
                  <Doughnut
                    data={milestoneData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { position: "bottom" } },
                    }}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ================= BOTTOM ROW ================= */}
      <Grid container spacing={3}>
        {/* Team Distribution */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold" color={GREEN_COLORS.darkGreen}>
                  Team Distribution
                </Typography>
                <IconButton size="small">
                  <ArrowForwardIcon />
                </IconButton>
              </Box>

              <Box sx={{ height: 280 }}>
                {deptLabels.length === 0 ? (
                  <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                    <Typography color="text.secondary">No team members added yet</Typography>
                  </Box>
                ) : (
                  <Bar
                    data={teamData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: { stepSize: 1 },
                        },
                      },
                    }}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold" color={GREEN_COLORS.darkGreen}>
                  Recent Activity
                </Typography>
                <IconButton size="small">
                  <ArrowForwardIcon />
                </IconButton>
              </Box>

              <Box sx={{ maxHeight: 280, overflowY: "auto" }}>
                {activities.length === 0 ? (
                  <Typography color="text.secondary" variant="body2">
                    No recent activity yet
                  </Typography>
                ) : (
                  activities.map((activity, index) => {
                    const cfg = ACTIVITY_CONFIG[activity.type] || ACTIVITY_CONFIG.client;
                    return (
                      <Box key={index} mb={2}>
                        <Box display="flex" gap={2}>
                          <Avatar sx={{ bgcolor: cfg.color, width: 40, height: 40 }}>
                            {cfg.icon}
                          </Avatar>
                          <Box flex={1}>
                            <Typography variant="body2" fontWeight="600">
                              {activity.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {activity.desc}
                            </Typography>
                            <Typography variant="caption" display="block" color="text.secondary" mt={0.5}>
                              {activity.time}
                            </Typography>
                          </Box>
                        </Box>
                        {index < activities.length - 1 && <Divider sx={{ mt: 2 }} />}
                      </Box>
                    );
                  })
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Tasks */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold" color={GREEN_COLORS.darkGreen}>
                  Upcoming Tasks
                </Typography>
                <IconButton size="small">
                  <ArrowForwardIcon />
                </IconButton>
              </Box>

              <Box sx={{ maxHeight: 280, overflowY: "auto" }}>
                {upcomingTasks.length === 0 ? (
                  <Typography color="text.secondary" variant="body2">
                    No upcoming tasks yet
                  </Typography>
                ) : (
                  upcomingTasks.map((task, index) => {
                    const taskColor = PRIORITY_COLOR[task.priority] || GREEN_COLORS.jade;
                    return (
                      <Box key={index} mb={2.5}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                          <Typography variant="body2" fontWeight="600">
                            {task.task}
                          </Typography>
                          <Chip
                            size="small"
                            label={task.priority}
                            sx={{
                              bgcolor: taskColor,
                              color: "white",
                              height: 20,
                              fontSize: "0.7rem",
                            }}
                          />
                        </Box>

                        <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                          <CalendarTodayIcon sx={{ fontSize: 12, mr: 0.5, verticalAlign: "middle" }} />
                          {task.date}
                        </Typography>

                        <Box display="flex" alignItems="center" gap={1}>
                          <LinearProgress
                            variant="determinate"
                            value={task.status || 0}
                            sx={{
                              flex: 1,
                              height: 6,
                              borderRadius: 3,
                              bgcolor: GREEN_COLORS.paleGreen,
                              "& .MuiLinearProgress-bar": { bgcolor: taskColor },
                            }}
                          />
                          <Typography variant="caption" fontWeight="600">
                            {task.status || 0}%
                          </Typography>
                        </Box>

                        {index < upcomingTasks.length - 1 && <Divider sx={{ mt: 2 }} />}
                      </Box>
                    );
                  })
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
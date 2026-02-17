import { useState } from "react";
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
  darkGreen: "#1f4d3a",      // Primary dark green
  forestGreen: "#2e5c47",    // Medium dark green
  emerald: "#3d7456",        // Medium green
  jade: "#4d8c65",           // Light medium green
  mint: "#66a182",           // Light green
  sage: "#80b69f",           // Very light green
  lightGreen: "#a8d5ba",     // Pale green
  paleGreen: "#c8e6d3",      // Very pale green
};

export default function Dashboard() {
  const [timeframe] = useState("This Quarter");

  /* ================= METRIC CARDS DATA ================= */
  const metrics = [
    {
      title: "Total Funding",
      value: "₹2.5M",
      change: "+₹800K",
      percent: "+47%",
      trend: "up",
      icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />,
      color: GREEN_COLORS.darkGreen,
    },
    {
      title: "Active Projects",
      value: "12",
      change: "+3",
      percent: "+25%",
      trend: "up",
      icon: <BusinessCenterIcon sx={{ fontSize: 40 }} />,
      color: GREEN_COLORS.forestGreen,
    },
    {
      title: "Team Members",
      value: "28",
      change: "+5",
      percent: "+21.7%",
      trend: "up",
      icon: <GroupIcon sx={{ fontSize: 40 }} />,
      color: GREEN_COLORS.emerald,
    },
    {
      title: "Milestones",
      value: "18/24",
      change: "+4",
      percent: "75%",
      trend: "up",
      icon: <CheckCircleOutlineIcon sx={{ fontSize: 40 }} />,
      color: GREEN_COLORS.jade,
    },
    {
      title: "Compliance Rate",
      value: "92%",
      change: "+8%",
      percent: "Excellent",
      trend: "up",
      icon: <GavelIcon sx={{ fontSize: 40 }} />,
      color: GREEN_COLORS.mint,
    },
    {
      title: "Active Clients",
      value: "15",
      change: "+2",
      percent: "+15.4%",
      trend: "up",
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      color: GREEN_COLORS.sage,
    },
  ];

  /* ================= FUNDING PROGRESS CHART ================= */
  const fundingData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Funding Raised (₹M)",
        data: [0, 0.3, 0.8, 1.2, 1.8, 2.5],
        borderColor: GREEN_COLORS.darkGreen,
        backgroundColor: GREEN_COLORS.darkGreen + "20",
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: GREEN_COLORS.darkGreen,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
      {
        label: "Target (₹M)",
        data: [0, 0.5, 1.0, 1.5, 2.0, 2.5],
        borderColor: GREEN_COLORS.jade,
        backgroundColor: GREEN_COLORS.jade + "20",
        tension: 0.4,
        fill: true,
        borderDash: [5, 5],
        pointRadius: 4,
        pointBackgroundColor: GREEN_COLORS.jade,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  /* ================= TEAM PERFORMANCE CHART ================= */
  const teamData = {
    labels: ["Engineering", "Product", "Marketing", "Finance", "Operations"],
    datasets: [
      {
        label: "Team Members",
        data: [10, 5, 6, 3, 4],
        backgroundColor: [
          GREEN_COLORS.darkGreen,
          GREEN_COLORS.forestGreen,
          GREEN_COLORS.emerald,
          GREEN_COLORS.jade,
          GREEN_COLORS.mint,
        ],
      },
    ],
  };

  /* ================= MILESTONE STATUS CHART ================= */
  const milestoneData = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        data: [18, 4, 2],
        backgroundColor: [
          GREEN_COLORS.darkGreen,
          GREEN_COLORS.jade,
          GREEN_COLORS.lightGreen,
        ],
        borderWidth: 0,
      },
    ],
  };

  /* ================= RECENT ACTIVITIES ================= */
  const activities = [
    {
      icon: <TrendingUpIcon />,
      title: "New funding round closed",
      desc: "Successfully raised ₹800K from Series A",
      time: "2 hours ago",
      color: GREEN_COLORS.darkGreen,
    },
    {
      icon: <GroupIcon />,
      title: "5 new team members onboarded",
      desc: "Engineering and Product teams expanded",
      time: "1 day ago",
      color: GREEN_COLORS.forestGreen,
    },
    {
      icon: <CheckCircleOutlineIcon />,
      title: "Major milestone completed",
      desc: "MVP launch successful with 500+ users",
      time: "2 days ago",
      color: GREEN_COLORS.emerald,
    },
    {
      icon: <BusinessCenterIcon />,
      title: "New client partnership",
      desc: "Signed contract with TechCorp India",
      time: "3 days ago",
      color: GREEN_COLORS.jade,
    },
  ];

  /* ================= UPCOMING TASKS ================= */
  const upcomingTasks = [
    {
      task: "Investor pitch presentation",
      date: "Jan 30, 2026",
      priority: "High",
      status: 80,
      color: GREEN_COLORS.darkGreen,
    },
    {
      task: "Product roadmap Q2 planning",
      date: "Feb 5, 2026",
      priority: "Medium",
      status: 45,
      color: GREEN_COLORS.emerald,
    },
    {
      task: "Legal compliance review",
      date: "Feb 10, 2026",
      priority: "High",
      status: 60,
      color: GREEN_COLORS.forestGreen,
    },
    {
      task: "Team quarterly review",
      date: "Feb 15, 2026",
      priority: "Medium",
      status: 30,
      color: GREEN_COLORS.jade,
    },
  ];

  return (
    <Box>
      {/* ================= HEADER SECTION ================= */}
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
              color: GREEN_COLORS.darkGreen,
              fontWeight: 500 
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
                background: `linear-gradient(135deg, ${metric.color} 0%, ${metric.color}dd 100%)`,
                color: "white",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
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
                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => `₹${value}M`,
                        },
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
                <Doughnut
                  data={milestoneData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  }}
                />
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
                <Bar
                  data={teamData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 2,
                        },
                      },
                    },
                  }}
                />
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
                {activities.map((activity, index) => (
                  <Box key={index} mb={2}>
                    <Box display="flex" gap={2}>
                      <Avatar sx={{ bgcolor: activity.color, width: 40, height: 40 }}>
                        {activity.icon}
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
                ))}
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
                {upcomingTasks.map((task, index) => (
                  <Box key={index} mb={2.5}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                      <Typography variant="body2" fontWeight="600">
                        {task.task}
                      </Typography>
                      <Chip
                        size="small"
                        label={task.priority}
                        sx={{
                          bgcolor: task.priority === "High" 
                            ? GREEN_COLORS.darkGreen 
                            : GREEN_COLORS.jade,
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
                        value={task.status}
                        sx={{
                          flex: 1,
                          height: 6,
                          borderRadius: 3,
                          bgcolor: GREEN_COLORS.paleGreen,
                          "& .MuiLinearProgress-bar": {
                            bgcolor: task.color,
                          },
                        }}
                      />
                      <Typography variant="caption" fontWeight="600">
                        {task.status}%
                      </Typography>
                    </Box>

                    {index < upcomingTasks.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
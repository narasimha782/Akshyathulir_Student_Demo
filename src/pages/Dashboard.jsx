import React from "react";
import MainLayout from "../layout/MainLayout";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
} from "@mui/material";

// ✅ MUI Icons
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsIcon from "@mui/icons-material/Groups";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import GavelIcon from "@mui/icons-material/Gavel";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import TodayIcon from "@mui/icons-material/Today";

// Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function MetricCard({ title, value, subtitle, percent, icon }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            {icon}
            <Typography fontWeight={700}>{title}</Typography>
          </Box>

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

        {/* Value */}
        <Typography variant="h3" fontWeight="bold" sx={{ mt: 3, mb: 2 }}>
          {value}
        </Typography>

        {/* Footer */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>

          <Stack direction="row" spacing={1}>
            <Chip
              icon={<TodayIcon sx={{ fontSize: 16 }} />}
              label="+0 today"
              size="small"
              sx={{
                bgcolor: "#E8F5E9",
                color: "#2E7D32",
                fontWeight: 700,
                borderRadius: 10,
              }}
            />
            <Chip
              icon={<ArrowUpwardIcon sx={{ fontSize: 16 }} />}
              label={percent}
              size="small"
              sx={{
                bgcolor: "#E8F5E9",
                color: "#2E7D32",
                fontWeight: 700,
                borderRadius: 10,
              }}
            />
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  // Graph Data
  const chartData = [
    { month: "Jan", amount: 0 },
    { month: "Feb", amount: 100 },
    { month: "Mar", amount: 250 },
    { month: "Apr", amount: 400 },
    { month: "May", amount: 600 },
    { month: "Jun", amount: 750 },
  ];

  //  Recent Activities
  const recentActivities = [
    {
      id: 1,
      title: "New investor meeting",
      time: "2 hours ago",
      icon: <TrendingUpIcon sx={{ color: "#1B5E20" }} />,
    },
    {
      id: 2,
      title: "New team member added",
      time: "1 day ago",
      icon: <GroupsIcon sx={{ color: "#1B5E20" }} />,
    },
    {
      id: 3,
      title: "Milestone completed",
      time: "3 days ago",
      icon: <TaskAltIcon sx={{ color: "#1B5E20" }} />,
    },
  ];

  return (
    <MainLayout>
      <Box sx={{ width: "100%" }}>
        {/* ✅ TOP 4 CARDS (ALWAYS ONE ROW) */}
        <Grid container spacing={3} mb={4}>
          {/* ✅ md={3} is important (not lg={3}) */}
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Current Funding Round"
              value="Seed"
              subtitle="0.8M raised"
              percent="37.5%"
              icon={<TrendingUpIcon sx={{ color: "#1B5E20" }} />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Team Size"
              value="8"
              subtitle="+3 this month"
              percent="0%"
              icon={<GroupsIcon sx={{ color: "#1B5E20" }} />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Milestones"
              value="8/15"
              subtitle="Completed this quarter"
              percent="53.3%"
              icon={<TaskAltIcon sx={{ color: "#1B5E20" }} />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Legal Compliance"
              value="9/12"
              subtitle="Items completed"
              percent="75.0%"
              icon={<GavelIcon sx={{ color: "#1B5E20" }} />}
            />
          </Grid>
        </Grid>

        {/* ✅ GRAPH + RECENT ACTIVITY (BIG + SMALL ALWAYS) */}
        <Grid container spacing={3} alignItems="stretch">
          {/* ✅ Graph big section */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Fundraising Progress
                </Typography>

                <Box sx={{ width: "100%", height: 360 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        name="Funding Raised ($K)"
                        dataKey="amount"
                        stroke="#1B5E20"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* ✅ Recent Activity small section */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Recent Activity
                </Typography>

                <Stack spacing={2}>
                  {recentActivities.map((item, index) => (
                    <Box key={item.id}>
                      <Box display="flex" alignItems="center" gap={2}>
                        {item.icon}
                        <Box>
                          <Typography fontWeight={700}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.time}
                          </Typography>
                        </Box>
                      </Box>

                      {index !== recentActivities.length - 1 && (
                        <Divider sx={{ mt: 2 }} />
                      )}
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}

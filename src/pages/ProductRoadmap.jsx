import React from "react";
import { Box, Grid, Card, Typography, LinearProgress, Divider, IconButton } from "@mui/material";
import { LineChart, Line, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";

// Icons
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SearchIcon from "@mui/icons-material/Search";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import TimelineIcon from "@mui/icons-material/Timeline";
import PublicIcon from "@mui/icons-material/Public";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import MainLayout from "../layout/MainLayout";

// Mock Data for the Velocity Graph
const velocityData = [
  { name: "1", v: 10 }, { name: "2", v: 25 }, { name: "3", v: 20 },
  { name: "4", v: 45 }, { name: "5", v: 38 }, { name: "6", v: 60 }
];

const pieData = [
  { name: "Health", value: 72 },
  { name: "Empty", value: 28 },
];
const glassStyle = {
  background: "#1b4332",
  backdropFilter: "blur(10px)",
  borderRadius: 4,
  color: "#ffffffff",
  p: 3
};

export default function ProductRoadmap() {
  return (
    <MainLayout>
      <Box sx={{ p: 4, backgroundColor: "#ffffffff", minHeight: "100vh" }}>
        
        <Grid container spacing={3} alignItems="stretch">
          {/* ================= LEFT SIDE (ROADMAP) ================= */}
          <Grid item xs={12} md={9}>
            
            {/* NOW SECTION */}
            <Box sx={{ ...glassStyle, mb: 3, borderLeft: "4px solid #1b4332" }}>
              <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.7 }}>NOW</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                
                {/* Project Atlas (Green) */}
                <Grid item xs={12} md={4}>
                  <Card sx={{ p: 2, background: "linear-gradient(135deg, #1b4332 0%, #0d250fff 100%)", color: "#fff" }}>
                    <Typography variant="subtitle2" fontWeight="bold">Project Atlas</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>(Mobile Revamp)</Typography>
                    <Box sx={{ mt: 3 }}>
                      <LinearProgress variant="determinate" value={90} sx={{ height: 6, borderRadius: 3, backgroundColor: "rgba(12, 2, 2, 0.2)", "& .MuiLinearProgress-bar": { backgroundColor: "#fff" }}} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                         <Typography variant="caption">           2026</Typography>
                         <Typography variant="caption" fontWeight="bold">90%</Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>

                {/* Quantum Leap (Blue) */}
                <Grid item xs={12} md={4}>
                  <Card sx={{ p: 2, background: "linear-gradient(135deg, #1b4332 0%, #0d250fff 100%)", color: "#fff" }}>
                    <Typography variant="subtitle2" fontWeight="bold">Quantum Leap Search</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>Engine Upgrade</Typography>
                    <Box sx={{ mt: 4, textAlign: 'right' }}><SearchIcon sx={{ opacity: 0.5 }} /></Box>
                  </Card>
                </Grid>

                {/* AI Bot (Purple) */}
                <Grid item xs={12} md={4}>
                  <Card sx={{ p: 2, background: "linear-gradient(135deg, #1b4332 0%, #0d250fff 100%)", color: "#fff" }}>
                    <Typography variant="subtitle2" fontWeight="bold">AI Support Bot v2.0</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>Refining Neural AI/ML</Typography>
                    <Box sx={{ mt: 4, textAlign: 'right' }}><SmartToyIcon sx={{ opacity: 0.5 }} /></Box>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {/* NEXT SECTION */}
            <Box sx={{ ...glassStyle, mb: 3 }}>
              <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.7 }}>NEXT</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                 <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 2, bgcolor: '#1b4332', border: '1px solid #d5e5d8ff' }}>
                        <TimelineIcon sx={{ mr: 2, color: '#fafafaff' }} />
                        <Typography>Nebula OS Integration</Typography>
                    </Box>
                 </Grid>
                 <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                        <SearchIcon sx={{ mr: 2, color: '#ffffffff' }} />
                        <Typography>Dark Matter Data Analytics</Typography>
                    </Box>
                 </Grid>
              </Grid>
            </Box>

            {/* LATER SECTION */}
            <Box sx={{ ...glassStyle }}>
              <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.7 }}>LATER</Typography>
              <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}><PublicIcon fontSize="small" sx={{ mr: 1, opacity: 0.5 }} /> Global Market Penetration</Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}><TrendingUpIcon fontSize="small" sx={{ mr: 1, opacity: 0.5 }} /> Sustainable Tech Framework</Typography>
              </Box>
            </Box>

          </Grid>

          {/* ================= RIGHT SIDE (AI INSIGHTS) ================= */}
          <Grid item xs={12} md={3}>
            <Box sx={{ ...glassStyle, height: "100%", display: 'flex', flexDirection: 'column' }}>
              <Typography fontWeight="bold" mb={2}>AI Insights</Typography>

              {/* Alert Box */}
              <Box sx={{ p: 1.5, borderRadius: 1, bgcolor: "rgba(8, 241, 132, 0.1)", border: "1px solid #d32f2f", mb: 3 }}>
                <Typography variant="caption" color="#ff8a80" sx={{ display: 'flex', alignItems: 'center' }}>
                  <WarningAmberIcon fontSize="small" sx={{ mr: 1 }} /> ALERT: Nebula OS Integration
                </Typography>
                <Typography variant="caption" display="block" color="#ff8a80" ml={4}>Probability of Delay: 40%</Typography>
              </Box>

              {/* Velocity Mini-Graph */}
              <Typography variant="caption" sx={{ opacity: 0.6, mb: 1 }}>Development Velocity</Typography>
              <Box sx={{ height: 80, width: '100%', mb: 3 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={velocityData}>
                    <Line type="monotone" dataKey="v" stroke="#00e5ff" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 3 }} />

              {/* Backlog Pie Chart */}
              <Typography variant="caption" sx={{ opacity: 0.6, mb: 1, textAlign: 'center', display: 'block' }}>Backlog Health</Typography>
              <Box sx={{ position: 'relative', height: 150 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                      <Cell fill="#7b1fa2" />
                      <Cell fill="rgba(255,255,255,0.1)" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                   <Typography variant="h6" fontWeight="bold">72%</Typography>
                </Box>
              </Box>
              <Typography variant="caption" align="center" sx={{ mt: 1, opacity: 0.5 }}>Under 90 Days</Typography>

            </Box>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}
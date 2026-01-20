import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Stack,
} from "@mui/material";

// Icons
import GavelIcon from "@mui/icons-material/Gavel";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const BRAND_GREEN = "#1B3A2F";
const LIGHT_GREEN_BG = "#F4FBF7";
const ACCENT_GREEN = "#76B091";

function MetricCard({ title, value, subtitle, percent }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0px 4px 20px rgba(0,0,0,0.04)", height: "100%" }}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {title}
          </Typography>
          <FiberManualRecordIcon sx={{ fontSize: 14, color: ACCENT_GREEN }} />
        </Stack>

        <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
          {value}
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
          <Stack direction="row" spacing={0.5}>
            <Chip 
              label="~ +0 today" 
              size="small" 
              sx={{ height: 20, fontSize: "0.65rem", bgcolor: "#F1F8F5", color: ACCENT_GREEN, borderRadius: 1 }} 
            />
            <Chip 
              icon={<TrendingUpIcon style={{ fontSize: 12, color: ACCENT_GREEN }} />} 
              label={percent} 
              size="small" 
              sx={{ height: 20, fontSize: "0.65rem", bgcolor: "#F1F8F5", color: ACCENT_GREEN, borderRadius: 1 }} 
            />
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function InvestorRelation() {
  const [items, setItems] = useState([
    { req: "Privacy Policy Update", cat: "Regulatory", due: "Jan 15, 2026", priority: "High", status: "Pending" },
    { req: "Employment Contracts", cat: "Employment", due: "Jan 31, 2027", priority: "Medium", status: "Completed" },
    { req: "Trademark Filing", cat: "IP", due: "Feb 28, 2026", priority: "High", status: "In Progress" },
    { req: "Tax Registration", cat: "Corporate", due: "Jan 31, 2026", priority: "Critical", status: "Pending" },
  ]);

  return (
    <MainLayout>
      <Box
        sx={{
          bgcolor: LIGHT_GREEN_BG,
          minHeight: "100vh",
          p: { xs: 2, md: 4 },
          overflowY: "auto", // Allows vertical scrolling
        }}
      >
        {/* PAGE HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <GavelIcon sx={{ color: BRAND_GREEN, fontSize: 28 }} />
            <Typography variant="h5" fontWeight="bold" sx={{ color: BRAND_GREEN }}>
              Legal Compliance
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: BRAND_GREEN,
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
              "&:hover": { bgcolor: "#142b23" },
            }}
          >
            Add Item
          </Button>
        </Box>

        {/* METRIC CARDS */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard title="Total Items" value="12" subtitle="Compliance requirements" percent="0%" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard title="Completed" value="9" subtitle="Up to date" percent="75.0%" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard title="Pending" value="3" subtitle="Needs attention" percent="0%" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard title="Compliance Score" value="75%" subtitle="Overall health" percent="0%" />
          </Grid>
        </Grid>

        {/* COMPLIANCE TABLE */}
        <Card sx={{ borderRadius: 4, boxShadow: "0px 4px 25px rgba(0,0,0,0.03)", border: "1px solid #F0F0F0" }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight="bold" mb={3} color={BRAND_GREEN}>
              Compliance Checklist
            </Typography>

            <Box sx={{ overflowX: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {["Requirement", "Category", "Due Date", "Priority", "Status", "Action", "Manage"].map((head) => (
                      <TableCell key={head} sx={{ fontWeight: 700, color: "#666", borderBottom: "1px solid #F0F0F0", pb: 2 }}>
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index} sx={{ "&:last-child td": { border: 0 } }}>
                      <TableCell sx={{ fontWeight: 600, color: "#333" }}>{item.req}</TableCell>
                      <TableCell sx={{ color: "#444" }}>{item.cat}</TableCell>
                      <TableCell sx={{ color: "#666" }}>{item.due}</TableCell>
                      <TableCell sx={{ color: "#444" }}>{item.priority}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.status}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            bgcolor: 
                              item.status === "Completed" ? "#D1E7DD" : 
                              item.status === "In Progress" ? "#FEF3C7" : "#F1F3F5",
                            color: 
                              item.status === "Completed" ? "#0F5132" : 
                              item.status === "In Progress" ? "#92400E" : "#495057",
                            borderRadius: 1.5,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            textTransform: "none",
                            borderRadius: 1.5,
                            fontWeight: 600,
                            color: item.status === "In Progress" ? "#D97706" : BRAND_GREEN,
                            borderColor: "#E0E0E0",
                            "&:hover": { borderColor: BRAND_GREEN }
                          }}
                        >
                          {item.status === "Completed" ? "View" : item.status === "In Progress" ? "Update" : "Review"}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton size="small" sx={{ border: "1px solid #E0E0E0", borderRadius: 2, color: BRAND_GREEN }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" sx={{ border: "1px solid #FAD2D2", borderRadius: 2, color: "#DC3545" }}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  );
}
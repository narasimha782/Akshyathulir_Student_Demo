import React, { useMemo, useState } from "react";
import MainLayout from "../layout/MainLayout";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  LinearProgress,
} from "@mui/material";

// ✅ MUI Icons
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AddIcon from "@mui/icons-material/Add";
import TodayIcon from "@mui/icons-material/Today";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function MetricCard({ title, value, subtitle, percent = "0%" }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0px 10px 30px rgba(0,0,0,0.06)",
        height: "100%",
        minWidth: { xs: "250px", md: "auto" }, // Prevents cards from squishing too small
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontWeight={600}>{title}</Typography>
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
            <FiberManualRecordIcon sx={{ fontSize: 10, color: "#4CAF50" }} />
          </Box>
        </Box>

        <Typography variant="h3" fontWeight="bold" sx={{ mt: 3, mb: 2 }}>
          {value}
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip
              icon={<TodayIcon sx={{ fontSize: 16 }} />}
              label="+0 today"
              size="small"
              sx={{ bgcolor: "#E8F5E9", color: "#2E7D32", fontWeight: 600, borderRadius: 10 }}
            />
            <Chip
              icon={<ArrowUpwardIcon sx={{ fontSize: 16 }} />}
              label={percent}
              size="small"
              sx={{ bgcolor: "#E8F5E9", color: "#2E7D32", fontWeight: 600, borderRadius: 10 }}
            />
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

function StatusChip({ status }) {
  const styles =
    status === "In Progress"
      ? { bgcolor: "#A5D6A7", color: "#1B5E20" }
      : status === "Planning"
      ? { bgcolor: "#E0E0E0", color: "#424242" }
      : { bgcolor: "#C8E6C9", color: "#1B5E20" };

  return (
    <Chip
      label={status}
      size="small"
      sx={{ ...styles, fontWeight: 600, borderRadius: 10, px: 1 }}
    />
  );
}

function PriorityText({ priority }) {
  return (
    <Typography
      fontWeight={500}
      sx={{
        color:
          priority === "Critical"
            ? "#D32F2F"
            : priority === "High"
            ? "#1B5E20"
            : "#555",
      }}
    >
      {priority}
    </Typography>
  );
}

export default function MilestoneTracking() {
  const [milestones, setMilestones] = useState([
    { id: 1, milestone: "MVP Launch", category: "Product", dueDate: "Dec 31, 2026", priority: "High", status: "In Progress", progress: 75 },
    { id: 2, milestone: "Seed Funding Close", category: "Fundraising", dueDate: "Jan 15, 2026", priority: "Critical", status: "In Progress", progress: 40 },
    { id: 3, milestone: "Team Expansion", category: "Business", dueDate: "Feb 1, 2026", priority: "Medium", status: "Planning", progress: 20 },
  ]);

  const totalMilestones = 15; 
  const completedMilestones = 8; 
  const upcomingMilestones = 4; 
  const overdueMilestones = 1; 
  const completedPercent = useMemo(() => "53.3%", []);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ milestone: "", category: "Product", dueDate: "", priority: "Medium", status: "Planning", progress: 0 });

  const resetForm = () => setForm({ milestone: "", category: "Product", dueDate: "", priority: "Medium", status: "Planning", progress: 0 });

  const handleOpenAdd = () => { setEditId(null); resetForm(); setOpen(true); };

  const handleOpenEdit = (row) => {
    setEditId(row.id);
    setForm({ ...row });
    setOpen(true);
  };

  const handleClose = () => { setOpen(false); setEditId(null); resetForm(); };

  const handleSave = () => {
    if (!form.milestone.trim() || !form.dueDate.trim()) return alert("Please fill Milestone and Due Date");
    const progressNumber = Number(form.progress);
    if (editId) {
      setMilestones((prev) => prev.map((m) => (m.id === editId ? { ...m, ...form, progress: progressNumber } : m)));
    } else {
      setMilestones((prev) => [{ id: Date.now(), ...form, progress: progressNumber }, ...prev]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this milestone?")) {
      setMilestones((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <MainLayout>
      <Box
        sx={{
          minHeight: "100vh",
          height: "auto",      // Allows container to grow with content
          overflowY: "auto",   // Enables vertical scrolling
          px: { xs: 2, md: 4 },
          py: 3,
          bgcolor: "#F4FBF7",
        }}
      >
        {/* HEADER */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <TaskAltIcon sx={{ color: "#2E7D32" }} />
            <Typography variant="h5" fontWeight="bold">Milestone Tracking</Typography>
          </Box>
          <Button
            onClick={handleOpenAdd}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ bgcolor: "#1B5E20", borderRadius: 2, textTransform: "none", px: 2.5, "&:hover": { bgcolor: "#145017" } }}
          >
            Add Milestone
          </Button>
        </Box>

        {/* METRIC CARDS - Responsive Horizontal Scroll if needed */}
        <Grid 
          container 
          spacing={3} 
          mb={4} 
          sx={{ 
            overflowX: { xs: "auto", lg: "hidden" }, 
            flexWrap: { xs: "nowrap", lg: "wrap" },
            pb: 1 // Padding for the scrollbar
          }}
        >
          <Grid item xs={12} md={3} sx={{ flexShrink: 0 }}>
            <MetricCard title="Total Milestones" value={totalMilestones} subtitle="This quarter" />
          </Grid>
          <Grid item xs={12} md={3} sx={{ flexShrink: 0 }}>
            <MetricCard title="Completed" value={completedMilestones} subtitle="On schedule" percent={completedPercent} />
          </Grid>
          <Grid item xs={12} md={3} sx={{ flexShrink: 0 }}>
            <MetricCard title="Upcoming" value={upcomingMilestones} subtitle="Next 30 days" />
          </Grid>
          <Grid item xs={12} md={3} sx={{ flexShrink: 0 }}>
            <MetricCard title="Overdue" value={overdueMilestones} subtitle="Needs attention" />
          </Grid>
        </Grid>

        {/* TABLE CARD */}
        <Card sx={{ borderRadius: 3, boxShadow: "0px 10px 30px rgba(0,0,0,0.06)", mb: 4 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 }, overflowX: "auto" }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Current Milestones</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Milestone</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Due Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Priority</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Progress</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {milestones.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.milestone}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.dueDate}</TableCell>
                    <TableCell><PriorityText priority={row.priority} /></TableCell>
                    <TableCell><StatusChip status={row.status} /></TableCell>
                    <TableCell sx={{ minWidth: 200 }}>
                      <Box sx={{ width: 120 }}>
                        <LinearProgress variant="determinate" value={row.progress} sx={{ height: 8, borderRadius: 10, bgcolor: "#DDEEE3", "& .MuiLinearProgress-bar": { bgcolor: "#1B5E20", borderRadius: 10 } }} />
                      </Box>
                      <Typography variant="body2" fontWeight={600} mt={0.5}>{row.progress}%</Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton onClick={() => handleOpenEdit(row)} sx={{ border: "1px solid #A5D6A7", borderRadius: 2 }}>
                          <EditIcon sx={{ color: "#1B5E20" }} />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(row.id)} sx={{ border: "1px solid #EEEEEE", borderRadius: 2 }}>
                          <DeleteIcon sx={{ color: "#D32F2F" }} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* DIALOG */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: "bold" }}>{editId ? "Edit Milestone" : "Add Milestone"}</DialogTitle>
          <DialogContent sx={{ pt: 1 }}>
            <Stack spacing={2} mt={1}>
              <TextField label="Milestone" fullWidth value={form.milestone} onChange={(e) => setForm({ ...form, milestone: e.target.value })} />
              <TextField label="Category" select fullWidth value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {["Product", "Fundraising", "Business", "Legal"].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </TextField>
              <TextField label="Due Date" fullWidth placeholder="Dec 31, 2026" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
              <TextField label="Priority" select fullWidth value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                {["Critical", "High", "Medium", "Low"].map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </TextField>
              <TextField label="Status" select fullWidth value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                {["Planning", "In Progress", "Completed"].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </TextField>
              <TextField label="Progress (%)" type="number" fullWidth value={form.progress} onChange={(e) => setForm({ ...form, progress: e.target.value })} inputProps={{ min: 0, max: 100 }} />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave} variant="contained" sx={{ bgcolor: "#1B5E20", "&:hover": { bgcolor: "#145017" } }}>{editId ? "Update" : "Save"}</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </MainLayout>
  );
}
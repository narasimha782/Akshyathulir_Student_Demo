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
import MapIcon from "@mui/icons-material/Map";
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
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Title + Green dot */}
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
                fontWeight: 600,
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

function StatusChip({ status }) {
  const styles =
    status === "In Development"
      ? { bgcolor: "#A5D6A7", color: "#1B5E20" }
      : status === "Released"
      ? { bgcolor: "#C8E6C9", color: "#1B5E20" }
      : { bgcolor: "#E0E0E0", color: "#424242" };

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        ...styles,
        fontWeight: 600,
        borderRadius: 10,
        px: 1,
      }}
    />
  );
}

function PriorityText({ priority }) {
  return (
    <Typography
      fontWeight={500}
      sx={{
        color:
          priority === "High"
            ? "#1B5E20"
            : priority === "Critical"
            ? "#D32F2F"
            : "#555",
      }}
    >
      {priority}
    </Typography>
  );
}

export default function ProductRoadmap() {
  const [features, setFeatures] = useState([
    {
      id: 1,
      feature: "User Authentication",
      priority: "High",
      startDate: "Jan 15, 2026",
      targetDate: "Feb 15, 2026",
      status: "In Development",
      progress: 90,
    },
    {
      id: 2,
      feature: "Payment Integration",
      priority: "High",
      startDate: "Jan 1, 2026",
      targetDate: "Jan 31, 2026",
      status: "Planned",
      progress: 10,
    },
    {
      id: 3,
      feature: "Mobile App",
      priority: "Medium",
      startDate: "Feb 1, 2026",
      targetDate: "Apr 30, 2026",
      status: "Planned",
      progress: 0,
    },
  ]);

  // ===== Metrics like screenshot =====
  const totalFeatures = 32;
  const inDevelopment = 8;
  const released = 12;
  const planned = 12;

  const releasedPercent = useMemo(() => "0%", []);

  // ===== Dialog state =====
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    feature: "",
    priority: "Medium",
    startDate: "",
    targetDate: "",
    status: "Planned",
    progress: 0,
  });

  const resetForm = () => {
    setForm({
      feature: "",
      priority: "Medium",
      startDate: "",
      targetDate: "",
      status: "Planned",
      progress: 0,
    });
  };

  const handleOpenAdd = () => {
    setEditId(null);
    resetForm();
    setOpen(true);
  };

  const handleOpenEdit = (row) => {
    setEditId(row.id);
    setForm({
      feature: row.feature,
      priority: row.priority,
      startDate: row.startDate,
      targetDate: row.targetDate,
      status: row.status,
      progress: row.progress,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditId(null);
    resetForm();
  };

  const handleSave = () => {
    if (
      !form.feature.trim() ||
      !form.startDate.trim() ||
      !form.targetDate.trim()
    ) {
      alert("Please fill Feature, Start Date, and Target Date");
      return;
    }

    const progressNumber = Number(form.progress);
    if (Number.isNaN(progressNumber) || progressNumber < 0 || progressNumber > 100) {
      alert("Progress must be between 0 and 100");
      return;
    }

    if (editId) {
      setFeatures((prev) =>
        prev.map((f) =>
          f.id === editId ? { ...f, ...form, progress: progressNumber } : f
        )
      );
    } else {
      const newFeature = {
        id: Date.now(),
        ...form,
        progress: progressNumber,
      };
      setFeatures((prev) => [newFeature, ...prev]);
    }

    handleClose();
  };

  const handleDelete = (id) => {
    const ok = window.confirm("Delete this feature?");
    if (!ok) return;
    setFeatures((prev) => prev.filter((f) => f.id !== id));
  };

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
        {/* ===== TOP HEADER ===== */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <MapIcon sx={{ color: "#2E7D32" }} />
            <Typography variant="h5" fontWeight="bold">
              Product Roadmap
            </Typography>
          </Box>

          <Button
            onClick={handleOpenAdd}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "#1B5E20",
              borderRadius: 2,
              textTransform: "none",
              px: 2.5,
              "&:hover": { bgcolor: "#145017" },
            }}
          >
            Add Feature
          </Button>
        </Box>

        {/* ===== METRIC CARDS ===== */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Total Features"
              value={totalFeatures}
              subtitle="In roadmap"
              percent="0%"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <MetricCard
              title="In Development"
              value={inDevelopment}
              subtitle="Active features"
              percent="0%"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <MetricCard
              title="Released"
              value={released}
              subtitle="This quarter"
              percent={releasedPercent}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <MetricCard
              title="Planned"
              value={planned}
              subtitle="Next quarter"
              percent="0%"
            />
          </Grid>
        </Grid>

        {/* ===== TABLE CARD ===== */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Feature Development Timeline
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Feature</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Priority</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Start Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Target Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Progress</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {features.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.feature}</TableCell>

                    <TableCell>
                      <PriorityText priority={row.priority} />
                    </TableCell>

                    <TableCell>{row.startDate}</TableCell>
                    <TableCell>{row.targetDate}</TableCell>

                    <TableCell>
                      <StatusChip status={row.status} />
                    </TableCell>

                    {/* Progress bar + percent */}
                    <TableCell sx={{ minWidth: 220 }}>
                      <Box sx={{ width: 150 }}>
                        <LinearProgress
                          variant="determinate"
                          value={row.progress}
                          sx={{
                            height: 8,
                            borderRadius: 10,
                            bgcolor: "#DDEEE3",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: "#1B5E20",
                              borderRadius: 10,
                            },
                          }}
                        />
                      </Box>

                      <Typography variant="body2" fontWeight={600} mt={0.5}>
                        {row.progress.toFixed(1)}%
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          onClick={() => handleOpenEdit(row)}
                          sx={{
                            border: "1px solid #A5D6A7",
                            borderRadius: 2,
                          }}
                        >
                          <EditIcon sx={{ color: "#1B5E20" }} />
                        </IconButton>

                        <IconButton
                          onClick={() => handleDelete(row.id)}
                          sx={{
                            border: "1px solid #EEEEEE",
                            borderRadius: 2,
                          }}
                        >
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

        {/* ===== ADD / EDIT DIALOG ===== */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: "bold" }}>
            {editId ? "Edit Feature" : "Add Feature"}
          </DialogTitle>

          <DialogContent sx={{ pt: 1 }}>
            <Stack spacing={2} mt={1}>
              <TextField
                label="Feature"
                fullWidth
                value={form.feature}
                onChange={(e) =>
                  setForm({ ...form, feature: e.target.value })
                }
              />

              <TextField
                label="Priority"
                select
                fullWidth
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value })
                }
              >
                <MenuItem value="Critical">Critical</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </TextField>

              <TextField
                label="Start Date"
                fullWidth
                placeholder="Jan 15, 2026"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
              />

              <TextField
                label="Target Date"
                fullWidth
                placeholder="Feb 15, 2026"
                value={form.targetDate}
                onChange={(e) =>
                  setForm({ ...form, targetDate: e.target.value })
                }
              />

              <TextField
                label="Status"
                select
                fullWidth
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <MenuItem value="Planned">Planned</MenuItem>
                <MenuItem value="In Development">In Development</MenuItem>
                <MenuItem value="Released">Released</MenuItem>
              </TextField>

              <TextField
                label="Progress (%)"
                type="number"
                fullWidth
                value={form.progress}
                onChange={(e) =>
                  setForm({ ...form, progress: e.target.value })
                }
                inputProps={{ min: 0, max: 100 }}
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleClose} sx={{ textTransform: "none" }}>
              Cancel
            </Button>

            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                bgcolor: "#1B5E20",
                textTransform: "none",
                "&:hover": { bgcolor: "#145017" },
              }}
            >
              {editId ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </MainLayout>
  );
}

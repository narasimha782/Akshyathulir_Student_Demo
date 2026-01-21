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
} from "@mui/material";

// ✅ MUI Icons
import GavelIcon from "@mui/icons-material/Gavel";
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
  let styles = { bgcolor: "#E0E0E0", color: "#424242" };

  if (status === "Completed") styles = { bgcolor: "#A5D6A7", color: "#1B5E20" };
  if (status === "In Progress") styles = { bgcolor: "#C8E6C9", color: "#1B5E20" };
  if (status === "Pending") styles = { bgcolor: "#E0E0E0", color: "#424242" };

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

function ActionButton({ action, onClick }) {
  const color =
    action === "Review"
      ? "#1B5E20"
      : action === "View"
        ? "#607D8B"
        : "#F9A825"; // Update yellow

  return (
    <Button
      onClick={onClick}
      variant="outlined"
      size="small"
      sx={{
        textTransform: "none",
        borderRadius: 2,
        borderColor: "#A5D6A7",
        color,
        fontWeight: 600,
        "&:hover": { borderColor: "#1B5E20" },
      }}
    >
      {action}
    </Button>
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

export default function LegalCompliance() {
  const [items, setItems] = useState([
    {
      id: 1,
      requirement: "Privacy Policy Update",
      category: "Regulatory",
      dueDate: "Jan 15, 2026",
      priority: "High",
      status: "Pending",
      action: "Review",
    },
    {
      id: 2,
      requirement: "Employment Contracts",
      category: "Employment",
      dueDate: "Jan 31, 2027",
      priority: "Medium",
      status: "Completed",
      action: "View",
    },
    {
      id: 3,
      requirement: "Trademark Filing",
      category: "IP",
      dueDate: "Feb 28, 2026",
      priority: "High",
      status: "In Progress",
      action: "Update",
    },
    {
      id: 4,
      requirement: "Tax Registration",
      category: "Corporate",
      dueDate: "Jan 31, 2026",
      priority: "Critical",
      status: "Pending",
      action: "Review",
    },
  ]);

  // ===== Metrics like screenshot =====
  const totalItems = 12;
  const completedCount = 9;
  const pendingCount = 3;
  const complianceScore = "75%";

  const completedPercent = useMemo(() => "75.0%", []);

  // ===== Dialog state =====
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    requirement: "",
    category: "Regulatory",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
    action: "Review",
  });

  const resetForm = () => {
    setForm({
      requirement: "",
      category: "Regulatory",
      dueDate: "",
      priority: "Medium",
      status: "Pending",
      action: "Review",
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
      requirement: row.requirement,
      category: row.category,
      dueDate: row.dueDate,
      priority: row.priority,
      status: row.status,
      action: row.action,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditId(null);
    resetForm();
  };

  const handleSave = () => {
    if (!form.requirement.trim() || !form.dueDate.trim()) {
      alert("Please fill Requirement and Due Date");
      return;
    }

    if (editId) {
      setItems((prev) =>
        prev.map((x) => (x.id === editId ? { ...x, ...form } : x))
      );
    } else {
      const newItem = {
        id: Date.now(),
        ...form,
      };
      setItems((prev) => [newItem, ...prev]);
    }

    handleClose();
  };

  const handleDelete = (id) => {
    const ok = window.confirm("Delete this compliance item?");
    if (!ok) return;
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const handleAction = (row) => {
    alert(`${row.action} clicked for: ${row.requirement}`);
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
            <GavelIcon sx={{ color: "#2E7D32" }} />
            <Typography variant="h5" fontWeight="bold">
              Legal Compliance
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
            }}>
            Add Item
          </Button>
        </Box>

        {/* ===== METRIC CARDS (Always single row) ===== */}
        <Grid
          container
          spacing={2}
          mb={4}
          wrap="nowrap"
          sx={{ overflowX: "auto" }} // optional: scroll if very small screen
        >
          <Grid item xs={3} sx={{ minWidth: 220 }}>
            <MetricCard
              title="Total Items"
              value={totalItems}
              subtitle="Compliance requirements"
              percent="0%"
            />
          </Grid>

          <Grid item xs={3} sx={{ minWidth: 220 }}>
            <MetricCard
              title="Completed"
              value={completedCount}
              subtitle="Up to date"
              percent={completedPercent}
            />
          </Grid>

          <Grid item xs={3} sx={{ minWidth: 220 }}>
            <MetricCard
              title="Pending"
              value={pendingCount}
              subtitle="Needs attention"
              percent="0%"
            />
          </Grid>

          <Grid item xs={3} sx={{ minWidth: 220 }}>
            <MetricCard
              title="Compliance Score"
              value={complianceScore}
              subtitle="Overall health"
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
              Compliance Checklist
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Requirement</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Due Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Priority</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Manage</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {items.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.requirement}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.dueDate}</TableCell>

                    <TableCell>
                      <PriorityText priority={row.priority} />
                    </TableCell>

                    <TableCell>
                      <StatusChip status={row.status} />
                    </TableCell>

                    <TableCell>
                      <ActionButton
                        action={row.action}
                        onClick={() => handleAction(row)}
                      />
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
            {editId ? "Edit Compliance Item" : "Add Compliance Item"}
          </DialogTitle>

          <DialogContent sx={{ pt: 1 }}>
            <Stack spacing={2} mt={1}>
              <TextField
                label="Requirement"
                fullWidth
                value={form.requirement}
                onChange={(e) =>
                  setForm({ ...form, requirement: e.target.value })
                }
              />

              <TextField
                label="Category"
                select
                fullWidth
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <MenuItem value="Regulatory">Regulatory</MenuItem>
                <MenuItem value="Employment">Employment</MenuItem>
                <MenuItem value="IP">IP</MenuItem>
                <MenuItem value="Corporate">Corporate</MenuItem>
              </TextField>

              <TextField
                label="Due Date"
                fullWidth
                placeholder="Jan 15, 2026"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
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
                label="Status"
                select
                fullWidth
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>

              <TextField
                label="Action"
                select
                fullWidth
                value={form.action}
                onChange={(e) =>
                  setForm({ ...form, action: e.target.value })
                }
              >
                <MenuItem value="Review">Review</MenuItem>
                <MenuItem value="View">View</MenuItem>
                <MenuItem value="Update">Update</MenuItem>
              </TextField>
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

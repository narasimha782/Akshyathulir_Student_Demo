import { useState } from "react";
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
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

import MapIcon from "@mui/icons-material/Map";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

export default function ProductRoadmap() {
  /* ================= STATE ================= */
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [features, setFeatures] = useState([
    {
      feature: "User Authentication",
      priority: "High",
      start: "Jan 15, 2026",
      target: "Feb 15, 2026",
      status: "In Development",
      progress: 90,
    },
    {
      feature: "Payment Integration",
      priority: "High",
      start: "Jan 1, 2026",
      target: "Jan 31, 2026",
      status: "Planned",
      progress: 10,
    },
    {
      feature: "Mobile App",
      priority: "Medium",
      start: "Feb 1, 2026",
      target: "Apr 30, 2026",
      status: "Planned",
      progress: 0,
    },
  ]);

  const [form, setForm] = useState({
    feature: "",
    priority: "Medium",
    start: "",
    target: "",
    status: "Planned",
    progress: 0,
  });

  /* ================= ADD ================= */
  const openAdd = () => {
    setEditIndex(null);
    setForm({
      feature: "",
      priority: "Medium",
      start: "",
      target: "",
      status: "Planned",
      progress: 0,
    });
    setOpen(true);
  };

  /* ================= EDIT ================= */
  const openEdit = (index) => {
    const f = features[index];
    setEditIndex(index);
    setForm({
      feature: f.feature,
      priority: f.priority,
      start: "",
      target: "",
      status: f.status,
      progress: f.progress,
    });
    setOpen(true);
  };

  /* ================= SAVE ================= */
  const handleSave = () => {
    const updatedFeature = {
      feature: form.feature,
      priority: form.priority,
      start: form.start || features[editIndex]?.start,
      target: form.target || features[editIndex]?.target,
      status: form.status,
      progress: form.progress,
    };

    if (editIndex === null) {
      setFeatures([...features, updatedFeature]);
    } else {
      const updated = [...features];
      updated[editIndex] = updatedFeature;
      setFeatures(updated);
    }

    setOpen(false);
  };

  /* ================= DELETE ================= */
  const openDelete = (index) => {
    setDeleteIndex(index);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    setFeatures(features.filter((_, i) => i !== deleteIndex));
    setDeleteOpen(false);
  };

  return (
    <Box>
      {/* PAGE HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <MapIcon color="success" />
          Product Roadmap
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: "#1f4d3a" }}
          onClick={openAdd}
        >
          Add Feature
        </Button>
      </Box>

      {/* METRIC CARDS — UNCHANGED */}
      <Grid container spacing={2} mb={3}>
        {[
          { title: "Total Features", value: 32, sub: "In roadmap" },
          { title: "In Development", value: 8, sub: "Active features" },
          { title: "Released", value: 12, sub: "This quarter" },
          { title: "Planned", value: 12, sub: "Next quarter" },
        ].map((m, i) => (
          <Grid key={i} size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="body2">{m.title}</Typography>
                <Typography variant="h4" fontWeight="bold">{m.value}</Typography>
                <Typography variant="body2" color="text.secondary">{m.sub}</Typography>
                <Chip label="+0 today" color="success" size="small" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* TABLE */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Feature Development Timeline
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Feature</b></TableCell>
                <TableCell><b>Priority</b></TableCell>
                <TableCell><b>Start Date</b></TableCell>
                <TableCell><b>Target Date</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Progress</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {features.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.feature}</TableCell>
                  <TableCell>{item.priority}</TableCell>
                  <TableCell>{item.start}</TableCell>
                  <TableCell>{item.target}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      color={item.status === "In Development" ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ minWidth: 120 }}>
                    <LinearProgress
                      variant="determinate"
                      value={item.progress}
                      sx={{ height: 8, borderRadius: 5, mb: 0.5 }}
                    />
                    <Typography variant="caption">{item.progress}%</Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton color="success" onClick={() => openEdit(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => openDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ADD / EDIT FEATURE DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          {editIndex === null ? "Add Feature" : "Edit Feature"}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                label="Feature Title"
                value={form.feature}
                onChange={(e) => setForm({ ...form, feature: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                select
                fullWidth
                label="Priority"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                type="date"
                fullWidth
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setForm({ ...form, start: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                type="date"
                fullWidth
                label="Target Date"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setForm({ ...form, target: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                select
                fullWidth
                label="Status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <MenuItem value="Planned">Planned</MenuItem>
                <MenuItem value="In Development">In Development</MenuItem>
                <MenuItem value="Released">Released</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                type="number"
                label="Progress (%)"
                value={form.progress}
                onChange={(e) =>
                  setForm({ ...form, progress: Number(e.target.value) })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: "#1f4d3a" }} onClick={handleSave}>
            {editIndex === null ? "Add Feature" : "Update Feature"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE CONFIRMATION */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          Confirm Delete
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Typography>Are you sure you want to delete this feature?</Typography>
          <Typography fontWeight="bold" mt={2}>
            {features[deleteIndex]?.feature}
          </Typography>
          <Typography color="text.secondary" mt={1}>
            This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

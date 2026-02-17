import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TimelineIcon from "@mui/icons-material/Timeline";
import CloseIcon from "@mui/icons-material/Close";

export default function MilestoneTracking() {
  /* ================= STATE ================= */
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [milestones, setMilestones] = useState([
    {
      title: "MVP Launch",
      category: "Product",
      dueDate: "Dec 31, 2026",
      priority: "High",
      status: "In Progress",
      progress: 75,
    },
    {
      title: "Seed Funding Close",
      category: "Fundraising",
      dueDate: "Jan 15, 2026",
      priority: "Critical",
      status: "In Progress",
      progress: 40,
    },
    {
      title: "Team Expansion",
      category: "Business",
      dueDate: "Feb 1, 2026",
      priority: "Medium",
      status: "Planning",
      progress: 20,
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    category: "Product",
    dueDate: "",
    priority: "Medium",
    status: "Planning",
    progress: 0,
  });

  /* ================= ADD ================= */
  const openAdd = () => {
    setEditIndex(null);
    setForm({
      title: "",
      category: "Product",
      dueDate: "",
      priority: "Medium",
      status: "Planning",
      progress: 0,
    });
    setOpen(true);
  };

  /* ================= EDIT ================= */
  const openEdit = (index) => {
    setEditIndex(index);
    setForm({ ...milestones[index], dueDate: "" });
    setOpen(true);
  };

  /* ================= SAVE ================= */
  const handleSave = () => {
    const formattedDate =
      form.dueDate || milestones[editIndex]?.dueDate;

    const updatedMilestone = {
      ...form,
      dueDate: formattedDate,
    };

    if (editIndex === null) {
      setMilestones([...milestones, updatedMilestone]);
    } else {
      const updated = [...milestones];
      updated[editIndex] = updatedMilestone;
      setMilestones(updated);
    }

    setOpen(false);
  };

  /* ================= DELETE ================= */
  const openDeleteDialog = (index) => {
    setDeleteIndex(index);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    setMilestones(milestones.filter((_, i) => i !== deleteIndex));
    setDeleteOpen(false);
  };

  return (
    <Box>
      {/* PAGE HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <TimelineIcon color="success" />
          Milestone Tracking
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: "#1f4d3a" }}
          onClick={openAdd}
        >
          Add Milestone
        </Button>
      </Box>

      {/* METRIC CARDS — UNCHANGED */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography>Total Milestones</Typography>
              <Typography variant="h3" fontWeight="bold" sx={{ color: "#1f4d3a", my: 1 }}>
                15
              </Typography>
              <Typography color="text.secondary">This quarter</Typography>
              <Box display="flex" gap={1} mt={2}>
                <Chip label="+0 today" color="success" size="small" />
                <Chip label="↑ 0%" color="success" size="small" variant="outlined" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography>Completed</Typography>
              <Typography variant="h3" fontWeight="bold" sx={{ color: "#1f4d3a", my: 1 }}>
                8
              </Typography>
              <Typography color="text.secondary">On schedule</Typography>
              <Box display="flex" gap={1} mt={2}>
                <Chip label="+0 today" color="success" size="small" />
                <Chip label="↑ 53.3%" color="success" size="small" variant="outlined" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography>Upcoming</Typography>
              <Typography variant="h3" fontWeight="bold" sx={{ color: "#1f4d3a", my: 1 }}>
                4
              </Typography>
              <Typography color="text.secondary">Next 30 days</Typography>
              <Box display="flex" gap={1} mt={2}>
                <Chip label="+0 today" color="success" size="small" />
                <Chip label="↑ 0%" color="success" size="small" variant="outlined" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography>Overdue</Typography>
              <Typography variant="h3" fontWeight="bold" sx={{ color: "#1f4d3a", my: 1 }}>
                1
              </Typography>
              <Typography color="text.secondary">Needs attention</Typography>
              <Box display="flex" gap={1} mt={2}>
                <Chip label="+0 today" color="success" size="small" />
                <Chip label="↑ 0%" color="success" size="small" variant="outlined" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* TABLE — SAME STRUCTURE */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>Current Milestones</Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Milestone</b></TableCell>
                <TableCell><b>Category</b></TableCell>
                <TableCell><b>Due Date</b></TableCell>
                <TableCell><b>Priority</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Progress</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {milestones.map((m, index) => (
                <TableRow key={index}>
                  <TableCell>{m.title}</TableCell>
                  <TableCell>{m.category}</TableCell>
                  <TableCell>{m.dueDate}</TableCell>
                  <TableCell>{m.priority}</TableCell>
                  <TableCell>
                    <Chip label={m.status} color="success" size="small" />
                  </TableCell>
                  <TableCell sx={{ width: 160 }}>
                    <LinearProgress variant="determinate" value={m.progress} sx={{ height: 8, borderRadius: 5 }} />
                    <Typography variant="body2" mt={0.5}>{m.progress}.0%</Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton color="success" onClick={() => openEdit(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => openDeleteDialog(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ADD / EDIT DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          {editIndex === null ? "Add Milestone" : "Edit Milestone"}
          <IconButton onClick={() => setOpen(false)} sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField fullWidth label="Title" value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField select fullWidth label="Category" value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <MenuItem value="Product">Product</MenuItem>
                <MenuItem value="Fundraising">Fundraising</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField type="date" fullWidth label="Due Date" InputLabelProps={{ shrink: true }}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField select fullWidth label="Priority" value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField select fullWidth label="Status" value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <MenuItem value="Planning">Planning</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField fullWidth type="number" label="Progress (%)" value={form.progress}
                onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })} />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: "#1f4d3a" }} onClick={handleSave}>
            {editIndex === null ? "Add Milestone" : "Update Milestone"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE CONFIRMATION */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          Confirm Delete
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Typography>Are you sure you want to delete this milestone?</Typography>
          <Typography fontWeight="bold" mt={2}>
            {milestones[deleteIndex]?.title}
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

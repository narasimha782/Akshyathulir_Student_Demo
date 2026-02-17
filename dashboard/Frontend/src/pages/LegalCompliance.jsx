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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

import GavelIcon from "@mui/icons-material/Gavel";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

export default function LegalCompliance() {
  /* ================= STATE ================= */
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [items, setItems] = useState([
    {
      title: "Privacy Policy Update",
      category: "Regulatory",
      due: "Jan 15, 2026",
      priority: "High",
      status: "Pending",
    },
    {
      title: "Employment Contracts",
      category: "Employment",
      due: "Jan 31, 2027",
      priority: "Medium",
      status: "Completed",
    },
    {
      title: "Trademark Filing",
      category: "IP",
      due: "Feb 28, 2026",
      priority: "High",
      status: "In Progress",
    },
    {
      title: "Tax Registration",
      category: "Corporate",
      due: "Jan 31, 2026",
      priority: "Critical",
      status: "Pending",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    category: "Regulatory",
    due: "",
    priority: "Medium",
    status: "Pending",
  });

  /* ================= ADD ================= */
  const openAdd = () => {
    setEditIndex(null);
    setForm({
      title: "",
      category: "Regulatory",
      due: "",
      priority: "Medium",
      status: "Pending",
    });
    setOpen(true);
  };

  /* ================= EDIT ================= */
  const openEdit = (index) => {
    const i = items[index];
    setEditIndex(index);
    setForm({
      title: i.title,
      category: i.category,
      due: "",
      priority: i.priority,
      status: i.status,
    });
    setOpen(true);
  };

  /* ================= SAVE ================= */
  const handleSave = () => {
    const updatedItem = {
      title: form.title,
      category: form.category,
      due: form.due || items[editIndex]?.due,
      priority: form.priority,
      status: form.status,
    };

    if (editIndex === null) {
      setItems([...items, updatedItem]);
    } else {
      const updated = [...items];
      updated[editIndex] = updatedItem;
      setItems(updated);
    }

    setOpen(false);
  };

  /* ================= DELETE ================= */
  const openDelete = (index) => {
    setDeleteIndex(index);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    setItems(items.filter((_, i) => i !== deleteIndex));
    setDeleteOpen(false);
  };

  return (
    <Box>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <GavelIcon color="success" />
          Legal Compliance
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: "#1f4d3a" }}
          onClick={openAdd}
        >
          Add Item
        </Button>
      </Box>

      {/* METRIC CARDS — UNCHANGED */}
      <Grid container spacing={2} mb={3}>
        {[
          { t: "Total Items", v: 12, s: "Compliance requirements" },
          { t: "Completed", v: 9, s: "Up to date" },
          { t: "Pending", v: 3, s: "Needs attention" },
          { t: "Compliance Score", v: "75%", s: "Overall health" },
        ].map((c, i) => (
          <Grid key={i} size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="body2">{c.t}</Typography>
                <Typography variant="h4" fontWeight="bold">{c.v}</Typography>
                <Typography variant="body2" color="text.secondary">{c.s}</Typography>
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
            Compliance Checklist
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Requirement</b></TableCell>
                <TableCell><b>Category</b></TableCell>
                <TableCell><b>Due Date</b></TableCell>
                <TableCell><b>Priority</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Action</b></TableCell>
                <TableCell><b>Manage</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.due}</TableCell>
                  <TableCell>{item.priority}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      size="small"
                      color={
                        item.status === "Completed"
                          ? "success"
                          : item.status === "In Progress"
                          ? "warning"
                          : "default"
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined">
                      {item.status === "Completed"
                        ? "View"
                        : item.status === "In Progress"
                        ? "Update"
                        : "Review"}
                    </Button>
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

      {/* ADD / EDIT DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          {editIndex === null ? "Add Compliance Item" : "Edit Compliance Item"}
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
                label="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                select
                fullWidth
                label="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <MenuItem value="Regulatory">Regulatory</MenuItem>
                <MenuItem value="Employment">Employment</MenuItem>
                <MenuItem value="IP">IP</MenuItem>
                <MenuItem value="Corporate">Corporate</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                type="date"
                fullWidth
                label="Due Date"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setForm({ ...form, due: e.target.value })}
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
                <MenuItem value="Critical">Critical</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                select
                fullWidth
                label="Status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: "#1f4d3a" }} onClick={handleSave}>
            {editIndex === null ? "Add Item" : "Update Item"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE CONFIRMATION */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          Confirm Delete
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Typography>Are you sure you want to delete this compliance item?</Typography>
          <Typography fontWeight="bold" mt={2}>
            {items[deleteIndex]?.title}
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

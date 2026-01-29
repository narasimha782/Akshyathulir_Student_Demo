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
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CloseIcon from "@mui/icons-material/Close";

export default function MyClients() {
  /* ================= STATE ================= */
  const [clients, setClients] = useState([
    {
      company: "ABC Technologies",
      contact: "Ravi Kumar",
      email: "ravi@abc.com",
      industry: "IT Services",
      project: "Web Platform",
      startDate: "Jan 2026",
      status: "Active",
    },
    {
      company: "StartupX",
      contact: "Anjali Sharma",
      email: "anjali@startupx.com",
      industry: "FinTech",
      project: "Mobile App",
      startDate: "Feb 2026",
      status: "Active",
    },
    {
      company: "GreenEnergy Ltd",
      contact: "Suresh Patel",
      email: "suresh@greenenergy.com",
      industry: "Energy",
      project: "Dashboard System",
      startDate: "Mar 2026",
      status: "Completed",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [form, setForm] = useState({
    company: "",
    contact: "",
    email: "",
    industry: "",
    project: "",
    startDate: "",
    status: "Active",
  });

  /* ================= ADD ================= */
  const openAdd = () => {
    setEditIndex(null);
    setForm({
      company: "",
      contact: "",
      email: "",
      industry: "",
      project: "",
      startDate: "",
      status: "Active",
    });
    setOpen(true);
  };

  /* ================= EDIT ================= */
  const openEdit = (index) => {
    setEditIndex(index);
    setForm(clients[index]);
    setOpen(true);
  };

  /* ================= SAVE ================= */
  const handleSave = () => {
    if (editIndex === null) {
      setClients([...clients, form]);
    } else {
      const updated = [...clients];
      updated[editIndex] = form;
      setClients(updated);
    }
    setOpen(false);
  };

  /* ================= DELETE ================= */
  const openDelete = (index) => {
    setDeleteIndex(index);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    setClients(clients.filter((_, i) => i !== deleteIndex));
    setDeleteOpen(false);
  };

  return (
    <Box>
      {/* ================= PAGE HEADER ================= */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <PeopleAltIcon color="success" />
          My Clients
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: "#1f4d3a" }}
          onClick={openAdd}
        >
          Add Client
        </Button>
      </Box>

      {/* ================= METRIC CARDS (UNCHANGED) ================= */}
      <Grid container spacing={3} mb={4}>
        {[
          { t: "Total Clients", v: 3, s: "All registered clients" },
          { t: "Active Clients", v: 2, s: "Ongoing projects" },
          { t: "Industries", v: 3, s: "Different sectors" },
          { t: "Completed Projects", v: 1, s: "Delivered successfully" },
        ].map((m, i) => (
          <Grid key={i} size={{ xs: 12, md: 3 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography>{m.t}</Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ color: "#1f4d3a", my: 1 }}>
                  {m.v}
                </Typography>
                <Typography color="text.secondary">{m.s}</Typography>
                <Box display="flex" gap={1} mt={2}>
                  <Chip label="+0 today" color="success" size="small" />
                  <Chip label="↑ 0%" color="success" size="small" variant="outlined" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ================= CLIENT TABLE ================= */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Client Details
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Company</b></TableCell>
                <TableCell><b>Contact Person</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Industry</b></TableCell>
                <TableCell><b>Project</b></TableCell>
                <TableCell><b>Start Date</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {clients.map((c, index) => (
                <TableRow key={index}>
                  <TableCell>{c.company}</TableCell>
                  <TableCell>{c.contact}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.industry}</TableCell>
                  <TableCell>{c.project}</TableCell>
                  <TableCell>{c.startDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={c.status}
                      color={c.status === "Active" ? "success" : "default"}
                      size="small"
                    />
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

      {/* ================= ADD / EDIT CLIENT ================= */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          {editIndex === null ? "Add Client" : "Edit Client"}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Company Name"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Contact Person"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Industry"
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Project"
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                type="date"
                fullWidth
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                select
                fullWidth
                label="Status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: "#1f4d3a" }} onClick={handleSave}>
            {editIndex === null ? "Add Client" : "Update Client"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= DELETE CONFIRMATION ================= */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          Confirm Delete
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Typography>Are you sure you want to delete this client?</Typography>
          <Typography fontWeight="bold" mt={2}>
            {clients[deleteIndex]?.company}
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
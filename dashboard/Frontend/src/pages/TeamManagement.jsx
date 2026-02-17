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

import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

/* ================= DEPARTMENT → ROLES ================= */
const departmentRoles = {
  Engineering: ["Developer", "QA Engineer", "DevOps", "CTO"],
  Product: ["Product Manager", "UX Designer"],
  Marketing: ["Marketing Lead", "SEO Specialist", "Content Writer"],
  Finance: ["Accountant", "Finance Manager"],
};

export default function TeamManagement() {
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // DELETE CONFIRMATION STATE
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  /* ================= TEAM DATA ================= */
  const [members, setMembers] = useState([
    {
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah@company.com",
      gender: "Female",
      dept: "Engineering",
      role: "CTO",
      date: "Jan 2026",
      status: "Active",
    },
    {
      firstName: "Mike",
      lastName: "Chen",
      email: "mike@company.com",
      gender: "Male",
      dept: "Engineering",
      role: "Developer",
      date: "Feb 2026",
      status: "Active",
    },
    {
      firstName: "Emily",
      lastName: "Davis",
      email: "emily@company.com",
      gender: "Female",
      dept: "Product",
      role: "Product Manager",
      date: "Mar 2026",
      status: "Active",
    },
  ]);

  /* ================= METRIC CALCULATIONS ================= */
  const totalMembers = members.length;

  const currentMonth = new Date().toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });

  const newHires = members.filter((m) => m.date === currentMonth).length;

  const departments = new Set(members.map((m) => m.dept)).size;

  const growthRate =
    totalMembers > 0 ? Math.round((newHires / totalMembers) * 100) : 0;

  /* ================= FORM STATE ================= */
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    date: "",
    dept: "",
    role: "",
    status: "Active",
  });

  const openAdd = () => {
    setEditIndex(null);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      date: "",
      dept: "",
      role: "",
      status: "Active",
    });
    setOpen(true);
  };

  const openEdit = (index) => {
    const m = members[index];
    setEditIndex(index);
    setForm({ ...m, date: "" });
    setOpen(true);
  };

  const closeDialog = () => setOpen(false);

  /* ================= SAVE ================= */
  const handleSave = () => {
    if (!form.firstName || !form.lastName || !form.dept || !form.role) return;

    const formattedDate = form.date
      ? new Date(form.date).toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        })
      : members[editIndex]?.date;

    const updatedMember = { ...form, date: formattedDate };

    if (editIndex === null) {
      setMembers([...members, updatedMember]);
    } else {
      const updated = [...members];
      updated[editIndex] = updatedMember;
      setMembers(updated);
    }

    closeDialog();
  };

  /* ================= DELETE FLOW ================= */
  const openDeleteDialog = (index) => {
    setDeleteIndex(index);
    setDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
    setDeleteIndex(null);
  };

  const confirmDelete = () => {
    setMembers(members.filter((_, i) => i !== deleteIndex));
    closeDeleteDialog();
  };

  return (
    <Box>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <GroupIcon color="success" />
          Team Management
        </Typography>

        <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: "#1f4d3a" }} onClick={openAdd}>
          Add Member
        </Button>
      </Box>

      {/* METRIC CARDS */}
      <Grid container spacing={3} mb={4}>
        {[
          { title: "Total Team Members", value: totalMembers, sub: "Across all departments" },
          { title: "New Hires", value: newHires, sub: "This month" },
          { title: "Departments", value: departments, sub: "Active departments" },
          { title: "Growth Rate", value: `${growthRate}%`, sub: "Team growth this quarter" },
        ].map((m, i) => (
          <Grid key={i} size={{ xs: 12, md: 3 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography>{m.title}</Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ color: "#1f4d3a" }}>
                  {m.value}
                </Typography>
                <Typography color="text.secondary">{m.sub}</Typography>
                <Box display="flex" gap={1} mt={2}>
                  <Chip label="+0 today" color="success" size="small" />
                  <Chip label="↑ 0%" color="success" size="small" variant="outlined" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* TABLE */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>Team Members</Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Gender</b></TableCell>
                <TableCell><b>Department</b></TableCell>
                <TableCell><b>Role</b></TableCell>
                <TableCell><b>Join Date</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {members.map((m, index) => (
                <TableRow key={index}>
                  <TableCell>{m.firstName} {m.lastName}</TableCell>
                  <TableCell>{m.email}</TableCell>
                  <TableCell>{m.gender}</TableCell>
                  <TableCell>{m.dept}</TableCell>
                  <TableCell>{m.role}</TableCell>
                  <TableCell>{m.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={m.status}
                      color={m.status === "Active" ? "success" : "default"}
                      size="small"
                    />
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
      <Dialog open={open} onClose={closeDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          {editIndex === null ? "Add Team Member" : "Edit Team Member"}
          <IconButton onClick={closeDialog} sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField label="First Name" fullWidth value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField label="Last Name" fullWidth value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField label="Email ID" fullWidth value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField select label="Gender" fullWidth value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField type="date" label="Date of Joining" fullWidth InputLabelProps={{ shrink: true }}
                onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField select label="Department" fullWidth value={form.dept}
                onChange={(e) => setForm({ ...form, dept: e.target.value, role: "" })}>
                {Object.keys(departmentRoles).map((d) => (
                  <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField select label="Role" fullWidth disabled={!form.dept}
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}>
                {(departmentRoles[form.dept] || []).map((r) => (
                  <MenuItem key={r} value={r}>{r}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField select label="Status" fullWidth value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: "#1f4d3a" }} onClick={handleSave}>
            {editIndex === null ? "Add Member" : "Update Member"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog open={deleteOpen} onClose={closeDeleteDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          Confirm Delete
          <IconButton onClick={closeDeleteDialog} sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Typography>Are you sure you want to delete this team member?</Typography>
          <Typography fontWeight="bold" mt={2}>
            {members[deleteIndex]?.firstName} {members[deleteIndex]?.lastName}
          </Typography>
          <Typography color="text.secondary" mt={1}>
            This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

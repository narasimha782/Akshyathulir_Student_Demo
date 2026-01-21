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
import GroupsIcon from "@mui/icons-material/Groups";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import TodayIcon from "@mui/icons-material/Today";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function MetricCard({ title, value, subtitle }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0px 10px 30px rgba(0,0,0,0.06)",
        height: "100%",
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
              sx={{
                bgcolor: "#E8F5E9",
                color: "#2E7D32",
                fontWeight: 600,
                borderRadius: 10,
              }}
            />
            <Chip
              icon={<ArrowUpwardIcon sx={{ fontSize: 16 }} />}
              label="0%"
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

export default function TeamManagement() {
  // ✅ Initializing with only two team members
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Ravi",
      role: "CTO",
      department: "Engineering",
      joinDate: "Jan 2026",
      status: "Active",
    },
    {
      id: 2,
      name: "Mahesh",
      role: "Lead Developer",
      department: "Engineering",
      joinDate: "Feb 2026",
      status: "Active",
    },
  ]);

  const departmentsCount = useMemo(() => {
    return new Set(members.map((m) => m.department)).size;
  }, [members]);

  const newHiresThisMonth = 2;
  const growthRate = "0%";

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    department: "Engineering",
    joinDate: "",
    status: "Active",
  });

  const resetForm = () => {
    setForm({
      name: "",
      role: "",
      department: "Engineering",
      joinDate: "",
      status: "Active",
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
      name: row.name,
      role: row.role,
      department: row.department,
      joinDate: row.joinDate,
      status: row.status,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditId(null);
    resetForm();
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.role.trim() || !form.joinDate.trim()) {
      alert("Please fill Name, Role and Join Date");
      return;
    }

    if (editId) {
      setMembers((prev) =>
        prev.map((m) => (m.id === editId ? { ...m, ...form } : m))
      );
    } else {
      const newMember = {
        id: Date.now(),
        ...form,
      };
      setMembers((prev) => [newMember, ...prev]);
    }

    handleClose();
  };

  const handleDelete = (id) => {
    const ok = window.confirm("Delete this member?");
    if (!ok) return;
    setMembers((prev) => prev.filter((m) => m.id !== id));
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
            <GroupsIcon sx={{ color: "#2E7D32" }} />
            <Typography variant="h5" fontWeight="bold">
              Team Management
            </Typography>
          </Box>

          <Button
            onClick={handleOpenAdd}
            variant="contained"
            startIcon={<PersonAddAlt1Icon />}
            sx={{
              bgcolor: "#1B5E20",
              borderRadius: 2,
              textTransform: "none",
              px: 2.5,
              "&:hover": { bgcolor: "#145017" },
            }}>
            Add Member
          </Button>
        </Box>
        {/*  METRIC CARDS  */}
        <Grid container spacing={2} sx={{ mb: 4, flexWrap: "nowrap" }}>
          <Grid item sx={{ flex: 1, minWidth: 0 }}>
            <MetricCard
              title="Total Team Members"
              value={members.length}
              subtitle="Across all departments"
            />
          </Grid>

          <Grid item sx={{ flex: 1, minWidth: 0 }}>
            <MetricCard
              title="New Hires"
              value={newHiresThisMonth}
              subtitle="This month"
            />
          </Grid>

          <Grid item sx={{ flex: 1, minWidth: 0 }}>
            <MetricCard
              title="Departments"
              value={departmentsCount}
              subtitle="Active departments"/></Grid>
          <Grid item sx={{ flex: 1, minWidth: 0 }}>
            <MetricCard
              title="Growth Rate"
              value={growthRate}
              subtitle="Team growth this quarter"/>
          </Grid>
        </Grid>
        {/* TABLE CARD */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Team Members
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Join Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {members.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.department}</TableCell>
                    <TableCell>{row.joinDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        sx={{
                          bgcolor: "#A5D6A7",
                          color: "#1B5E20",
                          fontWeight: 600,
                          borderRadius: 10,
                          px: 1,
                        }}
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

        {/* ===== ADD / EDIT MEMBER DIALOG ===== */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: "bold" }}>
            {editId ? "Edit Member" : "Add Member"}
          </DialogTitle>

          <DialogContent sx={{ pt: 1 }}>
            <Stack spacing={2} mt={1}>
              <TextField
                label="Name"
                fullWidth
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <TextField
                label="Role"
                fullWidth
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />

              <TextField
                label="Department"
                select
                fullWidth
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
              >
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Product">Product</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Operations">Operations</MenuItem>
              </TextField>

              <TextField
                label="Join Date"
                fullWidth
                placeholder="Jan 2026"
                value={form.joinDate}
                onChange={(e) => setForm({ ...form, joinDate: e.target.value })}
              />

              <TextField
                label="Status"
                select
                fullWidth
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
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
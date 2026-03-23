import { useState, useEffect } from "react";
import {
  Box, Typography, Grid, Card, CardContent, Button, Chip,
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, CircularProgress,
} from "@mui/material";
import GroupIcon   from "@mui/icons-material/Group";
import AddIcon     from "@mui/icons-material/Add";
import EditIcon    from "@mui/icons-material/Edit";
import DeleteIcon  from "@mui/icons-material/Delete";
import CloseIcon   from "@mui/icons-material/Close";
import Api from "./api";
import { useEmail } from "../context/EmailContext";
import NoEmailGuard from "../components/NoEmailGuard";

const departmentRoles = {
  Engineering: ["Developer", "QA Engineer", "DevOps", "CTO"],
  Product:     ["Product Manager", "UX Designer"],
  Marketing:   ["Marketing Lead", "SEO Specialist", "Content Writer"],
  Finance:     ["Accountant", "Finance Manager"],
};

export default function TeamManagement() {
  const { activeEmail } = useEmail();
  const [members,     setMembers]     = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [open,        setOpen]        = useState(false);
  const [editId,      setEditId]      = useState(null);
  const [deleteOpen,  setDeleteOpen]  = useState(false);
  const [deleteId,    setDeleteId]    = useState(null);
  const [deleteName,  setDeleteName]  = useState("");

  const emptyForm = { firstName:"", lastName:"", email:"", gender:"", date:"", dept:"", role:"", status:"Active" };
  const [form, setForm] = useState(emptyForm);

  /* ── FETCH ── */
  useEffect(() => {
    if (activeEmail) fetchMembers();
    else setLoading(false);
  }, [activeEmail]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const { data } = await Api.get(`/team?email=${encodeURIComponent(activeEmail)}`);
      setMembers(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  /* ── METRICS ── */
  const totalMembers = members.length;
  const currentMonth = new Date().toLocaleString("en-US", { month:"short", year:"numeric" });
  const newHires     = members.filter(m => m.date === currentMonth).length;
  const departments  = new Set(members.map(m => m.dept)).size;
  const growthRate   = totalMembers > 0 ? Math.round((newHires / totalMembers) * 100) : 0;

  /* ── OPEN ADD ── */
  const openAdd = () => { setEditId(null); setForm(emptyForm); setOpen(true); };

  /* ── OPEN EDIT ── */
  const openEdit = (m) => {
    setEditId(m._id);
    setForm({ firstName:m.firstName, lastName:m.lastName, email:m.email,
              gender:m.gender, date:"", dept:m.dept, role:m.role, status:m.status });
    setOpen(true);
  };

  /* ── SAVE ── */
  const handleSave = async () => {
    if (!form.firstName || !form.lastName || !form.dept || !form.role) return;
    const formattedDate = form.date
      ? new Date(form.date).toLocaleString("en-US", { month:"short", year:"numeric" })
      : (editId ? members.find(m => m._id === editId)?.date : currentMonth);
    const payload = { ...form, date: formattedDate, userEmail: activeEmail };
    try {
      if (editId) await Api.put(`/team/${editId}`, payload);
      else        await Api.post("/team", payload);
      fetchMembers();
      setOpen(false);
    } catch (e) { console.error(e); }
  };

  /* ── DELETE ── */
  const openDeleteDialog = (m) => { setDeleteId(m._id); setDeleteName(`${m.firstName} ${m.lastName}`); setDeleteOpen(true); };
  const confirmDelete    = async () => {
    try { await Api.delete(`/team/${deleteId}`); fetchMembers(); setDeleteOpen(false); }
    catch (e) { console.error(e); }
  };

  if (!activeEmail) return <NoEmailGuard />;
  if (loading) return <Box display="flex" justifyContent="center" mt={6}><CircularProgress /></Box>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <GroupIcon color="success" /> Team Management
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor:"#1f4d3a" }} onClick={openAdd}>
          Add Member
        </Button>
      </Box>

      <Grid container spacing={3} mb={4}>
        {[
          { title:"Total Team Members", value:totalMembers,    sub:"Across all departments" },
          { title:"New Hires",          value:newHires,         sub:"This month" },
          { title:"Departments",        value:departments,      sub:"Active departments" },
          { title:"Growth Rate",        value:`${growthRate}%`, sub:"Team growth this quarter" },
        ].map((m, i) => (
          <Grid key={i} size={{ xs:12, md:3 }}>
            <Card sx={{ borderRadius:3 }}>
              <CardContent>
                <Typography>{m.title}</Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ color:"#1f4d3a" }}>{m.value}</Typography>
                <Typography color="text.secondary">{m.sub}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>Team Members</Typography>
          <Table>
            <TableHead>
              <TableRow>
                {["Name","Email","Gender","Department","Role","Join Date","Status","Actions"].map(h => (
                  <TableCell key={h}><b>{h}</b></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((m) => (
                <TableRow key={m._id}>
                  <TableCell>{m.firstName} {m.lastName}</TableCell>
                  <TableCell>{m.email}</TableCell>
                  <TableCell>{m.gender}</TableCell>
                  <TableCell>{m.dept}</TableCell>
                  <TableCell>{m.role}</TableCell>
                  <TableCell>{m.date}</TableCell>
                  <TableCell>
                    <Chip label={m.status} color={m.status==="Active"?"success":"default"} size="small" />
                  </TableCell>
                  <TableCell>
                    <IconButton color="success" onClick={() => openEdit(m)}><EditIcon /></IconButton>
                    <IconButton color="error"   onClick={() => openDeleteDialog(m)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {members.length === 0 && (
                <TableRow><TableCell colSpan={8} align="center">No team members yet. Add one!</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ADD / EDIT DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor:"#1f4d3a", color:"#fff" }}>
          {editId === null ? "Add Team Member" : "Edit Team Member"}
          <IconButton onClick={() => setOpen(false)} sx={{ position:"absolute", right:8, top:8, color:"#fff" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt:2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs:12, md:6 }}>
              <TextField label="First Name" fullWidth value={form.firstName}
                onChange={e => setForm({...form, firstName:e.target.value})} />
            </Grid>
            <Grid size={{ xs:12, md:6 }}>
              <TextField label="Last Name" fullWidth value={form.lastName}
                onChange={e => setForm({...form, lastName:e.target.value})} />
            </Grid>
            <Grid size={{ xs:12, md:6 }}>
              <TextField label="Email" fullWidth value={form.email}
                onChange={e => setForm({...form, email:e.target.value})} />
            </Grid>
            <Grid size={{ xs:12, md:6 }}>
              <TextField select label="Gender" fullWidth value={form.gender}
                onChange={e => setForm({...form, gender:e.target.value})}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs:12, md:6 }}>
              <TextField type="date" label="Date of Joining" fullWidth InputLabelProps={{ shrink:true }}
                onChange={e => setForm({...form, date:e.target.value})} />
            </Grid>
            <Grid size={{ xs:12, md:6 }}>
              <TextField select label="Department" fullWidth value={form.dept}
                onChange={e => setForm({...form, dept:e.target.value, role:""})}>
                {Object.keys(departmentRoles).map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs:12, md:6 }}>
              <TextField select label="Role" fullWidth disabled={!form.dept} value={form.role}
                onChange={e => setForm({...form, role:e.target.value})}>
                {(departmentRoles[form.dept]||[]).map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs:12, md:6 }}>
              <TextField select label="Status" fullWidth value={form.status}
                onChange={e => setForm({...form, status:e.target.value})}>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p:2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor:"#1f4d3a" }} onClick={handleSave}>
            {editId === null ? "Add Member" : "Update Member"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE DIALOG */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor:"#1f4d3a", color:"#fff" }}>Confirm Delete</DialogTitle>
        <DialogContent sx={{ mt:2 }}>
          <Typography>Are you sure you want to delete this team member?</Typography>
          <Typography fontWeight="bold" mt={2}>{deleteName}</Typography>
          <Typography color="text.secondary" mt={1}>This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
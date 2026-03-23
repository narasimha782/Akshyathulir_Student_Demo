import { useState, useEffect } from "react";
import {
  Box, Typography, Grid, Card, CardContent, Chip, Button,
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, CircularProgress,
} from "@mui/material";
import EditIcon     from "@mui/icons-material/Edit";
import DeleteIcon   from "@mui/icons-material/Delete";
import AddIcon      from "@mui/icons-material/Add";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CloseIcon    from "@mui/icons-material/Close";
import Api from "./api";
import { useEmail } from "../context/EmailContext";
import NoEmailGuard from "../components/NoEmailGuard";

export default function MyClients() {
  const { activeEmail } = useEmail();
  const [clients,    setClients]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [open,       setOpen]       = useState(false);
  const [editId,     setEditId]     = useState(null);
  const [deleteId,   setDeleteId]   = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);

  const emptyForm = { company:"", contact:"", email:"", industry:"", project:"", startDate:"", status:"Active" };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (activeEmail) fetchClients();
    else setLoading(false);
  }, [activeEmail]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const { data } = await Api.get(`/clients?email=${encodeURIComponent(activeEmail)}`);
      setClients(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  /* ── METRICS ── */
  const totalClients     = clients.length;
  const activeClients    = clients.filter(c => c.status === "Active").length;
  const industries       = new Set(clients.map(c => c.industry)).size;
  const completedProjects = clients.filter(c => c.status === "Completed").length;

  const openAdd  = () => { setEditId(null); setForm(emptyForm); setOpen(true); };
  const openEdit = (c)  => { setEditId(c._id); setForm({ company:c.company, contact:c.contact, email:c.email,
    industry:c.industry, project:c.project, startDate:"", status:c.status }); setOpen(true); };

  const handleSave = async () => {
    const startDate = form.startDate
      ? new Date(form.startDate).toLocaleString("en-US", { month:"short", year:"numeric" })
      : (editId ? clients.find(c => c._id === editId)?.startDate : "");
    const payload = { ...form, startDate, userEmail: activeEmail };
    try {
      if (editId) await Api.put(`/clients/${editId}`, payload);
      else        await Api.post("/clients", payload);
      fetchClients();
      setOpen(false);
    } catch (e) { console.error(e); }
  };

  const openDelete   = (c)  => { setDeleteId(c._id); setDeleteName(c.company); setDeleteOpen(true); };
  const confirmDelete = async () => {
    try { await Api.delete(`/clients/${deleteId}`); fetchClients(); setDeleteOpen(false); }
    catch (e) { console.error(e); }
  };

  if (!activeEmail) return <NoEmailGuard />;
  if (loading) return <Box display="flex" justifyContent="center" mt={6}><CircularProgress /></Box>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <PeopleAltIcon color="success" /> My Clients
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor:"#1f4d3a" }} onClick={openAdd}>
          Add Client
        </Button>
      </Box>

      <Grid container spacing={3} mb={4}>
        {[
          { t:"Total Clients",       v:totalClients,      s:"All registered clients" },
          { t:"Active Clients",      v:activeClients,     s:"Ongoing projects" },
          { t:"Industries",          v:industries,        s:"Different sectors" },
          { t:"Completed Projects",  v:completedProjects, s:"Delivered successfully" },
        ].map((m, i) => (
          <Grid key={i} size={{ xs:12, md:3 }}>
            <Card sx={{ borderRadius:3 }}>
              <CardContent>
                <Typography>{m.t}</Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ color:"#1f4d3a", my:1 }}>{m.v}</Typography>
                <Typography color="text.secondary">{m.s}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>Client Details</Typography>
          <Table>
            <TableHead>
              <TableRow>
                {["Company","Contact Person","Email","Industry","Project","Start Date","Status","Actions"].map(h => (
                  <TableCell key={h}><b>{h}</b></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map(c => (
                <TableRow key={c._id}>
                  <TableCell>{c.company}</TableCell>
                  <TableCell>{c.contact}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.industry}</TableCell>
                  <TableCell>{c.project}</TableCell>
                  <TableCell>{c.startDate}</TableCell>
                  <TableCell>
                    <Chip label={c.status} color={c.status==="Active"?"success":"default"} size="small" />
                  </TableCell>
                  <TableCell>
                    <IconButton color="success" onClick={() => openEdit(c)}><EditIcon /></IconButton>
                    <IconButton color="error"   onClick={() => openDelete(c)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {clients.length === 0 && (
                <TableRow><TableCell colSpan={8} align="center">No clients yet. Add one!</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ADD / EDIT */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor:"#1f4d3a", color:"#fff" }}>
          {editId === null ? "Add Client" : "Edit Client"}
          <IconButton onClick={() => setOpen(false)} sx={{ position:"absolute", right:8, top:8, color:"#fff" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt:2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs:12, md:6 }}>
              <TextField fullWidth label="Company Name" value={form.company}
                onChange={e => setForm({...form, company:e.target.value})} />
            </Grid>
            <Grid size={{ xs:12, md:6 }}>
              <TextField fullWidth label="Contact Person" value={form.contact}
                onChange={e => setForm({...form, contact:e.target.value})} />
            </Grid>
            <Grid size={{ xs:12, md:6 }}>
              <TextField fullWidth label="Email" value={form.email}
                onChange={e => setForm({...form, email:e.target.value})} />
            </Grid>
            <Grid size={{ xs:12, md:6 }}>
              <TextField fullWidth label="Industry" value={form.industry}
                onChange={e => setForm({...form, industry:e.target.value})} />
            </Grid>
            <Grid size={{ xs:12, md:6 }}>
              <TextField fullWidth label="Project" value={form.project}
                onChange={e => setForm({...form, project:e.target.value})} />
            </Grid>
            <Grid size={{ xs:12, md:3 }}>
              <TextField type="date" fullWidth label="Start Date" InputLabelProps={{ shrink:true }}
                onChange={e => setForm({...form, startDate:e.target.value})} />
            </Grid>
            <Grid size={{ xs:12, md:3 }}>
              <TextField select fullWidth label="Status" value={form.status}
                onChange={e => setForm({...form, status:e.target.value})}>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p:2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor:"#1f4d3a" }} onClick={handleSave}>
            {editId === null ? "Add Client" : "Update Client"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor:"#1f4d3a", color:"#fff" }}>Confirm Delete</DialogTitle>
        <DialogContent sx={{ mt:2 }}>
          <Typography>Are you sure you want to delete this client?</Typography>
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
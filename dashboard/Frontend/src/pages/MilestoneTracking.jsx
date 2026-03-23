import { useState, useEffect } from "react";
import {
  Box, Typography, Grid, Card, CardContent, Chip, Button,
  Table, TableHead, TableRow, TableCell, TableBody, LinearProgress,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, CircularProgress,
} from "@mui/material";
import EditIcon     from "@mui/icons-material/Edit";
import DeleteIcon   from "@mui/icons-material/Delete";
import AddIcon      from "@mui/icons-material/Add";
import TimelineIcon from "@mui/icons-material/Timeline";
import CloseIcon    from "@mui/icons-material/Close";
import Api from "./api";
import { useEmail } from "../context/EmailContext";
import NoEmailGuard from "../components/NoEmailGuard";

export default function MilestoneTracking() {
  const { activeEmail } = useEmail();
  const [milestones,  setMilestones]  = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [open,        setOpen]        = useState(false);
  const [editId,      setEditId]      = useState(null);
  const [deleteOpen,  setDeleteOpen]  = useState(false);
  const [deleteId,    setDeleteId]    = useState(null);
  const [deleteName,  setDeleteName]  = useState("");

  const emptyForm = { title:"", category:"Product", dueDate:"", priority:"Medium", status:"Planning", progress:0 };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (activeEmail) fetchMilestones();
    else setLoading(false);
  }, [activeEmail]);

  const fetchMilestones = async () => {
    try {
      setLoading(true);
      const { data } = await Api.get(`/milestones?email=${encodeURIComponent(activeEmail)}`);
      setMilestones(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  /* ── METRICS ── */
  const total      = milestones.length;
  const completed  = milestones.filter(m => m.status === "Completed").length;
  const upcoming   = milestones.filter(m => m.status === "Planning").length;
  const overdue    = milestones.filter(m => {
    if (!m.dueDate) return false;
    return new Date(m.dueDate) < new Date() && m.status !== "Completed";
  }).length;

  const openAdd  = () => { setEditId(null); setForm(emptyForm); setOpen(true); };
  const openEdit = (m) => {
    setEditId(m._id);
    setForm({ title:m.title, category:m.category, dueDate:"", priority:m.priority, status:m.status, progress:m.progress });
    setOpen(true);
  };

  const handleSave = async () => {
    const dueDate = form.dueDate || (editId ? milestones.find(m => m._id === editId)?.dueDate : "");
    const payload = { ...form, dueDate, userEmail: activeEmail };
    try {
      if (editId) await Api.put(`/milestones/${editId}`, payload);
      else        await Api.post("/milestones", payload);
      fetchMilestones();
      setOpen(false);
    } catch (e) { console.error(e); }
  };

  const openDeleteDialog = (m) => { setDeleteId(m._id); setDeleteName(m.title); setDeleteOpen(true); };
  const confirmDelete    = async () => {
    try { await Api.delete(`/milestones/${deleteId}`); fetchMilestones(); setDeleteOpen(false); }
    catch (e) { console.error(e); }
  };

  if (!activeEmail) return <NoEmailGuard />;
  if (loading) return <Box display="flex" justifyContent="center" mt={6}><CircularProgress /></Box>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <TimelineIcon color="success" /> Milestone Tracking
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor:"#1f4d3a" }} onClick={openAdd}>
          Add Milestone
        </Button>
      </Box>

      <Grid container spacing={3} mb={4}>
        {[
          { title:"Total Milestones", value:total,     sub:"This quarter" },
          { title:"Completed",        value:completed, sub:"On schedule" },
          { title:"Upcoming",         value:upcoming,  sub:"In planning" },
          { title:"Overdue",          value:overdue,   sub:"Needs attention" },
        ].map((m, i) => (
          <Grid key={i} size={{ xs:12, md:3 }}>
            <Card sx={{ borderRadius:3 }}>
              <CardContent>
                <Typography>{m.title}</Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ color:"#1f4d3a", my:1 }}>{m.value}</Typography>
                <Typography color="text.secondary">{m.sub}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>Current Milestones</Typography>
          <Table>
            <TableHead>
              <TableRow>
                {["Milestone","Category","Due Date","Priority","Status","Progress","Actions"].map(h => (
                  <TableCell key={h}><b>{h}</b></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {milestones.map(m => (
                <TableRow key={m._id}>
                  <TableCell>{m.title}</TableCell>
                  <TableCell>{m.category}</TableCell>
                  <TableCell>{m.dueDate}</TableCell>
                  <TableCell>{m.priority}</TableCell>
                  <TableCell>
                    <Chip label={m.status}
                      color={m.status==="Completed"?"success":m.status==="In Progress"?"warning":"default"}
                      size="small" />
                  </TableCell>
                  <TableCell sx={{ width:160 }}>
                    <LinearProgress variant="determinate" value={m.progress} sx={{ height:8, borderRadius:5 }} />
                    <Typography variant="body2" mt={0.5}>{m.progress}%</Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton color="success" onClick={() => openEdit(m)}><EditIcon /></IconButton>
                    <IconButton color="error"   onClick={() => openDeleteDialog(m)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {milestones.length === 0 && (
                <TableRow><TableCell colSpan={7} align="center">No milestones yet. Add one!</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ADD / EDIT */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor:"#1f4d3a", color:"#fff" }}>
          {editId === null ? "Add Milestone" : "Edit Milestone"}
          <IconButton onClick={() => setOpen(false)} sx={{ position:"absolute", right:8, top:8, color:"#fff" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt:2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs:12, md:8 }}>
              <TextField fullWidth label="Title" value={form.title}
                onChange={e => setForm({...form, title:e.target.value})} />
            </Grid>
            <Grid size={{ xs:12, md:4 }}>
              <TextField select fullWidth label="Category" value={form.category}
                onChange={e => setForm({...form, category:e.target.value})}>
                <MenuItem value="Product">Product</MenuItem>
                <MenuItem value="Fundraising">Fundraising</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs:12, md:4 }}>
              <TextField type="date" fullWidth label="Due Date" InputLabelProps={{ shrink:true }}
                onChange={e => setForm({...form, dueDate:e.target.value})} />
            </Grid>
            <Grid size={{ xs:12, md:4 }}>
              <TextField select fullWidth label="Priority" value={form.priority}
                onChange={e => setForm({...form, priority:e.target.value})}>
                {["Low","Medium","High","Critical"].map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs:12, md:4 }}>
              <TextField select fullWidth label="Status" value={form.status}
                onChange={e => setForm({...form, status:e.target.value})}>
                {["Planning","In Progress","Completed"].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs:12 }}>
              <TextField fullWidth type="number" label="Progress (%)" value={form.progress}
                onChange={e => setForm({...form, progress:Number(e.target.value)})} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p:2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor:"#1f4d3a" }} onClick={handleSave}>
            {editId === null ? "Add Milestone" : "Update Milestone"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor:"#1f4d3a", color:"#fff" }}>Confirm Delete</DialogTitle>
        <DialogContent sx={{ mt:2 }}>
          <Typography>Are you sure you want to delete this milestone?</Typography>
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
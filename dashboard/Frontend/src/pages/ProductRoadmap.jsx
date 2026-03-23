import { useState, useEffect } from "react";
import {
  Box, Typography, Grid, Card, CardContent, Button, Chip,
  Table, TableHead, TableRow, TableCell, TableBody, LinearProgress,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, CircularProgress,
} from "@mui/material";
import MapIcon    from "@mui/icons-material/Map";
import AddIcon    from "@mui/icons-material/Add";
import EditIcon   from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon  from "@mui/icons-material/Close";
import Api from "./api";
import { useEmail } from "../context/EmailContext";
import NoEmailGuard from "../components/NoEmailGuard";

export default function ProductRoadmap() {
  const { activeEmail } = useEmail();
  const [features,   setFeatures]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [open,       setOpen]       = useState(false);
  const [editId,     setEditId]     = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId,   setDeleteId]   = useState(null);
  const [deleteName, setDeleteName] = useState("");

  const emptyForm = { feature:"", priority:"Medium", start:"", target:"", status:"Planned", progress:0 };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (activeEmail) fetchFeatures();
    else setLoading(false);
  }, [activeEmail]);

  const fetchFeatures = async () => {
    try {
      setLoading(true);
      const { data } = await Api.get(`/roadmap?email=${encodeURIComponent(activeEmail)}`);
      setFeatures(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  /* ── METRICS ── */
  const total      = features.length;
  const inDev      = features.filter(f => f.status === "In Development").length;
  const released   = features.filter(f => f.status === "Released").length;
  const planned    = features.filter(f => f.status === "Planned").length;

  const openAdd  = () => { setEditId(null); setForm(emptyForm); setOpen(true); };
  const openEdit = (f) => {
    setEditId(f._id);
    setForm({ feature:f.feature, priority:f.priority, start:"", target:"", status:f.status, progress:f.progress });
    setOpen(true);
  };

  const handleSave = async () => {
    const orig = editId ? features.find(f => f._id === editId) : null;
    const payload = {
      ...form,
      start:     form.start  || orig?.start  || "",
      target:    form.target || orig?.target || "",
      userEmail: activeEmail,
    };
    try {
      if (editId) await Api.put(`/roadmap/${editId}`, payload);
      else        await Api.post("/roadmap", payload);
      fetchFeatures();
      setOpen(false);
    } catch (e) { console.error(e); }
  };

  const openDelete   = (f)  => { setDeleteId(f._id); setDeleteName(f.feature); setDeleteOpen(true); };
  const confirmDelete = async () => {
    try { await Api.delete(`/roadmap/${deleteId}`); fetchFeatures(); setDeleteOpen(false); }
    catch (e) { console.error(e); }
  };

  if (!activeEmail) return <NoEmailGuard />;
  if (loading) return <Box display="flex" justifyContent="center" mt={6}><CircularProgress /></Box>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <MapIcon color="success" /> Product Roadmap
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor:"#1f4d3a" }} onClick={openAdd}>
          Add Feature
        </Button>
      </Box>

      <Grid container spacing={2} mb={3}>
        {[
          { title:"Total Features",  value:total,    sub:"In roadmap" },
          { title:"In Development",  value:inDev,    sub:"Active features" },
          { title:"Released",        value:released, sub:"Shipped" },
          { title:"Planned",         value:planned,  sub:"Next up" },
        ].map((m, i) => (
          <Grid key={i} size={{ xs:12, md:3 }}>
            <Card>
              <CardContent>
                <Typography variant="body2">{m.title}</Typography>
                <Typography variant="h4" fontWeight="bold">{m.value}</Typography>
                <Typography variant="body2" color="text.secondary">{m.sub}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>Feature Development Timeline</Typography>
          <Table>
            <TableHead>
              <TableRow>
                {["Feature","Priority","Start Date","Target Date","Status","Progress","Actions"].map(h => (
                  <TableCell key={h}><b>{h}</b></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {features.map(item => (
                <TableRow key={item._id}>
                  <TableCell>{item.feature}</TableCell>
                  <TableCell>{item.priority}</TableCell>
                  <TableCell>{item.start}</TableCell>
                  <TableCell>{item.target}</TableCell>
                  <TableCell>
                    <Chip label={item.status}
                      color={item.status==="In Development"?"success":item.status==="Released"?"primary":"default"}
                      size="small" />
                  </TableCell>
                  <TableCell sx={{ minWidth:120 }}>
                    <LinearProgress variant="determinate" value={item.progress}
                      sx={{ height:8, borderRadius:5, mb:0.5 }} />
                    <Typography variant="caption">{item.progress}%</Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton color="success" onClick={() => openEdit(item)}><EditIcon /></IconButton>
                    <IconButton color="error"   onClick={() => openDelete(item)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {features.length === 0 && (
                <TableRow><TableCell colSpan={7} align="center">No features yet. Add one!</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ADD / EDIT */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor:"#1f4d3a", color:"#fff" }}>
          {editId === null ? "Add Feature" : "Edit Feature"}
          <IconButton onClick={() => setOpen(false)} sx={{ position:"absolute", right:8, top:8, color:"#fff" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt:2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs:12, md:8 }}>
              <TextField fullWidth label="Feature Title" value={form.feature}
                onChange={e => setForm({...form, feature:e.target.value})} />
            </Grid>
            <Grid size={{ xs:12, md:4 }}>
              <TextField select fullWidth label="Priority" value={form.priority}
                onChange={e => setForm({...form, priority:e.target.value})}>
                {["Low","Medium","High"].map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs:12, md:4 }}>
              <TextField type="date" fullWidth label="Start Date" InputLabelProps={{ shrink:true }}
                onChange={e => setForm({...form, start:e.target.value})} />
            </Grid>
            <Grid size={{ xs:12, md:4 }}>
              <TextField type="date" fullWidth label="Target Date" InputLabelProps={{ shrink:true }}
                onChange={e => setForm({...form, target:e.target.value})} />
            </Grid>
            <Grid size={{ xs:12, md:4 }}>
              <TextField select fullWidth label="Status" value={form.status}
                onChange={e => setForm({...form, status:e.target.value})}>
                {["Planned","In Development","Released"].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
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
            {editId === null ? "Add Feature" : "Update Feature"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor:"#1f4d3a", color:"#fff" }}>Confirm Delete</DialogTitle>
        <DialogContent sx={{ mt:2 }}>
          <Typography>Are you sure you want to delete this feature?</Typography>
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
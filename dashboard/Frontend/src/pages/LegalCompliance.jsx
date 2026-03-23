import { useState, useEffect } from "react";
import {
  Box, Typography, Grid, Card, CardContent, Button, Chip,
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, CircularProgress,
} from "@mui/material";
import GavelIcon  from "@mui/icons-material/Gavel";
import AddIcon    from "@mui/icons-material/Add";
import EditIcon   from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon  from "@mui/icons-material/Close";
import Api from "./api";
import { useEmail } from "../context/EmailContext";
import NoEmailGuard from "../components/NoEmailGuard";

export default function LegalCompliance() {
  const { activeEmail } = useEmail();
  const [items,      setItems]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [open,       setOpen]       = useState(false);
  const [editId,     setEditId]     = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId,   setDeleteId]   = useState(null);
  const [deleteName, setDeleteName] = useState("");

  const emptyForm = { title:"", category:"Regulatory", due:"", priority:"Medium", status:"Pending" };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (activeEmail) fetchItems();
    else setLoading(false);
  }, [activeEmail]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data } = await Api.get(`/legal?email=${encodeURIComponent(activeEmail)}`);
      setItems(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  /* ── METRICS ── */
  const total      = items.length;
  const completed  = items.filter(i => i.status === "Completed").length;
  const pending    = items.filter(i => i.status === "Pending").length;
  const score      = total > 0 ? Math.round((completed / total) * 100) : 0;

  const openAdd  = () => { setEditId(null); setForm(emptyForm); setOpen(true); };
  const openEdit = (item) => {
    setEditId(item._id);
    setForm({ title:item.title, category:item.category, due:"", priority:item.priority, status:item.status });
    setOpen(true);
  };

  const handleSave = async () => {
    const due = form.due || (editId ? items.find(i => i._id === editId)?.due : "");
    const payload = { ...form, due, userEmail: activeEmail };
    try {
      if (editId) await Api.put(`/legal/${editId}`, payload);
      else        await Api.post("/legal", payload);
      fetchItems();
      setOpen(false);
    } catch (e) { console.error(e); }
  };

  const openDelete   = (item) => { setDeleteId(item._id); setDeleteName(item.title); setDeleteOpen(true); };
  const confirmDelete = async () => {
    try { await Api.delete(`/legal/${deleteId}`); fetchItems(); setDeleteOpen(false); }
    catch (e) { console.error(e); }
  };

  if (!activeEmail) return <NoEmailGuard />;
  if (loading) return <Box display="flex" justifyContent="center" mt={6}><CircularProgress /></Box>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <GavelIcon color="success" /> Legal Compliance
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor:"#1f4d3a" }} onClick={openAdd}>
          Add Item
        </Button>
      </Box>

      <Grid container spacing={2} mb={3}>
        {[
          { t:"Total Items",       v:total,       s:"Compliance requirements" },
          { t:"Completed",         v:completed,   s:"Up to date" },
          { t:"Pending",           v:pending,     s:"Needs attention" },
          { t:"Compliance Score",  v:`${score}%`, s:"Overall health" },
        ].map((c, i) => (
          <Grid key={i} size={{ xs:12, md:3 }}>
            <Card>
              <CardContent>
                <Typography variant="body2">{c.t}</Typography>
                <Typography variant="h4" fontWeight="bold">{c.v}</Typography>
                <Typography variant="body2" color="text.secondary">{c.s}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>Compliance Checklist</Typography>
          <Table>
            <TableHead>
              <TableRow>
                {["Requirement","Category","Due Date","Priority","Status","Action","Manage"].map(h => (
                  <TableCell key={h}><b>{h}</b></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item => (
                <TableRow key={item._id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.due}</TableCell>
                  <TableCell>{item.priority}</TableCell>
                  <TableCell>
                    <Chip label={item.status} size="small"
                      color={item.status==="Completed"?"success":item.status==="In Progress"?"warning":"default"} />
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined">
                      {item.status==="Completed"?"View":item.status==="In Progress"?"Update":"Review"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <IconButton color="success" onClick={() => openEdit(item)}><EditIcon /></IconButton>
                    <IconButton color="error"   onClick={() => openDelete(item)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow><TableCell colSpan={7} align="center">No compliance items yet. Add one!</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ADD / EDIT */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor:"#1f4d3a", color:"#fff" }}>
          {editId === null ? "Add Compliance Item" : "Edit Compliance Item"}
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
                {["Regulatory","Employment","IP","Corporate"].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs:12, md:4 }}>
              <TextField type="date" fullWidth label="Due Date" InputLabelProps={{ shrink:true }}
                onChange={e => setForm({...form, due:e.target.value})} />
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
                {["Pending","In Progress","Completed"].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p:2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor:"#1f4d3a" }} onClick={handleSave}>
            {editId === null ? "Add Item" : "Update Item"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor:"#1f4d3a", color:"#fff" }}>Confirm Delete</DialogTitle>
        <DialogContent sx={{ mt:2 }}>
          <Typography>Are you sure you want to delete this compliance item?</Typography>
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
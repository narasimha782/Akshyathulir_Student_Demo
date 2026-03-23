import React, { useState, useEffect } from "react";
import {
  Box, Card, CardContent, Typography, Button, TextField,
  Grid, IconButton, Chip, Dialog, DialogTitle, DialogContent,
  DialogActions, MenuItem, InputAdornment, Stack, Divider,
  CircularProgress,
} from "@mui/material";
import Api          from "./api";
import AddIcon      from "@mui/icons-material/Add";
import SearchIcon   from "@mui/icons-material/Search";
import Visibility   from "@mui/icons-material/Visibility";
import EditIcon     from "@mui/icons-material/Edit";
import DeleteIcon   from "@mui/icons-material/Delete";
import SchoolIcon   from "@mui/icons-material/School";
import CloseIcon    from "@mui/icons-material/Close";
import AccessTimeIcon     from "@mui/icons-material/AccessTime";
import CurrencyRupeeIcon  from "@mui/icons-material/CurrencyRupee";
import PeopleIcon         from "@mui/icons-material/People";
import PersonIcon         from "@mui/icons-material/Person";
import { useEmail }       from "../context/EmailContext";
import NoEmailGuard       from "../components/NoEmailGuard";

/* ─── constants ─────────────────────────────────────────────── */
const GREEN      = "#1f4d3a";
const GREEN_DARK = "#163d2e";

const EMPTY = {
  name:"", category:"", duration:"", fees:"",
  status:"", trainer:"", description:"", syllabus:"", outcomes:"",
};



const STATUS_COLORS = {
  "Active":   { bg:"#e8f5e9", color:"#2e7d32" },
  "Draft":    { bg:"#fff8e1", color:"#f57f17" },
  "Inactive": { bg:"#ffebee", color:"#c62828" },
};

export default function Courses() {
  const { activeEmail } = useEmail();

  const [courses,        setCourses]     = useState([]);
  const [loading,        setLoading]     = useState(true);
  const [search,         setSearch]      = useState("");
  const [openAdd,        setOpenAdd]     = useState(false);
  const [detailsOpen,    setDetailsOpen] = useState(false);
  const [selectedCourse, setSelected]    = useState(null);
  const [form,           setForm]        = useState(EMPTY);
  const [errors,         setErrors]      = useState({});
  const [isEdit,         setIsEdit]      = useState(false);
  const [editId,         setEditId]      = useState(null);
  const [deleteDialog,   setDeleteDlg]   = useState(false);
  const [deleteTarget,   setDeleteTgt]   = useState(null);

  useEffect(() => { fetchCourses(); }, []);

  /* ─── fetch ALL courses from DB ──────────────────────────── */
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data } = await Api.get("/courses");
      setCourses(data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  /* ─── validate ────────────────────────────────────────────── */
  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name        = "Required";
    if (!form.category.trim())    e.category    = "Required";
    if (!form.duration.trim())    e.duration    = "Required";
    if (!form.fees.trim())        e.fees        = "Required";
    else if (!/^\d+$/.test(form.fees.trim())) e.fees = "Numbers only";
    if (!form.trainer.trim())     e.trainer     = "Required";
    else if (!/^[A-Za-z\s.]+$/.test(form.trainer.trim())) e.trainer = "Letters only";
    if (!form.status.trim())      e.status      = "Required";
    if (!form.description.trim()) e.description = "Required";
    if (!form.syllabus.trim())    e.syllabus    = "Required";
    if (!form.outcomes.trim())    e.outcomes    = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ─── save ────────────────────────────────────────────────── */
  const handleSave = async () => {
    if (!validate()) return;
    const payload = {
      email:       activeEmail,
      name:        form.name,
      category:    form.category,
      duration:    form.duration,
      fees:        form.fees,
      trainer:     form.trainer,
      status:      form.status,
      description: form.description,
      syllabus:    form.syllabus.split(",").map(s => s.trim()).filter(Boolean),
      outcomes:    form.outcomes.split(",").map(o => o.trim()).filter(Boolean),
      enrolled:    0,
    };
    try {
      if (isEdit) await Api.put(`/courses/${editId}`, payload);
      else        await Api.post("/courses", payload);
      await fetchCourses();
      closeDialog();
    } catch (e) { alert("❌ Failed to save course"); }
  };

  /* ─── delete ──────────────────────────────────────────────── */
  const handleDelete = async () => {
    try {
      await Api.delete(`/courses/${deleteTarget._id}`);
      setCourses(prev => prev.filter(c => c._id !== deleteTarget._id));
      setDeleteDlg(false); setDeleteTgt(null);
    } catch (e) { alert("❌ Delete failed"); }
  };

  /* ─── helpers ─────────────────────────────────────────────── */
  const closeDialog = () => {
    setOpenAdd(false); setIsEdit(false);
    setEditId(null); setForm(EMPTY); setErrors({});
  };
  const openEdit = (c) => {
    setIsEdit(true); setEditId(c._id);
    setForm({
      name: c.name||"", category: c.category||"", duration: c.duration||"",
      fees: c.fees||"", trainer: c.trainer||"", status: c.status||"Active",
      description: c.description||"",
      syllabus: (c.syllabus||[]).join(", "),
      outcomes: (c.outcomes||[]).join(", "),
    });
    setErrors({}); setOpenAdd(true);
  };

  const filtered = courses.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (!activeEmail) return <NoEmailGuard />;
  if (loading) return (
    <Box display="flex" justifyContent="center" mt={6}>
      <CircularProgress sx={{ color: GREEN }} />
    </Box>
  );

  /* ─── render ──────────────────────────────────────────────── */
  return (
    <Box>

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <SchoolIcon sx={{ color: GREEN }} /> Courses
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}
          sx={{ bgcolor: GREEN, "&:hover": { bgcolor: GREEN_DARK } }}
          onClick={() => { setForm(EMPTY); setErrors({}); setIsEdit(false); setOpenAdd(true); }}>
          Add Course
        </Button>
      </Box>

      {/* STAT CARDS */}
      <Grid container spacing={3} mb={4}>
        {[
          { title: "Total Courses",  value: courses.length,                                          sub: "All your courses" },
          { title: "Active",         value: courses.filter(c => c.status === "Active").length,        sub: "Currently running" },
          { title: "Total Enrolled", value: courses.reduce((s, c) => s + (c.enrolled || 0), 0),      sub: "Students enrolled" },
          { title: "Categories",     value: new Set(courses.map(c => c.category)).size,               sub: "Course categories" },
        ].map((s, i) => (
          <Grid key={i} size={{ xs: 12, md: 3 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography color="text.secondary">{s.title}</Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ color: GREEN }}>{s.value}</Typography>
                <Typography color="text.secondary" variant="body2">{s.sub}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* SEARCH */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ py: "12px !important" }}>
          <TextField fullWidth size="small" placeholder="Search courses…"
            value={search} onChange={e => setSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }} />
        </CardContent>
      </Card>

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <Card sx={{ textAlign: "center", py: 10, borderRadius: 3 }}>
          <SchoolIcon sx={{ fontSize: 60, color: "#ccc", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">No courses yet</Typography>
          <Typography variant="body2" color="text.secondary" mt={1} mb={3}>
            Click "Add Course" to create your first course
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />}
            sx={{ bgcolor: GREEN }} onClick={() => setOpenAdd(true)}>
            Add Course
          </Button>
        </Card>
      )}

      {/* COURSE CARDS GRID */}
      <Grid container spacing={3}>
        {filtered.map(course => {
          
          const sts = STATUS_COLORS[course.status] || { bg:"#f5f5f5", color:"#333" };
          return (
            <Grid key={course._id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{
                borderRadius: 3, height: "100%", display: "flex",
                flexDirection: "column", transition: "0.2s",
                "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
                border: "1px solid #e0e0e0",
              }}>
                {/* Colored header */}
                <Box sx={{ bgcolor: GREEN, color: "#fff", px: 2.5, py: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="h6" fontWeight="bold" sx={{
                      overflow: "hidden", textOverflow: "ellipsis",
                      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                    }}>
                      {course.name}
                    </Typography>
                    <Chip label={course.status} size="small"
                      sx={{ bgcolor: "rgba(255,255,255,0.25)", color: "#fff",
                            fontWeight: 700, fontSize: 11, ml: 1, flexShrink: 0 }} />
                  </Box>
                  <Chip label={course.category || "General"} size="small"
                    sx={{ bgcolor: "rgba(255,255,255,0.18)", color: "#fff", fontWeight: 600, mt: 1, fontSize: 11 }} />
                </Box>

                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", p: 2.5 }}>
                  {/* Description */}
                  <Typography variant="body2" color="text.secondary" mb={2}
                    sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {course.description}
                  </Typography>

                  {/* Info rows */}
                  <Stack spacing={1} mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AccessTimeIcon fontSize="small" sx={{ color: GREEN }} />
                      <Typography variant="body2">{course.duration}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <CurrencyRupeeIcon fontSize="small" sx={{ color: GREEN }} />
                      <Typography variant="body2">{course.fees}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <PeopleIcon fontSize="small" sx={{ color: GREEN }} />
                      <Typography variant="body2">{course.enrolled || 0} Students</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <PersonIcon fontSize="small" sx={{ color: GREEN }} />
                      <Typography variant="body2">{course.trainer}</Typography>
                    </Box>
                  </Stack>

                  {/* Actions */}
                  <Divider sx={{ mb: 1.5 }} />
                  <Box display="flex" justifyContent="flex-end" gap={0.5}>
                    <IconButton size="small" sx={{ color: GREEN }}
                      onClick={() => { setSelected(course); setDetailsOpen(true); }}>
                      <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: GREEN }} onClick={() => openEdit(course)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error"
                      onClick={() => { setDeleteTgt(course); setDeleteDlg(true); }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* ── ADD / EDIT DIALOG ── */}
      <Dialog open={openAdd} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: GREEN, color: "#fff" }}>
          {isEdit ? "Edit Course" : "Add Course"}
          <IconButton onClick={closeDialog} sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography fontSize={13} fontWeight={600} mb={0.5}>Course Name *</Typography>
              <TextField fullWidth size="small" placeholder="e.g. Full Stack Development"
                value={form.name} error={!!errors.name} helperText={errors.name}
                onChange={e => setForm({ ...form, name: e.target.value })} />
            </Grid>
            <Grid size={6}>
              <Typography fontSize={13} fontWeight={600} mb={0.5}>Category *</Typography>
              <TextField select fullWidth size="small" value={form.category}
                error={!!errors.category} helperText={errors.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                SelectProps={{ displayEmpty: true, renderValue: v => v || <span style={{ color:"#aaa" }}>Select</span> }}>
                {["IT & Software","Business","Design","Marketing"].map(c =>
                  <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={6}>
              <Typography fontSize={13} fontWeight={600} mb={0.5}>Duration *</Typography>
              <TextField select fullWidth size="small" value={form.duration}
                error={!!errors.duration} helperText={errors.duration}
                onChange={e => setForm({ ...form, duration: e.target.value })}
                SelectProps={{ displayEmpty: true, renderValue: v => v || <span style={{ color:"#aaa" }}>Select</span> }}>
                {["1 month","2 months","3 months","4 months","5 months","6 months","7 months","8 months"].map(d =>
                  <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={6}>
              <Typography fontSize={13} fontWeight={600} mb={0.5}>Fees (₹) *</Typography>
              <TextField fullWidth size="small" placeholder="e.g. 25000"
                value={form.fees} error={!!errors.fees} helperText={errors.fees}
                onChange={e => setForm({ ...form, fees: e.target.value })} />
            </Grid>
            <Grid size={6}>
              <Typography fontSize={13} fontWeight={600} mb={0.5}>Trainer *</Typography>
              <TextField fullWidth size="small" placeholder="Trainer Name"
                value={form.trainer} error={!!errors.trainer} helperText={errors.trainer}
                onChange={e => setForm({ ...form, trainer: e.target.value })} />
            </Grid>
            <Grid size={6}>
              <Typography fontSize={13} fontWeight={600} mb={0.5}>Status *</Typography>
              <TextField select fullWidth size="small" value={form.status}
                error={!!errors.status} helperText={errors.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                SelectProps={{ displayEmpty: true, renderValue: v => v || <span style={{ color:"#aaa" }}>Select</span> }}>
                {["Active","Draft","Inactive"].map(s =>
                  <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={12}>
              <Typography fontSize={13} fontWeight={600} mb={0.5}>Description *</Typography>
              <TextField fullWidth size="small" multiline rows={3}
                value={form.description} error={!!errors.description} helperText={errors.description}
                onChange={e => setForm({ ...form, description: e.target.value })} />
            </Grid>
            <Grid size={12}>
              <Typography fontSize={13} fontWeight={600} mb={0.5}>
                Syllabus * <Typography component="span" fontSize={11} color="text.secondary">(comma separated)</Typography>
              </Typography>
              <TextField fullWidth size="small" placeholder="HTML, CSS, React, Node"
                value={form.syllabus} error={!!errors.syllabus} helperText={errors.syllabus}
                onChange={e => setForm({ ...form, syllabus: e.target.value })} />
            </Grid>
            <Grid size={12}>
              <Typography fontSize={13} fontWeight={600} mb={0.5}>
                Outcomes * <Typography component="span" fontSize={11} color="text.secondary">(comma separated)</Typography>
              </Typography>
              <TextField fullWidth size="small" placeholder="Build apps, Deploy projects"
                value={form.outcomes} error={!!errors.outcomes} helperText={errors.outcomes}
                onChange={e => setForm({ ...form, outcomes: e.target.value })} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained"
            sx={{ bgcolor: GREEN, "&:hover": { bgcolor: GREEN_DARK } }}
            onClick={handleSave}>
            {isEdit ? "Update Course" : "Add Course"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── VIEW DETAILS DIALOG ── */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} fullWidth maxWidth="md">
        {selectedCourse && (() => {
          
          return (
            <>
              <DialogTitle sx={{ bgcolor: GREEN, color: "#fff" }}>
                {selectedCourse.name}
                <IconButton onClick={() => setDetailsOpen(false)}
                  sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent sx={{ mt: 2 }}>
                <Stack direction="row" gap={1} mb={2}>
                  <Chip label={selectedCourse.category} size="small"
                    sx={{ bgcolor: "#e8f5e9", color: GREEN, fontWeight: 700 }} />
                  <Chip label={selectedCourse.status} size="small"
                    sx={{ bgcolor: STATUS_COLORS[selectedCourse.status]?.bg || "#f5f5f5",
                          color: STATUS_COLORS[selectedCourse.status]?.color || "#333", fontWeight: 600 }} />
                </Stack>

                <Typography variant="body1" color="text.secondary" mb={3}>
                  {selectedCourse.description}
                </Typography>

                <Grid container spacing={2} mb={3}>
                  {[
                    { label: "Duration",  value: selectedCourse.duration },
                    { label: "Fees",      value: `₹ ${selectedCourse.fees}` },
                    { label: "Trainer",   value: selectedCourse.trainer },
                    { label: "Enrolled",  value: `${selectedCourse.enrolled || 0} students` },
                  ].map(s => (
                    <Grid key={s.label} size={{ xs: 6, md: 3 }}>
                      <Box sx={{ bgcolor: "#f5f5f5", borderRadius: 2, p: 1.5, textAlign: "center" }}>
                        <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                        <Typography fontWeight="bold">{s.value}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" fontWeight="bold" letterSpacing={1} mb={2}
                      sx={{ color: GREEN }}>SYLLABUS</Typography>
                    {(selectedCourse.syllabus || []).map((item, i) => (
                      <Box key={i} display="flex" alignItems="center" gap={1.5} mb={1.5}>
                        <Box sx={{ bgcolor: GREEN, color: "#fff", borderRadius: 1,
                          px: 1, py: 0.25, fontSize: 12, fontWeight: 700, minWidth: 28, textAlign: "center" }}>
                          {String(i + 1).padStart(2, "0")}
                        </Box>
                        <Typography variant="body2">{item}</Typography>
                      </Box>
                    ))}
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" fontWeight="bold" letterSpacing={1} mb={2}
                      sx={{ color: GREEN }}>OUTCOMES</Typography>
                    {(selectedCourse.outcomes || []).map((item, i) => (
                      <Box key={i} display="flex" alignItems="flex-start" gap={1} mb={1.5}>
                        <Typography sx={{ color: GREEN, fontWeight: "bold", mt: 0.1 }}>→</Typography>
                        <Typography variant="body2">{item}</Typography>
                      </Box>
                    ))}
                  </Grid>
                </Grid>
              </DialogContent>
            </>
          );
        })()}
      </Dialog>

      {/* ── DELETE CONFIRM ── */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDlg(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ bgcolor: GREEN, color: "#fff" }}>Confirm Delete</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography>Are you sure you want to delete <b>{deleteTarget?.name}</b>?</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteDlg(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}
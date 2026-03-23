import { useState, useEffect } from "react";
import {
  Box, Card, CardContent, Typography, Chip, Button, TextField,
  IconButton, InputAdornment, Fade, Tooltip, Avatar, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions, Grid,
  MenuItem, CircularProgress, Alert, Snackbar,
} from "@mui/material";

import ArrowBackIcon      from "@mui/icons-material/ArrowBack";
import BusinessIcon       from "@mui/icons-material/Business";
import ScienceIcon        from "@mui/icons-material/Science";
import WomanIcon          from "@mui/icons-material/Woman";
import PublicIcon         from "@mui/icons-material/Public";
import LocationOnIcon     from "@mui/icons-material/LocationOn";
import SearchIcon         from "@mui/icons-material/Search";
import ClearIcon          from "@mui/icons-material/Clear";
import CalendarTodayIcon  from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon    from "@mui/icons-material/AttachMoney";
import TrendingUpIcon     from "@mui/icons-material/TrendingUp";
import InfoOutlinedIcon   from "@mui/icons-material/InfoOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon       from "@mui/icons-material/Bookmark";
import AddIcon            from "@mui/icons-material/Add";
import EditIcon           from "@mui/icons-material/Edit";
import DeleteIcon         from "@mui/icons-material/Delete";
import CloseIcon          from "@mui/icons-material/Close";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import Api from "./api";

/* ══════════════════════════════════════════════
   STATIC CATEGORY CONFIG  (UI only — no data)
══════════════════════════════════════════════ */
const CATEGORY_CONFIG = {
  "Tech & Innovation": {
    icon:     <BusinessIcon sx={{ fontSize: 48 }} />,
    color:    "#1f4d3a",
    gradient: "linear-gradient(135deg, #1f4d3a 0%, #2e7d32 100%)",
  },
  "Research & Science": {
    icon:     <ScienceIcon sx={{ fontSize: 48 }} />,
    color:    "#2e7d32",
    gradient: "linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)",
  },
  "Women Empowerment": {
    icon:     <WomanIcon sx={{ fontSize: 48 }} />,
    color:    "#388e3c",
    gradient: "linear-gradient(135deg, #388e3c 0%, #43a047 100%)",
  },
  "Govt. Schemes": {
    icon:     <PublicIcon sx={{ fontSize: 48 }} />,
    color:    "#43a047",
    gradient: "linear-gradient(135deg, #43a047 0%, #4caf50 100%)",
  },
};

const CATEGORY_NAMES = Object.keys(CATEGORY_CONFIG);

const emptyForm = {
  category: "Tech & Innovation",
  title:    "",
  amount:   "",
  deadline: "",
  location: "",
  tags:     "",          // comma-separated string in form, converted to array on save
};

/* ══════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════ */
export default function Schemes() {
  /* ── STATE ── */
  const [schemes,          setSchemes]          = useState([]);
  const [categoryCounts,   setCategoryCounts]   = useState({});
  const [loading,          setLoading]          = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search,           setSearch]           = useState("");
  const [filterAmount,     setFilterAmount]     = useState("all");
  const [bookmarked,       setBookmarked]       = useState([]);
  const [selectedScheme,   setSelectedScheme]   = useState(null);

  /* admin */
  const [adminMode,   setAdminMode]   = useState(false);
  const [formOpen,    setFormOpen]    = useState(false);
  const [editId,      setEditId]      = useState(null);
  const [form,        setForm]        = useState(emptyForm);
  const [deleteOpen,  setDeleteOpen]  = useState(false);
  const [deleteId,    setDeleteId]    = useState(null);
  const [deleteName,  setDeleteName]  = useState("");
  const [snack,       setSnack]       = useState({ open:false, msg:"", severity:"success" });

  /* ── FETCH ── */
  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [schemesRes, countsRes] = await Promise.all([
        Api.get("/schemes"),
        Api.get("/schemes/categories"),
      ]);
      setSchemes(schemesRes.data);

      // convert [{category, count}] → { "Tech & Innovation": 10, ... }
      const countMap = {};
      countsRes.data.forEach(r => { countMap[r.category] = r.count; });
      setCategoryCounts(countMap);
    } catch (e) {
      console.error(e);
      showSnack("Failed to load schemes from server", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ── SNACK ── */
  const showSnack = (msg, severity = "success") =>
    setSnack({ open: true, msg, severity });

  /* ── FILTER ── */
  const filteredSchemes = schemes.filter(s => {
    if (s.category !== selectedCategory) return false;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      s.title.toLowerCase().includes(q) ||
      (s.tags || []).some(t => t.toLowerCase().includes(q));

    let matchAmount = true;
    if (filterAmount !== "all") {
      const num = parseFloat((s.amount || "").replace(/[^0-9.]/g, ""));
      if (filterAmount === "low"    && num > 500000)               matchAmount = false;
      if (filterAmount === "medium" && (num <= 500000 || num > 2000000)) matchAmount = false;
      if (filterAmount === "high"   && num <= 2000000)             matchAmount = false;
    }
    return matchSearch && matchAmount;
  });

  /* ── BOOKMARK ── */
  const toggleBookmark = id =>
    setBookmarked(prev => prev.includes(id)
      ? prev.filter(b => b !== id)
      : [...prev, id]);

  /* ── ADMIN: OPEN ADD ── */
  const openAdd = () => {
    setEditId(null);
    setForm({ ...emptyForm, category: selectedCategory || "Tech & Innovation" });
    setFormOpen(true);
  };

  /* ── ADMIN: OPEN EDIT ── */
  const openEdit = (scheme) => {
    setEditId(scheme._id);
    setForm({
      category: scheme.category,
      title:    scheme.title,
      amount:   scheme.amount,
      deadline: scheme.deadline,
      location: scheme.location,
      tags:     (scheme.tags || []).join(", "),
    });
    setFormOpen(true);
    setSelectedScheme(null);
  };

  /* ── ADMIN: SAVE ── */
  const handleSave = async () => {
    if (!form.title.trim()) return showSnack("Title is required", "error");
    const payload = {
      ...form,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
    };
    try {
      if (editId) {
        await Api.put(`/schemes/${editId}`, payload);
        showSnack("Scheme updated!");
      } else {
        await Api.post("/schemes", payload);
        showSnack("Scheme added!");
      }
      fetchAll();
      setFormOpen(false);
    } catch (e) {
      console.error(e);
      showSnack("Save failed", "error");
    }
  };

  /* ── ADMIN: DELETE ── */
  const openDelete = (scheme) => {
    setDeleteId(scheme._id);
    setDeleteName(scheme.title);
    setDeleteOpen(true);
    setSelectedScheme(null);
  };

  const confirmDelete = async () => {
    try {
      await Api.delete(`/schemes/${deleteId}`);
      fetchAll();
      setDeleteOpen(false);
      showSnack("Scheme deleted");
    } catch (e) {
      console.error(e);
      showSnack("Delete failed", "error");
    }
  };

  /* ── HELPERS ── */
  const currentCat = CATEGORY_CONFIG[selectedCategory] || {};
  const clearSearch = () => { setSearch(""); setFilterAmount("all"); };

  /* ══════════════════════════════════════════════
     LOADING
  ══════════════════════════════════════════════ */
  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height={400}>
      <CircularProgress sx={{ color: "#1f4d3a" }} />
    </Box>
  );

  /* ══════════════════════════════════════════════
     CATEGORY HOME VIEW
  ══════════════════════════════════════════════ */
  if (!selectedCategory) {
    const totalSchemes = schemes.length;
    return (
      <Box>
        {/* HEADER */}
        <Box mb={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box>
              <Typography variant="h4" fontWeight="bold" color="#1f4d3a">
                Startup Funding Schemes
              </Typography>
              <Typography variant="body1" color="text.secondary" mt={0.5}>
                Explore government and institutional funding opportunities
              </Typography>
            </Box>

            <Box display="flex" gap={1} alignItems="center">
              <Chip
                icon={<TrendingUpIcon />}
                label={`${totalSchemes} Active Schemes`}
                sx={{ bgcolor: "#f5f5f5", fontWeight: 600, fontSize: "0.9rem", px: 1 }}
              />
              <Tooltip title={adminMode ? "Exit Admin Mode" : "Admin Mode"}>
                <IconButton
                  onClick={() => setAdminMode(p => !p)}
                  sx={{
                    bgcolor: adminMode ? "#1f4d3a" : "#f5f5f5",
                    color:   adminMode ? "white"   : "#1f4d3a",
                    "&:hover": { bgcolor: adminMode ? "#2e5c47" : "#e0e0e0" },
                  }}
                >
                  <AdminPanelSettingsIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* STATS CARDS */}
          <Grid container spacing={2} mb={3}>
            {[
              { label: "Total Schemes",  value: totalSchemes },
              { label: "Categories",     value: CATEGORY_NAMES.length },
              { label: "Bookmarked",     value: bookmarked.length },
              { label: "Avg. Funding",   value: "₹5L" },
            ].map((s, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ bgcolor: "#f1f8f4", borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">{s.label}</Typography>
                    <Typography variant="h4" fontWeight="bold" color="#1f4d3a">{s.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CATEGORY CARDS */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(4,1fr)" }, gap: 3 }}>
          {CATEGORY_NAMES.map((name, index) => {
            const cfg = CATEGORY_CONFIG[name];
            return (
              <Fade in timeout={300 + index * 100} key={name}>
                <Card
                  onClick={() => setSelectedCategory(name)}
                  sx={{
                    background: cfg.gradient,
                    color: "white",
                    borderRadius: 3,
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": { transform: "translateY(-8px) scale(1.02)", boxShadow: 8 },
                    "&::before": {
                      content: '""',
                      position: "absolute", top: -50, right: -50,
                      width: 150, height: 150,
                      borderRadius: "50%",
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center", py: 4, position: "relative" }}>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 80, height: 80, mx: "auto", mb: 2 }}>
                      {cfg.icon}
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold" mb={1}>{name}</Typography>
                    <Chip
                      label={`${categoryCounts[name] || 0} Schemes`}
                      size="small"
                      sx={{ bgcolor: "rgba(255,255,255,0.3)", color: "white", fontWeight: 600 }}
                    />
                  </CardContent>
                </Card>
              </Fade>
            );
          })}
        </Box>
      </Box>
    );
  }

  /* ══════════════════════════════════════════════
     SCHEMES LIST VIEW
  ══════════════════════════════════════════════ */
  return (
    <Box>
      {/* BACK HEADER */}
      <Box mb={3}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <IconButton
            onClick={() => { setSelectedCategory(null); setSearch(""); setFilterAmount("all"); }}
            sx={{ bgcolor: "#f5f5f5", "&:hover": { bgcolor: "#e0e0e0" } }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Avatar sx={{ bgcolor: currentCat.color, width: 50, height: 50 }}>
            {currentCat.icon}
          </Avatar>

          <Box flex={1}>
            <Typography variant="h5" fontWeight="bold" color="#1f4d3a">{selectedCategory}</Typography>
            <Typography variant="body2" color="text.secondary">{filteredSchemes.length} schemes available</Typography>
          </Box>

          <Box display="flex" gap={1}>
            <Chip
              icon={<BookmarkIcon />}
              label={`${bookmarked.length} Saved`}
              sx={{ bgcolor: "#f5f5f5", fontWeight: 500 }}
            />

            {/* Admin toggle */}
            <Tooltip title={adminMode ? "Exit Admin Mode" : "Admin Mode"}>
              <IconButton
                onClick={() => setAdminMode(p => !p)}
                sx={{
                  bgcolor: adminMode ? "#1f4d3a" : "#f5f5f5",
                  color:   adminMode ? "white"   : "#1f4d3a",
                  "&:hover": { bgcolor: adminMode ? "#2e5c47" : "#e0e0e0" },
                }}
              >
                <AdminPanelSettingsIcon />
              </IconButton>
            </Tooltip>

            {/* Add button shown only in admin mode */}
            {adminMode && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ bgcolor: "#1f4d3a" }}
                onClick={openAdd}
              >
                Add Scheme
              </Button>
            )}
          </Box>
        </Box>

        {/* SEARCH + FILTERS */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            fullWidth size="small"
            placeholder={`Search in ${selectedCategory}...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>,
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={clearSearch}><ClearIcon fontSize="small" /></IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ flex: 1, minWidth: 300 }}
          />

          <Box display="flex" gap={1}>
            {[
              { key: "all",    label: "All",    tip: "Show all" },
              { key: "low",    label: "Low",    tip: "Under ₹5L" },
              { key: "medium", label: "Medium", tip: "₹5L – ₹20L" },
              { key: "high",   label: "High",   tip: "Above ₹20L" },
            ].map(f => (
              <Tooltip key={f.key} title={f.tip}>
                <Button
                  variant={filterAmount === f.key ? "contained" : "outlined"}
                  size="small"
                  onClick={() => setFilterAmount(f.key)}
                  sx={{
                    bgcolor:     filterAmount === f.key ? "#1f4d3a" : "transparent",
                    color:       filterAmount === f.key ? "white"   : "#1f4d3a",
                    borderColor: "#1f4d3a",
                  }}
                >
                  {f.label}
                </Button>
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Box>

      {/* EMPTY STATE */}
      {filteredSchemes.length === 0 ? (
        <Card sx={{ textAlign: "center", py: 8, borderRadius: 3 }}>
          <Typography variant="h6" color="text.secondary">
            No schemes found matching your criteria
          </Typography>
          <Button variant="outlined" sx={{ mt: 2, borderColor: "#1f4d3a", color: "#1f4d3a" }} onClick={clearSearch}>
            Clear Filters
          </Button>
          {adminMode && (
            <Box mt={2}>
              <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: "#1f4d3a" }} onClick={openAdd}>
                Add First Scheme
              </Button>
            </Box>
          )}
        </Card>
      ) : (
        /* SCHEME CARDS GRID */
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(3,1fr)", lg: "repeat(4,1fr)" },
          gap: 3,
        }}>
          {filteredSchemes.map((scheme, index) => (
            <Fade in timeout={200 + index * 50} key={scheme._id}>
              <Card sx={{
                borderRadius: 3, display: "flex", flexDirection: "column",
                position: "relative", transition: "all 0.3s ease",
                border: "2px solid transparent",
                "&:hover": { transform: "translateY(-4px)", boxShadow: 4, borderColor: currentCat.color },
              }}>
                {/* Bookmark */}
                <IconButton
                  onClick={() => toggleBookmark(scheme._id)}
                  sx={{ position: "absolute", top: 8, right: adminMode ? 44 : 8,
                    bgcolor: "white", boxShadow: 1, "&:hover": { bgcolor: "#f5f5f5" } }}
                  size="small"
                >
                  {bookmarked.includes(scheme._id)
                    ? <BookmarkIcon sx={{ color: currentCat.color }} />
                    : <BookmarkBorderIcon />}
                </IconButton>

                {/* Edit (admin only) */}
                {adminMode && (
                  <IconButton
                    onClick={() => openEdit(scheme)}
                    sx={{ position: "absolute", top: 8, right: 8,
                      bgcolor: "white", boxShadow: 1, "&:hover": { bgcolor: "#f5f5f5" } }}
                    size="small"
                  >
                    <EditIcon fontSize="small" sx={{ color: currentCat.color }} />
                  </IconButton>
                )}

                {/* Top colour bar */}
                <Box sx={{ height: 6, background: currentCat.gradient }} />

                <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom
                    sx={{ display: "-webkit-box", WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: 56 }}>
                    {scheme.title}
                  </Typography>

                  <Divider sx={{ my: 1.5 }} />

                  <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                    <LocationOnIcon fontSize="small" sx={{ color: currentCat.color }} />
                    <Typography variant="body2" color="text.secondary">{scheme.location}</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1.5}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <AttachMoneyIcon fontSize="small" sx={{ color: currentCat.color }} />
                      <Typography variant="h6" fontWeight="bold" sx={{ color: currentCat.color }}>
                        {scheme.amount}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <CalendarTodayIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                      Deadline: {scheme.deadline}
                    </Typography>
                  </Box>

                  <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
                    {(scheme.tags || []).slice(0, 3).map((tag, i) => (
                      <Chip key={i} label={tag} size="small"
                        sx={{ bgcolor: `${currentCat.color}15`, color: currentCat.color,
                          fontWeight: 500, fontSize: "0.7rem" }} />
                    ))}
                  </Box>
                </CardContent>

                {/* ACTION BUTTONS */}
                <Box p={2} pt={0}>
                  <Box display="flex" gap={1}>
                    <Button fullWidth variant="contained" size="small"
                      sx={{ bgcolor: currentCat.color, "&:hover": { bgcolor: currentCat.color + "dd" } }}>
                      APPLY NOW
                    </Button>
                    <Tooltip title="View Details">
                      <IconButton size="small"
                        onClick={() => setSelectedScheme(scheme)}
                        sx={{ border: `1px solid ${currentCat.color}`, color: currentCat.color }}>
                        <InfoOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {adminMode && (
                      <Tooltip title="Delete">
                        <IconButton size="small"
                          onClick={() => openDelete(scheme)}
                          sx={{ border: "1px solid #d32f2f", color: "#d32f2f" }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Box>
              </Card>
            </Fade>
          ))}
        </Box>
      )}

      {/* ══════════ SCHEME DETAILS DIALOG ══════════ */}
      <Dialog open={!!selectedScheme} onClose={() => setSelectedScheme(null)} maxWidth="sm" fullWidth>
        {selectedScheme && (
          <>
            <DialogTitle sx={{ background: currentCat.gradient, color: "white", pb: 2 }}>
              <Typography variant="h6" fontWeight="bold">{selectedScheme.title}</Typography>
            </DialogTitle>

            <DialogContent sx={{ mt: 2 }}>
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>Location</Typography>
                <Typography variant="body1" fontWeight="500">{selectedScheme.location}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>Funding Amount</Typography>
                <Typography variant="h5" fontWeight="bold" sx={{ color: currentCat.color }}>
                  {selectedScheme.amount}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>Application Deadline</Typography>
                <Typography variant="body1" fontWeight="500">{selectedScheme.deadline}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>Tags</Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {(selectedScheme.tags || []).map((tag, i) => (
                    <Chip key={i} label={tag} size="small"
                      sx={{ bgcolor: `${currentCat.color}15`, color: currentCat.color, fontWeight: 500 }} />
                  ))}
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                This scheme provides funding support for startups in the {selectedCategory} category.
                Ensure you meet all eligibility criteria before applying.
              </Typography>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setSelectedScheme(null)}>Close</Button>
              {adminMode && (
                <>
                  <Button startIcon={<EditIcon />} onClick={() => openEdit(selectedScheme)}
                    sx={{ color: currentCat.color }}>
                    Edit
                  </Button>
                  <Button startIcon={<DeleteIcon />} color="error"
                    onClick={() => openDelete(selectedScheme)}>
                    Delete
                  </Button>
                </>
              )}
              <Button
                variant="contained"
                onClick={() => toggleBookmark(selectedScheme._id)}
                sx={{ bgcolor: currentCat.color, "&:hover": { bgcolor: currentCat.color + "dd" } }}
              >
                {bookmarked.includes(selectedScheme._id) ? "Remove Bookmark" : "Bookmark"}
              </Button>
              <Button variant="contained"
                sx={{ bgcolor: currentCat.color, "&:hover": { bgcolor: currentCat.color + "dd" } }}>
                Apply Now
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ══════════ ADD / EDIT SCHEME DIALOG ══════════ */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          {editId ? "Edit Scheme" : "Add New Scheme"}
          <IconButton onClick={() => setFormOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 1 }}>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid size={{ xs: 12 }}>
              <TextField select fullWidth label="Category" value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}>
                {CATEGORY_NAMES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Scheme Title *" value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label='Amount (e.g. "₹5,00,000")' value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label='Deadline (e.g. "Apr 15, 2026")' value={form.deadline}
                onChange={e => setForm({ ...form, deadline: e.target.value })} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Location" value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Tags (comma-separated)" value={form.tags}
                placeholder="e.g. AI, Startup, Govt"
                onChange={e => setForm({ ...form, tags: e.target.value })} />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setFormOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: "#1f4d3a" }} onClick={handleSave}>
            {editId ? "Update Scheme" : "Add Scheme"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ══════════ DELETE CONFIRM ══════════ */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>Confirm Delete</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography>Are you sure you want to delete this scheme?</Typography>
          <Typography fontWeight="bold" mt={2}>{deleteName}</Typography>
          <Typography color="text.secondary" mt={1}>This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* ══════════ SNACKBAR ══════════ */}
      <Snackbar open={snack.open} autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
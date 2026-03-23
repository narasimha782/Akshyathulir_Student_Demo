import React, { useState, useEffect, useMemo } from "react";
import {
  Box, Typography, TextField, InputAdornment, MenuItem, Grid, Card, CardContent,
  Button, Avatar, Chip, Stack, Divider, List, ListItem, ListItemIcon, ListItemText,
  IconButton, CircularProgress,
} from "@mui/material";
import SearchIcon             from "@mui/icons-material/Search";
import LocationOnIcon         from "@mui/icons-material/LocationOn";
import PaymentsIcon           from "@mui/icons-material/Payments";
import AccessTimeIcon         from "@mui/icons-material/AccessTime";
import CalendarTodayIcon      from "@mui/icons-material/CalendarToday";
import WorkOutlineIcon        from "@mui/icons-material/WorkOutline";
import SchoolIcon             from "@mui/icons-material/School";
import RocketLaunchIcon       from "@mui/icons-material/RocketLaunch";
import BusinessCenterIcon     from "@mui/icons-material/BusinessCenter";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon          from "@mui/icons-material/ArrowBack";
import SendIcon               from "@mui/icons-material/Send";
import CloudUploadIcon        from "@mui/icons-material/CloudUpload";
import CodeIcon               from "@mui/icons-material/Code";
import VerifiedIcon           from "@mui/icons-material/Verified";

const GREEN      = "#1f4d3a";
const GREEN_DARK = "#163d2e";

const TYPE_ICON = {
  Internship: <WorkOutlineIcon fontSize="small" />,
  Job:        <BusinessCenterIcon fontSize="small" />,
  Project:    <RocketLaunchIcon fontSize="small" />,
  Training:   <SchoolIcon fontSize="small" />,
};

/* ══════════════════════════════════════════════════════════════ */
export default function Opportunities() {
  const [opportunities,  setOpportunities]  = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [view,           setView]           = useState("list");
  const [selected,       setSelected]       = useState(null);
  const [searchTerm,     setSearchTerm]     = useState("");
  const [typeFilter,     setTypeFilter]     = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/opportunities")
      .then(r => r.json())
      .then(data => { setOpportunities(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => opportunities.filter(item => {
    const matchSearch   = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.organization?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType     = typeFilter     === "All" || item.type     === typeFilter;
    const matchLocation = locationFilter === "All" || item.location === locationFilter;
    return matchSearch && matchType && matchLocation;
  }), [searchTerm, typeFilter, locationFilter, opportunities]);

  const locations = ["All", ...new Set(opportunities.map(o => o.location).filter(Boolean))];

  /* ── DETAIL VIEW ──────────────────────────────────────────── */
  if (view === "detail" && selected) {
    const opp = selected;
    return (
      <Box>
        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <IconButton onClick={() => setView("list")} sx={{ color: GREEN }}><ArrowBackIcon /></IconButton>
          <Typography variant="h5" fontWeight="bold" color={GREEN}>Opportunity Details</Typography>
        </Box>

        <Grid container spacing={3}>
          {/* LEFT */}
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 3, p: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Box display="flex" gap={2} alignItems="center">
                  <Avatar variant="rounded" sx={{ bgcolor: "#e8f5e9", color: GREEN, width: 52, height: 52 }}>
                    {TYPE_ICON[opp.type] || <WorkOutlineIcon />}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight="bold" color={GREEN}>{opp.title}</Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Typography variant="body1" color="text.secondary">{opp.organization}</Typography>
                      <VerifiedIcon sx={{ fontSize: 16, color: GREEN }} />
                    </Stack>
                  </Box>
                </Box>
                <Stack direction="row" gap={1}>
                  <Chip label={opp.type} sx={{ bgcolor: "#e8f5e9", color: GREEN, fontWeight: 700 }} />
                  {opp.domain && <Chip label={opp.domain} variant="outlined" sx={{ color: GREEN, borderColor: GREEN }} />}
                </Stack>
              </Stack>

              <Divider sx={{ mb: 3 }} />

              <Typography variant="h6" fontWeight="bold" color={GREEN} mb={1}>About this Opportunity</Typography>
              <Typography variant="body1" color="text.secondary" lineHeight={1.9} mb={3}>{opp.description}</Typography>

              {/* Responsibilities */}
              {opp.responsibilities?.length > 0 && (<>
                <Typography variant="h6" fontWeight="bold" color={GREEN} mb={1}>Responsibilities</Typography>
                <List dense sx={{ mb: 3 }}>
                  {opp.responsibilities.map((r, i) => (
                    <ListItem key={i} disableGutters>
                      <ListItemIcon sx={{ minWidth: 32 }}><CheckCircleOutlineIcon sx={{ color: GREEN, fontSize: 18 }} /></ListItemIcon>
                      <ListItemText primary={r} />
                    </ListItem>
                  ))}
                </List>
              </>)}

              {/* Requirements */}
              {opp.requirements?.length > 0 && (<>
                <Typography variant="h6" fontWeight="bold" color={GREEN} mb={1}>Requirements</Typography>
                <List dense sx={{ mb: 3 }}>
                  {opp.requirements.map((r, i) => (
                    <ListItem key={i} disableGutters>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: GREEN, mt: 0.8 }} />
                      </ListItemIcon>
                      <ListItemText primary={r} />
                    </ListItem>
                  ))}
                </List>
              </>)}

              {/* Tech Stack for Projects */}
              {opp.tech?.length > 0 && (<>
                <Typography variant="h6" fontWeight="bold" color={GREEN} mb={1}>Tech Stack</Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {opp.tech.map(t => (
                    <Chip key={t} label={t} icon={<CodeIcon fontSize="small" />} variant="outlined"
                      sx={{ borderRadius: 2, color: GREEN, borderColor: GREEN }} />
                  ))}
                </Stack>
              </>)}
            </Card>
          </Grid>

          {/* RIGHT — summary sidebar */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, p: 3, position: "sticky", top: 24 }}>
              <Typography variant="h6" fontWeight="bold" color={GREEN} mb={2}>Summary</Typography>
              <Stack spacing={2.5} mb={3}>
                {[
                  { icon: <LocationOnIcon fontSize="small" />, label: "LOCATION",  value: opp.location },
                  { icon: <PaymentsIcon fontSize="small" />,   label: opp.type === "Job" ? "PAY" : "STIPEND", value: opp.stipend },
                  { icon: <AccessTimeIcon fontSize="small" />, label: "DURATION",  value: opp.duration },
                  { icon: <CalendarTodayIcon fontSize="small" />, label: "DEADLINE", value: opp.deadline },
                  ...(opp.shift ? [{ icon: <AccessTimeIcon fontSize="small" />, label: "SHIFT", value: `${opp.shift} Shift` }] : []),
                  ...(opp.role  ? [{ icon: <WorkOutlineIcon fontSize="small" />,  label: "ROLE",  value: opp.role }] : []),
                  ...(opp.pay_type ? [{ icon: <PaymentsIcon fontSize="small" />, label: "COMPENSATION", value: opp.pay_type === "Paid" ? "Stipend Included" : "Unpaid (Certificate)" }] : []),
                ].map(s => (
                  <Box key={s.label} display="flex" gap={2} alignItems="center">
                    <Avatar sx={{ bgcolor: "#f0f4f2", color: GREEN, width: 36, height: 36 }}>{s.icon}</Avatar>
                    <Box>
                      <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                      <Typography variant="body2" fontWeight={700}>{s.value}</Typography>
                    </Box>
                  </Box>
                ))}

                {opp.tags?.length > 0 && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">TAGS</Typography>
                    <Stack direction="row" flexWrap="wrap" gap={0.5} mt={0.5}>
                      {opp.tags.map(t => (
                        <Chip key={t} label={t} size="small" sx={{ bgcolor: "#e8f5e9", color: GREEN, fontSize: 11 }} />
                      ))}
                    </Stack>
                  </Box>
                )}
              </Stack>

              <Button fullWidth variant="contained" startIcon={<SendIcon />}
                onClick={() => setView("apply")}
                sx={{ bgcolor: GREEN, borderRadius: 2, py: 1.5, fontWeight: "bold",
                  textTransform: "none", "&:hover": { bgcolor: GREEN_DARK } }}>
                Apply Now
              </Button>
              <Button fullWidth variant="outlined" onClick={() => setView("list")}
                sx={{ mt: 1, color: GREEN, borderColor: GREEN, borderRadius: 2, textTransform: "none" }}>
                Back to List
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }

  /* ── APPLY VIEW ───────────────────────────────────────────── */
  if (view === "apply" && selected) {
    const opp = selected;

    const handleSubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const data = {
        opportunityId:    opp._id,
        opportunityTitle: opp.title,
        type:             opp.type,
        organization:     opp.organization,
        applicantName:    localStorage.getItem("userName")  || "",
        applicantEmail:   localStorage.getItem("userEmail") || "",
        linkedinUrl:      fd.get("linkedin")     || "",
        githubUrl:        fd.get("github")       || "",
        skills:           (fd.get("skills") || "").split(",").map(s => s.trim()).filter(Boolean),
        experience:       fd.get("experience")   || "",
        availability:     fd.get("availability") || "",
        reason:           fd.get("reason")       || "",
        appliedOn:        new Date().toISOString().split("T")[0],
        status:           "Applied",
      };
      try {
        const res = await fetch("http://127.0.0.1:8000/api/opportunities/applications", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
        });
        if (res.ok) { alert("Application submitted successfully!"); setView("list"); }
        else {
          const err = await res.json();
          const msg = typeof err.detail === "string" ? err.detail
            : Array.isArray(err.detail) ? err.detail.map(e => e.msg).join(", ")
            : "Submission failed. Please try again.";
          alert(msg);
        }
      } catch { alert("Could not connect to server."); }
    };

    return (
      <Box>
        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <IconButton onClick={() => setView("detail")} sx={{ color: GREEN }}><ArrowBackIcon /></IconButton>
          <Typography variant="h5" fontWeight="bold" color={GREEN}>Apply for Opportunity</Typography>
        </Box>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 3, p: 3 }}>
              <Box display="flex" gap={2} alignItems="center" mb={2}>
                <Avatar variant="rounded" sx={{ bgcolor: "#e8f5e9", color: GREEN, width: 48, height: 48 }}>
                  {TYPE_ICON[opp.type] || <WorkOutlineIcon />}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color={GREEN}>{opp.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{opp.organization} • {opp.location}</Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <form onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography fontSize={13} fontWeight={600} mb={0.5}>LinkedIn Profile URL</Typography>
                      <TextField name="linkedin" fullWidth size="small" placeholder="https://linkedin.com/in/..." />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography fontSize={13} fontWeight={600} mb={0.5}>GitHub / Portfolio URL</Typography>
                      <TextField name="github" fullWidth size="small" placeholder="https://github.com/..." />
                    </Grid>
                  </Grid>
                  <Box>
                    <Typography fontSize={13} fontWeight={600} mb={0.5}>Key Skills <Typography component="span" fontSize={11} color="text.secondary">(comma separated)</Typography></Typography>
                    <TextField name="skills" fullWidth size="small" placeholder="React, Python, Node.js" />
                  </Box>
                  <Box>
                    <Typography fontSize={13} fontWeight={600} mb={0.5}>Relevant Experience</Typography>
                    <TextField name="experience" fullWidth size="small" multiline rows={3} placeholder="Describe relevant projects or work..." />
                  </Box>
                  <Box>
                    <Typography fontSize={13} fontWeight={600} mb={0.5}>Availability</Typography>
                    <TextField name="availability" fullWidth size="small" placeholder="e.g. Immediately / 20 hrs per week" />
                  </Box>
                  <Box>
                    <Typography fontSize={13} fontWeight={600} mb={0.5}>Why are you interested? *</Typography>
                    <TextField name="reason" fullWidth size="small" multiline rows={4} required placeholder="Tell us what excites you about this opportunity..." />
                  </Box>
                  <Box>
                    <Typography fontSize={13} fontWeight={600} mb={0.5}>Upload Resume (PDF)</Typography>
                    <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}
                      sx={{ color: GREEN, borderColor: GREEN, textTransform: "none", borderRadius: 2 }}>
                      Choose File <input type="file" hidden accept=".pdf" />
                    </Button>
                  </Box>
                  <Divider />
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={() => setView("detail")}
                      sx={{ color: GREEN, borderColor: GREEN, borderRadius: 2, textTransform: "none" }}>Cancel</Button>
                    <Button type="submit" variant="contained" startIcon={<SendIcon />}
                      sx={{ bgcolor: GREEN, borderRadius: 2, fontWeight: "bold", textTransform: "none", px: 4,
                        "&:hover": { bgcolor: GREEN_DARK } }}>
                      Submit Application
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }

  /* ── LIST VIEW ────────────────────────────────────────────── */
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <WorkOutlineIcon sx={{ color: GREEN }} /> Opportunities
        </Typography>
      </Box>

      {/* STAT CARDS */}
      <Grid container spacing={3} mb={4}>
        {[
          { label: "Internships",    value: opportunities.filter(o => o.type === "Internship").length },
          { label: "Projects",       value: opportunities.filter(o => o.type === "Project").length    },
          { label: "Part-Time Jobs", value: opportunities.filter(o => o.type === "Job").length        },
          { label: "Total Listed",   value: opportunities.length                                      },
        ].map((s, i) => (
          <Grid key={i} size={{ xs: 12, md: 3 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography color="text.secondary">{s.label}</Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ color: GREEN }}>{s.value}</Typography>
                <Typography variant="body2" color="text.secondary">Available now</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* FILTERS */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent sx={{ py: "14px !important" }}>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <TextField size="small" placeholder="Search by title or organization..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              sx={{ flexGrow: 1, minWidth: 220 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }} />
            <TextField select size="small" value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)} sx={{ width: 170 }}>
              <MenuItem value="All">All Types</MenuItem>
              <MenuItem value="Internship">Internships</MenuItem>
              <MenuItem value="Job">Part-Time Jobs</MenuItem>
              <MenuItem value="Project">Projects</MenuItem>
            </TextField>
            <TextField select size="small" value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)} sx={{ width: 180 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><LocationOnIcon fontSize="small" /></InputAdornment> }}>
              {locations.map(l => <MenuItem key={l} value={l}>{l === "All" ? "All Locations" : l}</MenuItem>)}
            </TextField>
          </Stack>
        </CardContent>
      </Card>

      {loading && <Box display="flex" justifyContent="center" mt={6}><CircularProgress sx={{ color: GREEN }} /></Box>}

      {/* CARDS */}
      {!loading && (
        <Grid container spacing={3}>
          {filtered.map((opp, idx) => (
            <Grid key={opp._id || idx} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{
                borderRadius: 3, height: "100%", display: "flex", flexDirection: "column",
                border: "1px solid #e8f5e9", transition: "0.2s",
                "&:hover": { transform: "translateY(-4px)", boxShadow: 6, borderColor: GREEN },
              }}>
                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Avatar variant="rounded"
                      sx={{ bgcolor: "#e8f5e9", color: GREEN, width: 46, height: 46 }}>
                      {TYPE_ICON[opp.type] || <WorkOutlineIcon fontSize="small" />}
                    </Avatar>
                    <Chip label={opp.type} size="small"
                      sx={{ bgcolor: "#e8f5e9", color: GREEN, fontWeight: 700 }} />
                  </Stack>

                  <Typography variant="h6" fontWeight={700} color={GREEN} lineHeight={1.3} mb={0.5}
                    sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {opp.title}
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={0.5} mb={2}>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>{opp.organization}</Typography>
                    <VerifiedIcon sx={{ fontSize: 14, color: GREEN }} />
                  </Stack>

                  <Stack spacing={1} mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <LocationOnIcon sx={{ fontSize: 16, color: "#888" }} />
                      <Typography variant="body2" color="text.secondary">{opp.location}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <PaymentsIcon sx={{ fontSize: 16, color: "#888" }} />
                      <Typography variant="body2" color="text.secondary">{opp.stipend}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AccessTimeIcon sx={{ fontSize: 16, color: "#888" }} />
                      <Typography variant="body2" color="text.secondary">
                        {opp.shift ? `${opp.shift} Shift` : opp.duration}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Tech chips for projects */}
                  {opp.tech?.length > 0 && (
                    <Stack direction="row" flexWrap="wrap" gap={0.5} mb={1}>
                      {opp.tech.slice(0, 3).map(t => (
                        <Chip key={t} label={t} size="small" sx={{ height: 20, fontSize: "0.65rem" }} />
                      ))}
                    </Stack>
                  )}

                  {/* Tags */}
                  {!opp.tech && opp.tags?.length > 0 && (
                    <Stack direction="row" flexWrap="wrap" gap={0.5}>
                      {opp.tags.slice(0, 3).map(t => (
                        <Chip key={t} label={t} size="small" sx={{ bgcolor: "#f5f5f5", fontSize: 11, height: 22 }} />
                      ))}
                    </Stack>
                  )}
                </CardContent>

                <Box sx={{ p: 2, pt: 0 }}>
                  <Button fullWidth variant="outlined"
                    onClick={() => { setSelected(opp); setView("detail"); }}
                    sx={{ borderRadius: 2, color: GREEN, borderColor: GREEN,
                      textTransform: "none", fontWeight: "bold",
                      "&:hover": { bgcolor: GREEN, color: "#fff" } }}>
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}

          {filtered.length === 0 && (
            <Box sx={{ textAlign: "center", width: "100%", py: 10 }}>
              <WorkOutlineIcon sx={{ fontSize: 60, color: "#ccc", mb: 2 }} />
              <Typography variant="h6" color="text.secondary">No opportunities found</Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>Try adjusting your filters</Typography>
            </Box>
          )}
        </Grid>
      )}
    </Box>
  );
}
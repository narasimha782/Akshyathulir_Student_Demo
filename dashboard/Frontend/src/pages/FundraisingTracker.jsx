import { useState, useEffect } from "react";
import {
  Box, Typography, Grid, Card, CardContent, Button, Chip, Table, TableHead,
  TableRow, TableCell, TableBody, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, LinearProgress, Tabs, Tab, TableContainer,
  Paper, CircularProgress,
} from "@mui/material";

import AddIcon                   from "@mui/icons-material/Add";
import EditIcon                  from "@mui/icons-material/Edit";
import DeleteIcon                from "@mui/icons-material/Delete";
import CloseIcon                 from "@mui/icons-material/Close";
import TrendingUpIcon            from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon  from "@mui/icons-material/AccountBalanceWallet";
import PeopleIcon                from "@mui/icons-material/People";
import AssessmentIcon            from "@mui/icons-material/Assessment";
import SendIcon                  from "@mui/icons-material/Send";
import LightbulbIcon             from "@mui/icons-material/Lightbulb";
import BuildIcon                 from "@mui/icons-material/Build";
import RocketLaunchIcon          from "@mui/icons-material/RocketLaunch";
import PublicIcon                from "@mui/icons-material/Public";

import Api           from "./api";
import { useEmail }  from "../context/EmailContext";
import NoEmailGuard  from "../components/NoEmailGuard";

export default function FundraisingTracker() {

  const { activeEmail } = useEmail();

  const [activeTab, setActiveTab] = useState(0);

  /* ── LOADING ── */
  const [loadingCampaigns,      setLoadingCampaigns]      = useState(true);
  const [loadingInvestors,      setLoadingInvestors]      = useState(true);
  const [loadingCommunications, setLoadingCommunications] = useState(true);

  /* ── CAMPAIGNS ── */
  const [campaigns,          setCampaigns]          = useState([]);
  const [campaignOpen,       setCampaignOpen]       = useState(false);
  const [editCampaignId,     setEditCampaignId]     = useState(null);
  const [deleteCampaignOpen, setDeleteCampaignOpen] = useState(false);
  const [deleteCampaignId,   setDeleteCampaignId]   = useState(null);
  const emptyCampaignForm = {
    productName: "", scope: "", targetAmount: "", raisedAmount: "",
    investorType: "multiple", investmentRange: { min: "", max: "" },
    singleInvestorAmount: "", investmentFocus: "Ideation",
    netWorthDeclaration: "", pastInvestments: "", investorRelation: "", deadline: "",
  };
  const [campaignForm, setCampaignForm] = useState(emptyCampaignForm);

  /* ── INVESTORS ── */
  const [investors,          setInvestors]          = useState([]);
  const [investorOpen,       setInvestorOpen]       = useState(false);
  const [editInvestorId,     setEditInvestorId]     = useState(null);
  const [deleteInvestorOpen, setDeleteInvestorOpen] = useState(false);
  const [deleteInvestorId,   setDeleteInvestorId]   = useState(null);
  const emptyInvestorForm = {
    name: "", type: "VC Firm", investmentSize: "", status: "Interested",
    lastContact: "", stage: "Initial Contact", focusAreas: "", relation: "New",
  };
  const [investorForm, setInvestorForm] = useState(emptyInvestorForm);

  /* ── COMMUNICATIONS ── */
  const [communications,     setCommunications]     = useState([]);
  const [commOpen,           setCommOpen]           = useState(false);
  const [editCommId,         setEditCommId]         = useState(null);
  const [deleteCommOpen,     setDeleteCommOpen]     = useState(false);
  const [deleteCommId,       setDeleteCommId]       = useState(null);
  const emptyCommForm = {
    investorName: "", type: "Email", subject: "", date: "", status: "Scheduled", notes: "",
  };
  const [commForm, setCommForm] = useState(emptyCommForm);

  /* ══════════ FETCH ══════════ */
  const fetchCampaigns = async () => {
    try {
      setLoadingCampaigns(true);
      const { data } = await Api.get(`/fundraising/campaigns?email=${encodeURIComponent(activeEmail)}`);
      setCampaigns(data);
    } catch (e) { console.error(e); } finally { setLoadingCampaigns(false); }
  };
  const fetchInvestors = async () => {
    try {
      setLoadingInvestors(true);
      const { data } = await Api.get(`/fundraising/investors?email=${encodeURIComponent(activeEmail)}`);
      setInvestors(data);
    } catch (e) { console.error(e); } finally { setLoadingInvestors(false); }
  };
  const fetchCommunications = async () => {
    try {
      setLoadingCommunications(true);
      const { data } = await Api.get(`/fundraising/communications?email=${encodeURIComponent(activeEmail)}`);
      setCommunications(data);
    } catch (e) { console.error(e); } finally { setLoadingCommunications(false); }
  };

  useEffect(() => {
    if (activeEmail) { fetchCampaigns(); fetchInvestors(); fetchCommunications(); }
  }, [activeEmail]);

  /* ══════════ CAMPAIGN HANDLERS ══════════ */
  const openAddCampaign = () => { setEditCampaignId(null); setCampaignForm(emptyCampaignForm); setCampaignOpen(true); };
  const openEditCampaign = (c) => {
    setEditCampaignId(c._id);
    setCampaignForm({
      productName: c.productName, scope: c.scope,
      targetAmount: c.targetAmount, raisedAmount: c.raisedAmount,
      investorType: c.investorType,
      investmentRange: c.investmentRange || { min: "", max: "" },
      singleInvestorAmount: c.singleInvestorAmount || "",
      investmentFocus: c.investmentFocus,
      netWorthDeclaration: c.netWorthDeclaration,
      pastInvestments: c.pastInvestments || "",
      investorRelation: c.investorRelation || "",
      deadline: c.deadline || "",
    });
    setCampaignOpen(true);
  };
  const handleSaveCampaign = async () => {
    const payload = {
      userEmail:            activeEmail,
      productName:          campaignForm.productName,
      scope:                campaignForm.scope,
      targetAmount:         Number(campaignForm.targetAmount) || 0,
      raisedAmount:         Number(campaignForm.raisedAmount) || 0,
      investorType:         campaignForm.investorType,
      investmentRange:      campaignForm.investorType === "multiple"
                              ? { min: Number(campaignForm.investmentRange.min), max: Number(campaignForm.investmentRange.max) }
                              : { min: 0, max: 0 },
      singleInvestorAmount: campaignForm.investorType === "single" ? Number(campaignForm.singleInvestorAmount) : null,
      investmentFocus:      campaignForm.investmentFocus,
      netWorthDeclaration:  Number(campaignForm.netWorthDeclaration) || 0,
      pastInvestments:      campaignForm.pastInvestments,
      investorRelation:     campaignForm.investorRelation,
      status:               "Active",
      deadline:             campaignForm.deadline,
      createdDate:          new Date().toISOString().split("T")[0],
    };
    try {
      if (editCampaignId) await Api.put(`/fundraising/campaigns/${editCampaignId}`, payload);
      else                await Api.post("/fundraising/campaigns", payload);
      fetchCampaigns(); setCampaignOpen(false);
    } catch (e) { console.error(e); alert("Failed to save. Please try again."); }
  };
  const confirmDeleteCampaign = async () => {
    try { await Api.delete(`/fundraising/campaigns/${deleteCampaignId}`); fetchCampaigns(); setDeleteCampaignOpen(false); }
    catch (e) { console.error(e); }
  };

  /* ══════════ INVESTOR HANDLERS ══════════ */
  const openAddInvestor = () => { setEditInvestorId(null); setInvestorForm(emptyInvestorForm); setInvestorOpen(true); };
  const openEditInvestor = (inv) => {
    setEditInvestorId(inv._id);
    setInvestorForm({ name: inv.name, type: inv.type, investmentSize: inv.investmentSize, status: inv.status, lastContact: inv.lastContact || "", stage: inv.stage, focusAreas: inv.focusAreas, relation: inv.relation });
    setInvestorOpen(true);
  };
  const handleSaveInvestor = async () => {
    const payload = { userEmail: activeEmail, name: investorForm.name, type: investorForm.type, investmentSize: Number(investorForm.investmentSize) || 0, status: investorForm.status, lastContact: investorForm.lastContact, stage: investorForm.stage, focusAreas: investorForm.focusAreas, relation: investorForm.relation };
    try {
      if (editInvestorId) await Api.put(`/fundraising/investors/${editInvestorId}`, payload);
      else                await Api.post("/fundraising/investors", payload);
      fetchInvestors(); setInvestorOpen(false);
    } catch (e) { console.error(e); alert("Failed to save. Please try again."); }
  };
  const confirmDeleteInvestor = async () => {
    try { await Api.delete(`/fundraising/investors/${deleteInvestorId}`); fetchInvestors(); setDeleteInvestorOpen(false); }
    catch (e) { console.error(e); }
  };

  /* ══════════ COMM HANDLERS ══════════ */
  const openAddComm = () => { setEditCommId(null); setCommForm(emptyCommForm); setCommOpen(true); };
  const openEditComm = (c) => {
    setEditCommId(c._id);
    setCommForm({ investorName: c.investorName, type: c.type, subject: c.subject, date: c.date || "", status: c.status, notes: c.notes });
    setCommOpen(true);
  };
  const handleSaveComm = async () => {
    const payload = { userEmail: activeEmail, investorName: commForm.investorName, type: commForm.type, subject: commForm.subject, date: commForm.date, status: commForm.status, notes: commForm.notes };
    try {
      if (editCommId) await Api.put(`/fundraising/communications/${editCommId}`, payload);
      else            await Api.post("/fundraising/communications", payload);
      fetchCommunications(); setCommOpen(false);
    } catch (e) { console.error(e); alert("Failed to save. Please try again."); }
  };
  const confirmDeleteComm = async () => {
    try { await Api.delete(`/fundraising/communications/${deleteCommId}`); fetchCommunications(); setDeleteCommOpen(false); }
    catch (e) { console.error(e); }
  };

  /* ══════════ HELPERS ══════════ */
  const getStageIcon  = (f) => ({ Ideation: <LightbulbIcon />, Prototype: <BuildIcon />, "Market Entry": <PublicIcon />, Scaling: <RocketLaunchIcon /> }[f] || <LightbulbIcon />);
  const getStageColor = (f) => ({ Ideation: "secondary", Prototype: "info", "Market Entry": "success", Scaling: "warning" }[f] || "default");
  const pct           = (raised, target) => target ? Math.min(Math.round((raised / target) * 100), 100) : 0;

  const totalTarget     = campaigns.reduce((s, c) => s + (c.targetAmount || 0), 0);
  const totalRaised     = campaigns.reduce((s, c) => s + (c.raisedAmount  || 0), 0);
  const activeCampaigns = campaigns.filter(c => c.status === "Active").length;

  const Loader = () => <Box display="flex" justifyContent="center" mt={6}><CircularProgress sx={{ color: "#1f4d3a" }} /></Box>;
  const Empty  = ({ msg }) => <Box textAlign="center" py={8}><Typography color="text.secondary">{msg}</Typography></Box>;

  if (!activeEmail) return <NoEmailGuard />;

  /* ══════════ TABS ══════════ */
  const CampaignsTab = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight="bold">Fundraising Requests</Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: "#1f4d3a", textTransform: "none", borderRadius: 2 }} onClick={openAddCampaign}>
          Create New Request
        </Button>
      </Box>
      {loadingCampaigns ? <Loader /> : campaigns.length === 0 ? <Empty msg="No fundraising requests yet. Create your first one!" /> :
        <Grid container spacing={3}>
          {campaigns.map(campaign => (
            <Grid key={campaign._id} size={{ xs: 12 }}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                    <Box flex={1}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>{campaign.productName}</Typography>
                      <Typography variant="body2" color="text.secondary" mb={2}>{campaign.scope}</Typography>
                      <Box display="flex" gap={1} mb={2}>
                        <Chip icon={getStageIcon(campaign.investmentFocus)} label={campaign.investmentFocus} color={getStageColor(campaign.investmentFocus)} size="small" />
                        <Chip label={campaign.investorType === "single" ? "Single Investor" : "Multiple Investors"} size="small" variant="outlined" />
                      </Box>
                    </Box>
                    <Box display="flex" gap={1}>
                      <IconButton color="success" onClick={() => openEditCampaign(campaign)}><EditIcon /></IconButton>
                      <IconButton color="error"   onClick={() => { setDeleteCampaignId(campaign._id); setDeleteCampaignOpen(true); }}><DeleteIcon /></IconButton>
                    </Box>
                  </Box>
                  <Grid container spacing={2} mb={2}>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Box bgcolor="#f5f5f5" p={2} borderRadius={2}>
                        <Typography variant="body2" color="text.secondary">Target Amount</Typography>
                        <Typography variant="h6" fontWeight="bold">₹{(campaign.targetAmount || 0).toLocaleString()}</Typography>
                      </Box>
                    </Grid>
                    {campaign.investorType === "multiple" && campaign.investmentRange && (
                      <Grid size={{ xs: 12, md: 3 }}>
                        <Box bgcolor="#f5f5f5" p={2} borderRadius={2}>
                          <Typography variant="body2" color="text.secondary">Investment Range</Typography>
                          <Typography variant="h6" fontWeight="bold">₹{(campaign.investmentRange.min || 0).toLocaleString()} - ₹{(campaign.investmentRange.max || 0).toLocaleString()}</Typography>
                        </Box>
                      </Grid>
                    )}
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Box bgcolor="#f5f5f5" p={2} borderRadius={2}>
                        <Typography variant="body2" color="text.secondary">Net Worth</Typography>
                        <Typography variant="h6" fontWeight="bold">₹{(campaign.netWorthDeclaration || 0).toLocaleString()}</Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Box bgcolor="#f5f5f5" p={2} borderRadius={2}>
                        <Typography variant="body2" color="text.secondary">Deadline</Typography>
                        <Typography variant="h6" fontWeight="bold">{campaign.deadline ? new Date(campaign.deadline).toLocaleDateString() : "—"}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  {campaign.pastInvestments  && <Box mb={1}><Typography variant="body2" fontWeight="bold" color="text.secondary">Past Investments:</Typography><Typography variant="body2">{campaign.pastInvestments}</Typography></Box>}
                  {campaign.investorRelation && <Box mb={2}><Typography variant="body2" fontWeight="bold" color="text.secondary">Investor Relations:</Typography><Typography variant="body2">{campaign.investorRelation}</Typography></Box>}
                  <Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" color="text.secondary">Progress</Typography>
                      <Typography variant="body2" fontWeight="bold">{pct(campaign.raisedAmount, campaign.targetAmount)}%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={pct(campaign.raisedAmount, campaign.targetAmount)} sx={{ height: 8, borderRadius: 5 }} />
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      ₹{(campaign.raisedAmount || 0).toLocaleString()} raised of ₹{(campaign.targetAmount || 0).toLocaleString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      }
    </Box>
  );

  const InvestorPipelineTab = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight="bold">Investor Pipeline</Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: "#1f4d3a", textTransform: "none", borderRadius: 2 }} onClick={openAddInvestor}>Add Investor</Button>
      </Box>
      {loadingInvestors ? <Loader /> : investors.length === 0 ? <Empty msg="No investors tracked yet." /> :
        <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                {["Investor", "Type", "Investment Size", "Stage", "Last Contact", "Focus Areas", "Relation", "Actions"].map(h => <TableCell key={h}><b>{h}</b></TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {investors.map(inv => (
                <TableRow key={inv._id} hover>
                  <TableCell><Typography fontWeight="bold">{inv.name}</Typography></TableCell>
                  <TableCell>{inv.type}</TableCell>
                  <TableCell>₹{(inv.investmentSize || 0).toLocaleString()}</TableCell>
                  <TableCell><Chip label={inv.stage} color={inv.status === "Committed" ? "success" : "default"} size="small" /></TableCell>
                  <TableCell>{inv.lastContact ? new Date(inv.lastContact).toLocaleDateString() : "—"}</TableCell>
                  <TableCell>{inv.focusAreas}</TableCell>
                  <TableCell>{inv.relation}</TableCell>
                  <TableCell>
                    <IconButton color="success" onClick={() => openEditInvestor(inv)}><EditIcon /></IconButton>
                    <IconButton color="error"   onClick={() => { setDeleteInvestorId(inv._id); setDeleteInvestorOpen(true); }}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Box>
  );

  const CommunicationsTab = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight="bold">Communications</Typography>
        <Button variant="contained" startIcon={<SendIcon />} sx={{ bgcolor: "#1f4d3a", textTransform: "none", borderRadius: 2 }} onClick={openAddComm}>New Communication</Button>
      </Box>
      {loadingCommunications ? <Loader /> : communications.length === 0 ? <Empty msg="No communications logged yet." /> :
        <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                {["Investor", "Type", "Subject", "Date", "Status", "Notes", "Actions"].map(h => <TableCell key={h}><b>{h}</b></TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {communications.map(comm => (
                <TableRow key={comm._id} hover>
                  <TableCell>{comm.investorName}</TableCell>
                  <TableCell><Chip label={comm.type} color="info" size="small" variant="outlined" /></TableCell>
                  <TableCell>{comm.subject}</TableCell>
                  <TableCell>{comm.date ? new Date(comm.date).toLocaleDateString() : "—"}</TableCell>
                  <TableCell><Chip label={comm.status} color={comm.status === "Sent" || comm.status === "Completed" ? "success" : "warning"} size="small" /></TableCell>
                  <TableCell>{comm.notes}</TableCell>
                  <TableCell>
                    <IconButton color="success" onClick={() => openEditComm(comm)}><EditIcon /></IconButton>
                    <IconButton color="error"   onClick={() => { setDeleteCommId(comm._id); setDeleteCommOpen(true); }}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Box>
  );

  const AnalyticsTab = () => {
    const stageDist = campaigns.reduce((acc, c) => { acc[c.investmentFocus] = (acc[c.investmentFocus] || 0) + 1; return acc; }, {});
    return (
      <Box>
        <Typography variant="h6" fontWeight="bold" mb={3}>Analytics & Insights</Typography>
        <Grid container spacing={3} mb={3}>
          {[
            { label: "Total Target",    value: `₹${totalTarget.toLocaleString()}`,  sub: "Fundraising goal"    },
            { label: "Total Raised",    value: `₹${totalRaised.toLocaleString()}`,  sub: "Successfully raised" },
            { label: "Active Campaigns",value: activeCampaigns,                     sub: "Currently running"   },
            { label: "Active Investors",value: investors.length,                    sub: "In pipeline"         },
          ].map((s, i) => (
            <Grid key={i} size={{ xs: 12, md: 3 }}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="body2">{s.label}</Typography>
                  <Typography variant="h4" fontWeight="bold" sx={{ color: "#1f4d3a", my: 1 }}>{s.value}</Typography>
                  <Typography variant="body2" color="text.secondary">{s.sub}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>Fundraising Progress</Typography>
                {campaigns.length === 0 ? <Typography color="text.secondary" variant="body2">No campaigns yet.</Typography> :
                  campaigns.map(c => (
                    <Box key={c._id} mb={2}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" fontWeight="bold">{c.productName}</Typography>
                        <Typography variant="body2">{pct(c.raisedAmount, c.targetAmount)}%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={pct(c.raisedAmount, c.targetAmount)} sx={{ height: 6, borderRadius: 3 }} />
                    </Box>
                  ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>Investment Stage Distribution</Typography>
                {Object.keys(stageDist).length === 0 ? <Typography color="text.secondary" variant="body2">No campaigns yet.</Typography> :
                  Object.entries(stageDist).map(([stage, count]) => (
                    <Box key={stage} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Chip icon={getStageIcon(stage)} label={stage} color={getStageColor(stage)} size="small" />
                      <Typography variant="h5" fontWeight="bold">{count}</Typography>
                    </Box>
                  ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };

  /* ══════════ MAIN RENDER ══════════ */
  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <TrendingUpIcon color="success" /> Fundraising Tracker
        </Typography>
      </Box>

      {/* STAT CARDS */}
      <Grid container spacing={3} mb={4}>
        {[
          { label: "Total Target",    value: `₹${totalTarget.toLocaleString()}`, sub: "Fundraising goal",    icon: <AccountBalanceWalletIcon sx={{ color: "#1f4d3a" }} /> },
          { label: "Total Raised",    value: `₹${totalRaised.toLocaleString()}`, sub: "Successfully raised", icon: <TrendingUpIcon sx={{ color: "#1f4d3a" }} /> },
          { label: "Active Campaigns",value: activeCampaigns,                    sub: "Currently running",   icon: <AssessmentIcon sx={{ color: "#1f4d3a" }} /> },
          { label: "Active Investors",value: investors.length,                   sub: "In pipeline",         icon: <PeopleIcon sx={{ color: "#1f4d3a" }} /> },
        ].map((s, i) => (
          <Grid key={i} size={{ xs: 12, md: 3 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">{s.label}</Typography>{s.icon}
                </Box>
                <Typography variant="h4" fontWeight="bold" sx={{ color: "#1f4d3a" }}>{s.value}</Typography>
                <Typography variant="body2" color="text.secondary">{s.sub}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* TABS */}
      <Card sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}
          sx={{ borderBottom: 1, borderColor: "divider",
            "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
            "& .Mui-selected": { color: "#1f4d3a" },
            "& .MuiTabs-indicator": { backgroundColor: "#1f4d3a" },
          }}>
          <Tab label="Fundraising Requests" />
          <Tab label="Investor Pipeline" />
          <Tab label="Communications" />
          <Tab label="Analytics" />
        </Tabs>
      </Card>

      <Box>
        {activeTab === 0 && <CampaignsTab />}
        {activeTab === 1 && <InvestorPipelineTab />}
        {activeTab === 2 && <CommunicationsTab />}
        {activeTab === 3 && <AnalyticsTab />}
      </Box>

      {/* ══════════ CAMPAIGN DIALOG ══════════ */}
      <Dialog open={campaignOpen} onClose={() => setCampaignOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          {editCampaignId ? "Edit Fundraising Request" : "Create Fundraising Request"}
          <IconButton onClick={() => setCampaignOpen(false)} sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2, pt: 2 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Product Name *" value={campaignForm.productName} onChange={e => setCampaignForm({ ...campaignForm, productName: e.target.value })} placeholder="Enter your product name" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth multiline rows={3} label="Scope *" value={campaignForm.scope} onChange={e => setCampaignForm({ ...campaignForm, scope: e.target.value })} placeholder="Describe your product, market, and business model" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField select fullWidth label="Investor Type *" value={campaignForm.investorType} onChange={e => setCampaignForm({ ...campaignForm, investorType: e.target.value })}>
                <MenuItem value="single">Single Investor</MenuItem>
                <MenuItem value="multiple">Multiple Investors</MenuItem>
              </TextField>
            </Grid>
            {campaignForm.investorType === "single" && (<>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth type="number" label="Investment Amount *" value={campaignForm.singleInvestorAmount}
                  onChange={e => setCampaignForm({ ...campaignForm, singleInvestorAmount: e.target.value, targetAmount: e.target.value })} placeholder="Enter amount needed" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth type="number" label="Amount Raised So Far" value={campaignForm.raisedAmount}
                  onChange={e => setCampaignForm({ ...campaignForm, raisedAmount: e.target.value })} placeholder="How much has been raised till now" />
              </Grid>
            </>)}
            {campaignForm.investorType === "multiple" && (<>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth type="number" label="Target Amount *" value={campaignForm.targetAmount}
                  onChange={e => setCampaignForm({ ...campaignForm, targetAmount: e.target.value })} placeholder="Total fundraising goal" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth type="number" label="Amount Raised So Far" value={campaignForm.raisedAmount}
                  onChange={e => setCampaignForm({ ...campaignForm, raisedAmount: e.target.value })} placeholder="How much has been raised till now" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth type="number" label="Min Investment *" value={campaignForm.investmentRange.min}
                  onChange={e => setCampaignForm({ ...campaignForm, investmentRange: { ...campaignForm.investmentRange, min: e.target.value } })} placeholder="Minimum investment" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth type="number" label="Max Investment *" value={campaignForm.investmentRange.max}
                  onChange={e => setCampaignForm({ ...campaignForm, investmentRange: { ...campaignForm.investmentRange, max: e.target.value } })} placeholder="Maximum investment" />
              </Grid>
            </>)}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField select fullWidth label="Investment Focus *" value={campaignForm.investmentFocus} onChange={e => setCampaignForm({ ...campaignForm, investmentFocus: e.target.value })}>
                <MenuItem value="Ideation">Ideation — Early concept stage</MenuItem>
                <MenuItem value="Prototype">Prototype — MVP development</MenuItem>
                <MenuItem value="Market Entry">Market Entry — Launch phase</MenuItem>
                <MenuItem value="Scaling">Scaling — Growth stage</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth type="number" label="Net Worth Declaration *" value={campaignForm.netWorthDeclaration}
                onChange={e => setCampaignForm({ ...campaignForm, netWorthDeclaration: e.target.value })} placeholder="Company's current net worth" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth multiline rows={2} label="Past Investments" value={campaignForm.pastInvestments}
                onChange={e => setCampaignForm({ ...campaignForm, pastInvestments: e.target.value })} placeholder="e.g., Seed Round: ₹100K, Angel: ₹50K" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Investor Relation" value={campaignForm.investorRelation}
                onChange={e => setCampaignForm({ ...campaignForm, investorRelation: e.target.value })} placeholder="Existing relationships or connections" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth type="date" label="Deadline *" value={campaignForm.deadline} InputLabelProps={{ shrink: true }}
                onChange={e => setCampaignForm({ ...campaignForm, deadline: e.target.value })} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setCampaignOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: "#1f4d3a", textTransform: "none", borderRadius: 2 }} onClick={handleSaveCampaign}>
            {editCampaignId ? "Update Request" : "Create Request"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ══════════ INVESTOR DIALOG ══════════ */}
      <Dialog open={investorOpen} onClose={() => setInvestorOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          {editInvestorId ? "Edit Investor" : "Add Investor"}
          <IconButton onClick={() => setInvestorOpen(false)} sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2, pt: 2 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Investor Name *" value={investorForm.name} onChange={e => setInvestorForm({ ...investorForm, name: e.target.value })} placeholder="Company or person name" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField select fullWidth label="Type *" value={investorForm.type} onChange={e => setInvestorForm({ ...investorForm, type: e.target.value })}>
                {["VC Firm", "Angel Investor", "Corporate Investor", "Family Office"].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth type="number" label="Investment Size *" value={investorForm.investmentSize} onChange={e => setInvestorForm({ ...investorForm, investmentSize: e.target.value })} placeholder="Expected investment amount" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField select fullWidth label="Status *" value={investorForm.status} onChange={e => setInvestorForm({ ...investorForm, status: e.target.value })}>
                {["Interested", "Committed", "Declined"].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth type="date" label="Last Contact" value={investorForm.lastContact} InputLabelProps={{ shrink: true }} onChange={e => setInvestorForm({ ...investorForm, lastContact: e.target.value })} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField select fullWidth label="Stage *" value={investorForm.stage} onChange={e => setInvestorForm({ ...investorForm, stage: e.target.value })}>
                {["Initial Contact", "Due Diligence", "Committed", "Declined"].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Focus Areas" value={investorForm.focusAreas} onChange={e => setInvestorForm({ ...investorForm, focusAreas: e.target.value })} placeholder="e.g., SaaS, AI/ML, Enterprise" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField select fullWidth label="Relation *" value={investorForm.relation} onChange={e => setInvestorForm({ ...investorForm, relation: e.target.value })}>
                {["New", "Warm", "Strong", "Excellent"].map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setInvestorOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: "#1f4d3a", textTransform: "none", borderRadius: 2 }} onClick={handleSaveInvestor}>
            {editInvestorId ? "Update Investor" : "Add Investor"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ══════════ COMMUNICATION DIALOG ══════════ */}
      <Dialog open={commOpen} onClose={() => setCommOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          {editCommId ? "Edit Communication" : "New Communication"}
          <IconButton onClick={() => setCommOpen(false)} sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2, pt: 2 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField select fullWidth label="Investor *" value={commForm.investorName} onChange={e => setCommForm({ ...commForm, investorName: e.target.value })}>
                {investors.length > 0
                  ? investors.map(i => <MenuItem key={i._id} value={i.name}>{i.name}</MenuItem>)
                  : <MenuItem value="">No investors added yet</MenuItem>}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField select fullWidth label="Type *" value={commForm.type} onChange={e => setCommForm({ ...commForm, type: e.target.value })}>
                {["Email", "Meeting", "Phone Call", "Video Call"].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Subject *" value={commForm.subject} onChange={e => setCommForm({ ...commForm, subject: e.target.value })} placeholder="Communication subject or title" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth type="date" label="Date *" value={commForm.date} InputLabelProps={{ shrink: true }} onChange={e => setCommForm({ ...commForm, date: e.target.value })} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField select fullWidth label="Status *" value={commForm.status} onChange={e => setCommForm({ ...commForm, status: e.target.value })}>
                {["Scheduled", "Sent", "Completed", "Pending"].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth multiline rows={3} label="Notes" value={commForm.notes} onChange={e => setCommForm({ ...commForm, notes: e.target.value })} placeholder="Additional notes or details" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setCommOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: "#1f4d3a", textTransform: "none", borderRadius: 2 }} onClick={handleSaveComm}>
            {editCommId ? "Update Communication" : "Add Communication"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ══════════ DELETE DIALOGS ══════════ */}
      {[
        { open: deleteCampaignOpen, onClose: () => setDeleteCampaignOpen(false), msg: "this fundraising request", onConfirm: confirmDeleteCampaign },
        { open: deleteInvestorOpen, onClose: () => setDeleteInvestorOpen(false), msg: "this investor",            onConfirm: confirmDeleteInvestor },
        { open: deleteCommOpen,     onClose: () => setDeleteCommOpen(false),     msg: "this communication",       onConfirm: confirmDeleteComm     },
      ].map((d, i) => (
        <Dialog key={i} open={d.open} onClose={d.onClose} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>Confirm Delete</DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Typography>Are you sure you want to delete {d.msg}?</Typography>
            <Typography color="text.secondary" mt={1} variant="body2">This action cannot be undone.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={d.onClose}>Cancel</Button>
            <Button color="error" variant="contained" onClick={d.onConfirm}>Delete</Button>
          </DialogActions>
        </Dialog>
      ))}
    </Box>
  );
}
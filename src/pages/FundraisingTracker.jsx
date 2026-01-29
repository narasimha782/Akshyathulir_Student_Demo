import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  LinearProgress,
  Tabs,
  Tab,
  TableContainer,
  Paper,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SendIcon from "@mui/icons-material/Send";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import BuildIcon from "@mui/icons-material/Build";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PublicIcon from "@mui/icons-material/Public";

export default function FundraisingTracker() {
  /* ================= TAB STATE ================= */
  const [activeTab, setActiveTab] = useState(0);

  /* ================= CAMPAIGN DIALOG STATE ================= */
  const [campaignOpen, setCampaignOpen] = useState(false);
  const [editCampaignIndex, setEditCampaignIndex] = useState(null);
  const [deleteCampaignOpen, setDeleteCampaignOpen] = useState(false);
  const [deleteCampaignIndex, setDeleteCampaignIndex] = useState(null);

  /* ================= INVESTOR DIALOG STATE ================= */
  const [investorOpen, setInvestorOpen] = useState(false);
  const [editInvestorIndex, setEditInvestorIndex] = useState(null);
  const [deleteInvestorOpen, setDeleteInvestorOpen] = useState(false);
  const [deleteInvestorIndex, setDeleteInvestorIndex] = useState(null);

  /* ================= COMMUNICATION DIALOG STATE ================= */
  const [commOpen, setCommOpen] = useState(false);
  const [editCommIndex, setEditCommIndex] = useState(null);
  const [deleteCommOpen, setDeleteCommOpen] = useState(false);
  const [deleteCommIndex, setDeleteCommIndex] = useState(null);

  /* ================= CAMPAIGNS DATA ================= */
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      productName: "AI-Powered Analytics Platform",
      scope: "B2B SaaS solution for enterprise data analytics",
      targetAmount: 500000,
      raisedAmount: 350000,
      investorType: "multiple",
      investmentRange: { min: 50000, max: 150000 },
      investmentFocus: "Scaling",
      netWorthDeclaration: 2500000,
      pastInvestments: "Series A: ₹300K, Angel Round: ₹150K",
      investorRelation: "Strong connections with tech VCs",
      status: "Active",
      deadline: "2026-06-30",
      createdDate: "2026-01-15",
    },
    {
      id: 2,
      productName: "Sustainable Fashion Marketplace",
      scope: "Online platform connecting eco-conscious consumers with sustainable brands",
      targetAmount: 250000,
      raisedAmount: 180000,
      investorType: "multiple",
      investmentRange: { min: 25000, max: 75000 },
      investmentFocus: "Market Entry",
      netWorthDeclaration: 850000,
      pastInvestments: "Bootstrapped: ₹100K",
      investorRelation: "Angel investor network",
      status: "Active",
      deadline: "2026-05-15",
      createdDate: "2026-01-10",
    },
  ]);

  /* ================= INVESTORS DATA ================= */
  const [investors, setInvestors] = useState([
    {
      id: 1,
      name: "Venture Capital Partners",
      type: "VC Firm",
      investmentSize: 150000,
      status: "Interested",
      lastContact: "2026-01-20",
      stage: "Due Diligence",
      focusAreas: "SaaS, AI/ML, Enterprise",
      relation: "Strong",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      type: "Angel Investor",
      investmentSize: 75000,
      status: "Committed",
      lastContact: "2026-01-25",
      stage: "Committed",
      focusAreas: "Sustainability, E-commerce",
      relation: "Excellent",
    },
  ]);

  /* ================= COMMUNICATIONS DATA ================= */
  const [communications, setCommunications] = useState([
    {
      id: 1,
      investorName: "Venture Capital Partners",
      type: "Email",
      subject: "Follow-up on Due Diligence",
      date: "2026-01-25",
      status: "Sent",
      notes: "Shared updated financial projections",
    },
    {
      id: 2,
      investorName: "Sarah Johnson",
      type: "Meeting",
      subject: "Product Demo and Q&A",
      date: "2026-01-27",
      status: "Scheduled",
      notes: "Scheduled for 2 PM",
    },
  ]);

  /* ================= CAMPAIGN FORM STATE ================= */
  const [campaignForm, setCampaignForm] = useState({
    productName: "",
    scope: "",
    targetAmount: "",
    investorType: "multiple",
    investmentRange: { min: "", max: "" },
    singleInvestorAmount: "",
    investmentFocus: "Ideation",
    netWorthDeclaration: "",
    pastInvestments: "",
    investorRelation: "",
    deadline: "",
  });

  /* ================= INVESTOR FORM STATE ================= */
  const [investorForm, setInvestorForm] = useState({
    name: "",
    type: "VC Firm",
    investmentSize: "",
    status: "Interested",
    lastContact: "",
    stage: "Initial Contact",
    focusAreas: "",
    relation: "New",
  });

  /* ================= COMMUNICATION FORM STATE ================= */
  const [commForm, setCommForm] = useState({
    investorName: "",
    type: "Email",
    subject: "",
    date: "",
    status: "Scheduled",
    notes: "",
  });

  /* ================= INVESTMENT FOCUS HELPERS ================= */
  const getStageIcon = (focus) => {
    switch (focus) {
      case "Ideation":
        return <LightbulbIcon />;
      case "Prototype":
        return <BuildIcon />;
      case "Market Entry":
        return <PublicIcon />;
      case "Scaling":
        return <RocketLaunchIcon />;
      default:
        return <LightbulbIcon />;
    }
  };

  const getStageColor = (focus) => {
    switch (focus) {
      case "Ideation":
        return "secondary";
      case "Prototype":
        return "info";
      case "Market Entry":
        return "success";
      case "Scaling":
        return "warning";
      default:
        return "default";
    }
  };

  /* ================= CAMPAIGN FUNCTIONS ================= */
  const openAddCampaign = () => {
    setEditCampaignIndex(null);
    setCampaignForm({
      productName: "",
      scope: "",
      targetAmount: "",
      investorType: "multiple",
      investmentRange: { min: "", max: "" },
      singleInvestorAmount: "",
      investmentFocus: "Ideation",
      netWorthDeclaration: "",
      pastInvestments: "",
      investorRelation: "",
      deadline: "",
    });
    setCampaignOpen(true);
  };

  const openEditCampaign = (index) => {
    const campaign = campaigns[index];
    setEditCampaignIndex(index);
    setCampaignForm({
      productName: campaign.productName,
      scope: campaign.scope,
      targetAmount: campaign.targetAmount,
      investorType: campaign.investorType,
      investmentRange: campaign.investmentRange || { min: "", max: "" },
      singleInvestorAmount: campaign.singleInvestorAmount || "",
      investmentFocus: campaign.investmentFocus,
      netWorthDeclaration: campaign.netWorthDeclaration,
      pastInvestments: campaign.pastInvestments || "",
      investorRelation: campaign.investorRelation || "",
      deadline: campaign.deadline || "",
    });
    setCampaignOpen(true);
  };

  const handleSaveCampaign = () => {
    const newCampaign = {
      id: editCampaignIndex !== null ? campaigns[editCampaignIndex].id : Date.now(),
      productName: campaignForm.productName,
      scope: campaignForm.scope,
      targetAmount: Number(campaignForm.targetAmount),
      raisedAmount: editCampaignIndex !== null ? campaigns[editCampaignIndex].raisedAmount : 0,
      investorType: campaignForm.investorType,
      investmentRange:
        campaignForm.investorType === "multiple"
          ? {
              min: Number(campaignForm.investmentRange.min),
              max: Number(campaignForm.investmentRange.max),
            }
          : null,
      singleInvestorAmount:
        campaignForm.investorType === "single" ? Number(campaignForm.singleInvestorAmount) : null,
      investmentFocus: campaignForm.investmentFocus,
      netWorthDeclaration: Number(campaignForm.netWorthDeclaration),
      pastInvestments: campaignForm.pastInvestments,
      investorRelation: campaignForm.investorRelation,
      status: editCampaignIndex !== null ? campaigns[editCampaignIndex].status : "Active",
      deadline: campaignForm.deadline || campaigns[editCampaignIndex]?.deadline,
      createdDate:
        editCampaignIndex !== null
          ? campaigns[editCampaignIndex].createdDate
          : new Date().toISOString().split("T")[0],
    };

    if (editCampaignIndex === null) {
      setCampaigns([...campaigns, newCampaign]);
    } else {
      const updated = [...campaigns];
      updated[editCampaignIndex] = newCampaign;
      setCampaigns(updated);
    }

    setCampaignOpen(false);
  };

  const openDeleteCampaign = (index) => {
    setDeleteCampaignIndex(index);
    setDeleteCampaignOpen(true);
  };

  const confirmDeleteCampaign = () => {
    setCampaigns(campaigns.filter((_, i) => i !== deleteCampaignIndex));
    setDeleteCampaignOpen(false);
  };

  /* ================= INVESTOR FUNCTIONS ================= */
  const openAddInvestor = () => {
    setEditInvestorIndex(null);
    setInvestorForm({
      name: "",
      type: "VC Firm",
      investmentSize: "",
      status: "Interested",
      lastContact: "",
      stage: "Initial Contact",
      focusAreas: "",
      relation: "New",
    });
    setInvestorOpen(true);
  };

  const openEditInvestor = (index) => {
    const investor = investors[index];
    setEditInvestorIndex(index);
    setInvestorForm({
      name: investor.name,
      type: investor.type,
      investmentSize: investor.investmentSize,
      status: investor.status,
      lastContact: investor.lastContact || "",
      stage: investor.stage,
      focusAreas: investor.focusAreas,
      relation: investor.relation,
    });
    setInvestorOpen(true);
  };

  const handleSaveInvestor = () => {
    const newInvestor = {
      id: editInvestorIndex !== null ? investors[editInvestorIndex].id : Date.now(),
      name: investorForm.name,
      type: investorForm.type,
      investmentSize: Number(investorForm.investmentSize),
      status: investorForm.status,
      lastContact: investorForm.lastContact || investors[editInvestorIndex]?.lastContact,
      stage: investorForm.stage,
      focusAreas: investorForm.focusAreas,
      relation: investorForm.relation,
    };

    if (editInvestorIndex === null) {
      setInvestors([...investors, newInvestor]);
    } else {
      const updated = [...investors];
      updated[editInvestorIndex] = newInvestor;
      setInvestors(updated);
    }

    setInvestorOpen(false);
  };

  const openDeleteInvestor = (index) => {
    setDeleteInvestorIndex(index);
    setDeleteInvestorOpen(true);
  };

  const confirmDeleteInvestor = () => {
    setInvestors(investors.filter((_, i) => i !== deleteInvestorIndex));
    setDeleteInvestorOpen(false);
  };

  /* ================= COMMUNICATION FUNCTIONS ================= */
  const openAddComm = () => {
    setEditCommIndex(null);
    setCommForm({
      investorName: "",
      type: "Email",
      subject: "",
      date: "",
      status: "Scheduled",
      notes: "",
    });
    setCommOpen(true);
  };

  const openEditComm = (index) => {
    const comm = communications[index];
    setEditCommIndex(index);
    setCommForm({
      investorName: comm.investorName,
      type: comm.type,
      subject: comm.subject,
      date: comm.date || "",
      status: comm.status,
      notes: comm.notes,
    });
    setCommOpen(true);
  };

  const handleSaveComm = () => {
    const newComm = {
      id: editCommIndex !== null ? communications[editCommIndex].id : Date.now(),
      investorName: commForm.investorName,
      type: commForm.type,
      subject: commForm.subject,
      date: commForm.date || communications[editCommIndex]?.date,
      status: commForm.status,
      notes: commForm.notes,
    };

    if (editCommIndex === null) {
      setCommunications([...communications, newComm]);
    } else {
      const updated = [...communications];
      updated[editCommIndex] = newComm;
      setCommunications(updated);
    }

    setCommOpen(false);
  };

  const openDeleteComm = (index) => {
    setDeleteCommIndex(index);
    setDeleteCommOpen(true);
  };

  const confirmDeleteComm = () => {
    setCommunications(communications.filter((_, i) => i !== deleteCommIndex));
    setDeleteCommOpen(false);
  };

  /* ================= ANALYTICS CALCULATIONS ================= */
  const totalTarget = campaigns.reduce((sum, c) => sum + c.targetAmount, 0);
  const totalRaised = campaigns.reduce((sum, c) => sum + c.raisedAmount, 0);
  const activeCampaigns = campaigns.filter((c) => c.status === "Active").length;

  /* ================= TAB 1: CAMPAIGNS ================= */
  const CampaignsTab = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight="bold">
          Fundraising Requests
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: "#1f4d3a" }}
          onClick={openAddCampaign}
        >
          Create New Request
        </Button>
      </Box>

      <Grid container spacing={3}>
        {campaigns.map((campaign, index) => (
          <Grid key={campaign.id} size={{ xs: 12 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                  <Box flex={1}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {campaign.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {campaign.scope}
                    </Typography>

                    <Box display="flex" gap={1} mb={2}>
                      <Chip
                        icon={getStageIcon(campaign.investmentFocus)}
                        label={campaign.investmentFocus}
                        color={getStageColor(campaign.investmentFocus)}
                        size="small"
                      />
                      <Chip
                        label={
                          campaign.investorType === "single"
                            ? "Single Investor"
                            : "Multiple Investors"
                        }
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </Box>

                  <Box display="flex" gap={1}>
                    <IconButton color="success" onClick={() => openEditCampaign(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => openDeleteCampaign(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Grid container spacing={2} mb={2}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Box bgcolor="#f5f5f5" p={2} borderRadius={2}>
                      <Typography variant="body2" color="text.secondary">
                        Target Amount
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        ₹{campaign.targetAmount.toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>

                  {campaign.investorType === "multiple" && campaign.investmentRange && (
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Box bgcolor="#f5f5f5" p={2} borderRadius={2}>
                        <Typography variant="body2" color="text.secondary">
                          Investment Range
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                          ₹{campaign.investmentRange.min.toLocaleString()} - ₹
                          {campaign.investmentRange.max.toLocaleString()}
                        </Typography>
                      </Box>
                    </Grid>
                  )}

                  <Grid size={{ xs: 12, md: 3 }}>
                    <Box bgcolor="#f5f5f5" p={2} borderRadius={2}>
                      <Typography variant="body2" color="text.secondary">
                        Net Worth
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        ₹{campaign.netWorthDeclaration.toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, md: 3 }}>
                    <Box bgcolor="#f5f5f5" p={2} borderRadius={2}>
                      <Typography variant="body2" color="text.secondary">
                        Deadline
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {new Date(campaign.deadline).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {campaign.pastInvestments && (
                  <Box mb={1}>
                    <Typography variant="body2" fontWeight="bold" color="text.secondary">
                      Past Investments:
                    </Typography>
                    <Typography variant="body2">{campaign.pastInvestments}</Typography>
                  </Box>
                )}

                {campaign.investorRelation && (
                  <Box mb={2}>
                    <Typography variant="body2" fontWeight="bold" color="text.secondary">
                      Investor Relations:
                    </Typography>
                    <Typography variant="body2">{campaign.investorRelation}</Typography>
                  </Box>
                )}

                <Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      Progress
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {Math.round((campaign.raisedAmount / campaign.targetAmount) * 100)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(
                      (campaign.raisedAmount / campaign.targetAmount) * 100,
                      100
                    )}
                    sx={{ height: 8, borderRadius: 5 }}
                  />
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    ₹{campaign.raisedAmount.toLocaleString()} raised of ₹
                    {campaign.targetAmount.toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  /* ================= TAB 2: INVESTOR PIPELINE ================= */
  const InvestorPipelineTab = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight="bold">
          Investor Pipeline
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: "#1f4d3a" }}
          onClick={openAddInvestor}
        >
          Add Investor
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
              <TableCell><b>Investor</b></TableCell>
              <TableCell><b>Type</b></TableCell>
              <TableCell><b>Investment Size</b></TableCell>
              <TableCell><b>Stage</b></TableCell>
              <TableCell><b>Last Contact</b></TableCell>
              <TableCell><b>Focus Areas</b></TableCell>
              <TableCell><b>Relation</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {investors.map((inv, index) => (
              <TableRow key={inv.id} hover>
                <TableCell>
                  <Typography fontWeight="bold">{inv.name}</Typography>
                </TableCell>
                <TableCell>{inv.type}</TableCell>
                <TableCell>₹{inv.investmentSize.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={inv.stage}
                    color={inv.status === "Committed" ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {inv.lastContact ? new Date(inv.lastContact).toLocaleDateString() : "-"}
                </TableCell>
                <TableCell>{inv.focusAreas}</TableCell>
                <TableCell>{inv.relation}</TableCell>
                <TableCell>
                  <IconButton color="success" onClick={() => openEditInvestor(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => openDeleteInvestor(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  /* ================= TAB 3: COMMUNICATIONS ================= */
  const CommunicationsTab = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight="bold">
          Communications
        </Typography>
        <Button
          variant="contained"
          startIcon={<SendIcon />}
          sx={{ bgcolor: "#1f4d3a" }}
          onClick={openAddComm}
        >
          New Communication
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
              <TableCell><b>Investor</b></TableCell>
              <TableCell><b>Type</b></TableCell>
              <TableCell><b>Subject</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Notes</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {communications.map((comm, index) => (
              <TableRow key={comm.id} hover>
                <TableCell>{comm.investorName}</TableCell>
                <TableCell>
                  <Chip label={comm.type} color="info" size="small" variant="outlined" />
                </TableCell>
                <TableCell>{comm.subject}</TableCell>
                <TableCell>{comm.date ? new Date(comm.date).toLocaleDateString() : "-"}</TableCell>
                <TableCell>
                  <Chip
                    label={comm.status}
                    color={comm.status === "Sent" ? "success" : "warning"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{comm.notes}</TableCell>
                <TableCell>
                  <IconButton color="success" onClick={() => openEditComm(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => openDeleteComm(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  /* ================= TAB 4: ANALYTICS ================= */
  const AnalyticsTab = () => {
    const stageDistribution = campaigns.reduce((acc, c) => {
      acc[c.investmentFocus] = (acc[c.investmentFocus] || 0) + 1;
      return acc;
    }, {});

    return (
      <Box>
        <Typography variant="h6" fontWeight="bold" mb={3}>
          Analytics & Insights
        </Typography>

        <Grid container spacing={3} mb={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="body2">Total Target</Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ color: "#1f4d3a", my: 1 }}>
                  ₹{totalTarget.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fundraising goal
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="body2">Total Raised</Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ color: "#1f4d3a", my: 1 }}>
                  ₹{totalRaised.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Successfully raised
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="body2">Active Campaigns</Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ color: "#1f4d3a", my: 1 }}>
                  {activeCampaigns}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Currently running
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="body2">Active Investors</Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ color: "#1f4d3a", my: 1 }}>
                  {investors.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  In pipeline
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Fundraising Progress
                </Typography>
                {campaigns.map((campaign) => (
                  <Box key={campaign.id} mb={2}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" fontWeight="bold">
                        {campaign.productName}
                      </Typography>
                      <Typography variant="body2">
                        {Math.round((campaign.raisedAmount / campaign.targetAmount) * 100)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(
                        (campaign.raisedAmount / campaign.targetAmount) * 100,
                        100
                      )}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Investment Stage Distribution
                </Typography>
                {Object.entries(stageDistribution).map(([stage, count]) => (
                  <Box
                    key={stage}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Chip
                        icon={getStageIcon(stage)}
                        label={stage}
                        color={getStageColor(stage)}
                        size="small"
                      />
                    </Box>
                    <Typography variant="h5" fontWeight="bold">
                      {count}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };

  /* ================= MAIN RENDER ================= */
  return (
    <Box p={3}>
      {/* PAGE HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <TrendingUpIcon color="success" />
          Fundraising Tracker
        </Typography>
      </Box>

      {/* METRIC CARDS */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Total Target</Typography>
                <AccountBalanceWalletIcon sx={{ color: "#1f4d3a" }} />
              </Box>
              <Typography variant="h4" fontWeight="bold" sx={{ color: "#1f4d3a" }}>
                ₹{totalTarget.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fundraising goal
              </Typography>
              <Box display="flex" gap={1} mt={2}>
                <Chip label="+0 today" color="success" size="small" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Total Raised</Typography>
                <TrendingUpIcon sx={{ color: "#1f4d3a" }} />
              </Box>
              <Typography variant="h4" fontWeight="bold" sx={{ color: "#1f4d3a" }}>
                ₹{totalRaised.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Successfully raised
              </Typography>
              <Box display="flex" gap={1} mt={2}>
                <Chip label="+0 today" color="success" size="small" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Active Campaigns</Typography>
                <AssessmentIcon sx={{ color: "#1f4d3a" }} />
              </Box>
              <Typography variant="h4" fontWeight="bold" sx={{ color: "#1f4d3a" }}>
                {activeCampaigns}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Currently running
              </Typography>
              <Box display="flex" gap={1} mt={2}>
                <Chip label="+0 today" color="success" size="small" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Active Investors</Typography>
                <PeopleIcon sx={{ color: "#1f4d3a" }} />
              </Box>
              <Typography variant="h4" fontWeight="bold" sx={{ color: "#1f4d3a" }}>
                {investors.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In pipeline
              </Typography>
              <Box display="flex" gap={1} mt={2}>
                <Chip label="+0 today" color="success" size="small" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* TABS */}
      <Card sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
            },
            "& .Mui-selected": {
              color: "#1f4d3a",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#1f4d3a",
            },
          }}
        >
          <Tab label="Fundraising Requests" />
          <Tab label="Investor Pipeline" />
          <Tab label="Communications" />
          <Tab label="Analytics" />
        </Tabs>
      </Card>

      {/* TAB CONTENT */}
      <Box>
        {activeTab === 0 && <CampaignsTab />}
        {activeTab === 1 && <InvestorPipelineTab />}
        {activeTab === 2 && <CommunicationsTab />}
        {activeTab === 3 && <AnalyticsTab />}
      </Box>

      {/* ================= ALL DIALOGS ================= */}
      
      {/* Campaign Add/Edit Dialog */}
      <Dialog open={campaignOpen} onClose={() => setCampaignOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          {editCampaignIndex === null ? "Create Fundraising Request" : "Edit Fundraising Request"}
          <IconButton
            onClick={() => setCampaignOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2, pt: 2 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Product Name *"
                value={campaignForm.productName}
                onChange={(e) => setCampaignForm({ ...campaignForm, productName: e.target.value })}
                placeholder="Enter your product name"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Scope *"
                value={campaignForm.scope}
                onChange={(e) => setCampaignForm({ ...campaignForm, scope: e.target.value })}
                placeholder="Describe your product, market, and business model"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                select
                fullWidth
                label="Investor Type *"
                value={campaignForm.investorType}
                onChange={(e) =>
                  setCampaignForm({
                    ...campaignForm,
                    investorType: e.target.value,
                  })
                }
              >
                <MenuItem value="single">Single Investor</MenuItem>
                <MenuItem value="multiple">Multiple Investors</MenuItem>
              </TextField>
            </Grid>

            {campaignForm.investorType === "single" && (
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Investment Amount *"
                  value={campaignForm.singleInvestorAmount}
                  onChange={(e) =>
                    setCampaignForm({
                      ...campaignForm,
                      singleInvestorAmount: e.target.value,
                      targetAmount: e.target.value,
                    })
                  }
                  placeholder="Enter amount needed"
                />
              </Grid>
            )}

            {campaignForm.investorType === "multiple" && (
              <>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Target Amount *"
                    value={campaignForm.targetAmount}
                    onChange={(e) => setCampaignForm({ ...campaignForm, targetAmount: e.target.value })}
                    placeholder="Total fundraising goal"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Min Investment *"
                    value={campaignForm.investmentRange.min}
                    onChange={(e) =>
                      setCampaignForm({
                        ...campaignForm,
                        investmentRange: {
                          ...campaignForm.investmentRange,
                          min: e.target.value,
                        },
                      })
                    }
                    placeholder="Minimum investment"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Max Investment *"
                    value={campaignForm.investmentRange.max}
                    onChange={(e) =>
                      setCampaignForm({
                        ...campaignForm,
                        investmentRange: {
                          ...campaignForm.investmentRange,
                          max: e.target.value,
                        },
                      })
                    }
                    placeholder="Maximum investment"
                  />
                </Grid>
              </>
            )}

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Investment Focus *"
                value={campaignForm.investmentFocus}
                onChange={(e) => setCampaignForm({ ...campaignForm, investmentFocus: e.target.value })}
              >
                <MenuItem value="Ideation">Ideation - Early concept stage</MenuItem>
                <MenuItem value="Prototype">Prototype - MVP development</MenuItem>
                <MenuItem value="Market Entry">Market Entry - Launch phase</MenuItem>
                <MenuItem value="Scaling">Scaling - Growth stage</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Net Worth Declaration *"
                value={campaignForm.netWorthDeclaration}
                onChange={(e) => setCampaignForm({ ...campaignForm, netWorthDeclaration: e.target.value })}
                placeholder="Company's current net worth"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Past Investments"
                value={campaignForm.pastInvestments}
                onChange={(e) => setCampaignForm({ ...campaignForm, pastInvestments: e.target.value })}
                placeholder="e.g., Seed Round: ₹100K, Angel: ₹50K, Bootstrapped: ₹25K"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Investor Relation"
                value={campaignForm.investorRelation}
                onChange={(e) => setCampaignForm({ ...campaignForm, investorRelation: e.target.value })}
                placeholder="Existing relationships or connections"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                type="date"
                label="Deadline *"
                value={campaignForm.deadline}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setCampaignForm({ ...campaignForm, deadline: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setCampaignOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: "#1f4d3a" }} onClick={handleSaveCampaign}>
            {editCampaignIndex === null ? "Create Request" : "Update Request"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Investor Add/Edit Dialog */}
      <Dialog open={investorOpen} onClose={() => setInvestorOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          {editInvestorIndex === null ? "Add Investor" : "Edit Investor"}
          <IconButton
            onClick={() => setInvestorOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2, pt: 2 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Investor Name *"
                value={investorForm.name}
                onChange={(e) => setInvestorForm({ ...investorForm, name: e.target.value })}
                placeholder="Company or person name"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Type *"
                value={investorForm.type}
                onChange={(e) => setInvestorForm({ ...investorForm, type: e.target.value })}
              >
                <MenuItem value="VC Firm">VC Firm</MenuItem>
                <MenuItem value="Angel Investor">Angel Investor</MenuItem>
                <MenuItem value="Corporate Investor">Corporate Investor</MenuItem>
                <MenuItem value="Family Office">Family Office</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Investment Size *"
                value={investorForm.investmentSize}
                onChange={(e) => setInvestorForm({ ...investorForm, investmentSize: e.target.value })}
                placeholder="Expected investment amount"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Status *"
                value={investorForm.status}
                onChange={(e) => setInvestorForm({ ...investorForm, status: e.target.value })}
              >
                <MenuItem value="Interested">Interested</MenuItem>
                <MenuItem value="Committed">Committed</MenuItem>
                <MenuItem value="Declined">Declined</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Last Contact"
                value={investorForm.lastContact}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setInvestorForm({ ...investorForm, lastContact: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Stage *"
                value={investorForm.stage}
                onChange={(e) => setInvestorForm({ ...investorForm, stage: e.target.value })}
              >
                <MenuItem value="Initial Contact">Initial Contact</MenuItem>
                <MenuItem value="Due Diligence">Due Diligence</MenuItem>
                <MenuItem value="Committed">Committed</MenuItem>
                <MenuItem value="Declined">Declined</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Focus Areas"
                value={investorForm.focusAreas}
                onChange={(e) => setInvestorForm({ ...investorForm, focusAreas: e.target.value })}
                placeholder="e.g., SaaS, AI/ML, Enterprise"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                select
                fullWidth
                label="Relation *"
                value={investorForm.relation}
                onChange={(e) => setInvestorForm({ ...investorForm, relation: e.target.value })}
              >
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="Warm">Warm</MenuItem>
                <MenuItem value="Strong">Strong</MenuItem>
                <MenuItem value="Excellent">Excellent</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setInvestorOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: "#1f4d3a" }} onClick={handleSaveInvestor}>
            {editInvestorIndex === null ? "Add Investor" : "Update Investor"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Communication Add/Edit Dialog */}
      <Dialog open={commOpen} onClose={() => setCommOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          {editCommIndex === null ? "New Communication" : "Edit Communication"}
          <IconButton
            onClick={() => setCommOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2, pt: 2 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Investor Name *"
                value={commForm.investorName}
                onChange={(e) => setCommForm({ ...commForm, investorName: e.target.value })}
                placeholder="Select or enter investor name"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Type *"
                value={commForm.type}
                onChange={(e) => setCommForm({ ...commForm, type: e.target.value })}
              >
                <MenuItem value="Email">Email</MenuItem>
                <MenuItem value="Meeting">Meeting</MenuItem>
                <MenuItem value="Phone Call">Phone Call</MenuItem>
                <MenuItem value="Video Call">Video Call</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Subject *"
                value={commForm.subject}
                onChange={(e) => setCommForm({ ...commForm, subject: e.target.value })}
                placeholder="Communication subject or title"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Date *"
                value={commForm.date}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setCommForm({ ...commForm, date: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Status *"
                value={commForm.status}
                onChange={(e) => setCommForm({ ...commForm, status: e.target.value })}
              >
                <MenuItem value="Scheduled">Scheduled</MenuItem>
                <MenuItem value="Sent">Sent</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Notes"
                value={commForm.notes}
                onChange={(e) => setCommForm({ ...commForm, notes: e.target.value })}
                placeholder="Additional notes or details"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setCommOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: "#1f4d3a" }} onClick={handleSaveComm}>
            {editCommIndex === null ? "Add Communication" : "Update Communication"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialogs */}
      <Dialog open={deleteCampaignOpen} onClose={() => setDeleteCampaignOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>Confirm Delete</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography>Are you sure you want to delete this fundraising request?</Typography>
          <Typography fontWeight="bold" mt={2}>{campaigns[deleteCampaignIndex]?.productName}</Typography>
          <Typography color="text.secondary" mt={1}>This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteCampaignOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDeleteCampaign}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteInvestorOpen} onClose={() => setDeleteInvestorOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>Confirm Delete</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography>Are you sure you want to delete this investor?</Typography>
          <Typography fontWeight="bold" mt={2}>{investors[deleteInvestorIndex]?.name}</Typography>
          <Typography color="text.secondary" mt={1}>This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteInvestorOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDeleteInvestor}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteCommOpen} onClose={() => setDeleteCommOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>Confirm Delete</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography>Are you sure you want to delete this communication?</Typography>
          <Typography fontWeight="bold" mt={2}>{communications[deleteCommIndex]?.subject}</Typography>
          <Typography color="text.secondary" mt={1}>This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteCommOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDeleteComm}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
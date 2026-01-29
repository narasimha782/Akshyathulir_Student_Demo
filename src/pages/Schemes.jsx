import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Fade,
  Tooltip,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  LinearProgress,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BusinessIcon from "@mui/icons-material/Business";
import ScienceIcon from "@mui/icons-material/Science";
import WomanIcon from "@mui/icons-material/Woman";
import PublicIcon from "@mui/icons-material/Public";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FilterListIcon from "@mui/icons-material/FilterList";
import { SCHEMES_DATA } from "../data/schemesData.js";
/* ================= ENHANCED CATEGORIES ================= */
const CATEGORIES = [
  {
    name: "Tech & Innovation",
    icon: <BusinessIcon sx={{ fontSize: 48 }} />,
    color: "#1f4d3a",
    gradient: "linear-gradient(135deg, #1f4d3a 0%, #2e7d32 100%)",
    count: 10,
  },
  {
    name: "Research & Science",
    icon: <ScienceIcon sx={{ fontSize: 48 }} />,
    color: "#2e7d32",
    gradient: "linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)",
    count: 10,
  },
  {
    name: "Women Empowerment",
    icon: <WomanIcon sx={{ fontSize: 48 }} />,
    color: "#388e3c",
    gradient: "linear-gradient(135deg, #388e3c 0%, #43a047 100%)",
    count: 10,
  },
  {
    name: "Govt. Schemes",
    icon: <PublicIcon sx={{ fontSize: 48 }} />,
    color: "#43a047",
    gradient: "linear-gradient(135deg, #43a047 0%, #4caf50 100%)",
    count: 10,
  },
];

export default function Schemes() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [bookmarked, setBookmarked] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [filterAmount, setFilterAmount] = useState("all");

  const filteredSchemes = SCHEMES_DATA.filter((s) => {
    const matchCategory = s.category === selectedCategory;
    const matchSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    let matchAmount = true;
    if (filterAmount !== "all") {
      const amount = parseFloat(s.amount.replace(/[^0-9.]/g, ""));
      if (filterAmount === "low" && amount > 500000) matchAmount = false;
      if (filterAmount === "medium" && (amount <= 500000 || amount > 2000000))
        matchAmount = false;
      if (filterAmount === "high" && amount <= 2000000) matchAmount = false;
    }

    return matchCategory && matchSearch && matchAmount;
  });

  const toggleBookmark = (schemeId) => {
    setBookmarked((prev) =>
      prev.includes(schemeId)
        ? prev.filter((id) => id !== schemeId)
        : [...prev, schemeId]
    );
  };

  const clearSearch = () => {
    setSearch("");
    setFilterAmount("all");
  };

  const openSchemeDetails = (scheme) => {
    setSelectedScheme(scheme);
  };

  const closeSchemeDetails = () => {
    setSelectedScheme(null);
  };

  /* ================= CATEGORY VIEW ================= */
  if (!selectedCategory) {
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
                Explore government and institutional funding opportunities for your startup
              </Typography>
            </Box>

            <Chip
              icon={<TrendingUpIcon />}
              label={`${SCHEMES_DATA.length} Active Schemes`}
              sx={{
                bgcolor: "#f5f5f5",
                fontWeight: 600,
                fontSize: "0.9rem",
                px: 1,
              }}
            />
          </Box>

          {/* STATS CARDS */}
          <Grid container spacing={2} mb={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ bgcolor: "#f1f8f4", borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Total Schemes
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="#1f4d3a">
                    40
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ bgcolor: "#f1f8f4", borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Categories
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="#1f4d3a">
                    4
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ bgcolor: "#f1f8f4", borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Bookmarked
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="#1f4d3a">
                    {bookmarked.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ bgcolor: "#f1f8f4", borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Avg. Funding
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="#1f4d3a">
                    ₹5L
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* CATEGORY CARDS */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {CATEGORIES.map((cat, index) => (
            <Fade in timeout={300 + index * 100} key={cat.name}>
              <Card
                onClick={() => setSelectedCategory(cat.name)}
                sx={{
                  background: cat.gradient,
                  color: "white",
                  borderRadius: 3,
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: 8,
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 4, position: "relative" }}>
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    {cat.icon}
                  </Avatar>

                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    {cat.name}
                  </Typography>

                  <Chip
                    label={`${cat.count} Schemes`}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.3)",
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                </CardContent>
              </Card>
            </Fade>
          ))}
        </Box>
      </Box>
    );
  }

  /* ================= SCHEMES VIEW ================= */
  const currentCategory = CATEGORIES.find((c) => c.name === selectedCategory);

  return (
    <Box>
      {/* HEADER */}
      <Box mb={3}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <IconButton
            onClick={() => {
              setSelectedCategory(null);
              setSearch("");
              setFilterAmount("all");
            }}
            sx={{
              bgcolor: "#f5f5f5",
              "&:hover": { bgcolor: "#e0e0e0" },
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Avatar
            sx={{
              bgcolor: currentCategory?.color,
              width: 50,
              height: 50,
            }}
          >
            {currentCategory?.icon}
          </Avatar>

          <Box flex={1}>
            <Typography variant="h5" fontWeight="bold" color="#1f4d3a">
              {selectedCategory}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filteredSchemes.length} schemes available
            </Typography>
          </Box>

          <Chip
            icon={<BookmarkIcon />}
            label={`${bookmarked.length} Saved`}
            sx={{ bgcolor: "#f5f5f5", fontWeight: 500 }}
          />
        </Box>

        {/* SEARCH & FILTERS */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            fullWidth
            size="small"
            placeholder={`Search in ${selectedCategory}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={clearSearch}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ flex: 1, minWidth: 300 }}
          />

          <Box display="flex" gap={1}>
            <Tooltip title="Filter by amount">
              <Button
                variant={filterAmount === "all" ? "contained" : "outlined"}
                size="small"
                onClick={() => setFilterAmount("all")}
                sx={{
                  bgcolor: filterAmount === "all" ? "#1f4d3a" : "transparent",
                  color: filterAmount === "all" ? "white" : "#1f4d3a",
                  borderColor: "#1f4d3a",
                }}
              >
                All
              </Button>
            </Tooltip>

            <Tooltip title="Under ₹5L">
              <Button
                variant={filterAmount === "low" ? "contained" : "outlined"}
                size="small"
                onClick={() => setFilterAmount("low")}
                sx={{
                  bgcolor: filterAmount === "low" ? "#1f4d3a" : "transparent",
                  color: filterAmount === "low" ? "white" : "#1f4d3a",
                  borderColor: "#1f4d3a",
                }}
              >
                Low
              </Button>
            </Tooltip>

            <Tooltip title="₹5L - ₹20L">
              <Button
                variant={filterAmount === "medium" ? "contained" : "outlined"}
                size="small"
                onClick={() => setFilterAmount("medium")}
                sx={{
                  bgcolor: filterAmount === "medium" ? "#1f4d3a" : "transparent",
                  color: filterAmount === "medium" ? "white" : "#1f4d3a",
                  borderColor: "#1f4d3a",
                }}
              >
                Medium
              </Button>
            </Tooltip>

            <Tooltip title="Above ₹20L">
              <Button
                variant={filterAmount === "high" ? "contained" : "outlined"}
                size="small"
                onClick={() => setFilterAmount("high")}
                sx={{
                  bgcolor: filterAmount === "high" ? "#1f4d3a" : "transparent",
                  color: filterAmount === "high" ? "white" : "#1f4d3a",
                  borderColor: "#1f4d3a",
                }}
              >
                High
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {/* SCHEMES GRID */}
      {filteredSchemes.length === 0 ? (
        <Card sx={{ textAlign: "center", py: 8, borderRadius: 3 }}>
          <Typography variant="h6" color="text.secondary">
            No schemes found matching your criteria
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2, borderColor: "#1f4d3a", color: "#1f4d3a" }}
            onClick={clearSearch}
          >
            Clear Filters
          </Button>
        </Card>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {filteredSchemes.map((scheme, index) => (
            <Fade in timeout={200 + index * 50} key={scheme.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "all 0.3s ease",
                  border: "2px solid transparent",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                    borderColor: currentCategory?.color,
                  },
                }}
              >
                {/* Bookmark Icon */}
                <IconButton
                  onClick={() => toggleBookmark(scheme.id)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "white",
                    boxShadow: 1,
                    "&:hover": { bgcolor: "#f5f5f5" },
                  }}
                  size="small"
                >
                  {bookmarked.includes(scheme.id) ? (
                    <BookmarkIcon sx={{ color: currentCategory?.color }} />
                  ) : (
                    <BookmarkBorderIcon />
                  )}
                </IconButton>

                {/* Top Color Bar */}
                <Box
                  sx={{
                    height: 6,
                    background: currentCategory?.gradient,
                  }}
                />

                <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      minHeight: 56,
                    }}
                  >
                    {scheme.title}
                  </Typography>

                  <Divider sx={{ my: 1.5 }} />

                  {/* Location */}
                  <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                    <LocationOnIcon
                      fontSize="small"
                      sx={{ color: currentCategory?.color }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {scheme.location}
                    </Typography>
                  </Box>

                  {/* Amount */}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={1.5}
                  >
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <AttachMoneyIcon
                        fontSize="small"
                        sx={{ color: currentCategory?.color }}
                      />
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ color: currentCategory?.color }}
                      >
                        {scheme.amount}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Deadline */}
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <CalendarTodayIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                      Deadline: {scheme.deadline}
                    </Typography>
                  </Box>

                  {/* Tags */}
                  <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
                    {scheme.tags.slice(0, 3).map((tag, i) => (
                      <Chip
                        key={i}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: `${currentCategory?.color}15`,
                          color: currentCategory?.color,
                          fontWeight: 500,
                          fontSize: "0.7rem",
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>

                {/* Action Buttons */}
                <Box p={2} pt={0}>
                  <Box display="flex" gap={1}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: currentCategory?.color,
                        "&:hover": { bgcolor: currentCategory?.color + "dd" },
                      }}
                    >
                      APPLY NOW
                    </Button>
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => openSchemeDetails(scheme)}
                        sx={{
                          border: `1px solid ${currentCategory?.color}`,
                          color: currentCategory?.color,
                        }}
                      >
                        <InfoOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Card>
            </Fade>
          ))}
        </Box>
      )}

      {/* SCHEME DETAILS DIALOG */}
      <Dialog
        open={!!selectedScheme}
        onClose={closeSchemeDetails}
        maxWidth="sm"
        fullWidth
      >
        {selectedScheme && (
          <>
            <DialogTitle
              sx={{
                background: currentCategory?.gradient,
                color: "white",
                pb: 2,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {selectedScheme.title}
              </Typography>
            </DialogTitle>

            <DialogContent sx={{ mt: 2 }}>
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Location
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  {selectedScheme.location}
                </Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Funding Amount
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: currentCategory?.color }}
                >
                  {selectedScheme.amount}
                </Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Application Deadline
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  {selectedScheme.deadline}
                </Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Tags
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {selectedScheme.tags.map((tag, i) => (
                    <Chip
                      key={i}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: `${currentCategory?.color}15`,
                        color: currentCategory?.color,
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" color="text.secondary" paragraph>
                This scheme provides funding support for startups in the{" "}
                {selectedCategory} category. Ensure you meet all eligibility
                criteria before applying.
              </Typography>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button onClick={closeSchemeDetails}>Close</Button>
              <Button
                variant="contained"
                onClick={() => toggleBookmark(selectedScheme.id)}
                sx={{
                  bgcolor: currentCategory?.color,
                  "&:hover": { bgcolor: currentCategory?.color + "dd" },
                }}
              >
                {bookmarked.includes(selectedScheme.id)
                  ? "Remove Bookmark"
                  : "Bookmark"}
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: currentCategory?.color,
                  "&:hover": { bgcolor: currentCategory?.color + "dd" },
                }}
              >
                Apply Now
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
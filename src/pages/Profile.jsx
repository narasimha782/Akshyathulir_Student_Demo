import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Paper,
  Divider,
  Avatar,
  Button,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import EditIcon from "@mui/icons-material/Edit";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("http://localhost:8000/startup/profile");
        const data = await response.json();
        
        if (response.ok) {
          setProfileData(data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // For now, using sample data (you can remove this when API is ready)
  useEffect(() => {
    // Sample data matching your registration form
    const sampleData = {
      // Personal Information
      firstName: "Rajesh",
      lastName: "Kumar",
      email: "rajesh@startup.com",
      phone: "+91 9876543210",
      phoneCountry: "India",
      phoneCode: "+91",
      dateOfBirth: "1995-05-15",
      gender: "Male",
      designation: "CEO & Founder",
      linkedin: "linkedin.com/in/rajeshkumar",
      
      // Company Details
      startupName: "TechVenture Innovations",
      legalStatus: "Private Limited",
      dateOfEstablishment: "2024-06-15",
      primarySector: "AI / ML",
      secondarySector: "SaaS",
      companyPAN: "ABCDE1234F",
      gstin: "29ABCDE1234F1Z5",
      currentTeamSize: 12,
      maleCount: 8,
      femaleCount: 4,
      companyWebsite: "https://www.techventure.com",
      numberOfBranches: 2,
      
      // Branch Addresses
      branchAddresses: [
        {
          fullAddress: "Building No. 5, Tech Park",
          country: "India",
          state: "Karnataka",
          district: "Bangalore Urban",
          city: "Bangalore",
          area: "Whitefield",
          pinCode: "560066"
        },
        {
          fullAddress: "Plot 23, IT Hub",
          country: "India",
          state: "Tamil Nadu",
          district: "Chennai",
          city: "Chennai",
          area: "OMR",
          pinCode: "600096"
        }
      ],
      
      // Founder Details
      founderFirstName: "Rajesh",
      founderLastName: "Kumar",
      founderEmail: "rajesh@techventure.com",
      founderPhone: "9876543210",
      founderPhoneCountry: "India",
      founderPhoneCode: "+91",
      founderDOB: "1995-05-15",
      founderGender: "Male",
      founderLinkedIn: "linkedin.com/in/rajeshkumar",
      founderFacebook: "facebook.com/rajeshkumar",
      
      // Opportunities for Students
      placementOffered: "Yes",
      placementType: "Both",
      internshipOffered: "Yes",
      internshipType: "Paid",
      trainingOffered: "Yes",
      trainingType: ["Industrial Training", "Skill Development"],
      fypOffered: "Yes",
      
      // Startup Requirements
      fundingNeeded: "Yes",
      mentorshipNeeded: "Yes",
      technologySupport: "Yes",
      incubationSpace: "Yes",
      registrationNeeded: "No",
      supportInterest: "Looking for internship coordination support and industry connections",
      governmentSchemes: "Interested in Startup India Seed Fund and state-level grants"
    };
    
    setProfileData(sampleData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading profile...</Typography>
      </Box>
    );
  }

  if (!profileData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>No profile data found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <AccountCircleIcon sx={{ color: "#1f4d3a", fontSize: 32 }} />
          My Profile
        </Typography>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          sx={{ bgcolor: "#1f4d3a" }}
        >
          Edit Profile
        </Button>
      </Box>

      {/* PROFILE HEADER CARD */}
      <Card sx={{ mb: 3, bgcolor: "#1f4d3a", color: "white", borderRadius: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: "#fff",
                color: "#1f4d3a",
                fontSize: 40,
                fontWeight: "bold"
              }}
            >
              {profileData.firstName?.charAt(0)}{profileData.lastName?.charAt(0)}
            </Avatar>
            <Box flex={1}>
              <Typography variant="h4" fontWeight="bold">
                {profileData.firstName} {profileData.lastName}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mt: 1 }}>
                {profileData.designation}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8, mt: 0.5 }}>
                {profileData.startupName}
              </Typography>
              <Box display="flex" gap={1} mt={2}>
                <Chip
                  label={profileData.legalStatus}
                  size="small"
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
                />
                <Chip
                  label={profileData.primarySector}
                  size="small"
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
                />
                {profileData.secondarySector && (
                  <Chip
                    label={profileData.secondarySector}
                    size="small"
                    sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* QUICK STATS */}
      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">Team Size</Typography>
              <Typography variant="h4" fontWeight="bold" sx={{ color: "#1f4d3a", my: 1 }}>
                {profileData.currentTeamSize}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profileData.maleCount} Male, {profileData.femaleCount} Female
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">Branches</Typography>
              <Typography variant="h4" fontWeight="bold" sx={{ color: "#1f4d3a", my: 1 }}>
                {profileData.numberOfBranches}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Locations
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">Established</Typography>
              <Typography variant="h6" fontWeight="bold" sx={{ color: "#1f4d3a", my: 1 }}>
                {new Date(profileData.dateOfEstablishment).toLocaleDateString('en-IN', {
                  month: 'short',
                  year: 'numeric'
                })}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.floor((new Date() - new Date(profileData.dateOfEstablishment)) / (1000 * 60 * 60 * 24 * 30))} months old
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">Industry</Typography>
              <Typography variant="h6" fontWeight="bold" sx={{ color: "#1f4d3a", my: 1 }}>
                {profileData.primarySector}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Primary Sector
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* PERSONAL INFORMATION */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <Box sx={{ bgcolor: "#1f4d3a", color: "white", p: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <PersonIcon />
          <Typography variant="h6" fontWeight="bold">
            Personal Information
          </Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 2, bgcolor: "#f5f5f5" }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Contact Details
                </Typography>
                <Box sx={{ "& > div": { py: 1, borderBottom: "1px solid #e0e0e0" } }}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Full Name:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {profileData.firstName} {profileData.lastName}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Email:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {profileData.email}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Phone:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {profileData.phoneCode} {profileData.phone}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">LinkedIn:</Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: "#1976d2" }}>
                      {profileData.linkedin || "Not provided"}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 2, bgcolor: "#f5f5f5" }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Personal Details
                </Typography>
                <Box sx={{ "& > div": { py: 1, borderBottom: "1px solid #e0e0e0" } }}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Date of Birth:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {new Date(profileData.dateOfBirth).toLocaleDateString('en-IN')}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Gender:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {profileData.gender}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Designation:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {profileData.designation}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* COMPANY INFORMATION */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <Box sx={{ bgcolor: "#1f4d3a", color: "white", p: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <BusinessIcon />
          <Typography variant="h6" fontWeight="bold">
            Company Information
          </Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 2, bgcolor: "#f5f5f5" }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Company Details
                </Typography>
                <Box sx={{ "& > div": { py: 1, borderBottom: "1px solid #e0e0e0" } }}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Startup Name:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {profileData.startupName}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Legal Status:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {profileData.legalStatus}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Established:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {new Date(profileData.dateOfEstablishment).toLocaleDateString('en-IN')}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Website:</Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: "#1976d2" }}>
                      {profileData.companyWebsite || "Not provided"}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 2, bgcolor: "#f5f5f5" }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Registration Details
                </Typography>
                <Box sx={{ "& > div": { py: 1, borderBottom: "1px solid #e0e0e0" } }}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Company PAN:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {profileData.companyPAN}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">GSTIN:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {profileData.gstin || "Not provided"}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Primary Sector:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {profileData.primarySector}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Secondary Sector:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {profileData.secondarySector || "None"}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* REGISTERED ADDRESSES */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <Box sx={{ bgcolor: "#1f4d3a", color: "white", p: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOnIcon />
          <Typography variant="h6" fontWeight="bold">
            Registered Office Addresses
          </Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {profileData.branchAddresses?.map((address, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Paper sx={{ p: 2, bgcolor: "#f5f5f5", height: "100%" }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {index === 0 ? "Main Office" : `Branch ${index}`}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" paragraph>
                    <b>Address:</b> {address.fullAddress}
                  </Typography>
                  <Typography variant="body2">
                    <b>City:</b> {address.city}, {address.area}
                  </Typography>
                  <Typography variant="body2">
                    <b>District:</b> {address.district}
                  </Typography>
                  <Typography variant="body2">
                    <b>State:</b> {address.state}
                  </Typography>
                  <Typography variant="body2">
                    <b>Country:</b> {address.country}
                  </Typography>
                  <Typography variant="body2">
                    <b>Pin Code:</b> {address.pinCode}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* FOUNDER INFORMATION */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <Box sx={{ bgcolor: "#1f4d3a", color: "white", p: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <WorkIcon />
          <Typography variant="h6" fontWeight="bold">
            Founder Information
          </Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 2, bgcolor: "#f5f5f5" }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Founder Contact
                </Typography>
                <Box sx={{ "& > div": { py: 1, borderBottom: "1px solid #e0e0e0" } }}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Name:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {profileData.founderFirstName} {profileData.founderLastName}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Email:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {profileData.founderEmail}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Phone:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {profileData.founderPhoneCode} {profileData.founderPhone}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">LinkedIn:</Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: "#1976d2" }}>
                      {profileData.founderLinkedIn || "Not provided"}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 2, bgcolor: "#f5f5f5" }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Founder Details
                </Typography>
                <Box sx={{ "& > div": { py: 1, borderBottom: "1px solid #e0e0e0" } }}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Date of Birth:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {new Date(profileData.founderDOB).toLocaleDateString('en-IN')}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Gender:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {profileData.founderGender}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Facebook:</Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: "#1976d2" }}>
                      {profileData.founderFacebook || "Not provided"}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* OPPORTUNITIES FOR STUDENTS */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <Box sx={{ bgcolor: "#1f4d3a", color: "white", p: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Opportunities for Students
          </Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box display="flex" justifyContent="space-between" p={2} bgcolor="#f5f5f5" borderRadius={2}>
                <Typography variant="body2">Placements Offered:</Typography>
                <Chip
                  label={profileData.placementOffered}
                  color={profileData.placementOffered === "Yes" ? "success" : "default"}
                  size="small"
                />
              </Box>
            </Grid>
            {profileData.placementOffered === "Yes" && (
              <Grid size={{ xs: 12, md: 6 }}>
                <Box display="flex" justifyContent="space-between" p={2} bgcolor="#f5f5f5" borderRadius={2}>
                  <Typography variant="body2">Placement Type:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {profileData.placementType}
                  </Typography>
                </Box>
              </Grid>
            )}

            <Grid size={{ xs: 12, md: 6 }}>
              <Box display="flex" justifyContent="space-between" p={2} bgcolor="#f5f5f5" borderRadius={2}>
                <Typography variant="body2">Internships Provided:</Typography>
                <Chip
                  label={profileData.internshipOffered}
                  color={profileData.internshipOffered === "Yes" ? "success" : "default"}
                  size="small"
                />
              </Box>
            </Grid>
            {profileData.internshipOffered === "Yes" && (
              <Grid size={{ xs: 12, md: 6 }}>
                <Box display="flex" justifyContent="space-between" p={2} bgcolor="#f5f5f5" borderRadius={2}>
                  <Typography variant="body2">Internship Type:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {profileData.internshipType}
                  </Typography>
                </Box>
              </Grid>
            )}

            <Grid size={{ xs: 12, md: 6 }}>
              <Box display="flex" justifyContent="space-between" p={2} bgcolor="#f5f5f5" borderRadius={2}>
                <Typography variant="body2">Training/Apprenticeship:</Typography>
                <Chip
                  label={profileData.trainingOffered}
                  color={profileData.trainingOffered === "Yes" ? "success" : "default"}
                  size="small"
                />
              </Box>
            </Grid>
            {profileData.trainingOffered === "Yes" && (
              <Grid size={{ xs: 12, md: 6 }}>
                <Box display="flex" justifyContent="space-between" p={2} bgcolor="#f5f5f5" borderRadius={2}>
                  <Typography variant="body2">Program Types:</Typography>
                  <Box display="flex" gap={0.5}>
                    {profileData.trainingType?.map((type, idx) => (
                      <Chip key={idx} label={type} size="small" />
                    ))}
                  </Box>
                </Box>
              </Grid>
            )}

            <Grid size={{ xs: 12, md: 6 }}>
              <Box display="flex" justifyContent="space-between" p={2} bgcolor="#f5f5f5" borderRadius={2}>
                <Typography variant="body2">Final Year Projects:</Typography>
                <Chip
                  label={profileData.fypOffered}
                  color={profileData.fypOffered === "Yes" ? "success" : "default"}
                  size="small"
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* STARTUP REQUIREMENTS */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <Box sx={{ bgcolor: "#1f4d3a", color: "white", p: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Startup Requirements & Support
          </Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Box textAlign="center" p={2} bgcolor="#f5f5f5" borderRadius={2}>
                <Typography variant="body2" gutterBottom>Funding Needed</Typography>
                <Chip
                  label={profileData.fundingNeeded}
                  color={profileData.fundingNeeded === "Yes" ? "success" : "default"}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Box textAlign="center" p={2} bgcolor="#f5f5f5" borderRadius={2}>
                <Typography variant="body2" gutterBottom>Mentorship Needed</Typography>
                <Chip
                  label={profileData.mentorshipNeeded}
                  color={profileData.mentorshipNeeded === "Yes" ? "success" : "default"}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Box textAlign="center" p={2} bgcolor="#f5f5f5" borderRadius={2}>
                <Typography variant="body2" gutterBottom>Technology Support</Typography>
                <Chip
                  label={profileData.technologySupport}
                  color={profileData.technologySupport === "Yes" ? "success" : "default"}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Box textAlign="center" p={2} bgcolor="#f5f5f5" borderRadius={2}>
                <Typography variant="body2" gutterBottom>Incubation Space</Typography>
                <Chip
                  label={profileData.incubationSpace}
                  color={profileData.incubationSpace === "Yes" ? "success" : "default"}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Box textAlign="center" p={2} bgcolor="#f5f5f5" borderRadius={2}>
                <Typography variant="body2" gutterBottom>Registration Needed</Typography>
                <Chip
                  label={profileData.registrationNeeded}
                  color={profileData.registrationNeeded === "Yes" ? "warning" : "success"}
                />
              </Box>
            </Grid>

            {profileData.supportInterest && (
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2, bgcolor: "#f5f5f5" }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Internship Support Interest
                  </Typography>
                  <Typography variant="body2">{profileData.supportInterest}</Typography>
                </Paper>
              </Grid>
            )}

            {profileData.governmentSchemes && (
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2, bgcolor: "#f5f5f5" }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Government Schemes Interest
                  </Typography>
                  <Typography variant="body2">{profileData.governmentSchemes}</Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

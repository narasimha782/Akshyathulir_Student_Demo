import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
  ThemeProvider,
  createTheme,
  CssBaseline,
  FormHelperText,
} from '@mui/material';

const theme = createTheme({
  typography: {
    h1: { fontSize: '34px' },
    h5: { fontSize: '20px' },
    h6: { fontSize: '16px' },
    body1: { fontSize: '16px' },
    body2: { fontSize: '14px' },
    button: { fontSize: '15px' },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: { width: '100%' },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: { fontSize: '16px' },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: '14px' },
      },
    },
  },
});

// Helper for row layout
const FormRow = ({ children }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
    {React.Children.map(children, (child) => (
      <Box sx={{ flex: 1, minWidth: '250px' }}>
        {child}
      </Box>
    ))}
  </Box>
);

function App() {
  // --- DATE CALCULATIONS ---
  // 1. Get Today's Date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // 2. Get Date 2 Years Ago from Today
  const d = new Date();
  d.setFullYear(d.getFullYear() - 2);
  const twoYearsAgo = d.toISOString().split('T')[0];
  // -------------------------

  const initialAddress = {
    fullAddress: '', 
    country: '',
    state: '',
    district: '',
    city: '',
    area: '',
    pinCode: ''
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    website: '',
    dateOfBirth: '',
    gender: '',
    designation: '',
    startupName: '',
    legalStatus: '',
    dateOfEstablishment: '',
    startupStage: '',
    primarySector: '',
    companyPAN: '',
    currentTeamSize: '',
    maleCount: '',
    femaleCount: '',
    gstin: '',
    companyWebsite: '',
    numberOfBranches: '1', 
    branchAddresses: [{ ...initialAddress }],
    founderName: '',
    founderEmail: '',
    founderPhone: '',
    founderDOB: '', // Added
    founderGender: '', // Added
    founderLinkedIn: '',
    founderFacebook: '', 
    fundingNeeded: '',
    mentorshipNeeded: '',
    technologySupport: '',
    incubationSpace: '',
    supportInterest: '',
    governmentSchemes: '',
  });

  const [errors, setErrors] = useState({});
  const [countryList, setCountryList] = useState([]);
  
  const [addressArrays, setAddressArrays] = useState({
    0: { states: [], districts: [], cities: [] }
  });

  const [isLoading, setIsLoading] = useState({
    countries: false, states: false, districts: false, cities: false
  });

  // --- API: Fetch Countries on Load ---
  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(prev => ({ ...prev, countries: true }));
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/iso");
        const data = await response.json();
        if (data.data) {
          setCountryList(data.data.map(c => c.name).sort());
        }
      } catch (error) { console.error(error); }
      setIsLoading(prev => ({ ...prev, countries: false }));
    };
    fetchCountries();
  }, []);

  // --- Handle Number of Branches ---
  const handleBranchCountChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    const updatedFormData = { ...formData, numberOfBranches: e.target.value };
    const validCount = count > 0 ? count : 1; 
    const currentAddresses = [...formData.branchAddresses];
    if (validCount > currentAddresses.length) {
        for (let i = currentAddresses.length; i < validCount; i++) {
            currentAddresses.push({ ...initialAddress });
        }
    } else if (validCount < currentAddresses.length) {
        currentAddresses.length = validCount;
    }
    updatedFormData.branchAddresses = currentAddresses;
    setFormData(updatedFormData);
  };

  // --- Generic Handler for Address Fields ---
  const handleAddressFieldChange = (index, field, value) => {
    const updatedAddresses = [...formData.branchAddresses];
    updatedAddresses[index] = { ...updatedAddresses[index], [field]: value };
    setFormData({ ...formData, branchAddresses: updatedAddresses });
    if (errors[`address_${index}_${field}`]) {
       setErrors({ ...errors, [`address_${index}_${field}`]: '' });
    }
  };

  // --- API Handlers for Dynamic Addresses ---
  const handleCountryChange = async (index, event) => {
    const selectedCountry = event.target.value;
    const updatedAddresses = [...formData.branchAddresses];
    updatedAddresses[index] = { 
      ...updatedAddresses[index], 
      country: selectedCountry, 
      state: '', district: '', city: '', pinCode: '' 
    };
    setFormData({ ...formData, branchAddresses: updatedAddresses });
    setAddressArrays(prev => ({ ...prev, [index]: { states: [], districts: [], cities: [] } }));

    if (selectedCountry) {
      setIsLoading(prev => ({ ...prev, states: true }));
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ country: selectedCountry }),
        });
        const result = await response.json();
        if (result.data?.states) {
          setAddressArrays(prev => ({
            ...prev,
            [index]: { ...prev[index], states: result.data.states.map(s => s.name) }
          }));
        }
      } catch (error) { console.error(error); }
      setIsLoading(prev => ({ ...prev, states: false }));
    }
  };

  const handleStateChange = async (index, event) => {
    const selectedState = event.target.value;
    const currentCountry = formData.branchAddresses[index].country;
    const updatedAddresses = [...formData.branchAddresses];
    updatedAddresses[index] = { 
      ...updatedAddresses[index], 
      state: selectedState, district: '', city: '', pinCode: '' 
    };
    setFormData({ ...formData, branchAddresses: updatedAddresses });
    setAddressArrays(prev => ({ ...prev, [index]: { ...prev[index], districts: [], cities: [] } }));

    if (selectedState && currentCountry) {
      setIsLoading(prev => ({ ...prev, districts: true }));
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ country: currentCountry, state: selectedState }),
        });
        const result = await response.json();
        if (result.data) {
            setAddressArrays(prev => ({
                ...prev,
                [index]: { ...prev[index], districts: result.data }
            }));
        }
      } catch (error) { console.error(error); }
      setIsLoading(prev => ({ ...prev, districts: false }));
    }
  };

  const handleDistrictChange = async (index, event) => {
    const selectedDistrict = event.target.value;
    const currentCountry = formData.branchAddresses[index].country;
    const updatedAddresses = [...formData.branchAddresses];
    updatedAddresses[index] = { 
      ...updatedAddresses[index], 
      district: selectedDistrict, city: '', pinCode: '' 
    };
    setFormData({ ...formData, branchAddresses: updatedAddresses });
    setAddressArrays(prev => ({ ...prev, [index]: { ...prev[index], cities: [] } }));

    if (selectedDistrict && currentCountry === 'India') {
      setIsLoading(prev => ({ ...prev, cities: true }));
      try {
        const response = await fetch(`https://api.postalpincode.in/postoffice/${selectedDistrict}`);
        const result = await response.json();
        if (result?.[0]?.PostOffice) {
          const uniqueCities = [...new Set(result[0].PostOffice.map(po => ({ name: po.Name, pin: po.Pincode })))];
          const sortedCities = uniqueCities.sort((a, b) => a.name.localeCompare(b.name));
          setAddressArrays(prev => ({
            ...prev,
            [index]: { ...prev[index], cities: sortedCities } 
          }));
        }
      } catch (error) { console.error(error); }
      setIsLoading(prev => ({ ...prev, cities: false }));
    }
  };

  const handleCityChange = (index, event) => {
      handleAddressFieldChange(index, 'city', event.target.value);
  }

  // --- General Input Handler ---
  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  // --- Validation ---
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    const checkRequired = (field, label) => {
      if (!formData[field]) {
        tempErrors[field] = `${label} is required`;
        isValid = false;
      }
    };

    // Personal Info
    checkRequired('firstName', 'First Name');
    checkRequired('lastName', 'Last Name');
    checkRequired('email', 'Email');
    checkRequired('phone', 'Phone');
    checkRequired('dateOfBirth', 'DOB');
    checkRequired('gender', 'Gender');
    checkRequired('designation', 'Designation');

    // Company
    checkRequired('startupName', 'Startup Name');
    checkRequired('legalStatus', 'Legal Status');
    checkRequired('dateOfEstablishment', 'Date of Est.');
    checkRequired('primarySector', 'Sector');
    checkRequired('companyPAN', 'PAN');
    checkRequired('currentTeamSize', 'Team Size');
    checkRequired('maleCount', 'Male Count');
    checkRequired('femaleCount', 'Female Count');
    checkRequired('numberOfBranches', 'Branches');

    // Founder 
    checkRequired('founderName', 'Founder Name');
    checkRequired('founderEmail', 'Founder Email');
    checkRequired('founderPhone', 'Founder Phone');
    checkRequired('founderDOB', 'Founder DOB'); // Added validation
    checkRequired('founderGender', 'Founder Gender'); // Added validation

    // ** Custom Date Validation **
    if (formData.dateOfEstablishment) {
      if (formData.dateOfEstablishment < twoYearsAgo) {
        tempErrors.dateOfEstablishment = "Startup must be less than 2 years old.";
        isValid = false;
      } else if (formData.dateOfEstablishment > today) {
        tempErrors.dateOfEstablishment = "Date cannot be in the future.";
        isValid = false;
      }
    }

    // Address Validation 
    formData.branchAddresses.forEach((addr, index) => {
        if (!addr.country) { tempErrors[`address_${index}_country`] = 'Required'; isValid = false; }
        if (!addr.state) { tempErrors[`address_${index}_state`] = 'Required'; isValid = false; }
        if (!addr.district) { tempErrors[`address_${index}_district`] = 'Required'; isValid = false; }
        if (!addr.city) { tempErrors[`address_${index}_city`] = 'Required'; isValid = false; }
        if (!addr.pinCode) { tempErrors[`address_${index}_pinCode`] = 'Required'; isValid = false; }
    });

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form Data Submitted:', formData);
      alert('Application Submitted Successfully!');
    } else {
      alert('Please correct errors before submitting.');
      console.log(errors);
    }
  };
  
  const handleReset = () => {
    setFormData({
      firstName: '', lastName: '', email: '', phone: '', linkedin: '', website: '', dateOfBirth: '', gender: '', designation: '',
      startupName: '', legalStatus: '', dateOfEstablishment: '', startupStage: '', primarySector: '', companyPAN: '', currentTeamSize: '', maleCount: '', femaleCount: '', gstin: '', companyWebsite: '', numberOfBranches: '1',
      branchAddresses: [{ ...initialAddress }],
      founderName: '', founderEmail: '', founderPhone: '', founderDOB: '', founderGender: '', founderLinkedIn: '', founderFacebook: '',
      fundingNeeded: '', mentorshipNeeded: '', technologySupport: '', incubationSpace: '', supportInterest: '', governmentSchemes: ''
    });
    setErrors({});
    setAddressArrays({ 0: { states: [], districts: [], cities: [] } });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" sx={{ mb: 4, color: '#1B5E20', fontWeight: 'bold', fontSize: '34px' }}>
        Startup Details Form (Under 2 Years)
      </Typography>

      {/* Company Details */}
      <Card sx={{ mb: 3, border: '2px solid #1B5E20' }}>
        <Box sx={{ backgroundColor: '#1B5E20', color: 'white', p: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '20px' }}>Company Details</Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <FormRow>
            <TextField 
              label="Startup Name *" 
              value={formData.startupName} 
              onChange={handleInputChange('startupName')} 
              error={!!errors.startupName}
              helperText={errors.startupName}
            />
            <TextField 
              select 
              label="Legal Status *" 
              value={formData.legalStatus} 
              onChange={handleInputChange('legalStatus')}
              error={!!errors.legalStatus}
              helperText={errors.legalStatus}
            >
                <MenuItem value="Private Limited">Private Limited</MenuItem>
                <MenuItem value="LLP">LLP</MenuItem>
                <MenuItem value="Partnership">Partnership</MenuItem>
                <MenuItem value="Sole Proprietorship">Sole Proprietorship</MenuItem>
            </TextField>
            
            {/* --- DATE OF ESTABLISHMENT --- */}
            <TextField
              label="Date of Establishment *"
              type="date"
              value={formData.dateOfEstablishment}
              onChange={handleInputChange('dateOfEstablishment')}
              InputLabelProps={{ shrink: true }}
              error={!!errors.dateOfEstablishment}
              helperText={errors.dateOfEstablishment || "Must be within last 2 years"}
              inputProps={{
                max: today,         // Cannot be future
                min: twoYearsAgo    // Cannot be older than 2 years
              }}
            />
            {/* -------------------------------------- */}

          </FormRow>
          <FormRow>
            
            <TextField
              select
              label="Primary Sector *"
              value={formData.primarySector}
              onChange={handleInputChange('primarySector')}
              error={!!errors.primarySector}
              helperText={errors.primarySector || "Select your startup's main sector"}
            >
              <MenuItem value="HealthTech">HealthTech</MenuItem>
              <MenuItem value="FinTech">FinTech</MenuItem>
              <MenuItem value="EdTech">EdTech</MenuItem>
              <MenuItem value="AgriTech">AgriTech</MenuItem>
              <MenuItem value="E-Commerce">E-Commerce</MenuItem>
              <MenuItem value="AI / ML">AI / ML</MenuItem>
              <MenuItem value="IoT">IoT</MenuItem>
              <MenuItem value="SaaS">SaaS</MenuItem>
              <MenuItem value="Blockchain">Blockchain</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField
              label="Company PAN *"
              value={formData.companyPAN}
              onChange={handleInputChange('companyPAN')}
              placeholder="ABCDE1234F"
              inputProps={{ maxLength: 10 }}
              error={!!errors.companyPAN}
              helperText={errors.companyPAN }
            />
            <TextField label="GSTIN / CIN" value={formData.gstin} onChange={handleInputChange('gstin')}  />
            
          </FormRow>
          <FormRow>
            <TextField 
              label="Current Team Size *" 
              value={formData.currentTeamSize} 
              onChange={handleInputChange('currentTeamSize')} 
              placeholder="Excluding Founders" 
              error={!!errors.currentTeamSize}
              helperText={errors.currentTeamSize}
            />
            <TextField
              label="Male Employees *"
              type="number"
              value={formData.maleCount}
              onChange={handleInputChange('maleCount')}
              error={!!errors.maleCount}
              helperText={errors.maleCount}
              inputProps={{ min: 0 }}
            />

            <TextField
              label="Female Employees *"
              type="number"
              value={formData.femaleCount}
              onChange={handleInputChange('femaleCount')}
              error={!!errors.femaleCount}
              helperText={errors.femaleCount}
              inputProps={{ min: 0 }}
            />
          </FormRow>

          <FormRow>
            
            
            <TextField label="Company Website" value={formData.companyWebsite} onChange={handleInputChange('companyWebsite')} placeholder="https://www.yourstartup.com" />
            <TextField 
                label="Number of Branches *" 
                type="number"
                value={formData.numberOfBranches} 
                onChange={handleBranchCountChange} 
                error={!!errors.numberOfBranches}
                helperText={errors.numberOfBranches }
                inputProps={{ min: 1 }}
            />
          </FormRow>
          
        </CardContent>
      </Card>

      {/* Dynamic Registered Office Address(es) based on Number of Branches */}
      {formData.branchAddresses.map((address, index) => {
          const currentLists = addressArrays[index] || { states: [], districts: [], cities: [] };
          
          return (
            <Card key={index} sx={{ mb: 3, border: '2px solid #1B5E20' }}>
                <Box sx={{ backgroundColor: '#1B5E20', color: 'white', p: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                        {index === 0 ? "Registered Office Address 1 (Main)" : `Registered Office Address ${index + 1}`}
                    </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                <FormRow>
                    {/* Country */}
                    <TextField 
                    select 
                    label="Country *" 
                    value={address.country} 
                    onChange={(e) => handleCountryChange(index, e)} 
                    disabled={isLoading.countries}
                    error={!!errors[`address_${index}_country`]}
                    helperText={errors[`address_${index}_country`]}
                    >
                    {isLoading.countries ? <MenuItem disabled><CircularProgress size={20} /> Loading...</MenuItem> : countryList.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                    </TextField>

                    {/* State */}
                    <TextField 
                    select 
                    label="State *" 
                    value={address.state} 
                    onChange={(e) => handleStateChange(index, e)} 
                    disabled={!address.country || isLoading.states}
                    error={!!errors[`address_${index}_state`]}
                    helperText={errors[`address_${index}_state`]}
                    >
                    {currentLists.states.length === 0 && address.country ? <MenuItem disabled>Loading/No Data</MenuItem> : 
                      currentLists.states.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                    </TextField>

                    {/* District */}
                    <TextField 
                    select 
                    label="District *" 
                    value={address.district} 
                    onChange={(e) => handleDistrictChange(index, e)} 
                    disabled={!address.state || isLoading.districts}
                    error={!!errors[`address_${index}_district`]}
                    helperText={errors[`address_${index}_district`]}
                    >
                    {currentLists.districts.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                    </TextField>

                    {/* City */}
                    {address.country === 'India' ? (
                    <TextField 
                        select 
                        label="City *" 
                        value={address.city} 
                        onChange={(e) => handleCityChange(index, e)} 
                        disabled={!address.district || isLoading.cities}
                        error={!!errors[`address_${index}_city`]}
                        helperText={errors[`address_${index}_city`]}
                    >
                        {currentLists.cities.map((c, i) => <MenuItem key={`${c.name}-${i}`} value={c.name}>{c.name}</MenuItem>)}
                    </TextField>
                    ) : (
                    <TextField 
                        label="City *" 
                        value={address.city} 
                        onChange={(e) => handleAddressFieldChange(index, 'city', e.target.value)} 
                        placeholder="Enter City" 
                        error={!!errors[`address_${index}_city`]}
                        helperText={errors[`address_${index}_city`]}
                    />
                    )}
                </FormRow>

                
                <FormRow>
                    <TextField 
                        label="Area / Locality" 
                        value={address.area} 
                        onChange={(e) => handleAddressFieldChange(index, 'area', e.target.value)} 
                    />
                    <TextField 
                    label="Pin Code *" 
                    value={address.pinCode} 
                    onChange={(e) => handleAddressFieldChange(index, 'pinCode', e.target.value)} 
                    error={!!errors[`address_${index}_pinCode`]}
                    helperText={errors[`address_${index}_pinCode`]}
                    />
                </FormRow>

                <FormRow>
                      <TextField 
                        label="Full Address (Street / Building / Door No)" 
                        multiline
                        rows={2}
                        value={address.fullAddress} 
                        onChange={(e) => handleAddressFieldChange(index, 'fullAddress', e.target.value)} 
                        placeholder="Enter detailed address here"
                      />
                </FormRow>
                </CardContent>
            </Card>
          )
      })}


      {/* Personal Information */}
      <Card sx={{ mb: 3, border: '2px solid #1B5E20' }}>
        <Box sx={{ backgroundColor: '#1B5E20', color: 'white', p: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '20px' }}>Personal Information</Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <FormRow>
            <TextField 
              label="First Name *" 
              value={formData.firstName} 
              onChange={handleInputChange('firstName')} 
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField 
              label="Last Name *" 
              value={formData.lastName} 
              onChange={handleInputChange('lastName')} 
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <TextField 
              label="Email Address *" 
              type="email" 
              value={formData.email} 
              onChange={handleInputChange('email')} 
              error={!!errors.email}
              helperText={errors.email}
            />
          </FormRow>
          <FormRow>
            
            <TextField 
              label="Phone Number *" 
              value={formData.phone} 
              onChange={handleInputChange('phone')} 
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField label="LinkedIn Profile URL" value={formData.linkedin} onChange={handleInputChange('linkedin')} />
            <TextField 
              label="Date of Birth *" 
              type="date" 
              value={formData.dateOfBirth} 
              onChange={handleInputChange('dateOfBirth')} 
              InputLabelProps={{ shrink: true }} 
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth}
              inputProps={{ max: today }} // Restrict future dates
            />
          </FormRow>
          <FormRow>
            
            
            {/* --- UPDATED: DATE OF BIRTH --- */}
            
            {/* ----------------------------- */}

          </FormRow>
          <FormRow>
            <TextField
              label="Designation *"
              value={formData.designation}
              onChange={handleInputChange('designation')}
              error={!!errors.designation}
              helperText={errors.designation}
              sx={{ flex: 1 }}
            />
            <FormControl component="fieldset" error={!!errors.gender}>
              <FormLabel component="legend" sx={{ fontSize: '14px' }}>Gender *</FormLabel>
              <RadioGroup row value={formData.gender} onChange={handleInputChange('gender')}>
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Others" control={<Radio />} label="Others" />
              </RadioGroup>
              {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
            </FormControl>
          </FormRow>
        </CardContent>
      </Card>

      {/* Founder Details */}
      <Card sx={{ mb: 3, border: '2px solid #1B5E20' }}>
        <Box sx={{ backgroundColor: '#1B5E20', color: 'white', p: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
            Founder Details
            </Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>

            {/* Founder Basic Details */}
            <FormRow>
            <TextField
                label="Founder Name *"
                value={formData.founderName}
                onChange={handleInputChange('founderName')}
                error={!!errors.founderName}
                helperText={errors.founderName}
            />

            <TextField
                label="Founder Email *"
                type="email"
                value={formData.founderEmail}
                onChange={handleInputChange('founderEmail')}
                error={!!errors.founderEmail}
                helperText={errors.founderEmail}
            />

            <TextField
                label="Founder Phone *"
                value={formData.founderPhone}
                onChange={handleInputChange('founderPhone')}
                error={!!errors.founderPhone}
                helperText={errors.founderPhone}
            />
            </FormRow>

            {/* --- NEW SECTION: Founder DOB and Gender --- */}
            <FormRow>
                <TextField 
                    label="Founder Date of Birth *" 
                    type="date" 
                    value={formData.founderDOB} 
                    onChange={handleInputChange('founderDOB')} 
                    InputLabelProps={{ shrink: true }} 
                    error={!!errors.founderDOB}
                    helperText={errors.founderDOB}
                    inputProps={{ max: today }} 
                />

                <FormControl component="fieldset" error={!!errors.founderGender} sx={{ minWidth: 250 }}>
                    <FormLabel component="legend" sx={{ fontSize: '14px' }}>Founder Gender *</FormLabel>
                    <RadioGroup row value={formData.founderGender} onChange={handleInputChange('founderGender')}>
                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                        <FormControlLabel value="Others" control={<Radio />} label="Others" />
                    </RadioGroup>
                    {errors.founderGender && <FormHelperText>{errors.founderGender}</FormHelperText>}
                </FormControl>
            </FormRow>
            {/* ------------------------------------------- */}

            {/* Social Profiles */}
            <FormRow>
            <TextField
                label="Founder LinkedIn Profile"
                value={formData.founderLinkedIn}
                onChange={handleInputChange('founderLinkedIn')}
                placeholder="https://linkedin.com/in/username"
            />
            
            <TextField
                label="Founder Facebook Profile"
                value={formData.founderFacebook}
                onChange={handleInputChange('founderFacebook')}
                placeholder="https://facebook.com/username"
            />
            </FormRow>

        </CardContent>
        </Card>

      {/* Startup Requirements */}
      <Card sx={{ mb: 3, border: '2px solid #1B5E20' }}>
        <Box sx={{ backgroundColor: '#1B5E20', color: 'white', p: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
            Startup Requirements
            </Typography>
        </Box>

        <CardContent sx={{ px: 4, py: 3 }}>
            <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                columnGap: 6,
                rowGap: 4,
            }}
            >
            {/* Funding */}
            <FormControl>
                <FormLabel
                    sx={{
                    mb: 1,
                    fontSize: '14px',
                    textAlign: 'left',
                    }}
                >
                    Funding Needed ?
                </FormLabel>
                <RadioGroup
                row
                value={formData.fundingNeeded}
                onChange={handleInputChange('fundingNeeded')}
                >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>

            {/* Mentorship */}
            <FormControl>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>
                    Mentorship Needed ?
                </FormLabel>
                <RadioGroup
                row
                value={formData.mentorshipNeeded}
                onChange={handleInputChange('mentorshipNeeded')}
                >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>

            {/* Technology */}
            <FormControl>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>
                    Technology Support Needed ?
                </FormLabel>
                <RadioGroup
                row
                value={formData.technologySupport}
                onChange={handleInputChange('technologySupport')}
                >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>

            {/* Incubation */}
            <FormControl>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>
                    Do you require Incubation / Co-working Space ?
                </FormLabel>
                <RadioGroup
                row
                value={formData.incubationSpace}
                onChange={handleInputChange('incubationSpace')}
                >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>

            {/* Internship support */}
            <TextField
                multiline
                rows={3}
                label="I am interested in receiving support for an internship program"
                value={formData.supportInterest || ''}
                onChange={handleInputChange('supportInterest')}
            />

            {/* Government schemes */}
            <TextField
                multiline
                rows={3}
                label="Check my eligibility for relevant Government Startup Schemes."
                value={formData.governmentSchemes || ''}
                onChange={handleInputChange('governmentSchemes')}
            />
            </Box>
        </CardContent>
        </Card>

      {/* Submit Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
        <Button variant="contained" size="large" onClick={handleSubmit} sx={{ backgroundColor: '#1B5E20', '&:hover': { backgroundColor: '#0f7e16ff' }, px: 4, py: 1.5 }}>SUBMIT APPLICATION</Button>
        <Button variant="outlined" size="large" onClick={handleReset} sx={{ borderColor: '#f44336', color: '#f44336', '&:hover': { borderColor: '#d32f2f', backgroundColor: '#ffebee' }, px: 4, py: 1.5 }}>RESET FORM</Button>
      </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
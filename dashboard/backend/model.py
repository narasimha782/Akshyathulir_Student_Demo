from pydantic import BaseModel, EmailStr
from typing import Optional, List

# Helper model for addresses
class BranchAddress(BaseModel):
    fullAddress: Optional[str] = ""
    country: Optional[str] = ""
    state: Optional[str] = ""
    district: Optional[str] = ""
    city: Optional[str] = ""
    area: Optional[str] = ""
    pinCode: Optional[str] = ""
    isPrimary: Optional[bool] = False

# Main Startup Application Model
class StartupApplication(BaseModel):
    # ---------- Personal ----------
    firstName: Optional[str] = ""
    lastName: Optional[str] = ""
    email: EmailStr
    dateOfBirth: Optional[str] = ""
    gender: Optional[str] = ""

    phoneCountry: Optional[str] = "India"
    phoneCode: Optional[str] = "+91"
    phone: Optional[str] = ""

    # ---------- Online ----------
    linkedin: Optional[str] = ""
    website: Optional[str] = ""

    # ---------- Company ----------
    designation: Optional[str] = ""
    cin: Optional[str] = ""
    startupName: Optional[str] = ""
    legalStatus: Optional[str] = ""
    dateOfEstablishment: Optional[str] = ""
    primarySector: Optional[str] = ""
    secondarySector: Optional[str] = ""
    companyPAN: Optional[str] = ""
    gstin: Optional[str] = ""
    companyWebsite: Optional[str] = ""
    numberOfBranches: Optional[int] = 1

    # ---------- Address ----------
    branchAddresses: List[BranchAddress] = []

    # ---------- Team ----------
    currentTeamSize: Optional[int] = 0
    maleCount: Optional[int] = 0
    femaleCount: Optional[int] = 0

    # ---------- Founder ----------
    founderFirstName: Optional[str] = ""
    founderLastName: Optional[str] = ""
    founderEmail: Optional[EmailStr] = None

    founderPhoneCountry: Optional[str] = "India"
    founderPhoneCode: Optional[str] = "+91"
    founderPhone: Optional[str] = ""

    founderDOB: Optional[str] = ""
    founderGender: Optional[str] = ""
    founderLinkedIn: Optional[str] = ""
    founderFacebook: Optional[str] = ""

    # ---------- Support ----------
    fundingNeeded: Optional[str] = ""
    mentorshipNeeded: Optional[str] = ""
    technologySupport: Optional[str] = ""
    incubationSpace: Optional[str] = ""
    registrationNeeded: Optional[str] = ""
    supportInterest: Optional[str] = ""
    governmentSchemes: Optional[str] = ""

    # ---------- Opportunities ----------
    placementOffered: Optional[str] = ""
    placementType: Optional[str] = ""
    internshipOffered: Optional[str] = ""
    internshipType: Optional[str] = ""
    trainingOffered: Optional[str] = ""
    trainingType: List[str] = []
    fypOffered: Optional[str] = ""
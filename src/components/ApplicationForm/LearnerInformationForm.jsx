import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import PersonalInformationForm from "./form-steps/PersonalInformationForm";
import EducationInformationForm from "./form-steps/EducationInformationForm";
import HouseholdInformationForm from "./form-steps/HouseholdInformationForm";
import RequiredDocumentsForm from "./form-steps/RequiredDocumentsForm";
import SuccessMessage from "./form-steps/SuccessMessage";

const STORAGE_KEY = "bursary_form_data";
const STORAGE_STEP_KEY = "bursary_form_step";

export default function LearnerInformationForm() {
  // Load initial data from localStorage or use defaults
  const loadInitialData = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Error loading saved form data:", error);
    }

    return {
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      nationality: "",
      country: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      postalCode: "",

      highSchoolName: "",
      highSchoolMatricYear: "",
      institutionName: "",
      institutionDegreeType: "",
      institutionDegreeName: "",
      institutionMajor: "",
      institutionStartYear: "",
      institutionEndYear: "",
      institutionGPA: "",

      numberOfMembers: "1",

      parent1FirstName: "",
      parent1LastName: "",
      parent1Gender: "",
      parent1Relationship: "",
      parent1EmploymentStatus: "",
      parent1Occupation: "",
      parent1OtherIncome: "",
      parent1MonthlyIncome: "",

      parent2FirstName: "",
      parent2LastName: "",
      parent2Gender: "",
      parent2Relationship: "",
      parent2EmploymentStatus: "",
      parent2Occupation: "",
      parent2OtherIncome: "",
      parent2MonthlyIncome: "",

      member1FirstName: "",
      member1LastName: "",
      member1Gender: "",
      member1Relationship: "",
      member1EmploymentStatus: "",
      member1Occupation: "",
      member1MonthlyIncome: "",
    };
  };

  // Load initial step from localStorage or use default
  const loadInitialStep = () => {
    try {
      const saved = localStorage.getItem(STORAGE_STEP_KEY);
      if (saved) {
        return parseInt(saved, 10);
      }
    } catch (error) {
      console.error("Error loading saved step:", error);
    }
    return 0;
  };

  const [activeStep, setActiveStep] = useState(loadInitialStep);
  const [formData, setFormData] = useState(loadInitialData);

  const [documents, setDocuments] = useState({
    transcript: {},
    nationalIdCard: {},
    proofOfResidence: {},
    letterOfRecommendation: {},
    resume: {},
    coverLetter: {},
    payslip: {},
  });
  const [additionalDocs, setAdditionalDocs] = useState([]);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [memberCount, setMemberCount] = useState(1);

  // Save form data to localStorage whenever formData changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  }, [formData]);

  // Save current step to localStorage whenever activeStep changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_STEP_KEY, activeStep.toString());
    } catch (error) {
      console.error("Error saving step:", error);
    }
  }, [activeStep]);

  // Clear saved data when form is successfully submitted
  const clearSavedData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_STEP_KEY);
    } catch (error) {
      console.error("Error clearing saved data:", error);
    }
  };

  const steps = [
    { label: "Personal Information", shortLabel: "Personal Info" },
    { label: "Education Information", shortLabel: "Education Info" },
    { label: "Household Information", shortLabel: "Household Info" },
    { label: "Required Documents", shortLabel: "Documents" },
  ];

  const handleAddMember = () => {
    setMemberCount((prev) => prev + 1);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validatePersonalInfo = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.dob.trim()) newErrors.dob = "Date of birth is required";
    if (!formData.nationality.trim())
      newErrors.nationality = "Nationality is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.gender.trim()) newErrors.gender = "Gender is required";
    if (!formData.address1.trim()) newErrors.address1 = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.postalCode.trim())
      newErrors.postalCode = "Postal code is required";
    return newErrors;
  };

  const validateEducationInfo = () => {
    const newErrors = {};

    if (!formData.highSchoolName.trim())
      newErrors.highSchoolName = "High school name required";
    if (!formData.highSchoolMatricYear.trim()) {
      newErrors.highSchoolMatricYear = "Matric year required";
    } else if (isNaN(Number(formData.highSchoolMatricYear))) {
      newErrors.highSchoolMatricYear = "Matric year must be a valid number";
    }

    if (!subjects.length) {
      newErrors.subjects = "At least one subject is required";
    } else {
      subjects.forEach((subject, index) => {
        if (!subject.name || !subject.name.trim()) {
          newErrors[
            `subjects.${index}.name`
          ] = `Subject name is required for subject #${index + 1}`;
        }
        if (!subject.grade || !subject.grade.trim()) {
          newErrors[
            `subjects.${index}.grade`
          ] = `Grade is required for subject #${index + 1}`;
        }
      });
    }
    console.log("Education validation errors:", newErrors);
    return newErrors;
  };

  const validateHouseholdInfo = () => {
    const newErrors = {};
    if (!formData.numberOfMembers.trim())
      newErrors.numberOfMembers = "Number of members required";
    if (!formData.parent1FirstName.trim())
      newErrors.parent1FirstName = "Parent 1 first name required";
    if (!formData.parent1LastName.trim())
      newErrors.parent1LastName = "Parent 1 last name required";
    if (!formData.parent1Relationship.trim())
      newErrors.parent1Relationship = "Relationship required";
    if (!formData.parent1EmploymentStatus.trim())
      newErrors.parent1EmploymentStatus = "Employment status required";
    return newErrors;
  };

  const handleFileUpload = (docType, event) => {
    const file = event.target.files[0];
    if (!file) return;
    setDocuments((prev) => ({
      ...prev,
      [docType]: { uploaded: true, file },
    }));
  };

  const handleFileRemove = (docType) => {
    setDocuments((prev) => ({
      ...prev,
      [docType]: {},
    }));
  };

  const handleAdditionalDocUpload = (index, event) => {
    const file = event.target.files[0];
    if (!file) return;
    setAdditionalDocs((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
  };

  const validateRequiredDocuments = () => {
    const newErrors = {};
    // Required documents
    if (!documents.transcript.uploaded)
      newErrors.transcript = "Transcript is required";
    if (!documents.nationalIdCard.uploaded)
      newErrors.nationalIdCard = "Proof of identification is required";
    if (!documents.proofOfResidence.uploaded)
      newErrors.proofOfResidence = "Proof of residence is required";
    // Add more required docs as needed
    return newErrors;
  };

  const validateStep = () => {
    switch (activeStep) {
      case 0:
        return validatePersonalInfo();
      case 1:
        return validateEducationInfo();
      case 2:
        return validateHouseholdInfo();
      case 3:
        return validateRequiredDocuments();
      default:
        return {};
    }
  };

  const handleNext = () => {
    const stepErrors = validateStep();
    if (Object.keys(stepErrors).length === 0) {
      setErrors({});
      setTouched({});
      if (activeStep < 3) setActiveStep(activeStep + 1);
    } else {
      setErrors(stepErrors);
      const touchedFields = {};
      Object.keys(stepErrors).forEach((field) => (touchedFields[field] = true));
      setTouched(touchedFields);
    }
  };

  const handleSubmit = () => {
    const stepErrors = validateRequiredDocuments();
    if (Object.keys(stepErrors).length === 0) {
      console.log("Final form data on submit:", formData);
      console.log("Submitted documents:", documents);
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        // Clear saved data after successful submission
        clearSavedData();
      }, 1000);
    } else {
      setErrors(stepErrors);
      const touchedFields = {};
      Object.keys(stepErrors).forEach((field) => (touchedFields[field] = true));
      setTouched(touchedFields);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  // Add a function to manually clear the form (optional)
  const handleClearForm = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all form data? This cannot be undone."
      )
    ) {
      clearSavedData();
      setFormData(loadInitialData());
      setActiveStep(0);
      setSubjects([]);
      setMemberCount(1);
      setErrors({});
      setTouched({});
    }
  };

  const formProps = {
    formData,
    handleInputChange,
    handleBlur,
    errors,
    touched,
  };

  const [previousEducations, setPreviousEducations] = useState([
    {
      institutionName: "",
      institutionDegreeType: "",
      institutionDegreeName: "",
      institutionMajor: "",
      institutionStartYear: "",
      institutionEndYear: "",
      institutionGPA: "",
    },
  ]);

  const educationFormProps = {
    ...formProps,
    subjects,
    setSubjects,
    previousEducations,
    setPreviousEducations,
  };

  if (isSubmitted) return <SuccessMessage />;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-gray-100 rounded shadow-md">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-cyan-800 text-center flex-1">
          Bursary Application Form
        </h1>

        {/* Optional: Add a clear form button */}
        <button
          onClick={handleClearForm}
          className="text-sm text-red-600 hover:text-red-800 underline"
          title="Clear all form data"
        >
          Clear Form
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 sm:mb-12">
        {/* Progress Bar Track */}
        <div className="relative">
          {/* Background line */}
          <div className="absolute top-6 left-0 w-full h-1 bg-gray-300 rounded-full"></div>

          {/* Progress line */}
          <div
            className="absolute top-6 left-0 h-1 bg-cyan-600 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          ></div>

          {/* Step indicators */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => setActiveStep(index)}
              >
                {/* Circle indicator */}
                <div
                  className={`
                  w-12 h-12 rounded-full border-4 flex items-center justify-center text-sm font-semibold transition-all duration-300
                  ${
                    index <= activeStep
                      ? "bg-cyan-600 border-cyan-600 text-white"
                      : "bg-white border-gray-300 text-gray-500 group-hover:border-cyan-500"
                  }
                `}
                >
                  {index < activeStep ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Step label */}
                <div className="mt-3 text-center">
                  <div
                    className={`
                    text-sm font-medium transition-colors duration-300
                    ${index === activeStep ? "text-cyan-700" : "text-gray-500"}
                  `}
                  >
                    <span className="hidden sm:inline">{step.label}</span>
                    <span className="sm:hidden">{step.shortLabel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        {activeStep === 0 && <PersonalInformationForm {...formProps} />}
        {activeStep === 1 && (
          <EducationInformationForm {...educationFormProps} />
        )}
        {activeStep === 2 && (
          <HouseholdInformationForm
            {...formProps}
            handleSelectChange={handleSelectChange}
            memberCount={memberCount}
            handleAddMember={handleAddMember}
          />
        )}
        {activeStep === 3 && (
          <RequiredDocumentsForm
            documents={documents}
            handleFileUpload={handleFileUpload}
            handleFileRemove={handleFileRemove}
            additionalDocs={additionalDocs}
            handleAdditionalDocUpload={handleAdditionalDocUpload}
            errors={errors}
            touched={touched}
          />
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-10 sm:mt-16">
        <Button
          className="bg-gray-200 text-md w-full sm:w-[200px] text-black border-gray-500"
          variant="outline"
          disabled={activeStep === 0 || isSubmitting}
          onClick={handlePrevious}
        >
          Previous
        </Button>

        {activeStep < 3 && (
          <Button
            className="bg-cyan-800 hover:bg-cyan-700 cursor-pointer w-full sm:w-[200px] text-md"
            disabled={isSubmitting}
            onClick={handleNext}
          >
            Save and Continue
          </Button>
        )}

        {activeStep === 3 && (
          <Button
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="bg-cyan-800 hover:bg-cyan-700 text-white w-full sm:w-[200px] text-md"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        )}
      </div>
    </div>
  );
}

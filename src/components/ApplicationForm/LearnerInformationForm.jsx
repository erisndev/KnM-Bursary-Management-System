import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import PersonalInformationForm from "./form-steps/PersonalInformationForm";
import EducationInformationForm from "./form-steps/EducationInformationForm";
import HouseholdInformationForm from "./form-steps/HouseholdInformationForm";
import RequiredDocumentsForm from "./form-steps/RequiredDocumentsForm";
import SuccessMessage from "./form-steps/SuccessMessage";

const STORAGE_KEY = "bursary_form_data";
const STORAGE_STEP_KEY = "bursary_form_step";

// Comprehensive validation rules
const validationRules = {
  // Personal Information
  fullName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
    message:
      "Full name must contain only letters, spaces, hyphens, and apostrophes",
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 254,
    message: "Please enter a valid email address",
  },
  phone: {
    required: true,
    pattern: /^0\d{2}[\s-]?\d{3}[\s-]?\d{4}$/,
    minLength: 10,
    maxLength: 10,
    message: "Please enter a valid phone number",
  },
  dob: {
    required: true,
    message: "Date of birth is required",
  },
  gender: {
    required: true,
    message: "Please select your gender",
  },
  nationality: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
    message: "Nationality must contain only letters and spaces",
  },
  country: {
    required: true,
    message: "Please select your country of residence",
  },
  address1: {
    required: true,
    minLength: 5,
    maxLength: 200,
    message: "Address must be between 5 and 200 characters",
  },
  city: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
    message:
      "City name must contain only letters, spaces, hyphens, and apostrophes",
  },
  state: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
    message:
      "State/Province must contain only letters, spaces, hyphens, and apostrophes",
  },
  postalCode: {
    required: true,
    minLength: 4,
    maxLength: 4,
    pattern: /^[a-zA-Z0-9\s-]+$/,
    message: "Please enter a valid postal code",
  },

  // Education Information
  highSchoolName: {
    required: true,
    minLength: 2,
    maxLength: 200,
    pattern: /^[a-zA-Z0-9\s'.-]+$/,
    message:
      "School name must contain only letters, numbers, spaces, and basic punctuation",
  },
  highSchoolMatricYear: {
    required: true,
    pattern: /^(19|20)\d{2}$/,
    message: "Please enter a valid year (e.g., 2020)",
  },

  currentEducationLevel: {
    required: true,
    message: "Please select your current education level",
  },
  institutionName: {
    required: false,
    minLength: 2,
    maxLength: 200,
    pattern: /^[a-zA-Z0-9\s'.-]+$/,
    message:
      "Institution name must contain only letters, numbers, spaces, and basic punctuation",
  },
  institutionDegreeType: {
    required: false,
    message: "Please select a degree type",
  },
  institutionDegreeName: {
    required: false,
    minLength: 2,
    maxLength: 200,
    pattern: /^[a-zA-Z0-9\s'.-]+$/,
    message:
      "Degree name must contain only letters, numbers, spaces, and basic punctuation",
  },
  institutionMajor: {
    required: false,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
    message:
      "Major must contain only letters, spaces, hyphens, and apostrophes",
  },
  institutionStartYear: {
    required: false,
    pattern: /^(19|20)\d{2}$/,
    message: "Please enter a valid year (e.g., 2020)",
  },
  institutionEndYear: {
    required: false,
    pattern: /^(19|20)\d{2}$/,
    message: "Please enter a valid year (e.g., 2024)",
  },
  institutionGPA: {
    required: false,
    pattern: /^[0-4](\.\d{1,2})?$/,
    message: "GPA must be between 0.00 and 4.00",
  },

  // Household Information
  numberOfMembers: {
    required: true,
    pattern: /^[1-9]\d*$/,
    message: "Number of members must be a positive number",
  },
  parent1FirstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    message:
      "First name must contain only letters, spaces, hyphens, and apostrophes",
  },
  parent1LastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    message:
      "Last name must contain only letters, spaces, hyphens, and apostrophes",
  },
  parent1Gender: {
    required: true,
    message: "Please select gender",
  },
  parent1Relationship: {
    required: true,
    message: "Please select relationship",
  },
  parent1EmploymentStatus: {
    required: true,
    message: "Please select employment status",
  },
  parent1Occupation: {
    required: false,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
    message:
      "Occupation must contain only letters, spaces, hyphens, and apostrophes",
  },
  parent1MonthlyIncome: {
    required: false,
    pattern: /^\d+(\.\d{1,2})?$/,
    message: "Monthly income must be a valid amount (e.g., 5000.00)",
  },
  parent1OtherIncome: {
    required: false,
    pattern: /^\d+(\.\d{1,2})?$/,
    message: "Other income must be a valid amount (e.g., 1000.00)",
  },
};

// Enhanced validation function with conditional requirements
const validateField = (fieldName, value, formData = {}) => {
  const rules = validationRules[fieldName];
  if (!rules) return null;

  // Check if this is a higher education field and if it should be required
  const isUniversityEnrolled =
    formData.currentEducationLevel === "university_enrolled";
  const higherEducationFields = [
    "institutionName",
    "institutionDegreeType",
    "institutionDegreeName",
    "institutionMajor",
    "institutionStartYear",
  ];

  const isFieldRequired =
    rules.required ||
    (isUniversityEnrolled && higherEducationFields.includes(fieldName));

  // Required field validation
  if (isFieldRequired && (!value || value.toString().trim() === "")) {
    return `${fieldName
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())} is required`;
  }

  // Skip other validations if field is empty and not required
  if (!value || value.toString().trim() === "") {
    return null;
  }

  const stringValue = value.toString().trim();

  // Length validations
  if (rules.minLength && stringValue.length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters`;
  }

  if (rules.maxLength && stringValue.length > rules.maxLength) {
    return `Must not exceed ${rules.maxLength} characters`;
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(stringValue)) {
    return rules.message;
  }

  // Special validations
  switch (fieldName) {
    case "dob": {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (birthDate > today) {
        return "Date of birth cannot be in the future";
      }
      if (age < 16) {
        return "You must be at least 16 years old";
      }
      if (age > 100) {
        return "Please enter a valid date of birth";
      }
      break;
    }

    case "email": {
      const emailParts = stringValue.split("@");
      if (emailParts.length !== 2) {
        return "Please enter a valid email address";
      }
      const [localPart, domain] = emailParts;
      if (localPart.length > 64 || domain.length > 253) {
        return "Email address format is invalid";
      }
      break;
    }

    case "phone": {
      const digitsOnly = stringValue.replace(/\D/g, "");
      if (digitsOnly.length < 10 || digitsOnly.length > 15) {
        return "Phone number must be between 10 and 15 digits";
      }
      break;
    }

    case "institutionEndYear": {
      if (formData.institutionStartYear && value) {
        const startYear = Number.parseInt(formData.institutionStartYear);
        const endYear = Number.parseInt(value);
        if (endYear < startYear) {
          return "End year must be after start year";
        }
        if (endYear - startYear > 10) {
          return "Duration cannot exceed 10 years";
        }
      }
      break;
    }

    case "highSchoolMatricYear": {
      const currentYear = new Date().getFullYear();
      const matricYear = Number.parseInt(value);
      if (matricYear > currentYear) {
        return "Matric year cannot be in the future";
      }
      if (matricYear < currentYear - 50) {
        return "Please enter a valid matric year";
      }
      break;
    }

    case "institutionGPA": {
      const gpa = Number.parseFloat(value);
      if (gpa < 0 || gpa > 4) {
        return "GPA must be between 0.00 and 4.00";
      }
      break;
    }

    case "numberOfMembers": {
      const members = Number.parseInt(value);
      if (members < 1 || members > 20) {
        return "Number of members must be between 1 and 20";
      }
      break;
    }

    case "parent1MonthlyIncome":
    case "parent1OtherIncome": {
      const income = Number.parseFloat(value);
      if (income < 0) {
        return "Income cannot be negative";
      }
      if (income > 1000000) {
        return "Please enter a reasonable income amount";
      }
      break;
    }
  }

  return null;
};

// Subject validation
const validateSubject = (subject, index) => {
  const errors = {};

  if (!subject.name || !subject.name.trim()) {
    errors.name = `Subject name is required for subject #${index + 1}`;
  } else if (subject.name.length < 2 || subject.name.length > 100) {
    errors.name = `Subject name must be between 2 and 100 characters`;
  } else if (!/^[a-zA-Z\s'-]+$/.test(subject.name)) {
    errors.name = `Subject name must contain only letters, spaces, hyphens, and apostrophes`;
  }

  if (
    subject.grade === undefined ||
    subject.grade === null ||
    subject.grade.toString().trim() === ""
  ) {
    errors.grade = `Grade is required for subject #${index + 1}`;
  } else {
    const gradeNum = Number(subject.grade);
    if (
      isNaN(gradeNum) ||
      gradeNum < 0 ||
      gradeNum > 100 ||
      !/^\d{1,3}(\.\d{1,2})?$/.test(subject.grade.toString())
    ) {
      errors.grade = `Please enter a valid percentage (0-100)`;
    }
  }

  return errors;
};

// Document validation
const validateDocument = (docType, document, isRequired = true) => {
  if (isRequired && (!document || !document.uploaded)) {
    return `${docType
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())} is required`;
  }

  if (document && document.file) {
    const file = document.file;
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (file.size > maxSize) {
      return "File size must be less than 10MB";
    }

    if (!allowedTypes.includes(file.type)) {
      return "File must be PDF, JPEG, or PNG format";
    }
  }

  return null;
};

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

      currentEducationLevel: "",

      institutionName: "",
      institutionDegreeType: "",
      institutionDegreeName: "",
      institutionMajor: "",
      institutionStartYear: "",
      institutionEndYear: "",
      institutionGPA: "",

      numberOfMembers: "",

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
    };
  };

  // Load initial step from localStorage or use default
  const loadInitialStep = () => {
    try {
      const saved = localStorage.getItem(STORAGE_STEP_KEY);
      if (saved) {
        return Number.parseInt(saved, 10);
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
  const [stepCompletionStatus, setStepCompletionStatus] = useState([
    false,
    false,
    false,
    false,
  ]);

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

  // Enhanced validation functions - moved before useEffect
  const validatePersonalInfo = () => {
    const newErrors = {};
    const personalFields = [
      "fullName",
      "email",
      "phone",
      "dob",
      "gender",
      "nationality",
      "country",
      "address1",
      "city",
      "state",
      "postalCode",
    ];

    personalFields.forEach((field) => {
      const error = validateField(field, formData[field], formData);
      if (error) {
        newErrors[field] = error;
      }
    });

    return newErrors;
  };

  const validateEducationInfo = () => {
    const newErrors = {};

    // Validate high school information
    const educationFields = ["highSchoolName", "highSchoolMatricYear"];
    educationFields.forEach((field) => {
      const error = validateField(field, formData[field], formData);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Validate subjects
    if (!subjects.length) {
      newErrors.subjects = "At least one subject is required";
    } else {
      subjects.forEach((subject, index) => {
        const subjectErrors = validateSubject(subject, index);
        Object.keys(subjectErrors).forEach((key) => {
          newErrors[`subjects.${index}.${key}`] = subjectErrors[key];
        });
      });
    }

    // Validate current education level
    if (!formData.currentEducationLevel?.trim()) {
      newErrors.currentEducationLevel = "Current education level is required";
    }

    // Validate higher education fields - conditionally required if university enrolled
    const isUniversityEnrolled =
      formData.currentEducationLevel === "university_enrolled";

    if (isUniversityEnrolled) {
      // These fields become required when university enrolled
      const requiredHigherEdFields = [
        "institutionName",
        "institutionDegreeType",
        "institutionDegreeName",
        "institutionMajor",
        "institutionStartYear",
      ];

      requiredHigherEdFields.forEach((field) => {
        const error = validateField(field, formData[field], formData);
        if (error) {
          newErrors[field] = error;
        }
      });

      // Optional fields for university students (still validate if provided)
      const optionalHigherEdFields = ["institutionEndYear", "institutionGPA"];
      optionalHigherEdFields.forEach((field) => {
        if (formData[field]) {
          const error = validateField(field, formData[field], formData);
          if (error) {
            newErrors[field] = error;
          }
        }
      });
    } else if (formData.institutionName) {
      // If not university enrolled but institution name is provided, validate all higher ed fields
      const higherEdFields = [
        "institutionName",
        "institutionDegreeType",
        "institutionDegreeName",
        "institutionMajor",
        "institutionStartYear",
        "institutionEndYear",
        "institutionGPA",
      ];
      higherEdFields.forEach((field) => {
        const error = validateField(field, formData[field], formData);
        if (error) {
          newErrors[field] = error;
        }
      });
    }

    return newErrors;
  };

  const validateHouseholdInfo = () => {
    const newErrors = {};

    // Validate household size
    const error = validateField(
      "numberOfMembers",
      formData.numberOfMembers,
      formData
    );
    if (error) {
      newErrors.numberOfMembers = error;
    }

    // Validate parent 1 information (required)
    const parent1Fields = [
      "parent1FirstName",
      "parent1LastName",
      "parent1Gender",
      "parent1Relationship",
      "parent1EmploymentStatus",
    ];

    parent1Fields.forEach((field) => {
      const error = validateField(field, formData[field], formData);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Validate optional parent 1 fields
    const parent1OptionalFields = [
      "parent1Occupation",
      "parent1MonthlyIncome",
      "parent1OtherIncome",
    ];
    parent1OptionalFields.forEach((field) => {
      if (formData[field]) {
        const error = validateField(field, formData[field], formData);
        if (error) {
          newErrors[field] = error;
        }
      }
    });

    // Validate parent 2 information (if provided)
    if (formData.parent2FirstName || formData.parent2LastName) {
      const parent2Fields = [
        "parent2FirstName",
        "parent2LastName",
        "parent2Gender",
        "parent2Relationship",
        "parent2EmploymentStatus",
      ];

      parent2Fields.forEach((field) => {
        if (formData[field]) {
          const error = validateField(field, formData[field], formData);
          if (error) {
            newErrors[field] = error;
          }
        }
      });
    }

    return newErrors;
  };

  const validateRequiredDocuments = () => {
    const newErrors = {};

    // Required documents
    const requiredDocs = ["transcript", "nationalIdCard", "proofOfResidence"];

    requiredDocs.forEach((docType) => {
      const error = validateDocument(docType, documents[docType], true);
      if (error) {
        newErrors[docType] = error;
      }
    });

    // Optional documents validation
    const optionalDocs = [
      "letterOfRecommendation",
      "resume",
      "coverLetter",
      "payslip",
    ];

    optionalDocs.forEach((docType) => {
      if (documents[docType] && documents[docType].uploaded) {
        const error = validateDocument(docType, documents[docType], false);
        if (error) {
          newErrors[docType] = error;
        }
      }
    });

    // Additional documents validation
    additionalDocs.forEach((doc, index) => {
      if (doc) {
        const error = validateDocument(
          `additionalDoc${index}`,
          { uploaded: true, file: doc },
          false
        );
        if (error) {
          newErrors[`additionalDoc${index}`] = error;
        }
      }
    });

    return newErrors;
  };

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

  // Update step completion status whenever form data changes
  useEffect(() => {
    const newCompletionStatus = [
      Object.keys(validatePersonalInfo()).length === 0,
      Object.keys(validateEducationInfo()).length === 0,
      Object.keys(validateHouseholdInfo()).length === 0,
      Object.keys(validateRequiredDocuments()).length === 0,
    ];
    setStepCompletionStatus(newCompletionStatus);
  }, [formData, subjects, documents, additionalDocs]);

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

    // Real-time validation for touched fields
    if (touched[id]) {
      const fieldError = validateField(id, value, { ...formData, [id]: value });
      setErrors((prev) => ({
        ...prev,
        [id]: fieldError,
      }));
    }
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Real-time validation for touched fields
    if (touched[field]) {
      const fieldError = validateField(field, value, {
        ...formData,
        [field]: value,
      });
      setErrors((prev) => ({
        ...prev,
        [field]: fieldError,
      }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Validate field on blur
    const fieldError = validateField(field, formData[field], formData);
    setErrors((prev) => ({
      ...prev,
      [field]: fieldError,
    }));
  };

  const handleFileUpload = (docType, event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file
    const error = validateDocument(docType, { uploaded: true, file }, true);
    if (error) {
      setErrors((prev) => ({
        ...prev,
        [docType]: error,
      }));
      return;
    }

    setDocuments((prev) => ({
      ...prev,
      [docType]: { uploaded: true, file },
    }));

    // Clear any previous errors for this document
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[docType];
      return newErrors;
    });
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

    // Validate file
    const error = validateDocument(
      `additionalDoc${index}`,
      { uploaded: true, file },
      false
    );
    if (error) {
      setErrors((prev) => ({
        ...prev,
        [`additionalDoc${index}`]: error,
      }));
      return;
    }

    setAdditionalDocs((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });

    // Clear any previous errors for this document
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`additionalDoc${index}`];
      return newErrors;
    });
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

  // Function to find the first incomplete step
  const findFirstIncompleteStep = () => {
    const allValidations = [
      validatePersonalInfo(),
      validateEducationInfo(),
      validateHouseholdInfo(),
      validateRequiredDocuments(),
    ];

    for (let i = 0; i < allValidations.length; i++) {
      if (Object.keys(allValidations[i]).length > 0) {
        return i;
      }
    }
    return -1; // All steps are complete
  };

  // Modified step navigation with validation check
  const handleStepClick = (targetStep) => {
    // Allow navigation to previous steps or current step
    if (targetStep <= activeStep) {
      setActiveStep(targetStep);
      return;
    }

    // For forward navigation, check if all previous steps are complete
    for (let i = 0; i < targetStep; i++) {
      if (!stepCompletionStatus[i]) {
        // Show error message and don't allow navigation
        alert(
          `Please complete step ${i + 1} (${
            steps[i].label
          }) before proceeding to step ${targetStep + 1}.`
        );
        return;
      }
    }

    // If all previous steps are complete, allow navigation
    setActiveStep(targetStep);
  };

  const handleNext = () => {
    const stepErrors = validateStep();
    if (Object.keys(stepErrors).length === 0) {
      setErrors({});
      setTouched({});
      if (activeStep < 3) setActiveStep(activeStep + 1);
    } else {
      console.log("Validation errors for step:", stepErrors);
      setErrors(stepErrors);
      const touchedFields = {};
      Object.keys(stepErrors).forEach((field) => (touchedFields[field] = true));
      setTouched(touchedFields);
    }
  };

  const handleSubmit = () => {
    // Validate all steps
    const allErrors = {
      ...validatePersonalInfo(),
      ...validateEducationInfo(),
      ...validateHouseholdInfo(),
      ...validateRequiredDocuments(),
    };

    if (Object.keys(allErrors).length === 0) {
      // All validations passed, proceed with submission
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
      // Find the first step with errors and navigate to it
      const firstIncompleteStep = findFirstIncompleteStep();

      if (firstIncompleteStep !== -1) {
        setActiveStep(firstIncompleteStep);

        // Set all errors and touched fields for the incomplete step
        setErrors(allErrors);
        const touchedFields = {};
        Object.keys(allErrors).forEach(
          (field) => (touchedFields[field] = true)
        );
        setTouched(touchedFields);

        // Show alert message
        alert(
          `Please complete all required fields in ${steps[firstIncompleteStep].label} before submitting.`
        );
      }
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
    handleSelectChange,
    handleBlur,
    errors,
    touched,
    validateField,
  };

  const educationFormProps = {
    ...formProps,
    subjects,
    setSubjects,
    previousEducations,
    setPreviousEducations,
    validateSubject,
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
                onClick={() => handleStepClick(index)}
              >
                {/* Circle indicator */}
                <div
                  className={`
                  w-12 h-12 rounded-full border-4 flex items-center justify-center text-sm font-semibold transition-all duration-300 relative
                  ${
                    index <= activeStep
                      ? stepCompletionStatus[index]
                        ? "bg-cyan-800 border-cyan8600 text-white"
                        : index === activeStep
                        ? "bg-cyan-600 border-cyan-600 text-white"
                        : "bg-yellow-500 border-yellow-500 text-white"
                      : stepCompletionStatus[index]
                      ? "bg-cyan-800 border-cyan-800 text-white"
                      : "bg-white border-gray-300 text-gray-500 group-hover:border-cyan-500"
                  }
                  ${
                    // Disable pointer events for future steps that can't be accessed
                    index > activeStep &&
                    !stepCompletionStatus
                      .slice(0, index)
                      .every((status) => status)
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }
                `}
                >
                  {stepCompletionStatus[index] ? (
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

                  {/* Warning indicator for incomplete required steps */}
                  {index < activeStep && !stepCompletionStatus[index] && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
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
                  {/* Completion status indicator */}
                  {stepCompletionStatus[index] && (
                    <div className="text-xs text-green-600 mt-1">Complete</div>
                  )}
                  {index <= activeStep && !stepCompletionStatus[index] && (
                    <div className="text-xs text-red-600 mt-1">Incomplete</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        {activeStep === 0 && (
          <PersonalInformationForm {...formProps} onFormChange={setFormData} />
        )}
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

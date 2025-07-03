import { useState, useEffect, useCallback } from "react";
import { Button } from "../ui/button";
import PersonalInformationForm from "./form-steps/PersonalInformationForm";
import EducationInformationForm from "./form-steps/EducationInformationForm";
import HouseholdInformationForm from "./form-steps/HouseholdInformationForm";
import RequiredDocumentsForm from "./form-steps/RequiredDocumentsForm";
import SuccessMessage from "./form-steps/SuccessMessage";
import baseAPI from "../../../environment";
import { toast } from "react-hot-toast";

const STORAGE_KEYS = {
  FORM_DATA: "bursary_form_data",
  CURRENT_STEP: "bursary_form_step",
  SUBJECTS: "bursary_form_subjects",
};

/** Form step configuration */
const FORM_STEPS = [
  { label: "Personal Information", shortLabel: "Personal Info" },
  { label: "Education Information", shortLabel: "Education Info" },
  { label: "Household Information", shortLabel: "Household Info" },
  { label: "Required Documents", shortLabel: "Documents" },
];

/** File upload constraints */
const FILE_CONSTRAINTS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ["application/pdf", "image/jpeg", "image/png", "image/jpg"],
};

const VALIDATION_RULES = {
  // Personal Information Fields
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
  idnumber: {
    required: true,
    pattern: /^\d{13}$/,
    message: "ID number must be exactly 13 digits",
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

  // Education Information Fields
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

  // Higher Education Fields (conditionally required)
  institutionName: {
    required: false, // Becomes required if university enrolled
    minLength: 2,
    maxLength: 200,
    pattern: /^[a-zA-Z0-9\s'.-]+$/,
    message:
      "Institution name must contain only letters, numbers, spaces, and basic punctuation",
  },
  institutionDegreeType: {
    required: false, // Becomes required if university enrolled
    message: "Please select a degree type",
  },
  institutionDegreeName: {
    required: false, // Becomes required if university enrolled
    minLength: 2,
    maxLength: 200,
    pattern: /^[a-zA-Z0-9\s'.-]+$/,
    message:
      "Degree name must contain only letters, numbers, spaces, and basic punctuation",
  },
  institutionMajor: {
    required: false, // Becomes required if university enrolled
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
    message:
      "Major must contain only letters, spaces, hyphens, and apostrophes",
  },
  institutionStartYear: {
    required: false, // Becomes required if university enrolled
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

  // Household Information Fields
  numberOfMembers: {
    required: true,
    pattern: /^([1-9]|10\+)$/,
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
    pattern: /^(\d{1,6}-\d{1,6}|100001\+)$/,
    message: "Please select a valid income range",
  },
};

const validateField = (fieldName, value, formData = {}) => {
  const rules = VALIDATION_RULES[fieldName];
  if (!rules) return null;

  // Check if this field should be required based on conditional logic
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

  // Special field-specific validations
  return validateSpecialFields(fieldName, value, formData);
};

const validateSpecialFields = (fieldName, value, formData) => {
  const stringValue = value.toString().trim();

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

      if (birthDate > today) return "Date of birth cannot be in the future";
      if (age < 16) return "You must be at least 16 years old";
      if (age > 100) return "Please enter a valid date of birth";
      break;
    }

    case "email": {
      const emailParts = stringValue.split("@");
      if (emailParts.length !== 2) return "Please enter a valid email address";

      const [localPart, domain] = emailParts;
      if (localPart.length > 64 || domain.length > 253) {
        return "Email address format is invalid";
      }
      break;
    }

    case "phone": {
      const digitsOnly = stringValue.replace(/\D/g, "");
      if (digitsOnly.length !== 10) {
        return "Phone number must be 10 digits long";
      }
      break;
    }
    case "idnumber": {
      const digitsOnly = stringValue.replace(/\D/g, "");
      if (digitsOnly.length !== 13) {
        return "ID number must be exactly 13 digits";
      }
      break;
    }

    case "institutionEndYear": {
      if (formData.institutionStartYear && value) {
        const startYear = Number.parseInt(formData.institutionStartYear);
        const endYear = Number.parseInt(value);
        if (endYear < startYear) return "End year must be after start year";
        if (endYear - startYear > 10) return "Duration cannot exceed 10 years";
      }
      break;
    }

    case "highSchoolMatricYear": {
      const currentYear = new Date().getFullYear();
      const matricYear = Number.parseInt(value);
      if (matricYear > currentYear)
        return "Matric year cannot be in the future";
      if (matricYear < currentYear - 50)
        return "Please enter a valid matric year";
      break;
    }

    case "institutionGPA": {
      const gpa = Number.parseFloat(value);
      if (gpa < 0 || gpa > 100) return "GPA must be between 0 and 100 (%)";
      break;
    }

    case "numberOfMembers": {
      const members = Number.parseInt(value);
      if (members < 1 || members > 20)
        return "Number of members must be between 1 and 20";
      break;
    }

    case "parent1MonthlyIncome": {
      const income = Number.parseFloat(value);
      if (income < 0) return "Income cannot be negative";
      if (income > 1000000) return "Please enter a reasonable income amount";
      break;
    }
  }

  return null;
};

const validateSubject = (subject, index) => {
  const errors = {};

  // Validate subject name
  if (!subject.name || !subject.name.trim()) {
    errors.name = `Subject name is required for subject #${index + 1}`;
  } else if (subject.name.length < 2 || subject.name.length > 100) {
    errors.name = "Subject name must be between 2 and 100 characters";
  } else if (!/^[a-zA-Z\s'-]+$/.test(subject.name)) {
    errors.name =
      "Subject name must contain only letters, spaces, hyphens, and apostrophes";
  }

  // Validate grade
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
      errors.grade = "Please enter a valid percentage (0-100)";
    }
  }

  return errors;
};

const validateDocument = (docType, document, isRequired = true) => {
  if (isRequired && (!document || !document.uploaded)) {
    return `${docType
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())} is required`;
  }

  if (document && document.file) {
    const file = document.file;

    if (file.size > FILE_CONSTRAINTS.MAX_SIZE) {
      return "File size must be less than 10MB";
    }

    if (!FILE_CONSTRAINTS.ALLOWED_TYPES.includes(file.type)) {
      return "File must be PDF, JPEG, or PNG format";
    }
  }

  return null;
};

const createInitialFormData = () => ({
  // Personal Information
  fullName: "",
  email: "",
  phone: "",
  idnumber: "",
  dob: "",
  gender: "",
  nationality: "",
  country: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  postalCode: "",

  // Education Information
  highSchoolName: "",
  highSchoolMatricYear: "",
  currentEducationLevel: "",

  // Higher Education Information
  institutionName: "",
  institutionDegreeType: "",
  institutionDegreeName: "",
  institutionMajor: "",
  institutionStartYear: "",
  institutionEndYear: "",
  institutionGPA: "",

  // Household Information
  numberOfMembers: "",

  // Parent 1 Information
  parent1FirstName: "",
  parent1LastName: "",
  parent1Gender: "",
  parent1Relationship: "",
  parent1EmploymentStatus: "",
  parent1Occupation: "",
  parent1MonthlyIncome: "",

  // Parent 2 Information (Optional)
  parent2FirstName: "",
  parent2LastName: "",
  parent2Gender: "",
  parent2Relationship: "",
  parent2EmploymentStatus: "",
  parent2Occupation: "",
  parent2MonthlyIncome: "",
});

const loadFromStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

const clearStoredData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.FORM_DATA);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_STEP);
    localStorage.removeItem(STORAGE_KEYS.SUBJECTS);
  } catch (error) {
    console.error("Error clearing stored data:", error);
  }
};

export default function LearnerInformationForm() {
  /** Current active step (0-3) */
  const [activeStep, setActiveStep] = useState(() =>
    loadFromStorage(STORAGE_KEYS.CURRENT_STEP, 0)
  );

  /** Main form data object */
  const [formData, setFormData] = useState(() =>
    loadFromStorage(STORAGE_KEYS.FORM_DATA, createInitialFormData())
  );

  /** Subjects array */
  const [subjects, setSubjects] = useState(() =>
    loadFromStorage(STORAGE_KEYS.SUBJECTS, [])
  );

  /** Document upload states */
  const [documents, setDocuments] = useState({
    transcript: {},
    nationalIdCard: {},
    proofOfResidence: {},
    letterOfRecommendation: {},
    proofOfBankAccount: {},
    coverLetter: {},
    payslip: {},
  });

  /** Additional documents array */
  const [additionalDocs, setAdditionalDocs] = useState([]);

  /** Form validation states */
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /** Form submission states */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /** Education-specific states */
  const [memberCount, setMemberCount] = useState(1);

  /** Step completion tracking */
  const [stepCompletionStatus, setStepCompletionStatus] = useState([
    false,
    false,
    false,
    false,
  ]);

  /** Previous education entries (for multiple institutions) */
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

  const validatePersonalInfo = useCallback(() => {
    const newErrors = {};
    const personalFields = [
      "fullName",
      "email",
      "phone",
      "idnumber",
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
  }, [formData]);

  const validateEducationInfo = useCallback(() => {
    const newErrors = {};

    // Validate basic education fields
    const educationFields = ["highSchoolName", "highSchoolMatricYear"];
    educationFields.forEach((field) => {
      const error = validateField(field, formData[field], formData);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Validate subjects array
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

    // Validate higher education fields (conditionally required)
    const isUniversityEnrolled =
      formData.currentEducationLevel === "university_enrolled";

    if (isUniversityEnrolled) {
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

      // Optional fields for university students (validate if provided)
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
      // If institution name provided but not university enrolled, validate all higher ed fields
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
  }, [formData, subjects]);

  const validateHouseholdInfo = useCallback(() => {
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

    // Validate required parent 1 fields
    const parent1RequiredFields = [
      "parent1FirstName",
      "parent1LastName",
      "parent1Gender",
      "parent1Relationship",
      "parent1EmploymentStatus",
    ];

    parent1RequiredFields.forEach((field) => {
      const error = validateField(field, formData[field], formData);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Validate optional parent 1 fields (if provided)
    const parent1OptionalFields = ["parent1Occupation", "parent1MonthlyIncome"];
    parent1OptionalFields.forEach((field) => {
      if (formData[field]) {
        const error = validateField(field, formData[field], formData);
        if (error) {
          newErrors[field] = error;
        }
      }
    });

    // Validate parent 2 fields (if any parent 2 information is provided)
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
  }, [formData]);

  const validateRequiredDocuments = useCallback(() => {
    const newErrors = {};

    // Required documents
    const requiredDocs = [
      "transcript",
      "nationalIdCard",
      "proofOfResidence",
      "proofOfBankAccount",
    ];
    requiredDocs.forEach((docType) => {
      const error = validateDocument(docType, documents[docType], true);
      if (error) {
        newErrors[docType] = error;
      }
    });

    // Optional documents (validate if uploaded)
    const optionalDocs = ["letterOfRecommendation", "coverLetter", "payslip"];
    optionalDocs.forEach((docType) => {
      const doc = documents[docType];
      if (doc && doc.uploaded) {
        const error = validateDocument(docType, doc, false);
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
  }, [documents, additionalDocs]);

  /** Update step completion status when form data changes */
  useEffect(() => {
    const newCompletionStatus = [
      Object.keys(validatePersonalInfo()).length === 0,
      Object.keys(validateEducationInfo()).length === 0,
      Object.keys(validateHouseholdInfo()).length === 0,
      Object.keys(validateRequiredDocuments()).length === 0,
    ];
    setStepCompletionStatus(newCompletionStatus);
  }, [
    formData,
    subjects,
    documents,
    additionalDocs,
    validatePersonalInfo,
    validateEducationInfo,
    validateHouseholdInfo,
    validateRequiredDocuments,
  ]);

  /** Save form data to localStorage whenever it changes */
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.FORM_DATA, formData);
  }, [formData]);

  /** Save current step to localStorage whenever it changes */
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CURRENT_STEP, activeStep);
  }, [activeStep]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SUBJECTS, subjects);
  }, [subjects]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Real-time validation for touched fields
    if (touched[id]) {
      const fieldError = validateField(id, value, { ...formData, [id]: value });
      setErrors((prev) => ({
        ...prev,
        [id]: fieldError || "",
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
        [field]: fieldError || "",
      }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Validate field on blur
    const fieldError = validateField(field, formData[field], formData);
    setErrors((prev) => ({
      ...prev,
      [field]: fieldError || "",
    }));
  };

  const handleFileUpload = (docType, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file before accepting
    const error = validateDocument(docType, { uploaded: true, file }, true);
    if (error) {
      setErrors((prev) => ({ ...prev, [docType]: error }));
      return;
    }

    // Update documents state
    setDocuments((prev) => ({
      ...prev,
      [docType]: { uploaded: true, file },
    }));

    // Clear any previous errors
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
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const error = validateDocument(
      `additionalDoc${index}`,
      { uploaded: true, file },
      false
    );
    if (error) {
      setErrors((prev) => ({ ...prev, [`additionalDoc${index}`]: error }));
      return;
    }

    // Update additional docs array
    setAdditionalDocs((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });

    // Clear errors
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`additionalDoc${index}`];
      return newErrors;
    });
  };

  const validateCurrentStep = () => {
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
    return -1; // All steps complete
  };

  const handleStepClick = (targetStep) => {
    // Allow navigation to previous steps or current step
    if (targetStep <= activeStep) {
      setActiveStep(targetStep);
      return;
    }

    // For forward navigation, check if all previous steps are complete
    for (let i = 0; i < targetStep; i++) {
      if (!stepCompletionStatus[i]) {
        alert(
          `Please complete step ${i + 1} (${
            FORM_STEPS[i].label
          }) before proceeding to step ${targetStep + 1}.`
        );
        return;
      }
    }

    // Allow navigation if all previous steps are complete
    setActiveStep(targetStep);
  };

  const handleNext = () => {
    const stepErrors = validateCurrentStep();
    console.log("Step errors:", stepErrors);

    if (Object.keys(stepErrors).length === 0) {
      // Clear errors and move to next step
      setErrors({});
      setTouched({});
      if (activeStep < 3) setActiveStep(activeStep + 1);
    } else {
      // Show validation errors
      setErrors(stepErrors);

      // Mark all error fields as touched
      const touchedFields = {};
      Object.keys(stepErrors).forEach((field) => (touchedFields[field] = true));
      setTouched(touchedFields);
    }
  };

  /**
   * Handles previous button click
   */
  const handlePrevious = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  /**
   * Handles form submission with comprehensive validation
   */
  const handleSubmit = async () => {
    // Validate all steps
    const allErrors = {
      ...validatePersonalInfo(),
      ...validateEducationInfo(),
      ...validateHouseholdInfo(),
      ...validateRequiredDocuments(),
    };

    if (Object.keys(allErrors).length === 0) {
      setIsSubmitting(true);

      // Prepare form data for API (including files)
      const apiFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        apiFormData.append(key, value);
      });

      // Attach documents
      Object.entries(documents).forEach(([key, doc]) => {
        if (doc && doc.file) {
          apiFormData.append(key, doc.file);
        }
      });

      // Attach additional documents
      additionalDocs.forEach((file, idx) => {
        if (file) {
          apiFormData.append(`additionalDoc${idx}`, file);
        }
      });

      // Attach subjects as JSON
      apiFormData.append("subjects", JSON.stringify(subjects));
      // Attach previousEducations as JSON
      apiFormData.append(
        "previousEducations",
        JSON.stringify(previousEducations)
      );

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseAPI}/applications/create`, {
          method: "POST",
          body: apiFormData,
          headers: { Authorization: `Bearer ${token}` },
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.error || "Failed to submit application");
        }

        setIsSubmitting(false);
        setIsSubmitted(true);
        toast.success("Application submitted successfully!");
        clearStoredData();
      } catch (error) {
        setIsSubmitting(false);
        toast.error("Submission failed: " + error.message);
      }
    } else {
      // Find first incomplete step and navigate to it
      const firstIncompleteStep = findFirstIncompleteStep();

      if (firstIncompleteStep !== -1) {
        setActiveStep(firstIncompleteStep);

        // Set all errors and mark fields as touched
        setErrors(allErrors);
        const touchedFields = {};
        Object.keys(allErrors).forEach(
          (field) => (touchedFields[field] = true)
        );
        setTouched(touchedFields);

        alert(
          `Please complete all required fields in ${FORM_STEPS[firstIncompleteStep].label} before submitting.`
        );
      }
    }
  };

  const handleClearForm = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all form data? This cannot be undone."
      )
    ) {
      clearStoredData();
      setFormData(createInitialFormData());
      setActiveStep(0);
      setSubjects([]);
      setMemberCount(1);
      setErrors({});
      setTouched({});
      setDocuments({
        transcript: {},
        nationalIdCard: {},
        proofOfResidence: {},
        letterOfRecommendation: {},
        proofOfBankAccount: {},
        coverLetter: {},
        payslip: {},
      });
      setAdditionalDocs([]);
    }
  };

  /** Common props passed to all form step components */
  const commonFormProps = {
    formData,
    handleInputChange,
    handleSelectChange,
    handleBlur,
    errors,
    touched,
    validateField,
  };

  /** Extended props for education form component */
  const educationFormProps = {
    ...commonFormProps,
    subjects,
    setSubjects,
    previousEducations,
    setPreviousEducations,
    validateSubject,
    setTouched, // Add setTouched for education form
  };

  // Show success message if form has been submitted
  if (isSubmitted) return <SuccessMessage />;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-gray-100 rounded shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-cyan-800 text-center flex-1">
          Bursary Application Form
        </h1>

        {/* Clear Form Button */}
        <button
          onClick={handleClearForm}
          className="text-sm text-red-600 hover:text-red-800 underline"
          title="Clear all form data"
        >
          Clear Form
        </button>
      </div>

      {/* Progress Bar Section */}
      <div className="mb-8 sm:mb-12">
        <div className="relative">
          {/* Background Progress Line */}
          <div className="absolute top-6 left-0 w-full h-1 bg-gray-300 rounded-full" />

          {/* Active Progress Line */}
          <div
            className="absolute top-6 left-0 h-1 bg-cyan-600 rounded-full transition-all duration-300 ease-in-out"
            style={{
              width: `${(activeStep / (FORM_STEPS.length - 1)) * 100}%`,
            }}
          />

          {/* Step Indicators */}
          <div className="relative flex justify-between">
            {FORM_STEPS.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => handleStepClick(index)}
              >
                {/* Step Circle */}
                <div
                  className={`
                    w-12 h-12 rounded-full border-4 flex items-center justify-center text-sm font-semibold 
                    transition-all duration-300 relative
                    ${
                      index <= activeStep
                        ? stepCompletionStatus[index]
                          ? "bg-green-600 border-green-600 text-white" // Completed
                          : index === activeStep
                          ? "bg-cyan-600 border-cyan-600 text-white" // Current
                          : "bg-yellow-500 border-yellow-500 text-white" // Incomplete but accessible
                        : stepCompletionStatus[index]
                        ? "bg-green-600 border-green-600 text-white" // Completed future step
                        : "bg-white border-gray-300 text-gray-500 group-hover:border-cyan-500" // Future step
                    }
                    ${
                      // Disable future steps that can't be accessed
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
                    // Checkmark for completed steps
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
                    // Step number
                    <span>{index + 1}</span>
                  )}

                  {/* Warning indicator for incomplete required steps */}
                  {index < activeStep && !stepCompletionStatus[index] && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                  )}
                </div>

                {/* Step Label */}
                <div className="mt-3 text-center">
                  <div
                    className={`
                      text-sm font-medium transition-colors duration-300
                      ${
                        index === activeStep ? "text-cyan-700" : "text-gray-500"
                      }
                    `}
                  >
                    <span className="hidden sm:inline">{step.label}</span>
                    <span className="sm:hidden">{step.shortLabel}</span>
                  </div>

                  {/* Completion Status */}
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

      {/* Form Content Section */}
      <div>
        {activeStep === 0 && (
          <PersonalInformationForm
            {...commonFormProps}
            onFormChange={setFormData}
          />
        )}
        {activeStep === 1 && (
          <EducationInformationForm {...educationFormProps} />
        )}
        {activeStep === 2 && (
          <HouseholdInformationForm
            {...commonFormProps}
            handleSelectChange={handleSelectChange}
            memberCount={memberCount}
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

      {/* Navigation Buttons */}
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

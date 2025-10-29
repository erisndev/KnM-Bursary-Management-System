/**
 * Form constants and configuration
 */

export const STORAGE_KEYS = {
  FORM_DATA: 'bursary_form_data',
  CURRENT_STEP: 'bursary_form_step',
  SUBJECTS: 'bursary_form_subjects',
};

export const FORM_STEPS = [
  { label: 'Personal Information', shortLabel: 'Personal Info' },
  { label: 'Education Information', shortLabel: 'Education Info' },
  { label: 'Household Information', shortLabel: 'Household Info' },
  { label: 'Required Documents', shortLabel: 'Documents' },
];

export const FILE_CONSTRAINTS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'],
  ALLOWED_EXTENSIONS: ['.pdf', '.jpg', '.jpeg', '.png'],
};

export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^0\d{2}[\s-]?\d{3}[\s-]?\d{4}$/,
  ID_NUMBER: /^\d{13}$/,
  NAME: /^[a-zA-Z\s'-]+$/,
  YEAR: /^(19|20)\d{2}$/,
  POSTAL_CODE: /^[a-zA-Z0-9\s-]+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9\s'.-]+$/,
  GPA: /^(100(\.0{1,2})?|(\d{1,2})(\.\d{1,2})?)$/,
};

export const FIELD_LENGTHS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  EMAIL_MAX: 254,
  PHONE_LENGTH: 10,
  ID_NUMBER_LENGTH: 13,
  ADDRESS_MIN: 5,
  ADDRESS_MAX: 200,
  CITY_MIN: 2,
  CITY_MAX: 100,
  POSTAL_CODE_MIN: 4,
  POSTAL_CODE_MAX: 4,
  SCHOOL_NAME_MIN: 2,
  SCHOOL_NAME_MAX: 200,
  OCCUPATION_MIN: 2,
  OCCUPATION_MAX: 100,
};

export const AGE_CONSTRAINTS = {
  MIN_AGE: 16,
  MAX_AGE: 100,
};

export const EDUCATION_LEVELS = [
  { value: 'high_school', label: 'High School' },
  { value: 'university_enrolled', label: 'University Enrolled' },
  { value: 'university_graduate', label: 'University Graduate' },
  { value: 'other', label: 'Other' },
];

export const DEGREE_TYPES = [
  { value: 'diploma', label: 'Diploma' },
  { value: 'bachelors', label: "Bachelor's Degree" },
  { value: 'honours', label: 'Honours Degree' },
  { value: 'masters', label: "Master's Degree" },
  { value: 'doctorate', label: 'Doctorate' },
];

export const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

export const RELATIONSHIPS = [
  { value: 'mother', label: 'Mother' },
  { value: 'father', label: 'Father' },
  { value: 'guardian', label: 'Guardian' },
  { value: 'other', label: 'Other' },
];

export const EMPLOYMENT_STATUS = [
  { value: 'employed', label: 'Employed' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'self_employed', label: 'Self Employed' },
  { value: 'retired', label: 'Retired' },
];

export const INCOME_RANGES = [
  { value: '0-5000', label: 'R0 - R5,000' },
  { value: '5001-10000', label: 'R5,001 - R10,000' },
  { value: '10001-20000', label: 'R10,001 - R20,000' },
  { value: '20001-50000', label: 'R20,001 - R50,000' },
  { value: '50001-100000', label: 'R50,001 - R100,000' },
  { value: '100001+', label: 'R100,001+' },
];

export const HOUSEHOLD_SIZES = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10+', label: '10+' },
];

export const COUNTRIES = [
  { value: 'south_africa', label: 'South Africa' },
  { value: 'botswana', label: 'Botswana' },
  { value: 'namibia', label: 'Namibia' },
  { value: 'zimbabwe', label: 'Zimbabwe' },
  { value: 'other', label: 'Other' },
];

export const DOCUMENT_TYPES = {
  TRANSCRIPT: 'transcript',
  NATIONAL_ID: 'nationalIdCard',
  PROOF_OF_RESIDENCE: 'proofOfResidence',
  LETTER_OF_RECOMMENDATION: 'letterOfRecommendation',
  PROOF_OF_BANK_ACCOUNT: 'proofOfBankAccount',
  COVER_LETTER: 'coverLetter',
  PAYSLIP: 'payslip',
};

export const REQUIRED_DOCUMENTS = [
  DOCUMENT_TYPES.TRANSCRIPT,
  DOCUMENT_TYPES.NATIONAL_ID,
  DOCUMENT_TYPES.PROOF_OF_RESIDENCE,
  DOCUMENT_TYPES.PROOF_OF_BANK_ACCOUNT,
];

export const OPTIONAL_DOCUMENTS = [
  DOCUMENT_TYPES.LETTER_OF_RECOMMENDATION,
  DOCUMENT_TYPES.COVER_LETTER,
  DOCUMENT_TYPES.PAYSLIP,
];

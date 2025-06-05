import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Plus, Trash2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EducationInformationForm({
  formData,
  handleInputChange,
  handleSelectChange,
  handleBlur,
  errors = {},
  touched = {},
  setTouched = () => {}, // Provide a default no-op function
  validateField, // Validation function from parent component
  focusRef,
  subjects: parentSubjects = [],
  setSubjects: setParentSubjects = () => {}, // Add this prop to update parent's subjects
}) {
  const [subjects, setSubjects] = useState(parentSubjects);
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [subjectTouched, setSubjectTouched] = useState(false);
  const [gradeTouched, setGradeTouched] = useState(false);
  const [subjectError, setSubjectError] = useState("");
  const [gradeError, setGradeError] = useState("");

  // Check if university is selected to determine if higher ed fields are required
  const isUniversityEnrolled =
    formData.currentEducationLevel === "university_enrolled";

  // Use parent's validation function for subjects if available
  const validateSubjectField = (value) => {
    if (!value || !value.trim()) return "Subject is required";
    if (value.length < 2 || value.length > 100) {
      return "Subject name must be between 2 and 100 characters";
    }
    if (!/^[a-zA-Z\s'-]+$/.test(value)) {
      return "Subject name must contain only letters, spaces, hyphens, and apostrophes";
    }
    return "";
  };

  const validateGradeField = (value) => {
    if (!value || !value.trim()) return "Grade is required";
    const num = Number(value);
    if (isNaN(num) || num < 0 || num > 100) {
      return "Please enter a valid percentage (0-100)";
    }
    return "";
  };

  const getFieldStatus = (fieldName) => {
    if (!touched[fieldName]) return "default";
    if (errors[fieldName]) return "error";
    if (formData[fieldName] && !errors[fieldName]) return "success";
    return "default";
  };

  const getFieldClassName = (fieldName) => {
    const status = getFieldStatus(fieldName);
    return cn(
      "mt-1 transition-colors",
      status === "error" && "border-red-500 focus-visible:ring-red-500",
      status === "success" && "border-green-500 focus-visible:ring-green-500"
    );
  };

  const handleLocalInputChange = (e) => {
    const { id } = e.target;

    // Real-time validation for touched fields using parent's validation function
    if (touched[id] && validateField) {
      // No need to set local errors since parent handles this
    }

    // Call parent's input change handler
    if (handleInputChange) {
      handleInputChange(e);
    }
  };

  const handleLocalSelectChange = (fieldName, value) => {
    // Call parent's select change handler
    if (handleSelectChange) {
      handleSelectChange(fieldName, value);
    }
  };

  const handleLocalBlur = (fieldName) => {
    // Call parent's blur handler
    if (handleBlur) {
      handleBlur(fieldName);
    }
  };

  const handleAddSubject = () => {
    const sError = validateSubjectField(subject);
    const gError = validateGradeField(grade);
    setSubjectTouched(true);
    setGradeTouched(true);
    setSubjectError(sError);
    setGradeError(gError);

    if (sError || gError) return;

    let updatedSubjects;
    if (editIndex >= 0) {
      updatedSubjects = [...subjects];
      updatedSubjects[editIndex] = { name: subject, grade };
      setEditIndex(-1);
    } else {
      updatedSubjects = [...subjects, { name: subject, grade }];
    }

    setSubjects(updatedSubjects);
    setParentSubjects(updatedSubjects); // Update parent's subjects state

    setSubject("");
    setGrade("");
    setSubjectTouched(false);
    setGradeTouched(false);
    setSubjectError("");
    setGradeError("");
  };

  const handleEditSubject = (index) => {
    const subjectToEdit = subjects[index];
    setSubject(subjectToEdit.name);
    setGrade(subjectToEdit.grade);
    setEditIndex(index);
    setSubjectTouched(false);
    setGradeTouched(false);
    setSubjectError("");
    setGradeError("");
  };

  const handleDeleteSubject = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(updatedSubjects);
    setParentSubjects(updatedSubjects); // Update parent's subjects state
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-2 text-cyan-800 text-center">
        Education Information
      </h2>
      <p className="text-gray-500 text-sm mb-12 text-center">
        Please provide details about your educational background.
      </p>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">High School Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="highSchoolName" className="flex text-md">
              High School Name<span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="highSchoolName"
              value={formData.highSchoolName || ""}
              onChange={handleLocalInputChange}
              onBlur={() => handleLocalBlur("highSchoolName")}
              placeholder="e.g., Riverside High School"
              className={getFieldClassName("highSchoolName")}
              maxLength={200}
              ref={
                Object.keys(errors).length > 0 && errors.highSchoolName
                  ? focusRef
                  : null
              }
            />
            {touched.highSchoolName && errors.highSchoolName && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.highSchoolName}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="highSchoolMatricYear" className="flex text-md">
              Matric Year<span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              type="number"
              min="1900"
              max={new Date().getFullYear() + 5}
              id="highSchoolMatricYear"
              value={formData.highSchoolMatricYear || ""}
              onChange={handleLocalInputChange}
              onBlur={() => handleLocalBlur("highSchoolMatricYear")}
              placeholder="e.g., 2022"
              className={getFieldClassName("highSchoolMatricYear")}
              ref={
                Object.keys(errors).length > 0 && errors.highSchoolMatricYear
                  ? focusRef
                  : null
              }
            />
            {touched.highSchoolMatricYear && errors.highSchoolMatricYear && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.highSchoolMatricYear}
              </p>
            )}
          </div>
        </div>

        {/* Subjects */}
        <div className="mt-6">
          <h4 className="text-md font-medium mb-3">
            Subjects and Grades<span className="text-red-500 ml-1">*</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  if (subjectTouched)
                    setSubjectError(validateSubjectField(e.target.value));
                }}
                onBlur={() => {
                  setSubjectTouched(true);
                  setSubjectError(validateSubjectField(subject));
                }}
                placeholder="e.g., Mathematics"
                className={cn(
                  "mt-1 transition-colors",
                  subjectTouched &&
                    subjectError &&
                    "border-red-500 focus-visible:ring-red-500",
                  subjectTouched &&
                    !subjectError &&
                    subject &&
                    "border-green-500 focus-visible:ring-green-500"
                )}
                maxLength={100}
              />
              {subjectTouched && subjectError && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {subjectError}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="grade">Grade</Label>
              <Input
                id="grade"
                value={grade}
                type={"number"}
                onChange={(e) => {
                  setGrade(e.target.value);
                  if (gradeTouched)
                    setGradeError(validateGradeField(e.target.value));
                }}
                onBlur={() => {
                  setGradeTouched(true);
                  setGradeError(validateGradeField(grade));
                }}
                placeholder="79%"
                className={cn(
                  "mt-1 transition-colors",
                  gradeTouched &&
                    gradeError &&
                    "border-red-500 focus-visible:ring-red-500",
                  gradeTouched &&
                    !gradeError &&
                    grade &&
                    "border-green-500 focus-visible:ring-green-500"
                )}
              />
              {gradeTouched && gradeError && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {gradeError}
                </p>
              )}
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                onClick={handleAddSubject}
                className="w-full mt-1 bg-cyan-800 hover:bg-cyan-700"
              >
                {editIndex >= 0 ? "Update Subject" : "Add Subject"}
                {editIndex >= 0 ? null : <Plus className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>

          {subjects.length > 0 && (
            <div className="mt-4 border rounded-md overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subjects.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {item.grade}%
                      </td>
                      <td className="px-4 py-4 text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditSubject(index)}
                          className="text-cyan-800 hover:text-cyan-700 mr-3"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSubject(index)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {touched.subjects && errors.subjects && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.subjects}
            </p>
          )}
        </div>
      </div>

      {/* Current Education Level */}
      <div className="mt-10 mb-8 w-full">
        <h3 className="text-lg font-medium mb-4">Current Education Level</h3>
        <div className="w-full">
          <Label htmlFor="currentEducationLevel" className="flex text-md">
            What is your current education level?{" "}
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select
            value={formData.currentEducationLevel || ""}
            onValueChange={(value) => {
              handleLocalSelectChange("currentEducationLevel", value);
              setTouched((prev) => ({
                ...prev,
                currentEducationLevel: true,
              }));
            }}
          >
            <SelectTrigger
              id="currentEducationLevel"
              className={cn(
                "w-full",
                getFieldClassName("currentEducationLevel")
              )}
            >
              <SelectValue placeholder="Select your current education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high_school_completed">
                High School Completed
              </SelectItem>
              <SelectItem value="gap_year">Taking a Gap Year</SelectItem>
              <SelectItem value="university_enrolled">
                Currently Enrolled in University
              </SelectItem>
            </SelectContent>
          </Select>
          {touched.currentEducationLevel && errors.currentEducationLevel && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.currentEducationLevel}
            </p>
          )}
        </div>
      </div>

      {/* Higher Education Information - Now using formData instead of local state */}
      {isUniversityEnrolled && (
        <div className="mt-10">
          <h3 className="text-lg font-medium mb-4">
            Higher Education Information
            {isUniversityEnrolled && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </h3>
          <div className="mb-8 border-b pb-6 last:border-b-0 last:pb-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="institutionName" className="flex text-md">
                  Institution Name
                  {isUniversityEnrolled && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                <Input
                  id="institutionName"
                  value={formData.institutionName || ""}
                  onChange={handleLocalInputChange}
                  onBlur={() => handleLocalBlur("institutionName")}
                  placeholder="e.g., University of Example"
                  className={getFieldClassName("institutionName")}
                  maxLength={200}
                />
                {touched.institutionName && errors.institutionName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.institutionName}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="institutionDegreeType" className="flex text-md">
                  Degree Type
                  {isUniversityEnrolled && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                <Select
                  value={formData.institutionDegreeType || ""}
                  onValueChange={(value) => {
                    handleLocalSelectChange("institutionDegreeType", value);
                    setTouched((prev) => ({
                      ...prev,
                      institutionDegreeType: true,
                    }));
                  }}
                >
                  <SelectTrigger
                    id="institutionDegreeType"
                    className={cn(
                      "w-full",
                      getFieldClassName("institutionDegreeType")
                    )}
                  >
                    <SelectValue placeholder="Select degree type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="associate">
                      Associate's Degree
                    </SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="doctorate">Doctorate</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {touched.institutionDegreeType &&
                  errors.institutionDegreeType && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.institutionDegreeType}
                    </p>
                  )}
              </div>
              <div>
                <Label htmlFor="institutionDegreeName" className="flex text-md">
                  Degree Name
                  {isUniversityEnrolled && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                <Input
                  id="institutionDegreeName"
                  value={formData.institutionDegreeName || ""}
                  onChange={handleLocalInputChange}
                  onBlur={() => handleLocalBlur("institutionDegreeName")}
                  placeholder="e.g., Bachelor of Science"
                  className={getFieldClassName("institutionDegreeName")}
                  maxLength={200}
                />
                {touched.institutionDegreeName &&
                  errors.institutionDegreeName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.institutionDegreeName}
                    </p>
                  )}
              </div>
              <div>
                <Label htmlFor="institutionMajor" className="flex text-md">
                  Major/Field of Study
                  {isUniversityEnrolled && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                <Input
                  id="institutionMajor"
                  value={formData.institutionMajor || ""}
                  onChange={handleLocalInputChange}
                  onBlur={() => handleLocalBlur("institutionMajor")}
                  placeholder="e.g., Computer Science"
                  className={getFieldClassName("institutionMajor")}
                  maxLength={100}
                />
                {touched.institutionMajor && errors.institutionMajor && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.institutionMajor}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="institutionStartYear" className="flex text-md">
                  Start Year
                  {isUniversityEnrolled && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                <Input
                  type="number"
                  min="1900"
                  max={new Date().getFullYear() + 5}
                  id="institutionStartYear"
                  value={formData.institutionStartYear || ""}
                  onChange={handleLocalInputChange}
                  onBlur={() => handleLocalBlur("institutionStartYear")}
                  placeholder="e.g., 2018"
                  className={getFieldClassName("institutionStartYear")}
                />
                {touched.institutionStartYear &&
                  errors.institutionStartYear && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.institutionStartYear}
                    </p>
                  )}
              </div>
              <div>
                <Label htmlFor="institutionEndYear">
                  End Year (or Expected)
                </Label>
                <Input
                  type="number"
                  min="1900"
                  max={new Date().getFullYear() + 10}
                  id="institutionEndYear"
                  value={formData.institutionEndYear || ""}
                  onChange={handleLocalInputChange}
                  onBlur={() => handleLocalBlur("institutionEndYear")}
                  placeholder="e.g., 2022"
                  className={getFieldClassName("institutionEndYear")}
                />
                {touched.institutionEndYear && errors.institutionEndYear && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.institutionEndYear}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="institutionGPA">GPA / Result (Optional)</Label>
                <Input
                  id="institutionGPA"
                  value={formData.institutionGPA || ""}
                  onChange={handleLocalInputChange}
                  onBlur={() => handleLocalBlur("institutionGPA")}
                  placeholder="e.g., 3.8 or A+"
                  className={getFieldClassName("institutionGPA")}
                />
                {touched.institutionGPA && errors.institutionGPA && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.institutionGPA}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

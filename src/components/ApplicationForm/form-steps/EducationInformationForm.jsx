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
  validateField, // Validation function from parent component
  focusRef,
  subjects,
  setSubjects,
  previousEducations,
  setPreviousEducations,
}) {
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [subjectTouched, setSubjectTouched] = useState(false);
  const [gradeTouched, setGradeTouched] = useState(false);
  const [subjectError, setSubjectError] = useState("");
  const [gradeError, setGradeError] = useState("");

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

    if (editIndex >= 0) {
      const updatedSubjects = [...subjects];
      updatedSubjects[editIndex] = { name: subject, grade };
      setSubjects(updatedSubjects);
      setEditIndex(-1);
    } else {
      setSubjects([...subjects, { name: subject, grade }]);
    }

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
  };

  const handlePreviousEducationChange = (index, field, value) => {
    const updated = [...previousEducations];
    updated[index][field] = value;
    setPreviousEducations(updated);

    // Validate the field if validation function is available
    if (validateField && touched[`${field}-${index}`]) {
      // Parent component will handle validation through formData updates
    }
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

      {/* Higher Education Info */}
      <div className="mt-10">
        <h3 className="text-lg font-medium mb-4">
          Higher Education Information (Optional)
        </h3>
        {previousEducations.map((edu, idx) => (
          <div
            key={idx}
            className="mb-8 border-b pb-6 last:border-b-0 last:pb-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor={`institutionName-${idx}`}>
                  Institution Name
                </Label>
                <Input
                  id={`institutionName-${idx}`}
                  value={edu.institutionName || ""}
                  onChange={(e) => {
                    handlePreviousEducationChange(
                      idx,
                      "institutionName",
                      e.target.value
                    );
                  }}
                  onBlur={() => handleLocalBlur(`institutionName-${idx}`)}
                  placeholder="e.g., University of Example"
                  className={getFieldClassName(`institutionName-${idx}`)}
                  maxLength={200}
                />
                {touched[`institutionName-${idx}`] &&
                  errors[`institutionName-${idx}`] && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors[`institutionName-${idx}`]}
                    </p>
                  )}
              </div>
              <div>
                <Label htmlFor={`institutionDegreeType-${idx}`}>
                  Degree Type
                </Label>
                <Select
                  value={edu.institutionDegreeType || ""}
                  onValueChange={(value) => {
                    handlePreviousEducationChange(
                      idx,
                      "institutionDegreeType",
                      value
                    );
                    handleLocalSelectChange(
                      `institutionDegreeType-${idx}`,
                      value
                    );
                  }}
                >
                  <SelectTrigger
                    id={`institutionDegreeType-${idx}`}
                    className={getFieldClassName(
                      `institutionDegreeType-${idx}`
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
                {touched[`institutionDegreeType-${idx}`] &&
                  errors[`institutionDegreeType-${idx}`] && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors[`institutionDegreeType-${idx}`]}
                    </p>
                  )}
              </div>
              <div>
                <Label htmlFor={`institutionDegreeName-${idx}`}>
                  Degree Name
                </Label>
                <Input
                  id={`institutionDegreeName-${idx}`}
                  value={edu.institutionDegreeName || ""}
                  onChange={(e) => {
                    handlePreviousEducationChange(
                      idx,
                      "institutionDegreeName",
                      e.target.value
                    );
                  }}
                  onBlur={() => handleLocalBlur(`institutionDegreeName-${idx}`)}
                  placeholder="e.g., Bachelor of Science"
                  className={getFieldClassName(`institutionDegreeName-${idx}`)}
                  maxLength={200}
                />
                {touched[`institutionDegreeName-${idx}`] &&
                  errors[`institutionDegreeName-${idx}`] && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors[`institutionDegreeName-${idx}`]}
                    </p>
                  )}
              </div>
              <div>
                <Label htmlFor={`institutionMajor-${idx}`}>
                  Major/Field of Study
                </Label>
                <Input
                  id={`institutionMajor-${idx}`}
                  value={edu.institutionMajor || ""}
                  onChange={(e) => {
                    handlePreviousEducationChange(
                      idx,
                      "institutionMajor",
                      e.target.value
                    );
                  }}
                  onBlur={() => handleLocalBlur(`institutionMajor-${idx}`)}
                  placeholder="e.g., Computer Science"
                  className={getFieldClassName(`institutionMajor-${idx}`)}
                  maxLength={100}
                />
                {touched[`institutionMajor-${idx}`] &&
                  errors[`institutionMajor-${idx}`] && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors[`institutionMajor-${idx}`]}
                    </p>
                  )}
              </div>
              <div>
                <Label htmlFor={`institutionStartYear-${idx}`}>
                  Start Year
                </Label>
                <Input
                  id={`institutionStartYear-${idx}`}
                  value={edu.institutionStartYear || ""}
                  onChange={(e) => {
                    handlePreviousEducationChange(
                      idx,
                      "institutionStartYear",
                      e.target.value
                    );
                  }}
                  onBlur={() => handleLocalBlur(`institutionStartYear-${idx}`)}
                  placeholder="e.g., 2018"
                  className={getFieldClassName(`institutionStartYear-${idx}`)}
                />
                {touched[`institutionStartYear-${idx}`] &&
                  errors[`institutionStartYear-${idx}`] && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors[`institutionStartYear-${idx}`]}
                    </p>
                  )}
              </div>
              <div>
                <Label htmlFor={`institutionEndYear-${idx}`}>
                  End Year (or Expected)
                </Label>
                <Input
                  id={`institutionEndYear-${idx}`}
                  value={edu.institutionEndYear || ""}
                  onChange={(e) => {
                    handlePreviousEducationChange(
                      idx,
                      "institutionEndYear",
                      e.target.value
                    );
                  }}
                  onBlur={() => handleLocalBlur(`institutionEndYear-${idx}`)}
                  placeholder="e.g., 2022"
                  className={getFieldClassName(`institutionEndYear-${idx}`)}
                />
                {touched[`institutionEndYear-${idx}`] &&
                  errors[`institutionEndYear-${idx}`] && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors[`institutionEndYear-${idx}`]}
                    </p>
                  )}
              </div>
              <div>
                <Label htmlFor={`institutionGPA-${idx}`}>
                  GPA / Result (Optional)
                </Label>
                <Input
                  id={`institutionGPA-${idx}`}
                  value={edu.institutionGPA || ""}
                  onChange={(e) => {
                    handlePreviousEducationChange(
                      idx,
                      "institutionGPA",
                      e.target.value
                    );
                  }}
                  onBlur={() => handleLocalBlur(`institutionGPA-${idx}`)}
                  placeholder="e.g., 3.8 or A+"
                  className={getFieldClassName(`institutionGPA-${idx}`)}
                />
                {touched[`institutionGPA-${idx}`] &&
                  errors[`institutionGPA-${idx}`] && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors[`institutionGPA-${idx}`]}
                    </p>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        className="text-cyan-800 border-cyan-800 hover:bg-cyan-50"
        onClick={() =>
          setPreviousEducations([
            ...previousEducations,
            {
              institutionName: "",
              institutionDegreeType: "",
              institutionDegreeName: "",
              institutionMajor: "",
              institutionStartYear: "",
              institutionEndYear: "",
              institutionGPA: "",
            },
          ])
        }
      >
        Add Another Previous Education
      </Button>
    </div>
  );
}

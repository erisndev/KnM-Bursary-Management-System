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
  setTouched = () => {},
  validateField,
  focusRef,
  subjects: parentSubjects = [],
  setSubjects: setParentSubjects = () => {},
}) {
  const [subjects, setSubjects] = useState(parentSubjects);
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [subjectTouched, setSubjectTouched] = useState(false);
  const [gradeTouched, setGradeTouched] = useState(false);
  const [subjectError, setSubjectError] = useState("");
  const [gradeError, setGradeError] = useState("");

  const isUniversityEnrolled =
    formData.currentEducationLevel === "university_enrolled";

  const validateSubjectField = (value) => {
    if (!value || !value.trim()) return "Subject is required";
    if (value.length < 2 || value.length > 100)
      return "Subject name must be between 2 and 100 characters";
    if (!/^[a-zA-Z\s'-]+$/.test(value))
      return "Subject name must contain only letters, spaces, hyphens, and apostrophes";
    return "";
  };

  const validateGradeField = (value) => {
    if (!value || !value.trim()) return "Grade is required";
    const num = Number(value);
    if (isNaN(num) || num < 0 || num > 100)
      return "Please enter a valid percentage (0-100)";
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
      status === "error" && "border-red-300 focus-visible:ring-red-500",
      status === "success" &&
        "border-emerald-300 focus-visible:ring-emerald-500",
    );
  };

  const handleLocalInputChange = (e) => {
    if (handleInputChange) handleInputChange(e);
  };

  // Fixed: select change sets value first, then validates after
  const handleLocalSelectChange = (fieldName, value) => {
    if (handleSelectChange) handleSelectChange(fieldName, value);
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    // Delay blur to ensure value is set
    setTimeout(() => {
      if (handleBlur) handleBlur(fieldName);
    }, 0);
  };

  const handleLocalBlur = (fieldName) => {
    if (handleBlur) handleBlur(fieldName);
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
    setParentSubjects(updatedSubjects);
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
    setParentSubjects(updatedSubjects);
  };

  const FieldError = ({ show, message }) => {
    if (!show || !message) return null;
    return (
      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
        <AlertCircle className="w-3 h-3 flex-shrink-0" />
        {message}
      </p>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Education Information
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
          Please provide details about your educational background.
        </p>
      </div>

      {/* High School */}
      <div className="mb-8">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-100 dark:border-slate-700">
          High School Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label
              htmlFor="highSchoolName"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              High School Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="highSchoolName"
              value={formData.highSchoolName || ""}
              onChange={handleLocalInputChange}
              onBlur={() => handleLocalBlur("highSchoolName")}
              placeholder="e.g., Riverside High School"
              className={getFieldClassName("highSchoolName")}
              maxLength={200}
            />
            <FieldError
              show={touched.highSchoolName}
              message={errors.highSchoolName}
            />
          </div>
          <div>
            <Label
              htmlFor="highSchoolMatricYear"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Matric Year <span className="text-red-500">*</span>
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
            />
            <FieldError
              show={touched.highSchoolMatricYear}
              message={errors.highSchoolMatricYear}
            />
          </div>
        </div>

        {/* Subjects */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Subjects and Grades <span className="text-red-500">*</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label
                htmlFor="subject"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Subject
              </Label>
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
                  "mt-1",
                  subjectTouched && subjectError && "border-red-300",
                  subjectTouched &&
                    !subjectError &&
                    subject &&
                    "border-emerald-300",
                )}
                maxLength={100}
              />
              <FieldError show={subjectTouched} message={subjectError} />
            </div>
            <div>
              <Label
                htmlFor="grade"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Grade (%)
              </Label>
              <Input
                id="grade"
                value={grade}
                type="number"
                onChange={(e) => {
                  setGrade(e.target.value);
                  if (gradeTouched)
                    setGradeError(validateGradeField(e.target.value));
                }}
                onBlur={() => {
                  setGradeTouched(true);
                  setGradeError(validateGradeField(grade));
                }}
                placeholder="79"
                className={cn(
                  "mt-1",
                  gradeTouched && gradeError && "border-red-300",
                  gradeTouched && !gradeError && grade && "border-emerald-300",
                )}
              />
              <FieldError show={gradeTouched} message={gradeError} />
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                onClick={handleAddSubject}
                className="w-full mt-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-sm"
              >
                {editIndex >= 0 ? "Update" : "Add Subject"}
                {editIndex < 0 && <Plus className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>

          {subjects.length > 0 && (
            <div className="mt-4 border border-gray-200 dark:border-slate-700 rounded-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                <thead className="bg-gray-50 dark:bg-slate-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-slate-700">
                  {subjects.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:bg-slate-800"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {item.grade}%
                      </td>
                      <td className="px-4 py-3 text-right text-sm">
                        <button
                          onClick={() => handleEditSubject(index)}
                          className="text-violet-500 hover:text-violet-700 dark:text-violet-400 mr-3"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSubject(index)}
                          className="text-red-500 hover:text-red-700"
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

          <FieldError show={touched.subjects} message={errors.subjects} />
        </div>
      </div>

      {/* Current Education Level */}
      <div className="mb-8">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-100 dark:border-slate-700">
          Current Education Level
        </h3>
        <div className="w-full">
          <Label
            htmlFor="currentEducationLevel"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            What is your current education level?{" "}
            <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.currentEducationLevel || undefined}
            onValueChange={(value) =>
              handleLocalSelectChange("currentEducationLevel", value)
            }
          >
            <SelectTrigger
              id="currentEducationLevel"
              className={cn(
                "w-full",
                getFieldClassName("currentEducationLevel"),
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
          <FieldError
            show={touched.currentEducationLevel}
            message={errors.currentEducationLevel}
          />
        </div>
      </div>

      {/* Higher Education */}
      {isUniversityEnrolled && (
        <div className="mb-8">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-100 dark:border-slate-700">
            Higher Education Information <span className="text-red-500">*</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label
                htmlFor="institutionName"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Institution Name <span className="text-red-500">*</span>
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
              <FieldError
                show={touched.institutionName}
                message={errors.institutionName}
              />
            </div>
            <div>
              <Label
                htmlFor="institutionDegreeType"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Degree Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.institutionDegreeType || undefined}
                onValueChange={(value) =>
                  handleLocalSelectChange("institutionDegreeType", value)
                }
              >
                <SelectTrigger
                  id="institutionDegreeType"
                  className={cn(
                    "w-full",
                    getFieldClassName("institutionDegreeType"),
                  )}
                >
                  <SelectValue placeholder="Select degree type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="associate">Associate's Degree</SelectItem>
                  <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                  <SelectItem value="master">Master's Degree</SelectItem>
                  <SelectItem value="doctorate">Doctorate</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FieldError
                show={touched.institutionDegreeType}
                message={errors.institutionDegreeType}
              />
            </div>
            <div>
              <Label
                htmlFor="institutionDegreeName"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Degree Name <span className="text-red-500">*</span>
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
              <FieldError
                show={touched.institutionDegreeName}
                message={errors.institutionDegreeName}
              />
            </div>
            <div>
              <Label
                htmlFor="institutionMajor"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Major/Field of Study <span className="text-red-500">*</span>
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
              <FieldError
                show={touched.institutionMajor}
                message={errors.institutionMajor}
              />
            </div>
            <div>
              <Label
                htmlFor="institutionStartYear"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Start Year <span className="text-red-500">*</span>
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
              <FieldError
                show={touched.institutionStartYear}
                message={errors.institutionStartYear}
              />
            </div>
            <div>
              <Label
                htmlFor="institutionEndYear"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                End Year (or Expected){" "}
                <span className="text-gray-400 dark:text-gray-500 dark:text-gray-400 text-xs">
                  (Optional)
                </span>
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
              <FieldError
                show={touched.institutionEndYear}
                message={errors.institutionEndYear}
              />
            </div>
            <div>
              <Label
                htmlFor="institutionGPA"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                GPA / Result{" "}
                <span className="text-gray-400 dark:text-gray-500 dark:text-gray-400 text-xs">
                  (Optional)
                </span>
              </Label>
              <Input
                id="institutionGPA"
                value={formData.institutionGPA || ""}
                onChange={handleLocalInputChange}
                onBlur={() => handleLocalBlur("institutionGPA")}
                placeholder="e.g., 75"
                className={getFieldClassName("institutionGPA")}
              />
              <FieldError
                show={touched.institutionGPA}
                message={errors.institutionGPA}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

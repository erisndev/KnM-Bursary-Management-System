import React, { useState } from "react";
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
import { Pencil, Plus, Trash2 } from "lucide-react";
import FormField from "@/components/ui/form-field";

export default function EducationInformationForm({
  formData,
  handleInputChange,
  handleBlur,
  errors,
  touched,
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

  const validateSubject = (value) => {
    if (!value.trim()) return "Subject is required";
    return "";
  };
  const validateGrade = (value) => {
    if (!value.trim()) return "Grade is required";
    return "";
  };

  const handleAddSubject = () => {
    const sError = validateSubject(subject);
    const gError = validateGrade(grade);
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
    setSubject(subjectToEdit.subject);
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

  return (
    <div className="w-full max-w-6xl mx-auto ">
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
            <Label htmlFor="highSchoolName">
              High School Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="highSchoolName"
              value={formData.highSchoolName}
              onChange={handleInputChange}
              onBlur={() => handleBlur("highSchoolName")}
              placeholder="e.g., Riverside High School"
              className="mt-1"
              ref={
                Object.keys(errors).length > 0 && errors.highSchoolName
                  ? focusRef
                  : null
              }
            />
            {touched.highSchoolName && errors.highSchoolName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.highSchoolName}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="highSchoolMatricYear">
              Matric Year<span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              min="1900"
              max={new Date().getFullYear() + 5}
              id="highSchoolMatricYear"
              value={formData.highSchoolMatricYear}
              onChange={handleInputChange}
              onBlur={() => handleBlur("highSchoolMatricYear")}
              placeholder="e.g., 2022"
              className="mt-1"
              ref={
                Object.keys(errors).length > 0 && errors.highSchoolMatricYear
                  ? focusRef
                  : null
              }
            />
            {touched.highSchoolMatricYear && errors.highSchoolMatricYear && (
              <p className="text-red-500 text-xs mt-1">
                {errors.highSchoolMatricYear}
              </p>
            )}
          </div>
        </div>

        {/* Subjects */}
        <div className="mt-6">
          <h4 className="text-md font-medium mb-3">Subjects and Grades</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  if (subjectTouched)
                    setSubjectError(validateSubject(e.target.value));
                }}
                onBlur={() => {
                  setSubjectTouched(true);
                  setSubjectError(validateSubject(subject));
                }}
                placeholder="e.g., Mathematics"
                className="mt-1"
              />
              {subjectTouched && subjectError && (
                <p className="text-red-500 text-xs mt-1">{subjectError}</p>
              )}
            </div>
            <div>
              <Label htmlFor="grade">Grade</Label>
              <Input
                id="grade"
                value={grade}
                onChange={(e) => {
                  setGrade(e.target.value);
                  if (gradeTouched)
                    setGradeError(validateGrade(e.target.value));
                }}
                onBlur={() => {
                  setGradeTouched(true);
                  setGradeError(validateGrade(grade));
                }}
                placeholder="e.g., A or 95%"
                className="mt-1"
              />
              {gradeTouched && gradeError && (
                <p className="text-red-500 text-xs mt-1">{gradeError}</p>
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
                        {item.grade}
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
            <p className="text-red-500 text-xs mt-1">{errors.subjects}</p>
          )}
        </div>
      </div>
      {/* Higher Education Info */}
      <div className="mt-10">
        <h3 className="text-lg font-medium mb-4">
          Higher Education Information
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
                  value={edu.institutionName}
                  onChange={(e) => {
                    const updated = [...previousEducations];
                    updated[idx].institutionName = e.target.value;
                    setPreviousEducations(updated);
                  }}
                  placeholder="e.g., University of Example"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`institutionDegreeType-${idx}`}>
                  Degree Type
                </Label>
                <Select
                  value={edu.institutionDegreeType}
                  onValueChange={(value) => {
                    const updated = [...previousEducations];
                    updated[idx].institutionDegreeType = value;
                    setPreviousEducations(updated);
                  }}
                >
                  <SelectTrigger
                    id={`institutionDegreeType-${idx}`}
                    className="mt-1 w-full"
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
              </div>
              <div>
                <Label htmlFor={`institutionDegreeName-${idx}`}>
                  Degree Name
                </Label>
                <Input
                  id={`institutionDegreeName-${idx}`}
                  value={edu.institutionDegreeName}
                  onChange={(e) => {
                    const updated = [...previousEducations];
                    updated[idx].institutionDegreeName = e.target.value;
                    setPreviousEducations(updated);
                  }}
                  placeholder="e.g., Bachelor of Science"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`institutionMajor-${idx}`}>
                  Major/Field of Study
                </Label>
                <Input
                  id={`institutionMajor-${idx}`}
                  value={edu.institutionMajor}
                  onChange={(e) => {
                    const updated = [...previousEducations];
                    updated[idx].institutionMajor = e.target.value;
                    setPreviousEducations(updated);
                  }}
                  placeholder="e.g., Computer Science"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`institutionStartYear-${idx}`}>
                  Start Year
                </Label>
                <Input
                  id={`institutionStartYear-${idx}`}
                  value={edu.institutionStartYear}
                  onChange={(e) => {
                    const updated = [...previousEducations];
                    updated[idx].institutionStartYear = e.target.value;
                    setPreviousEducations(updated);
                  }}
                  placeholder="e.g., 2018"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`institutionEndYear-${idx}`}>
                  End Year (or Expected)
                </Label>
                <Input
                  id={`institutionEndYear-${idx}`}
                  value={edu.institutionEndYear}
                  onChange={(e) => {
                    const updated = [...previousEducations];
                    updated[idx].institutionEndYear = e.target.value;
                    setPreviousEducations(updated);
                  }}
                  placeholder="e.g., 2022"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`institutionGPA-${idx}`}>
                  GPA / Result (Optional)
                </Label>
                <Input
                  id={`institutionGPA-${idx}`}
                  value={edu.institutionGPA}
                  onChange={(e) => {
                    const updated = [...previousEducations];
                    updated[idx].institutionGPA = e.target.value;
                    setPreviousEducations(updated);
                  }}
                  placeholder="e.g., 3.8 or A+"
                  className="mt-1"
                />
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

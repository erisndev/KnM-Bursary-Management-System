import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

const genderOptions = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "prefer not to say", label: "Prefer not to say" },
  { value: "other", label: "Other" },
];

const relationshipOptions = [
  { value: "mother", label: "Mother" },
  { value: "father", label: "Father" },
  { value: "guardian", label: "Guardian" },
  { value: "sibling", label: "Sibling" },
  { value: "grandparent", label: "Grandparent" },
  { value: "aunt", label: "Aunt" },
  { value: "uncle", label: "Uncle" },
  { value: "other", label: "Other" },
];

const incomeRanges = [
  { value: "0-1000", label: "R0 - R1,000" },
  { value: "1001-3000", label: "R1,001 - R3,000" },
  { value: "3001-5000", label: "R3,001 - R5,000" },
  { value: "5001-10000", label: "R5,001 - R10,000" },
  { value: "10001-20000", label: "R10,001 - R20,000" },
  { value: "20001-30000", label: "R20,001 - R30,000" },
  { value: "30001-50000", label: "R30,001 - R50,000" },
  { value: "50001-100000", label: "R50,001 - R100,000" },
  { value: "100001+", label: "R100,001+" },
];

const FieldError = ({ show, message }) => {
  if (!show || !message) return null;
  return (
    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
      <AlertCircle className="w-3 h-3 flex-shrink-0" />
      {message}
    </p>
  );
};

export default function HouseholdInformationForm({
  formData,
  handleInputChange,
  handleSelectChange,
  handleBlur,
  errors,
  touched,
}) {
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Household Information
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Please provide details about your household.
        </p>
      </div>

      <div className="mb-8">
        <Label htmlFor="numberOfMembers" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Number of household members <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.numberOfMembers || undefined}
          onValueChange={(value) => handleSelectChange("numberOfMembers", value)}
        >
          <SelectTrigger
            id="numberOfMembers"
            className={cn(
              "mt-1 w-full",
              touched.numberOfMembers && errors.numberOfMembers
                ? "border-red-300"
                : ""
            )}
          >
            <SelectValue placeholder="Select number of household members" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(9)].map((_, i) => (
              <SelectItem key={i + 1} value={`${i + 1}`}>
                {i + 1}
              </SelectItem>
            ))}
            <SelectItem value="10+">10+</SelectItem>
          </SelectContent>
        </Select>
        <FieldError show={touched.numberOfMembers} message={errors.numberOfMembers} />
      </div>

      {/* Parent 1 / Guardian 1 */}
      <div className="mb-8">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-100 dark:border-slate-700">
          Parent / Guardian 1 Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="parent1FirstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="parent1FirstName"
              value={formData.parent1FirstName}
              onChange={handleInputChange}
              onBlur={() => handleBlur("parent1FirstName")}
              placeholder="e.g., Mary"
              className={cn(
                "w-full mt-1",
                touched.parent1FirstName && errors.parent1FirstName ? "border-red-300" : ""
              )}
            />
            <FieldError show={touched.parent1FirstName} message={errors.parent1FirstName} />
          </div>

          <div>
            <Label htmlFor="parent1LastName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="parent1LastName"
              value={formData.parent1LastName}
              onChange={handleInputChange}
              onBlur={() => handleBlur("parent1LastName")}
              placeholder="e.g., Doe"
              className={cn(
                "w-full mt-1",
                touched.parent1LastName && errors.parent1LastName ? "border-red-300" : ""
              )}
            />
            <FieldError show={touched.parent1LastName} message={errors.parent1LastName} />
          </div>

          <div>
            <Label htmlFor="parent1Gender" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Gender <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.parent1Gender || undefined}
              onValueChange={(value) => handleSelectChange("parent1Gender", value)}
            >
              <SelectTrigger
                id="parent1Gender"
                className={cn(
                  "w-full mt-1",
                  touched.parent1Gender && errors.parent1Gender ? "border-red-300" : ""
                )}
              >
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError show={touched.parent1Gender} message={errors.parent1Gender} />
          </div>

          <div>
            <Label htmlFor="parent1Relationship" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Relationship <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.parent1Relationship || undefined}
              onValueChange={(value) => handleSelectChange("parent1Relationship", value)}
            >
              <SelectTrigger
                id="parent1Relationship"
                className={cn(
                  "w-full mt-1",
                  touched.parent1Relationship && errors.parent1Relationship ? "border-red-300" : ""
                )}
              >
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                {relationshipOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError show={touched.parent1Relationship} message={errors.parent1Relationship} />
          </div>

          <div>
            <Label htmlFor="parent1EmploymentStatus" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Employment Status <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.parent1EmploymentStatus || undefined}
              onValueChange={(value) => handleSelectChange("parent1EmploymentStatus", value)}
            >
              <SelectTrigger
                id="parent1EmploymentStatus"
                className={cn(
                  "mt-1 w-full",
                  touched.parent1EmploymentStatus && errors.parent1EmploymentStatus ? "border-red-300" : ""
                )}
              >
                <SelectValue placeholder="Select employment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employed">Employed</SelectItem>
                <SelectItem value="self-employed">Self-Employed</SelectItem>
                <SelectItem value="unemployed">Unemployed</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
            <FieldError show={touched.parent1EmploymentStatus} message={errors.parent1EmploymentStatus} />
          </div>

          <div>
            <Label htmlFor="parent1Occupation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Occupation <span className="text-gray-400 dark:text-gray-500 dark:text-gray-400 text-xs">(Optional)</span>
            </Label>
            <Input
              id="parent1Occupation"
              value={formData.parent1Occupation}
              onChange={handleInputChange}
              placeholder="e.g., Primary school teacher"
              className="mt-1 w-full"
            />
          </div>

          <div>
            <Label htmlFor="parent1MonthlyIncome" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Monthly Income <span className="text-gray-400 dark:text-gray-500 dark:text-gray-400 text-xs">(Optional)</span>
            </Label>
            <Select
              value={formData.parent1MonthlyIncome || undefined}
              onValueChange={(value) => handleSelectChange("parent1MonthlyIncome", value)}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select monthly income range" />
              </SelectTrigger>
              <SelectContent>
                {incomeRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Parent 2 / Guardian 2 */}
      <div className="mb-8">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 pb-2 border-b border-gray-100 dark:border-slate-700">
          Parent / Guardian 2 Information
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 dark:text-gray-400 mb-4">Optional — fill in if applicable</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="parent2FirstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              First Name
            </Label>
            <Input
              id="parent2FirstName"
              value={formData.parent2FirstName}
              onChange={handleInputChange}
              placeholder="e.g., Mark"
              className="mt-1 w-full"
            />
          </div>

          <div>
            <Label htmlFor="parent2LastName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Name
            </Label>
            <Input
              id="parent2LastName"
              value={formData.parent2LastName}
              onChange={handleInputChange}
              placeholder="e.g., Doe"
              className="mt-1 w-full"
            />
          </div>

          <div>
            <Label htmlFor="parent2Gender" className="text-sm font-medium text-gray-700 dark:text-gray-300">Gender</Label>
            <Select
              value={formData.parent2Gender || undefined}
              onValueChange={(value) => handleSelectChange("parent2Gender", value)}
            >
              <SelectTrigger id="parent2Gender" className="mt-1 w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="parent2Relationship" className="text-sm font-medium text-gray-700 dark:text-gray-300">Relationship</Label>
            <Select
              value={formData.parent2Relationship || undefined}
              onValueChange={(value) => handleSelectChange("parent2Relationship", value)}
            >
              <SelectTrigger id="parent2Relationship" className="mt-1 w-full">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                {relationshipOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="parent2EmploymentStatus" className="text-sm font-medium text-gray-700 dark:text-gray-300">Employment Status</Label>
            <Select
              value={formData.parent2EmploymentStatus || undefined}
              onValueChange={(value) => handleSelectChange("parent2EmploymentStatus", value)}
            >
              <SelectTrigger id="parent2EmploymentStatus" className="mt-1 w-full">
                <SelectValue placeholder="Select employment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employed">Employed</SelectItem>
                <SelectItem value="self-employed">Self-Employed</SelectItem>
                <SelectItem value="unemployed">Unemployed</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="parent2Occupation" className="text-sm font-medium text-gray-700 dark:text-gray-300">Occupation</Label>
            <Input
              id="parent2Occupation"
              value={formData.parent2Occupation}
              onChange={handleInputChange}
              placeholder="e.g., Primary school teacher"
              className="mt-1 w-full"
            />
          </div>

          <div>
            <Label htmlFor="parent2MonthlyIncome" className="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Income</Label>
            <Select
              value={formData.parent2MonthlyIncome || undefined}
              onValueChange={(value) => handleSelectChange("parent2MonthlyIncome", value)}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select monthly income range" />
              </SelectTrigger>
              <SelectContent>
                {incomeRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

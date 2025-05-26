import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import FormField from "@/components/ui/form-field";
import { cn } from "@/lib/utils";

export default function HouseholdInformationForm({
  formData,
  handleInputChange,
  handleSelectChange,
  handleBlur,
  errors,
  touched,
  focusRef,
}) {
  return (
    <div className="w-full max-w-6xl mx-auto ">
      <h2 className="text-xl font-semibold mb-2 text-center">
        Financial Information
      </h2>
      <p className="text-gray-500 text-sm mb-12 text-center">
        Please provide details about your household.
      </p>

      <div className="mb-6">
        <Label htmlFor="numberOfMembers" className="flex">
          Number of household members{" "}
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          value={formData.numberOfMembers}
          onValueChange={(value) => {
            handleSelectChange("numberOfMembers", value);
            handleBlur("numberOfMembers");
          }}
        >
          <SelectTrigger
            id="numberOfMembers"
            className={cn(
              "mt-1 w-full",
              touched.numberOfMembers && errors.numberOfMembers
                ? "border-red-500 focus-visible:ring-red-500"
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
        {touched.numberOfMembers && errors.numberOfMembers && (
          <p className="text-red-500 text-xs mt-1">{errors.numberOfMembers}</p>
        )}
      </div>

      {/* Parent 1 / Guardian 1 Information */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">
          Parent 1 / Guardian 1 Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label htmlFor="parent1FirstName" className="flex">
              First Name <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="parent1FirstName"
              value={formData.parent1FirstName}
              onChange={handleInputChange}
              onBlur={() => handleBlur("parent1FirstName")}
              placeholder="e.g., Mary"
              className={cn(
                "w-full mt-1",
                touched.parent1FirstName && errors.parent1FirstName
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              )}
              ref={
                Object.keys(errors).length > 0 && errors.parent1FirstName
                  ? focusRef
                  : null
              }
            />
            {touched.parent1FirstName && errors.parent1FirstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.parent1FirstName}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="parent1LastName" className="flex">
              Last Name <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="parent1LastName"
              value={formData.parent1LastName}
              onChange={handleInputChange}
              onBlur={() => handleBlur("parent1LastName")}
              placeholder="e.g., Doe"
              className={cn(
                "w-full mt-1",
                touched.parent1LastName && errors.parent1LastName
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              )}
              ref={
                Object.keys(errors).length > 0 && errors.parent1LastName
                  ? focusRef
                  : null
              }
            />
            {touched.parent1LastName && errors.parent1LastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.parent1LastName}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="parent1Gender">
              Gender <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="parent1Gender"
              value={formData.parent1Gender}
              onChange={handleInputChange}
              placeholder="e.g., Female"
              onBlur={() => handleBlur("parent1Gender")}
              className={cn(
                "w-full mt-1",
                touched.parent1Gender && errors.parent1Gender
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              )}
              ref={
                Object.keys(errors).length > 0 && errors.parent1Gender
                  ? focusRef
                  : null
              }
            />
            {touched.parent1Gender && errors.parent1Gender && (
              <p className="text-red-500 text-xs mt-1">
                {errors.parent1Gender}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="parent1Relationship" className="flex">
              Relationship <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="parent1Relationship"
              value={formData.parent1Relationship}
              onChange={handleInputChange}
              onBlur={() => handleBlur("parent1Relationship")}
              placeholder="e.g., Mother"
              className={cn(
                "w-full mt-1",
                touched.parent1Relationship && errors.parent1Relationship
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              )}
              ref={
                Object.keys(errors).length > 0 && errors.parent1Relationship
                  ? focusRef
                  : null
              }
            />
            {touched.parent1Relationship && errors.parent1Relationship && (
              <p className="text-red-500 text-xs mt-1">
                {errors.parent1Relationship}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="parent1EmploymentStatus" className="flex">
              Employment Status <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formData.parent1EmploymentStatus}
              onValueChange={(value) => {
                handleSelectChange("parent1EmploymentStatus", value);
                handleBlur("parent1EmploymentStatus");
              }}
            >
              <SelectTrigger
                id="parent1EmploymentStatus"
                className={cn(
                  "mt-1 w-full",
                  touched.parent1EmploymentStatus &&
                    errors.parent1EmploymentStatus
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
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
            {touched.parent1EmploymentStatus &&
              errors.parent1EmploymentStatus && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.parent1EmploymentStatus}
                </p>
              )}
          </div>

          <div>
            <Label htmlFor="parent1Occupation">Occupation</Label>
            <Input
              id="parent1Occupation"
              value={formData.parent1Occupation}
              onChange={handleInputChange}
              placeholder="e.g., Primary school teacher"
              className="mt-1 w-full"
            />
          </div>

          <div>
            <Label htmlFor="parent1OtherIncome">Other form of income</Label>
            <Select
              value={formData.parent1OtherIncome}
              onValueChange={(value) =>
                handleSelectChange("parent1OtherIncome", value)
              }
            >
              <SelectTrigger id="parent1OtherIncome" className="mt-1 w-full">
                <SelectValue placeholder="No" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="rental">Rental Income</SelectItem>
                <SelectItem value="investment">Investment Income</SelectItem>
                <SelectItem value="pension">Pension</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="parent1MonthlyIncome">Monthly Income</Label>
            <Input
              id="parent1MonthlyIncome"
              value={formData.parent1MonthlyIncome}
              onChange={handleInputChange}
              placeholder="e.g., $4000"
              className="mt-1 w-full"
            />
          </div>
        </div>
      </div>

      {/* Parent 2 / Guardian 2 Information */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">
          Parent 2 / Guardian 2 Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label htmlFor="parent2FirstName">First Name</Label>
            <Input
              id="parent2FirstName"
              value={formData.parent2FirstName}
              onChange={handleInputChange}
              placeholder="e.g., Mark"
              className="mt-1 w-full"
            />
          </div>

          <div>
            <Label htmlFor="parent2LastName">Last Name</Label>
            <Input
              id="parent2LastName"
              value={formData.parent2LastName}
              onChange={handleInputChange}
              placeholder="e.g., Doe"
              className="mt-1 w-full"
            />
          </div>

          <div>
            <Label htmlFor="parent2Gender">Gender</Label>
            <Input
              id="parent2Gender"
              value={formData.parent2Gender}
              onChange={handleInputChange}
              placeholder="e.g., Male"
              className="mt-1 w-full"
            />
          </div>

          <div>
            <Label htmlFor="parent2Relationship">Relationship</Label>
            <Input
              id="parent2Relationship"
              value={formData.parent2Relationship}
              onChange={handleInputChange}
              placeholder="e.g., Father"
              className="mt-1 w-full"
            />
          </div>

          <div>
            <Label htmlFor="parent2EmploymentStatus">Employment Status</Label>
            <Select
              value={formData.parent2EmploymentStatus}
              onValueChange={(value) =>
                handleSelectChange("parent2EmploymentStatus", value)
              }
            >
              <SelectTrigger
                id="parent2EmploymentStatus"
                className="mt-1 w-full"
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
          </div>

          <div>
            <Label htmlFor="parent2Occupation">Occupation</Label>
            <Input
              id="parent2Occupation"
              value={formData.parent2Occupation}
              onChange={handleInputChange}
              placeholder="e.g., Primary school teacher"
              className="mt-1 w-full"
            />
          </div>

          <div>
            <Label htmlFor="parent2OtherIncome">Other form of income</Label>
            <Select
              value={formData.parent2OtherIncome}
              onValueChange={(value) =>
                handleSelectChange("parent2OtherIncome", value)
              }
            >
              <SelectTrigger id="parent2OtherIncome" className="mt-1 w-full">
                <SelectValue placeholder="No" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="rental">Rental Income</SelectItem>
                <SelectItem value="investment">Investment Income</SelectItem>
                <SelectItem value="pension">Pension</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="parent2MonthlyIncome">Monthly Income</Label>
            <Input
              id="parent2MonthlyIncome"
              value={formData.parent2MonthlyIncome}
              onChange={handleInputChange}
              placeholder="e.g., $3500"
              className="mt-1 w-full"
            />
          </div>
        </div>
      </div>

      {/* Member 1 Information */}
    </div>
  );
}

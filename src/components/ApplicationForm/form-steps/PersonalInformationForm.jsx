"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const countries = [
  { value: "za", label: "South Africa" },
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "br", label: "Brazil" },
  { value: "in", label: "India" },
  { value: "ng", label: "Nigeria" },
  { value: "ke", label: "Kenya" },
  { value: "gh", label: "Ghana" },
  { value: "eg", label: "Egypt" },
];

export default function PersonalInformationForm({
  formData = {},
  onFormChange,
  handleInputChange,
  handleSelectChange,
  handleBlur,
  errors = {},
  touched = {},
  validateField, // Validation function from parent component
}) {
  const [localFormData, setLocalFormData] = useState({
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
    ...formData,
  });

  const [localErrors, setLocalErrors] = useState({});
  const [localTouched, setLocalTouched] = useState({});

  // Sync local form data with parent form data
  useEffect(() => {
    setLocalFormData((prev) => ({
      ...prev,
      ...formData,
    }));
  }, [formData]);

  // Combine local and parent errors/touched states
  const combinedErrors = { ...localErrors, ...errors };
  const combinedTouched = { ...localTouched, ...touched };

  const handleLocalInputChange = (e) => {
    const { id, value } = e.target;
    const newFormData = { ...localFormData, [id]: value };
    setLocalFormData(newFormData);

    // Real-time validation for touched fields using parent's validation function
    if (combinedTouched[id] && validateField) {
      const fieldError = validateField(id, value, newFormData);
      setLocalErrors((prev) => ({
        ...prev,
        [id]: fieldError,
      }));
    }

    // Call parent's input change handler if provided
    if (handleInputChange) {
      handleInputChange(e);
    }

    // Call parent's form change handler if provided
    if (onFormChange) {
      onFormChange(newFormData);
    }
  };

  const handleLocalSelectChange = (fieldName, value) => {
    const newFormData = { ...localFormData, [fieldName]: value };
    setLocalFormData(newFormData);

    // Mark field as touched and validate using parent's validation function
    setLocalTouched((prev) => ({ ...prev, [fieldName]: true }));

    if (validateField) {
      const fieldError = validateField(fieldName, value, newFormData);
      setLocalErrors((prev) => ({
        ...prev,
        [fieldName]: fieldError,
      }));
    }

    // Call parent's select change handler if provided
    if (handleSelectChange) {
      handleSelectChange(fieldName, value);
    }

    // Call parent's form change handler if provided
    if (onFormChange) {
      onFormChange(newFormData);
    }
  };

  const handleLocalBlur = (fieldName) => {
    setLocalTouched((prev) => ({ ...prev, [fieldName]: true }));

    // Validate field on blur using parent's validation function
    if (validateField) {
      const fieldError = validateField(
        fieldName,
        localFormData[fieldName],
        localFormData
      );
      setLocalErrors((prev) => ({
        ...prev,
        [fieldName]: fieldError,
      }));
    }

    if (handleBlur) {
      handleBlur(fieldName);
    }
  };

  const getFieldStatus = (fieldName) => {
    if (!combinedTouched[fieldName]) return "default";
    if (combinedErrors[fieldName]) return "error";
    if (localFormData[fieldName] && !combinedErrors[fieldName])
      return "success";
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

  return (
    <>
      <h2 className="text-xl text-cyan-800 font-bold mb-2 text-center">
        Personal Information
      </h2>
      <p className="text-gray-500 text-sm mb-12 text-center">
        Please fill in your personal details accurately.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName" className="flex text-md">
            Full Name <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="fullName"
            value={localFormData.fullName}
            onChange={handleLocalInputChange}
            onBlur={() => handleLocalBlur("fullName")}
            placeholder="John Doe"
            className={getFieldClassName("fullName")}
            maxLength={100}
          />
          {combinedTouched.fullName && combinedErrors.fullName && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {combinedErrors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="flex text-md">
            Email Address <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={localFormData.email}
            onChange={handleLocalInputChange}
            onBlur={() => handleLocalBlur("email")}
            placeholder="john.doe@example.com"
            className={getFieldClassName("email")}
            maxLength={254}
          />
          {combinedTouched.email && combinedErrors.email && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {combinedErrors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="flex text-md">
            Phone Number <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={localFormData.phone}
            onChange={handleLocalInputChange}
            onBlur={() => handleLocalBlur("phone")}
            placeholder="078 123 4567"
            className={getFieldClassName("phone")}
            maxLength={10}
          />
          {combinedTouched.phone && combinedErrors.phone && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {combinedErrors.phone}
            </p>
          )}
        </div>
        {/* ID Number */}
        <div>
          <Label htmlFor="idnumber" className="flex text-md">
            ID Number <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="idnumber"
            value={localFormData.idnumber}
            onChange={handleLocalInputChange}
            onBlur={() => handleLocalBlur("idnumber")}
            placeholder="e.g., 1234567890123"
            className={getFieldClassName("idnumber")}
            maxLength={13}
          />
          {combinedTouched.idnumber && combinedErrors.idnumber && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {combinedErrors.idnumber}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <Label htmlFor="dob" className="flex text-md">
            Date of Birth <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="dob"
            type="date"
            value={localFormData.dob}
            onChange={handleLocalInputChange}
            onBlur={() => handleLocalBlur("dob")}
            className={getFieldClassName("dob")}
            max={new Date().toISOString().split("T")[0]}
            min={
              new Date(new Date().getFullYear() - 100, 0, 1)
                .toISOString()
                .split("T")[0]
            }
          />
          {combinedTouched.dob && combinedErrors.dob && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {combinedErrors.dob}
            </p>
          )}
        </div>

        {/* Gender and Nationality Row */}
        <div className="md:col-span-2 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <Label htmlFor="gender" className="flex text-md">
              Gender <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={localFormData.gender}
              onValueChange={(value) =>
                handleLocalSelectChange("gender", value)
              }
            >
              <SelectTrigger
                id="gender"
                className={`w-full ${getFieldClassName("gender")}`}
              >
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
                <SelectItem value="Prefer not to say">
                  Prefer not to say
                </SelectItem>
              </SelectContent>
            </Select>
            {combinedTouched.gender && combinedErrors.gender && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {combinedErrors.gender}
              </p>
            )}
          </div>

          <div className="w-full md:w-1/2">
            <Label htmlFor="nationality" className="flex text-md">
              Nationality <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="nationality"
              value={localFormData.nationality}
              onChange={handleLocalInputChange}
              onBlur={() => handleLocalBlur("nationality")}
              placeholder="e.g., South African"
              className={getFieldClassName("nationality")}
              maxLength={50}
            />
            {combinedTouched.nationality && combinedErrors.nationality && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {combinedErrors.nationality}
              </p>
            )}
          </div>
        </div>

        {/* Country */}
        <div className="md:col-span-1">
          <Label htmlFor="country" className="flex text-md">
            Country of Residence <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select
            value={localFormData.country}
            onValueChange={(value) => handleLocalSelectChange("country", value)}
          >
            <SelectTrigger
              id="country"
              className={`w-full ${getFieldClassName("country")}`}
            >
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {combinedTouched.country && combinedErrors.country && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {combinedErrors.country}
            </p>
          )}
        </div>

        {/* Address Line 1 */}
        <div className="md:col-span-2">
          <Label htmlFor="address1" className="flex text-md">
            Address Line 1 <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="address1"
            value={localFormData.address1}
            onChange={handleLocalInputChange}
            onBlur={() => handleLocalBlur("address1")}
            placeholder="Street address, P.O. Box, company name, c/o"
            className={getFieldClassName("address1")}
            maxLength={200}
          />
          {combinedTouched.address1 && combinedErrors.address1 && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {combinedErrors.address1}
            </p>
          )}
        </div>

        {/* Address Line 2 */}
        <div className="md:col-span-2">
          <Label htmlFor="address2">Address Line 2 (Optional)</Label>
          <Input
            id="address2"
            value={localFormData.address2}
            onChange={handleLocalInputChange}
            placeholder="Apartment, suite, unit, building, floor, etc."
            className="mt-1"
            maxLength={200}
          />
        </div>

        {/* City */}
        <div>
          <Label htmlFor="city" className="flex text-md">
            City <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="city"
            value={localFormData.city}
            onChange={handleLocalInputChange}
            onBlur={() => handleLocalBlur("city")}
            placeholder="e.g., Cape Town"
            className={getFieldClassName("city")}
            maxLength={100}
          />
          {combinedTouched.city && combinedErrors.city && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {combinedErrors.city}
            </p>
          )}
        </div>

        {/* State */}
        <div>
          <Label htmlFor="state" className="flex text-md">
            State / Province <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="state"
            value={localFormData.state}
            onChange={handleLocalInputChange}
            onBlur={() => handleLocalBlur("state")}
            placeholder="e.g., Western Cape"
            className={getFieldClassName("state")}
            maxLength={100}
          />
          {combinedTouched.state && combinedErrors.state && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {combinedErrors.state}
            </p>
          )}
        </div>

        {/* Postal Code */}
        <div>
          <Label htmlFor="postalCode" className="flex text-md">
            Postal Code <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="postalCode"
            type={"number"}
            s
            value={localFormData.postalCode}
            onChange={handleLocalInputChange}
            onBlur={() => handleLocalBlur("postalCode")}
            placeholder="e.g., 8001"
            className={getFieldClassName("postalCode")}
            minLength={4}
          />
          {combinedTouched.postalCode && combinedErrors.postalCode && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {combinedErrors.postalCode}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

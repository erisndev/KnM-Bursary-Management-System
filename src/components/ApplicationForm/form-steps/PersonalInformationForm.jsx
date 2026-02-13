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
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const countries = [
  { value: "South Africa", label: "South Africa" },
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Australia", label: "Australia" },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
  { value: "Japan", label: "Japan" },
  { value: "Brazil", label: "Brazil" },
  { value: "India", label: "India" },
  { value: "Nigeria", label: "Nigeria" },
  { value: "Kenya", label: "Kenya" },
  { value: "Ghana", label: "Ghana" },
  { value: "Egypt", label: "Egypt" },
];

export default function PersonalInformationForm({
  formData = {},
  onFormChange,
  handleInputChange,
  handleSelectChange,
  handleBlur,
  errors = {},
  touched = {},
  validateField,
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

  useEffect(() => {
    setLocalFormData((prev) => ({
      ...prev,
      ...formData,
    }));
  }, [formData]);

  const combinedErrors = { ...localErrors, ...errors };
  const combinedTouched = { ...localTouched, ...touched };

  const handleLocalInputChange = (e) => {
    const { id, value } = e.target;
    const newFormData = { ...localFormData, [id]: value };
    setLocalFormData(newFormData);

    if (combinedTouched[id] && validateField) {
      const fieldError = validateField(id, value, newFormData);
      setLocalErrors((prev) => ({
        ...prev,
        [id]: fieldError,
      }));
    }

    if (handleInputChange) handleInputChange(e);
    if (onFormChange) onFormChange(newFormData);
  };

  // Fixed select handler - validates with the NEW value, not the old one
  const handleLocalSelectChange = (fieldName, value) => {
    const newFormData = { ...localFormData, [fieldName]: value };
    setLocalFormData(newFormData);
    setLocalTouched((prev) => ({ ...prev, [fieldName]: true }));

    // Validate with the new value immediately
    if (validateField) {
      const fieldError = validateField(fieldName, value, newFormData);
      setLocalErrors((prev) => ({
        ...prev,
        [fieldName]: fieldError,
      }));
    }

    if (handleSelectChange) handleSelectChange(fieldName, value);
    if (onFormChange) onFormChange(newFormData);
  };

  const handleLocalBlur = (fieldName) => {
    setLocalTouched((prev) => ({ ...prev, [fieldName]: true }));

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

    if (handleBlur) handleBlur(fieldName);
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
      status === "error" && "border-red-300 focus-visible:ring-red-500",
      status === "success" && "border-emerald-300 focus-visible:ring-emerald-500"
    );
  };

  const FieldError = ({ field }) => {
    if (!combinedTouched[field] || !combinedErrors[field]) return null;
    return (
      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
        <AlertCircle className="w-3 h-3 flex-shrink-0" />
        {combinedErrors[field]}
      </p>
    );
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Personal Information
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Please fill in your personal details accurately.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name <span className="text-red-500">*</span>
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
          <FieldError field="fullName" />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address <span className="text-red-500">*</span>
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
          <FieldError field="email" />
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone Number <span className="text-red-500">*</span>
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
          <FieldError field="phone" />
        </div>

        {/* ID Number */}
        <div>
          <Label htmlFor="idnumber" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            ID Number <span className="text-red-500">*</span>
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
          <FieldError field="idnumber" />
        </div>

        {/* Date of Birth */}
        <div>
          <Label htmlFor="dob" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Date of Birth <span className="text-red-500">*</span>
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
          <FieldError field="dob" />
        </div>

        {/* Gender */}
        <div>
          <Label htmlFor="gender" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Gender <span className="text-red-500">*</span>
          </Label>
          <Select
            value={localFormData.gender || undefined}
            onValueChange={(value) =>
              handleLocalSelectChange("gender", value)
            }
          >
            <SelectTrigger
              id="gender"
              className={cn("w-full", getFieldClassName("gender"))}
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
          <FieldError field="gender" />
        </div>

        {/* Nationality */}
        <div>
          <Label htmlFor="nationality" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nationality <span className="text-red-500">*</span>
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
          <FieldError field="nationality" />
        </div>

        {/* Country */}
        <div>
          <Label htmlFor="country" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Country of Residence <span className="text-red-500">*</span>
          </Label>
          <Select
            value={localFormData.country || undefined}
            onValueChange={(value) =>
              handleLocalSelectChange("country", value)
            }
          >
            <SelectTrigger
              id="country"
              className={cn("w-full", getFieldClassName("country"))}
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
          <FieldError field="country" />
        </div>

        {/* Address Line 1 */}
        <div className="md:col-span-2">
          <Label htmlFor="address1" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Address Line 1 <span className="text-red-500">*</span>
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
          <FieldError field="address1" />
        </div>

        {/* Address Line 2 */}
        <div className="md:col-span-2">
          <Label htmlFor="address2" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Address Line 2 <span className="text-gray-400 text-xs">(Optional)</span>
          </Label>
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
          <Label htmlFor="city" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            City <span className="text-red-500">*</span>
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
          <FieldError field="city" />
        </div>

        {/* State */}
        <div>
          <Label htmlFor="state" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            State / Province <span className="text-red-500">*</span>
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
          <FieldError field="state" />
        </div>

        {/* Postal Code */}
        <div>
          <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Postal Code <span className="text-red-500">*</span>
          </Label>
          <Input
            id="postalCode"
            type="number"
            value={localFormData.postalCode}
            onChange={handleLocalInputChange}
            onBlur={() => handleLocalBlur("postalCode")}
            placeholder="e.g., 8001"
            className={getFieldClassName("postalCode")}
            minLength={4}
          />
          <FieldError field="postalCode" />
        </div>
      </div>
    </div>
  );
}

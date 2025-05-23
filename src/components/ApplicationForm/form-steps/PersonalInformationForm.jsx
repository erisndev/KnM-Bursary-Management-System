import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import FormField from "@/components/ui/form-field";

export default function PersonalInformationForm({
  formData,
  handleInputChange,
  handleBlur,
  errors,
  touched,
  focusRef,
}) {
  return (
    <>
      <h2 className="text-xl text-cyan-800 font-bold mb-2 text-center">
        Personal Information
      </h2>
      <p className="text-gray-500 text-sm mb-12 text-center">
        Please fill in your personal details accurately.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="fullName"
          label="Full Name"
          required
          value={formData.fullName}
          onChange={handleInputChange}
          onBlur={() => handleBlur("fullName")}
          placeholder="John Doe"
          error={touched.fullName && errors.fullName ? errors.fullName : null}
          ref={
            Object.keys(errors).length > 0 && errors.fullName ? focusRef : null
          }
        />
        <FormField
          id="email"
          label="Email Address"
          required
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={() => handleBlur("email")}
          placeholder="john.doe@example.com"
          error={touched.email && errors.email ? errors.email : null}
          ref={Object.keys(errors).length > 0 && errors.email ? focusRef : null}
        />
        <FormField
          id="phone"
          label="Phone Number"
          required
          value={formData.phone}
          onChange={handleInputChange}
          onBlur={() => handleBlur("phone")}
          placeholder="+1 123-456-7890"
          error={touched.phone && errors.phone ? errors.phone : null}
          ref={Object.keys(errors).length > 0 && errors.phone ? focusRef : null}
        />
        <FormField
          id="dob"
          label="Date of Birth"
          required
          value={formData.dob}
          onChange={handleInputChange}
          onBlur={() => handleBlur("dob")}
          placeholder="15/07/2010"
          error={touched.dob && errors.dob ? errors.dob : null}
          ref={Object.keys(errors).length > 0 && errors.dob ? focusRef : null}
        />

        <div className="md:col-span-2 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <Label htmlFor="gender" className="flex text-md">
              Gender <span className="text-red-500 ml-1 ">*</span>
            </Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => {
                handleInputChange({ target: { id: "gender", value } });
                handleBlur("gender");
              }}
            >
              <SelectTrigger
                id="gender"
                className={cn(
                  "mt-1 w-full",
                  touched.gender && errors.gender
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                )}
              >
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {touched.gender && errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
            )}
          </div>

          <div className="w-full md:w-1/2">
            <FormField
              id="nationality"
              label="Nationality"
              required
              value={formData.nationality}
              onChange={handleInputChange}
              onBlur={() => handleBlur("nationality")}
              placeholder="e.g., American"
              error={
                touched.nationality && errors.nationality
                  ? errors.nationality
                  : null
              }
              ref={
                Object.keys(errors).length > 0 && errors.nationality
                  ? focusRef
                  : null
              }
            />
          </div>
        </div>
        <div className="md:col-span-1">
          <Label htmlFor="country" className="flex text-md">
            Country of Residence <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select
            value={formData.country}
            onValueChange={(value) =>
              handleInputChange({ target: { id: "country", value } })
            }
          >
            <SelectTrigger
              id="country"
              className={cn(
                "mt-1 w-full",
                touched.country && errors.country
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              )}
            >
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
              {/* Add more countries as needed */}
            </SelectContent>
          </Select>
          {touched.country && errors.country && (
            <p className="text-red-500 text-xs mt-1">{errors.country}</p>
          )}
        </div>
        {/* Rest of the form */}
        <div className="md:col-span-2">
          <FormField
            id="address1"
            label="Address Line 1"
            required
            value={formData.address1}
            onChange={handleInputChange}
            onBlur={() => handleBlur("address1")}
            placeholder="Street address, P.O. Box, company name, c/o"
            error={touched.address1 && errors.address1 ? errors.address1 : null}
            ref={
              Object.keys(errors).length > 0 && errors.address1
                ? focusRef
                : null
            }
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="address2">Address Line 2 (Optional)</Label>
          <Input
            id="address2"
            value={formData.address2}
            onChange={handleInputChange}
            placeholder="Apartment, suite, unit, building, floor, etc."
            className="mt-1"
          />
        </div>
        <FormField
          id="city"
          label="City"
          required
          value={formData.city}
          onChange={handleInputChange}
          onBlur={() => handleBlur("city")}
          placeholder="e.g., New York"
          error={touched.city && errors.city ? errors.city : null}
          ref={Object.keys(errors).length > 0 && errors.city ? focusRef : null}
        />
        <FormField
          id="state"
          label="State / Province"
          required
          value={formData.state}
          onChange={handleInputChange}
          onBlur={() => handleBlur("state")}
          placeholder="e.g., California"
          error={touched.state && errors.state ? errors.state : null}
          ref={Object.keys(errors).length > 0 && errors.state ? focusRef : null}
        />
        <FormField
          id="postalCode"
          label="Postal Code"
          required
          value={formData.postalCode}
          onChange={handleInputChange}
          onBlur={() => handleBlur("postalCode")}
          placeholder="e.g., 10001"
          error={
            touched.postalCode && errors.postalCode ? errors.postalCode : null
          }
          ref={
            Object.keys(errors).length > 0 && errors.postalCode
              ? focusRef
              : null
          }
        />
      </div>
    </>
  );
}

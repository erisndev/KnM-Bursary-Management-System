import React, { forwardRef } from "react";

const FormField = forwardRef(
  (
    {
      id,
      label,
      required,
      value,
      onChange,
      onBlur,
      placeholder,
      error,
      type = "text",
      ...props
    },
    ref
  ) => {
    return (
      <div>
        <label htmlFor={id} className="flex">
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={
            "mt-1 border rounded px-2 w-full py-1 focus:outline-none focus:ring-2 " +
            (error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500")
          }
          ref={ref}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;

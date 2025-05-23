import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.email) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Email is invalid";
    }
    if (!form.password) {
      errs.password = "Password is required";
    }
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Login Form submitted:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl">
        <div className="border rounded-lg shadow-lg p-8 bg-white">
          <h2 className="text-3xl text-cyan-700 font-bold  text-center">
            Welcome Back!
          </h2>
          <p className="text-md text-cyan-700 font-semibold mb-8 text-center">
            Please login to your account.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1 "
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
              <div className="mb-1 mt-1 text-sm flex justify-end">
                <Link to="#" className="text-cyan-700 hover:text-cyan-500">
                  Forgot Password
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-700 text-white py-2 rounded hover:bg-cyan-600 transition cursor-pointer"
            >
              Login
            </button>
            <div className="text-center mt-4">
              Don't have an Account?{" "}
              <Link
                to="/register"
                className="text-cyan-700 hover:text-cyan-500"
              >
                Register Here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

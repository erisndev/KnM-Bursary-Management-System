import React, { useState } from "react";
import {
  Mail,
  Shield,
  Lock,
  Check,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import baseAPI from "../../../environment";
import { useNavigate } from "react-router-dom";

const ForgotPasswordFlow = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Email validation function
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Password strength validation
  const isStrongPassword = (password) => {
    return (
      password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
    );
  };

  // Step 1: Send Reset Code
  const handleSendCode = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful response
      setStep(2);
      setMessage(
        "We've sent a 6-digit verification code to your email address."
      );

      const res = await fetch(`${baseAPI}/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(2);
        setMessage(data.message);
      } else {
        if (data.message && data.message.toLowerCase().includes("not found")) {
          setError("Email not found in our database.");
        } else {
          setError(data.message || "Something went wrong");
        }
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify Code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (code.length !== 6) {
      setError("Please enter a 6-digit code.");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful response
      setStep(3);
      setMessage("Code verified successfully. Please enter your new password.");

      const res = await fetch(`${baseAPI}/users/verify-reset-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(3);
        setMessage(data.message);
      } else {
        setError(data.message || "Verification failed");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!isStrongPassword(newPassword)) {
      setError(
        "Password must be at least 8 characters with uppercase, lowercase, and numbers."
      );
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful response
      setMessage(
        "Password reset successful! You can now log in with your new password."
      );
      setTimeout(() => {
        setStep(1);
        setEmail("");
        setCode("");
        setNewPassword("");
        setMessage("");
        setError("");
      }, 3000);

      const res = await fetch(`${baseAPI}/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset successful! You may now log in.");
        setStep(1);
        setEmail("");
        setCode("");
        setNewPassword("");
        navigate("/login");
      } else {
        setError(data.message || "Password reset failed");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setError("");
      setMessage("");
    }
  };

  const getStepIcon = () => {
    switch (step) {
      case 1:
        return <Mail className="w-6 h-6" />;
      case 2:
        return <Shield className="w-6 h-6" />;
      case 3:
        return <Lock className="w-6 h-6" />;
      default:
        return <Mail className="w-6 h-6" />;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Reset Your Password";
      case 2:
        return "Enter Verification Code";
      case 3:
        return "Create New Password";
      default:
        return "Reset Your Password";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Enter your email address and we'll send you a verification code";
      case 2:
        return "Check your email and enter the 6-digit code we sent you";
      case 3:
        return "Choose a strong password for your account";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-600 rounded-full mb-4">
            {getStepIcon()}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {getStepTitle()}
          </h1>
          <p className="text-gray-600">{getStepDescription()}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {step} of 3
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((step / 3) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-cyan-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Back Button */}
          {step > 1 && !loading && (
            <button
              onClick={handleBackStep}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          )}

          {/* Messages */}
          {message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
              <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-green-800 text-sm">{message}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Step 1: Email Input */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendCode(e)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
                    disabled={loading}
                  />
                </div>
              </div>
              <button
                onClick={handleSendCode}
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending Code...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </button>
            </div>
          )}

          {/* Step 2: Code Verification */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Verification Code
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={code}
                    onChange={(e) =>
                      setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleVerifyCode(e)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none tracking-widest text-center text-lg font-mono"
                    disabled={loading}
                    maxLength={6}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Didn't receive the code? Check your spam folder or{" "}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-cyan-600 hover:text-cyan-700 font-medium"
                  >
                    try again
                  </button>
                </p>
              </div>
              <button
                onClick={handleVerifyCode}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </button>
            </div>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleResetPassword(e)
                    }
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                    disabled={loading}
                  />
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-xs">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        newPassword.length >= 8 ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                    <span
                      className={
                        newPassword.length >= 8
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        /(?=.*[a-z])(?=.*[A-Z])/.test(newPassword)
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <span
                      className={
                        /(?=.*[a-z])(?=.*[A-Z])/.test(newPassword)
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      Upper and lowercase letters
                    </span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        /(?=.*\d)/.test(newPassword)
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <span
                      className={
                        /(?=.*\d)/.test(newPassword)
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      At least one number
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleResetPassword}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Remember your password?{" "}
            <a
              href="/login"
              className="text-cyan-600 hover:text-cyan-700 font-medium"
            >
              Sign in instead
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordFlow;

import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ApplicationExists = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        {/* Main Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Application Already Submitted
        </h1>

        <p className="text-gray-600 mb-8">
          We have found an existing application for your account. You can only
          submit one application per account.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Back to MyDashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationExists;

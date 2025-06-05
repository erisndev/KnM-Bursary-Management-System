import React, { useEffect, useState } from "react";
import baseAPI from "../../environment";
import LearnerInformationForm from "@/components/ApplicationForm/LearnerInformationForm";
import ApplicationExists from "@/components/ApplicationForm/ApplicationExists";

const Apply = () => {
  const [userId, setUserId] = useState(null);
  const [hasApplication, setHasApplication] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      // Check if user already applied by calling your backend
      fetch(`${baseAPI}/applications/user/${storedUserId}`)
        .then((res) => {
          if (res.status === 404) {
            // No application found
            setHasApplication(false);
          } else if (res.ok) {
            setHasApplication(true);
          }
        })
        .catch((err) => {
          console.error("Failed to check application:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please login to submit your application.
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
            onClick={() => {
              // Navigate to login page
              console.log("Navigate to login");
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (hasApplication) {
    return <ApplicationExists userId={userId} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-4">
      <LearnerInformationForm userId={userId} />
    </div>
  );
};

export default Apply;

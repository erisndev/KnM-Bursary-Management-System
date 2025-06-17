import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import PersonalInfo from "./Profile/PersonalInfo";
import ContactInfo from "./Profile/ContactInfo";
import HighSchoolInfo from "./Profile/HighSchoolInfo";
import HigherEducation from "./Profile/HigherEducation";
import SupportingDocuments from "./Profile/SupportingDocuments";
import baseAPI from "../../../environment";
// import { useNavigate } from "react-router-dom"; // Remove this import

export default function ProfilePage({ userId, onNavigate }) {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate(); // Remove this line

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${baseAPI}/applications/user/${userId}`);
      if (!response.ok) {
        setStudentData(null);
      } else {
        const data = await response.json();
        setStudentData(data);
      }
    } catch {
      setStudentData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationUpdate = (updatedApplication) => {
    // Update the student data with new document information
    setStudentData((prev) => ({
      ...prev,
      documents: updatedApplication.documents,
      lastModified: updatedApplication.lastModified,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (onNavigate) {
      onNavigate("/apply");
    }
  };

  if (!studentData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-cyan-800 mb-4">
          No Profile Data Found
        </h2>
        <p className="text-gray-600 mb-6">
          Please complete your learner information form to view your profile.
        </p>
        <Button
          className="bg-cyan-800 hover:bg-cyan-700 cursor-pointer"
          onClick={handleSubmit}
        >
          Complete Your Application
        </Button>
      </div>
    );
  }

  // Check if user can update documents (not approved/rejected)
  const canUpdateDocuments =
    studentData.status !== "approved" && studentData.status !== "rejected";

  return (
    <div className="space-y-6 mb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cyan-900">Profile</h1>
        <div className="flex items-center gap-4">
          {studentData.status && (
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                studentData.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : studentData.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : studentData.status === "under_review"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Status: {studentData.status.replace("_", " ").toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Show notice if documents cannot be updated */}
      {!canUpdateDocuments && (
        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
          <p className="text-cyan-700 text-sm">
            <strong>Note:</strong> Your application has been{" "}
            {studentData.status}. Document updates are no longer available for
            this application.
          </p>
        </div>
      )}

      <PersonalInfo data={studentData} />
      <ContactInfo data={studentData} />
      <HighSchoolInfo data={studentData} />
      <HigherEducation data={studentData} />
      <SupportingDocuments
        documents={studentData.documents || {}}
        applicationId={studentData._id}
        onUpdate={handleApplicationUpdate}
        canUpdate={canUpdateDocuments}
      />
    </div>
  );
}

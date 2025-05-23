import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import PersonalInfo from "./Profile/PersonalInfo";
import ContactInfo from "./Profile/ContactInfo";
import HighSchoolInfo from "./Profile/HighSchoolInfo";
import HigherEducation from "./Profile/HigherEducation";
import SupportingDocuments from "./Profile/SupportingDocuments";

export default function ProfilePage() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const savedData = localStorage.getItem("learnerFormData");
  //     if (savedData) {
  //       setStudentData(JSON.parse(savedData));
  //     } else {
  //       setStudentData(null);
  //     }
  //     setLoading(false);
  //   }, []);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For now, we'll simulate loading the data from localStorage or use mock data
    const loadData = () => {
      try {
        // Try to get data from localStorage (if the form was submitted)
        const savedData = localStorage.getItem("learnerFormData");
        if (savedData) {
          setStudentData(JSON.parse(savedData));
        } else {
          // Use mock data if no saved data exists
          setStudentData({
            // Personal Information
            fullName: "Jane Doe",
            email: "jane.doe@example.com",
            phone: "+27 123456789",
            dob: "15/07/2005",
            gender: "female",
            nationality: "South African",
            country: "za",
            address1: "12 Test Street",
            address2: "",
            city: "Cape Town",
            state: "Western Cape",
            postalCode: "8001",
            // Education Information
            highSchoolName: "Cape Town High",
            highSchoolMatricYear: "2022",
            subjects: [
              { subject: "Mathematics", grade: "A" },
              { subject: "English", grade: "B+" },
              { subject: "Physics", grade: "A-" },
              { subject: "Biology", grade: "A" },
              { subject: "History", grade: "B" },
            ],
            institutionName: "University of Cape Town",
            institutionDegreeType: "bachelor",
            institutionDegreeName: "Bachelor of Science",
            institutionMajor: "Computer Science",
            institutionStartYear: "2023",
            institutionEndYear: "2026",
            institutionGPA: "3.8",
            // Documents
            documents: {
              transcript: { uploaded: true, file: { name: "transcript.pdf" } },
              nationalIdCard: { uploaded: true, file: { name: "id_card.pdf" } },
              proofOfResidence: {
                uploaded: true,
                file: { name: "proof_of_residence.pdf" },
              },
              resume: { uploaded: true, file: { name: "resume.pdf" } },
            },
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading student data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          No Profile Data Found
        </h2>
        <p className="text-gray-600 mb-6">
          Please complete your learner information form to view your profile.
        </p>
        <Button>Complete Your Profile</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
      </div>

      <PersonalInfo data={studentData} />
      <ContactInfo data={studentData} />
      <HighSchoolInfo data={studentData} />
      <HigherEducation data={studentData} />
      <SupportingDocuments documents={studentData.documents} />
    </div>
  );
}

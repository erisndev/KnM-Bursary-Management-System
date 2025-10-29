import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LearnerInformationForm from '@/components/ApplicationForm/LearnerInformationForm';
import ApplicationExists from '@/components/ApplicationForm/ApplicationExists';
import api, { APIError } from '@/services/api';
import { getUserId } from '@/services/auth';
import logger from '@/utils/logger';

const Apply = () => {
  const [userId, setUserId] = useState(null);
  const [hasApplication, setHasApplication] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = getUserId();
    if (storedUserId) {
      setUserId(storedUserId);
      
      // Check if user already applied
      api.applications
        .getByUserId(storedUserId)
        .then(() => {
          setHasApplication(true);
        })
        .catch((error) => {
          if (error instanceof APIError && error.status === 404) {
            setHasApplication(false);
          } else {
            logger.error('Failed to check application:', error);
          }
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 mx-auto"></div>
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
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-lg"
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

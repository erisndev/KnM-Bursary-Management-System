import { useEffect, useState } from "react";
import LearnerInformationForm from "@/components/ApplicationForm/LearnerInformationForm";
import ApplicationExists from "@/components/ApplicationForm/ApplicationExists";
import api, { APIError } from "@/services/api";
import { getUserId } from "@/services/auth";
import logger from "@/utils/logger";

const ApplicationFormPage = ({ userId: propUserId, onViewApplication }) => {
  const [userId, setUserId] = useState(propUserId || null);
  const [hasApplication, setHasApplication] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserId = propUserId || getUserId();
    if (storedUserId) {
      setUserId(storedUserId);

      api.applications
        .getByUserId(storedUserId)
        .then(() => {
          setHasApplication(true);
        })
        .catch((error) => {
          if (error instanceof APIError && error.status === 404) {
            setHasApplication(false);
          } else {
            logger.error("Failed to check application:", error);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [propUserId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center max-w-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Authentication Required
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please log in to submit your application.
          </p>
        </div>
      </div>
    );
  }

  if (hasApplication) {
    return <ApplicationExists onViewApplication={onViewApplication} />;
  }

  return <LearnerInformationForm userId={userId} />;
};

export default ApplicationFormPage;

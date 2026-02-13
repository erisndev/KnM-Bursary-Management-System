import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ApplicationExists = ({ onViewApplication }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onViewApplication) {
      onViewApplication();
    } else {
      navigate("/dashboard?tab=applications");
    }
  };

  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Application Already Submitted
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          You have already submitted a bursary application. Only one application per account is allowed.
        </p>
        <button
          className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-colors text-sm shadow-md shadow-violet-500/20"
          onClick={handleClick}
        >
          View My Application
        </button>
      </div>
    </div>
  );
};

export default ApplicationExists;

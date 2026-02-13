import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const SuccessMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Application Submitted!
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
        Thank you for applying. We will review your application and get back to you soon.
      </p>
      <button
        className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default SuccessMessage;

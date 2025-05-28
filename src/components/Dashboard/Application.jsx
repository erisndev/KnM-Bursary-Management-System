import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  FileText,
  DollarSign,
  GraduationCap,
  Users,
  AlertCircle,
  PlusCircle,
  ArrowRight,
} from "lucide-react";

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if user has submitted an application
 * @returns {boolean} True if application exists, false otherwise
 */
const checkApplicationExists = () => {
  try {
    // 🔧 CUSTOMIZE: Replace with your actual application check logic

    // Option 1: Check localStorage for application data
    const applicationData = localStorage.getItem(
      "bursary_application_submitted"
    );
    if (applicationData) {
      return JSON.parse(applicationData);
    }

    // Option 2: Check for completed form data
    // const formData = localStorage.getItem('bursary_form_data');
    // return formData && JSON.parse(formData).isSubmitted;

    // Option 3: Check API/Database (you would replace this with actual API call)
    // const userId = localStorage.getItem('userId');
    // if (userId) {
    //   // This would be an actual API call in real implementation
    //   return checkApplicationFromAPI(userId);
    // }

    return false; // Default: no application found
  } catch (error) {
    console.error("Error checking application status:", error);
    return false;
  }
};

/**
 * Get step styling based on status
 * @param {string} status - Step status (completed, current, pending)
 * @returns {Object} Styling classes for the step
 */
const getStepStatus = (status) => {
  switch (status) {
    case "completed":
      return {
        bgColor: "bg-green-100",
        iconColor: "text-green-600",
        borderColor: "border-green-200",
        textColor: "text-green-800",
      };
    case "current":
      return {
        bgColor: "bg-cyan-100",
        iconColor: "text-cyan-600",
        borderColor: "border-cyan-200",
        textColor: "text-cyan-800",
      };
    case "pending":
      return {
        bgColor: "bg-gray-100",
        iconColor: "text-gray-400",
        borderColor: "border-gray-200",
        textColor: "text-gray-600",
      };
    default:
      return {
        bgColor: "bg-gray-100",
        iconColor: "text-gray-400",
        borderColor: "border-gray-200",
        textColor: "text-gray-600",
      };
  }
};

// ============================================================================
// APPLICATION PROGRESS DATA
// ============================================================================

/** Application progress steps configuration */
const applicationSteps = [
  {
    id: 1,
    title: "Application Submitted",
    description:
      "Your bursary application has been successfully received and is in our system",
    status: "completed",
    icon: FileText,
    details: "Application form completed with all required information",
  },
  {
    id: 2,
    title: "Document Verification",
    description:
      "We are verifying all submitted documents and checking eligibility requirements",
    status: "completed",
    icon: CheckCircle,
    details:
      "Academic transcripts, financial documents, and ID verification completed",
  },
  {
    id: 3,
    title: "Academic Review",
    description:
      "Academic performance and course enrollment are being assessed by our team",
    status: "completed",
    icon: GraduationCap,
    details: "GPA verification and academic standing confirmed",
  },
  {
    id: 4,
    title: "Financial Assessment",
    description:
      "Evaluating financial need based on submitted income and expense documentation",
    status: "completed",
    icon: DollarSign,
    details:
      "Financial aid office is reviewing your family's financial situation",
  },
  {
    id: 5,
    title: "Committee Review",
    description:
      "Bursary selection committee will review your complete application",
    status: "current",
    icon: Users,
    details: "Committee meets weekly to review applications",
  },
  {
    id: 6,
    title: "Decision Notification",
    description:
      "Final decision will be communicated via email and student portal",
    status: "pending",
    icon: AlertCircle,
    details: "You will receive notification within 24 hours of decision",
  },
  {
    id: 7,
    title: "Fund Disbursement",
    description:
      "Approved bursary funds will be transferred to your student account",
    status: "pending",
    icon: DollarSign,
    details:
      "Funds typically disbursed within 5-7 business days after approval",
  },
];

// ============================================================================
// NO APPLICATION COMPONENT
// ============================================================================

/**
 * Component shown when user hasn't applied yet
 * @param {Function} onApplyClick - Callback when apply button is clicked
 */
const NoApplicationMessage = ({ onApplyClick }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 sm:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-900 mb-4">
            Bursary Application Portal
          </h1>
          <p className="text-base sm:text-lg text-cyan-600 max-w-2xl mx-auto">
            Start your journey towards educational financial support
          </p>
        </div>

        {/* Main Application Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-6 sm:px-8 py-8 sm:py-12 text-white">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
                Ready to Apply for a Bursary?
              </h2>
              <p className="text-cyan-100 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                You haven't submitted a bursary application yet. Take the first
                step towards securing financial support for your education by
                starting your application today.
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-6 sm:px-8 py-8 sm:py-10">
            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg">
                <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  Financial Support
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Get the financial assistance you need to focus on your studies
                </p>
              </div>

              <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg">
                <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  Simple Process
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Easy-to-follow application process with step-by-step guidance
                </p>
              </div>

              <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg sm:col-span-2 lg:col-span-1">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  Track Progress
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Monitor your application status through every step of the
                  review
                </p>
              </div>
            </div>

            {/* Requirements Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-8 sm:mb-10">
              <h3 className="font-semibold text-blue-900 mb-3 sm:mb-4 text-sm sm:text-base">
                📋 What You'll Need to Apply:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-blue-800">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                  Academic transcripts
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                  Proof of residence
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                  National ID document
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                  Financial information
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <button
                onClick={onApplyClick}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
              >
                <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                Start Your Application
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3" />
              </button>

              <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
                Application takes approximately 15-20 minutes to complete
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-xs sm:text-sm text-gray-600">
            Need help? Contact our support team at{" "}
            <a
              href="mailto:support@bursary.edu"
              className="text-cyan-600 hover:text-cyan-700 underline"
            >
              support@bursary.edu
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// APPLICATION PROGRESS COMPONENT
// ============================================================================

/**
 * Component showing application progress when user has applied
 */
const ApplicationProgress = () => {
  const completedSteps = applicationSteps.filter(
    (step) => step.status === "completed"
  ).length;
  const progressPercentage = (completedSteps / applicationSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100 py-2 sm:py-4 lg:py-6">
      <div className="max-w-4xl mx-auto px-1 sm:px-2 lg:px-2">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-cyan-900 mb-2 px-2">
            Bursary Application Progress
          </h1>
          <p className="text-sm sm:text-base text-cyan-600 px-2">
            Track your application through each step of the review process
          </p>
        </div>

        {/* Progress Overview Card */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                  Overall Progress
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  {completedSteps} of {applicationSteps.length} steps completed
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xl sm:text-2xl font-bold text-cyan-600">
                  {Math.round(progressPercentage)}%
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Complete</div>
              </div>
            </div>
          </div>
          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
              <div
                className="bg-cyan-600 h-2 sm:h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Started</span>
              <span className="hidden sm:inline">In Progress</span>
              <span className="sm:hidden">Progress</span>
              <span>Completed</span>
            </div>
          </div>
        </div>

        {/* Application Steps Card */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-4 sm:p-6 pb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
              Application Steps
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Detailed progress through each stage of your bursary application
            </p>
          </div>
          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="space-y-4 sm:space-y-6">
              {applicationSteps.map((step, index) => {
                const Icon = step.icon;
                const { bgColor, iconColor, borderColor, textColor } =
                  getStepStatus(step.status);
                const isLast = index === applicationSteps.length - 1;

                return (
                  <div key={step.id} className="relative">
                    {/* Step Content */}
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      {/* Step Icon */}
                      <div className="flex-shrink-0 relative">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${bgColor} border-2 ${borderColor} flex items-center justify-center`}
                        >
                          <Icon
                            className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor}`}
                          />
                        </div>
                        {/* Step Number */}
                        <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-600">
                            {step.id}
                          </span>
                        </div>
                      </div>

                      {/* Step Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-2">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-2">
                            {step.title}
                          </h3>
                          <div
                            className={`px-2 py-1 rounded-md border text-xs sm:text-sm self-start ${borderColor} ${textColor}`}
                          >
                            {step.status === "completed"
                              ? "Completed"
                              : step.status === "current"
                              ? "In Progress"
                              : "Pending"}
                          </div>
                        </div>

                        <p className="text-sm sm:text-base text-gray-600 mb-3 leading-relaxed">
                          {step.description}
                        </p>

                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                            {step.details}
                          </p>
                        </div>

                        {step.status === "current" && (
                          <div className="flex items-center text-cyan-600">
                            <div className="w-2 h-2 bg-cyan-600 rounded-full animate-pulse mr-2 flex-shrink-0"></div>
                            <span className="text-xs sm:text-sm font-medium">
                              Currently Active
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Connecting Line */}
                    {!isLast && (
                      <div className="absolute left-5 sm:left-6 top-10 sm:top-12 w-0.5 h-6 sm:h-8 bg-gray-200 transform -translate-x-0.5"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile-friendly spacing at bottom */}
        <div className="h-4 sm:h-6 lg:h-8"></div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ApplicationsPage() {
  // ========================================
  // STATE MANAGEMENT
  // ========================================

  /** Track if user has submitted an application */
  const [hasApplication, setHasApplication] = useState(false);

  /** Loading state for checking application status */
  const [isLoading, setIsLoading] = useState(true);

  /** Navigation hook for routing */
  const navigate = useNavigate();

  // ========================================
  // EFFECTS
  // ========================================

  /** Check application status on component mount */
  useEffect(() => {
    const checkStatus = async () => {
      try {
        setIsLoading(true);

        // Check if user has an application
        const applicationExists = checkApplicationExists();

        // Simulate API delay (remove in production)
        await new Promise((resolve) => setTimeout(resolve, 500));

        setHasApplication(applicationExists);
      } catch (error) {
        console.error("Error checking application status:", error);
        setHasApplication(false); // Default to no application on error
      } finally {
        setIsLoading(false);
      }
    };

    checkStatus();
  }, []);

  // ========================================
  // EVENT HANDLERS
  // ========================================

  /**
   * Handle apply button click - navigate to application form
   */
  const handleApplyClick = () => {
    // 🔧 CUSTOMIZE: Update the route to match your application form page
    navigate("/apply"); // or '/application-form' or whatever your route is
  };

  // ========================================
  // RENDER
  // ========================================

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking application status...</p>
        </div>
      </div>
    );
  }

  // Show appropriate component based on application status
  return hasApplication ? (
    <ApplicationProgress />
  ) : (
    <NoApplicationMessage onApplyClick={handleApplyClick} />
  );
}

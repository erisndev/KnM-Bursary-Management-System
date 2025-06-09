import { useState, useEffect } from "react";
import {
  CheckCircle,
  FileText,
  DollarSign,
  GraduationCap,
  Users,
  AlertCircle,
  PlusCircle,
  ArrowRight,
  Clock,
  Info,
  Calendar,
  MessageSquare,
  ChevronUp,
  ChevronDown,
  User,
  Mail,
  Phone,
} from "lucide-react";
import baseAPI from "../../../environment";

const getStepStatus = (stepNumber, currentStep) => {
  if (stepNumber < currentStep) {
    return {
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      status: "completed",
    };
  } else if (stepNumber === currentStep) {
    return {
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      borderColor: "border-cyan-200",
      textColor: "text-cyan-800",
      status: "current",
    };
  } else {
    return {
      bgColor: "bg-gray-100",
      iconColor: "text-gray-400",
      borderColor: "border-gray-200",
      textColor: "text-gray-600",
      status: "pending",
    };
  }
};

const getStatusColor = (status) => {
  const normalizedStatus = (status || "").toLowerCase().replace(/\s+/g, "_");
  switch (normalizedStatus) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    case "under_review":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "waitlisted":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "pending":
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "pending":
      return "Pending Review";
    case "under_review":
      return "Under Review";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    case "waitlisted":
      return "Waitlisted";
    default:
      return "Unknown";
  }
};

const applicationSteps = [
  {
    id: 1,
    title: "Application Submitted",
    description:
      "Your bursary application has been successfully received and is in our system",
    icon: FileText,
    details: "Application form completed with all required information",
  },
  {
    id: 2,
    title: "Document Verification",
    description:
      "We are verifying all submitted documents and checking eligibility requirements",
    icon: CheckCircle,
    details:
      "Academic transcripts, financial documents, and ID verification completed",
  },
  {
    id: 3,
    title: "Academic Review",
    description:
      "Academic performance and course enrollment are being assessed by our team",
    icon: GraduationCap,
    details: "GPA verification and academic standing confirmed",
  },
  {
    id: 4,
    title: "Financial Assessment",
    description:
      "Evaluating financial need based on submitted income and expense documentation",
    icon: DollarSign,
    details:
      "Financial aid office is reviewing your family's financial situation",
  },
  {
    id: 5,
    title: "Committee Review",
    description:
      "Bursary selection committee will review your complete application",
    icon: Users,
    details: "Committee meets weekly to review applications",
  },
  {
    id: 6,
    title: "Decision Notification",
    description:
      "Final decision will be communicated via email and student portal",
    icon: AlertCircle,
    details: "You will receive notification within 24 hours of decision",
  },
  {
    id: 7,
    title: "Fund Disbursement",
    description:
      "Approved bursary funds will be transferred to your student account",
    icon: DollarSign,
    details:
      "Funds typically disbursed within 5-7 business days after approval",
  },
];

const NoApplicationMessage = ({ onApplyClick }) => {
  // Custom ZAR (Rand) Icon
  const ZARIcon = (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      {...props}
    >
      <text
        x="4"
        y="18"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="bold"
        fontSize="16"
        fill="currentColor"
      >
        R
      </text>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 sm:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-900 mb-4">
            Bursary Application Portal
          </h1>
          <p className="text-base sm:text-lg text-cyan-600 max-w-2xl mx-auto">
            Start your journey towards educational financial support
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-6 sm:px-8 py-8 sm:py-12 text-white">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-600" />
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
          <div className="px-6 sm:px-8 py-8 sm:py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg">
                <ZARIcon className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  Financial Support
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Get the financial assistance you need to focus on your studies
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg">
                <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-600 mx-auto mb-3 sm:mb-4" />
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
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 sm:p-6 mb-8 sm:mb-10">
              <h3 className="font-semibold text-cyan-900 mb-3 sm:mb-4 text-sm sm:text-base">
                📋 What You'll Need to Apply:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-cyan-800">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                  Academic transcripts
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                  Proof of residence
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                  National ID document
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                  Financial information
                </div>
              </div>
            </div>
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
      </div>
    </div>
  );
};

const ApplicationStatusCard = ({ application }) => {
  const [adminNotes, setAdminNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [showAllNotes, setShowAllNotes] = useState(false);
  const statusColor = getStatusColor(application.status);
  const statusText = getStatusText(application.status);

  useEffect(() => {
    const fetchAdminNotes = async () => {
      if (!application._id) return;

      setLoadingNotes(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${baseAPI}/applications/${application._id}/notes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched admin notes:", data);
          setAdminNotes(data.adminNotes || []);
          console.log("Admin notes set:", data.adminNotes);
        }
      } catch (error) {
        console.error("Failed to fetch admin notes:", error);
      } finally {
        setLoadingNotes(false);
      }
    };

    fetchAdminNotes();
  }, [application._id]);

  const visibleNotes = Array.isArray(adminNotes) ? adminNotes : [];

  const displayedNotes = showAllNotes
    ? [...visibleNotes].reverse()
    : [...visibleNotes].reverse().slice(0, 2);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6 sm:mb-8">
      <div className="p-2 sm:p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg text-white p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 break-words">
                    {application.fullName}
                  </h2>
                  <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-6 text-cyan-100 text-xs sm:text-sm">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="break-all">{application.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      <span className="break-all">{application.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        Applied:{" "}
                        {new Date(application.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right mt-3 sm:mt-0">
                  <p className="text-cyan-100 text-xs sm:text-sm">
                    Application ID
                  </p>
                  <p className="font-mono text-base sm:text-lg break-all">
                    {application._id?.slice(-8).toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Application Status
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Current status of your bursary application
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-xs sm:text-sm font-medium text-gray-900">
                    Current Status
                  </span>
                </div>
                <div
                  className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${statusColor}`}
                >
                  {statusText}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <FileText className="w-4 h-4 text-gray-600" />
                  <span className="text-xs sm:text-sm font-medium text-gray-900">
                    Current Step
                  </span>
                </div>
                <div className="text-base sm:text-lg font-semibold text-cyan-600">
                  Step {application.currentStep} of 7
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {applicationSteps.find(
                    (step) => step.id === application.currentStep
                  )?.title || "Unknown Step"}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-xs sm:text-sm font-medium text-gray-900">
                    Submitted
                  </span>
                </div>
                <div className="text-sm sm:text-md font-semibold text-cyan-700">
                  {new Date(application.createdAt).toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {new Date(application.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {application.statusHistory && application.statusHistory.length > 0 && (
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
            <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-2 sm:mb-3">
              Recent Updates
            </h4>
            <div className="space-y-1 sm:space-y-2">
              {[
                application.statusHistory[application.statusHistory.length - 1],
              ].map((update, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm"
                >
                  <div className="w-2 h-2 bg-cyan-600 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-600">
                    {new Date(update.timestamp).toLocaleDateString()} -{" "}
                    {getStatusText(update.status)}
                  </span>
                  {update.notes && (
                    <span className="text-gray-500">({update.notes})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admin Notes Section */}
        {visibleNotes.length > 0 && (
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
            <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4">
              <MessageSquare className="w-4 h-4 text-cyan-600" />
              <h4 className="text-xs sm:text-sm font-medium text-gray-900">
                Messages from Review Committee
              </h4>
              {loadingNotes && (
                <div className="w-4 h-4 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>

            <div className="space-y-2 sm:space-y-3">
              {displayedNotes.map((note, index) => (
                <div
                  key={note._id || index}
                  className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 sm:p-4"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-1 sm:mb-2">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span className="text-xs sm:text-sm font-semibold text-cyan-900">
                            Review Committee
                          </span>
                        </div>
                        <span className="text-xs text-cyan-700">
                          {new Date(note.createdAt).toLocaleDateString()} at{" "}
                          {new Date(note.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-cyan-800 leading-relaxed">
                        {note.note}
                      </p>
                      {note.category && (
                        <div className="mt-1 sm:mt-2">
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-cyan-100 text-cyan-800 rounded-md">
                            {note.category.charAt(0).toUpperCase() +
                              note.category.slice(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More/Less Button */}
            {visibleNotes.length > 2 && (
              <div className="mt-2 sm:mt-3 text-center">
                <button
                  onClick={() => setShowAllNotes(!showAllNotes)}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm text-cyan-600 hover:text-cyan-800 font-medium transition-colors"
                >
                  {showAllNotes ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Show {visibleNotes.length - 2} More Message
                      {visibleNotes.length - 2 !== 1 ? "s" : ""}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Loading state for notes */}
        {loadingNotes && visibleNotes.length === 0 && (
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
            <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
              <MessageSquare className="w-4 h-4 text-cyan-600" />
              <h4 className="text-xs sm:text-sm font-medium text-gray-900">
                Messages from Review Committee
              </h4>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center">
              <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs sm:text-sm text-gray-600">
                Loading messages...
              </p>
            </div>
          </div>
        )}

        {/* Empty state for notes */}
        {!loadingNotes && visibleNotes.length === 0 && (
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
            <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
              <MessageSquare className="w-4 h-4 text-gray-400" />
              <h4 className="text-xs sm:text-sm font-medium text-gray-500">
                Messages from Review Committee
              </h4>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center">
              <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-gray-600">
                No messages available at this time
              </p>
              <p className="text-xs text-gray-500 mt-1">
                The review committee will post updates here if needed
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ApplicationProgress = ({ application }) => {
  const completedSteps = application.currentStep - 1;
  const progressPercentage = (completedSteps / applicationSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100 py-2 sm:py-4 lg:py-6">
      <div className="max-w-4xl mx-auto px-1 sm:px-2 lg:px-2">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-cyan-900 mb-2 px-2">
            Bursary Application Progress
          </h1>
          <p className="text-sm sm:text-base text-cyan-600 px-2">
            Track your application through each step of the review process
          </p>
        </div>

        {/* Status Card */}
        <ApplicationStatusCard application={application} />

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
                const { bgColor, iconColor, borderColor, textColor, status } =
                  getStepStatus(step.id, application.currentStep);
                const isLast = index === applicationSteps.length - 1;
                return (
                  <div key={step.id} className="relative">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0 relative">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${bgColor} border-2 ${borderColor} flex items-center justify-center`}
                        >
                          <Icon
                            className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor}`}
                          />
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-600">
                            {step.id}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-2">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-2">
                            {step.title}
                          </h3>
                          <div
                            className={`px-2 py-1 rounded-md border text-xs sm:text-sm self-start ${borderColor} ${textColor}`}
                          >
                            {status === "completed"
                              ? "Completed"
                              : status === "current"
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
                        {status === "current" && (
                          <div className="flex items-center text-cyan-600">
                            <div className="w-2 h-2 bg-cyan-600 rounded-full animate-pulse mr-2 flex-shrink-0"></div>
                            <span className="text-xs sm:text-sm font-medium">
                              Currently Active
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    {!isLast && (
                      <div className="absolute left-5 sm:left-6 top-10 sm:top-12 w-0.5 h-6 sm:h-8 bg-gray-200 transform -translate-x-0.5"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="h-4 sm:h-6 lg:h-8"></div>
      </div>
    </div>
  );
};

export default function ApplicationsPage() {
  const [hasApplication, setHasApplication] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [applicationData, setApplicationData] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      // Check if user already applied by calling your backend
      fetch(`${baseAPI}/applications/user/${storedUserId}`)
        .then((res) => {
          if (res.status === 404) {
            // No application found
            setHasApplication(false);
            setApplicationData(null);
          } else if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          if (data) {
            setHasApplication(true);
            setApplicationData(data);
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

  const handleApplyClick = () => {
    // Replace with your navigation logic
    window.location.href = "/apply";
  };

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

  return hasApplication && applicationData ? (
    <ApplicationProgress application={applicationData} />
  ) : (
    <NoApplicationMessage onApplyClick={handleApplyClick} />
  );
}

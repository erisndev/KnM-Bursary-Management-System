import { useState, useEffect } from "react";
import {
  CheckCircle2,
  FileText,
  GraduationCap,
  Users,
  AlertCircle,
  PlusCircle,
  ArrowRight,
  Clock,
  Calendar,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  User,
  Mail,
  Phone,
  TrendingUp,
  Award,
} from "lucide-react";
import api, { APIError } from "@/services/api";
import { getUserId } from "@/services/auth";
import logger from "@/utils/logger";
import InfoCard from "./InfoCard";
import StatsCard from "./StatsCard";

const RandIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <text
      x="6"
      y="18"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fontSize="16"
      fill="currentColor"
    >
      R
    </text>
  </svg>
);

const applicationSteps = [
  {
    id: 1,
    title: "Application Submitted",
    description: "Your bursary application has been successfully received",
    icon: FileText,
  },
  {
    id: 2,
    title: "Document Verification",
    description: "Verifying all submitted documents and eligibility",
    icon: CheckCircle2,
  },
  {
    id: 3,
    title: "Academic Review",
    description: "Academic performance assessment in progress",
    icon: GraduationCap,
  },
  {
    id: 4,
    title: "Financial Assessment",
    description: "Evaluating financial need and documentation",
    icon: RandIcon,
  },
  {
    id: 5,
    title: "Committee Review",
    description: "Selection committee reviewing your application",
    icon: Users,
  },
  {
    id: 6,
    title: "Decision Notification",
    description: "Final decision communicated via email",
    icon: AlertCircle,
  },
  {
    id: 7,
    title: "Fund Disbursement",
    description: "Approved funds transferred to student account",
    icon: RandIcon,
  },
];

const getStatusColor = (status) => {
  const s = (status || "").toLowerCase().replace(/\s+/g, "_");
  switch (s) {
    case "approved":
      return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
    case "rejected":
      return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800";
    case "under_review":
      return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800";
    case "waitlisted":
      return "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800";
    default:
      return "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700";
  }
};

const getStatusText = (s) => {
  switch (s) {
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

const NoApplicationMessage = ({ onApplyClick }) => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center max-w-2xl px-4">
      <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/40 dark:to-indigo-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
        <GraduationCap className="w-12 h-12 text-violet-600 dark:text-violet-400" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Ready to Apply?
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
        You haven't submitted a bursary application yet. Start your journey
        towards educational financial support today.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            icon: RandIcon,
            title: "Financial Support",
            desc: "Get the assistance you need to focus on your studies",
            gradient: "from-violet-500 to-indigo-600",
          },
          {
            icon: FileText,
            title: "Simple Process",
            desc: "Easy application with step-by-step guidance",
            gradient: "from-fuchsia-500 to-pink-600",
          },
          {
            icon: CheckCircle2,
            title: "Track Progress",
            desc: "Monitor your application status in real-time",
            gradient: "from-emerald-500 to-teal-600",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div
              className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
            >
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={onApplyClick}
        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-2xl shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 transition-all hover:-translate-y-0.5"
      >
        <PlusCircle className="w-5 h-5 mr-3" />
        Start Your Application
        <ArrowRight className="w-5 h-5 ml-3" />
      </button>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        Takes approximately 15-20 minutes to complete
      </p>
    </div>
  </div>
);

const ApplicationProgress = ({ application }) => {
  const [adminNotes, setAdminNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [showAllNotes, setShowAllNotes] = useState(false);

  useEffect(() => {
    if (!application._id) return;
    setLoadingNotes(true);
    api.applications
      .getNotes(application._id)
      .then((data) => setAdminNotes(data.adminNotes || []))
      .catch((e) => logger.error("Failed to fetch admin notes:", e))
      .finally(() => setLoadingNotes(false));
  }, [application._id]);

  const visibleNotes = Array.isArray(adminNotes) ? adminNotes : [];
  const displayedNotes = showAllNotes
    ? [...visibleNotes].reverse()
    : [...visibleNotes].reverse().slice(0, 2);
  const completedSteps = application.currentStep - 1;
  const progressPercentage = (completedSteps / applicationSteps.length) * 100;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-violet-600 via-indigo-700 to-blue-700 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16" />
        <div className="relative flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0 border border-white/20">
              <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 break-words">
                {application.fullName}
              </h1>
              <div className="flex flex-col space-y-1.5 text-violet-100">
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm break-all">
                    {application.email}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">
                    {application.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-violet-100">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">
                Applied: {new Date(application.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl border-2 font-bold text-xs sm:text-sm whitespace-nowrap ${getStatusColor(application.status)}`}
            >
              {getStatusText(application.status)}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatsCard
          title="Application Status"
          value={getStatusText(application.status)}
          icon={FileText}
          color="violet"
        />
        <StatsCard
          title="Current Step"
          value={`${application.currentStep}/7`}
          icon={TrendingUp}
          color="cyan"
        />
        <StatsCard
          title="Progress"
          value={`${Math.round(progressPercentage)}%`}
          icon={CheckCircle2}
          color="emerald"
        />
        <StatsCard
          title="Submitted"
          value={new Date(application.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
          icon={Calendar}
          color="amber"
        />
      </div>

      {/* Progress Bar */}
      <InfoCard title="Overall Progress" icon={Clock}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {completedSteps} of {applicationSteps.length} steps completed
            </span>
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-violet-600 to-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </InfoCard>

      {/* Steps */}
      <InfoCard title="Application Steps" icon={FileText}>
        <div className="space-y-6">
          {applicationSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = step.id < application.currentStep;
            const isCurrent = step.id === application.currentStep;
            return (
              <div key={step.id} className="relative">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 relative">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isCompleted ? "bg-emerald-100 dark:bg-emerald-900/30" : isCurrent ? "bg-violet-100 dark:bg-violet-900/30" : "bg-gray-100 dark:bg-slate-800"}`}
                    >
                      <Icon
                        className={`w-6 h-6 ${isCompleted ? "text-emerald-600 dark:text-emerald-400" : isCurrent ? "text-violet-600 dark:text-violet-400" : "text-gray-400 dark:text-gray-500"}`}
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                        {step.id}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-medium ${isCompleted ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300" : isCurrent ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300" : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400"}`}
                      >
                        {isCompleted
                          ? "Completed"
                          : isCurrent
                            ? "In Progress"
                            : "Pending"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                    {isCurrent && (
                      <div className="flex items-center text-violet-600 dark:text-violet-400 mt-2">
                        <div className="w-2 h-2 bg-violet-600 dark:bg-violet-400 rounded-full animate-pulse mr-2" />
                        <span className="text-sm font-medium">
                          Currently Active
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {index < applicationSteps.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200 dark:bg-slate-700" />
                )}
              </div>
            );
          })}
        </div>
      </InfoCard>

      {/* Admin Notes */}
      {visibleNotes.length > 0 && (
        <InfoCard title="Messages from Review Committee" icon={MessageSquare}>
          <div className="space-y-4">
            {displayedNotes.map((note, index) => (
              <div
                key={note._id || index}
                className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-2xl p-4"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-violet-900 dark:text-violet-200">
                        Review Committee
                      </span>
                      <span className="text-xs text-violet-700 dark:text-violet-400">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-violet-800 dark:text-violet-300 leading-relaxed">
                      {note.note}
                    </p>
                    {note.category && (
                      <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-300 rounded-lg">
                        {note.category.charAt(0).toUpperCase() +
                          note.category.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {visibleNotes.length > 2 && (
              <button
                onClick={() => setShowAllNotes(!showAllNotes)}
                className="w-full flex items-center justify-center space-x-2 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 font-medium py-2"
              >
                {showAllNotes ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                <span>
                  {showAllNotes
                    ? "Show Less"
                    : `Show ${visibleNotes.length - 2} More`}
                </span>
              </button>
            )}
          </div>
        </InfoCard>
      )}
    </div>
  );
};

export default function ApplicationsPage({ onApply }) {
  const [hasApplication, setHasApplication] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [applicationData, setApplicationData] = useState(null);

  useEffect(() => {
    const storedUserId = getUserId();
    if (storedUserId) {
      api.applications
        .getByUserId(storedUserId)
        .then((data) => {
          setHasApplication(true);
          setApplicationData(data);
        })
        .catch((error) => {
          if (error instanceof APIError && error.status === 404) {
            setHasApplication(false);
            setApplicationData(null);
          } else {
            logger.error("Failed to check application:", error);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleApplyClick = () => {
    if (onApply) onApply();
    else window.location.href = "/dashboard?tab=apply";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-violet-200 dark:border-violet-900" />
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-violet-600 absolute top-0 left-0" />
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

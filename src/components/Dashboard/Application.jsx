import { useState, useEffect } from 'react';
import {
  CheckCircle2, FileText, GraduationCap, Users,
  AlertCircle, PlusCircle, ArrowRight, Clock, Calendar,
  MessageSquare, ChevronDown, ChevronUp, User, Mail, Phone,
  TrendingUp, Award, Download
} from 'lucide-react';
import api, { APIError } from '@/services/api';
import { getUserId } from '@/services/auth';
import logger from '@/utils/logger';
import InfoCard from './InfoCard';
import StatsCard from './StatsCard';

// Custom Rand Icon Component
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
    title: 'Application Submitted',
    description: 'Your bursary application has been successfully received',
    icon: FileText,
  },
  {
    id: 2,
    title: 'Document Verification',
    description: 'Verifying all submitted documents and eligibility',
    icon: CheckCircle2,
  },
  {
    id: 3,
    title: 'Academic Review',
    description: 'Academic performance assessment in progress',
    icon: GraduationCap,
  },
  {
    id: 4,
    title: 'Financial Assessment',
    description: 'Evaluating financial need and documentation',
    icon: RandIcon,
  },
  {
    id: 5,
    title: 'Committee Review',
    description: 'Selection committee reviewing your application',
    icon: Users,
  },
  {
    id: 6,
    title: 'Decision Notification',
    description: 'Final decision communicated via email',
    icon: AlertCircle,
  },
  {
    id: 7,
    title: 'Fund Disbursement',
    description: 'Approved funds transferred to student account',
    icon: RandIcon,
  },
];

const getStatusColor = (status) => {
  const normalizedStatus = (status || '').toLowerCase().replace(/\s+/g, '_');
  switch (normalizedStatus) {
    case 'approved': return 'bg-green-100 text-green-700 border-green-200';
    case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
    case 'under_review': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'waitlisted': return 'bg-purple-100 text-purple-700 border-purple-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'pending': return 'Pending Review';
    case 'under_review': return 'Under Review';
    case 'approved': return 'Approved';
    case 'rejected': return 'Rejected';
    case 'waitlisted': return 'Waitlisted';
    default: return 'Unknown';
  }
};

const NoApplicationMessage = ({ onApplyClick }) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-2xl px-4">
        <div className="w-24 h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-12 h-12 text-cyan-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Apply?
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          You haven't submitted a bursary application yet. Start your journey towards educational financial support today.
        </p>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <RandIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Financial Support</h3>
            <p className="text-sm text-gray-600">Get the assistance you need to focus on your studies</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Simple Process</h3>
            <p className="text-sm text-gray-600">Easy application with step-by-step guidance</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Track Progress</h3>
            <p className="text-sm text-gray-600">Monitor your application status in real-time</p>
          </div>
        </div>

        <button
          onClick={onApplyClick}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-2xl hover:shadow-lg transition-all hover:scale-105"
        >
          <PlusCircle className="w-5 h-5 mr-3" />
          Start Your Application
          <ArrowRight className="w-5 h-5 ml-3" />
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Takes approximately 15-20 minutes to complete
        </p>
      </div>
    </div>
  );
};

const ApplicationProgress = ({ application }) => {
  const [adminNotes, setAdminNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [showAllNotes, setShowAllNotes] = useState(false);

  useEffect(() => {
    const fetchAdminNotes = async () => {
      if (!application._id) return;
      setLoadingNotes(true);
      try {
        const data = await api.applications.getNotes(application._id);
        setAdminNotes(data.adminNotes || []);
      } catch (error) {
        logger.error('Failed to fetch admin notes:', error);
      } finally {
        setLoadingNotes(false);
      }
    };
    fetchAdminNotes();
  }, [application._id]);

  const visibleNotes = Array.isArray(adminNotes) ? adminNotes : [];
  const displayedNotes = showAllNotes ? [...visibleNotes].reverse() : [...visibleNotes].reverse().slice(0, 2);
  const completedSteps = application.currentStep - 1;
  const progressPercentage = (completedSteps / applicationSteps.length) * 100;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Application Header */}
      <div className="bg-gradient-to-br from-cyan-600 via-cyan-700 to-blue-600 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-white opacity-5 rounded-full -mr-16 sm:-mr-24 lg:-mr-32 -mt-16 sm:-mt-24 lg:-mt-32"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-white opacity-5 rounded-full -ml-12 sm:-ml-16 lg:-ml-24 -mb-12 sm:-mb-16 lg:-mb-24"></div>
        
        <div className="relative flex flex-col gap-4 sm:gap-6">
          {/* Top Section - Avatar and Name */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0">
              <Award className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-cyan-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 break-words">{application.fullName}</h1>
              <div className="flex flex-col space-y-1.5 text-cyan-100">
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm break-all">{application.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{application.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Status Badge */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-cyan-100">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">
                Applied: {new Date(application.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-xl sm:rounded-2xl border-2 font-bold text-xs sm:text-sm lg:text-base whitespace-nowrap ${getStatusColor(application.status)}`}>
              {getStatusText(application.status)}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        <StatsCard
          title="Application Status"
          value={getStatusText(application.status)}
          icon={FileText}
          color="cyan"
        />
        <StatsCard
          title="Current Step"
          value={`${application.currentStep}/7`}
          icon={TrendingUp}
          color="purple"
        />
        <StatsCard
          title="Progress"
          value={`${Math.round(progressPercentage)}%`}
          icon={CheckCircle2}
          color="green"
        />
        <StatsCard
          title="Submitted"
          value={new Date(application.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          icon={Calendar}
          color="orange"
        />
      </div>

      {/* Progress Bar */}
      <InfoCard title="Overall Progress" icon={Clock}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{completedSteps} of {applicationSteps.length} steps completed</span>
            <span className="text-2xl font-bold text-cyan-600">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-cyan-600 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </InfoCard>

      {/* Application Steps */}
      <InfoCard title="Application Steps" icon={FileText}>
        <div className="space-y-6">
          {applicationSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = step.id < application.currentStep;
            const isCurrent = step.id === application.currentStep;
            const isPending = step.id > application.currentStep;

            return (
              <div key={step.id} className="relative">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 relative">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isCompleted ? 'bg-green-100' : isCurrent ? 'bg-cyan-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        isCompleted ? 'text-green-600' : isCurrent ? 'text-cyan-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-600">{step.id}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        isCompleted ? 'bg-green-100 text-green-700' : 
                        isCurrent ? 'bg-cyan-100 text-cyan-700' : 
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{step.description}</p>
                    {isCurrent && (
                      <div className="flex items-center text-cyan-600 mt-2">
                        <div className="w-2 h-2 bg-cyan-600 rounded-full animate-pulse mr-2"></div>
                        <span className="text-sm font-medium">Currently Active</span>
                      </div>
                    )}
                  </div>
                </div>
                {index < applicationSteps.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200"></div>
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
              <div key={note._id || index} className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-cyan-900">Review Committee</span>
                      <span className="text-xs text-cyan-700">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-cyan-800 leading-relaxed">{note.note}</p>
                    {note.category && (
                      <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-cyan-100 text-cyan-800 rounded-lg">
                        {note.category.charAt(0).toUpperCase() + note.category.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {visibleNotes.length > 2 && (
              <button
                onClick={() => setShowAllNotes(!showAllNotes)}
                className="w-full flex items-center justify-center space-x-2 text-sm text-cyan-600 hover:text-cyan-700 font-medium py-2"
              >
                {showAllNotes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                <span>{showAllNotes ? 'Show Less' : `Show ${visibleNotes.length - 2} More`}</span>
              </button>
            )}
          </div>
        </InfoCard>
      )}
    </div>
  );
};

export default function ApplicationsPage() {
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

  const handleApplyClick = () => {
    window.location.href = '/apply';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-600 absolute top-0 left-0"></div>
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

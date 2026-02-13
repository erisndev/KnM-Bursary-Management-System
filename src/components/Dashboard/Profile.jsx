import { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, GraduationCap, 
  FileText, Calendar, Award, AlertCircle, CheckCircle2,
  Edit, Download, Upload
} from 'lucide-react';
import api, { APIError } from '@/services/api';
import logger from '@/utils/logger';
import InfoCard from './InfoCard';
import StatsCard from './StatsCard';

export default function ProfilePage({ userId }) {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const data = await api.applications.getByUserId(userId);
      setStudentData(data);
    } catch (error) {
      if (error instanceof APIError && error.status === 404) {
        setStudentData(null);
      } else {
        logger.error('Failed to fetch profile:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-200 dark:border-slate-700"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-violet-600 absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/40 dark:to-indigo-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-12 h-12 text-violet-600 dark:text-violet-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            No Profile Data Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Complete your application to view your profile information.
          </p>
          <button
            onClick={() => window.location.href = '/apply'}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
          >
            Complete Application
          </button>
        </div>
      </div>
    );
  }

  const canUpdateDocuments = studentData.status !== 'approved' && studentData.status !== 'rejected';

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'under_review': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-violet-600 via-indigo-700 to-blue-700 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-white dark:bg-slate-900 opacity-5 rounded-full -mr-16 sm:-mr-24 lg:-mr-32 -mt-16 sm:-mt-24 lg:-mt-32"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-white dark:bg-slate-900 opacity-5 rounded-full -ml-12 sm:-ml-16 lg:-ml-24 -mb-12 sm:-mb-16 lg:-mb-24"></div>
        
        <div className="relative flex flex-col gap-4 sm:gap-6">
          {/* Top Section - Avatar and Name */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0">
              <User className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 break-words">{studentData.fullName}</h1>
              <div className="flex flex-col space-y-1.5 text-violet-100">
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm break-all">{studentData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{studentData.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Status Badge */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-violet-100">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">
                Submitted: {new Date(studentData.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-xl sm:rounded-2xl border-2 font-bold text-xs sm:text-sm lg:text-base whitespace-nowrap ${getStatusColor(studentData.status)}`}>
              {studentData.status?.replace('_', ' ').toUpperCase() || 'PENDING'}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        <StatsCard
          title="Application Status"
          value={studentData.status?.replace('_', ' ') || 'Pending'}
          icon={FileText}
          color="cyan"
        />
        <StatsCard
          title="Current Step"
          value={`${studentData.currentStep || 1}/7`}
          icon={CheckCircle2}
          color="purple"
        />
        <StatsCard
          title="Documents"
          value={Object.keys(studentData.documents || {}).length}
          icon={Upload}
          color="green"
        />
        <StatsCard
          title="Submitted"
          value={new Date(studentData.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          icon={Calendar}
          color="orange"
        />
      </div>

      {/* Alert if cannot update */}
      {!canUpdateDocuments && (
        <div className="bg-violet-50 dark:bg-violet-900/20 border-2 border-violet-200 dark:border-violet-800 rounded-2xl p-6 flex items-start space-x-4">
          <AlertCircle className="w-6 h-6 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-violet-900 dark:text-violet-200 mb-1">Application Locked</h4>
            <p className="text-violet-700 dark:text-violet-300 text-sm">
              Your application has been {studentData.status}. Document updates are no longer available.
            </p>
          </div>
        </div>
      )}

      {/* Personal Information */}
      <InfoCard title="Personal Information" icon={User}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">Full Name</label>
            <p className="text-gray-900 dark:text-white font-semibold">{studentData.fullName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">ID Number</label>
            <p className="text-gray-900 dark:text-white font-semibold">{studentData.idnumber}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">Date of Birth</label>
            <p className="text-gray-900 dark:text-white font-semibold">
              {new Date(studentData.dob).toLocaleDateString()}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">Gender</label>
            <p className="text-gray-900 dark:text-white font-semibold capitalize">{studentData.gender}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">Nationality</label>
            <p className="text-gray-900 dark:text-white font-semibold">{studentData.nationality}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">Country</label>
            <p className="text-gray-900 dark:text-white font-semibold capitalize">{studentData.country}</p>
          </div>
        </div>
      </InfoCard>

      {/* Contact Information */}
      <InfoCard title="Contact Information" icon={Mail}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">Email</label>
            <p className="text-gray-900 dark:text-white font-semibold">{studentData.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">Phone</label>
            <p className="text-gray-900 dark:text-white font-semibold">{studentData.phone}</p>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">Address</label>
            <p className="text-gray-900 dark:text-white font-semibold">
              {studentData.address1}
              {studentData.address2 && `, ${studentData.address2}`}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {studentData.city}, {studentData.state} {studentData.postalCode}
            </p>
          </div>
        </div>
      </InfoCard>

      {/* Education Information */}
      <InfoCard title="Education Information" icon={GraduationCap}>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">High School</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">School Name</label>
                <p className="text-gray-900 dark:text-white font-semibold">{studentData.highSchoolName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">Matric Year</label>
                <p className="text-gray-900 dark:text-white font-semibold">{studentData.highSchoolMatricYear}</p>
              </div>
            </div>
          </div>

          {studentData.institutionName && (
            <div className="pt-6 border-t border-gray-100 dark:border-slate-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Higher Education</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">Institution</label>
                  <p className="text-gray-900 dark:text-white font-semibold">{studentData.institutionName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">Degree</label>
                  <p className="text-gray-900 dark:text-white font-semibold">{studentData.institutionDegreeName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">Major</label>
                  <p className="text-gray-900 dark:text-white font-semibold">{studentData.institutionMajor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">GPA</label>
                  <p className="text-gray-900 dark:text-white font-semibold">{studentData.institutionGPA}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </InfoCard>

      {/* Documents */}
      <InfoCard 
        title="Supporting Documents" 
        icon={FileText}
        action={canUpdateDocuments ? { label: 'Upload', onClick: () => {} } : null}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(studentData.documents || {}).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Uploaded</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </InfoCard>
    </div>
  );
}

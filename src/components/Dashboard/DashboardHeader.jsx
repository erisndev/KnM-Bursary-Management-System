import { Bell, Search, Menu } from "lucide-react";
import toast from "react-hot-toast";

const DashboardHeader = ({ activePage, setSidebarOpen, userName = 'Student' }) => {
  const pageInfo = {
    applications: {
      title: "My Applications",
      description: "Track and manage your bursary applications",
      gradient: "from-cyan-700 to-blue-600",
    },
    profile: {
      title: "My Profile",
      description: "View and update your personal information",
      gradient: "from-purple-700 to-pink-600",
    },
  };

  const currentPage = pageInfo[activePage] || pageInfo.applications;

  return (
    <header className="flex-shrink-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          {/* Left Section */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden flex-shrink-0 p-2 hover:bg-gray-100 rounded-xl transition-colors active:scale-95"
              aria-label="Open menu"
            >
              <Menu size={24} className="text-gray-700" />
            </button>

            {/* Page Title */}
            <div className="flex-1 min-w-0">
              <h1
                className={`text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r ${currentPage.gradient} bg-clip-text text-transparent truncate`}
              >
                {currentPage.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5 hidden sm:block truncate">
                {currentPage.description}
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            {/* Notifications */}
            <button
              className="relative p-2 sm:p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-all hover:scale-105 active:scale-95"
              onClick={() => toast.info('Notifications coming soon!')}
              aria-label="Notifications"
            >
              <Bell size={20} className="sm:w-5 sm:h-5" />
              <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* User Avatar - Hidden on small mobile */}
            <div className="hidden sm:flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-3 border-l border-gray-200">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-semibold text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

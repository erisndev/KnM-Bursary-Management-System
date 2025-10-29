import {
  Home,
  User,
  LogOut,
  X,
  Settings,
  HelpCircle,
  FileText,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearAuth } from "@/services/auth";

const Sidebar = ({
  activePage,
  setActivePage,
  sidebarOpen,
  setSidebarOpen,
  setShowConfirm,
}) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "applications",
      label: "Application",
      icon: Home,
      description: "View your applications",
    },
    {
      id: "profile",
      label: "My Profile",
      icon: User,
      description: "Manage your information",
    },
  ];

  const handleMenuClick = (itemId) => {
    setActivePage(itemId);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col z-50
         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
         md:translate-x-0 md:z-40 md:w-72 lg:w-80`}
      >
        {/* Sidebar Header */}
        <div className="flex-shrink-0 p-6 bg-gradient-to-br from-cyan-600 via-cyan-700 to-blue-600 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16"></div>
          </div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <Award className="w-7 h-7 text-cyan-600" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">KNP Bursary</h2>
                <p className="text-cyan-100 text-sm font-medium">
                  Student Portal
                </p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white hover:bg-white/20 p-2 rounded-xl transition-all hover:rotate-90 duration-300"
              aria-label="Close sidebar"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 min-h-0">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">
              Main Menu
            </p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-200 scale-[1.02]"
                      : "text-gray-700 hover:bg-gray-50 hover:scale-[1.01]"
                  }`}
                >
                  <div className="flex items-center space-x-4 px-4 py-4">
                    <div
                      className={`p-2 rounded-xl transition-all ${
                        isActive
                          ? "bg-white/20"
                          : "bg-gray-100 group-hover:bg-cyan-50"
                      }`}
                    >
                      <Icon
                        size={20}
                        className={isActive ? "text-white" : "text-cyan-600"}
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <p
                        className={`font-semibold text-sm ${
                          isActive ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.label}
                      </p>
                      <p
                        className={`text-xs ${
                          isActive ? "text-cyan-100" : "text-gray-500"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                    {isActive && (
                      <div className="w-1.5 h-8 bg-white rounded-full"></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          {/* <div className="pt-4 space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">
              Quick Actions
            </p>
            <button
              onClick={() => toast.info("Help center coming soon!")}
              className="w-full flex items-center space-x-4 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all hover:scale-[1.01]"
            >
              <div className="p-2 bg-gray-100 rounded-xl">
                <HelpCircle size={18} className="text-gray-600" />
              </div>
              <span className="text-sm font-medium">Help & Support</span>
            </button>
          </div> */}
        </nav>

        {/* Sidebar Footer */}
        <div className="flex-shrink-0 p-4 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-2xl font-semibold transition-all hover:shadow-md hover:scale-[1.02] group"
          >
            <LogOut
              size={20}
              className="group-hover:rotate-12 transition-transform"
            />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

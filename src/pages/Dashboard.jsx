import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearAuth, getUserId } from "@/services/auth";
import Sidebar from "@/components/Dashboard/Sidebar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import LogoutModal from "@/components/Dashboard/LogoutModal";
import ApplicationsPage from "@/components/Dashboard/Application";
import ProfilePage from "@/components/Dashboard/Profile";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("applications");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const userId = getUserId();

  const handleLogout = () => {
    clearAuth();
    toast.success("Logout successful! See you soon.", {
      icon: "👋",
      duration: 3000,
    });
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 overflow-hidden pt-16">
      {/* Mobile Menu Button - Fixed below navbar */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed top-20 left-4 z-50 bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 border border-gray-200"
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6 text-cyan-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* Sidebar Component */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setShowConfirm={setShowConfirm}
      />

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed top-16 inset-x-0 bottom-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden md:ml-72 lg:ml-80">
        {/* Dashboard Header */}
        {/* <DashboardHeader
          activePage={activePage}
          setSidebarOpen={setSidebarOpen}
          userName="Student"
        /> */}

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto ">
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Content Container */}
            <div className="max-w-7xl mx-auto">
              {/* Page Content */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activePage === "applications" ? (
                  <ApplicationsPage />
                ) : (
                  <ProfilePage userId={userId} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <LogoutModal
          onConfirm={() => {
            setShowConfirm(false);
            handleLogout();
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

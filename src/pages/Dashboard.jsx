import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { clearAuth, getUserId } from "@/services/auth";
import Sidebar from "@/components/Dashboard/Sidebar";
import LogoutModal from "@/components/Dashboard/LogoutModal";
import ApplicationsPage from "@/components/Dashboard/Application";
import ProfilePage from "@/components/Dashboard/Profile";
import ApplicationFormPage from "@/components/Dashboard/ApplicationFormPage";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "applications";
  const [activePage, setActivePage] = useState(initialTab);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const userId = getUserId();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["applications", "apply", "profile"].includes(tab)) {
      setActivePage(tab);
    }
  }, [searchParams]);

  const handleLogout = () => {
    clearAuth();
    toast.success("Logged out successfully!", { icon: "👋", duration: 3000 });
    navigate("/login", { replace: true });
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activePage) {
      case "applications":
        return <ApplicationsPage onApply={() => handlePageChange("apply")} />;
      case "apply":
        return <ApplicationFormPage userId={userId} onViewApplication={() => handlePageChange("applications")} />;
      case "profile":
        return <ProfilePage userId={userId} />;
      default:
        return <ApplicationsPage onApply={() => handlePageChange("apply")} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <Sidebar
        activePage={activePage}
        setActivePage={handlePageChange}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setShowConfirm={setShowConfirm}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden lg:ml-64">
        {/* Top Bar */}
        <header className="flex-shrink-0 bg-white dark:bg-slate-900/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-700/50 dark:border-slate-700/50 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between transition-colors duration-300">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {activePage === "applications" && "My Application"}
                {activePage === "apply" && "Apply for Bursary"}
                {activePage === "profile" && "My Profile"}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                {activePage === "applications" && "Track your bursary application status"}
                {activePage === "apply" && "Complete your bursary application form"}
                {activePage === "profile" && "View and manage your information"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold shadow-md shadow-violet-500/20">
              S
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {renderContent()}
          </div>
        </div>
      </main>

      {showConfirm && (
        <LogoutModal
          onConfirm={() => { setShowConfirm(false); handleLogout(); }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

import { useState } from "react";
import { Home, User, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ApplicationsPage from "@/components/Dashboard/Application";
import ProfilePage from "@/components/Dashboard/Profile";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("applications");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // For simplicity, let's assume you store user ID in localStorage or get it from token decoded
  const userId = localStorage.getItem("userId"); // Or get from token decode logic

  const applications = [
    {
      name: "National Academic Scholarship",
      university: "University of Cape Town",
      status: "Approved",
      date: "2023-09-15",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    toast.success("Logout successful!");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      {!sidebarOpen && (
        <button
          className="md:hidden fixed top-16 left-4 z-40 bg-white rounded-full p-2 shadow"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-30 top-0 left-0 h-full w-64 bg-gray-100 border-r transition-transform duration-200
         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
         md:translate-x-0 md:static md:w-48`}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end p-2">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-600 hover:text-cyan-800"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        <div className="p-4 border-b">
          <h2 className="text-md font-bold text-cyan-800">Applications</h2>
        </div>
        <nav className="py-2">
          <div
            className={`flex items-center px-4 py-2 text-md ${
              activePage === "applications"
                ? "bg-cyan-800 text-white"
                : "text-gray-600"
            } hover:bg-cyan-600 hover:text-white cursor-pointer`}
            onClick={() => {
              setActivePage("applications");
              setSidebarOpen(false);
            }}
          >
            <Home size={16} className="mr-2" />
            <span>Home</span>
          </div>

          <div
            className={`flex items-center px-4 py-2 text-md ${
              activePage === "profile"
                ? "bg-cyan-800 text-white"
                : "text-gray-600"
            } hover:bg-cyan-600 hover:text-white cursor-pointer`}
            onClick={() => {
              setActivePage("profile");
              setSidebarOpen(false);
            }}
          >
            <User size={16} className="mr-2" />
            <span>Profile</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-md text-gray-600 hover:bg-cyan-600 hover:text-white w-full"
          >
            <LogOut size={16} className="mr-2" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto mt-6 md:ml-0 ml-0 p-4">
        {activePage === "applications" ? (
          <ApplicationsPage applications={applications} />
        ) : (
          <ProfilePage userId={userId} />
        )}
      </div>
    </div>
  );
}

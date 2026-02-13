import {
  LayoutDashboard,
  FileText,
  User,
  LogOut,
  X,
  GraduationCap,
} from "lucide-react";

const Sidebar = ({
  activePage,
  setActivePage,
  sidebarOpen,
  setSidebarOpen,
  setShowConfirm,
}) => {
  const menuItems = [
    { id: "applications", label: "My Application", icon: LayoutDashboard, color: "violet" },
    { id: "apply", label: "Apply", icon: FileText, color: "cyan" },
    { id: "profile", label: "Profile", icon: User, color: "emerald" },
  ];

  const handleMenuClick = (itemId) => {
    setActivePage(itemId);
    setSidebarOpen(false);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col z-50 transition-all duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-gray-200 dark:border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-violet-500/20">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-sm font-bold text-gray-900 dark:text-white">KNP Bursary</span>
            <span className="block text-[10px] text-gray-400 dark:text-gray-500 dark:text-gray-400 -mt-0.5">Student Portal</span>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          <p className="px-3 mb-3 text-[10px] font-semibold text-gray-400 dark:text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Menu
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            const activeColors = {
              violet: "bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800",
              cyan: "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
              emerald: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
            };
            const iconColors = {
              violet: "text-violet-600 dark:text-violet-400",
              cyan: "text-cyan-600 dark:text-cyan-400",
              emerald: "text-emerald-600 dark:text-emerald-400",
            };

            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? `${activeColors[item.color]} border`
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white border border-transparent"
                }`}
              >
                <Icon
                  size={18}
                  className={isActive ? iconColors[item.color] : "text-gray-400 dark:text-gray-500"}
                />
                <span>{item.label}</span>
                {isActive && (
                  <div className={`ml-auto w-1.5 h-1.5 rounded-full ${
                    item.color === "violet" ? "bg-violet-500" :
                    item.color === "cyan" ? "bg-cyan-500" : "bg-emerald-500"
                  }`} />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 dark:border-slate-800 flex-shrink-0">
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900/40"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

import { LogOut } from "lucide-react";

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 w-full max-w-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
        <div className="text-center">
          <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut className="w-6 h-6 text-red-500 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Log Out</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Are you sure you want to log out? You'll need to sign in again to access your dashboard.</p>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl text-sm transition-colors">Cancel</button>
            <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl text-sm transition-colors">Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

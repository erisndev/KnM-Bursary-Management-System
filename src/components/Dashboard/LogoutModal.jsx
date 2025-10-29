import { LogOut, AlertTriangle } from 'lucide-react';

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md transform transition-all animate-in zoom-in duration-200">
        <div className="text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-5 relative">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
            <LogOut className="w-10 h-10 text-red-600 relative z-10" />
          </div>

          {/* Content */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Confirm Logout
          </h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Are you sure you want to log out? You'll need to sign in again to access your dashboard.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-2xl transition-all hover:scale-[1.02] active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-red-200"
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

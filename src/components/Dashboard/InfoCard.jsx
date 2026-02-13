const InfoCard = ({ title, children, icon: Icon, action }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4 border-b border-gray-100 dark:border-slate-800 bg-gradient-to-r from-gray-50 dark:from-slate-800/50 to-white dark:to-slate-900">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            {Icon && (
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg sm:rounded-xl flex-shrink-0">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            )}
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate">{title}</h3>
          </div>
          {action && (
            <button onClick={action.onClick} className="text-xs sm:text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 transition-colors whitespace-nowrap flex-shrink-0">
              {action.label}
            </button>
          )}
        </div>
      </div>
      <div className="p-4 sm:p-5 lg:p-6">{children}</div>
    </div>
  );
};

export default InfoCard;

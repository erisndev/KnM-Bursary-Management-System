import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, color = 'violet' }) => {
  const colorClasses = {
    violet: { bg: 'from-violet-500 to-indigo-600' },
    cyan: { bg: 'from-cyan-500 to-blue-600' },
    emerald: { bg: 'from-emerald-500 to-teal-600' },
    amber: { bg: 'from-amber-500 to-orange-600' },
    fuchsia: { bg: 'from-fuchsia-500 to-pink-600' },
    purple: { bg: 'from-purple-500 to-pink-600' },
    green: { bg: 'from-green-500 to-emerald-600' },
    orange: { bg: 'from-orange-500 to-red-600' },
  };

  const colors = colorClasses[color] || colorClasses.violet;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-4 sm:p-5 lg:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 truncate">{title}</p>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 break-words">{value}</h3>
          {trend && (
            <div className="flex items-center space-x-1">
              {trend === 'up' ? <TrendingUp className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> : <TrendingDown className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />}
              <span className={`text-xs font-medium ${trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-br ${colors.bg} shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;

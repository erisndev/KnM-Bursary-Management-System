import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, color = 'cyan' }) => {
  const colorClasses = {
    cyan: {
      bg: 'from-cyan-500 to-blue-600',
      light: 'bg-cyan-50',
      text: 'text-cyan-600',
      border: 'border-cyan-200'
    },
    purple: {
      bg: 'from-purple-500 to-pink-600',
      light: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200'
    },
    green: {
      bg: 'from-green-500 to-emerald-600',
      light: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-200'
    },
    orange: {
      bg: 'from-orange-500 to-red-600',
      light: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-200'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 lg:p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 break-words">{value}</h3>
          {trend && (
            <div className="flex items-center space-x-1">
              {trend === 'up' ? (
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" />
              )}
              <span className={`text-xs sm:text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 sm:p-3.5 lg:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${colors.bg} shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
          <Icon className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;

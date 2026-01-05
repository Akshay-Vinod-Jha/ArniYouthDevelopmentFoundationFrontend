const StatCard = ({ title, value, icon: Icon, change, color = "orange" }) => {
  const colorClasses = {
    orange: "bg-orange-50 dark:bg-orange-900/20 text-primary",
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    yellow:
      "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
    red: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
    purple:
      "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    green:
      "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 truncate">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {change && (
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
              <span
                className={
                  change >= 0
                    ? "text-primary"
                    : "text-red-600 dark:text-red-400"
                }
              >
                {change >= 0 ? "+" : ""}
                {change}%
              </span>{" "}
              <span className="hidden sm:inline">vs last month</span>
            </p>
          )}
        </div>
        <div
          className={`p-3 sm:p-4 rounded-full ${colorClasses[color]} ml-2 flex-shrink-0`}
        >
          <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;

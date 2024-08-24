import React, { useMemo } from "react";
import BarChart from "../../charts/BarChart01";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard04() {
  // Memoizing the chartData to prevent unnecessary re-renders
  const chartData = useMemo(() => {
    const colors = tailwindConfig().theme.colors;
    return {
      labels: ["Coils", "Tons", "Delay", "Rejects"],
      datasets: [
        {
          data: [8, 9, 1, 2],
          backgroundColor: colors.purple[400],
          hoverBackgroundColor: colors.purple[600],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        }
      ]
    };
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Shift Wise Trend
        </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} shift="Shift" />
    </div>
  );
}

export default DashboardCard04;

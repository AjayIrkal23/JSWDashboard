import React, { useMemo } from "react";
import BarChart from "../../charts/BarChart01";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function D16() {
  // Memoizing the chartData to prevent unnecessary re-renders
  const chartData = useMemo(() => {
    const colors = tailwindConfig().theme.colors;
    return {
      labels: ["ISC On Percentage", "Percentage of FT > 890"],
      datasets: [
        {
          data: [1, 2],
          backgroundColor: colors.blue[700],
          hoverBackgroundColor: colors.blue[800],
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
          Shift wise ISC Trend
        </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default D16;

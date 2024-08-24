import React, { useMemo } from "react";
import DoughnutChart from "../../charts/DoughnutChart";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard06() {
  // Memoizing the chartData to prevent unnecessary re-renders
  const chartData = useMemo(() => {
    const colors = tailwindConfig().theme.colors;
    return {
      labels: [
        "API Grades",
        "CM Grades",
        "Common Grades",
        "Electrical Steel Grades",
        "High Strength Steel Grades",
        "IF Exposed Grades",
        "IF Unexposed Grades",
        "Mandrel Hold Grades",
        "RR Grades",
        "Unexposed Grades"
      ],
      datasets: [
        {
          label: "Grades",
          data: [35, 30, 35, 85, 99, 44, 55, 33, 47, 88],
          backgroundColor: [
            colors.blue[500],
            colors.red[600],
            colors.purple[800],
            colors.green[800],
            colors.pink[800],
            colors.blue[800],
            colors.indigo[800],
            colors.pink[800],
            colors.gray[800],
            colors.red[200]
          ],
          hoverBackgroundColor: [
            colors.blue[500],
            colors.red[600],
            colors.purple[800],
            colors.green[800],
            colors.pink[800],
            colors.blue[800],
            colors.indigo[800],
            colors.pink[800],
            colors.gray[800],
            colors.red[200]
          ],
          borderWidth: 0
        }
      ]
    };
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-full xl:col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Grade Mix Pie Chart
        </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={400} height={280} />
    </div>
  );
}

export default DashboardCard06;

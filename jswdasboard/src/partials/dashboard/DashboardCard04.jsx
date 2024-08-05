import React, { useEffect, useState } from "react";
import BarChart from "../../charts/BarChart01";
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard04() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Assuming this data comes from an API or a context, you can replace this with actual data fetching logic
    const fetchData = () => {
      try {
        const data = [8, 9, 1, 2]; // Replace with actual data fetching logic
        const labels = ["Coils", "Tons", "Delay", "Rejects"];
        setChartData({
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: tailwindConfig().theme.colors.purple[400],
              hoverBackgroundColor: tailwindConfig().theme.colors.purple[600],
              barPercentage: 0.66,
              categoryPercentage: 0.66
            }
          ]
        });
        console.log("Data fetched successfully", data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Shift Wise Trend
        </h2>
      </header>
      {chartData ? (
        <BarChart data={chartData} width={595} height={248} shift="Shift" />
      ) : (
        <div className="flex items-center justify-center h-32">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default DashboardCard04;

import React, { useState, useEffect } from "react";
import DoughnutChart from "../../charts/DoughnutChart";
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard06() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Assuming this data comes from an API or a context, you can replace this with actual data fetching logic
    const fetchData = () => {
      try {
        const data = [35, 30, 35, 85, 99, 44, 55, 33, 47, 88]; // Replace with actual data fetching logic
        const labels = [
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
        ];
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Grade Mix",
              data: data,
              backgroundColor: [
                tailwindConfig().theme.colors.blue[500],
                tailwindConfig().theme.colors.red[600],
                tailwindConfig().theme.colors.purple[800],
                tailwindConfig().theme.colors.green[800],
                tailwindConfig().theme.colors.pink[800],
                tailwindConfig().theme.colors.blue[800],
                tailwindConfig().theme.colors.indigo[800],
                tailwindConfig().theme.colors.pink[800],
                tailwindConfig().theme.colors.gray[800],
                tailwindConfig().theme.colors.red[200]
              ],
              hoverBackgroundColor: [
                tailwindConfig().theme.colors.blue[500],
                tailwindConfig().theme.colors.red[600],
                tailwindConfig().theme.colors.purple[800],
                tailwindConfig().theme.colors.green[800],
                tailwindConfig().theme.colors.pink[800],
                tailwindConfig().theme.colors.blue[800],
                tailwindConfig().theme.colors.indigo[800],
                tailwindConfig().theme.colors.pink[800],
                tailwindConfig().theme.colors.gray[800],
                tailwindConfig().theme.colors.red[200]
              ],
              borderWidth: 0
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
    <div className="flex flex-col col-span-full sm:col-span-full xl:col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Grade Mix Pie Chart
        </h2>
      </header>
      {chartData ? (
        <DoughnutChart data={chartData} width={400} height={280} />
      ) : (
        <div className="flex items-center justify-center h-32">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default DashboardCard06;

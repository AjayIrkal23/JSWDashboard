import React from "react";
import { Link } from "react-router-dom";
import LineChart from "../../charts/LineChart01";
import Icon from "../../images/icon-03.svg";
import EditMenu from "../../components/DropdownEditMenu";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";

function DashboardCard03() {
  const chartData = {
    labels: ["00:00", "01:00", "02", "03", "04", "05", "06", "07"],
    datasets: [
      // Indigo line
      {
        data: [540, 466, 540, 466, 385, 432, 334, 334],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.yellow[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.yellow[500],
        borderWidth: 2,
        tension: 0,
        pointStyle: "circle",
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: tailwindConfig().theme.colors.yellow[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.yellow[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
      // Gray line
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-[#fbc02d]/40 dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 pb-2">
      <div className="px-5 pt-5 flex items-center justify-between">
        <div>
          {" "}
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
            Current Shift Delays
          </div>
          <div className="flex items-start">
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
              80
            </div>
          </div>
        </div>

        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src="/delay.png" width="100" height="100" alt="Icon 01" />
          {/* Menu button */}
        </header>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={128} title="Delay" />
      </div>
    </div>
  );
}

export default DashboardCard03;

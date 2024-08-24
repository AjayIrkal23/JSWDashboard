import React, { useContext, useEffect, useState, useMemo } from "react";
import LineChart from "../../charts/LineChart01";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";
import { getLabels } from "../../utils/roundoff";
import { AccountContext } from "../../context/context";

function DashboardCard02() {
  const [dataLine, setDataLine] = useState(null);
  const { eightData } = useContext(AccountContext);

  // Memoizing the data extraction logic to optimize performance
  const getData = useMemo(() => {
    return eightData?.map((item) => item?.data?.Total_Coils);
  }, [eightData]);

  useEffect(() => {
    setDataLine(getLabels());
  }, []);

  // Memoizing the chart data to prevent unnecessary re-renders
  const chartData = useMemo(() => {
    const colors = tailwindConfig().theme.colors;
    return {
      labels: dataLine,
      datasets: [
        {
          data: [622, 622, 426, 471, 365, 365, 238, 324],
          fill: true,
          backgroundColor: `rgba(${hexToRGB(colors.slate[500])}, 0.08)`,
          borderColor: colors.slate[500],
          borderWidth: 2,
          tension: 0,
          pointStyle: "circle",
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: colors.slate[500],
          pointHoverBackgroundColor: colors.slate[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20
        }
      ]
    };
  }, [dataLine]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-gray-200 dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 pb-2">
      <div className="px-5 pt-5 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
            Current Shift Tonnage
          </div>
          <div className="flex items-start">
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
              254
            </div>
          </div>
        </div>

        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src="/ton.png" width="100" height="100" alt="Icon 01" />
        </header>
      </div>
      {/* Chart built with Chart.js 3 */}
      {dataLine ? (
        <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
          <LineChart data={chartData} width={389} height={128} title="Tons" />
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default DashboardCard02;

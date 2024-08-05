import React, { useContext, useEffect, useState } from "react";
import LineChart from "../../charts/LineChart01";
import { tailwindConfig, hexToRGB } from "../../utils/Utils";
import { getLabels } from "../../utils/roundoff";
import { AccountContext } from "../../context/context";

function DashboardCard02() {
  const [dataLine, setDataLine] = useState([]);
  const [data, setData] = useState([]);
  const { eightData } = useContext(AccountContext);

  useEffect(() => {
    const labels = getLabels();
    setDataLine(labels);
    console.log("Labels set:", labels);

    if (eightData) {
      const totalTonnage = eightData.map(
        (item) => item?.data?.Total_Coils || 0
      );
      setData(totalTonnage);
      console.log("Data fetched:", totalTonnage);
    }
  }, [eightData]);

  const chartData = {
    labels: dataLine,
    datasets: [
      {
        data: data,
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.slate[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.slate[500],
        borderWidth: 2,
        tension: 0,
        pointStyle: "circle",
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: tailwindConfig().theme.colors.slate[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.slate[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20
      }
    ]
  };

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
          <img src="/ton.png" width="100" height="100" alt="Icon 01" />
        </header>
      </div>
      {dataLine.length > 0 && data.length > 0 ? (
        <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
          <LineChart data={chartData} width={389} height={128} title="Tons" />
        </div>
      ) : (
        <div className="flex items-center justify-center h-32">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default DashboardCard02;

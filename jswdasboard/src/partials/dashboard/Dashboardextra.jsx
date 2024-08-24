import React, { useContext, useEffect, useState, useMemo } from "react";
import RejBar from "../../charts/RejBar";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";
import { getLabels } from "../../utils/roundoff";
import { AccountContext } from "../../context/context";

function DashboardExtra() {
  const [dataLine, setDataLine] = useState(null);
  const { eightData } = useContext(AccountContext);

  // Memoize data extraction for each category
  const data1 = useMemo(() => {
    return eightData?.map((item) => item?.data?.Total_Cobbles);
  }, [eightData]);

  const data2 = useMemo(() => {
    return eightData?.map((item) => item?.data?.Total_Kickbacks);
  }, [eightData]);

  const data3 = useMemo(() => {
    return eightData?.map((item) => item?.data?.Total_Pressbacks);
  }, [eightData]);

  const data4 = useMemo(() => {
    return eightData?.reduce(
      (total, item) => total + (item?.data?.Total_Rejects || 0),
      0
    );
  }, [eightData]);

  const data5 = useMemo(() => {
    return eightData?.map((item) => item?.data?.Total_Runbacks);
  }, [eightData]);

  const data6 = useMemo(() => {
    return eightData?.map((item) => item?.data?.Total_Plates);
  }, [eightData]);

  useEffect(() => {
    setDataLine(getLabels());
  }, []);

  // Memoize chart data to prevent unnecessary re-renders
  const chartData = useMemo(() => {
    const colors = tailwindConfig().theme.colors;
    return {
      labels: dataLine,
      datasets: [
        {
          data: data5,
          label: "Runback",
          backgroundColor: colors.red[500],
          hoverBackgroundColor: colors.red[600],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        },
        {
          data: data2,
          label: "Kickback",
          backgroundColor: colors.blue[500],
          hoverBackgroundColor: colors.blue[600],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        },
        {
          data: data3,
          label: "Pressback",
          backgroundColor: colors.yellow[500],
          hoverBackgroundColor: colors.yellow[600],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        },
        {
          data: data1,
          label: "Cobble",
          backgroundColor: colors.pink[500],
          hoverBackgroundColor: colors.pink[600],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        },
        {
          data: data6,
          label: "Plate",
          backgroundColor: colors.purple[500],
          hoverBackgroundColor: colors.purple[600],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        }
      ]
    };
  }, [dataLine, data1, data2, data3, data5, data6]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 pb-2 bg-red-100">
      <div className="px-5 pt-5 flex items-center justify-between mt-4">
        <div>
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
            Current Shift Rejects
          </div>
          <div className="flex items-start">
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
              {data4}
            </div>
          </div>
        </div>

        <header className="flex justify-between items-start mb-2">
          <img
            src="/reject.png"
            width="80"
            className="mt-5"
            height="100"
            alt="Icon 01"
          />
        </header>
      </div>
      {/* Chart built with Chart.js 3 */}
      {dataLine ? (
        <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
          <RejBar data={chartData} width={389} height={128} title="Rejects" />
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default DashboardExtra;

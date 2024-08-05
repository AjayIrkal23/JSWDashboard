import React, { useContext, useEffect, useState } from "react";
import RejBar from "../../charts/RejBar";
import { tailwindConfig } from "../../utils/Utils";
import { getLabels } from "../../utils/roundoff";
import { AccountContext } from "../../context/context";

function DashboardExtra() {
  const [dataLine, setDataLine] = useState(null);
  const [data, setData] = useState({
    totalCobble: null,
    totalKickback: null,
    totalRunback: null,
    totalPressback: null,
    totalPlates: null,
    totalRejects: null
  });
  const { eightData } = useContext(AccountContext);

  const fetchData = () => {
    try {
      const totalCobble = eightData?.map((item) => item?.data?.Total_Cobbles);
      const totalKickback = eightData?.map(
        (item) => item?.data?.Total_Kickbacks
      );
      const totalRunback = eightData?.map((item) => item?.data?.Total_Runbacks);
      const totalPressback = eightData?.map(
        (item) => item?.data?.Total_Pressbacks
      );
      const totalPlates = eightData?.map((item) => item?.data?.Total_Plates);
      const totalRejects = eightData?.reduce(
        (acc, item) => acc + item?.data?.Total_Rejects,
        0
      );

      setData({
        totalCobble,
        totalKickback,
        totalRunback,
        totalPressback,
        totalPlates,
        totalRejects
      });

      console.log("Data fetched successfully");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setDataLine(getLabels());
    fetchData();
  }, [eightData]);

  console.log("Data Line:", dataLine);

  const chartData = {
    labels: dataLine,
    datasets: [
      {
        data: data.totalRunback,
        label: "Runback",
        backgroundColor: tailwindConfig().theme.colors.red[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.red[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: data.totalKickback,
        label: "Kickback",
        backgroundColor: tailwindConfig().theme.colors.blue[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: data.totalPressback,
        label: "Pressback",
        backgroundColor: tailwindConfig().theme.colors.yellow[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: data.totalCobble,
        label: "Cobble",
        backgroundColor: tailwindConfig().theme.colors.pink[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.pink[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: data.totalPlates,
        label: "Plate",
        backgroundColor: tailwindConfig().theme.colors.purple[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.purple[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      }
    ]
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 pb-2 bg-red-100">
      <div className="px-5 pt-5 flex items-center justify-between mt-4">
        <div>
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
            Current Shift Rejects
          </div>
          <div className="flex items-start">
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
              {data.totalRejects}
            </div>
          </div>
        </div>
        <header className="flex justify-between items-start mb-2">
          <img
            src="/reject.png"
            width="80"
            className="mt-5"
            height="100"
            alt="Rejects Icon"
          />
        </header>
      </div>
      {dataLine ? (
        <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
          <RejBar data={chartData} width={389} height={128} title="Rejects" />
        </div>
      ) : (
        <div className="flex items-center justify-center h-32">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default DashboardExtra;

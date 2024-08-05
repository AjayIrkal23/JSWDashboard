import React, { useContext, useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { tailwindConfig, hexToRGB } from "../../utils/Utils";
import MainTrend from "../../charts/MainTrend";
import { AccountContext } from "../../context/context";
import FilterButton from "../../components/DropdownFilter";

function DashboardMain() {
  const date = new Date().toDateString();
  const [chartData, setChartData] = useState({
    coils: [],
    ton: [],
    delay: [],
    reject: []
  });
  const { data, mainData } = useContext(AccountContext);

  useEffect(() => {
    if (mainData) {
      const coils = [];
      const ton = [];
      const delay = [];
      const reject = [];

      mainData?.array.forEach((item) => {
        coils.push(item?.report?.Total_Coils);
        ton.push(item?.report?.Total_Coil_Weight / 1000);
        delay.push(item?.report?.Tot_Delay_2to5 + item?.report["Tot_Delay_>5"]);
        reject.push(item?.report?.Total_Rejects);
      });

      setChartData({ coils, ton, delay, reject });
      console.log("Data processed successfully");
    }
  }, [mainData]);

  const getDaysArray = (start, end) => {
    const arr = [];
    for (
      let dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt).toDateString().split(" ").slice(1, 3));
    }
    return arr;
  };

  const startDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  ).toISOString();
  const endDate = new Date().toISOString();

  const labels = getDaysArray(startDate, endDate);

  const chartDataConfig = {
    labels,
    datasets: [
      {
        data: chartData.ton,
        label: "Average Tons",
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.blue[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.blue[500],
        borderWidth: 2,
        tension: 0,
        cubicInterpolationMode: "monotone",
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.blue[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.blue[500]
      },
      {
        data: chartData.coils,
        label: "Coils",
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.green[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.green[500],
        borderWidth: 2,
        tension: 0,
        cubicInterpolationMode: "monotone",
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.green[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.green[500]
      },
      {
        data: chartData.reject,
        label: "Rejects",
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.red[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.red[500],
        borderWidth: 2,
        tension: 0,
        cubicInterpolationMode: "monotone",
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.red[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.red[500]
      },
      {
        data: chartData.delay,
        label: "Delay",
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.yellow[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.yellow[500],
        borderWidth: 2,
        tension: 0,
        cubicInterpolationMode: "monotone",
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.yellow[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.yellow[500]
      }
    ]
  };

  return (
    <div className="flex flex-col col-span-full dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 pb-2">
      <div className="px-5 pt-5 flex items-center justify-between">
        <div>
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <FilterButton />
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
              Production
            </div>
          </div>
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
            {date}
          </div>
        </div>
      </div>
      <div className="grow max-sm:max-h-[300px] xl:max-h-[300px]">
        <MainTrend data={chartDataConfig} width={389} height={300} />
      </div>
      <div className="mt-8 grid xl:grid-cols-10 grid-cols-12 gap-6 text-center mx-2 pb-6">
        <DataCard
          title="Coils"
          data={chartData.coils}
          color="green"
          unit="coils"
        />
        <DataCard
          title="Tonnage"
          data={chartData.ton}
          color="gray"
          unit="tons"
        />
        <DataCard
          title="Delay"
          data={chartData.delay}
          color="orange"
          unit="mins"
        />
        <DataCard
          title="Rejects"
          data={chartData.reject}
          color="red"
          unit="rejects"
        />
        <DataCard title="Average" data={[72]} color="blue" unit="tons/day" />
      </div>
    </div>
  );
}

const DataCard = ({ title, data, color, unit }) => {
  return (
    <div className="flex py-2 flex-col col-span-full sm:col-span-6 xl:col-span-2 dark:bg-slate-800 shadow-lg rounded-sm border border-black/30 dark:border-slate-700 pb-2">
      <p className="text-gray-600 text-sm tracking-wide">{title}</p>
      <p className="text-gray-800 font-semibold italic text-sm">
        {data && data[data.length - 1]} {unit}
      </p>
      <div className="px-2 my-2">
        <ProgressBar
          completed={data && data[data.length - 1]}
          bgColor={color}
          height="10px"
          labelClassName="hidden"
        />
      </div>
    </div>
  );
};

export default DashboardMain;

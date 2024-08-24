import React, { useContext, useEffect, useState, useMemo } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import FilterButton from "../../components/DropdownFilter";
import MainTrend from "../../charts/MainTrend";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";
import { AccountContext } from "../../context/context";

function DashboardMain() {
  const date = useMemo(() => new Date(Date.now()).toDateString(), []);
  const { mainData } = useContext(AccountContext);

  const [coils, setCoils] = useState([]);
  const [ton, setTon] = useState([]);
  const [delay, setDelay] = useState([]);
  const [reject, setReject] = useState([]);

  const getData = () => {
    if (mainData) {
      const arr1 = [];
      const arr2 = [];
      const arr3 = [];
      const arr4 = [];

      mainData?.array.forEach((item) => {
        arr1.push(item?.report?.Total_Coils);
        arr2.push(item?.report?.Total_Coil_Weight / 1000);
        arr3.push(item?.report?.Tot_Delay_2to5 + item?.report["Tot_Delay_>5"]);
        arr4.push(item?.report?.Total_Rejects);
      });

      setCoils(arr1);
      setTon(arr2);
      setDelay(arr3);
      setReject(arr4);
    }
  };

  useEffect(() => {
    getData();
  }, [mainData]);

  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const time = "00:00:00";
  const day = 1;
  const dateObj = `${year} ${month} ${day} ${time}`;

  const getDaysArray = (start, end) => {
    const arr = [];
    for (
      let d = new Date(start);
      d <= new Date(end);
      d.setDate(d.getDate() + 1)
    ) {
      arr.push(new Date(d).toDateString().split(" ").slice(1, 3));
    }
    return arr;
  };

  const chartData = useMemo(() => {
    const colors = tailwindConfig().theme.colors;
    return {
      labels: getDaysArray(new Date(dateObj), new Date()),
      datasets: [
        {
          data: ton,
          fill: true,
          backgroundColor: `rgba(${hexToRGB(colors.blue[500])}, 0.08)`,
          borderColor: colors.blue[500],
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          cubicInterpolationMode: "monotone",
          pointHoverRadius: 3,
          pointBackgroundColor: colors.blue[500],
          pointHoverBackgroundColor: colors.blue[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
          label: "Average Tons"
        },
        {
          data: coils,
          fill: true,
          backgroundColor: `rgba(${hexToRGB(colors.green[500])}, 0.08)`,
          borderColor: colors.green[500],
          borderWidth: 2,
          tension: 0,
          cubicInterpolationMode: "monotone",
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: colors.green[500],
          pointHoverBackgroundColor: colors.green[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
          label: "Coils"
        },
        {
          data: reject,
          fill: true,
          backgroundColor: `rgba(${hexToRGB(colors.red[500])}, 0.08)`,
          borderColor: colors.red[500],
          borderWidth: 2,
          tension: 0,
          cubicInterpolationMode: "monotone",
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: colors.red[500],
          pointHoverBackgroundColor: colors.red[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
          label: "Rejects"
        },
        {
          data: delay,
          fill: true,
          backgroundColor: `rgba(${hexToRGB(colors.yellow[500])}, 0.08)`,
          borderColor: colors.yellow[500],
          borderWidth: 2,
          tension: 0,
          cubicInterpolationMode: "monotone",
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: colors.yellow[500],
          pointHoverBackgroundColor: colors.yellow[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
          label: "Delay"
        }
      ]
    };
  }, [coils, ton, reject, delay]);

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
        <MainTrend data={chartData} width={389} height={300} />
      </div>
      <div className="mt-8 grid xl:grid-cols-10 grid-cols-12 gap-6 text-center mx-2 pb-6">
        <DashboardMetric
          label="Coils"
          value={coils[coils.length - 1]}
          color="green"
        />
        <DashboardMetric
          label="Tonnage"
          value={`${ton[ton.length - 1]} tons`}
          color="gray"
        />
        <DashboardMetric
          label="Delay"
          value={`${delay[delay.length - 1]} Mins`}
          color="orange"
        />
        <DashboardMetric
          label="Rejects"
          value={`${reject[reject.length - 1]} Rejects`}
          color="red"
        />
        <DashboardMetric
          label="Average"
          value="2268 tons/day"
          color="blue"
          progress={72}
        />
      </div>
    </div>
  );
}

function DashboardMetric({ label, value, color, progress = value }) {
  return (
    <div className="flex py-2 flex-col col-span-full sm:col-span-6 xl:col-span-2 dark:bg-slate-800 shadow-lg rounded-sm border border-black/30 dark:border-slate-700 pb-2s">
      <p className="text-gray-600 text-sm tracking-wide">{label}</p>
      <p className="text-gray-800 font-semibold italic text-sm">{value}</p>
      <div className="px-2 my-2">
        <ProgressBar
          completed={progress}
          bgColor={color}
          height="10px"
          labelClassName="hidden"
        />
      </div>
    </div>
  );
}

export default DashboardMain;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LineChart from "../../charts/LineChart01";
import Icon from "../../images/icon-01.svg";
import EditMenu from "../../components/DropdownEditMenu";
import ProgressBar from "@ramonak/react-progress-bar";

import FilterButton from "../../components/DropdownFilter";
import Datepicker from "../../components/Datepicker";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";
import MainTrend from "../../charts/MainTrend";
import { AccountContext } from "../../context/context";

function DashboardMain() {
  const date = new Date(Date.now()).toDateString();
  const [coils, setCoils] = useState();
  const [ton, setTon] = useState();
  const [delay, setDelay] = useState();
  const [reject, setReject] = useState();
  const [avg, setAvg] = useState();
  const { period, setPeriod, data, mainData } = useContext(AccountContext);

  console.log(mainData?.array);

  const getData = () => {
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    let arr4 = [];
    let arr5 = [];
    if (mainData) {
      mainData?.array.map((item) => {
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
  }, [data]);

  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const time = "00:00:00";
  const day = 1;
  const dateObj = year + " " + month + " " + day + " " + time;
  var getDaysArray = function (s, e) {
    for (
      var a = [], d = new Date(s);
      d <= new Date(e);
      d.setDate(d.getDate() + 1)
    ) {
      a.push(new Date(d).toDateString().split(" ").slice(1, 3));
    }
    return a;
  };

  const chartData = {
    labels: getDaysArray(new Date(dateObj), new Date()),
    datasets: [
      // Indigo line
      {
        data: ton,
        fill: true,

        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.blue[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.blue[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        cubicInterpolationMode: "monotone",
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.blue[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        label: "Average Tons",
      },

      {
        data: coils,
        fill: true,
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
        pointHoverBackgroundColor: tailwindConfig().theme.colors.green[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },

      {
        data: reject,
        fill: true,
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
        pointHoverBackgroundColor: tailwindConfig().theme.colors.red[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },

      {
        data: delay,
        fill: true,
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
        pointHoverBackgroundColor: tailwindConfig().theme.colors.yellow[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
      // Gray line
    ],
  };

  return (
    <div className="flex flex-col col-span-full   dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 pb-2">
      <div className="px-5 pt-5 flex items-center justify-between">
        <div>
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            {/* Right: Actions */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              {/* Filter button */}
              <FilterButton />
              {/* Datepicker built with flatpickr */}
              {/* <Datepicker /> */}
              {/* Add view button */}
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
              Production
            </div>
          </div>{" "}
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
            {date}
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[300px] xl:max-h-[300px]">
        {/* Change the height attribute to adjust the chart height */}
        <MainTrend data={chartData} width={389} height={300} />
      </div>
      <div className="mt-8 grid xl:grid-cols-10 grid-cols-12 gap-6 text-center mx-2 pb-6">
        <div className="flex py-2 flex-col col-span-full sm:col-span-6 xl:col-span-2  dark:bg-slate-800 shadow-lg rounded-sm border border-black/30 dark:border-slate-700 pb-2s">
          <p className=" text-gray-600  text-sm tracking-wide ">Coils</p>
          <p className="text-gray-800 font-semibold italic text-sm">
            {coils && coils[coils?.length - 1]} coils
          </p>
          <div className="px-2 my-2">
            <ProgressBar
              completed={coils && coils[coils?.length - 1]}
              bgColor="green"
              height="10px"
              labelClassName="hidden"
            />
          </div>
        </div>
        <div className="flex py-2 flex-col col-span-full sm:col-span-6 xl:col-span-2  dark:bg-slate-800 shadow-lg rounded-sm border border-black/30 dark:border-slate-700 pb-2s">
          <p className=" text-gray-600  text-sm tracking-wide ">Tonnage</p>
          <p className="text-gray-800 font-semibold italic text-sm">
            {" "}
            {ton && ton[ton?.length - 1]} tons
          </p>
          <div className="px-2 my-2">
            <ProgressBar
              completed={ton && ton[ton?.length - 1]}
              bgColor="gray"
              height="10px"
              labelClassName="hidden"
            />
          </div>
        </div>
        <div className="flex py-2 flex-col col-span-full sm:col-span-6 xl:col-span-2  dark:bg-slate-800 shadow-lg rounded-sm border border-black/30 dark:border-slate-700 pb-2s">
          <p className=" text-gray-600  text-sm tracking-wide ">Delay</p>
          <p className="text-gray-800 font-semibold italic text-sm">
            {delay && delay[delay?.length - 1]} Mins
          </p>
          <div className="px-2 my-2">
            <ProgressBar
              completed={delay && delay[delay?.length - 1]}
              bgColor="orange"
              height="10px"
              labelClassName="hidden"
            />
          </div>
        </div>
        <div className="flex py-2 flex-col col-span-full sm:col-span-6 xl:col-span-2  dark:bg-slate-800 shadow-lg rounded-sm border border-black/30 dark:border-slate-700 pb-2s">
          <p className=" text-gray-600  text-sm tracking-wide ">Rejects</p>
          <p className="text-gray-800 font-semibold italic text-sm">
            {reject && reject[reject?.length - 1]} Rejects
          </p>
          <div className="px-2 my-2">
            <ProgressBar
              completed={reject && reject[reject?.length - 1]}
              bgColor="red"
              height="10px"
              labelClassName="hidden"
            />
          </div>
        </div>
        <div className="flex py-2 flex-col col-span-full sm:col-span-6 xl:col-span-2 dark:bg-slate-800 shadow-lg rounded-sm border border-black/30 dark:border-slate-700 pb-2s">
          <p className=" text-gray-600  text-sm tracking-wide ">Average</p>
          <p className="text-gray-800 font-semibold italic text-sm">
            2268 tons/day
          </p>
          <div className="px-2 my-2">
            <ProgressBar
              completed={72}
              bgColor="blue"
              height="10px"
              labelClassName="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardMain;

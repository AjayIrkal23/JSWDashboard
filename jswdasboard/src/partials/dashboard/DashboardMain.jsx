import React from "react";
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

function DashboardMain() {
  const date = new Date(Date.now()).toDateString();
  const chartData = {
    labels: [
      "12-01-2020",
      "01-01-2021",
      "02-01-2021",
      "03-01-2021",
      "04-01-2021",
      "05-01-2021",
      "06-01-2021",
      "07-01-2021",
      "08-01-2021",
      "09-01-2021",
      "10-01-2021",
      "11-01-2021",
      "12-01-2021",
      "01-01-2022",
      "02-01-2022",
      "03-01-2022",
      "04-01-2022",
      "05-01-2022",
      "06-01-2022",
      "07-01-2022",
      "08-01-2022",
      "09-01-2022",
      "10-01-2022",
      "11-01-2022",
      "12-01-2022",
      "01-01-2023",
    ],
    datasets: [
      // Indigo line
      {
        data: [
          732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391, 192,
          154, 273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532,
        ],
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
        data: [
          600, 120, 52, 365, 122, 88, 349, 349, 21, 342, 556, 335, 114, 551,
          225, 669, 471, 222, 126, 263, 349, 252, 423, 622, 470, 532,
        ],
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
        data: [
          600,
          669,
          471,
          222,
          126,
          263,
          349,
          252,
          423,
          622,
          470,
          532,
          120,
          52,
          225,
          20,
          52,
          365,
          122,
          88,
          349,
          349,
          21,
          342,
          556,
          335,
          114,
          551,
          ,
        ],
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
        data: [
          600,
          669,
          445,
          222,
          225,
          113,
          112,
          252,
          423,
          622,
          470,
          556,
          120,
          52,
          225,
          20,
          332,
          224,
          112,
          88,
          349,
          575,
          544,
          775,
          44,
          667,
          55,
          114,
          ,
        ],
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
          <p className="text-gray-800 font-semibold italic text-sm">65 coils</p>
          <div className="px-2 my-2">
            <ProgressBar
              completed={80}
              bgColor="green"
              height="10px"
              labelClassName="hidden"
            />
          </div>
        </div>
        <div className="flex py-2 flex-col col-span-full sm:col-span-6 xl:col-span-2  dark:bg-slate-800 shadow-lg rounded-sm border border-black/30 dark:border-slate-700 pb-2s">
          <p className=" text-gray-600  text-sm tracking-wide ">Tonnage</p>
          <p className="text-gray-800 font-semibold italic text-sm">233 tons</p>
          <div className="px-2 my-2">
            <ProgressBar
              completed={32}
              bgColor="gray"
              height="10px"
              labelClassName="hidden"
            />
          </div>
        </div>
        <div className="flex py-2 flex-col col-span-full sm:col-span-6 xl:col-span-2  dark:bg-slate-800 shadow-lg rounded-sm border border-black/30 dark:border-slate-700 pb-2s">
          <p className=" text-gray-600  text-sm tracking-wide ">Delay</p>
          <p className="text-gray-800 font-semibold italic text-sm">36 Hours</p>
          <div className="px-2 my-2">
            <ProgressBar
              completed={25}
              bgColor="orange"
              height="10px"
              labelClassName="hidden"
            />
          </div>
        </div>
        <div className="flex py-2 flex-col col-span-full sm:col-span-6 xl:col-span-2  dark:bg-slate-800 shadow-lg rounded-sm border border-black/30 dark:border-slate-700 pb-2s">
          <p className=" text-gray-600  text-sm tracking-wide ">Rejects</p>
          <p className="text-gray-800 font-semibold italic text-sm">
            29 slabs/coils
          </p>
          <div className="px-2 my-2">
            <ProgressBar
              completed={68}
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

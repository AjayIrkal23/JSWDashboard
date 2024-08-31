import { Modal } from "@mui/material";
import React, { useContext, useState } from "react";

// Import utilities
import { tailwindConfig } from "../utils/Utils";
import BarChart01 from "../charts/BarChart01";
import DelayChart from "../charts/DelayChart";
import FRCCharts from "../charts/FRCCharts";
import { AccountContext } from "../context/context";
const FRC = ({ open, setOpen }) => {
  const { period, setPeriod, data, setMins, mins, rmBarThickness } =
    useContext(AccountContext);

  console.log(data?.RollChange);

  const chartData = {
    labels: [["RM", "RollChange", "Delay"]],
    datasets: [
      // Light blue bars
      {
        data: [data?.RollChange?.rmRollChange],
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Light blue bars

      // Blue bars
    ],
  };

  const chartData1 = {
    labels: [["FM", "RollChange", "Delay"]],
    datasets: [
      // Light blue bars
      {
        data: [data?.RollChange?.fmRollChange],
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Light blue bars

      // Blue bars
    ],
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute  bg-white outline-none top-[5%] left-[50%] -translate-x-[50%] flex">
          <div className="flex gap-12 ">
            <div className="flex flex-col bg-white border rounded-sm shadow-lg col-span-full sm:col-span-6 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  RM Rollchange Visualization
                </h2>
              </header>
              {/* Chart built with Chart.js 3 */}
              {/* Change the height attribute to adjust the chart height */}
              <DelayChart
                data={chartData}
                width={900}
                height={548}
                frc={true}
              />
            </div>
            <div className="flex flex-col bg-white border rounded-sm shadow-lg col-span-full sm:col-span-6 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  FM Rollchange Visualization
                </h2>
              </header>
              {/* Chart built with Chart.js 3 */}
              {/* Change the height attribute to adjust the chart height */}
              <DelayChart
                data={chartData1}
                width={900}
                height={548}
                frc={true}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FRC;

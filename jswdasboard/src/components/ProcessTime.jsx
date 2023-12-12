import { Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

// Import utilities
import { tailwindConfig } from "../utils/Utils";
import BarChart01 from "../charts/BarChart01";

import GapChart from "../charts/GapChart";
import ProcessChart from "../charts/ProcessChart";
import { AccountContext } from "../context/context";
import { ToMins, roundOff } from "../utils/roundoff";
import ProcessTimeChart from "../charts/ProcessTimeChart";
const ProcessTime = ({ open, setOpen }) => {
  const [chartDataEntry, setChartData] = useState();
  const { period, setPeriod, data, mins } = useContext(AccountContext);

  function Process() {
    let arr = [];
    if (period == "Last Coil" || period.customp) {
      arr.push(data?.Excel?.f_SSPProcessTimeAct?.toFixed(2));
      arr.push(data?.Excel?.f_R1ProcessTimeAct?.toFixed(2));
      arr.push(data?.Excel?.f_R2ProcessTimeAct?.toFixed(2));
      arr.push((data?.pacing?.f_FMProcessTimeAct).toFixed(2));

      setChartData(arr);
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let arr = [];
      let total1 =
        data?.Excel?.length > 1 &&
        data?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_SSPProcessTimeAct,
          0
        );
      let total2 =
        data?.Excel?.length > 1 &&
        data?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_R1ProcessTimeAct,
          0
        );
      let total3 =
        data?.Excel?.length > 1 &&
        data?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_R2ProcessTimeAct,
          0
        );
      let total4 =
        data?.pacing?.length > 1 &&
        data?.pacing?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_FMProcessTimeAct,
          0
        );

      if (mins) {
        arr.push(roundOff(ToMins(total1 / data?.Excel?.length)));
        arr.push(roundOff(ToMins(total2 / data?.Excel?.length)));
        arr.push(roundOff(ToMins(total3 / data?.Excel?.length)));
        arr.push(roundOff(ToMins(total4 / data?.Excel?.length)));
      } else {
        arr.push(roundOff(total1?.toFixed(2) / data?.Excel?.length));
        arr.push(roundOff(total2?.toFixed(2) / data?.Excel?.length));
        arr.push(roundOff(total3?.toFixed(2) / data?.Excel?.length));
        arr.push(roundOff(total4?.toFixed(2) / data?.Excel?.length));
      }

      setChartData(arr);
    } else {
      return "--";
    }
  }

  useEffect(() => {
    Process();
  }, [data]);

  const chartData = {
    labels: [
      ["SSP", "Process", "Time"],
      ["R1", "Process", "Time"],
      ["R2", "Process", "Time"],
      ["FM", "Process", "Time"],
    ],
    datasets: [
      // Light blue bars
      {
        data: chartDataEntry,
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
          <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                Process Time Visualization
              </h2>
            </header>
            {/* Chart built with Chart.js 3 */}
            {/* Change the height attribute to adjust the chart height */}
            <ProcessTimeChart data={chartData} width={1800} height={800} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProcessTime;

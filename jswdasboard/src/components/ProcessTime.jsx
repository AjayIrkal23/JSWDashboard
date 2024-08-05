import { Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { tailwindConfig } from "../utils/Utils";
import { AccountContext } from "../context/context";
import { ToMins, roundOff } from "../utils/roundoff";
import ProcessTimeChart from "../charts/ProcessTimeChart";

const ProcessTime = ({ open, setOpen }) => {
  const [chartDataEntry, setChartData] = useState([]);
  const { period, data, mins } = useContext(AccountContext);

  useEffect(() => {
    if (data) {
      processData();
    }
  }, [data]);

  const processData = () => {
    if (!data || !data.Excel || !data.pacing) {
      console.warn("Data not available");
      setChartData([]);
      return;
    }

    const arr = [];
    if (period === "Last Coil" || period.customp) {
      arr.push(data.Excel.f_SSPProcessTimeAct?.toFixed(2));
      arr.push(data.Excel.f_R1ProcessTimeAct?.toFixed(2));
      arr.push(data.Excel.f_R2ProcessTimeAct?.toFixed(2));
      arr.push(data.pacing.f_FMProcessTimeAct?.toFixed(2));
    } else if (
      ["Last 5 Coil", "Last Hour", "Last Day"].includes(period) ||
      period?.date
    ) {
      const total1 = sumField(data.Excel, "f_SSPProcessTimeAct");
      const total2 = sumField(data.Excel, "f_R1ProcessTimeAct");
      const total3 = sumField(data.Excel, "f_R2ProcessTimeAct");
      const total4 = sumField(data.pacing, "f_FMProcessTimeAct");

      if (mins) {
        arr.push(roundOff(ToMins(total1 / data.Excel.length)));
        arr.push(roundOff(ToMins(total2 / data.Excel.length)));
        arr.push(roundOff(ToMins(total3 / data.Excel.length)));
        arr.push(roundOff(ToMins(total4 / data.Excel.length)));
      } else {
        arr.push(roundOff(total1 / data.Excel.length));
        arr.push(roundOff(total2 / data.Excel.length));
        arr.push(roundOff(total3 / data.Excel.length));
        arr.push(roundOff(total4 / data.Excel.length));
      }
    } else {
      arr.push("--", "--", "--", "--");
    }

    setChartData(arr);
  };

  const sumField = (array, field) => {
    if (!array.length) return 0;
    return array.reduce((acc, curr) => acc + (curr[field] || 0), 0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const chartData = {
    labels: [
      ["SSP", "Process", "Time"],
      ["R1", "Process", "Time"],
      ["R2", "Process", "Time"],
      ["FM", "Process", "Time"]
    ],
    datasets: [
      {
        data: chartDataEntry,
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      }
    ]
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute bg-white outline-none top-[5%] left-[50%] -translate-x-[50%] flex">
        <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              Process Time Visualization
            </h2>
          </header>
          <ProcessTimeChart data={chartData} width={1800} height={800} />
        </div>
      </div>
    </Modal>
  );
};

export default ProcessTime;

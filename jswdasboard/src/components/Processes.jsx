import { Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { tailwindConfig } from "../utils/Utils";
import ProcessChart from "../charts/ProcessChart";
import { AccountContext } from "../context/context";
import { ToMins } from "../utils/roundoff";

const Processes = ({ open, setOpen }) => {
  const [chartDataEntry, setChartData] = useState();
  const { period, data, mins } = useContext(AccountContext);

  function Process() {
    let arr = [];
    if (period === "Last Coil" || period.customp) {
      arr.push(data?.Excel?.f_SSPProcessTimeDelay?.toFixed(2));
      arr.push(data?.Excel?.f_R1ProcessTimeDelay?.toFixed(2));
      arr.push(data?.Excel?.f_R2ProcessTimeDelay?.toFixed(2));
      arr.push(
        (
          data?.pacing?.f_FMProcessTimePred - data?.pacing?.f_FMProcessTimeAct
        )?.toFixed(2)
      );
      setChartData(arr);
    } else if (
      ["Last 5 Coil", "Last Hour", "Last Day"].includes(period) ||
      period?.date
    ) {
      let total1 = data?.Excel?.reduce(
        (acc, curr) => acc + curr.f_SSPProcessTimeDelay,
        0
      );
      let total2 = data?.Excel?.reduce(
        (acc, curr) => acc + curr.f_R1ProcessTimeDelay,
        0
      );
      let total3 = data?.Excel?.reduce(
        (acc, curr) => acc + curr.f_R2ProcessTimeDelay,
        0
      );
      let total4 = data?.pacing?.reduce(
        (acc, curr) => acc + curr.f_FMProcessTimePred,
        0
      );
      let total5 = data?.pacing?.reduce(
        (acc, curr) => acc + curr.f_FMProcessTimeAct,
        0
      );

      if (mins) {
        let total6 = total4 - total5;
        arr.push(ToMins(total1));
        arr.push(ToMins(total2));
        arr.push(ToMins(total3));
        arr.push(ToMins(total6));
      } else {
        arr.push(total1?.toFixed(2));
        arr.push(total2?.toFixed(2));
        arr.push(total3?.toFixed(2));
        arr.push((total4 - total5)?.toFixed(2));
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
      ["SSP", "Process", "Delay", "Time"],
      ["R1", "Process", "Delay", "Time"],
      ["R2", "Process", "Delay", "Time"],
      ["FM", "Process", "Delay", "Time"]
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

  const handleClose = () => {
    setOpen(false);
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
              Process Time Delay Visualization
            </h2>
          </header>
          <ProcessChart data={chartData} width={1800} height={800} />
        </div>
      </div>
    </Modal>
  );
};

export default Processes;

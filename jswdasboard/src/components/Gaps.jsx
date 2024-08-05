import { Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

// Import utilities
import { tailwindConfig } from "../utils/Utils";
import GapChart from "../charts/GapChart";
import { AccountContext } from "../context/context";
import { ToMins, roundOff } from "../utils/roundoff";

const Gaps = ({ open, setOpen }) => {
  const [chartDataEntry, setChartData] = useState([]);
  const { period, data, mins } = useContext(AccountContext);

  const handleClose = () => {
    setOpen(false);
  };

  const calculateAverage = (total, length) => roundOff(total / length);

  const processData = (dataField) => {
    if (period === "Last Coil" || period.customp) {
      return roundOff(data?.Excel?.[dataField]?.toFixed(2));
    } else if (
      period === "Last 5 Coil" ||
      period === "Last Hour" ||
      period === "Last Day" ||
      period?.date
    ) {
      const total = data?.Excel?.reduce(
        (accumulator, currentValue) => accumulator + currentValue[dataField],
        0
      );
      return mins
        ? ToMins(calculateAverage(total, data?.Excel?.length))
        : calculateAverage(total, data?.Excel?.length);
    }
    return "--";
  };

  useEffect(() => {
    if (data) {
      const gapData = [
        processData("f_SSPGapTimeAct"),
        processData("f_R1GapTimeAct"),
        processData("f_R2GapTimeAct"),
        processData("f_F1GapTimeAct")
      ];
      setChartData(gapData);
      console.debug("Gap data processed:", gapData);
    }
  }, [data, period, mins]);

  const chartData = {
    labels: [
      ["SSP", "Gap", "Time"],
      ["R1", "Gap", "Time"],
      ["R2", "Gap", "Time"],
      ["FM", "Gap", "Time"]
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
              Gap Visualization
            </h2>
          </header>
          <GapChart data={chartData} width={1800} height={800} />
        </div>
      </div>
    </Modal>
  );
};

export default Gaps;

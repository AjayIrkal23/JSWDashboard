import { Modal } from "@mui/material";
import React, { useState } from "react";

// Import utilities
import { tailwindConfig } from "../utils/Utils";
import DelayChart from "../charts/DelayChart";

const FRC = ({ open, setOpen }) => {
  const [data, setData] = useState([5, 7, 8, 6, 4, 9, 4, 5]);

  const chartDataRM = {
    labels: [["RM", "RollChange", "Delay"]],
    datasets: [
      {
        data: data,
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      }
    ]
  };

  const chartDataFM = {
    labels: [["FM", "RollChange", "Delay"]],
    datasets: [
      {
        data: data,
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
      <div className="absolute bg-white outline-none top-[5%] left-[50%] -translate-x-[50%] flex flex-col gap-12 p-6">
        <div className="flex flex-col bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              RM Rollchange Visualization
            </h2>
          </header>
          <DelayChart data={chartDataRM} width={900} height={548} frc={true} />
        </div>

        <div className="flex flex-col bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              FM Rollchange Visualization
            </h2>
          </header>
          <DelayChart data={chartDataFM} width={900} height={548} frc={true} />
        </div>
      </div>
    </Modal>
  );
};

export default FRC;

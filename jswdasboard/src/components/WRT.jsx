import { Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { tailwindConfig } from "../utils/Utils";
import ProcessStacked from "../charts/ProcessChartstacked";
import { AccountContext } from "../context/context";

const GRT = ({ open, setOpen }) => {
  const { period, data: EP } = useContext(AccountContext);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: Array.from({ length: 10 }, (_, idx) => ({
      data: [],
      label: `The Number of WRT ${idx}`,
      backgroundColor: tailwindConfig().theme.colors[`color${idx}`][700],
      hoverBackgroundColor: tailwindConfig().theme.colors[`color${idx}`][800],
      barPercentage: 0.66,
      categoryPercentage: 0.66
    }))
  });

  useEffect(() => {
    if (EP) calculateGRT();
  }, [EP]);

  const getLabels = () => {
    const labels = [];
    for (let i = 0; i < 28; i++) {
      labels.push(i * 5);
    }
    return labels;
  };

  const calculateGRT = () => {
    const start = 0;
    const end = 140;
    const interval = 5;
    const newDatasets = Array.from({ length: 10 }, () => []);

    for (let i = start; i < end; i += interval) {
      const plus5 = i + interval;

      EP?.pacing?.forEach((currentValue) => {
        const gapTime = parseFloat(currentValue.f_F1GapTimeAct?.toFixed(1));
        const wrtIdx = currentValue.i_WRTIdx;

        if (gapTime >= i && gapTime <= plus5) {
          newDatasets[wrtIdx]?.push(1);
        } else {
          newDatasets[wrtIdx]?.push(0);
        }
      });
    }

    setChartData({
      labels: getLabels(),
      datasets: newDatasets.map((data, idx) => ({
        ...chartData.datasets[idx],
        data
      }))
    });
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
              WRT Trend
            </h2>
          </header>
          <ProcessStacked data={chartData} width={1800} height={800} />
        </div>
      </div>
    </Modal>
  );
};

export default GRT;

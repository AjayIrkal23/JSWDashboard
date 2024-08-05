import { Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

// Import utilities
import { tailwindConfig } from "../utils/Utils";
import ProcessStacked from "../charts/ProcessStacked";
import { AccountContext } from "../context/context";

const GRT = ({ open, setOpen }) => {
  const { period, data: EP } = useContext(AccountContext);
  const [grtData, setGrtData] = useState(Array(26).fill([]));

  useEffect(() => {
    if (EP) {
      processData();
    }
  }, [EP]);

  const handleClose = () => {
    setOpen(false);
  };

  const getLabels = () => {
    const arr = [];
    for (let i = 0; i <= 135; i += 5) {
      arr.push(i);
    }
    return arr;
  };

  const processData = () => {
    const newGrtData = Array(26).fill([]);

    const processPacing = (index, plus5) => {
      EP?.pacing?.forEach((entry) => {
        const f1GapTime = parseFloat(entry.f_F1GapTimeAct?.toFixed(1));

        if (
          (f1GapTime >= index && f1GapTime <= plus5) ||
          (f1GapTime >= 135 && index >= 135)
        ) {
          const grtIdx = entry.i_grtIdx;

          if (grtIdx >= 0 && grtIdx < 26) {
            newGrtData[grtIdx].push(1);
          }
        }
      });
    };

    for (let index = 0; index <= 135; index += 5) {
      let plus5 = index + 5;
      processPacing(index, plus5);
    }

    setGrtData(newGrtData);
    console.debug("Processed GRT data:", newGrtData);
  };

  const chartData3 = {
    labels: getLabels(),
    datasets: grtData.map((data, index) => ({
      data,
      label: `The Number of GRT ${index}`,
      backgroundColor:
        tailwindConfig().theme.colors.blue[700 + ((index * 100) % 900)],
      hoverBackgroundColor:
        tailwindConfig().theme.colors.blue[800 + ((index * 100) % 900)],
      barPercentage: 0.66,
      categoryPercentage: 0.66
    }))
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
              GRT Trend
            </h2>
          </header>
          <ProcessStacked data={chartData3} width={1800} height={800} />
        </div>
      </div>
    </Modal>
  );
};

export default GRT;

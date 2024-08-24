import { Modal } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { tailwindConfig } from "../utils/Utils";
import DelayChart from "../charts/DelayChart";
import { AccountContext } from "../context/context";
import { ToMins, roundOff } from "../utils/roundoff";

const Delays = ({ open, setOpen }) => {
  const { period, data, mins } = useContext(AccountContext);
  const [chartDataEntry, setChartDataEntry] = useState([]);

  const calculateDelays = () => {
    if (!data) return [];

    const delayKeys = [
      "f_L2L1ExtRdyTimeDiff",
      "f_ExtractCycleTimeDiff",
      "f_FCDTravelTmeDelay",
      "f_SSPR1TravelTimeDelay",
      "f_R1ProcessTimeDelay",
      "f_R1R2TravelTimeDelay",
      "f_R2ProcessTimeDelay",
      "f_R2FEntTravelTimeDelay",
      "f_FCE1SSPTravelTimeDelay"
    ];

    if (period === "Last Coil" || period.customp) {
      return delayKeys.map((key) => {
        const value = data?.Excel?.[key] || data?.pacing?.[key];
        return roundOff(mins ? ToMins(value) : value?.toFixed(2));
      });
    }

    const sumDelays = (key) =>
      data?.Excel?.reduce((acc, cur) => acc + cur[key], 0) || 0;

    const sumPacingDelays = (key) =>
      data?.pacing?.reduce((acc, cur) => acc + cur[key], 0) || 0;

    const totalDelays = delayKeys.map((key) => {
      const total =
        key === "f_FCE1SSPTravelTimeDelay"
          ? sumPacingDelays(key)
          : sumDelays(key);
      return roundOff(mins ? ToMins(total) : total?.toFixed(2));
    });

    return totalDelays;
  };

  useEffect(() => {
    const calculatedDelays = calculateDelays();
    setChartDataEntry(calculatedDelays);
  }, [data, period, mins]);

  const chartData = useMemo(
    () => ({
      labels: [
        ["FCEWISE", "Discharge", "Delay"],
        ["FCEWISE", "Extractor", "Delay"],
        ["FCE", "slip", "Delay"],
        ["R1", "Travel", "Delay"],
        ["R1", "process", "delay"],
        ["R2", "Travel", "delay"],
        ["R2", "Process", "Delay"],
        ["FME", "Travel", "Delay"],
        ["FCE ", "To", "SSP", "Travel", "Delay"]
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
    }),
    [chartDataEntry]
  );

  const handleClose = () => setOpen(false);

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
              Delay Visualization
            </h2>
          </header>
          <DelayChart data={chartData} width={1800} height={800} />
        </div>
      </div>
    </Modal>
  );
};

export default Delays;

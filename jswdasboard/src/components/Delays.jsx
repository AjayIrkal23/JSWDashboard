import { Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

// Import utilities
import { tailwindConfig } from "../utils/Utils";
import DelayChart from "../charts/DelayChart";
import { AccountContext } from "../context/context";
import { ToMins, roundOff } from "../utils/roundoff";

const Delays = ({ open, setOpen }) => {
  const [chartDataEntry, setChartData] = useState([]);
  const { period, data, mins } = useContext(AccountContext);

  useEffect(() => {
    if (data) {
      const delayData = calculateDelayData();
      setChartData(delayData);
    }
  }, [data]);

  const calculateDelayData = () => {
    const arr = [];
    const roundingFunction = mins ? ToMins : (val) => val;
    const addDelay = (value) => {
      arr.push(roundOff(roundingFunction(value?.toFixed(2))));
    };

    if (period === "Last Coil" || period.customp) {
      addDelay(data?.Excel?.f_L2L1ExtRdyTimeDiff);
      addDelay(data?.Excel?.f_ExtractCycleTimeDiff);
      addDelay(data?.Excel?.f_FCDTravelTmeDelay);
      addDelay(data?.Excel?.f_SSPR1TravelTimeDelay);
      addDelay(data?.Excel?.f_R1ProcessTimeDelay);
      addDelay(data?.Excel?.f_R1R2TravelTimeDelay);
      addDelay(data?.Excel?.f_R2ProcessTimeDelay);
      addDelay(data?.Excel?.f_R2FEntTravelTimeDelay);
      addDelay(data?.pacing?.f_FCE1SSPTravelTimeDelay);
    } else if (
      period === "Last 5 Coil" ||
      period === "Last Hour" ||
      period === "Last Day" ||
      period?.date
    ) {
      const calculateTotalDelay = (key) => {
        return data?.Excel?.reduce(
          (accumulator, currentValue) => accumulator + currentValue[key],
          0
        );
      };

      addDelay(calculateTotalDelay("f_L2L1ExtRdyTimeDiff"));
      addDelay(calculateTotalDelay("f_ExtractCycleTimeDiff"));
      addDelay(calculateTotalDelay("f_FCDTravelTmeDelay"));
      addDelay(calculateTotalDelay("f_SSPR1TravelTimeDelay"));
      addDelay(calculateTotalDelay("f_R1ProcessTimeDelay"));
      addDelay(calculateTotalDelay("f_R1R2TravelTimeDelay"));
      addDelay(calculateTotalDelay("f_R2ProcessTimeDelay"));
      addDelay(calculateTotalDelay("f_R2FEntTravelTimeDelay"));

      const pacingTotalDelay = data?.pacing?.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.f_FCE1SSPTravelTimeDelay,
        0
      );
      addDelay(pacingTotalDelay);
    }
    return arr;
  };

  const chartData = {
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

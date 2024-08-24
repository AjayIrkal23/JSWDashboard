import { Modal } from "@mui/material";
import React, { useContext, useEffect, useState, useMemo } from "react";

// Import utilities
import { tailwindConfig } from "../utils/Utils";
import ProcessStacked from "../charts/ProcessChartstacked";
import { AccountContext } from "../context/context";

const Processes = ({ open, setOpen }) => {
  const { period, data: EP } = useContext(AccountContext);

  const [bottleNeckData, setBottleNeckData] = useState({
    one: [],
    two: [],
    three: [],
    four: [],
    five: [],
    six: [],
    seven: []
  });

  const get135Labels = useMemo(() => {
    const arr = [];
    for (let index = 0; index <= 135; index += 5) {
      arr.push(index);
    }
    return arr;
  }, []);

  useEffect(() => {
    if (EP) {
      generateBottleNeckData();
    }
  }, [EP, period]);

  const generateBottleNeckData = () => {
    const data = {
      one: [],
      two: [],
      three: [],
      four: [],
      five: [],
      six: [],
      seven: []
    };

    const updateData = (currentValue, index, plus5) => {
      const bottleNeck = currentValue.c_BottleNeck?.trim();
      if (
        currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
        currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
      ) {
        if (bottleNeck === "FCE") data.one.push(1);
        if (bottleNeck === "HSB") data.two.push(1);
        if (bottleNeck === "R1R2") data.three.push(1);
        if (bottleNeck === "FM") data.four.push(1);
        if (bottleNeck === "DC") data.five.push(1);
        if (bottleNeck === "R1") data.six.push(1);
        if (bottleNeck === "R2") data.seven.push(1);
      } else if (
        currentValue.f_F1GapTimeAct?.toFixed(2) >= 135 &&
        index >= 135
      ) {
        updateData(currentValue, 135, 140);
      }
    };

    EP?.pacing?.forEach((currentValue) => {
      for (let index = 0; index < 140; index += 5) {
        updateData(currentValue, index, index + 5);
      }
    });

    setBottleNeckData(data);
  };

  const chartData3 = useMemo(
    () => ({
      labels: get135Labels,
      datasets: [
        {
          data: bottleNeckData.one,
          label: "BOTTLE NECK [FCE]",
          backgroundColor: tailwindConfig().theme.colors.orange[700]
        },
        {
          data: bottleNeckData.two,
          label: "BOTTLE NECK [HSB]",
          backgroundColor: tailwindConfig().theme.colors.gray[300]
        },
        {
          data: bottleNeckData.six,
          label: "BOTTLE NECK [R1]",
          backgroundColor: tailwindConfig().theme.colors.blue[700]
        },
        {
          data: bottleNeckData.seven,
          label: "BOTTLE NECK [R2]",
          backgroundColor: tailwindConfig().theme.colors.yellow[700]
        },
        {
          data: bottleNeckData.three,
          label: "BOTTLE NECK [R1R2]",
          backgroundColor: tailwindConfig().theme.colors.gray[700]
        },
        {
          data: bottleNeckData.four,
          label: "BOTTLE NECK [FM]",
          backgroundColor: tailwindConfig().theme.colors.green[700]
        },
        {
          data: bottleNeckData.five,
          label: "BOTTLE NECK [DC]",
          backgroundColor: tailwindConfig().theme.colors.purple[700]
        }
      ]
    }),
    [bottleNeckData, get135Labels]
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
              Bottle Neck Visualization
            </h2>
          </header>
          <ProcessStacked data={chartData3} width={1800} height={800} />
        </div>
      </div>
    </Modal>
  );
};

export default Processes;

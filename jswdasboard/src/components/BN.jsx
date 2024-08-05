import React, { useContext, useEffect, useState, useCallback } from "react";
import { Modal } from "@mui/material";
import { tailwindConfig } from "../utils/Utils";
import ProcessStacked from "../charts/ProcessChartstacked";
import { AccountContext } from "../context/context";

const Processes = ({ open, setOpen }) => {
  const { period, data: EP } = useContext(AccountContext);

  const [one, setOne] = useState([]);
  const [two, setTwo] = useState([]);
  const [three, setThree] = useState([]);
  const [four, setFour] = useState([]);
  const [five, setFive] = useState([]);
  const [six, setSix] = useState([]);
  const [seven, setSeven] = useState([]);

  const get135Labels = useCallback(() => {
    let arr = [];
    for (let index = 0; index < 100; index++) {
      if (index * 5 !== 140) {
        arr.push(index * 5);
      } else {
        break;
      }
    }
    return arr;
  }, []);

  useEffect(() => {
    BottleNeckData();
  }, [EP, period]);

  const BottleNeckData = useCallback(() => {
    if (!EP?.pacing) {
      console.warn("EP.pacing data is missing");
      return;
    }

    const start = 0;
    const end = 140;
    const arr1 = [];
    const arr2 = [];
    const arr3 = [];
    const arr4 = [];
    const arr5 = [];
    const arr6 = [];
    const arr7 = [];

    for (let index = start; index < end; index += 5) {
      const plus5 = index + 5;

      const updateArrays = (condition, arr) => {
        if (condition) {
          arr.push(1);
        } else {
          arr.push(0);
        }
      };

      EP.pacing.forEach((currentValue) => {
        const f1GapTimeAct = parseFloat(currentValue.f_F1GapTimeAct).toFixed(1);
        if (f1GapTimeAct >= index && f1GapTimeAct <= plus5) {
          updateArrays(currentValue.c_BottleNeck.trim() === "FCE", arr1);
          updateArrays(currentValue.c_BottleNeck.trim() === "R1", arr6);
          updateArrays(currentValue.c_BottleNeck.trim() === "R2", arr7);
          updateArrays(currentValue.c_BottleNeck.trim() === "HSB", arr2);
          updateArrays(currentValue.c_BottleNeck.trim() === "R1R2", arr3);
          updateArrays(currentValue.c_BottleNeck.trim() === "FM", arr4);
          updateArrays(currentValue.c_BottleNeck.trim() === "DC", arr5);
        } else if (f1GapTimeAct >= 135 && f1GapTimeAct <= plus5) {
          updateArrays(currentValue.c_BottleNeck.trim() === "FCE", arr1);
          updateArrays(currentValue.c_BottleNeck.trim() === "HSB", arr2);
          updateArrays(currentValue.c_BottleNeck.trim() === "R1R2", arr3);
          updateArrays(currentValue.c_BottleNeck.trim() === "FM", arr4);
          updateArrays(currentValue.c_BottleNeck.trim() === "DC", arr5);
        }
      });
    }

    setOne(arr1);
    setTwo(arr2);
    setThree(arr3);
    setFour(arr4);
    setFive(arr5);
    setSix(arr6);
    setSeven(arr7);
  }, [EP, period]);

  const chartData3 = {
    labels: get135Labels(),
    datasets: [
      {
        data: one,
        label: "BOTTLE NECK [FCE]",
        backgroundColor: tailwindConfig().theme.colors.orange[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.orange[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: two,
        label: "BOTTLE NECK [HSB]",
        backgroundColor: tailwindConfig().theme.colors.gray[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.gray[300],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: six,
        label: "BOTTLE NECK [R1]",
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: seven,
        label: "BOTTLE NECK [R2]",
        backgroundColor: tailwindConfig().theme.colors.yellow[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: three,
        label: "BOTTLE NECK [R1R2]",
        backgroundColor: tailwindConfig().theme.colors.gray[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.gray[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: four,
        label: "BOTTLE NECK [FM]",
        backgroundColor: tailwindConfig().theme.colors.green[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: five,
        label: "BOTTLE NECK [DC]",
        backgroundColor: tailwindConfig().theme.colors.purple[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.purple[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      }
    ]
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

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

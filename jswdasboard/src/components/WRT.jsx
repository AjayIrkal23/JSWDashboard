import { Modal } from "@mui/material";
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo
} from "react";

// Import utilities
import { tailwindConfig } from "../utils/Utils";
import ProcessStacked from "../charts/ProcessChartstacked";
import { AccountContext } from "../context/context";

const GRT = ({ open, setOpen }) => {
  const { period, data: EP } = useContext(AccountContext);

  const [chartData, setChartData] = useState({
    zero: [],
    one: [],
    two: [],
    three: [],
    four: [],
    five: [],
    six: [],
    seven: [],
    eight: [],
    nine: []
  });

  useEffect(() => {
    generateChartData();
  }, [EP]);

  const get135Labels = useCallback(() => {
    const arr = [];
    for (let index = 0; index < 100; index++) {
      const label = index * 5;
      if (label !== 140) arr.push(label);
      else break;
    }
    return arr;
  }, []);

  const generateChartData = useCallback(() => {
    const start = 0;
    const end = 140;
    const newChartData = {
      zero: [],
      one: [],
      two: [],
      three: [],
      four: [],
      five: [],
      six: [],
      seven: [],
      eight: [],
      nine: []
    };

    for (let index = start; index < end; index += 5) {
      const plus5 = index + 5;

      const accumulateData = (wrtIdx) =>
        EP?.pacing?.reduce((accumulator, currentValue) => {
          const gapTime = currentValue.f_F1GapTimeAct?.toFixed(1);
          const isInRange = gapTime >= index && gapTime <= plus5;
          const isBeyondRange =
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index && index >= 135;
          if (
            (isInRange || isBeyondRange) &&
            currentValue.i_WRTIdx === wrtIdx
          ) {
            accumulator += 1;
          }
          return accumulator;
        }, 0);

      newChartData.zero.push(accumulateData(0));
      newChartData.one.push(accumulateData(1));
      newChartData.two.push(accumulateData(2));
      newChartData.three.push(accumulateData(3));
      newChartData.four.push(accumulateData(4));
      newChartData.five.push(accumulateData(5));
      newChartData.six.push(accumulateData(6));
      newChartData.seven.push(accumulateData(7));
      newChartData.eight.push(accumulateData(8));
      newChartData.nine.push(accumulateData(9));
    }

    setChartData(newChartData);
  }, [EP]);

  const chartData3 = useMemo(
    () => ({
      labels: get135Labels(),
      datasets: [
        {
          data: chartData.zero,
          label: "The Number of WRT 0",
          backgroundColor: tailwindConfig().theme.colors.orange[700],
          hoverBackgroundColor: tailwindConfig().theme.colors.orange[800],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        },
        {
          data: chartData.one,
          label: "The Number of WRT 1",
          backgroundColor: tailwindConfig().theme.colors.gray[300],
          hoverBackgroundColor: tailwindConfig().theme.colors.gray[300],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        },
        {
          data: chartData.two,
          label: "The Number of WRT 2",
          backgroundColor: tailwindConfig().theme.colors.blue[700],
          hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        },
        {
          data: chartData.three,
          label: "The Number of WRT 3",
          backgroundColor: tailwindConfig().theme.colors.yellow[700],
          hoverBackgroundColor: tailwindConfig().theme.colors.yellow[800],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        },
        {
          data: chartData.four,
          label: "The Number of WRT 4",
          backgroundColor: tailwindConfig().theme.colors.green[700],
          hoverBackgroundColor: tailwindConfig().theme.colors.green[800],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        },
        {
          data: chartData.five,
          label: "The Number of WRT 5",
          backgroundColor: tailwindConfig().theme.colors.blue[100],
          hoverBackgroundColor: tailwindConfig().theme.colors.blue[200],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        },
        {
          data: chartData.six,
          label: "The Number of WRT 6",
          backgroundColor: tailwindConfig().theme.colors.pink[700],
          hoverBackgroundColor: tailwindConfig().theme.colors.pink[800],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        },
        {
          data: chartData.seven,
          label: "The Number of WRT 7",
          backgroundColor: tailwindConfig().theme.colors.yellow[200],
          hoverBackgroundColor: tailwindConfig().theme.colors.yellow[300],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        },
        {
          data: chartData.eight,
          label: "The Number of WRT 8",
          backgroundColor: tailwindConfig().theme.colors.blue[200],
          hoverBackgroundColor: tailwindConfig().theme.colors.blue[300],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        },
        {
          data: chartData.nine,
          label: "The Number of WRT 9",
          backgroundColor: tailwindConfig().theme.colors.red[700],
          hoverBackgroundColor: tailwindConfig().theme.colors.red[800],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        }
      ]
    }),
    [chartData, get135Labels]
  );

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
          <ProcessStacked data={chartData3} width={1800} height={800} />
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(GRT);

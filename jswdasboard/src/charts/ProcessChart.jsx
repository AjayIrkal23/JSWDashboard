import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback
} from "react";
import { useThemeProvider } from "../utils/ThemeContext";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { chartColors } from "./ChartjsConfig";
import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  CategoryScale
} from "chart.js";
import "chartjs-adapter-moment";
import { Modal } from "@mui/material";

// Import utilities
import { tailwindConfig, formatValue } from "../utils/Utils";
import ProcessStacked from "./ProcessChartstacked";
import { AccountContext } from "../context/context";

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  Tooltip,
  Legend
);

const ProcessChart = ({ data, width, height }) => {
  const [chart, setChart] = useState(null);
  const [modal, setModal] = useState(null);
  const [open, setOpen] = useState(false);
  const [chartData, setChartData] = useState({
    oneMin: [],
    twoMin: [],
    threeMin: [],
    fourMin: [],
    oneMin1: [],
    twoMin1: [],
    threeMin1: [],
    fourMin1: [],
    oneMin2: [],
    twoMin2: [],
    threeMin2: [],
    fourMin2: [],
    oneMin4: [],
    twoMin4: [],
    threeMin4: [],
    fourMin4: []
  });
  const canvas = useRef(null);
  const { currentTheme } = useThemeProvider();
  const { period, data: EP } = useContext(AccountContext);

  const darkMode = currentTheme === "dark";
  const {
    textColor,
    gridColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor
  } = chartColors;

  const get135Labels = () => {
    let arr = [];
    for (let index = 0; index < 100; index++) {
      if (index * 5 !== 140) {
        arr.push(index * 5);
      } else {
        return arr;
      }
    }
  };

  const calculateData = useCallback(() => {
    const start = 0;
    const end = 140;
    const newChartData = {
      oneMin: [],
      twoMin: [],
      threeMin: [],
      fourMin: [],
      oneMin1: [],
      twoMin1: [],
      threeMin1: [],
      fourMin1: [],
      oneMin2: [],
      twoMin2: [],
      threeMin2: [],
      fourMin2: [],
      oneMin4: [],
      twoMin4: [],
      threeMin4: [],
      fourMin4: []
    };

    const updateArray = (arr, value, condition) => {
      if (condition) {
        arr.push(value);
      } else {
        arr.push(0);
      }
    };

    for (let index = start; index < end; index += 5) {
      const plus5 = index + 5;
      EP?.pacing?.forEach((currentValue) => {
        const isWithinRange = (val) =>
          val?.toFixed(1) >= index && val?.toFixed(1) <= plus5;
        const processTimeDelay =
          currentValue?.f_SSPProcessTimeDelay?.toFixed(1);

        updateArray(
          newChartData.oneMin,
          1,
          isWithinRange(currentValue.f_F1GapTimeAct) && processTimeDelay <= 1
        );
        updateArray(
          newChartData.twoMin,
          1,
          isWithinRange(currentValue.f_F1GapTimeAct) &&
            processTimeDelay > 1 &&
            processTimeDelay <= 5
        );
        updateArray(
          newChartData.threeMin,
          1,
          isWithinRange(currentValue.f_F1GapTimeAct) &&
            processTimeDelay > 5 &&
            processTimeDelay <= 10
        );
        updateArray(
          newChartData.fourMin,
          1,
          isWithinRange(currentValue.f_F1GapTimeAct) &&
            processTimeDelay > 11 &&
            processTimeDelay <= 999
        );
      });
    }
    setChartData(newChartData);
  }, [EP]);

  useEffect(() => {
    calculateData();
  }, [EP, calculateData]);

  const initializeChart = useCallback(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      const newChart = new Chart(ctx, {
        type: "bar",
        data,
        options: {
          layout: {
            padding: {
              top: 40,
              bottom: 16,
              left: 20,
              right: 20
            }
          },
          onClick: (evt, element) => {
            if (element.length > 0) {
              const ind = element[0].index;
              setModal(ind);
              setOpen(true);
            }
          },
          scales: {
            y: {
              border: {
                display: false
              },
              ticks: {
                maxTicksLimit: 4,
                color: darkMode ? textColor.dark : textColor.light
              },
              grid: {
                color: darkMode ? gridColor.dark : gridColor.light
              }
            },
            x: {
              border: {
                display: false
              },
              ticks: {
                font: 8,
                color: darkMode ? textColor.dark : textColor.light
              }
            }
          },
          plugins: {
            datalabels: {
              anchor: "end",
              align: "top",
              font: {
                weight: "bold",
                size: 16
              }
            },
            tooltip: {
              enabled: true,
              callbacks: {
                title: () => false,
                label: (context) =>
                  `${context.label.replaceAll(",", " ")}: ${context.parsed.y}`
              },
              bodyColor: darkMode
                ? tooltipBodyColor.dark
                : tooltipBodyColor.light,
              backgroundColor: darkMode
                ? tooltipBgColor.dark
                : tooltipBgColor.light,
              borderColor: darkMode
                ? tooltipBorderColor.dark
                : tooltipBorderColor.light
            },
            legend: {
              display: false
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          animation: {
            duration: 500
          },
          maintainAspectRatio: false,
          resizeDelay: 200
        },
        plugins: [ChartDataLabels]
      });
      setChart(newChart);
      return () => newChart.destroy();
    }
  }, [
    data,
    darkMode,
    textColor,
    gridColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor
  ]);

  useEffect(() => {
    const cleanup = initializeChart();
    return () => {
      if (cleanup) cleanup();
    };
  }, [initializeChart]);

  useEffect(() => {
    if (!chart) return;
    chart.options.scales.x.ticks.color = darkMode
      ? textColor.dark
      : textColor.light;
    chart.options.scales.y.ticks.color = darkMode
      ? textColor.dark
      : textColor.light;
    chart.options.scales.y.grid.color = darkMode
      ? gridColor.dark
      : gridColor.light;
    chart.options.plugins.tooltip.bodyColor = darkMode
      ? tooltipBodyColor.dark
      : tooltipBodyColor.light;
    chart.options.plugins.tooltip.backgroundColor = darkMode
      ? tooltipBgColor.dark
      : tooltipBgColor.light;
    chart.options.plugins.tooltip.borderColor = darkMode
      ? tooltipBorderColor.dark
      : tooltipBorderColor.light;
    chart.update("none");
  }, [
    currentTheme,
    chart,
    darkMode,
    textColor,
    gridColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor
  ]);

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute bg-white outline-none top-[5%] left-[50%] -translate-x-[50%] flex">
          {modal === 0 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  SSP PROCESS TIME DELAY
                </h2>
              </header>
              <ProcessStacked data={chartData} width={1800} height={800} />
            </div>
          )}
          {modal === 1 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  R1 GAP TIME ACT
                </h2>
              </header>
              <ProcessStacked data={chartData1} width={1800} height={800} />
            </div>
          )}
          {modal === 2 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  R2 PROCESS TIME DELAY
                </h2>
              </header>
              <ProcessStacked data={chartData2} width={1800} height={800} />
            </div>
          )}
          {modal === 3 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  FM PROCESS TIME DELAY
                </h2>
              </header>
              <ProcessStacked data={chartData3} width={1800} height={800} />
            </div>
          )}
        </div>
      </Modal>
      <div className="px-5 py-3"></div>
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  );
};

export default ProcessChart;

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
import { tailwindConfig } from "../utils/Utils";
import FCE1BarChart from "./FCE1BarChart";
import { AccountContext } from "../context/context";

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

const GapChart = ({ data, width, height, shift }) => {
  const [chartDataEntry4, setChartData4] = useState([]);
  const [chartDataEntry, setChartData] = useState([]);
  const [chartDataEntry1, setChartData1] = useState([]);
  const [chartDataEntry2, setChartData2] = useState([]);
  const { period, data: EP } = useContext(AccountContext);
  const [modal, setModal] = useState(null);
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";
  const {
    textColor,
    gridColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor
  } = chartColors;
  const [open, setOpen] = useState(false);

  const get135Labels = useCallback(() => {
    const arr = [];
    for (let index = 0; index < 100; index++) {
      if (index * 5 !== 140) {
        arr.push(index * 5);
      } else {
        break;
      }
    }
    return arr;
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const initializeGapData = useCallback(() => {
    const generateGapData = (key, arrSetter) => {
      const start = 0;
      const end = 140;
      const arr = [];
      for (let index = start; index < end; index += 5) {
        const plus5 = index + 5;
        let total = 0;

        if (period === "Last Coil" || period.customp) {
          total =
            EP?.pacing?.[key]?.toFixed(2) >= index &&
            EP?.pacing?.[key]?.toFixed(2) <= plus5
              ? 1
              : 0;
        } else if (
          ["Last 5 Coil", "Last Hour", "Last Day"].includes(period) ||
          period?.date
        ) {
          total = EP?.pacing?.reduce((accumulator, currentValue) => {
            if (
              currentValue[key]?.toFixed(2) >= index &&
              currentValue[key]?.toFixed(2) <= plus5
            ) {
              return accumulator + 1;
            } else if (currentValue[key]?.toFixed(2) >= index && index >= 135) {
              return accumulator + 1;
            }
            return accumulator;
          }, 0);
        }
        arr.push(total);
      }
      arrSetter(arr);
    };

    generateGapData("f_SSPGapTimeAct", setChartData);
    generateGapData("f_R1GapTimeAct", setChartData1);
    generateGapData("f_R2GapTimeAct", setChartData2);
    generateGapData("f_F1GapTimeAct", setChartData4);
  }, [EP, period]);

  useEffect(() => {
    initializeGapData();
  }, [initializeGapData]);

  const initializeChart = useCallback(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      const newChart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          layout: { padding: { top: 40, bottom: 16, left: 20, right: 20 } },
          onClick: (evt, element) => {
            if (element.length > 0) {
              const ind = element[0].index;
              const modalMapping = { 0: 0, 1: 1, 2: 2, 3: 3 };
              setModal(modalMapping[ind]);
              setOpen(true);
            }
          },
          scales: {
            y: {
              border: { display: false },
              ticks: {
                maxTicksLimit: 5,
                color: darkMode ? textColor.dark : textColor.light
              },
              grid: { color: darkMode ? gridColor.dark : gridColor.light }
            },
            x: {
              border: { display: false },
              ticks: {
                font: { size: 8 },
                color: darkMode ? textColor.dark : textColor.light
              }
            }
          },
          plugins: {
            datalabels: {
              anchor: "end",
              align: "top",
              font: { weight: "bold", size: 16 }
            },
            tooltip: {
              enabled: true,
              callbacks: {
                title: () => false, // Disable tooltip title
                label: (context) =>
                  `${context.label.replaceAll(",", " ")}: ${context.parsed.y}, `
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
            legend: { display: false }
          },
          interaction: { intersect: false, mode: "nearest" },
          animation: { duration: 500 },
          maintainAspectRatio: false,
          resizeDelay: 200
        }
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
    console.log("Initializing chart...");
    const cleanup = initializeChart();
    return () => {
      if (cleanup) cleanup();
      console.log("Cleaning up chart...");
    };
  }, [initializeChart]);

  useEffect(() => {
    if (!chart) return;
    console.log("Updating chart theme...");

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

  const chartDataTemplate = (data) => ({
    labels: get135Labels(),
    datasets: [
      {
        data,
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      }
    ]
  });

  const renderModalContent = useCallback(() => {
    const chartMappings = {
      0: chartDataTemplate(chartDataEntry),
      1: chartDataTemplate(chartDataEntry1),
      2: chartDataTemplate(chartDataEntry2),
      3: chartDataTemplate(chartDataEntry4)
    };
    const modalTitles = {
      0: "The Number of SSP GAP ACT",
      1: "R1 GAP TIME ACT",
      2: "R2 GAP TIME ACT",
      3: "FM GAP TIME ACT"
    };

    return (
      <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            {modalTitles[modal]}
          </h2>
        </header>
        <FCE1BarChart data={chartMappings[modal]} width={1800} height={800} />
      </div>
    );
  }, [
    modal,
    chartDataEntry,
    chartDataEntry1,
    chartDataEntry2,
    chartDataEntry4
  ]);

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute bg-white outline-none top-[5%] left-[50%] -translate-x-[50%] flex">
          {renderModalContent()}
        </div>
      </Modal>
      <div className="px-5 py-3"></div>
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  );
};

export default GapChart;

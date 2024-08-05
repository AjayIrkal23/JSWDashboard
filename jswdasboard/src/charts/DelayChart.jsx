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
import FCE1BarChart from "./FCE1BarChart";
import { AccountContext } from "../context/context";
import { ToMins } from "../utils/roundoff";

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

const DelayChart = ({ data, width, height, shift, frc }) => {
  const [chartDataEntry3, setChartData3] = useState([]);
  const [chartDataEntry4, setChartData4] = useState([]);
  const [chartDataEntry, setChartData] = useState([]);
  const [chartDataEntry1, setChartData1] = useState([]);
  const [chartDataEntry2, setChartData2] = useState([]);
  const { period, data: EP, mins } = useContext(AccountContext);

  const initializeDelayData = useCallback(() => {
    const calculateDelayData = (total1, total2, total3, arrSetter) => {
      const arr = [];
      if (mins) {
        arr.push(ToMins(total1));
        arr.push(ToMins(total2));
        arr.push(ToMins(total3));
      } else {
        arr.push(total1?.toFixed(2));
        arr.push(total2?.toFixed(2));
        arr.push(total3?.toFixed(2));
      }
      arrSetter(arr);
    };

    const fetchDelayData = (data, key, fceNum) =>
      data?.reduce(
        (acc, curr) => (curr.i_FceNum === fceNum ? acc + curr[key] : acc),
        0
      );

    const handleDelayData = (data, key, arrSetter) => {
      const total1 = fetchDelayData(data, key, 1);
      const total2 = fetchDelayData(data, key, 2);
      const total3 = fetchDelayData(data, key, 3);
      calculateDelayData(total1, total2, total3, arrSetter);
    };

    if (
      ["Last Coil", "Last 5 Coil", "Last Hour", "Last Day"].includes(period) ||
      period?.customp ||
      period?.date
    ) {
      handleDelayData(EP?.Excel, "f_SSPR1TravelTimeDelay", setChartData3);
      handleDelayData(EP?.pacing, "f_FCE1SSPTravelTimeDelay", setChartData3);
      handleDelayData(EP?.Excel, "f_SSPProcessTimeDelay", setChartData3);

      handleDelayData(EP?.Excel, "i_FMEntryOpInhibit", setChartData4);
      handleDelayData(EP?.Excel, "f_FEntF1TravelTimeDelay", setChartData4);

      handleDelayData(EP?.Excel, "f_FCDTravelTmeDelay", setChartData2);

      handleDelayData(EP?.Excel, "f_L2L1ExtRdyTimeDiff", setChartData);
      handleDelayData(EP?.Excel, "f_ExtractCycleTimeDiff", setChartData1);
    }
  }, [EP, mins, period]);

  useEffect(() => {
    initializeDelayData();
  }, [initializeDelayData]);

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

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const initializeChart = useCallback(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      const newChart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          layout: {
            padding: { top: 40, bottom: 16, left: 20, right: 20 }
          },
          onClick: (evt, element) => {
            if (element.length > 0) {
              const ind = element[0].index;
              const modalMapping = { 0: 0, 1: 1, 2: 2, 3: 3, 7: 7 };
              setModal(modalMapping[ind] ?? -1);
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
                  `${context.label.replaceAll(",", " ")}:  ${
                    context.parsed.y
                  }, `
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

  const chartData = {
    labels: [
      ["FCE1 ", "Discharge", "Delay"],
      ["FCE2 ", "Discharge", "Delay"],
      ["FCE3 ", "Discharge", "Delay"]
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

  const chartData1 = {
    labels: [
      ["FCE1 ", "Extractor", "Delay"],
      ["FCE2 ", "Extractor", "Delay"],
      ["FCE3 ", "Extractor", "Delay"]
    ],
    datasets: [
      {
        data: chartDataEntry1,
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      }
    ]
  };

  const chartData2 = {
    labels: [
      ["FCE1 ", "Slip", "Delay"],
      ["FCE2 ", "Slip", "Delay"],
      ["FCE3 ", "Slip", "Delay"]
    ],
    datasets: [
      {
        data: chartDataEntry2,
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      }
    ]
  };

  const chartData3 = {
    labels: [
      ["FCESSP ", "Travel", "Delay"],
      ["SSP ", "Process", "Delay"],
      ["SSP ", "R1", "Travel", "Delay"]
    ],
    datasets: [
      {
        data: chartDataEntry3,
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      }
    ]
  };

  const chartData6 = {
    labels: [
      ["Manual", "Auto", "Rock", "Count"],
      ["Manual", "Auto", "Rock", "Time"],
      ["2 - 5 ", "Mins", "Delay"],
      [">5 ", "Mins", "Delay"]
    ],
    datasets: [
      {
        data: chartDataEntry4,
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      }
    ]
  };

  const renderModalContent = useCallback(() => {
    const chartMappings = {
      0: chartData,
      1: chartData1,
      2: chartData2,
      3: chartData3,
      7: chartData6
    };
    const modalTitles = {
      0: "FCE Discharge Visualization",
      1: "FCE Extractor Visualization",
      2: "FCE Slip Visualization",
      3: "R1 Travel Visualization",
      7: "FME Travel Visualization"
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
  }, [modal]);

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

export default DelayChart;

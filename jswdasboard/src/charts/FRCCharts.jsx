import React, { useRef, useEffect, useState, useCallback } from "react";
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

const FRCCharts = ({ data, width, height, shift }) => {
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
    for (let index = 1; index < 100; index++) {
      if (index * 5 !== 135) {
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
              formatter: Math.round,
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

  const chartDataTemplate = {
    labels: get135Labels(),
    datasets: [
      {
        data: get135Labels(),
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      }
    ]
  };

  const renderModalContent = useCallback(() => {
    const chartMappings = {
      0: chartDataTemplate,
      1: chartDataTemplate,
      2: chartDataTemplate,
      3: chartDataTemplate
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
        <FCE1BarChart data={chartMappings[modal]} width={900} height={548} />
      </div>
    );
  }, [modal, chartDataTemplate]);

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

export default FRCCharts;

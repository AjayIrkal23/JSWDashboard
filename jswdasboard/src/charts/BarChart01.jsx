import React, { useRef, useEffect, useState, useCallback } from "react";
import { useThemeProvider } from "../utils/ThemeContext";
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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { tailwindConfig, formatValue } from "../utils/Utils";
import D17 from "../partials/dashboard/D17";
import D18 from "../partials/dashboard/D18";

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

const BarChart01 = ({ data, width, height, shift }) => {
  const [chart, setChart] = useState(null);
  const [Shift, setShift] = useState("Shift");
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
            if (element.length > 0 && element[0].index === 3) {
              setShift(shift);
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
              grid: {
                color: darkMode ? gridColor.dark : gridColor.light
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
            legend: { display: false },
            tooltip: {
              callbacks: { title: () => false },
              bodyColor: darkMode
                ? tooltipBodyColor.dark
                : tooltipBodyColor.light,
              backgroundColor: darkMode
                ? tooltipBgColor.dark
                : tooltipBgColor.light,
              borderColor: darkMode
                ? tooltipBorderColor.dark
                : tooltipBorderColor.light
            }
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
    shift,
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

    const updateChartTheme = () => {
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
    };

    updateChartTheme();
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
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-white outline-none absolute top-[10%] left-[50%] -translate-x-[50%]">
          {Shift === "Shift" ? <D17 /> : <D18 />}
        </div>
      </Modal>
      <div className="px-5 py-3"></div>
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  );
};

export default BarChart01;

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
  Legend
} from "chart.js";
import "chartjs-adapter-moment";
import { formatValue } from "../utils/Utils";

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend
);

const BarChart02 = ({ data, width, height }) => {
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
          scales: {
            y: {
              stacked: true,
              border: { display: false },
              beginAtZero: true,
              ticks: {
                maxTicksLimit: 5,
                callback: (value) => formatValue(value),
                color: darkMode ? textColor.dark : textColor.light
              },
              grid: {
                color: darkMode ? gridColor.dark : gridColor.light
              }
            },
            x: {
              type: "time",
              time: {
                parser: "MM-DD-YYYY",
                unit: "month",
                displayFormats: { month: "DD MM" }
              },
              border: { display: false },
              grid: { display: false },
              ticks: {
                autoSkipPadding: 48,
                maxRotation: 0,
                color: darkMode ? textColor.dark : textColor.light
              }
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: () => false, // Disable tooltip title
                label: (context) => formatValue(context.parsed.y)
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
            }
          },
          interaction: { intersect: false, mode: "nearest" },
          animation: { duration: 200 },
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

  return <canvas ref={canvas} width={width} height={height}></canvas>;
};

export default BarChart02;

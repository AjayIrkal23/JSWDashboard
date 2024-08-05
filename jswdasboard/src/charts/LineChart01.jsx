import React, { useRef, useEffect, useState, useCallback } from "react";
import { useThemeProvider } from "../utils/ThemeContext";
import { chartColors } from "./ChartjsConfig";
import {
  Chart,
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip
} from "chart.js";
import "chartjs-adapter-moment";

// Import utilities
import { formatValue } from "../utils/Utils";

Chart.register(
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip
);

const LineChart01 = ({ data, width, height, title }) => {
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";
  const { tooltipBodyColor, tooltipBgColor, tooltipBorderColor, chartAreaBg } =
    chartColors;

  const initializeChart = useCallback(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      const newChart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          chartArea: {
            backgroundColor: darkMode ? chartAreaBg.dark : chartAreaBg.light
          },
          layout: {
            padding: 20
          },
          scales: {
            y: {
              display: false,
              beginAtZero: true
            },
            x: {
              display: false
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: () => false, // Disable tooltip title
                label: (context) =>
                  `${title}: ${context.parsed.y}, Time: ${context.label}`
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
    title,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor,
    chartAreaBg
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
    chart.options.chartArea.backgroundColor = darkMode
      ? chartAreaBg.dark
      : chartAreaBg.light;
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
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor,
    chartAreaBg
  ]);

  return <canvas ref={canvas} width={width} height={height}></canvas>;
};

export default LineChart01;

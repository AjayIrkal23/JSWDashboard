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

function FCE1BarChart({ data, width, height }) {
  const canvasRef = useRef(null);
  const [chart, setChart] = useState(null);
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
    const ctx = canvasRef.current;
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
        scales: {
          y: {
            border: { display: false },
            ticks: {
              maxTicksLimit: 4,
              color: darkMode ? textColor.dark : textColor.light
            },
            grid: {
              color: darkMode ? gridColor.dark : gridColor.light
            }
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
            font: {
              weight: "bold",
              size: 16
            }
          },
          tooltip: {
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
          legend: { display: false }
        },
        interaction: {
          intersect: false,
          mode: "nearest"
        },
        animation: { duration: 500 },
        maintainAspectRatio: false,
        resizeDelay: 200
      }
    });
    setChart(newChart);
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
    initializeChart();
    return () => chart?.destroy();
  }, [initializeChart]);

  useEffect(() => {
    if (!chart) return;

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
    darkMode,
    chart,
    textColor,
    gridColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor
  ]);

  return (
    <div className="grow">
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
  );
}

export default React.memo(FCE1BarChart);

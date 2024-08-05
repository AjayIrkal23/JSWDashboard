import React, { useRef, useEffect, useState, useCallback } from "react";
import { useThemeProvider } from "../utils/ThemeContext";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { chartColors } from "./ChartjsConfig";
import {
  Chart,
  DoughnutController,
  ArcElement,
  TimeScale,
  Tooltip
} from "chart.js";
import "chartjs-adapter-moment";

// Import utilities
import { tailwindConfig } from "../utils/Utils";

Chart.register(
  DoughnutController,
  ArcElement,
  TimeScale,
  Tooltip,
  ChartDataLabels
);

const DoughnutChart = ({ data, width, height }) => {
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  const legend = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";
  const {
    tooltipTitleColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor
  } = chartColors;

  const initializeChart = useCallback(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      const newChart = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: {
          cutout: "80%",
          layout: { padding: 24 },
          plugins: {
            tooltip: {
              titleColor: darkMode
                ? tooltipTitleColor.dark
                : tooltipTitleColor.light,
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
        },
        plugins: [
          {
            id: "htmlLegend",
            afterUpdate(chartInstance) {
              const ul = legend.current;
              if (!ul) return;
              // Remove old legend items
              while (ul.firstChild) {
                ul.firstChild.remove();
              }
              // Reuse the built-in legendItems generator
              const items =
                chartInstance.options.plugins.legend.labels.generateLabels(
                  chartInstance
                );
              items.forEach((item) => {
                const li = document.createElement("li");
                li.style.margin = tailwindConfig().theme.margin[1];
                // Button element
                const button = document.createElement("button");
                button.classList.add(
                  "btn-xs",
                  "bg-white",
                  "dark:bg-slate-800",
                  "text-slate-500",
                  "dark:text-slate-400",
                  "border",
                  "border-slate-200",
                  "dark:border-slate-700",
                  "shadow-md"
                );
                button.style.opacity = item.hidden ? ".3" : "";
                button.onclick = () => {
                  chartInstance.toggleDataVisibility(item.index);
                  chartInstance.update();
                };
                // Color box
                const box = document.createElement("span");
                box.style.display = "block";
                box.style.width = tailwindConfig().theme.width[2];
                box.style.height = tailwindConfig().theme.height[2];
                box.style.backgroundColor = item.fillStyle;
                box.style.borderRadius = tailwindConfig().theme.borderRadius.sm;
                box.style.marginRight = tailwindConfig().theme.margin[1];
                box.style.pointerEvents = "none";
                // Label
                const label = document.createElement("span");
                label.style.display = "flex";
                label.style.alignItems = "center";
                const labelText = document.createTextNode(item.text);
                label.appendChild(labelText);
                li.appendChild(button);
                button.appendChild(box);
                button.appendChild(label);
                ul.appendChild(li);
              });
            }
          }
        ]
      });

      setChart(newChart);
      return () => newChart.destroy();
    }
  }, [
    data,
    darkMode,
    tooltipTitleColor,
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

    chart.options.plugins.tooltip.titleColor = darkMode
      ? tooltipTitleColor.dark
      : tooltipTitleColor.light;
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
    tooltipTitleColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor
  ]);

  return (
    <div className="grow flex flex-col justify-center">
      <div>
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
      <div className="px-5 pt-2 pb-6">
        <ul ref={legend} className="flex flex-wrap justify-center -m-1"></ul>
      </div>
    </div>
  );
};

export default DoughnutChart;

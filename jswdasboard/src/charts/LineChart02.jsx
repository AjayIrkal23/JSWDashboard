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
import { tailwindConfig, formatValue } from "../utils/Utils";

Chart.register(
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip
);

const LineChart02 = ({ data, width, height }) => {
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  const legend = useRef(null);
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
        type: "line",
        data: data,
        options: {
          layout: {
            padding: 20
          },
          scales: {
            y: {
              border: {
                display: false
              },
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
                displayFormats: {
                  month: "MMM YY"
                }
              },
              border: {
                display: false
              },
              grid: {
                display: false
              },
              ticks: {
                autoSkipPadding: 48,
                maxRotation: 0,
                color: darkMode ? textColor.dark : textColor.light
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
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
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          maintainAspectRatio: false,
          resizeDelay: 200
        },
        plugins: [
          {
            id: "htmlLegend",
            afterUpdate(chart, args, options) {
              const ul = legend.current;
              if (!ul) return;
              // Remove old legend items
              while (ul.firstChild) {
                ul.firstChild.remove();
              }
              // Reuse the built-in legendItems generator
              const items =
                chart.options.plugins.legend.labels.generateLabels(chart);
              items.slice(0, 2).forEach((item) => {
                const li = document.createElement("li");
                li.style.marginLeft = tailwindConfig().theme.margin[3];
                // Button element
                const button = document.createElement("button");
                button.style.display = "inline-flex";
                button.style.alignItems = "center";
                button.style.opacity = item.hidden ? ".3" : "";
                button.onclick = () => {
                  chart.setDatasetVisibility(
                    item.datasetIndex,
                    !chart.isDatasetVisible(item.datasetIndex)
                  );
                  chart.update();
                };
                // Color box
                const box = document.createElement("span");
                box.style.display = "block";
                box.style.width = tailwindConfig().theme.width[3];
                box.style.height = tailwindConfig().theme.height[3];
                box.style.borderRadius =
                  tailwindConfig().theme.borderRadius.full;
                box.style.marginRight = tailwindConfig().theme.margin[2];
                box.style.borderWidth = "3px";
                box.style.borderColor =
                  chart.data.datasets[item.datasetIndex].borderColor;
                box.style.pointerEvents = "none";
                // Label
                const label = document.createElement("span");
                label.classList.add("text-slate-500", "dark:text-slate-400");
                label.style.fontSize = tailwindConfig().theme.fontSize.sm[0];
                label.style.lineHeight =
                  tailwindConfig().theme.fontSize.sm[1].lineHeight;
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

  return (
    <React.Fragment>
      <div className="px-5 py-3">
        <div className="flex flex-wrap justify-between items-end">
          <div className="flex items-start">
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
              $1,482
            </div>
            <div className="text-sm font-semibold text-white px-1.5 bg-amber-500 rounded-full">
              -22%
            </div>
          </div>
          <div className="grow ml-2 mb-1">
            <ul ref={legend} className="flex flex-wrap justify-end"></ul>
          </div>
        </div>
      </div>
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  );
};

export default LineChart02;

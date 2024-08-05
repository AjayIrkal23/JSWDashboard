import React, { useRef, useEffect, useState, useCallback } from "react";
import { useThemeProvider } from "../utils/ThemeContext";
import { chartColors } from "./ChartjsConfig";
import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from "chart.js";
import "chartjs-adapter-moment";
import { tailwindConfig } from "../utils/Utils";

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const BarChart03 = ({ data, width, height }) => {
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  const legend = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";
  const { tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors;

  const initializeChart = useCallback(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");

      // Calculate sum of values
      const values = data.datasets.map((x) =>
        x.data.reduce((acc, curr) => acc + curr, 0)
      );
      const max = values.reduce((acc, curr) => acc + curr, 0);

      const newChart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          indexAxis: "y",
          layout: {
            padding: { top: 40, bottom: 12, left: 20, right: 20 }
          },
          scales: {
            x: { stacked: true, display: false, max: max },
            y: { stacked: true, display: false }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: () => false, // Disable tooltip title
                label: (context) => context.parsed.x
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
          animation: { duration: 500 },
          maintainAspectRatio: false,
          resizeDelay: 200
        },
        plugins: [
          {
            id: "htmlLegend",
            afterUpdate(c, args, options) {
              const ul = legend.current;
              if (!ul) return;
              // Remove old legend items
              while (ul.firstChild) {
                ul.firstChild.remove();
              }
              // Reuse the built-in legendItems generator
              const items = c.options.plugins.legend.labels.generateLabels(c);
              items.forEach((item) => {
                const li = document.createElement("li");
                li.style.display = "flex";
                li.style.justifyContent = "space-between";
                li.style.alignItems = "center";
                li.style.paddingTop = tailwindConfig().theme.padding[2.5];
                li.style.paddingBottom = tailwindConfig().theme.padding[2.5];
                const wrapper = document.createElement("div");
                wrapper.style.display = "flex";
                wrapper.style.alignItems = "center";
                const box = document.createElement("div");
                box.style.width = tailwindConfig().theme.width[3];
                box.style.height = tailwindConfig().theme.width[3];
                box.style.borderRadius = tailwindConfig().theme.borderRadius.sm;
                box.style.marginRight = tailwindConfig().theme.margin[3];
                box.style.backgroundColor = item.fillStyle;
                const label = document.createElement("div");
                const value = document.createElement("div");
                value.style.fontWeight =
                  tailwindConfig().theme.fontWeight.medium;
                value.style.marginLeft = tailwindConfig().theme.margin[3];
                value.style.color =
                  item.text === "Other"
                    ? tailwindConfig().theme.colors.slate[400]
                    : item.fillStyle;
                const theValue = c.data.datasets[item.datasetIndex].data.reduce(
                  (a, b) => a + b,
                  0
                );
                const valueText = document.createTextNode(
                  `${parseInt((theValue / max) * 100)}%`
                );
                const labelText = document.createTextNode(item.text);
                value.appendChild(valueText);
                label.appendChild(labelText);
                ul.appendChild(li);
                li.appendChild(wrapper);
                li.appendChild(value);
                wrapper.appendChild(box);
                wrapper.appendChild(label);
              });
            }
          }
        ]
      });

      setChart(newChart);
      return () => newChart.destroy();
    }
  }, [data, darkMode, tooltipBodyColor, tooltipBgColor, tooltipBorderColor]);

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
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor
  ]);

  return (
    <div className="grow flex flex-col justify-center">
      <div>
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
      <div className="px-5 pt-2 pb-2">
        <ul
          ref={legend}
          className="text-sm divide-y divide-slate-100 dark:divide-slate-700"
        ></ul>
        <ul className="text-sm divide-y divide-slate-100 dark:divide-slate-700"></ul>
      </div>
    </div>
  );
};

export default BarChart03;

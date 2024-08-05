import React, { useRef, useEffect, useState, useCallback } from "react";
import { useThemeProvider } from "../utils/ThemeContext";
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
import { CategoryScale } from "chart.js";
import { Modal } from "@mui/material";
import { chartColors } from "./ChartjsConfig";
import { tailwindConfig } from "../utils/Utils";
import D17 from "../partials/dashboard/D17";
import D18 from "../partials/dashboard/D18";

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  Tooltip,
  Legend
);

function RejBar({ data, width, height, shift, title }) {
  const [chart, setChart] = useState(null);
  const [open, setOpen] = useState(false);
  const [shiftData, setShiftData] = useState("Shift");
  const canvasRef = useRef(null);
  const legendRef = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";
  const {
    textColor,
    gridColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor
  } = chartColors;

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const initializeChart = useCallback(() => {
    if (!canvasRef.current) {
      console.warn("Canvas not found");
      return;
    }

    const ctx = canvasRef.current.getContext("2d");
    const newChart = new Chart(ctx, {
      type: "bar",
      data,
      options: {
        layout: {
          padding: {
            top: 12,
            bottom: 16,
            left: 20,
            right: 20
          }
        },
        onClick: (evt, element) => {
          if (element.length > 0) {
            const ind = element[0].index;
            if (ind === 3) {
              setShiftData(shift);
              setOpen(true);
            }
          }
        },
        scales: {
          y: { display: false, stacked: true },
          x: { display: false, stacked: true }
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: () => false,
              label: (context) =>
                `${context.dataset.label}: ${context.parsed.y}, Time: ${context.label}`
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
      },
      plugins: [
        {
          id: "htmlLegend",
          afterUpdate(c) {
            const ul = legendRef.current;
            if (!ul) return;

            while (ul.firstChild) ul.firstChild.remove();

            const items = c.options.plugins.legend.labels.generateLabels(c);
            items.forEach((item) => {
              const li = document.createElement("li");
              li.style.marginRight = tailwindConfig().theme.margin[4];

              const button = document.createElement("button");
              button.style.display = "inline-flex";
              button.style.alignItems = "center";
              button.style.opacity = item.hidden ? ".3" : "";
              button.onclick = () => {
                c.setDatasetVisibility(
                  item.datasetIndex,
                  !c.isDatasetVisible(item.datasetIndex)
                );
                c.update();
              };

              const box = document.createElement("span");
              box.style.display = "block";
              box.style.width = tailwindConfig().theme.width[3];
              box.style.height = tailwindConfig().theme.height[3];
              box.style.borderRadius = tailwindConfig().theme.borderRadius.full;
              box.style.marginRight = tailwindConfig().theme.margin[2];
              box.style.borderWidth = "3px";
              box.style.borderColor = item.fillStyle;
              box.style.pointerEvents = "none";

              const labelContainer = document.createElement("span");
              labelContainer.style.display = "flex";
              labelContainer.style.alignItems = "center";

              const value = document.createElement("span");
              value.classList.add("text-slate-800", "dark:text-slate-100");
              value.style.fontSize = tailwindConfig().theme.fontSize["3xl"][0];
              value.style.lineHeight =
                tailwindConfig().theme.fontSize["3xl"][1].lineHeight;
              value.style.fontWeight = tailwindConfig().theme.fontWeight.bold;
              value.style.marginRight = tailwindConfig().theme.margin[2];
              value.style.pointerEvents = "none";

              const label = document.createElement("span");
              label.classList.add("text-slate-500", "dark:text-slate-400");
              label.style.fontSize = tailwindConfig().theme.fontSize.sm[0];
              label.style.lineHeight =
                tailwindConfig().theme.fontSize.sm[1].lineHeight;

              const theValue = c.data.datasets[item.datasetIndex].data.reduce(
                (a, b) => a + b,
                0
              );
              value.textContent = theValue;
              label.textContent = item.text;

              li.appendChild(button);
              button.appendChild(box);
              button.appendChild(labelContainer);
              labelContainer.appendChild(value);
              labelContainer.appendChild(label);
              ul.appendChild(li);
            });
          }
        }
      ]
    });

    setChart(newChart);
    return () => newChart.destroy();
  }, [data, darkMode, shift, tailwindConfig]);

  useEffect(() => {
    initializeChart();
  }, [initializeChart]);

  useEffect(() => {
    if (!chart) return;

    const newColor = darkMode ? textColor.dark : textColor.light;
    const newGridColor = darkMode ? gridColor.dark : gridColor.light;
    const newTooltipBodyColor = darkMode
      ? tooltipBodyColor.dark
      : tooltipBodyColor.light;
    const newTooltipBgColor = darkMode
      ? tooltipBgColor.dark
      : tooltipBgColor.light;
    const newTooltipBorderColor = darkMode
      ? tooltipBorderColor.dark
      : tooltipBorderColor.light;

    chart.options.scales.x.ticks.color = newColor;
    chart.options.scales.y.ticks.color = newColor;
    chart.options.scales.y.grid.color = newGridColor;
    chart.options.plugins.tooltip.bodyColor = newTooltipBodyColor;
    chart.options.plugins.tooltip.backgroundColor = newTooltipBgColor;
    chart.options.plugins.tooltip.borderColor = newTooltipBorderColor;
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
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-white outline-none absolute top-[10%] left-[50%] -translate-x-[50%]">
          {shiftData === "Shift" ? <D17 /> : <D18 />}
        </div>
      </Modal>
      <div className="px-5 py-3"></div>
      <div className="grow">
        <canvas ref={canvasRef} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  );
}

export default RejBar;

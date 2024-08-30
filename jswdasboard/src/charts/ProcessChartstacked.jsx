import React, { useRef, useEffect, useState } from "react";
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
} from "chart.js";
import "chartjs-adapter-moment";
import { CategoryScale } from "chart.js";
import { Modal } from "@mui/material";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Importing the plugin

// Import utilities
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
  Legend,
  ChartDataLabels // Registering the plugin
);

function ProcessStacked({ data, width, height, shift, title }) {
  const [chart, setChart] = useState(null);
  const [Shift, setShift] = useState("Shift");
  const canvas = useRef(null);
  const legend = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";
  const {
    textColor,
    gridColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor,
  } = chartColors;

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    const newChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        layout: {
          padding: {
            top: 40, // Increase the top padding value
            bottom: 16,
            left: 20,
            right: 20,
          },
        },
        onClick: (evt, element) => {
          if (element.length > 0) {
            var ind = element[0].index;
            if (ind === 3) {
              setShift(shift);
              setOpen(true);
            }
          }
        },
        scales: {
          y: {
            stacked: true,
            border: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 4,
              color: darkMode ? textColor.dark : textColor.light,
            },
            grid: {
              color: darkMode ? gridColor.dark : gridColor.light,
            },
          },
          x: {
            stacked: true,
            border: {
              display: false,
            },
            ticks: {
              font: {
                size: 12, // Adjust font size if needed
              },
              color: "gray",
            },
          },
        },
        plugins: {
          datalabels: {
            anchor: "center", // Position the label at the center
            align: "center", // Align the label vertically and horizontally
            color: "black", // Set label color
            formatter: function (value, context) {
              if (value == 0) {
                return null;
              } else {
                return value;
              }
            },
            font: {
              weight: "bold",
              size: 13, // Adjust font size as needed
            },
          },
          tooltip: {
            enabled: true,
            callbacks: {
              title: () => false, // Disable tooltip title
            },
            bodyColor: darkMode
              ? tooltipBodyColor.dark
              : tooltipBodyColor.light,
            backgroundColor: darkMode
              ? tooltipBgColor.dark
              : tooltipBgColor.light,
            borderColor: darkMode
              ? tooltipBorderColor.dark
              : tooltipBorderColor.light,
          },
          legend: {
            display: true,
          },
        },
        interaction: {
          intersect: false,
          mode: "nearest",
        },
        animation: {
          duration: 500,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
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
              li.style.marginRight = tailwindConfig().theme.margin[4];
              // Button element
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
              // Color box
              const box = document.createElement("span");
              box.style.display = "block";
              box.style.width = tailwindConfig().theme.width[3];
              box.style.height = tailwindConfig().theme.height[3];
              box.style.borderRadius = tailwindConfig().theme.borderRadius.full;
              box.style.marginRight = tailwindConfig().theme.margin[2];
              box.style.borderWidth = "3px";
              box.style.borderColor = item.fillStyle;
              box.style.pointerEvents = "none";
              ul.appendChild(li);
            });
          },
        },
      ],
    });

    setChart(newChart);
    return () => newChart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, darkMode]);

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-white outline-none absolute top-[10%] left-[50%] -translate-x-[50%] ">
          {Shift === "Shift" ? <D17 /> : <D18 />}
        </div>
      </Modal>
      <div className="px-5 py-3"></div>
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
      <ul ref={legend} className="flex flex-wrap mt-4"></ul>
    </React.Fragment>
  );
}

export default ProcessStacked;

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

function BarChart01({ data, width, height, shift }) {
  const [chart, setChart] = useState(null);
  const [shiftType, setShiftType] = useState("");
  const canvasRef = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";

  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleChartClick = useCallback(
    (evt, element) => {
      if (element.length > 0 && element[0].index === 3) {
        setShiftType(shift);
        setOpen(true);
      }
    },
    [shift]
  );

  useEffect(() => {
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
        onClick: handleChartClick,
        scales: {
          y: {
            border: {
              display: false
            },
            ticks: {
              maxTicksLimit: 5,
              color: darkMode
                ? chartColors.textColor.dark
                : chartColors.textColor.light
            },
            grid: {
              color: darkMode
                ? chartColors.gridColor.dark
                : chartColors.gridColor.light
            }
          }
        },
        plugins: {
          datalabels: {
            anchor: "end",
            align: "top",
            formatter: Math.round,
            font: {
              weight: "bold",
              size: 16
            }
          },
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: () => false
            },
            bodyColor: darkMode
              ? chartColors.tooltipBodyColor.dark
              : chartColors.tooltipBodyColor.light,
            backgroundColor: darkMode
              ? chartColors.tooltipBgColor.dark
              : chartColors.tooltipBgColor.light,
            borderColor: darkMode
              ? chartColors.tooltipBorderColor.dark
              : chartColors.tooltipBorderColor.light
          }
        },
        interaction: {
          intersect: false,
          mode: "nearest"
        },
        animation: {
          duration: 500
        },
        maintainAspectRatio: false,
        resizeDelay: 200
      }
    });

    setChart(newChart);
    return () => newChart.destroy();
  }, [data, handleChartClick, darkMode]);

  useEffect(() => {
    if (!chart) return;

    chart.options.scales.y.ticks.color = darkMode
      ? chartColors.textColor.dark
      : chartColors.textColor.light;
    chart.options.scales.y.grid.color = darkMode
      ? chartColors.gridColor.dark
      : chartColors.gridColor.light;
    chart.options.plugins.tooltip.bodyColor = darkMode
      ? chartColors.tooltipBodyColor.dark
      : chartColors.tooltipBodyColor.light;
    chart.options.plugins.tooltip.backgroundColor = darkMode
      ? chartColors.tooltipBgColor.dark
      : chartColors.tooltipBgColor.light;
    chart.options.plugins.tooltip.borderColor = darkMode
      ? chartColors.tooltipBorderColor.dark
      : chartColors.tooltipBorderColor.light;

    chart.update("none");
  }, [darkMode, chart]);

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-white outline-none absolute top-[10%] left-[50%] -translate-x-[50%] ">
          {shiftType === "Shift" ? <D17 /> : <D18 />}
        </div>
      </Modal>
      <div className="grow">
        <canvas ref={canvasRef} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  );
}

export default React.memo(BarChart01);

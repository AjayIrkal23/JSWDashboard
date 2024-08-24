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
import { Modal } from "@mui/material";
import FCE1BarChart from "./FCE1BarChart";

// Import utilities
import { tailwindConfig } from "../utils/Utils";

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

function FRCCharts({ data, width, height }) {
  const [modal, setModal] = useState(null);
  const [open, setOpen] = useState(false);
  const canvasRef = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";
  const {
    textColor,
    gridColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor
  } = chartColors;

  const chartLabels = useCallback(() => {
    let arr = [];
    for (let index = 1; index < 100; index++) {
      if (index * 5 !== 135) {
        arr.push(index * 5);
      } else {
        break;
      }
    }
    return arr;
  }, []);

  const generateChartData = useCallback(() => {
    return {
      labels: chartLabels(),
      datasets: [
        {
          data: chartLabels(),
          backgroundColor: tailwindConfig().theme.colors.blue[700],
          hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        }
      ]
    };
  }, [chartLabels]);

  const chartData = generateChartData();
  const chartData1 = generateChartData();
  const chartData2 = generateChartData();
  const chartData3 = generateChartData();
  const chartData4 = generateChartData();

  const handleClose = () => setOpen(false);

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
        onClick: (evt, element) => {
          if (element.length > 0) {
            const ind = element[0].index;
            setModal(ind);
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
            formatter: Math.round,
            font: { weight: "bold", size: 16 }
          },
          tooltip: {
            enabled: true,
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

    return () => newChart.destroy();
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
    if (!canvasRef.current) return;

    const chartInstance = Chart.getChart(canvasRef.current.id);
    if (!chartInstance) return;

    chartInstance.options.scales.x.ticks.color = darkMode
      ? textColor.dark
      : textColor.light;
    chartInstance.options.scales.y.ticks.color = darkMode
      ? textColor.dark
      : textColor.light;
    chartInstance.options.scales.y.grid.color = darkMode
      ? gridColor.dark
      : gridColor.light;
    chartInstance.options.plugins.tooltip.bodyColor = darkMode
      ? tooltipBodyColor.dark
      : tooltipBodyColor.light;
    chartInstance.options.plugins.tooltip.backgroundColor = darkMode
      ? tooltipBgColor.dark
      : tooltipBgColor.light;
    chartInstance.options.plugins.tooltip.borderColor = darkMode
      ? tooltipBorderColor.dark
      : tooltipBorderColor.light;

    chartInstance.update("none");
  }, [
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
        <div className="absolute bg-white outline-none top-[5%] left-[50%] -translate-x-[50%] flex">
          {modal === 0 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  The Number of SSP GAP ACT
                </h2>
              </header>
              <FCE1BarChart data={chartData} width={900} height={548} />
            </div>
          )}
          {modal === 1 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  R1 GAP TIME ACT
                </h2>
              </header>
              <FCE1BarChart data={chartData1} width={900} height={548} />
            </div>
          )}
          {modal === 2 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  R2 GAP TIME ACT
                </h2>
              </header>
              <FCE1BarChart data={chartData2} width={900} height={548} />
            </div>
          )}
          {modal === 3 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  FM GAP TIME ACT
                </h2>
              </header>
              <FCE1BarChart data={chartData3} width={900} height={548} />
            </div>
          )}
        </div>
      </Modal>
      <div className="px-5 py-3"></div>
      <div className="grow">
        <canvas ref={canvasRef} width={width} height={height} />
      </div>
    </React.Fragment>
  );
}

export default FRCCharts;

import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback,
  useMemo
} from "react";
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
import { tailwindConfig } from "../utils/Utils";
import FCE1BarChart from "./FCE1BarChart";
import { AccountContext } from "../context/context";

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

function GapChart({ data, width, height }) {
  const { period, data: EP } = useContext(AccountContext);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";
  const [modal, setModal] = useState(null);
  const [open, setOpen] = useState(false);
  const [chartDataEntry, setChartData] = useState([]);
  const [chartDataEntry1, setChartData1] = useState([]);
  const [chartDataEntry2, setChartData2] = useState([]);
  const [chartDataEntry4, setChartData4] = useState([]);
  const canvas = useRef(null);
  const chartRef = useRef(null);

  const labels = useMemo(() => {
    let arr = [];
    for (let index = 0; index < 100; index++) {
      if (index * 5 !== 140) {
        arr.push(index * 5);
      } else {
        break;
      }
    }
    return arr;
  }, []);

  const gapDataHandlers = useCallback(() => {
    const dataGenerators = [
      { setter: setChartData, key: "f_SSPGapTimeAct" },
      { setter: setChartData1, key: "f_R1GapTimeAct" },
      { setter: setChartData2, key: "f_R2GapTimeAct" },
      { setter: setChartData4, key: "f_F1GapTimeAct" }
    ];

    dataGenerators.forEach(({ setter, key }) => {
      const arr = Array.from({ length: 140 / 5 }, (_, i) => {
        const index = i * 5;
        const plus5 = index + 5;
        if (period === "Last Coil" || period.customp) {
          return EP?.pacing?.[key]?.toFixed(2) >= index &&
            EP?.pacing?.[key]?.toFixed(2) <= plus5
            ? 1
            : 0;
        } else if (
          ["Last 5 Coil", "Last Hour", "Last Day"].includes(period) ||
          period?.date
        ) {
          return EP?.pacing
            ?.reduce((accumulator, currentValue) => {
              if (
                currentValue[key]?.toFixed(2) >= index &&
                currentValue[key]?.toFixed(2) <= plus5
              ) {
                return accumulator + 1;
              }
              return accumulator;
            }, 0)
            .toFixed(1);
        }
        return 0;
      });
      setter(arr);
    });
  }, [EP, period]);

  useEffect(() => {
    gapDataHandlers();
  }, [EP, gapDataHandlers]);

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: chartDataEntry,
          backgroundColor: tailwindConfig().theme.colors.blue[700],
          hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        }
      ]
    }),
    [chartDataEntry, labels]
  );

  const chartData1 = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: chartDataEntry1,
          backgroundColor: tailwindConfig().theme.colors.blue[700],
          hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        }
      ]
    }),
    [chartDataEntry1, labels]
  );

  const chartData2 = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: chartDataEntry2,
          backgroundColor: tailwindConfig().theme.colors.blue[700],
          hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        }
      ]
    }),
    [chartDataEntry2, labels]
  );

  const chartData4 = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: chartDataEntry4,
          backgroundColor: tailwindConfig().theme.colors.blue[700],
          hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
          barPercentage: 0.66,
          categoryPercentage: 0.66
        }
      ]
    }),
    [chartDataEntry4, labels]
  );

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const ctx = canvas.current;
    const newChart = new Chart(ctx, {
      type: "bar",
      data,
      options: {
        layout: {
          padding: { top: 40, bottom: 16, left: 20, right: 20 }
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
              color: darkMode
                ? chartColors.textColor.dark
                : chartColors.textColor.light
            },
            grid: {
              color: darkMode
                ? chartColors.gridColor.dark
                : chartColors.gridColor.light
            }
          },
          x: {
            border: { display: false },
            ticks: {
              font: { size: 8 },
              color: darkMode
                ? chartColors.textColor.dark
                : chartColors.textColor.light
            }
          }
        },
        plugins: {
          datalabels: {
            anchor: "end",
            align: "top",
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
              ? chartColors.tooltipBodyColor.dark
              : chartColors.tooltipBodyColor.light,
            backgroundColor: darkMode
              ? chartColors.tooltipBgColor.dark
              : chartColors.tooltipBgColor.light,
            borderColor: darkMode
              ? chartColors.tooltipBorderColor.dark
              : chartColors.tooltipBorderColor.light
          },
          legend: { display: false }
        },
        interaction: { intersect: false, mode: "nearest" },
        animation: { duration: 500 },
        maintainAspectRatio: false,
        resizeDelay: 200
      }
    });

    chartRef.current = newChart;
    return () => newChart.destroy();
  }, [data, darkMode]);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = chartRef.current;

    chartInstance.options.scales.x.ticks.color = darkMode
      ? chartColors.textColor.dark
      : chartColors.textColor.light;
    chartInstance.options.scales.y.ticks.color = darkMode
      ? chartColors.textColor.dark
      : chartColors.textColor.light;
    chartInstance.options.scales.y.grid.color = darkMode
      ? chartColors.gridColor.dark
      : chartColors.gridColor.light;
    chartInstance.options.plugins.tooltip.bodyColor = darkMode
      ? chartColors.tooltipBodyColor.dark
      : chartColors.tooltipBodyColor.light;
    chartInstance.options.plugins.tooltip.backgroundColor = darkMode
      ? chartColors.tooltipBgColor.dark
      : chartColors.tooltipBgColor.light;
    chartInstance.options.plugins.tooltip.borderColor = darkMode
      ? chartColors.tooltipBorderColor.dark
      : chartColors.tooltipBorderColor.light;

    chartInstance.update("none");
  }, [darkMode]);

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
              <FCE1BarChart data={chartData} width={1800} height={800} />
            </div>
          )}
          {modal === 1 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  R1 GAP TIME ACT
                </h2>
              </header>
              <FCE1BarChart data={chartData1} width={1800} height={800} />
            </div>
          )}
          {modal === 2 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  R2 GAP TIME ACT
                </h2>
              </header>
              <FCE1BarChart data={chartData2} width={1800} height={800} />
            </div>
          )}
          {modal === 3 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  FM GAP TIME ACT
                </h2>
              </header>
              <FCE1BarChart data={chartData4} width={1800} height={800} />
            </div>
          )}
        </div>
      </Modal>
      <div className="px-5 py-3"></div>
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}>
          {" "}
        </canvas>
      </div>
    </React.Fragment>
  );
}

export default GapChart;

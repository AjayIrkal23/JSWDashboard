import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback
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
import { tailwindConfig, formatValue } from "../utils/Utils";
import FCE1BarChart from "./FCE1BarChart";
import { AccountContext } from "../context/context";
import { ToMins } from "../utils/roundoff";

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  Tooltip,
  Legend
);

function DelayChart({ data, width, height, shift, frc }) {
  const { period, data: EP, mins } = useContext(AccountContext);
  const [chartData, setChartData] = useState({
    discharge: [],
    extractor: [],
    slip: [],
    travel: [],
    fmeTravel: []
  });
  const [modal, setModal] = useState(null);
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
  const [chart, setChart] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);

  const prepareChartData = useCallback(() => {
    const prepareData = (key, calculation) => {
      if (period === "Last Coil" || period.customp) {
        return [EP?.Excel?.[key]?.toFixed(2) || 0];
      } else if (
        ["Last 5 Coil", "Last Hour", "Last Day"].includes(period) ||
        period?.date
      ) {
        let total = EP?.Excel?.reduce((acc, curr) => acc + (curr[key] || 0), 0);
        return [mins ? ToMins(total) : total?.toFixed(2)];
      } else {
        return ["--"];
      }
    };

    setChartData({
      discharge: prepareData("f_L2L1ExtRdyTimeDiff"),
      extractor: prepareData("f_ExtractCycleTimeDiff"),
      slip: prepareData("f_FCDTravelTmeDelay"),
      travel: prepareData("f_SSPR1TravelTimeDelay"),
      fmeTravel: prepareData("i_FMEntryOpInhibit")
    });
  }, [EP, period, mins]);

  useEffect(() => {
    prepareChartData();
  }, [EP, prepareChartData]);

  useEffect(() => {
    const ctx = canvasRef.current;
    const newChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        layout: { padding: { top: 40, bottom: 16, left: 20, right: 20 } },
        onClick: (evt, element) => {
          if (element.length > 0) {
            const ind = element[0].index;
            setModal(ind === 3 ? 3 : ind);
            setOpen(true);
          } else if (frc) {
            setModal(-1);
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
            grid: { color: darkMode ? gridColor.dark : gridColor.light }
          },
          x: {
            border: { display: false },
            ticks: { color: darkMode ? textColor.dark : textColor.light }
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
              label: (context) => `${context.label}: ${context.parsed.y}`
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
      plugins: [ChartDataLabels]
    });
    setChart(newChart);
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
    if (!chart) return;
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
    darkMode,
    chart,
    textColor,
    gridColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor
  ]);

  const renderModalContent = useCallback(() => {
    switch (modal) {
      case 0:
        return (
          <FCE1BarChart data={chartData.discharge} width={1800} height={800} />
        );
      case 1:
        return (
          <FCE1BarChart data={chartData.extractor} width={1800} height={800} />
        );
      case 2:
        return <FCE1BarChart data={chartData.slip} width={1800} height={800} />;
      case 3:
        return (
          <FCE1BarChart data={chartData.travel} width={1800} height={800} />
        );
      case 7:
        return (
          <FCE1BarChart data={chartData.fmeTravel} width={1800} height={800} />
        );
      default:
        return <div>No data available</div>;
    }
  }, [modal, chartData]);

  return (
    <React.Fragment>
      <Modal open={open} onClose={handleClose}>
        <div className="absolute bg-white outline-none top-[5%] left-[50%] -translate-x-[50%] flex">
          <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                Visualization
              </h2>
            </header>
            {renderModalContent()}
          </div>
        </div>
      </Modal>
      <div className="px-5 py-3"></div>
      <div className="grow">
        <canvas ref={canvasRef} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  );
}

export default DelayChart;

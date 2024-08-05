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

// Import utilities
import { tailwindConfig } from "../utils/Utils";
import ProcessStacked from "./ProcessChartstacked";
import { AccountContext } from "../context/context";

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  Tooltip,
  Legend
);

function ProcessTimeChart({ data, width, height, shift }) {
  const [fourMin, setFour] = useState([]);
  const [threeMin, setThree] = useState([]);
  const [twoMin, setTwo] = useState([]);
  const [oneMin, setOne] = useState([]);
  const [fourMin1, setFour1] = useState([]);
  const [threeMin1, setThree1] = useState([]);
  const [twoMin1, setTwo1] = useState([]);
  const [oneMin1, setOne1] = useState([]);
  const [fourMin2, setFour2] = useState([]);
  const [threeMin2, setThree2] = useState([]);
  const [twoMin2, setTwo2] = useState([]);
  const [oneMin2, setOne2] = useState([]);
  const [fourMin4, setFour4] = useState([]);
  const [threeMin4, setThree4] = useState([]);
  const [twoMin4, setTwo4] = useState([]);
  const [oneMin4, setOne4] = useState([]);
  const { period, data: EP } = useContext(AccountContext);

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

  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(null);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    GapData();
    GapData1();
    GapData2();
    GapData4();
  }, [EP, period]);

  const get135Labels = useCallback(() => {
    let arr = [];
    for (let index = 0; index < 100; index++) {
      if (index * 5 !== 140) {
        arr.push(index * 5);
      } else {
        return arr;
      }
    }
  }, []);

  const GapData = useCallback(() => {
    if (period === "Last Coil" || period.customp) {
      const start = 0;
      const end = 140;
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];

      for (let index = start; index < end; index += 5) {
        let plus5 = index + 5;

        if (
          EP?.pacing?.f_F1GapTimeAct?.toFixed(1) >= index &&
          EP?.pacing?.f_F1GapTimeAct?.toFixed(1) <= plus5
        ) {
          arr1.push(EP?.pacing?.f_SSPProcessTimeAct?.toFixed(1) <= 1 ? 1 : 0);
          arr2.push(
            EP?.pacing?.f_SSPProcessTimeAct?.toFixed(1) > 1 &&
              EP?.pacing?.f_SSPProcessTimeAct?.toFixed(1) <= 5
              ? 1
              : 0
          );
          arr3.push(
            EP?.pacing?.f_SSPProcessTimeAct?.toFixed(1) > 5 &&
              EP?.pacing?.f_SSPProcessTimeAct?.toFixed(1) <= 10
              ? 1
              : 0
          );
          arr4.push(
            EP?.pacing?.f_SSPProcessTimeAct?.toFixed(1) > 11 &&
              EP?.pacing?.f_SSPProcessTimeAct?.toFixed(1) <= 999
              ? 1
              : 0
          );
        }
      }

      setOne(arr1);
      setTwo(arr2);
      setThree(arr3);
      setFour(arr4);
    }
  }, [EP, period]);

  const GapData1 = useCallback(() => {
    if (period === "Last Coil" || period.customp) {
      const start = 0;
      const end = 140;
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];

      for (let index = start; index < end; index += 5) {
        let plus5 = index + 5;

        if (
          EP?.pacing?.f_F1GapTimeAct?.toFixed(1) >= index &&
          EP?.pacing?.f_F1GapTimeAct?.toFixed(1) <= plus5
        ) {
          arr1.push(EP?.pacing?.f_R1ProcessTimeAct?.toFixed(1) <= 1 ? 1 : 0);
          arr2.push(
            EP?.pacing?.f_R1ProcessTimeAct?.toFixed(1) > 1 &&
              EP?.pacing?.f_R1ProcessTimeAct?.toFixed(1) <= 5
              ? 1
              : 0
          );
          arr3.push(
            EP?.pacing?.f_R1ProcessTimeAct?.toFixed(1) > 5 &&
              EP?.pacing?.f_R1ProcessTimeAct?.toFixed(1) <= 10
              ? 1
              : 0
          );
          arr4.push(
            EP?.pacing?.f_R1ProcessTimeAct?.toFixed(1) > 11 &&
              EP?.pacing?.f_R1ProcessTimeAct?.toFixed(1) <= 999
              ? 1
              : 0
          );
        }
      }

      setOne1(arr1);
      setTwo1(arr2);
      setThree1(arr3);
      setFour1(arr4);
    }
  }, [EP, period]);

  const GapData2 = useCallback(() => {
    if (period === "Last Coil" || period.customp) {
      const start = 0;
      const end = 140;
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];

      for (let index = start; index < end; index += 5) {
        let plus5 = index + 5;

        if (
          EP?.pacing?.f_F1GapTimeAct?.toFixed(1) >= index &&
          EP?.pacing?.f_F1GapTimeAct?.toFixed(1) <= plus5
        ) {
          arr1.push(EP?.pacing?.f_R2ProcessTimeAct?.toFixed(1) <= 1 ? 1 : 0);
          arr2.push(
            EP?.pacing?.f_R2ProcessTimeAct?.toFixed(1) > 1 &&
              EP?.pacing?.f_R2ProcessTimeAct?.toFixed(1) <= 5
              ? 1
              : 0
          );
          arr3.push(
            EP?.pacing?.f_R2ProcessTimeAct?.toFixed(1) > 5 &&
              EP?.pacing?.f_R2ProcessTimeAct?.toFixed(1) <= 10
              ? 1
              : 0
          );
          arr4.push(
            EP?.pacing?.f_R2ProcessTimeAct?.toFixed(1) > 11 &&
              EP?.pacing?.f_R2ProcessTimeAct?.toFixed(1) <= 999
              ? 1
              : 0
          );
        }
      }

      setOne2(arr1);
      setTwo2(arr2);
      setThree2(arr3);
      setFour2(arr4);
    }
  }, [EP, period]);

  const GapData4 = useCallback(() => {
    if (period === "Last Coil" || period.customp) {
      const start = 0;
      const end = 140;
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];

      for (let index = start; index < end; index += 5) {
        let plus5 = index + 5;

        if (
          EP?.pacing?.f_F1GapTimeAct?.toFixed(1) >= index &&
          EP?.pacing?.f_F1GapTimeAct?.toFixed(1) <= plus5
        ) {
          arr1.push(EP?.pacing?.f_FMProcessTimeAct?.toFixed(1) <= 1 ? 1 : 0);
          arr2.push(
            EP?.pacing?.f_FMProcessTimeAct?.toFixed(1) > 1 &&
              EP?.pacing?.f_FMProcessTimeAct?.toFixed(1) <= 5
              ? 1
              : 0
          );
          arr3.push(
            EP?.pacing?.f_FMProcessTimeAct?.toFixed(1) > 5 &&
              EP?.pacing?.f_FMProcessTimeAct?.toFixed(1) <= 10
              ? 1
              : 0
          );
          arr4.push(
            EP?.pacing?.f_FMProcessTimeAct?.toFixed(1) > 11 &&
              EP?.pacing?.f_FMProcessTimeAct?.toFixed(1) <= 999
              ? 1
              : 0
          );
        }
      }

      setOne4(arr1);
      setTwo4(arr2);
      setThree4(arr3);
      setFour4(arr4);
    }
  }, [EP, period]);

  const chartData = {
    labels: get135Labels(),
    datasets: [
      {
        data: oneMin,
        label: "SSP Process Time [<=1]",
        backgroundColor: tailwindConfig().theme.colors.orange[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.orange[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: twoMin,
        label: "SSP Process Time [1-5]",
        backgroundColor: tailwindConfig().theme.colors.gray[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.gray[400],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: threeMin,
        label: "SSP Process Time [6-10]",
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: fourMin,
        label: "SSP Process Time [11-999]",
        backgroundColor: tailwindConfig().theme.colors.yellow[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      }
    ]
  };

  const chartData1 = {
    labels: get135Labels(),
    datasets: [
      {
        data: oneMin1,
        label: "R1 Process Time [<=1]",
        backgroundColor: tailwindConfig().theme.colors.orange[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.orange[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: twoMin1,
        label: "R1 Process Time [1-5]",
        backgroundColor: tailwindConfig().theme.colors.gray[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.gray[400],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: threeMin1,
        label: "R1 Process Time [6-10]",
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: fourMin1,
        label: "R1 Process Time [11-999]",
        backgroundColor: tailwindConfig().theme.colors.yellow[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      }
    ]
  };

  const chartData2 = {
    labels: get135Labels(),
    datasets: [
      {
        data: oneMin2,
        label: "R2 Process Time [<=1]",
        backgroundColor: tailwindConfig().theme.colors.orange[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.orange[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: twoMin2,
        label: "R2 Process Time [1-5]",
        backgroundColor: tailwindConfig().theme.colors.gray[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.gray[400],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: threeMin2,
        label: "R2 Process Time [6-10]",
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: fourMin2,
        label: "R2 Process Time [11-999]",
        backgroundColor: tailwindConfig().theme.colors.yellow[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      }
    ]
  };

  const chartData3 = {
    labels: get135Labels(),
    datasets: [
      {
        data: oneMin4,
        label: "FM Process Time [<=1]",
        backgroundColor: tailwindConfig().theme.colors.orange[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.orange[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: twoMin4,
        label: "FM Process Time [1-5]",
        backgroundColor: tailwindConfig().theme.colors.gray[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.gray[300],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: threeMin4,
        label: "FM Process Time [6-10]",
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      },
      {
        data: fourMin4,
        label: "FM Process Time [11-999]",
        backgroundColor: tailwindConfig().theme.colors.yellow[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66
      }
    ]
  };

  const initializeChart = useCallback(() => {
    if (!canvas.current) {
      console.warn("Canvas not found");
      return;
    }

    const ctx = canvas.current.getContext("2d");
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
            stacked: true,
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
            stacked: true,
            border: { display: false },
            ticks: {
              font: 8,
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
          legend: {
            display: false
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
    initializeChart();
  }, [initializeChart]);

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
  }, [currentTheme, chart]);

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
                  SSP PROCESS TIME
                </h2>
              </header>
              <ProcessStacked data={chartData} width={1800} height={800} />
            </div>
          )}
          {modal === 1 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  R1 PROCESS TIME
                </h2>
              </header>
              <ProcessStacked data={chartData1} width={1800} height={800} />
            </div>
          )}
          {modal === 2 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  R2 PROCESS TIME
                </h2>
              </header>
              <ProcessStacked data={chartData2} width={1800} height={800} />
            </div>
          )}
          {modal === 3 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  FM PROCESS TIME
                </h2>
              </header>
              <ProcessStacked data={chartData3} width={1800} height={800} />
            </div>
          )}
        </div>
      </Modal>
      <div className="px-5 py-3"></div>
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  );
}

export default ProcessTimeChart;

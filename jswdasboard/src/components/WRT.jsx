import { Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

// Import utilities
import { tailwindConfig } from "../utils/Utils";
import BarChart01 from "../charts/BarChart01";

import GapChart from "../charts/GapChart";
import ProcessChart from "../charts/ProcessChart";
import ProcessStacked from "../charts/ProcessChartstacked";
import { AccountContext } from "../context/context";
import FCE1BarChart from "../charts/FCE1BarChart";
const GRT = ({ open, setOpen }) => {
  const { period, setPeriod, data: EP } = useContext(AccountContext);
  const [zero, setZero] = useState();
  const [one, setOne] = useState();
  const [two, setTwo] = useState();
  const [three, setThree] = useState();
  const [four, setFour] = useState();
  const [five, setFive] = useState();
  const [six, setSix] = useState();
  const [seven, setSeven] = useState();
  const [eight, setEight] = useState();
  const [nine, setNine] = useState();
  const [ten, setTen] = useState();

  useEffect(() => {
    GRT();
  }, [EP]);
  const [modal, setModal] = useState(null);
  const get135Labels = () => {
    let arr = [];
    for (let index = 0; index < 100; index++) {
      if (index * 5 != 140) {
        arr.push(index * 5);
      } else {
        console.log(arr);
        return arr;
      }
    }
  };
  const GRT = () => {
    if (period == "Last Coil" || period.customp) {
      const start = 0;
      const end = 140;
      let arr0 = [];
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];
      let arr5 = [];
      let arr6 = [];
      let arr7 = [];
      let arr8 = [];
      let arr9 = [];
      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        if (
          EP?.pacing?.f_F1GapTimeAct?.toFixed(1) >= index &&
          EP?.pacing?.f_F1GapTimeAct?.toFixed(1) <= plus5
        ) {
          if (EP?.pacing?.i_WRTIdx == 0) {
            arr1.push(1);
          } else {
            arr1.push(0);
          }
          if (EP?.pacing?.i_WRTIdx == 1) {
            arr1.push(1);
          } else {
            arr1.push(0);
          }
          if (EP?.pacing?.i_WRTIdx == 2) {
            arr2.push(1);
          } else {
            arr2.push(0);
          }
          if (EP?.pacing?.i_WRTIdx == 3) {
            arr3.push(1);
          } else {
            arr3.push(0);
          }
          if (EP?.pacing?.i_WRTIdx == 4) {
            arr4.push(1);
          } else {
            arr4.push(0);
          }
          if (EP?.pacing?.i_WRTIdx == 5) {
            arr5.push(1);
          } else {
            arr5.push(0);
          }
          if (EP?.pacing?.i_WRTIdx == 6) {
            arr6.push(1);
          } else {
            arr6.push(0);
          }
          if (EP?.pacing?.i_WRTIdx == 7) {
            arr7.push(1);
          } else {
            arr7.push(0);
          }
          if (EP?.pacing?.i_WRTIdx == 8) {
            arr8.push(1);
          } else {
            arr8.push(0);
          }
          if (EP?.pacing?.i_WRTIdx == 9) {
            arr9.push(1);
          } else {
            arr9.push(0);
          }
        }
      }
      setZero(arr0);
      setOne(arr1);
      setTwo(arr2);
      setThree(arr3);
      setFour(arr4);
      setFive(arr5);
      setSix(arr6);
      setSeven(arr7);
      setEight(arr8);
      setNine(arr9);
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      const start = 0;
      const end = 140;
      let arr0 = [];
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];
      let arr5 = [];
      let arr6 = [];
      let arr7 = [];
      let arr8 = [];
      let arr9 = [];

      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        let grt0 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_WRTIdx == 0) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_WRTIdx == 0) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt1 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_WRTIdx == 1) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_WRTIdx == 1) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt2 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_WRTIdx == 2) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_WRTIdx == 2) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt3 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_WRTIdx == 3) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_WRTIdx == 3) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt4 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_WRTIdx == 4) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_WRTIdx == 4) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt5 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_WRTIdx == 5) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_WRTIdx == 5) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt6 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_WRTIdx == 6) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_WRTIdx == 6) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt7 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_WRTIdx == 7) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_WRTIdx == 7) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt8 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_WRTIdx == 8) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_WRTIdx == 8) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt9 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_WRTIdx == 9) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_WRTIdx == 9) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);

        arr0.push(grt0);
        arr1.push(grt1);
        arr2.push(grt2);
        arr3.push(grt3);
        arr4.push(grt4);
        arr5.push(grt5);
        arr6.push(grt6);
        arr7.push(grt7);
        arr8.push(grt8);
        arr9.push(grt9);

        // if (total <= 0) {
        //   arr1.push(total?.toFixed(1));
        // } else {
        //   arr1.push(0);
        // }
        // if (total?.toFixed(2) > 1 && total?.toFixed(2) <= 5) {
        //   arr2.push(total?.toFixed(1));
        // } else {
        //   arr2.push(0);
        // }
        // if (total?.toFixed(2) > 5 && total?.toFixed(2) <= 10) {
        //   arr3.push(total?.toFixed(1));
        // } else {
        //   arr3.push(0);
        // }
        // if (total?.toFixed(2) > 11 && total?.toFixed(2) <= 999) {
        //   arr4.push(total?.toFixed(1));
        // } else {
        //   arr4.push(0);
        // }
      }

      setZero(arr0);
      setOne(arr1);
      setTwo(arr2);
      setThree(arr3);
      setFour(arr4);
      setFive(arr5);
      setSix(arr6);
      setSeven(arr7);
      setEight(arr8);
      setNine(arr9);
    }
  };

  const chartData3 = {
    labels: get135Labels(),
    datasets: [
      // Light blue bars
      {
        data: zero,
        label: "The Number of WRT 0",
        backgroundColor: tailwindConfig().theme.colors.orange[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.orange[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: one,
        label: "The Number of WRT 1",
        backgroundColor: tailwindConfig().theme.colors.gray[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.gray[300],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: two,
        label: "The Number of WRT 2",
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: three,
        label: "The Number of WRT 3",
        backgroundColor: tailwindConfig().theme.colors.yellow[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: four,
        label: "The Number of WRT 4",
        backgroundColor: tailwindConfig().theme.colors.green[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: five,
        label: "The Number of WRT 5",
        backgroundColor: tailwindConfig().theme.colors.blue[100],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[200],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: six,
        label: "The Number of WRT 6",
        backgroundColor: tailwindConfig().theme.colors.pink[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.pink[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: seven,
        label: "The Number of WRT 7",
        backgroundColor: tailwindConfig().theme.colors.yellow[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[300],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: eight,
        label: "The Number of WRT 8",
        backgroundColor: tailwindConfig().theme.colors.blue[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[300],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: nine,
        label: "The Number of WRT 9",
        backgroundColor: tailwindConfig().theme.colors.red[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.red[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },

      // Light blue bars

      // Blue bars
    ],
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute  bg-white outline-none top-[5%] left-[50%] -translate-x-[50%] flex">
          <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                WRT Trend
              </h2>
            </header>
            {/* Chart built with Chart.js 3 */}
            {/* Change the height attribute to adjust the chart height */}
            <ProcessStacked data={chartData3} width={1800} height={800} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GRT;

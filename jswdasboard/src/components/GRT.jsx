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
  const [eleven, setEleven] = useState();
  const [twelve, setTwelve] = useState();
  const [threeteen, setThreeteen] = useState();
  const [fourteen, setFourteen] = useState();
  const [fiveteen, setFiveteen] = useState();
  const [sexteen, setSexteen] = useState();
  const [seventeen, setSeventeen] = useState();
  const [eightteen, setEightteen] = useState();
  const [nineteen, setNineteen] = useState();
  const [twenty, setTwenty] = useState();
  const [twentyone, setTwentyone] = useState();
  const [twentytwo, setTwentytwo] = useState();
  const [twentythree, setTwentythree] = useState();
  const [twentyfour, setTwentyfour] = useState();
  const [twentyfive, setTwentyfive] = useState();

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
      let arr10 = [];
      let arr11 = [];
      let arr12 = [];
      let arr13 = [];
      let arr14 = [];
      let arr15 = [];
      let arr16 = [];
      let arr17 = [];
      let arr18 = [];
      let arr19 = [];
      let arr20 = [];
      let arr21 = [];
      let arr22 = [];
      let arr23 = [];
      let arr24 = [];
      let arr25 = [];

      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        if (
          EP?.pacing?.f_F1GapTimeAct?.toFixed(1) >= index &&
          EP?.pacing?.f_F1GapTimeAct?.toFixed(1) <= plus5
        ) {
          if (EP?.pacing?.i_grtIdx == 0) {
            arr1.push(1);
          } else {
            arr1.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 1) {
            arr1.push(1);
          } else {
            arr1.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 2) {
            arr2.push(1);
          } else {
            arr2.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 3) {
            arr3.push(1);
          } else {
            arr3.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 4) {
            arr4.push(1);
          } else {
            arr4.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 5) {
            arr5.push(1);
          } else {
            arr5.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 6) {
            arr6.push(1);
          } else {
            arr6.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 7) {
            arr7.push(1);
          } else {
            arr7.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 8) {
            arr8.push(1);
          } else {
            arr8.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 9) {
            arr9.push(1);
          } else {
            arr9.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 10) {
            arr10.push(1);
          } else {
            arr10.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 11) {
            arr11.push(1);
          } else {
            arr11.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 12) {
            arr12.push(1);
          } else {
            arr12.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 13) {
            arr13.push(1);
          } else {
            arr13.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 14) {
            arr14.push(1);
          } else {
            arr14.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 15) {
            arr15.push(1);
          } else {
            arr15.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 16) {
            arr16.push(1);
          } else {
            arr16.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 17) {
            arr17.push(1);
          } else {
            arr17.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 18) {
            arr18.push(1);
          } else {
            arr18.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 19) {
            arr19.push(1);
          } else {
            arr19.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 20) {
            arr20.push(1);
          } else {
            arr20.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 21) {
            arr21.push(1);
          } else {
            arr21.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 22) {
            arr22.push(1);
          } else {
            arr22.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 23) {
            arr23.push(1);
          } else {
            arr23.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 24) {
            arr24.push(1);
          } else {
            arr24.push(0);
          }
          if (EP?.pacing?.i_grtIdx == 25) {
            arr25.push(1);
          } else {
            arr25.push(0);
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
      setTen(arr10);
      setEleven(arr11);
      setTwelve(arr12);
      setThreeteen(arr13);
      setFourteen(arr14);
      setFiveteen(arr5);
      setSexteen(arr16);
      setSeventeen(arr17);
      setEightteen(arr18);
      setNineteen(arr19);
      setTwenty(arr20);
      setTwentyone(arr21);
      setTwentytwo(arr22);
      setTwentythree(arr23);
      setTwentyfour(arr24);
      setTwentyfive(arr25);
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
      let arr10 = [];
      let arr11 = [];
      let arr12 = [];
      let arr13 = [];
      let arr14 = [];
      let arr15 = [];
      let arr16 = [];
      let arr17 = [];
      let arr18 = [];
      let arr19 = [];
      let arr20 = [];
      let arr21 = [];
      let arr22 = [];
      let arr23 = [];
      let arr24 = [];
      let arr25 = [];
      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        let grt0 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_grtIdx == 0) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 0) {
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
            if (currentValue.i_grtIdx == 1) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 1) {
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
            if (currentValue.i_grtIdx == 2) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 2) {
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
            if (currentValue.i_grtIdx == 3) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 3) {
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
            if (currentValue.i_grtIdx == 4) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 4) {
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
            if (currentValue.i_grtIdx == 5) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 5) {
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
            if (currentValue.i_grtIdx == 6) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 6) {
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
            if (currentValue.i_grtIdx == 7) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 7) {
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
            if (currentValue.i_grtIdx == 8) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 8) {
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
            if (currentValue.i_grtIdx == 9) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 9) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt10 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_grtIdx == 10) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 10) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt11 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_grtIdx == 11) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 11) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt12 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_grtIdx == 12) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 12) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt13 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_grtIdx == 13) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 13) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt14 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_grtIdx == 14) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 14) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt15 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_grtIdx == 15) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 15) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt16 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_grtIdx == 16) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 16) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt17 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_grtIdx == 17) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 17) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt18 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_grtIdx == 18) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 18) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt19 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_grtIdx == 19) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 19) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt20 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_grtIdx == 20) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 20) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt21 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_grtIdx == 21) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 21) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt22 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_grtIdx == 22) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 22) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt23 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_grtIdx == 23) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 23) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt24 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_grtIdx == 24) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 24) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let grt25 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.i_grtIdx == 25) {
              accumulator = accumulator + 1;
            }
          } else if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            index >= 135
          ) {
            if (currentValue.i_grtIdx == 25) {
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
        arr10.push(grt10);
        arr11.push(grt11);
        arr12.push(grt12);
        arr13.push(grt13);
        arr14.push(grt14);
        arr15.push(grt15);
        arr16.push(grt16);
        arr17.push(grt17);
        arr18.push(grt18);
        arr19.push(grt19);
        arr20.push(grt20);
        arr21.push(grt21);
        arr22.push(grt22);
        arr23.push(grt23);
        arr24.push(grt24);
        arr25.push(grt25);

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
      setTen(arr10);
      setEleven(arr11);
      setTwelve(arr12);
      setThreeteen(arr13);
      setFourteen(arr14);
      setFiveteen(arr5);
      setSexteen(arr16);
      setSeventeen(arr17);
      setEightteen(arr18);
      setNineteen(arr19);
      setTwenty(arr20);
      setTwentyone(arr21);
      setTwentytwo(arr22);
      setTwentythree(arr23);
      setTwentyfour(arr24);
      setTwentyfive(arr25);
    }
  };

  const chartData3 = {
    labels: get135Labels(),
    datasets: [
      // Light blue bars
      {
        data: zero,
        label: "The Number of GRT 0",
        backgroundColor: tailwindConfig().theme.colors.orange[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.orange[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: one,
        label: "The Number of GRT 1",
        backgroundColor: tailwindConfig().theme.colors.gray[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.gray[300],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: two,
        label: "The Number of GRT 2",
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: three,
        label: "The Number of GRT 3",
        backgroundColor: tailwindConfig().theme.colors.yellow[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: four,
        label: "The Number of GRT 4",
        backgroundColor: tailwindConfig().theme.colors.green[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: five,
        label: "The Number of GRT 5",
        backgroundColor: tailwindConfig().theme.colors.blue[100],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[200],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: six,
        label: "The Number of GRT 6",
        backgroundColor: tailwindConfig().theme.colors.pink[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.pink[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: seven,
        label: "The Number of GRT 7",
        backgroundColor: tailwindConfig().theme.colors.yellow[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[300],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: eight,
        label: "The Number of GRT 8",
        backgroundColor: tailwindConfig().theme.colors.blue[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[300],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: nine,
        label: "The Number of GRT 9",
        backgroundColor: tailwindConfig().theme.colors.red[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.red[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: ten,
        label: "The Number of GRT 10",
        backgroundColor: tailwindConfig().theme.colors.red[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.red[200],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: eleven,
        label: "The Number of GRT 11",
        backgroundColor: tailwindConfig().theme.colors.orange[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.orange[300],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: twelve,
        label: "The Number of GRT 12",
        backgroundColor: tailwindConfig().theme.colors.purple[100],
        hoverBackgroundColor: tailwindConfig().theme.colors.purple[200],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: threeteen,
        label: "The Number of GRT 13",
        backgroundColor: tailwindConfig().theme.colors.green[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.purple[300],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: fourteen,
        label: "The Number of GRT 14",
        backgroundColor: tailwindConfig().theme.colors.purple[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.purple[400],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: fiveteen,
        label: "The Number of GRT 15",
        backgroundColor: tailwindConfig().theme.colors.red[100],
        hoverBackgroundColor: tailwindConfig().theme.colors.purple[200],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: sexteen,
        label: "The Number of GRT 16",
        backgroundColor: tailwindConfig().theme.colors.pink[100],
        hoverBackgroundColor: tailwindConfig().theme.colors.purple[200],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: seventeen,
        label: "The Number of GRT 17",
        backgroundColor: tailwindConfig().theme.colors.purple[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.purple[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: eightteen,
        label: "The Number of GRT 18",
        backgroundColor: tailwindConfig().theme.colors.red[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.red[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: nineteen,
        label: "The Number of GRT 19",
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: twenty,
        label: "The Number of GRT 20",
        backgroundColor: tailwindConfig().theme.colors.gray[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.gray[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: twentyone,
        label: "The Number of GRT 21",
        backgroundColor: tailwindConfig().theme.colors.orange[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.orange[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: twentytwo,
        label: "The Number of GRT 22",
        backgroundColor: tailwindConfig().theme.colors.gray[100],
        hoverBackgroundColor: tailwindConfig().theme.colors.gray[100],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: twentythree,
        label: "The Number of GRT 23",
        backgroundColor: tailwindConfig().theme.colors.red[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.red[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: twentyfour,
        label: "The Number of GRT 24",
        backgroundColor: tailwindConfig().theme.colors.blue[600],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: twentyfive,
        label: "The Number of GRT 25",
        backgroundColor: tailwindConfig().theme.colors.yellow[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[800],
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
                GRT Trend
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

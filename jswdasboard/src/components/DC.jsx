import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { ToAverage, ToMins, roundOff } from "../utils/roundoff";

const DC = ({ open, setOpen, setTitle }) => {
  const { period, setPeriod, data, mins } = useContext(AccountContext);

  function DCProcessTime(a) {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(data?.pacing?.f_DCProcessTimeAct);
      } else {
        return data?.pacing?.f_DCProcessTimeAct;
      }
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Shift" ||
      period == "Last Day" ||
      period?.date
    ) {
      let total1 =
        data?.pacing.length > 1 &&
        data?.pacing?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_DCProcessTimeAct,
          0
        );

      let value1 = total1;
      if (mins) {
        return ToAverage(ToMins(value1), data?.Excel?.length);
      } else {
        return ToAverage(value1, data?.Excel?.length);
      }

      return value1;
    } else {
      return 0;
    }
  }

  function DCGapTime(a) {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(data?.Excel?.f_DCGapTimeAct);
      } else {
        return data?.Excel?.f_DCGapTimeAct;
      }
      return data?.Excel?.f_DCGapTimeAct;
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let total1 =
        data?.Excel.length > 1 &&
        data?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_DCGapTimeAct,
          0
        );

      let value1 = total1;

      if (mins) {
        return ToAverage(ToMins(value1), data?.Excel?.length);
      } else {
        return ToAverage(value1, data?.Excel?.length);
      }
    } else {
      return 0;
    }
  }

  function GapTimeMinMax(a) {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(data?.Excel?.f_DCGapTimeAct);
      } else {
        return data?.Excel?.f_DCGapTimeAct;
      }
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let min = null;
      let max = 0;
      let total1 =
        data?.Excel.length > 1 &&
        data.Excel.map((item) => {
          if (item.f_SSPGapTimeAct > max) {
            max = item.f_DCGapTimeAct;
          }
          if (min == null) {
            min = item.f_DCGapTimeAct;
          }
          if (item.f_SSPGapTimeAct < min) {
            min = item.f_DCGapTimeAct;
          }
        });

      if (a == "min") {
        if (mins) {
          return ToMins(min);
        } else {
          return min;
        }
      } else if (a == "max") {
        if (mins) {
          return ToMins(max);
        } else {
          return max;
        }
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2 ">
        <p className="font-semibold">DC Gap Time</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(DCGapTime())}</p>
      </div>
      {period != "Last Coil" && (
        <>
          <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
            <p className="font-semibold">Gap Time Min </p>
            <p>-</p>
            <p className="font-semibold">{roundOff(GapTimeMinMax("min"))}</p>
          </div>
          <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
            <p className="font-semibold">Gap Time Max </p>
            <p>-</p>
            <p className="font-semibold">{roundOff(GapTimeMinMax("max"))}</p>
          </div>
        </>
      )}
      <div className="flex text-xs justify-between px-1  pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">Dc Process Time</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(DCProcessTime())}</p>
      </div>
    </div>
  );
};

export default DC;

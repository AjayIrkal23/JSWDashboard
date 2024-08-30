import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { ToAverage, ToMins, roundOff } from "../utils/roundoff";

const R1 = ({ open, setOpen }) => {
  const { period, setPeriod, data, mins } = useContext(AccountContext);
  function R1GapTimeAct() {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(data?.Excel?.f_R1GapTimeAct);
      } else {
        return data?.Excel?.f_R1GapTimeAct;
      }
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Shift" ||
      period == "Last Day" ||
      period?.date
    ) {
      let total1 =
        data?.Excel.length > 1 &&
        data?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_R1GapTimeAct,
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

  function TravelDelay() {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(data?.Excel?.f_SSPR1TravelTimeDelay);
      } else {
        return data?.Excel?.f_SSPR1TravelTimeDelay;
      }
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
            accumulator + currentValue.f_SSPR1TravelTimeDelay,
          0
        );

      let value1 = total1;
      if (mins) {
        return ToMins(value1);
      } else {
        return value1;
      }
    } else {
      return 0;
    }
  }

  function ProcessDelay() {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(data?.Excel?.f_R1ProcessTimeDelay);
      } else {
        return data?.Excel?.f_R1ProcessTimeDelay;
      }
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
            accumulator + currentValue.f_R1ProcessTimeDelay,
          0
        );

      let value1 = total1;

      if (mins) {
        return ToMins(value1);
      } else {
        return value1;
      }
    } else {
      return 0;
    }
  }

  function R1ProcessTimeAct(a) {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(data?.Excel?.f_R1ProcessTimeAct);
      } else {
        return data?.Excel?.f_R1ProcessTimeAct;
      }
      return data?.Excel?.f_R1ProcessTimeAct;
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
            accumulator + currentValue.f_R1ProcessTimeAct,
          0
        );

      if (a == "a") {
        let value1 = total1 / data?.pacing?.length;
        if (mins) {
          return ToMins(value1);
        } else {
          return value1;
        }
      } else {
        if (mins) {
          return ToMins(total1);
        } else {
          return total1;
        }
      }
    } else {
      return 0;
    }
  }

  function GapTimeMinMax(a) {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(data?.Excel?.f_R1GapTimeAct);
      } else {
        return data?.Excel?.f_R1GapTimeAct;
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
            max = item.f_R1GapTimeAct;
          }
          if (min == null) {
            min = item.f_R1GapTimeAct;
          }
          if (item.f_SSPGapTimeAct < min) {
            min = item.f_R1GapTimeAct;
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
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="font-semibold">R1 Gap Time Actual </p>
        <p>-</p>
        <p className="font-semibold">{roundOff(R1GapTimeAct())}</p>
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
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">R1 Process Time Actual</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(R1ProcessTimeAct("a"))}</p>
      </div>

      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">R1 Travel Delay</p>
        <p>-</p>
        <p className="font-semibold ">{roundOff(TravelDelay())}</p>
      </div>
      <div className="flex text-xs justify-between px-1 pb-1 items-center pt-1 italic pr-2 b ">
        <p className="font-semibold">R1 Process Delay</p>
        <p>-</p>
        <p className="font-semibold ">{roundOff(ProcessDelay())}</p>
      </div>
    </div>
  );
};

export default R1;

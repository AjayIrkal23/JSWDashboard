import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { ToAverage, ToMins, roundOff } from "../utils/roundoff";
import axios from "axios";

const FM = ({ open, setOpen }) => {
  const { period, setPeriod, data, mins, rollChange } =
    useContext(AccountContext);
  function FMEPredicted() {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(
          data?.pacing?.f_FMProcessTimePred - data?.pacing?.f_FMProcessTimeAct
        );
      } else {
        return (
          data?.pacing?.f_FMProcessTimePred - data?.pacing?.f_FMProcessTimeAct
        );
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
            accumulator + currentValue.f_FMProcessTimePred,
          0
        );

      let total2 =
        data?.pacing.length > 1 &&
        data?.pacing?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_FMProcessTimeAct,
          0
        );

      console.log(total1);

      let value1 = total1 - total2;

      if (mins) {
        return ToAverage(ToMins(value1), data?.Excel?.length);
      } else {
        return ToAverage(value1, data?.Excel.length);
      }
    } else {
      return 0;
    }
  }

  function FMProcessTime(a) {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(data?.Excel?.f_FMProcessTimeAct);
      } else {
        return data?.Excel?.f_FMProcessTimeAct;
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
            accumulator + currentValue.f_FMProcessTimeAct,
          0
        );

      console.log(total1);

      let value1 = total1 / data?.pacing?.length;

      if (a == "a") {
        let value1 = total1 / data?.pacing?.length;
        if (mins) {
          return ToAverage(ToMins(value1), data?.Excel?.length);
        } else {
          return ToAverage(value1, data?.Excel?.length);
        }
      } else {
        if (mins) {
          return ToMins(value1);
        } else {
          return value1;
        }
      }
    } else {
      return 0;
    }
  }

  function FMGapTime(a) {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(data?.Excel?.f_F1GapTimeAct);
      } else {
        return data?.Excel?.f_F1GapTimeAct;
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
            accumulator + currentValue.f_F1GapTimeAct,
          0
        );

      console.log(total1);

      let value1 = total1 / data?.pacing?.length;

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

  function FMProcessDelay() {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(
          data?.pacing?.f_FMProcessTimePred - data?.pacing?.f_FMProcessTimeAct
        );
      } else {
        return (
          data?.pacing?.f_FMProcessTimePred - data?.pacing?.f_FMProcessTimeAct
        );
      }
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let total1 =
        data?.pacing.length > 1 &&
        data?.pacing?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_FMProcessTimePred,
          0
        );

      let total2 =
        data?.pacing.length > 1 &&
        data?.pacing?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_FMProcessTimeAct,
          0
        );

      console.log(total1);

      let value1 = total1 - total2;

      if (mins) {
        return ToMins(value1);
      } else {
        return value1;
      }
    } else {
      return 0;
    }
  }

  function FMTravelDelay() {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(data?.Excel?.f_R1R2TravelTimeDelay);
      } else {
        return data?.Excel?.f_R1R2TravelTimeDelay;
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
            accumulator + currentValue.f_R1R2TravelTimeDelay,
          0
        );

      console.log(total1);

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

  function GapTimeMinMax(a) {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(data?.Excel?.f_F1GapTimeAct);
      } else {
        return data?.Excel?.f_F1GapTimeAct;
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
            max = item.f_F1GapTimeAct;
          }
          if (min == null) {
            min = item.f_F1GapTimeAct;
          }
          if (item.f_SSPGapTimeAct < min) {
            min = item.f_F1GapTimeAct;
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
    <div className="flex gap-5 ">
      <div className="flex flex-col w-[300px] justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
        <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
          <p className="font-semibold">FM Predicted Gap Time </p>
          <p>-</p>
          <p className="font-semibold">{roundOff(FMEPredicted())}</p>
        </div>
        <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
          <p className="font-semibold">FM Travel Delay </p>
          <p>-</p>
          <p className="font-semibold">{roundOff(FMTravelDelay())}</p>
        </div>
        <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
          <p className="font-semibold">FM Process Time Actual</p>
          <p>-</p>
          <p className="font-semibold">{roundOff(FMProcessTime())}</p>
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
      </div>
      <div className="flex flex-col w-[250px]  border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
        <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
          <p className="font-semibold">FM Gap Time</p>
          <p>-</p>
          <p className="font-semibold ">{roundOff(FMGapTime("a"))}</p>
        </div>

        {data?.Excel?.length > 5 && (
          <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
            <p className="font-semibold">Role Change Delay</p>
            <p>-</p>
            <p className="font-semibold ">{data?.RollChange?.total}</p>
          </div>
        )}

        <div className="flex text-xs justify-between px-1 border-b items-center border-black/40 pt-1 italic pr-2">
          <p className="font-semibold">FM Process Delay Time </p>
          <p>-</p>
          <p className="font-semibold">{roundOff(FMProcessDelay())}</p>
        </div>
      </div>
    </div>
  );
};

export default FM;

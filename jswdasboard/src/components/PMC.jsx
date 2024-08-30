import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { ToMins, roundOff } from "../utils/roundoff";

const PMC = ({ open, setOpen, setTitle }) => {
  const { period, setPeriod, data, mins } = useContext(AccountContext);

  function PMACount(fw) {
    if (period == "Last Coil" || period.customp) {
      if (data?.pacing?.i_PacingMode == 2) {
        let value = 1;
        return Number(value);
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
        data?.pacing?.reduce((accumulator, currentValue) => {
          if (currentValue.i_PacingMode == 2) {
            accumulator = accumulator + 1;
          }
          return accumulator;
        }, 0);
      return Number(total1);
    } else {
      return 0;
    }
  }

  function minutesDiff() {
    if (period == "Last Coil" || period.customp) {
      var differenceValue =
        (new Date(data?.pacing?.gt_FceDisChgTm)?.getTime() -
          new Date(data?.pacing?.gt_PrevFceDisChgTm)?.getTime()) /
        1000;
      differenceValue /= 60;

      if (mins) {
        return ToMins(differenceValue);
      } else {
        return differenceValue;
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
            accumulator + new Date(currentValue.gt_FceDisChgTm)?.getTime(),
          0
        );

      let total2 =
        data?.pacing.length > 1 &&
        data?.pacing?.reduce(
          (accumulator, currentValue) =>
            accumulator + new Date(currentValue.gt_PrevFceDisChgTm)?.getTime(),
          0
        );

      let value1 = total1 - total2;
      var differenceValue = value1 / 1000;
      differenceValue /= 60;
      if (mins) {
        return ToMins(Math.abs(Math.round(differenceValue)));
      } else {
        return Math.abs(Math.round(differenceValue));
      }
    } else {
      return 0;
    }
  }

  function minutesDiff() {
    if (period == "Last Coil" || period.customp) {
      var differenceValue =
        (new Date(data?.pacing?.gt_FceDisChgTm)?.getTime() -
          new Date(data?.pacing?.gt_PrevFceDisChgTm)?.getTime()) /
        1000;
      differenceValue /= 60;

      if (mins) {
        return ToMins(differenceValue);
      } else {
        return differenceValue;
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
            accumulator + new Date(currentValue.gt_FceDisChgTm)?.getTime(),
          0
        );

      let total2 =
        data?.pacing.length > 1 &&
        data?.pacing?.reduce(
          (accumulator, currentValue) =>
            accumulator + new Date(currentValue.gt_PrevFceDisChgTm)?.getTime(),
          0
        );

      let value1 = total1 - total2;
      var differenceValue = value1 / 1000;
      differenceValue /= 60;
      if (mins) {
        return ToMins(Math.abs(Math.round(differenceValue)));
      } else {
        return Math.abs(Math.round(differenceValue));
      }
    } else {
      return 0;
    }
  }

  function FCESSPTravelTime() {
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
      period == "Last Shift" ||
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
        return ToMins(total1);
      } else {
        return total1;
      }
    } else {
      return 0;
    }
  }

  function PacingOffset(pm) {
    if (period == "Last Coil" || period.customp) {
      if (pm == "+" && data?.Excel?.f_GapOffsetOper >= 0) {
        return data?.Excel?.f_GapOffsetOper;
      } else if (pm == "-" && data?.Excel?.f_GapOffsetOper < 0) {
        return data?.Excel?.f_GapOffsetOper;
      } else {
        return 0;
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
            accumulator + currentValue.f_GapOffsetOper,
          0
        );

      let value1 = total1;

      if (pm == "+" && value1 >= 0) {
        return value1;
      } else if (pm == "-" && value1 < 0) {
        return value1;
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
        <p className="font-semibold">Discharge Gap Time</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(minutesDiff())}</p>
      </div>

      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2 ">
        <p className="font-semibold">FCE-SSP Travel Time</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FCESSPTravelTime())}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2 ">
        <p className="font-semibold">PMA Count</p>
        <p>-</p>
        <p className="font-semibold">{PMACount()}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">Pacing Offset (+)</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(PacingOffset("+"))}</p>
      </div>
      <div className="flex text-xs justify-between px-1  items-center pt-1 italic pb-1 pr-2 border-black/40">
        <p className="font-semibold">Pacing Offset (-)</p>
        <p>-</p>
        <p className="font-semibold ">{roundOff(PacingOffset("-"))}</p>
      </div>
    </div>
  );
};

export default PMC;

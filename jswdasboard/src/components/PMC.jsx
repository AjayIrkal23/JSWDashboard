import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { ToMins, roundOff } from "../utils/roundoff";

const PMC = ({ open, setOpen }) => {
  const { period, data, mins } = useContext(AccountContext);

  function PMACount() {
    if (period === "Last Coil" || period.customp) {
      return data?.pacing?.i_PacingMode === 2 ? 1 : 0;
    } else if (
      ["Last 5 Coil", "Last Hour", "Last Shift", "Last Day"].includes(period) ||
      period?.date
    ) {
      return (
        data?.pacing?.reduce(
          (acc, curr) => (curr.i_PacingMode === 2 ? acc + 1 : acc),
          0
        ) || 0
      );
    }
    return 0;
  }

  function minutesDiff() {
    if (period === "Last Coil" || period.customp) {
      const difference =
        (new Date(data?.pacing?.gt_FceDisChgTm) -
          new Date(data?.pacing?.gt_PrevFceDisChgTm)) /
        60000;
      return mins ? ToMins(difference) : difference;
    } else if (
      ["Last 5 Coil", "Last Hour", "Last Shift", "Last Day"].includes(period) ||
      period?.date
    ) {
      const total1 =
        data?.pacing?.reduce(
          (acc, curr) => acc + new Date(curr.gt_FceDisChgTm)?.getTime(),
          0
        ) || 0;
      const total2 =
        data?.pacing?.reduce(
          (acc, curr) => acc + new Date(curr.gt_PrevFceDisChgTm)?.getTime(),
          0
        ) || 0;
      const difference = (total1 - total2) / 60000;
      return mins ? ToMins(Math.abs(difference)) : Math.abs(difference);
    }
    return 0;
  }

  function FCESSPTravelTime() {
    if (period === "Last Coil" || period.customp) {
      return mins
        ? ToMins(data?.Excel?.f_SSPR1TravelTimeDelay)
        : data?.Excel?.f_SSPR1TravelTimeDelay;
    } else if (
      ["Last 5 Coil", "Last Hour", "Last Shift", "Last Day"].includes(period) ||
      period?.date
    ) {
      const total =
        data?.Excel?.reduce(
          (acc, curr) => acc + curr.f_SSPR1TravelTimeDelay,
          0
        ) || 0;
      return mins ? ToMins(total) : total;
    }
    return 0;
  }

  function PacingOffset(pm) {
    if (period === "Last Coil" || period.customp) {
      const offset = data?.Excel?.f_GapOffsetOper;
      return (pm === "+" && offset >= 0) || (pm === "-" && offset < 0)
        ? offset
        : 0;
    } else if (
      ["Last 5 Coil", "Last Hour", "Last Shift", "Last Day"].includes(period) ||
      period?.date
    ) {
      const total =
        data?.Excel?.reduce((acc, curr) => acc + curr.f_GapOffsetOper, 0) || 0;
      return (pm === "+" && total >= 0) || (pm === "-" && total < 0)
        ? total
        : 0;
    }
    return 0;
  }

  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md text-xs bg-[whitesmoke] shadow-md">
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="font-semibold">Discharge Gap Time</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(minutesDiff())}</p>
      </div>

      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="font-semibold">FCE-SSP Travel Time</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FCESSPTravelTime())}</p>
      </div>

      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="font-semibold">PMA Count</p>
        <p>-</p>
        <p className="font-semibold">{PMACount()}</p>
      </div>

      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">Pacing Offset (+)</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(PacingOffset("+"))}</p>
      </div>

      <div className="flex text-xs justify-between px-1 items-center pt-1 italic pb-1 pr-2 border-black/40">
        <p className="font-semibold">Pacing Offset (-)</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(PacingOffset("-"))}</p>
      </div>
    </div>
  );
};

export default PMC;

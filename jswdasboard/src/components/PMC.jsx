import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { ToMins, roundOff } from "../utils/roundoff";

const PMC = ({ open, setOpen, setTitle }) => {
  const { period, data, mins } = useContext(AccountContext);

  const PMACount = () => {
    if (!data || !data.pacing) return 0;

    if (period === "Last Coil" || period.customp) {
      return data.pacing.i_PacingMode === 2 ? 1 : 0;
    } else if (
      ["Last 5 Coil", "Last Hour", "Last Shift", "Last Day"].includes(period) ||
      period?.date
    ) {
      const count = data.pacing.reduce((acc, curr) => {
        return curr.i_PacingMode === 2 ? acc + 1 : acc;
      }, 0);
      return count;
    } else {
      return 0;
    }
  };

  const minutesDiff = () => {
    if (!data || !data.pacing) return 0;

    const getDifference = (time1, time2) =>
      (new Date(time1).getTime() - new Date(time2).getTime()) / 60000;

    if (period === "Last Coil" || period.customp) {
      const difference = getDifference(
        data.pacing.gt_FceDisChgTm,
        data.pacing.gt_PrevFceDisChgTm
      );
      return mins ? ToMins(difference) : difference;
    } else if (
      ["Last 5 Coil", "Last Hour", "Last Shift", "Last Day"].includes(period) ||
      period?.date
    ) {
      const totalDifference = data.pacing.reduce((acc, curr) => {
        return (
          acc + getDifference(curr.gt_FceDisChgTm, curr.gt_PrevFceDisChgTm)
        );
      }, 0);
      return mins ? ToMins(totalDifference) : totalDifference;
    } else {
      return 0;
    }
  };

  const FCESSPTravelTime = () => {
    if (!data || !data.Excel) return 0;

    if (period === "Last Coil" || period.customp) {
      return mins
        ? ToMins(data.Excel.f_SSPR1TravelTimeDelay)
        : data.Excel.f_SSPR1TravelTimeDelay;
    } else if (
      ["Last 5 Coil", "Last Hour", "Last Shift", "Last Day"].includes(period) ||
      period?.date
    ) {
      const totalTravelTime = data.Excel.reduce((acc, curr) => {
        return acc + curr.f_SSPR1TravelTimeDelay;
      }, 0);
      return mins ? ToMins(totalTravelTime) : totalTravelTime;
    } else {
      return 0;
    }
  };

  const PacingOffset = (pm) => {
    if (!data || !data.Excel) return 0;

    const filterOffset = (offset) =>
      (pm === "+" && offset >= 0) || (pm === "-" && offset < 0) ? offset : 0;

    if (period === "Last Coil" || period.customp) {
      return filterOffset(data.Excel.f_GapOffsetOper);
    } else if (
      ["Last 5 Coil", "Last Hour", "Last Shift", "Last Day"].includes(period) ||
      period?.date
    ) {
      const totalOffset = data.Excel.reduce((acc, curr) => {
        return acc + filterOffset(curr.f_GapOffsetOper);
      }, 0);
      return totalOffset;
    } else {
      return 0;
    }
  };

  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md !text-xs bg-[whitesmoke] shadow-md">
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
      <div className="flex text-xs justify-between px-1 items-center pt-1 italic pb-1 pr-2 border-black/40">
        <p className="font-semibold">Pacing Offset (-)</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(PacingOffset("-"))}</p>
      </div>
    </div>
  );
};

export default PMC;

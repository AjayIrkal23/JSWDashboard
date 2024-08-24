import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { ToMins, roundOff } from "../utils/roundoff";

const FM = () => {
  const { period, data, mins } = useContext(AccountContext);

  const calculateCount = (inhibitValue) => {
    if (!data?.Excel?.length) return 0;

    if (period === "Last Coil" || period.customp) {
      return data.Excel.some(
        (item) =>
          item.i_FMEntryOpInhibit === inhibitValue &&
          item.f_FEntF1TravelTimeDelay > 0
      )
        ? 1
        : 0;
    }

    return data.Excel.reduce((acc, item) => {
      if (
        item.i_FMEntryOpInhibit === inhibitValue &&
        item.f_FEntF1TravelTimeDelay > 0
      ) {
        acc += 1;
      }
      return acc;
    }, 0);
  };

  const calculateTime = (inhibitValue) => {
    if (!data?.Excel?.length) return 0;

    if (period === "Last Coil" || period.customp) {
      const time = data.Excel.find(
        (item) =>
          item.i_FMEntryOpInhibit === inhibitValue &&
          item.f_FEntF1TravelTimeDelay > 0
      )?.f_FEntF1TravelTimeDelay;
      return mins ? ToMins(time) : time || 0;
    }

    const totalTime = data.Excel.reduce((acc, item) => {
      if (item.i_FMEntryOpInhibit === inhibitValue) {
        acc += item.f_FEntF1TravelTimeDelay || 0;
      }
      return acc;
    }, 0);

    return mins ? ToMins(totalTime) : totalTime;
  };

  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md text-xs bg-[whitesmoke] shadow-md">
      <div className="flex justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="font-semibold">FM Rocking Man Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(calculateCount(1))}</p>
      </div>
      <div className="flex justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">FM Rocking Auto Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(calculateCount(0))}</p>
      </div>
      <div className="flex justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">Manual Rock Time</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(calculateTime(1))}</p>
      </div>
      <div className="flex justify-between px-1 pb-2 items-center pt-1 italic pr-2">
        <p className="font-semibold">Auto Rock Time</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(calculateTime(0))}</p>
      </div>
    </div>
  );
};

export default FM;

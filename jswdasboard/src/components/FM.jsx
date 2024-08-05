import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { ToMins, roundOff } from "../utils/roundoff";

const FM = ({ open, setOpen }) => {
  const { period, data, mins } = useContext(AccountContext);

  const FmRockManCount = (type) => {
    if (!data || !data.Excel) return 0;

    const isManual = type === "man";
    const inhibitValue = isManual ? 1 : 0;

    if (period === "Last Coil" || period.customp) {
      const entryOpInhibit = data.Excel.i_FMEntryOpInhibit;
      const travelTimeDelay = data.Excel.f_FEntF1TravelTimeDelay;
      if (entryOpInhibit === inhibitValue && travelTimeDelay > 0) {
        return 1;
      }
      return 0;
    }

    if (
      period === "Last 5 Coil" ||
      period === "Last Hour" ||
      period === "Last Shift" ||
      period === "Last Day" ||
      period?.date
    ) {
      const totalCount = data.Excel.reduce(
        (accumulator, currentValue) =>
          currentValue.i_FMEntryOpInhibit === inhibitValue
            ? accumulator + 1
            : accumulator,
        0
      );

      const totalDelay = data.Excel.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.f_FEntF1TravelTimeDelay,
        0
      );

      return totalDelay > 0 ? totalCount : 0;
    }

    return 0;
  };

  const ManualRockMin = (inhibitValue) => {
    if (!data || !data.Excel) return 0;

    if (period === "Last Coil" || period.customp) {
      const travelTimeDelay = data.Excel.f_FEntF1TravelTimeDelay;
      return mins ? ToMins(travelTimeDelay) : travelTimeDelay;
    }

    if (
      period === "Last 5 Coil" ||
      period === "Last Hour" ||
      period === "Last Day" ||
      period?.date
    ) {
      const totalDelay = data.Excel.reduce(
        (accumulator, currentValue) =>
          currentValue.i_FMEntryOpInhibit === inhibitValue
            ? accumulator + currentValue.f_FEntF1TravelTimeDelay
            : accumulator,
        0
      );

      return mins ? ToMins(totalDelay) : totalDelay;
    }

    return 0;
  };

  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="font-semibold">FM Rocking Man Count </p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FmRockManCount("man"))}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">FM Rocking Auto Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FmRockManCount("auto"))}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">Manual Rock Time </p>
        <p>-</p>
        <p className="font-semibold ">{roundOff(ManualRockMin(1))}</p>
      </div>
      <div className="flex text-xs justify-between px-1  pb-2 items-center pt-1 italic pr-2 ">
        <p className="font-semibold">Auto Rock Time </p>
        <p>-</p>
        <p className="font-semibold ">{roundOff(ManualRockMin(0))}</p>
      </div>
    </div>
  );
};

export default FM;

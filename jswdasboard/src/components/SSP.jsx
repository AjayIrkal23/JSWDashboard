import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { ToAverage, ToMins, roundOff } from "../utils/roundoff";

const SSP = ({ open, setOpen }) => {
  const { period, data, mins } = useContext(AccountContext);

  const calculateTotal = (field, fw) => {
    if (!data?.Excel?.length) return 0;

    const total = data.Excel.reduce((acc, curr) => {
      if (curr[field] === fw) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return total;
  };

  const calculateField = (field, operation) => {
    if (!data?.Excel?.length) return 0;

    const total = data.Excel.reduce((acc, curr) => acc + curr[field], 0);
    if (period === "Last Coil" || period.customp) {
      return mins ? ToMins(total) : total;
    } else if (
      ["Last 5 Coil", "Last Hour", "Last Shift", "Last Day"].includes(period) ||
      period?.date
    ) {
      const average = total / data.Excel.length;
      return operation === "average"
        ? ToAverage(mins ? ToMins(total) : total, data.Excel.length)
        : average;
    } else {
      return 0;
    }
  };

  const getMinMax = (field, type) => {
    if (!data?.Excel?.length) return 0;

    const values = data.Excel.map((item) => item[field]);
    const min = Math.min(...values);
    const max = Math.max(...values);

    return type === "min"
      ? mins
        ? ToMins(min)
        : min
      : mins
      ? ToMins(max)
      : max;
  };

  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md text-xs bg-[whitesmoke] shadow-md">
      <div className="flex justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="font-semibold">% of SSP Usage</p>
        <p>-</p>
        <p className="font-semibold">
          {roundOff((calculateTotal("i_SSPUse", 1) / data?.Excel.length) * 100)}
        </p>
      </div>
      <div className="flex justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="font-semibold">SSP Use</p>
        <p>-</p>
        <p className="font-semibold">
          {roundOff(calculateTotal("i_SSPUse", 1))}
        </p>
      </div>
      <div className="flex justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="font-semibold">SSP No Use</p>
        <p>-</p>
        <p className="font-semibold">
          {roundOff(calculateTotal("i_SSPUse", 0))}
        </p>
      </div>
      <div className="flex justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">SSP Process Delay</p>
        <p>-</p>
        <p className="font-semibold">
          {roundOff(calculateField("f_SSPProcessTimeDelay"))}
        </p>
      </div>
      <div className="flex justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">SSP Process Time</p>
        <p>-</p>
        <p className="font-semibold">
          {roundOff(calculateField("f_SSPProcessTimeAct", "average"))}
        </p>
      </div>
      <div className="flex justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">Gap Time Actual</p>
        <p>-</p>
        <p className="font-semibold">
          {roundOff(calculateField("f_SSPGapTimeAct", "average"))}
        </p>
      </div>
      {period !== "Last Coil" && (
        <>
          <div className="flex justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
            <p className="font-semibold">Gap Time Min</p>
            <p>-</p>
            <p className="font-semibold">
              {roundOff(getMinMax("f_SSPGapTimeAct", "min"))}
            </p>
          </div>
          <div className="flex justify-between px-1 pb-1 items-center pt-1 italic pr-2">
            <p className="font-semibold">Gap Time Max</p>
            <p>-</p>
            <p className="font-semibold">
              {roundOff(getMinMax("f_SSPGapTimeAct", "max"))}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SSP;

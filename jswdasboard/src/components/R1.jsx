import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { ToAverage, ToMins, roundOff } from "../utils/roundoff";

const R1 = ({ open, setOpen }) => {
  const { period, data, mins } = useContext(AccountContext);

  const calculateTime = (field, operation) => {
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
        <p className="font-semibold">R1 Gap Time Actual</p>
        <p>-</p>
        <p className="font-semibold">
          {roundOff(calculateTime("f_R1GapTimeAct"))}
        </p>
      </div>
      {period !== "Last Coil" && (
        <>
          <div className="flex justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
            <p className="font-semibold">Gap Time Min</p>
            <p>-</p>
            <p className="font-semibold">
              {roundOff(getMinMax("f_R1GapTimeAct", "min"))}
            </p>
          </div>
          <div className="flex justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
            <p className="font-semibold">Gap Time Max</p>
            <p>-</p>
            <p className="font-semibold">
              {roundOff(getMinMax("f_R1GapTimeAct", "max"))}
            </p>
          </div>
        </>
      )}
      <div className="flex justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">R1 Process Time Actual</p>
        <p>-</p>
        <p className="font-semibold">
          {roundOff(calculateTime("f_R1ProcessTimeAct", "average"))}
        </p>
      </div>
      <div className="flex justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">R1 Travel Delay</p>
        <p>-</p>
        <p className="font-semibold">
          {roundOff(calculateTime("f_SSPR1TravelTimeDelay"))}
        </p>
      </div>
      <div className="flex justify-between px-1 pb-1 items-center pt-1 italic pr-2">
        <p className="font-semibold">R1 Process Delay</p>
        <p>-</p>
        <p className="font-semibold">
          {roundOff(calculateTime("f_R1ProcessTimeDelay"))}
        </p>
      </div>
    </div>
  );
};

export default R1;

import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { ToAverage, ToMins, roundOff } from "../utils/roundoff";

const DC = ({ open, setOpen, setTitle }) => {
  const { period, data, mins } = useContext(AccountContext);

  const calculateTime = (timeData, toMinsFunc, period) => {
    if (period === "Last Coil" || period.customp) {
      return mins ? toMinsFunc(timeData) : timeData;
    } else if (
      period === "Last 5 Coil" ||
      period === "Last Hour" ||
      period === "Last Shift" ||
      period === "Last Day" ||
      period?.date
    ) {
      const total = data?.pacing?.reduce(
        (accumulator, currentValue) => accumulator + currentValue[timeData],
        0
      );
      return mins
        ? ToAverage(toMinsFunc(total), data?.Excel?.length)
        : ToAverage(total, data?.Excel?.length);
    } else {
      return 0;
    }
  };

  const getMinMax = (timeData, type) => {
    if (period === "Last Coil" || period.customp) {
      return mins ? ToMins(data?.Excel[timeData]) : data?.Excel[timeData];
    } else if (
      period === "Last 5 Coil" ||
      period === "Last Hour" ||
      period === "Last Day" ||
      period?.date
    ) {
      let min = null;
      let max = 0;
      data?.Excel?.forEach((item) => {
        if (item[timeData] > max) max = item[timeData];
        if (min === null) min = item[timeData];
        if (item[timeData] < min) min = item[timeData];
      });

      if (type === "min") return mins ? ToMins(min) : min;
      if (type === "max") return mins ? ToMins(max) : max;
    } else {
      return 0;
    }
  };

  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md text-xs bg-[whitesmoke] shadow-md">
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="font-semibold">DC Gap Time</p>
        <p>-</p>
        <p className="font-semibold">
          {roundOff(calculateTime("f_DCGapTimeAct", ToMins, period))}
        </p>
      </div>
      {period !== "Last Coil" && (
        <>
          <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
            <p className="font-semibold">Gap Time Min</p>
            <p>-</p>
            <p className="font-semibold">
              {roundOff(getMinMax("f_DCGapTimeAct", "min"))}
            </p>
          </div>
          <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
            <p className="font-semibold">Gap Time Max</p>
            <p>-</p>
            <p className="font-semibold">
              {roundOff(getMinMax("f_DCGapTimeAct", "max"))}
            </p>
          </div>
        </>
      )}
      <div className="flex text-xs justify-between px-1 pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">DC Process Time</p>
        <p>-</p>
        <p className="font-semibold">
          {roundOff(calculateTime("f_DCProcessTimeAct", ToMins, period))}
        </p>
      </div>
    </div>
  );
};

export default DC;

import React, { useContext, useMemo } from "react";
import { AccountContext } from "../context/context";
import { ToAverage, ToMins, roundOff } from "../utils/roundoff";

const DC = () => {
  const { period, data, mins } = useContext(AccountContext);

  const DCProcessTime = useMemo(() => {
    if (!data?.pacing) return 0;

    const totalProcessTime = Array.isArray(data.pacing)
      ? data.pacing.reduce((acc, curr) => acc + curr.f_DCProcessTimeAct, 0)
      : data.pacing.f_DCProcessTimeAct;

    const result = mins ? ToMins(totalProcessTime) : totalProcessTime;
    return period === "Last Coil" || period.customp
      ? result
      : ToAverage(result, data?.Excel?.length);
  }, [period, data, mins]);

  const DCGapTime = useMemo(() => {
    if (!data?.Excel) return 0;

    const totalGapTime = Array.isArray(data.Excel)
      ? data.Excel.reduce((acc, curr) => acc + curr.f_DCGapTimeAct, 0)
      : data.Excel.f_DCGapTimeAct;

    const result = mins ? ToMins(totalGapTime) : totalGapTime;
    return period === "Last Coil" || period.customp
      ? result
      : ToAverage(result, data?.Excel?.length);
  }, [period, data, mins]);

  const GapTimeMinMax = useMemo(() => {
    if (!data?.Excel || period === "Last Coil") return { min: 0, max: 0 };

    let min = Infinity;
    let max = -Infinity;

    data.Excel.forEach((item) => {
      const gapTime = item.f_DCGapTimeAct;
      if (gapTime > max) max = gapTime;
      if (gapTime < min) min = gapTime;
    });

    return {
      min: mins ? ToMins(min) : min,
      max: mins ? ToMins(max) : max
    };
  }, [period, data, mins]);

  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md !text-xs bg-[whitesmoke] shadow-md">
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2 ">
        <p className="font-semibold">DC Gap Time</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(DCGapTime)}</p>
      </div>
      {period !== "Last Coil" && (
        <>
          <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
            <p className="font-semibold">Gap Time Min</p>
            <p>-</p>
            <p className="font-semibold">{roundOff(GapTimeMinMax.min)}</p>
          </div>
          <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
            <p className="font-semibold">Gap Time Max</p>
            <p>-</p>
            <p className="font-semibold">{roundOff(GapTimeMinMax.max)}</p>
          </div>
        </>
      )}
      <div className="flex text-xs justify-between px-1 pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">DC Process Time</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(DCProcessTime)}</p>
      </div>
    </div>
  );
};

export default DC;

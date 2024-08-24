import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { ToAverage, ToMins, roundOff } from "../utils/roundoff";

const FM = () => {
  const { period, data, mins } = useContext(AccountContext);

  const calculateDifference = (predicted, actual) => {
    return mins ? ToMins(predicted - actual) : predicted - actual;
  };

  const calculateTotal = (field, dataArray) => {
    return dataArray?.reduce((acc, current) => acc + current[field], 0) || 0;
  };

  const calculateAverage = (total, length) => {
    return length > 0 ? total / length : 0;
  };

  const FMEPredicted = () => {
    if (period === "Last Coil" || period.customp) {
      return calculateDifference(
        data?.pacing?.f_FMProcessTimePred,
        data?.pacing?.f_FMProcessTimeAct
      );
    } else {
      const totalPredicted = calculateTotal(
        "f_FMProcessTimePred",
        data?.pacing
      );
      const totalActual = calculateTotal("f_FMProcessTimeAct", data?.pacing);
      return calculateDifference(totalPredicted, totalActual);
    }
  };

  const FMProcessTime = () => {
    if (period === "Last Coil" || period.customp) {
      return mins
        ? ToMins(data?.Excel?.f_FMProcessTimeAct)
        : data?.Excel?.f_FMProcessTimeAct;
    } else {
      const totalActual = calculateTotal("f_FMProcessTimeAct", data?.Excel);
      return calculateAverage(totalActual, data?.pacing?.length);
    }
  };

  const FMGapTime = () => {
    if (period === "Last Coil" || period.customp) {
      return mins
        ? ToMins(data?.Excel?.f_F1GapTimeAct)
        : data?.Excel?.f_F1GapTimeAct;
    } else {
      const totalGapTime = calculateTotal("f_F1GapTimeAct", data?.Excel);
      return calculateAverage(totalGapTime, data?.pacing?.length);
    }
  };

  const GapTimeMinMax = (type) => {
    if (period === "Last Coil" || period.customp) {
      return mins
        ? ToMins(data?.Excel?.f_F1GapTimeAct)
        : data?.Excel?.f_F1GapTimeAct;
    } else {
      let min = null;
      let max = 0;
      data?.Excel?.forEach((item) => {
        const gapTime = item.f_F1GapTimeAct;
        if (gapTime > max) max = gapTime;
        if (min === null || gapTime < min) min = gapTime;
      });
      return type === "min"
        ? mins
          ? ToMins(min)
          : min
        : mins
        ? ToMins(max)
        : max;
    }
  };

  const FMProcessDelay = () => {
    return FMEPredicted();
  };

  const FMTravelDelay = () => {
    if (period === "Last Coil" || period.customp) {
      return mins
        ? ToMins(data?.Excel?.f_R1R2TravelTimeDelay)
        : data?.Excel?.f_R1R2TravelTimeDelay;
    } else {
      const totalTravelDelay = calculateTotal(
        "f_R1R2TravelTimeDelay",
        data?.Excel
      );
      return mins ? ToMins(totalTravelDelay) : totalTravelDelay;
    }
  };

  return (
    <div className="flex gap-5">
      <div className="flex flex-col w-[300px] justify-center border border-black/40 p-1 rounded-md text-xs bg-[whitesmoke] shadow-md">
        <div className="flex justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
          <p className="font-semibold">FM Predicted Gap Time</p>
          <p>-</p>
          <p className="font-semibold">{roundOff(FMEPredicted())}</p>
        </div>
        <div className="flex justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
          <p className="font-semibold">FM Travel Delay</p>
          <p>-</p>
          <p className="font-semibold">{roundOff(FMTravelDelay())}</p>
        </div>
        <div className="flex justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
          <p className="font-semibold">FM Process Time Actual</p>
          <p>-</p>
          <p className="font-semibold">{roundOff(FMProcessTime())}</p>
        </div>
        {period !== "Last Coil" && (
          <>
            <div className="flex justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
              <p className="font-semibold">Gap Time Min</p>
              <p>-</p>
              <p className="font-semibold">{roundOff(GapTimeMinMax("min"))}</p>
            </div>
            <div className="flex justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
              <p className="font-semibold">Gap Time Max</p>
              <p>-</p>
              <p className="font-semibold">{roundOff(GapTimeMinMax("max"))}</p>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col w-[250px] border border-black/40 p-1 rounded-md text-xs bg-[whitesmoke] shadow-md">
        <div className="flex justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
          <p className="font-semibold">FM Gap Time</p>
          <p>-</p>
          <p className="font-semibold">{roundOff(FMGapTime())}</p>
        </div>
        {data?.Excel?.length > 5 && (
          <div className="flex justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
            <p className="font-semibold">Role Change Delay</p>
            <p>-</p>
            <p className="font-semibold">{data?.RollChange?.total}</p>
          </div>
        )}
        <div className="flex justify-between px-1 border-b items-center border-black/40 pt-1 italic pr-2">
          <p className="font-semibold">FM Process Delay Time</p>
          <p>-</p>
          <p className="font-semibold">{roundOff(FMProcessDelay())}</p>
        </div>
      </div>
    </div>
  );
};

export default FM;

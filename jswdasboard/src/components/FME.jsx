import React, { useContext, useEffect } from "react";
import { AccountContext } from "../context/context";
import { ToAverage, ToMins, roundOff } from "../utils/roundoff";
import axios from "axios";

const FM = ({ open, setOpen }) => {
  const { period, data, mins, rollChange } = useContext(AccountContext);

  const calculateTotal = (field) => {
    return data?.pacing.reduce((acc, cur) => acc + cur[field], 0);
  };

  const calculateAverage = (field) => {
    const total = calculateTotal(field);
    return total / data?.pacing?.length;
  };

  const FMEPredicted = () => {
    try {
      if (!data) return 0;

      if (period === "Last Coil" || period.customp) {
        const predicted = data?.pacing?.f_FMProcessTimePred;
        const actual = data?.pacing?.f_FMProcessTimeAct;
        const result = predicted - actual;

        return mins ? ToMins(result) : result;
      }

      const totalPredicted = calculateTotal("f_FMProcessTimePred");
      const totalActual = calculateTotal("f_FMProcessTimeAct");
      const result = totalPredicted - totalActual;

      return mins
        ? ToAverage(ToMins(result), data?.Excel?.length)
        : ToAverage(result, data?.Excel.length);
    } catch (error) {
      console.error("Error in FMEPredicted:", error);
      return 0;
    }
  };

  const FMProcessTime = (average = false) => {
    try {
      if (!data) return 0;

      if (period === "Last Coil" || period.customp) {
        return mins
          ? ToMins(data?.Excel?.f_FMProcessTimeAct)
          : data?.Excel?.f_FMProcessTimeAct;
      }

      const total = calculateTotal("f_FMProcessTimeAct");
      const result = average ? calculateAverage("f_FMProcessTimeAct") : total;

      return mins ? ToMins(result) : result;
    } catch (error) {
      console.error("Error in FMProcessTime:", error);
      return 0;
    }
  };

  const FMGapTime = (average = false) => {
    try {
      if (!data) return 0;

      if (period === "Last Coil" || period.customp) {
        return mins
          ? ToMins(data?.Excel?.f_F1GapTimeAct)
          : data?.Excel?.f_F1GapTimeAct;
      }

      const total = calculateTotal("f_F1GapTimeAct");
      const result = average ? calculateAverage("f_F1GapTimeAct") : total;

      return mins ? ToMins(result) : result;
    } catch (error) {
      console.error("Error in FMGapTime:", error);
      return 0;
    }
  };

  const FMProcessDelay = () => {
    try {
      if (!data) return 0;

      if (period === "Last Coil" || period.customp) {
        const predicted = data?.pacing?.f_FMProcessTimePred;
        const actual = data?.pacing?.f_FMProcessTimeAct;
        const result = predicted - actual;

        return mins ? ToMins(result) : result;
      }

      const totalPredicted = calculateTotal("f_FMProcessTimePred");
      const totalActual = calculateTotal("f_FMProcessTimeAct");
      const result = totalPredicted - totalActual;

      return mins ? ToMins(result) : result;
    } catch (error) {
      console.error("Error in FMProcessDelay:", error);
      return 0;
    }
  };

  const FMTravelDelay = () => {
    try {
      if (!data) return 0;

      if (period === "Last Coil" || period.customp) {
        return mins
          ? ToMins(data?.Excel?.f_R1R2TravelTimeDelay)
          : data?.Excel?.f_R1R2TravelTimeDelay;
      }

      const total = calculateTotal("f_R1R2TravelTimeDelay");
      return mins ? ToMins(total) : total;
    } catch (error) {
      console.error("Error in FMTravelDelay:", error);
      return 0;
    }
  };

  const GapTimeMinMax = (type) => {
    try {
      if (!data) return 0;

      let min = null;
      let max = 0;

      data?.Excel.forEach((item) => {
        const gapTime = item.f_F1GapTimeAct;

        if (gapTime > max) max = gapTime;
        if (min === null || gapTime < min) min = gapTime;
      });

      const result = type === "min" ? min : max;
      return mins ? ToMins(result) : result;
    } catch (error) {
      console.error("Error in GapTimeMinMax:", error);
      return 0;
    }
  };

  return (
    <div className="flex gap-5">
      <div className="flex flex-col w-[300px] justify-center border border-black/40 p-1 rounded-md !text-xs bg-[whitesmoke] shadow-md">
        <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
          <p className="font-semibold">FM Predicted Gap Time</p>
          <p>-</p>
          <p className="font-semibold">{roundOff(FMEPredicted())}</p>
        </div>
        <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
          <p className="font-semibold">FM Travel Delay</p>
          <p>-</p>
          <p className="font-semibold">{roundOff(FMTravelDelay())}</p>
        </div>
        <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
          <p className="font-semibold">FM Process Time Actual</p>
          <p>-</p>
          <p className="font-semibold">{roundOff(FMProcessTime())}</p>
        </div>
        {period !== "Last Coil" && (
          <>
            <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
              <p className="font-semibold">Gap Time Min</p>
              <p>-</p>
              <p className="font-semibold">{roundOff(GapTimeMinMax("min"))}</p>
            </div>
            <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
              <p className="font-semibold">Gap Time Max</p>
              <p>-</p>
              <p className="font-semibold">{roundOff(GapTimeMinMax("max"))}</p>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col w-[250px] border border-black/40 p-1 rounded-md !text-xs bg-[whitesmoke] shadow-md">
        <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
          <p className="font-semibold">FM Gap Time</p>
          <p>-</p>
          <p className="font-semibold">{roundOff(FMGapTime(true))}</p>
        </div>
        {data?.Excel?.length > 5 && (
          <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
            <p className="font-semibold">Role Change Delay</p>
            <p>-</p>
            <p className="font-semibold">{data?.RollChange?.total}</p>
          </div>
        )}
        <div className="flex text-xs justify-between px-1 border-b items-center border-black/40 pt-1 italic pr-2">
          <p className="font-semibold">FM Process Delay Time</p>
          <p>-</p>
          <p className="font-semibold">{roundOff(FMProcessDelay())}</p>
        </div>
      </div>
    </div>
  );
};

export default FM;

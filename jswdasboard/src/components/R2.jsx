import React, { useContext, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { AccountContext } from "../context/context";
import { ToAverage, ToMins, roundOff } from "../utils/roundoff";

const R2 = ({ open, setOpen }) => {
  const { period, data, mins } = useContext(AccountContext);

  const isCustomPeriod = useMemo(
    () => period === "Last Coil" || period.customp,
    [period]
  );

  const getTotalValue = useCallback(
    (field) => {
      if (Array.isArray(data?.Excel) && data.Excel.length > 1) {
        return data.Excel.reduce((acc, cur) => acc + cur[field], 0);
      }
      return 0;
    },
    [data]
  );

  const getValue = useCallback(
    (field) => {
      if (isCustomPeriod) {
        return mins ? ToMins(data?.Excel?.[field]) : data?.Excel?.[field];
      } else {
        const totalValue = getTotalValue(field);
        return mins ? ToMins(totalValue) : totalValue;
      }
    },
    [isCustomPeriod, mins, data, getTotalValue]
  );

  const R1R2TimeTravel = useCallback(() => {
    return getValue("f_R1R2TravelTimeDelay");
  }, [getValue]);

  const R1ProcessTimeAct = useCallback(
    (a) => {
      if (isCustomPeriod) {
        return mins
          ? ToMins(data?.Excel?.f_R2ProcessTimeAct)
          : data?.Excel?.f_R2ProcessTimeAct;
      } else {
        const total1 = getTotalValue("f_R2ProcessTimeAct");
        if (a === "a") {
          const averageValue = total1 / data?.pacing?.length;
          return mins ? ToMins(averageValue) : averageValue;
        } else {
          return mins ? ToMins(total1) : total1;
        }
      }
    },
    [isCustomPeriod, mins, data, getTotalValue]
  );

  const R2GapAct = useCallback(() => {
    if (isCustomPeriod) {
      return mins
        ? ToMins(data?.Excel?.f_R2GapTimeAct)
        : data?.Excel?.f_R2GapTimeAct;
    } else {
      const total1 = getTotalValue("f_R2GapTimeAct");
      return mins
        ? ToAverage(ToMins(total1), data?.Excel?.length)
        : ToAverage(total1, data?.Excel?.length);
    }
  }, [isCustomPeriod, mins, data, getTotalValue]);

  const GapTimeMinMax = useCallback(
    (a) => {
      if (isCustomPeriod) {
        return mins
          ? ToMins(data?.Excel?.f_R2GapTimeAct)
          : data?.Excel?.f_R2GapTimeAct;
      } else {
        let min = null;
        let max = 0;

        if (Array.isArray(data?.Excel) && data.Excel.length > 1) {
          data.Excel.forEach((item) => {
            if (item.f_R2GapTimeAct > max) max = item.f_R2GapTimeAct;
            if (min === null || item.f_R2GapTimeAct < min)
              min = item.f_R2GapTimeAct;
          });
        }

        return a === "min"
          ? mins
            ? ToMins(min)
            : min
          : mins
          ? ToMins(max)
          : max;
      }
    },
    [isCustomPeriod, mins, data]
  );

  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md !text-xs bg-[whitesmoke] shadow-md">
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="font-semibold">R1 R2 Travel Time Delay</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(R1R2TimeTravel())}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="font-semibold">R2 Gap Time Actual</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(R2GapAct())}</p>
      </div>
      {!isCustomPeriod && (
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
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">R2 Process Time Actual</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(R1ProcessTimeAct("a"))}</p>
      </div>

      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">R2 Travel Delay</p>
        <p>-</p>
        <p className="font-semibold ">
          {roundOff(getValue("f_R1R2TravelTimeDelay"))}
        </p>
      </div>
      <div className="flex text-xs justify-between px-1 pb-1 items-center pt-1 italic pr-2">
        <p className="font-semibold">R2 Process Delay</p>
        <p>-</p>
        <p className="font-semibold ">
          {roundOff(getValue("f_R2ProcessTimeDelay"))}
        </p>
      </div>
    </div>
  );
};

R2.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default React.memo(R2);

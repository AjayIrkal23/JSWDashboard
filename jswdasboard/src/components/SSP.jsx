import React, { useContext, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { AccountContext } from "../context/context";
import { ToAverage, ToMins, roundOff } from "../utils/roundoff";

const SSP = ({ open, setOpen }) => {
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

  const getSSPUse = useCallback(
    (fw, sy) => {
      if (isCustomPeriod) {
        return data?.Excel?.i_SSPUse === fw ? 1 : 0;
      } else {
        const total1 = getTotalValue("i_SSPUse");
        if (sy === "%" && fw === 1) {
          return (total1 / data?.Excel?.length) * 100;
        }
        return total1;
      }
    },
    [isCustomPeriod, data, getTotalValue]
  );

  const getValue = useCallback(
    (field) => {
      if (isCustomPeriod) {
        return mins ? ToMins(data?.Excel?.[field]) : data?.Excel?.[field];
      } else {
        const totalValue = getTotalValue(field);
        return mins
          ? ToAverage(ToMins(totalValue), data?.Excel?.length)
          : ToAverage(totalValue, data?.Excel?.length);
      }
    },
    [isCustomPeriod, mins, data, getTotalValue]
  );

  const getMinMax = useCallback(
    (field, type) => {
      if (isCustomPeriod) {
        return mins ? ToMins(data?.Excel?.[field]) : data?.Excel?.[field];
      } else {
        let min = null;
        let max = 0;

        if (Array.isArray(data?.Excel) && data.Excel.length > 1) {
          data.Excel.forEach((item) => {
            if (item[field] > max) max = item[field];
            if (min === null || item[field] < min) min = item[field];
          });
        }

        if (type === "min") {
          return mins ? ToMins(min) : min;
        } else if (type === "max") {
          return mins ? ToMins(max) : max;
        }
        return 0;
      }
    },
    [isCustomPeriod, mins, data]
  );

  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md !text-xs bg-[whitesmoke] shadow-md">
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="font-semibold">% of SSP Usage</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(getSSPUse(1, "%"))}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="font-semibold">SSP Use</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(getSSPUse(1))}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="font-semibold">SSP No Use</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(getSSPUse(0))}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">SSP Process Delay</p>
        <p>-</p>
        <p className="font-semibold">
          {roundOff(getValue("f_SSPProcessTimeDelay"))}
        </p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">SSP Process Time</p>
        <p>-</p>
        <p className="font-semibold">
          {roundOff(getValue("f_SSPProcessTimeAct"))}
        </p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">Gap Time Actual</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(getValue("f_SSPGapTimeAct"))}</p>
      </div>
      {!isCustomPeriod && (
        <>
          <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
            <p className="font-semibold">Gap Time Min</p>
            <p>-</p>
            <p className="font-semibold">
              {roundOff(getMinMax("f_SSPGapTimeAct", "min"))}
            </p>
          </div>
          <div className="flex text-xs justify-between px-1 pb-1 items-center pt-1 italic pr-2">
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

SSP.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default React.memo(SSP);

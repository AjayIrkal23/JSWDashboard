import React, { useContext, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { AccountContext } from "../context/context";
import { ToAverage, ToMins, roundOff } from "../utils/roundoff";

const Wise = ({ open, setOpen }) => {
  const { period, data, mins } = useContext(AccountContext);

  const isCustomPeriod = useMemo(
    () => period === "Last Coil" || period.customp,
    [period]
  );

  const getTotalCount = useCallback(
    (fw) => {
      if (Array.isArray(data?.Excel) && data.Excel.length > 1) {
        return data.Excel.reduce(
          (acc, cur) => (cur.i_FceNum === fw ? acc + 1 : acc),
          0
        );
      }
      return 0;
    },
    [data]
  );

  const FCESlabCount = useCallback(
    (fw) => {
      if (isCustomPeriod) {
        return data?.Excel?.i_FceNum === fw ? 1 : 0;
      } else {
        return getTotalCount(fw);
      }
    },
    [isCustomPeriod, data, getTotalCount]
  );

  const FceDischarge = useCallback(() => {
    if (isCustomPeriod) {
      return data?.Excel?.f_L2L1ExtRdyTimeDiff;
    } else {
      if (Array.isArray(data?.Excel) && data.Excel.length > 1) {
        const total1 = data.Excel.reduce(
          (acc, cur) => acc + cur.f_L2L1ExtRdyTimeDiff,
          0
        );
        return mins ? ToMins(total1) : total1;
      }
      return 0;
    }
  }, [isCustomPeriod, mins, data]);

  const FceExtrator = useCallback(() => {
    if (isCustomPeriod) {
      return mins
        ? ToMins(data?.Excel?.f_ExtractCycleTimeDiff)
        : data?.Excel?.f_ExtractCycleTimeDiff;
    } else {
      if (Array.isArray(data?.Excel) && data.Excel.length > 1) {
        const total1 = data.Excel.reduce(
          (acc, cur) => acc + cur.f_ExtractCycleTimeDiff,
          0
        );
        return mins ? ToMins(total1) : total1;
      }
      return 0;
    }
  }, [isCustomPeriod, mins, data]);

  const FceSlipDelay = useCallback(() => {
    if (isCustomPeriod) {
      return mins
        ? ToMins(data?.Excel?.f_FCDTravelTmeDelay)
        : data?.Excel?.f_FCDTravelTmeDelay;
    } else {
      if (Array.isArray(data?.Excel) && data.Excel.length > 1) {
        const total1 = data.Excel.reduce(
          (acc, cur) => acc + cur.f_FCDTravelTmeDelay,
          0
        );
        return mins ? ToMins(total1) : total1;
      }
      return 0;
    }
  }, [isCustomPeriod, mins, data]);

  const FCESSPTravelTime = useCallback(() => {
    if (isCustomPeriod) {
      return mins
        ? ToMins(data?.pacing?.f_FCE1SSPTravelTimeAct)
        : data?.pacing?.f_FCE1SSPTravelTimeAct;
    } else {
      if (Array.isArray(data?.pacing) && data.pacing.length > 1) {
        const total1 = data.pacing.reduce(
          (acc, cur) => acc + cur.f_FCE1SSPTravelTimeAct,
          0
        );
        return mins
          ? ToAverage(ToMins(total1), data?.Excel?.length)
          : ToAverage(total1, data?.Excel?.length);
      }
      return 0;
    }
  }, [isCustomPeriod, mins, data]);

  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md !text-xs bg-[whitesmoke] shadow-md">
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">Furnace 1 Slab Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FCESlabCount(1))}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">Furnace 2 Slab Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FCESlabCount(2))}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">Furnace 3 Slab Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FCESlabCount(3))}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">FCE Discharge Delay</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FceDischarge())}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">FCE Extractor Delay</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FceExtrator())}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">FCE Slip Delay</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FceSlipDelay())}</p>
      </div>
      <div className="flex text-xs justify-between px-1 pb-1 items-center pt-1 italic pr-2">
        <p className="font-semibold">FCE to SSP Travel Time</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FCESSPTravelTime())}</p>
      </div>
    </div>
  );
};

Wise.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default React.memo(Wise);

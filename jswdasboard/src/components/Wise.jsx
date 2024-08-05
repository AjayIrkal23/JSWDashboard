import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { ToAverage, ToMins, roundOff } from "../utils/roundoff";

const Wise = ({ open, setOpen }) => {
  const { period, data, mins } = useContext(AccountContext);

  const calculateSlabCount = (furnaceNumber) => {
    if (period === "Last Coil" || period.customp) {
      return data?.Excel?.i_FceNum === furnaceNumber ? 1 : 0;
    } else if (
      ["Last 5 Coil", "Last Hour", "Last Shift", "Last Day"].includes(period) ||
      period?.date
    ) {
      return data?.Excel?.reduce(
        (acc, curr) => (curr.i_FceNum === furnaceNumber ? acc + 1 : acc),
        0
      );
    } else {
      return 0;
    }
  };

  const calculateTime = (timeField) => {
    if (period === "Last Coil" || period.customp) {
      return mins ? ToMins(data?.Excel?.[timeField]) : data?.Excel?.[timeField];
    } else if (
      ["Last 5 Coil", "Last Hour", "Last Day"].includes(period) ||
      period?.date
    ) {
      const total = data?.Excel?.reduce(
        (acc, curr) => acc + curr[timeField],
        0
      );
      return mins
        ? ToAverage(ToMins(total), data?.Excel?.length)
        : ToAverage(total, data?.Excel?.length);
    } else {
      return 0;
    }
  };

  const FCESlabCount = calculateSlabCount;
  const FceDischarge = () => calculateTime("f_L2L1ExtRdyTimeDiff");
  const FceExtrator = () => calculateTime("f_ExtractCycleTimeDiff");
  const FceSlipDelay = () => calculateTime("f_FCDTravelTmeDelay");
  const FCESSPTravelTime = () => {
    if (period === "Last Coil" || period.customp) {
      return mins
        ? ToMins(data?.pacing?.f_FCE1SSPTravelTimeAct)
        : data?.pacing?.f_FCE1SSPTravelTimeAct;
    } else if (
      ["Last 5 Coil", "Last Hour", "Last Day"].includes(period) ||
      period?.date
    ) {
      const total = data?.pacing?.reduce(
        (acc, curr) => acc + curr.f_FCE1SSPTravelTimeAct,
        0
      );
      return mins
        ? ToAverage(ToMins(total), data?.Excel?.length)
        : ToAverage(total, data?.Excel?.length);
    } else {
      return 0;
    }
  };

  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md text-xs bg-[whitesmoke] shadow-md">
      <div className="flex justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">Furnace 1 Slab Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FCESlabCount(1))}</p>
      </div>
      <div className="flex justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">Furnace 2 Slab Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FCESlabCount(2))}</p>
      </div>
      <div className="flex justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">Furnace 3 Slab Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FCESlabCount(3))}</p>
      </div>
      <div className="flex justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">FCE Discharge Delay</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FceDischarge())}</p>
      </div>
      <div className="flex justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">FCE Extractor Delay</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FceExtrator())}</p>
      </div>
      <div className="flex justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">FCE Slip Delay</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FceSlipDelay())}</p>
      </div>
      <div className="flex justify-between px-1 pb-1 items-center pt-1 italic pr-2">
        <p className="font-semibold">FCE to SSP Travel Time</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FCESSPTravelTime())}</p>
      </div>
    </div>
  );
};

export default Wise;

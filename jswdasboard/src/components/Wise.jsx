import React, { useContext, useEffect } from "react";
import { AccountContext } from "../context/context";
import { ToMins, roundOff } from "../utils/roundoff";

const Wise = ({ open, setOpen }) => {
  const { period, setPeriod, data, mins } = useContext(AccountContext);
  function FCESlabCount(fw) {
    if (period == "Last Coil" || period.customp) {
      if (fw == 1 && data?.Excel?.i_FceNum == 1) {
        let value = 1;
        return value;
      } else if (fw == 2 && data?.Excel?.i_FceNum == 2) {
        let value = 1;
        return value;
      } else if (fw == 3 && data?.Excel?.i_FceNum == 3) {
        let value = 1;
        return value;
      } else {
        return 0;
      }
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Shift" ||
      period == "Last Day" ||
      period?.date
    ) {
      if (fw == 1) {
        let total1 =
          data?.Excel.length > 1 &&
          data?.Excel?.reduce((accumulator, currentValue) => {
            if (currentValue.i_FceNum == 1) {
              accumulator = accumulator + 1;
            }
            return accumulator;
          }, 0);
        return total1;
      } else if (fw == 2) {
        let total1 =
          data?.Excel.length > 1 &&
          data?.Excel?.reduce((accumulator, currentValue) => {
            if (currentValue.i_FceNum == 2) {
              accumulator = accumulator + 1;
            }
            return accumulator;
          }, 0);
        return total1;
      } else if (fw == 3) {
        let total1 =
          data?.Excel.length > 1 &&
          data?.Excel?.reduce((accumulator, currentValue) => {
            if (currentValue.i_FceNum == 3) {
              accumulator = accumulator + 1;
            }
            return accumulator;
          }, 0);
        return total1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  function FceDischarge() {
    if (period == "Last Coil" || period.customp) {
      return data?.Excel?.f_L2L1ExtRdyTimeDiff;
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let total1 =
        data?.Excel.length > 1 &&
        data?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_L2L1ExtRdyTimeDiff,
          0
        );

      let value1 = total1;

      if (mins) {
        return ToMins(value1);
      } else {
        return value1;
      }
    } else {
      return 0;
    }
  }

  function FceExtrator() {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(data?.Excel?.f_ExtractCycleTimeDiff);
      } else {
        return data?.Excel?.f_ExtractCycleTimeDiff;
      }
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let total1 =
        data?.Excel.length > 1 &&
        data?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_ExtractCycleTimeDiff,
          0
        );

      let value1 = total1;
      if (mins) {
        return ToMins(value1);
      } else {
        return value1;
      }
    } else {
      return 0;
    }
  }

  function FceSlipDelay() {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(data?.Excel?.f_FCDTravelTmeDelay);
      } else {
        return data?.Excel?.f_FCDTravelTmeDelay;
      }
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let total1 =
        data?.Excel.length > 1 &&
        data?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_FCDTravelTmeDelay,
          0
        );

      let value1 = total1;

      if (mins) {
        return ToMins(value1);
      } else {
        return value1;
      }
    } else {
      return 0;
    }
  }

  function FCESSPTravelTime() {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(data?.pacing?.f_FCE1SSPTravelTimeAct);
      } else {
        return data?.pacing?.f_FCE1SSPTravelTimeAct;
      }
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let total1 =
        data?.pacing.length > 1 &&
        data?.pacing?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_FCE1SSPTravelTimeAct,
          0
        );

      let value1 = total1;
      if (mins) {
        return ToMins(value1);
      } else {
        return value1;
      }
    } else {
      return 0;
    }
  }

  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
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
        <p className="font-semibold ">{roundOff(FceExtrator())}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">FCE Slip Delay</p>
        <p>-</p>
        <p className="font-semibold ">{roundOff(FceSlipDelay())}</p>
      </div>
      <div className="flex text-xs justify-between px-1 pb-1 items-center pt-1 italic pr-2 b ">
        <p className="font-semibold">FCE to SSP Travel Time</p>
        <p>-</p>
        <p className="font-semibold ">{roundOff(FCESSPTravelTime())}</p>
      </div>
    </div>
  );
};

export default Wise;

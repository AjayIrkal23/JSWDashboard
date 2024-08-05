import React, { useContext, useCallback } from "react";
import { AccountContext } from "../context/context";

const BottleNeck = () => {
  const { period, data } = useContext(AccountContext);

  const BN = useCallback(
    (b) => {
      if (!data?.pacing) {
        console.warn("Data pacing is missing");
        return "--";
      }

      const checkBottleNeck = (bottleNeck) => {
        return data.pacing.c_BottleNeck?.trim() === bottleNeck ? 1 : 0;
      };

      const calculateTotal = (bottleNeck) => {
        return data.pacing.reduce((accumulator, currentValue) => {
          return currentValue.c_BottleNeck?.trim() === bottleNeck
            ? accumulator + 1
            : accumulator;
        }, 0);
      };

      if (period === "Last Coil" || period.customp) {
        switch (b) {
          case "R1R2":
          case "FCE":
          case "FM":
          case "R1":
          case "R2":
          case "DC":
            return checkBottleNeck(b);
          default:
            return 0;
        }
      } else if (
        ["Last 5 Coil", "Last Hour", "Last Shift", "Last Day"].includes(
          period
        ) ||
        period?.date
      ) {
        switch (b) {
          case "R1R2":
          case "FCE":
          case "R1":
          case "R2":
          case "FM":
          case "DC":
          case "HSB_SSP":
            return calculateTotal(b);
          default:
            return 0;
        }
      } else {
        return "--";
      }
    },
    [data, period]
  );

  return (
    <div className="flex flex-col justify-center border border-black/40 text-xs bg-[whitesmoke] shadow-md pr-[0.25px]">
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="text-center w-full font-semibold">Actual Bottle Neck</p>
      </div>
      <div className="flex">
        {["FCE", "R1R2", "R1", "R2", "FM", "DC", "HSB_SSP"].map(
          (bottleNeck) => (
            <div
              key={bottleNeck}
              className="flex flex-col text-center border-r border-black/40 w-[50px]"
            >
              <p className="border-b font-semibold border-black/40 px-2 pb-1 text-center text-xs">
                {bottleNeck}
              </p>
              <p className="pt-1 font-semibold pb-1">{BN(bottleNeck)}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BottleNeck;

import React, { useContext } from "react";
import { AccountContext } from "../context/context";

const BottleNeck = () => {
  const { period, data } = useContext(AccountContext);

  const countOccurrences = (bottleNeck) => {
    return data?.pacing?.reduce((accumulator, currentValue) => {
      const trimmedValue = currentValue?.c_BottleNeck?.trim();
      if (trimmedValue === bottleNeck) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
  };

  const getBottleNeckCount = (bottleNeckType) => {
    if (period === "Last Coil" || period.customp) {
      return data?.pacing?.c_BottleNeck?.trim() === bottleNeckType ? 1 : 0;
    } else if (
      period === "Last 5 Coil" ||
      period === "Last Hour" ||
      period === "Last Shift" ||
      period === "Last Day" ||
      period?.date
    ) {
      return countOccurrences(bottleNeckType);
    } else {
      return "--";
    }
  };

  const bottleNeckTypes = ["FCE", "R1R2", "R1", "R2", "FM", "DC", "HSB_SSP"];

  return (
    <div className="flex flex-col justify-center border border-black/40 bg-[whitesmoke] shadow-md pr-[0.25px] text-xs">
      <div className="flex justify-between border-b border-black/40 p-1">
        <p className="w-full text-center font-semibold">Actual Bottle Neck</p>
      </div>
      <div className="flex">
        {bottleNeckTypes.map((type) => (
          <div
            key={type}
            className="flex flex-col text-center border-r border-black/40 w-[50px]"
          >
            <p className="border-b font-semibold border-black/40 px-2 pb-1 text-xs">
              {type}
            </p>
            <p className="pt-1 font-semibold pb-1">
              {getBottleNeckCount(type)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottleNeck;

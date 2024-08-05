import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { ToAverage, ToMins, roundOff } from "../utils/roundoff";

const Three = ({ open, setOpen }) => {
  const { period, data, mins } = useContext(AccountContext);

  const calculatePasses = (fw, sy) => {
    if (!data?.Excel?.length) return 0;

    const total = data.Excel.reduce((acc, curr) => {
      if (curr.i_R2PassAct === fw) {
        return acc + 1;
      }
      return acc;
    }, 0);

    if (sy === "%" && fw === 1) {
      return (total / data.Excel.length) * 100;
    } else {
      return total;
    }
  };

  const calculateTravelTimeDelay = () => {
    if (!data?.pacing?.length) return 0;

    const total = data.pacing.reduce(
      (acc, curr) => acc + curr.f_FCE1SSPTravelTimeDelay,
      0
    );

    if (mins) {
      return ToAverage(ToMins(total), data.Excel.length);
    } else {
      return ToAverage(total, data.Excel.length);
    }
  };

  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md text-xs bg-[whitesmoke] shadow-md">
      {period !== "Last Coil" && (
        <div className="flex justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-1">
          <p className="font-semibold">% of R2 3Passes Count</p>
          <p>-</p>
          <p className="font-semibold">{roundOff(calculatePasses(3, "%"))}</p>
        </div>
      )}
      <div className="flex justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-1">
        <p className="font-semibold">R2 3Passes Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(calculatePasses(3))}</p>
      </div>
      <div className="flex justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-1">
        <p className="font-semibold">R2 5Passes Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(calculatePasses(5))}</p>
      </div>
      {period !== "Last Coil" && (
        <div className="flex justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-1">
          <p className="font-semibold">% of R2 5Passes Count</p>
          <p>-</p>
          <p className="font-semibold">{roundOff(calculatePasses(5, "%"))}</p>
        </div>
      )}
      <div className="flex justify-between px-1 pb-1 items-center pt-1 italic pr-2">
        <p className="font-semibold">FCE to SSP Travel Time Delay</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(calculateTravelTimeDelay())}</p>
      </div>
    </div>
  );
};

export default Three;

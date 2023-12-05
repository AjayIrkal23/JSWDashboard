import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { ToMins, roundOff } from "../utils/roundoff";

const Three = ({ open, setOpen }) => {
  const { period, setPeriod, data, mins } = useContext(AccountContext);
  function Passes(fw, sy) {
    if (period == "Last Coil" || period.customp) {
      if (fw == 3 && data?.Excel?.i_R2PassAct == 3) {
        let value = 1;
        return value;
      } else if (fw == 5 && data?.Excel?.i_R2PassAct == 5) {
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
      if (fw == 3) {
        let total1 =
          data?.Excel.length > 1 &&
          data?.Excel?.reduce((accumulator, currentValue) => {
            if (currentValue.i_R2PassAct == 3) {
              accumulator = accumulator + 1;
            }
            return accumulator;
          }, 0);
        if (fw == 3 && sy == "%") {
          return (total1 / data?.Excel.length) * 100;
        } else {
          return total1;
        }
      } else if (fw == 5) {
        let total1 =
          data?.Excel.length > 1 &&
          data?.Excel?.reduce((accumulator, currentValue) => {
            if (currentValue.i_R2PassAct == 5) {
              accumulator = accumulator + 1;
            }
            return accumulator;
          }, 0);

        if (fw == 5 && sy == "%") {
          return (total1 / data?.Excel.length) * 100;
        } else {
          return total1;
        }
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

  function FCESSPTravelTimeDelay() {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(data?.pacing?.f_FCE1SSPTravelTimeDelay);
      } else {
        return data?.pacing?.f_FCE1SSPTravelTimeDelay;
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
            accumulator + currentValue.f_FCE1SSPTravelTimeDelay,
          0
        );

      console.log(total1);

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
      {period != "Last Coil" && (
        <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-1 ">
          <p className="font-semibold">% of R2 3Passes Count</p>
          <p>-</p>
          <p className="font-semibold">{roundOff(Passes(3, "%"))}</p>
        </div>
      )}
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-1 ">
        <p className="font-semibold">R2 3Passes Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(Passes(3))}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-1 ">
        <p className="font-semibold">R2 5Passes Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(Passes(5))}</p>
      </div>

      {period != "Last Coil" && (
        <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-1 ">
          <p className="font-semibold">% of R2 5Passes Count</p>
          <p>-</p>
          <p className="font-semibold">{roundOff(Passes(5, "%"))}</p>
        </div>
      )}
      <div className="flex text-xs justify-between px-1 pb-1 items-center pt-1 italic pr-2 b ">
        <p className="font-semibold">FCE to SSP Travel Time Delay</p>
        <p>-</p>
        <p className="font-semibold ">{roundOff(FCESSPTravelTimeDelay())}</p>
      </div>
    </div>
  );
};

export default Three;

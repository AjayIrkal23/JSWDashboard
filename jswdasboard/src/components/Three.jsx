import React, { useContext, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { AccountContext } from "../context/context";
import { ToAverage, ToMins, roundOff } from "../utils/roundoff";

const Three = ({ open, setOpen }) => {
  const { period, data, mins } = useContext(AccountContext);

  const isCustomPeriod = useMemo(
    () => period === "Last Coil" || period.customp,
    [period]
  );

  const getTotalPassCount = useCallback(
    (fw) => {
      if (Array.isArray(data?.Excel) && data.Excel.length > 1) {
        return data.Excel.reduce(
          (acc, cur) => (cur.i_R2PassAct === fw ? acc + 1 : acc),
          0
        );
      }
      return 0;
    },
    [data]
  );

  const getPasses = useCallback(
    (fw, sy) => {
      if (isCustomPeriod) {
        return data?.Excel?.i_R2PassAct === fw ? 1 : 0;
      } else {
        const total1 = getTotalPassCount(fw);
        return sy === "%" ? (total1 / data?.Excel?.length) * 100 : total1;
      }
    },
    [isCustomPeriod, data, getTotalPassCount]
  );

  const FCESSPTravelTimeDelay = useCallback(() => {
    if (isCustomPeriod) {
      return mins
        ? ToMins(data?.pacing?.f_FCE1SSPTravelTimeDelay)
        : data?.pacing?.f_FCE1SSPTravelTimeDelay;
    } else {
      if (Array.isArray(data?.pacing) && data.pacing.length > 1) {
        const total1 = data.pacing.reduce(
          (acc, cur) => acc + cur.f_FCE1SSPTravelTimeDelay,
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
      {!isCustomPeriod && (
        <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-1">
          <p className="font-semibold">% of R2 3Passes Count</p>
          <p>-</p>
          <p className="font-semibold">{roundOff(getPasses(3, "%"))}</p>
        </div>
      )}
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-1">
        <p className="font-semibold">R2 3Passes Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(getPasses(3))}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-1">
        <p className="font-semibold">R2 5Passes Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(getPasses(5))}</p>
      </div>
      {!isCustomPeriod && (
        <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-1">
          <p className="font-semibold">% of R2 5Passes Count</p>
          <p>-</p>
          <p className="font-semibold">{roundOff(getPasses(5, "%"))}</p>
        </div>
      )}
      <div className="flex text-xs justify-between px-1 pb-1 items-center pt-1 italic pr-2">
        <p className="font-semibold">FCE to SSP Travel Time Delay</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FCESSPTravelTimeDelay())}</p>
      </div>
    </div>
  );
};

Three.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default React.memo(Three);

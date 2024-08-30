import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { ToAverage, ToMins, roundOff } from "../utils/roundoff";

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

      let value1 = total1;

      if (mins) {
        return ToAverage(ToMins(value1), data?.Excel?.length);
      } else {
        return ToAverage(value1, data?.Excel?.length);
      }
    } else {
      return 0;
    }
  }

  return (
    <Card
      bordered={false}
      style={{
        width: 250,
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9"
      }}
    >
      {period !== "Last Coil" && (
        <div className="flex justify-between">
          <Text strong italic>
            % of R2 3Passes Count
          </Text>
          <Text>-</Text>
          <Text strong>{roundOff(Passes(3, "%"))}</Text>
        </div>
      )}

      <div className="flex justify-between mt-2">
        <Text strong italic>
          R2 3Passes Count
        </Text>
        <Text>-</Text>
        <Text strong>{roundOff(Passes(3))}</Text>
      </div>

      <div className="flex justify-between mt-2">
        <Text strong italic>
          R2 5Passes Count
        </Text>
        <Text>-</Text>
        <Text strong>{roundOff(Passes(5))}</Text>
      </div>

      {period !== "Last Coil" && (
        <div className="flex justify-between mt-2">
          <Text strong italic>
            % of R2 5Passes Count
          </Text>
          <Text>-</Text>
          <Text strong>{roundOff(Passes(5, "%"))}</Text>
        </div>
      )}

      <div className="flex justify-between mt-2">
        <Text strong italic>
          FCE to SSP Travel Time Delay
        </Text>
        <Text>-</Text>
        <Text strong>{roundOff(FCESSPTravelTimeDelay())}</Text>
      </div>
    </Card>
  );
};

export default Three;

import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { ToMins, roundOff } from "../utils/roundoff";

const PMC = ({ open, setOpen, setTitle }) => {
  const { period, setPeriod, data, mins } = useContext(AccountContext);

  function PMACount(fw) {
    if (period == "Last Coil" || period.customp) {
      if (data?.pacing?.i_PacingMode == 2) {
        let value = 1;
        return Number(value);
      }
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Shift" ||
      period == "Last Day" ||
      period?.date
    ) {
      let total1 =
        data?.pacing.length > 1 &&
        data?.pacing?.reduce((accumulator, currentValue) => {
          if (currentValue.i_PacingMode == 2) {
            accumulator = accumulator + 1;
          }
          return accumulator;
        }, 0);
      return Number(total1);
    } else {
      return 0;
    }
  }

  function minutesDiff() {
    if (period == "Last Coil" || period.customp) {
      var differenceValue =
        (new Date(data?.pacing?.gt_FceDisChgTm)?.getTime() -
          new Date(data?.pacing?.gt_PrevFceDisChgTm)?.getTime()) /
        1000;
      differenceValue /= 60;

      if (mins) {
        return ToMins(differenceValue);
      } else {
        return differenceValue;
      }
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Shift" ||
      period == "Last Day" ||
      period?.date
    ) {
      let total1 =
        data?.pacing.length > 1 &&
        data?.pacing?.reduce(
          (accumulator, currentValue) =>
            accumulator + new Date(currentValue.gt_FceDisChgTm)?.getTime(),
          0
        );

      let total2 =
        data?.pacing.length > 1 &&
        data?.pacing?.reduce(
          (accumulator, currentValue) =>
            accumulator + new Date(currentValue.gt_PrevFceDisChgTm)?.getTime(),
          0
        );

      let value1 = total1 - total2;
      var differenceValue = value1 / 1000;
      differenceValue /= 60;
      if (mins) {
        return ToMins(Math.abs(Math.round(differenceValue)));
      } else {
        return Math.abs(Math.round(differenceValue));
      }
    } else {
      return 0;
    }
  }

  function minutesDiff() {
    if (period == "Last Coil" || period.customp) {
      var differenceValue =
        (new Date(data?.pacing?.gt_FceDisChgTm)?.getTime() -
          new Date(data?.pacing?.gt_PrevFceDisChgTm)?.getTime()) /
        1000;
      differenceValue /= 60;

      if (mins) {
        return ToMins(differenceValue);
      } else {
        return differenceValue;
      }
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Shift" ||
      period == "Last Day" ||
      period?.date
    ) {
      let total1 =
        data?.pacing.length > 1 &&
        data?.pacing?.reduce(
          (accumulator, currentValue) =>
            accumulator + new Date(currentValue.gt_FceDisChgTm)?.getTime(),
          0
        );

      let total2 =
        data?.pacing.length > 1 &&
        data?.pacing?.reduce(
          (accumulator, currentValue) =>
            accumulator + new Date(currentValue.gt_PrevFceDisChgTm)?.getTime(),
          0
        );

      let value1 = total1 - total2;
      var differenceValue = value1 / 1000;
      differenceValue /= 60;
      if (mins) {
        return ToMins(Math.abs(Math.round(differenceValue)));
      } else {
        return Math.abs(Math.round(differenceValue));
      }
    } else {
      return 0;
    }
  }

  function FCESSPTravelTime() {
    if (period == "Last Coil" || period.customp) {
      if (mins) {
        return ToMins(data?.Excel?.f_SSPR1TravelTimeDelay);
      } else {
        return data?.Excel?.f_SSPR1TravelTimeDelay;
      }
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period == "Last Shift" ||
      period?.date
    ) {
      let total1 =
        data?.Excel.length > 1 &&
        data?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_SSPR1TravelTimeDelay,
          0
        );

      let value1 = total1;

      if (mins) {
        return ToMins(total1);
      } else {
        return total1;
      }
    } else {
      return 0;
    }
  }

  function PacingOffset(pm) {
    if (period == "Last Coil" || period.customp) {
      if (pm == "+" && data?.Excel?.f_GapOffsetOper >= 0) {
        return data?.Excel?.f_GapOffsetOper;
      } else if (pm == "-" && data?.Excel?.f_GapOffsetOper < 0) {
        return data?.Excel?.f_GapOffsetOper;
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
      let total1 =
        data?.Excel.length > 1 &&
        data?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_GapOffsetOper,
          0
        );

      let value1 = total1;

      if (pm == "+" && value1 >= 0) {
        return value1;
      } else if (pm == "-" && value1 < 0) {
        return value1;
      } else {
        return 0;
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
      <div className="flex justify-between">
        <Text strong italic>
          Discharge Gap Time
        </Text>
        <Text>-</Text>
        <Text strong>{roundOff(minutesDiff())}</Text>
      </div>

      <div className="flex justify-between mt-2">
        <Text strong italic>
          FCE-SSP Travel Time
        </Text>
        <Text>-</Text>
        <Text strong>{roundOff(FCESSPTravelTime())}</Text>
      </div>

      <div className="flex justify-between mt-2">
        <Text strong italic>
          PMA Count
        </Text>
        <Text>-</Text>
        <Text strong>{PMACount()}</Text>
      </div>

      <div className="flex justify-between mt-2">
        <Text strong italic>
          Pacing Offset (+)
        </Text>
        <Text>-</Text>
        <Text strong>{roundOff(PacingOffset("+"))}</Text>
      </div>

      <div className="flex justify-between mt-2">
        <Text strong italic>
          Pacing Offset (-)
        </Text>
        <Text>-</Text>
        <Text strong>{roundOff(PacingOffset("-"))}</Text>
      </div>
    </Card>
  );
};

export default PMC;

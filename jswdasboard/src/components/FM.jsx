import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { roundOff } from "../utils/roundoff";

const FM = ({ open, setOpen }) => {
  const { period, setPeriod, data } = useContext(AccountContext);
  function FmRockManCount(a) {
    if(a == "man"){
      if (period == "Last Coil" || period.customp) {
        if(data?.Excel?.i_FMEntryOpInhibit ==1 && data?.Excel?.f_FEntF1TravelTimeDelay > 0 ){
          return 1
        }
        else {
          return 0
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
            currentValue.i_FMEntryOpInhibit == 1 &&  accumulator + 1,
            0
          );
  
          let total2 =
          data?.Excel.length > 1 &&
          data?.Excel?.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.f_FEntF1TravelTimeDelay,
            0
          );
  
          if( total2 >0){
            return total1
          }
  
        
      } else {
        return 0;
      }
    }
    else{
      if (period == "Last Coil" || period.customp) {
        if(data?.Excel?.i_FMEntryOpInhibit ==0 && data?.Excel?.f_FEntF1TravelTimeDelay > 0 ){
          return 1
        }
        else {
          return 0
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
            currentValue.i_FMEntryOpInhibit == 0 &&  accumulator + 1,
            0
          );
  
          let total2 =
          data?.Excel.length > 1 &&
          data?.Excel?.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.f_FEntF1TravelTimeDelay,
            0
          );
  
          if( total2 >0){
            return total1
          }
  
        
      } else {
        return 0;
      }
    }
    }
   


  function ManualRockMin(a) {
    if (period == "Last Coil" || period.customp) {
      return (data?.Excel?.i_FMEntryOpInhibit == a && data?.Excel?.f_FEntF1TravelTimeDelay ) 
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
          currentValue.i_FMEntryOpInhibit == a && accumulator + currentValue.f_FEntF1TravelTimeDelay,
          0
        );

      console.log(total1);

      let value1 = total1 

      return (value1) 
    } else {
      return 0;
    }
  }
  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="font-semibold">FM Rocking Man Count </p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FmRockManCount("man"))}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">FM Rocking Auto Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FmRockManCount("auto"))}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p className="font-semibold">Manual Rock Time </p>
        <p>-</p>
        <p className="font-semibold ">{roundOff(ManualRockMin("1"))}</p>
      </div>
      <div className="flex text-xs justify-between px-1  pb-2 items-center pt-1 italic pr-2 ">
        <p className="font-semibold">Auto Rock Time </p>
        <p>-</p>
        <p className="font-semibold ">{roundOff(ManualRockMin("0"))}</p>
      </div>
    </div>
  );
};

export default FM;

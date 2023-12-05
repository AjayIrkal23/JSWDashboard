import React, { useContext, useState } from "react";
import Header from "../partials/Header";
import PMC from "../components/PMC";
import Three from "../components/Three";
import Wise from "../components/Wise";
import SSP from "../components/SSP";
import R1 from "../components/R1";
import R2 from "../components/R2";
import FM from "../components/FM";
import FME from "../components/FME";
import { AccountContext } from "../context/context";
import BottleNeck from "../components/BottleNeck";
import DC from "../components/DC";
import Delays from "../components/Delays";
import Gaps from "../components/Gaps";
import Processes from "../components/Processes";
import FRC from "../components/FRCDelay";
import BN from "../components/BN";
import GRT from "../components/GRT";
import WRT from "../components/WRT";
import LoadingG from "../components/LoadingG";
import Charging from "../components/Charging";
import PieceID from "../components/PieceID";
import Date from "../components/Date";

const Live = () => {
  const handleChange = (e) => {
    setPeriod(e);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [pieceId, setPieceId] = useState(false);
  const [date, setDate] = useState(false);
  const { period, setPeriod, data, setMins, mins } = useContext(AccountContext);

  return (
    <div>
      <div>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className=" relative h-[90vh] bg-cover bg-no-repeat ">
          <img
            src="http://127.0.0.1:5000/video"
            className="absolute w-screen h-screen"
          />
          <div className="sticky top-[15%] px-4 flex gap-6  !text-xs justify-start ml-14">
            <div className=" w-[300px] ">
              <LoadingG data={data} />
            </div>
            <div className=" w-[300px] ">
              <Charging />
            </div>
          </div>
          <div className="sticky top-[25%] px-4 flex gap-6  !text-xs justify-end mr-20">
            <div className=" w-[200px] ">
              <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
                <div className="flex text-xs justify-between px-1  pb-2 items-center border-black/40 pt-1 italic pr-2 ">
                  <p className="font-semibold">Rev Pass Kick Out Time</p>
                  <p>-</p>
                  <p className="font-semibold">25</p>
                </div>
              </div>
            </div>
            <div className=" w-[200px] rounded-md">
              <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
                <div className="flex text-xs justify-between px-1  pb-2 items-center border-black/40 pt-1 italic pr-2 ">
                  <p className="font-semibold">Fwd Pass Kick Out Time</p>
                  <p>-</p>
                  <p className="font-semibold">25</p>
                </div>
              </div>
            </div>
            <div className=" w-[200px] ">
              <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
                {" "}
                <div className="flex text-xs justify-between px-1  pb-2 items-center border-black/40 pt-1 italic pr-2 ">
                  <p className="font-semibold">Rev Pass Kick Out Time</p>
                  <p>-</p>
                  <p className="font-semibold">25</p>
                </div>
              </div>
            </div>
            <div className=" w-[200px] rounded-md">
              <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
                <div className="flex text-xs justify-between px-1  pb-2 items-center border-black/40 pt-1 italic pr-2 ">
                  <p className="font-semibold">Fwd Pass Kick Out Time</p>
                  <p>-</p>
                  <p className="font-semibold">25</p>
                </div>
              </div>
            </div>
            <div className=" w-[200px] rounded-md">
              <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
                <div className="flex text-xs justify-between px-1  pb-2 items-center border-black/40 pt-1 italic pr-2 ">
                  <p className="font-semibold">RM Transfer Bar Thickness</p>
                  <p>-</p>
                  <p className="font-semibold">25</p>
                </div>
              </div>
            </div>
          </div>
          <div className="sticky top-[47%] px-4 flex gap-24  !text-xs justify-center">
            <div className=" w-[250px] ">
              <PMC />
            </div>
            <div className="    w-[250px]   ">
              <Three />
            </div>
            <div className=" w-[250px]">
              <Wise />
            </div>
            <div className=" w-[250px]">
              <SSP />
            </div>
            <div className=" w-[250px]">
              <R1 />
            </div>
            <div className=" w-[250px]">
              <R2 />
            </div>
            <div className=" w-[250px]">
              <FM />
            </div>
          </div>

          <div className="sticky top-[75%] px-4 flex gap-6  !text-xs justify-between ml-52">
            <div className=" w-[750px]">
              <FME />
            </div>
            <div className="  ml-[200px] mt-8">
              <BottleNeck />
            </div>
            <div className="ml-[100px] mt-10 w-[300px] mr-24">
              <DC />
            </div>
          </div>

          <div className="sticky top-[90%] pl-6 pt- pt-5 flex left-5 text-center gap-24">
            <div>
              <p className="text-white font-semibold text-sm italic pb-1">
                Please Select An Option
              </p>
              <div className="  border flex  justify-center border-black cursor-pointer bg-white shadow-md">
                <div
                  onClick={() => handleChange("Last Coil")}
                  className={`${
                    period === "Last Coil" && "bg-blue-500 !text-white"
                  } hover:bg-blue-500  p-3 italic font-semibold  hover:text-white text-sm border-r border-black`}
                >
                  <p>Last Coil</p>
                </div>
                <div
                  onClick={() => handleChange("Last 5 Coil")}
                  className={`${
                    period === "Last 5 Coil" && " bg-blue-500 !text-white"
                  } hover:bg-blue-500  p-3 italic font-semibold hover:text-white  text-sm border-r border-black`}
                >
                  <p>Last 5 Coils</p>
                </div>
                <div
                  onClick={() => handleChange("Last Hour")}
                  className={`${
                    period === "Last Hour" && " bg-blue-500 !text-white"
                  } hover:bg-blue-500 hover:text-white  p-3 italic font-semibold border-r border-black  text-sm `}
                >
                  <p>Last Hour</p>
                </div>
                {/* <div
                  onClick={() => handleChange("Last Shift")}
                  className={`${
                    period === "Last Shift" && "bg-blue-500 !text-white"
                  } hover:bg-blue-500  p-3 italic font-semibold  hover:text-white text-sm border-r border-black`}
                >
                  <p>Last Shift</p>
                </div> */}
                <div
                  onClick={() => handleChange("Last Day")}
                  className={`${
                    period === "Last Day" && " bg-blue-500 !text-white"
                  } hover:bg-blue-500 hover:text-white  p-3 italic font-semibold border-r border-black  text-sm `}
                >
                  <p>Last Day</p>
                </div>
                <div
                  onClick={() => setPieceId(true)}
                  className={`$ hover:bg-blue-500 hover:text-white  p-3 italic font-semibold border-r border-black  text-sm `}
                >
                  <p>Custom Piece</p>
                </div>
                <div
                  onClick={() => setDate(true)}
                  className={`${
                    period === "Custom" && " bg-blue-500 !text-white"
                  } hover:bg-blue-500 hover:text-white  p-3 italic font-semibold   text-sm `}
                >
                  <p>Custom Date</p>
                </div>
              </div>
            </div>

            <div className="">
              <p className="text-white text-sm italic font-semibold pb-1">
                Visual Graphs
              </p>
              <div className="  flex  justify-center border-black cursor-pointer  gap-3">
                <div
                  onClick={(e) => setOpen(true)}
                  className={`
               hover:bg-blue-500  bg-blue-500  text-white hover:scale-105 transition-all duration-200 ease-in-out p-3 italic font-semibold bg-blue shadow-md rounded-md hover:text-white text-sm  `}
                >
                  <p>Delay</p>
                </div>
                <div
                  onClick={(e) => setOpen1(true)}
                  className={`
              hover:bg-blue-500 bg-blue-500 text-white hover:scale-105 transition-all duration-200 ease-in-out p-3 italic font-semibold bg-blue shadow-md rounded-md hover:text-white text-sm  `}
                >
                  <p>Gap Time</p>
                </div>
                <div
                  onClick={(e) => setOpen2(true)}
                  className={`
             hover:bg-blue-500 bg-blue-500 text-white hover:scale-105 transition-all duration-200 ease-in-out p-3 italic font-semibold bg-blue shadow-md rounded-md hover:text-white text-sm  `}
                >
                  <p>Process Time</p>
                </div>
                <div
                  onClick={(e) => setOpen3(true)}
                  className={`
             hover:bg-blue-500 bg-blue-500 text-white hover:scale-105 transition-all duration-200 ease-in-out p-3 italic font-semibold bg-blue shadow-md rounded-md hover:text-white text-sm  `}
                >
                  <p>FRC </p>
                </div>
                <div
                  onClick={(e) => setOpen4(true)}
                  className={`
             hover:bg-blue-500 bg-blue-500 text-white hover:scale-105 transition-all duration-200 ease-in-out p-3 italic font-semibold bg-blue shadow-md rounded-md hover:text-white text-sm  `}
                >
                  <p>Bottle Neck </p>
                </div>
                <div
                  onClick={(e) => setOpen5(true)}
                  className={`
            hover:bg-blue-500 bg-blue-500 text-white hover:scale-105 transition-all duration-200 ease-in-out p-3 italic font-semibold bg-blue shadow-md rounded-md hover:text-white text-sm  `}
                >
                  <p>GRT Trend</p>
                </div>
                <div
                  onClick={(e) => setOpen6(true)}
                  className={`
            hover:bg-blue-500 bg-blue-500 text-white hover:scale-105 transition-all duration-200 ease-in-out p-3 italic font-semibold bg-blue shadow-md rounded-md hover:text-white text-sm  `}
                >
                  <p>WRT Trend</p>
                </div>
              </div>
            </div>
            <div className="flex     justify-center items-center mt-6">
              {" "}
              <div
                onClick={() => setMins(false)}
                className={`${
                  mins === false && " bg-blue-500  !text-white"
                } hover:bg-blue-500 hover:text-white w-[100px] border-black/40 py-2 !border-r-0  border   italic !cursor-pointer font-semibold  border-black  text-sm `}
              >
                <p>Seconds</p>
              </div>
              <div
                onClick={() => setMins(true)}
                className={`${
                  mins === true && " bg-blue-500  !text-white"
                } hover:bg-blue-500 hover:text-white w-[100px] py-2  border-black/40 border  italic !cursor-pointer font-semibold border-r border-black  text-sm `}
              >
                <p>Mins</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Delays open={open} setOpen={setOpen} />
      <Gaps open={open1} setOpen={setOpen1} />
      <Processes open={open2} setOpen={setOpen2} />
      <FRC open={open3} setOpen={setOpen3} />
      <BN open={open4} setOpen={setOpen4} />
      <GRT open={open5} setOpen={setOpen5} />
      <WRT open={open6} setOpen={setOpen6} />
      <PieceID open={pieceId} setOpen={setPieceId} />
      <Date open={date} setOpen={setDate} />
    </div>
  );
};

export default Live;

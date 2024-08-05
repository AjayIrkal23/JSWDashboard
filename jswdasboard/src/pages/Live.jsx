import React, { useContext, useState, useEffect } from "react";
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
import ProcessTime from "../components/ProcessTime";

const Live = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [pieceId, setPieceId] = useState(false);
  const [date, setDate] = useState(false);

  const { period, setPeriod, data, setMins, mins } = useContext(AccountContext);

  useEffect(() => {
    console.log("Data updated:", data);
  }, [data]);

  const handleChange = (e) => {
    setPeriod(e);
  };

  const getRM = () => {
    if (data?.RM) {
      if (period === "Last Coil" || period.customp) {
        return data?.RM[0]?.f_R2StripThk;
      } else if (
        period === "Last 5 Coil" ||
        period === "Last Hour" ||
        period === "Last Shift" ||
        period === "Last Day" ||
        period?.date
      ) {
        console.log("RM data:", data?.RM);
        const total = data?.RM.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_R2StripThk,
          0
        );
        return Number(total / data?.RM.length);
      } else {
        return 0;
      }
    }
  };

  return (
    <div>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative h-[90vh] bg-cover bg-no-repeat">
        <img
          src="http://127.0.0.1:5000/video"
          className="absolute w-screen h-screen"
          alt="Live Video"
        />
        <div className="sticky top-[15%] px-4 flex gap-6 !text-xs justify-start ml-14">
          <div className="w-[300px]">
            <LoadingG data={data} />
          </div>
          <div className="w-[300px]">
            <Charging />
          </div>
        </div>
        <div className="sticky top-[25%] px-4 flex gap-6 !text-xs justify-end mr-20">
          <InfoCard title="Rev Pass Kick Out Time" value={25} />
          <InfoCard title="Fwd Pass Kick Out Time" value={25} />
          <InfoCard title="Rev Pass Kick Out Time" value={25} />
          <InfoCard title="Fwd Pass Kick Out Time" value={25} />
          <InfoCard
            title="RM Transfer Bar Thickness"
            value={Math.round(getRM())}
          />
        </div>
        <div className="sticky top-[47%] px-4 flex gap-24 !text-xs justify-center">
          <PMC />
          <Three />
          <Wise />
          <SSP />
          <R1 />
          <R2 />
          <FM />
        </div>
        <div className="sticky top-[75%] px-4 flex gap-6 !text-xs justify-between ml-52">
          <FME />
          <BottleNeck />
          <DC />
        </div>
        <div className="sticky top-[90%] pl-6 pt-5 flex left-5 text-center gap-24">
          <PeriodSelector
            period={period}
            handleChange={handleChange}
            setPieceId={setPieceId}
            setDate={setDate}
          />
          <GraphSelector
            setOpen={setOpen}
            setOpen1={setOpen1}
            setOpen2={setOpen2}
            setOpen3={setOpen3}
            setOpen4={setOpen4}
            setOpen5={setOpen5}
            setOpen6={setOpen6}
            setOpen7={setOpen7}
          />
          <TimeUnitSelector mins={mins} setMins={setMins} />
        </div>
      </div>
      <Delays open={open} setOpen={setOpen} />
      <Gaps open={open1} setOpen={setOpen1} />
      <Processes open={open2} setOpen={setOpen2} />
      <ProcessTime open={open7} setOpen={setOpen7} />
      <FRC open={open3} setOpen={setOpen3} />
      <BN open={open4} setOpen={setOpen4} />
      <GRT open={open5} setOpen={setOpen5} />
      <WRT open={open6} setOpen={setOpen6} />
      <PieceID open={pieceId} setOpen={setPieceId} />
      <Date open={date} setOpen={setDate} />
    </div>
  );
};

const InfoCard = ({ title, value }) => (
  <div className="w-[200px] rounded-md">
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md !text-xs bg-[whitesmoke] shadow-md">
      <div className="flex text-xs justify-between px-1 pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="font-semibold">{title}</p>
        <p>-</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

const PeriodSelector = ({ period, handleChange, setPieceId, setDate }) => (
  <div>
    <p className="text-white font-semibold text-sm italic pb-1">
      Please Select An Option
    </p>
    <div className="border flex justify-center border-black cursor-pointer bg-white shadow-md">
      <PeriodButton
        period={period}
        currentPeriod="Last Coil"
        handleChange={handleChange}
      />
      <PeriodButton
        period={period}
        currentPeriod="Last 5 Coil"
        handleChange={handleChange}
      />
      <PeriodButton
        period={period}
        currentPeriod="Last Hour"
        handleChange={handleChange}
      />
      <PeriodButton
        period={period}
        currentPeriod="Last Shift"
        handleChange={handleChange}
      />
      <PeriodButton
        period={period}
        currentPeriod="Last Day"
        handleChange={handleChange}
      />
      <PeriodButton
        period={period}
        currentPeriod="Custom Piece"
        handleChange={() => setPieceId(true)}
      />
      <PeriodButton
        period={period}
        currentPeriod="Custom Date"
        handleChange={() => setDate(true)}
      />
    </div>
  </div>
);

const PeriodButton = ({ period, currentPeriod, handleChange }) => (
  <div
    onClick={() => handleChange(currentPeriod)}
    className={`${
      period === currentPeriod && "bg-blue-500 !text-white"
    } hover:bg-blue-500 p-3 italic font-semibold hover:text-white text-sm border-r border-black`}
  >
    <p>{currentPeriod}</p>
  </div>
);

const GraphSelector = ({
  setOpen,
  setOpen1,
  setOpen2,
  setOpen3,
  setOpen4,
  setOpen5,
  setOpen6,
  setOpen7
}) => (
  <div>
    <p className="text-white text-sm italic font-semibold pb-1">
      Visual Graphs
    </p>
    <div className="flex justify-center border-black cursor-pointer gap-3">
      <GraphButton label="Delay" onClick={() => setOpen(true)} />
      <GraphButton label="Gap Time" onClick={() => setOpen1(true)} />
      <GraphButton label="Process Delay Time" onClick={() => setOpen2(true)} />
      <GraphButton label="Process Time" onClick={() => setOpen7(true)} />
      <GraphButton label="FRC" onClick={() => setOpen3(true)} />
      <GraphButton label="Bottle Neck" onClick={() => setOpen4(true)} />
      <GraphButton label="GRT Trend" onClick={() => setOpen5(true)} />
      <GraphButton label="WRT Trend" onClick={() => setOpen6(true)} />
    </div>
  </div>
);

const GraphButton = ({ label, onClick }) => (
  <div
    onClick={onClick}
    className="hover:bg-blue-500 bg-blue-500 text-white hover:scale-105 transition-all duration-200 ease-in-out p-3 italic font-semibold bg-blue shadow-md rounded-md hover:text-white text-sm"
  >
    <p>{label}</p>
  </div>
);

const TimeUnitSelector = ({ mins, setMins }) => (
  <div className="flex justify-center items-center mt-6">
    <TimeUnitButton
      label="Seconds"
      active={!mins}
      onClick={() => setMins(false)}
    />
    <TimeUnitButton label="Mins" active={mins} onClick={() => setMins(true)} />
  </div>
);

const TimeUnitButton = ({ label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`${
      active && "bg-blue-500 !text-white"
    } hover:bg-blue-500 hover:text-white w-[100px] py-2 border-black/40 border italic !cursor-pointer font-semibold border-black text-sm`}
  >
    <p>{label}</p>
  </div>
);

export default Live;

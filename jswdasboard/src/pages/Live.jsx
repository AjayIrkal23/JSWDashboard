import React, { useContext, useState, useMemo } from "react";
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
  const { period, setPeriod, data, setMins, mins } = useContext(AccountContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modals, setModals] = useState({
    delays: false,
    gaps: false,
    processes: false,
    processTime: false,
    frc: false,
    bn: false,
    grt: false,
    wrt: false
  });
  const [pieceIdOpen, setPieceIdOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const handleChange = (e) => setPeriod(e);
  const toggleModal = (modalName) =>
    setModals({ ...modals, [modalName]: !modals[modalName] });

  const getRM = useMemo(() => {
    if (data?.RM) {
      if (period === "Last Coil" || period.customp) {
        return data?.RM[0]?.f_R2StripThk;
      } else if (
        ["Last 5 Coil", "Last Hour", "Last Shift", "Last Day"].includes(
          period
        ) ||
        period?.date
      ) {
        const totalThickness = data?.RM?.reduce(
          (acc, currentValue) => acc + currentValue.f_R2StripThk,
          0
        );
        return Number(totalThickness / data?.RM.length);
      }
    }
    return 0;
  }, [data?.RM, period]);

  return (
    <div>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative h-[90vh] bg-cover bg-no-repeat">
        <img
          src="http://127.0.0.1:5000/video"
          className="absolute w-screen h-screen"
          alt="Live Feed"
        />

        {/* Top Widgets */}
        <div className="sticky top-[15%] px-4 flex gap-6 text-xs justify-start ml-14">
          <div className="w-[300px]">
            <LoadingG data={data} />
          </div>
          <div className="w-[300px]">
            <Charging />
          </div>
        </div>

        {/* Middle Widgets */}
        <div className="sticky top-[25%] px-4 flex gap-6 text-xs justify-end mr-20">
          {["Rev Pass Kick Out Time", "Fwd Pass Kick Out Time"].map(
            (title, idx) => (
              <WidgetBox key={idx} title={title} value="25" />
            )
          )}
          <WidgetBox
            title="RM Transfer Bar Thickness"
            value={Math.round(getRM())}
          />
        </div>

        {/* Bottom Widgets */}
        <div className="sticky top-[47%] px-4 flex gap-24 text-xs justify-center">
          {[PMC, Three, Wise, SSP, R1, R2, FM].map((Component, idx) => (
            <div key={idx} className="w-[250px]">
              <Component />
            </div>
          ))}
        </div>

        {/* Extra Widgets */}
        <div className="sticky top-[75%] px-4 flex gap-6 text-xs justify-between ml-52">
          <div className="w-[750px]">
            <FME />
          </div>
          <div className="ml-[200px] mt-8">
            <BottleNeck />
          </div>
          <div className="ml-[100px] mt-10 w-[300px] mr-24">
            <DC />
          </div>
        </div>

        {/* Options */}
        <div className="sticky top-[90%] pl-6 pt-5 flex gap-24 justify-between">
          <OptionSelector
            handleChange={handleChange}
            setPieceIdOpen={setPieceIdOpen}
            setDateOpen={setDateOpen}
            period={period}
          />
          <VisualGraphs setModals={setModals} />
          <TimeToggle setMins={setMins} mins={mins} />
        </div>
      </div>

      {/* Modals */}
      <Delays open={modals.delays} setOpen={() => toggleModal("delays")} />
      <Gaps open={modals.gaps} setOpen={() => toggleModal("gaps")} />
      <Processes
        open={modals.processes}
        setOpen={() => toggleModal("processes")}
      />
      <ProcessTime
        open={modals.processTime}
        setOpen={() => toggleModal("processTime")}
      />
      <FRC open={modals.frc} setOpen={() => toggleModal("frc")} />
      <BN open={modals.bn} setOpen={() => toggleModal("bn")} />
      <GRT open={modals.grt} setOpen={() => toggleModal("grt")} />
      <WRT open={modals.wrt} setOpen={() => toggleModal("wrt")} />
      <PieceID open={pieceIdOpen} setOpen={setPieceIdOpen} />
      <DatePicker open={dateOpen} setOpen={setDateOpen} />
    </div>
  );
};

const WidgetBox = ({ title, value }) => (
  <div className="w-[200px] rounded-md">
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md bg-[whitesmoke] shadow-md">
      <div className="flex justify-between px-1 pb-2 items-center italic pr-2 text-xs">
        <p className="font-semibold">{title}</p>
        <p>-</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

const OptionSelector = ({
  handleChange,
  setPieceIdOpen,
  setDateOpen,
  period
}) => (
  <div>
    <p className="text-white font-semibold text-sm italic pb-1">
      Please Select An Option
    </p>
    <div className="border flex justify-center border-black cursor-pointer bg-white shadow-md">
      {["Last Coil", "Last 5 Coil", "Last Hour", "Last Shift", "Last Day"].map(
        (option, idx) => (
          <OptionButton
            key={idx}
            label={option}
            isActive={period === option}
            onClick={() => handleChange(option)}
          />
        )
      )}
      <OptionButton label="Custom Piece" onClick={() => setPieceIdOpen(true)} />
      <OptionButton
        label="Custom Date"
        isActive={period === "Custom"}
        onClick={() => setDateOpen(true)}
      />
    </div>
  </div>
);

const OptionButton = ({ label, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`${
      isActive ? "bg-blue-500 text-white" : ""
    } hover:bg-blue-500 p-3 italic font-semibold hover:text-white text-sm border-r border-black`}
  >
    <p>{label}</p>
  </div>
);

const VisualGraphs = ({ setModals }) => (
  <div>
    <p className="text-white text-sm italic font-semibold pb-1">
      Visual Graphs
    </p>
    <div className="flex justify-center gap-3">
      {[
        "Delay",
        "Gap Time",
        "Process Delay Time",
        "Process Time",
        "FRC",
        "Bottle Neck",
        "GRT Trend",
        "WRT Trend"
      ].map((label, idx) => (
        <VisualGraphButton
          key={idx}
          label={label}
          onClick={() =>
            setModals((prev) => ({
              ...prev,
              [label.toLowerCase().replace(" ", "")]: true
            }))
          }
        />
      ))}
    </div>
  </div>
);

const VisualGraphButton = ({ label, onClick }) => (
  <div
    onClick={onClick}
    className="hover:bg-blue-500 bg-blue-500 text-white hover:scale-105 transition-all duration-200 ease-in-out p-3 italic font-semibold shadow-md rounded-md text-sm"
  >
    <p>{label}</p>
  </div>
);

const TimeToggle = ({ setMins, mins }) => (
  <div className="flex justify-center items-center mt-6">
    <TimeToggleButton
      label="Seconds"
      isActive={!mins}
      onClick={() => setMins(false)}
    />
    <TimeToggleButton
      label="Mins"
      isActive={mins}
      onClick={() => setMins(true)}
    />
  </div>
);

const TimeToggleButton = ({ label, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`${
      isActive ? "bg-blue-500 text-white" : ""
    } hover:bg-blue-500 w-[100px] py-2 border-black/40 border italic font-semibold text-sm cursor-pointer`}
  >
    <p>{label}</p>
  </div>
);

export default Live;

import { Modal } from "@mui/material";
import React, { useContext, useState } from "react";

// Import utilities
import { tailwindConfig } from "../utils/Utils";
import BarChart01 from "../charts/BarChart01";
import "react-time-picker/dist/TimePicker.css";
import TimePicker from "react-time-picker";
import "react-clock/dist/Clock.css";
import GapChart from "../charts/GapChart";
import ProcessChart from "../charts/ProcessChart";
import ProcessStacked from "../charts/ProcessChartstacked";
import { AccountContext } from "../context/context";
import Datepicker from "./Datepicker";
const Date = ({ open, setOpen }) => {
  const [start, setStart] = useState("10:00");
  const [end, setEnd] = useState("10:00");
  const [dateValue, setDateValue] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const { period, setPeriod } = useContext(AccountContext);

  const setValue = () => {
    setPeriod({
      time: [start, end],
      date: dateValue,
    });
  };
  return (
    <>
      {" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute  bg-white outline-none top-[25%] left-[50%] -translate-x-[50%] flex">
          <div className="flex flex-col bg-white border rounded-sm shadow-lg col-span-full sm:col-span-6 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                Please Select Date
              </h2>
              <div className="flex flex-col justify-center w-full gap-4 my-4">
                <div>
                  <Datepicker setDateValue={setDateValue} />
                </div>{" "}
              </div>
              <button
                className="bg-blue-500 px-6 py-1.5 rounded-md flex justify-center w-full text-white mt-6"
                onClick={() => {
                  setValue();
                  setOpen(false);
                }}
              >
                {" "}
                Submit{" "}
              </button>
            </header>
            {/* Chart built with Chart.js 3 */}
            {/* Change the height attribute to adjust the chart height */}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Date;

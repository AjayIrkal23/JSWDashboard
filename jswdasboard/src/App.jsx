import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Live from "./pages/Live";
import { AccountContext } from "./context/context";

function App() {
  const location = useLocation();
  const { period, setPeriod, data } = useContext(AccountContext);
  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      {data?.Excel?.c_PieceName || data?.Excel?.length > 1 ? (
        <>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/liveDashboard" element={<Live />} />
          </Routes>
        </>
      ) : (
        <div className="bg-blue-500 font-semibold text-[60px] text-center flex text-white w-screen h-screen justify-center items-center flex flex-col">
          <p>No Data Found Please Check if Backend is on </p>
          <Link
            to={"/liveDashboard"}
            className="my-2 underline"
            onClick={() => setPeriod("Last Coil")}
          >
            Go Back
          </Link>
        </div>
      )}
    </>
  );
}

export default App;

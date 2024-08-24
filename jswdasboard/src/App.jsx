import React, { useContext, useEffect, useMemo } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./css/style.css";
import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Live from "./pages/Live";
import { AccountContext } from "./context/context";

function App() {
  const location = useLocation();
  const { period, setPeriod, data, mainData, eightData } =
    useContext(AccountContext);

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  // Memoizing toast options to prevent unnecessary re-creation on every render
  const toastOptions = useMemo(
    () => ({
      className: "",
      duration: 5000,
      style: {
        background: "#363636",
        color: "#fff"
      },
      success: {
        duration: 3000,
        theme: {
          primary: "green",
          secondary: "black"
        }
      }
    }),
    []
  );

  const noData = useMemo(
    () => !data || !mainData || !eightData,
    [data, mainData, eightData]
  );

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={toastOptions}
      />
      {noData ? (
        <div className="bg-blue-500 font-semibold text-[60px] text-center text-white w-screen h-screen justify-center items-center flex flex-col">
          <p>No Data Found Please Check if Backend is on</p>
          <Link
            to="/"
            className="my-2 underline"
            onClick={() => setPeriod("Last Coil")}
          >
            Go Back
          </Link>
        </div>
      ) : (
        <Routes>
          <Route exact path="/" element={<Live />} />
        </Routes>
      )}
    </>
  );
}

export default App;

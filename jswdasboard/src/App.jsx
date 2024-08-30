import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners"; // Importing a spinner
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";

    // Set loading to false once data and mainData are fetched
    if (data && mainData) {
      setLoading(false);
    }
  }, [location.pathname, data, mainData]); // triggered on route change or data fetch

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff"
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black"
            }
          }
        }}
      />

      {loading ? (
        <div className="bg-gray-800 text-white flex justify-center items-center h-screen">
          <div className="text-center">
            {/* Using ClipLoader from react-spinners */}
            <ClipLoader color="#3498db" size={150} />
            <p className="mt-4 text-xl">Loading data, please wait...</p>
          </div>
        </div>
      ) : (
        <>
          {data && mainData ? (
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/liveDashboard" element={<Live />} />
            </Routes>
          ) : (
            <div className="bg-blue-500 font-semibold text-[60px] text-center text-white w-screen h-screen justify-center items-center flex flex-col">
              <p>No Data Found. Please Check if Backend is on.</p>
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
      )}
    </>
  );
}

export default App;

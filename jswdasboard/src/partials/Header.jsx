import React, { useContext, useState, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../components/DropdownProfile";
import { AccountContext } from "../context/context";

function Header({ sidebarOpen, setSidebarOpen }) {
  const { period, data } = useContext(AccountContext);
  const location = useLocation();

  const handleSidebarToggle = useCallback(
    (e) => {
      e.stopPropagation();
      setSidebarOpen((prevOpen) => !prevOpen);
    },
    [setSidebarOpen]
  );

  const isLiveDashboard = location.pathname === "/";

  const totalCoils = useMemo(() => {
    if (
      period === "Last 5 Coil" ||
      period === "Last Hour" ||
      period === "Last Shift" ||
      period === "Last Day" ||
      period.date
    ) {
      return data?.Excel.length || 1;
    }
    return 1;
  }, [period, data]);

  const pieceID = useMemo(() => {
    if (
      period === "Last 5 Coil" ||
      period === "Last Hour" ||
      period === "Last Shift" ||
      period === "Last Day" ||
      period.date
    ) {
      const firstPieceName = data?.Excel[0]?.c_PieceName;
      const lastPieceName = data?.Excel[data?.Excel.length - 1]?.c_PieceName;
      return firstPieceName && lastPieceName
        ? `${firstPieceName} - ${lastPieceName}`
        : firstPieceName;
    }
    return data?.Excel?.c_PieceName;
  }, [period, data]);

  return (
    <header className="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          <img src="/logo.png" alt="Logo" className="h-8 w-20" />

          {/* Header: Left side */}
          <div className="flex">
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={handleSidebarToggle}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {isLiveDashboard ? (
              <Link to="/liveDashboard">
                <p className="text-sm bg-blue-500 text-white py-1.5 px-4 rounded-md cursor-pointer hover:scale-105 hover:animate-pulse transition-all duration-200 ease-in-out">
                  Live Dashboard
                </p>
              </Link>
            ) : (
              <>
                <InfoDisplay label="Total Coils" value={totalCoils} />
                <InfoDisplay label="Piece ID" value={pieceID} />
                <Link to="/">
                  <p className="text-sm bg-blue-500 text-white py-1.5 px-4 rounded-md cursor-pointer hover:scale-105 hover:animate-pulse transition-all duration-200 ease-in-out">
                    Main Dashboard
                  </p>
                </Link>
              </>
            )}
            <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
            <UserMenu align="right" />
          </div>
        </div>
      </div>
    </header>
  );
}

function InfoDisplay({ label, value }) {
  return (
    <div>
      <span className="text-gray-700">{label}</span> -
      <span className="text-sm text-gray-600 mx-2 border mr-12 px-3 py-1.5 border-black/20 rounded-md shadow-md font-bold">
        {value}
      </span>
    </div>
  );
}

export default Header;

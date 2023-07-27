import React, { useContext, useState } from "react";

import SearchModal from "../components/ModalSearch";
import Notifications from "../components/DropdownNotifications";
import Help from "../components/DropdownHelp";
import UserMenu from "../components/DropdownProfile";
import ThemeToggle from "../components/ThemeToggle";
import { Link } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";
import { AccountContext } from "../context/context";
function Header({ sidebarOpen, setSidebarOpen }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const { period, setPeriod, data } = useContext(AccountContext);

  return (
    <header className="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/JSW_Group_logo.svg/1200px-JSW_Group_logo.svg.png"
            alt=""
            className="h-8 w-20  "
          />
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
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
            {location.pathname == "/" ? (
              <Link to="/liveDashboard">
                <p className="text-sm bg-blue-500 text-white py-1.5 px-4 rounded-md cursor-pointer hover:scale-105 hover:animate-pulse transition-all duration-200 ease-in-out">
                  {" "}
                  Live Dashboard
                </p>
              </Link>
            ) : (
              <>
                <div>
                  {" "}
                  <span className=" text-gray-700">Piece ID</span> -
                  <span className="text-sm text-gray-600 mx-2 border mr-12 px-3 py-1.5 border-black/20 rounded-md shadow-md ">
                    {period == "Last 5 Coil" ||
                    period == "Last Hour" ||
                    period == "Last Shift" ||
                    period == "Last Day" ||
                    period.date
                      ? `${data?.Excel[0]?.c_PieceName} -
                        ${data?.Excel[data?.Excel.length - 1]?.c_PieceName}`
                      : data?.Excel?.c_PieceName}
                  </span>
                </div>
                <Link to="/">
                  <p className="text-sm bg-blue-500 text-white py-1.5 px-4 rounded-md cursor-pointer hover:scale-105 hover:animate-pulse transition-all duration-200 ease-in-out">
                    {" "}
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

export default Header;

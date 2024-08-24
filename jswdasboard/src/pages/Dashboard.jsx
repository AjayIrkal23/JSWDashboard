import React, { useContext, useState, useMemo } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";

import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import D15 from "../partials/dashboard/D15";
import D16 from "../partials/dashboard/D16";
import DashboardExtra from "../partials/dashboard/DashboardExtra";
import DashboardMain from "../partials/dashboard/DashboardMain";
import { AccountContext } from "../context/context";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mainData } = useContext(AccountContext);

  // Memoizing mainData to avoid unnecessary renders
  const memoizedMainData = useMemo(() => mainData, [mainData]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <DashboardCard01 />
              <DashboardCard02 />
              <DashboardExtra />
              <DashboardCard03 />
              <DashboardMain mainData={memoizedMainData} />
              <DashboardCard06 />
              <D15 />
              <D16 />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

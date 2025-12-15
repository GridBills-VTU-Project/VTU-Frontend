"use client";
import React, { Suspense, useEffect, useState } from "react";
import Maindasboard from "./Maindasboard";
import { useSearchParams } from "next/navigation";
import MainWallet from "./MainWallet";
import Services from "./Services/Services";
import Reward from "./Reward";
import Support from "./Support";
import Profile from "./Profile";
import Commission from "./Commission";
import Become_an_agent from "./Become_an_agent";
import Admindasboard from "./admin/DashBoard";
import Users from "./admin/Users";
const Dashboard = ({}) => {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<string | null>(null);
  useEffect(() => {
    const tab = searchParams.get("tab");
    setTab(tab);
  }, [searchParams]);

  return (
    <div className="p-10 w-full mx-auto">
      {(tab?.toLocaleLowerCase() === "dashboard" || !tab) && <Maindasboard />}
      {tab?.toLocaleLowerCase() === "wallet" && <MainWallet />}
      {tab?.toLocaleLowerCase() === "commission" && <Commission />}
      {/* <Suspense fallback={<NormalLoadingScreen/>}> */}
      {(tab?.toLocaleLowerCase() === "services" || tab?.toLocaleLowerCase() === "sale") && <Services />}
      {/* </Suspense> */}
      {tab?.toLocaleLowerCase() === "reward" && <Reward />}
      {tab?.toLocaleLowerCase() === "Agent" && <Become_an_agent />}
      {tab?.toLocaleLowerCase() === "support" && <Support />}
      {tab?.toLocaleLowerCase() === "profile" && <Profile />}
      {tab?.toLocaleLowerCase() === "admindashboard" && <Admindasboard />}
      {tab?.toLocaleLowerCase() === "adminusers" && <Users />}
    </div>
  );
};

export default Dashboard;

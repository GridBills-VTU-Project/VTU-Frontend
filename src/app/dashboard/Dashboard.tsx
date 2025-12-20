"use client";
import React, { Suspense, useEffect, useState } from "react";
import Maindasboard from "./Maindasboard";
import { useSearchParams } from "next/navigation";
import MainWallet from "./MainWallet";
import Services from "./Services/Services";
import Reward from "./Reward";
import Support from "./Support";
import Profile from "./Profile";
import Commission from "./agent/Commission";
import Become_an_agent from "./Become_an_agent";
// import Admindasboard from "./admin/AdminDashBoard";
// import AgentDashboard from "./agent/AgentDashboard";
import Users from "./admin/Users";
import { useAuthUser } from "../customHooks/UseQueries";
import Agents from "./admin/Agents";
import AdminCommission from "./admin/AdminCommission";
import VtuServices from "./admin/VtuServices";
import AdminSettings from "./admin/AdminSettings";
const Dashboard = ({}) => {
  const searchParams = useSearchParams();
    const { data: user, isLoading, isError, error } = useAuthUser();
  const [tab, setTab] = useState<string | null>(null);
  useEffect(() => {
    const tab = searchParams.get("tab");
    setTab(tab);
  }, [searchParams]);

  return (
    <div className="p-10 w-full mx-auto">
      {(tab?.toLocaleLowerCase() === "dashboard" || !tab) && <Maindasboard />}
      {/* {((tab?.toLocaleLowerCase() === "agentdashboard" || !tab) && user?.role == "Agent") && <AgentDashboard />} */}
      {tab?.toLocaleLowerCase() === "wallet"&& <MainWallet />}
      {tab?.toLocaleLowerCase() === "commission" && user?.role == "Agent" ? <Commission /> : tab?.toLocaleLowerCase() === "commission" && user?.role == "Admin" && <AdminCommission/>}
      {(tab?.toLocaleLowerCase() === "services" || tab?.toLocaleLowerCase() === "sale" && user?.role != "Admin") && <Services />}
      {tab?.toLocaleLowerCase() === "reward" && user?.role == "User"&& <Reward />}
      {tab?.toLocaleLowerCase() === "agent" && user?.role == "User"&& <Become_an_agent />}
      {tab?.toLocaleLowerCase() === "support" && user?.role != "Admin"&& <Support />}
      {tab?.toLocaleLowerCase() === "profile" && <Profile />}
      {/* {tab?.toLocaleLowerCase() === "admindashboard" && user?.role == "Admin" && <Admindasboard />} */}
      {tab?.toLocaleLowerCase() === "adminusers"&& user?.role == "Admin" && <Users />}
      {tab?.toLocaleLowerCase() === "adminagents"&& user?.role == "Admin" && <Agents />}
      {tab?.toLocaleLowerCase() === "vtu_services"&& user?.role == "Admin" && <VtuServices />}
      {tab?.toLocaleLowerCase() === "adminsettings"&& user?.role == "Admin" && <AdminSettings />}
    </div>
  );
};

export default Dashboard;

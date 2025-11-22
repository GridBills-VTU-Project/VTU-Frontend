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
import { NormalLoadingScreen } from "../loading";
const Dashboard = ({}) => {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<string | null>(null);
  useEffect(() => {
    const tab = searchParams.get("tab");
    setTab(tab);
  }, [searchParams]);

  return (
    <div className="p-10 w-full mx-auto">
      {(tab === "dashboard" || !tab) && <Maindasboard />}
      {tab === "wallet" && <MainWallet />}
      {tab === "commission" && <Commission />}
      {/* <Suspense fallback={<NormalLoadingScreen/>}> */}
        {(tab === "services" || tab === "sale") && <Services />}
      {/* </Suspense> */}
      {tab === "reward" && <Reward />}
      {tab === "support" && <Support />}
      {tab === "profile" && <Profile />}
    </div>
  );
};

export default Dashboard;

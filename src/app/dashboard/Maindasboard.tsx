"use client";
import React from "react";
import { useAuthUser } from "../customHooks/UseQueries";
import { NormalLoadingScreen } from "../loading";
import Admindasboard from "./admin/AdminDashBoard";
import AgentDashboard from "./agent/AgentDashboard";
import UserDashboard from "./UserDashboard";

const Maindasboard = () => {
  const { data:user} = useAuthUser();

  if(!user) {
    return <NormalLoadingScreen/>
  }
  if(user.role == "Admin"){
    return <Admindasboard/>
  }else if (user.role === "Agent"){
    return <AgentDashboard/>
  }else {
   return <UserDashboard/>
  }
};

export default Maindasboard;
